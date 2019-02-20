import Vue from 'vue';
import App from './app.vue';
import { createRouter } from './router';
import { createStore } from './store';
require('./ajax.js');

export function createApp() {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    render: h => h(App),
    router,
    store
  });
  return {app,router,store}
}
