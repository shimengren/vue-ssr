import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import {fetchItem} from './api';

export function createStore(){
  return new Vuex.Store({
    state:{
      items:'',
    },
    actions:{
      fetchItem({commit}){
        return fetchItem().then(item =>{
          commit('setItem',item)
        })
      }
    },
    mutations:{
      setItem(state,item){
        Vue.set(state,'items',item);
      }
    }
  });
}