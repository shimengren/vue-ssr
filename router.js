import Vue from 'vue';
import Router from 'vue-router';
import Home from '@components/home';
import Mine from  '@components/mine';

Vue.use(Router);

export function createRouter(){
  return new Router({
    mode:'history',
    routes:[
      {
        path: '/',
        redirect:'/home',
        component:Home,
      },
      {
        path:'/home',
        component:Home,
      },
      {
        path:'/mine',
        component:Mine,
      }
    ]
  })
}
