import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//same as data in a vue instance
    products: [],
    cart:[]
  },
  mutations: {//responsible of update the state in a single state change
    setProducts (state, products) { //vue x will pass the state in every mutation as first parameter and a payload 
      state.products = products; //here this mutations alter the state
    },
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity (state, cartItem) {
      let indexItemInCart = state.cart.findIndex(item => item.id == cartItem.id)
      state.cart[indexItemInCart].quantity++
    },
    decrementProductInventory (state, product) {
      product.inventory--
    }
  },
  actions: {//methods who never update the state
    fetchProducts ({commit}) {
      return new Promise ((resolve, reject) => {
        shop.getProducts(products => {
          //store.state.products = product //not good because we can't update a state directly without calling a mutation
          commit('setProducts', products)
          resolve()
        })  
      })
    },
    addProductToCart (context, product) {
      if (product.inventory) {
        const isItemInCart = context.state.cart.find(item => item.id == product.id)
        if (!isItemInCart) {
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementItemQuantity', product)
        }
        context.commit('decrementProductInventory', product)
      }
    },
  },
  getters: {// = computed properties
    productsCount () {
      //
    },
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },
    cartProducts ( state ) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    }
  },
  modules: {
  }
})
