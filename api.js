import vue from 'vue';
console.log('fetchItemfetchItem',vue.axios);
const fetchItem = () =>{
  return vue.axios.get('/api/weather/city/101030100');
}

export {
  fetchItem,
}