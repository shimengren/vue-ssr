<template>
 <div>
    <div>我是home</div>
    <span>{{item}}</span>
  </div>
</template>
<script>
  export default{
    getData(store){
      return store.dispatch('fetchItem');
    },
    computed:{
      item(){
        return this.$store.state.items;
      }
    },
  }
</script>
<style>

</style>
