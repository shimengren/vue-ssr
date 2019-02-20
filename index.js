const express = require('express');
const server = express();
const {createBundleRenderer} = require('vue-server-renderer');
const fs = require('fs');
const template = fs.readFileSync('./index.template.html','utf-8');
let renderer;
if(process.env.NODE_ENV === 'development'){
  require('./setup-dev-server.js')(server,(bundle,clientManifest) => {
    renderer = createBundleRenderer(bundle, {
      runInNewContext:false,
      template:template,
      clientManifest
    })
  });
} else {
  const serverBundle = require('./build/vue-ssr-server-bundle.json');
  renderer = createBundleRenderer(serverBundle,{
    runInNewContext: false,
    template:template,
    clientManifest: require('./build/vue-ssr-client-manifest.json'),
  });
}

server.use(express.static(__dirname + '/build'));
server.get('*',function(req,res,next){
  const context = {
    url: req.url,
  }
  renderer.renderToString(context,(err,html) => {
    if(err){
      res.setHeader('content-type','text/html;charset=UTF-8');
      if(err.code === 404){
        res.status(404).end('页面不存在');
      } else {
        console.log('errerrerr',err);
        res.status(500).end('服务器内部错误');
      }
    } else {
      res.setHeader('content-type','text/html;charset=UTF-8');
      res.status(200).end(html);
    }
  })
});

server.listen(3000,function(){
  console.log("成功启动：localhost:3000");
});