import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//same as data in a vue instance
    products: [],
    cart:[],
    checkOutStatus: "",
  },
  mutations: {
    setProducts (state, products) {
      state.products = products;
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
    },
    setCheckOutStatus(state, status) {
      state.checkOutStatus = status
      console.log("computed:setCheckOutStatus: " + state.checkOutStatus);
    },
    emptyCart(state) {
      state.cart = []
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
    addProductToCart ({ state, getters, commit }, product) {
      if (getters.productIsInStock) {
        const isItemInCart = state.cart.find(item => item.id == product.id)
        if (!isItemInCart) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', product)
        }
          commit('decrementProductInventory', product)
      }
    },
    checkOut({ state, commit}) {
      shop.buyProducts(state.cart, 
        () => {
          commit('emptyCart')
          commit('setCheckOutStatus', 'success')
        },
        () => {
          commit('setCheckOutStatus', 'fail')
        } 
      )
    },
  },
  getters: {// = computed properties
    productsCount () {
      //
    },
    availableProducts (state, getters) {
      return state.products
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
    },
    cartTotal ( state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    },
    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  modules: {
  }
})
