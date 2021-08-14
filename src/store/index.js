import Vue from 'vue'
import Vuex from 'vuex'
import module_products from './modules/module_products'
import module_cart from './modules/module_cart'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        module_products,
        module_cart,
    },
})
