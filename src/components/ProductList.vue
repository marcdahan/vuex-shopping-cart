<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" >
        <ul v-else >
            <li v-for="product in products" :key="product.index" >{{product.title}}</li>
        </ul>
    </div>
</template>
<script>

import store from '@/store/index'
export default {
    data  () {
        return {
            loading : false
        }
    },
    computed: {
        products() {
            return store.getters.availableProducts
        }
    },
    created() {
        /* that's not the best practice
        shop.getProducts(products => {
            //store.state.products = product //not good because we can't update a state directly without calling a mutation
            store.commit('setProducts', products)
        }) */
        this.loading = true
        store.dispatch('fetchProducts'/*, 'toys'*/) // dispatch is similar to commit but dedicated to actions
            .then(() => this.loading = false)
    }
}
</script>
<style scoped>

</style>
