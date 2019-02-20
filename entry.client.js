import { createApp } from './app.js';
const { app , router, store} = createApp();
 router.onReady(() =>{
  const state = window.__INITIAL_STATE__;
  store.replaceState(state);
  app.$mount('#app');
});
