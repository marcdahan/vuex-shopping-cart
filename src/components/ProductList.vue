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
import shop from '@/api/shop'
export default {
    computed: {
        products() {
            return store.getters.availableProducts
        }
    },
    created() {
        shop.getProducts(products => {
            //store.state.products = product //not good because we can't update a state directly without calling a mutation
            store.commit('setProducts', products)
        })
    }
}
</script>
<style scoped>

</style>
