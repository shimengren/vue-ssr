import axios from 'axios';
import vueAxios from 'vue-axios';
import vue from 'vue';
const token = '';
var instance = axios.create({
  baseURL:'http://t.weather.sojson.com/',
  timeout: 10000,
  header:{
    withCredentials: true,
  },
});
instance.interceptors.request.use(config =>{
  if(token){
    config.headers.Authorization = token;
  }
  return config;
},err =>{
  return Promise.reject(err);
});

instance.interceptors.response.use(response => {
  if(response.status.toString() === '200'){
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
},err =>{
  return Promise.reject(err);
});


vue.use(vueAxios,instance);

