import { createApp } from './app.js';

export default context => {
  return new Promise((resolve,reject) =>{
   const {app,router,store} = createApp();
   router.push(context.url);
   router.onReady(() =>{
     const matchedComponents = router.getMatchedComponents()
     if(!matchedComponents.length){
       return reject({code:404});
     }
     Promise.all(matchedComponents.map(component =>{
       if(component.getData){
         return component.getData(store)
       }
     })).then(() =>{
       context.state = store.state; // 服务端最新的vuex中的state将会注入window._INTIAL_STATE中，可以进行状态热更新
       return resolve(app);
     }).catch(reject);
   })
  })
}