import shop from '@/api/shop'
export default {
    state: {
        cart:[],
        checkOutStatus: "",
    },
    getters: {
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
    }
}
