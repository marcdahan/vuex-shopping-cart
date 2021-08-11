<template>
  <div id="app">
    <ProductList/>
    <hr>
    <ShoppingCart2/>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import ShoppingCart2 from './components/ShoppingCart2.vue'
export default {
  name: 'app',
  components: {
    ProductList,
    ShoppingCart2,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
