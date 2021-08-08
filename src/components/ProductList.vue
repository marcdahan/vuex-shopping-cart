<template>
    <div>
        <h1>Product List</h1>
        <ul>
            <li v-for="product in products" :key="product.index" >{{product.title}}</li>
        </ul>
    </div>
</template>
<script>

import store from '@/store/index'
export default {
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
        store.dispatch('fetchProducts', 'toys')
    }
}
</script>
<style scoped>

</style>
