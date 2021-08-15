import shop from '@/api/shop'
import { mapMutations} from 'vuex'

export default {
    namespaced: true,
    state: {
        cart:[],
        checkOutStatus: "",
    },
    getters: {
        cartProducts ( state, getters, rootState, rootGetters ) {
            return state.cart.map(cartItem => {
              const product = rootState.module_products.products.find(product => product.id === cartItem.id)
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
    },
    mutations: {
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
        setCheckOutStatus(state, status) {
            state.checkOutStatus = status
            console.log("computed:setCheckOutStatus: " + state.checkOutStatus);
        },
        emptyCart(state) {
            state.cart = []
        }
    },
    actions: {
        addProductToCart ({ state, getters, commit, rootState, rootGetters }, product) {
            if (rootGetters["module_products/productIsInStock"](product)) {
                const isItemInCart = state.cart.find(item => item.id == product.id)
            if (!isItemInCart) {
                commit('pushProductToCart', product.id)
            } else {
                commit('incrementItemQuantity', product)
            }
                commit('module_products/decrementProductInventory', product, {root: true})
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
    }
}
