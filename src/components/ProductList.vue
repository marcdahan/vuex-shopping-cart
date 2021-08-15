<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="../assets/giphy.gif" >
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
    data () {
        return {
            loading : false
        }
    },
    computed: {
        ...mapState('module_products', {
            products: state => state.products
        }),
        ...mapGetters('module_products',[
            "productIsInStock"
        ]),
    },
    methods: {
        ...mapActions('module_cart',[
            "addProductToCart",
        ]),
        ...mapActions('module_products',[
            "fetchProducts",
        ]),
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
