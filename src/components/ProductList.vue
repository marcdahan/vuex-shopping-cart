<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" >
        <ul v-else >
            <li v-for="product in products" :key="product.index" ><span>{{product.title}} / {{product.inventory}} </span>
                 <button
                 :disabled="!productIsInStock(product)"
                 @click="addProductToCart(product)"
                 >
                    Add to Cart
                </button>
            </li>

        </ul>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    data  () {
        return {
            loading : false
        }
    },
    computed: {
        ...mapState({
            products: state => state.module_products.products
        }),
        ...mapGetters([
            "productIsInStock"
        ]),
    },
    methods: {
        ...mapActions([
            "addProductToCart",
            "fetchProducts"
        ])
    },
    created() {
        this.loading = true
        this.fetchProducts()
            .then(() => this.loading = false)
    }
}
</script>
<style scoped>

</style>
