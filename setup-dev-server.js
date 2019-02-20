const webpack = require('webpack');
const path = require('path');
const clientConfig = require('./webpack.client.config.js')();
const serverConfig = require('./webpack.server.config.js')();
const MFS = require('memory-fs');
const readFile = (fs,file) =>{
  try{
    return fs.readFileSync(path.join(clientConfig.output.path,file),'utf-8');
  }catch(err){
    console.log('读取文件失败:'+ err);
  }
}
module.exports = function(app,callback){
  clientConfig.entry = ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',clientConfig.entry];
  let clientCompiler = webpack(clientConfig);
  let serverCompiler = webpack(serverConfig);
  let devMiddleWare = require('webpack-dev-middleware')(clientCompiler,{
    publicPath:clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    }
  })
  let hotMiddleware = require('webpack-hot-middleware')(clientCompiler,{
    log: false,
    heartbeat: 2000,
  });
  let bundle;
  let clientManifest;
  clientCompiler.plugin('done', stats =>{
    stats.errors && stats.errors.forEach(err => console.log(err));
    stats.warnings && stats.warnings.forEach(warning => err.warn(warning));
    if(stats.errors && stats.errors.length) return;
    const fs = devMiddleWare.fileSystem;
    clientManifest = JSON.parse(readFile(fs,'vue-ssr-client-manifest.json'));
    update();
  });
  app.use(devMiddleWare);

  app.use(hotMiddleware);

  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({},(err,stats) =>{
   if(err) throw err;
   stats = stats.toJson();
   if(stats.errors.length) return;
   bundle = JSON.parse(readFile(mfs,'vue-ssr-bundle.json'))
   update();
  });
  const update = () =>{
    if(bundle && clientManifest){
      callback(bundle,clientManifest);
    }
  }
}

