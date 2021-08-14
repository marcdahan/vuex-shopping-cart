import shop from '@/api/shop'
export default {
    state: {
        products: [],
    },
    getters: {
        availableProducts (state, getters) {
            return state.products
          },
          productIsInStock () {
            return (product) => {
              return product.inventory > 0
            }
          }
    },
    mutations: {
        setProducts (state, products) {
            state.products = products;
        },
        decrementProductInventory (state, product) {
            product.inventory--
        },
    },
    actions:{
        fetchProducts ({commit}) {
            return new Promise ((resolve, reject) => {
              shop.getProducts(products => {
                commit('setProducts', products)
                resolve()
              })
            })
        },
    }
}
