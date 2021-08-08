import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//same as data in a vue instance
    products: []
  },
  mutations: {//responsible of update the state in a single state change
    setProducts (state, products) { //vue x will pass the state in every mutation as first parameter and a payload 
      state.products = products; //here this mutations alter the state
    }
  },
  actions: {//methods who never update the state
    fetchProducts () {
      
    }
  },
  getters: {// = computed properties
    productsCount () {
      //
    },
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    }
  },
  modules: {
  }
})
