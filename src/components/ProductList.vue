<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" >
        <ul v-else >
            <li v-for="product in products" :key="product.index" ><span>{{product.title}} / {{product.inventory}} </span>
                 <button @click="addProductToCart(product)">Add to Cart</button>
            </li>
           
        </ul>
    </div>
</template>
<script>

// import store from '@/store/index' now injected in main.js to all components 
// the variable store is now accessible via this.$store
export default {
    data  () {
        return {
            loading : false
        }
    },
    computed: {
        products() {
            return this.$store.getters.availableProducts
        }
    },
    methods: {
        addProductToCart (product) {
            this.$store.dispatch('addProductToCart', product)
        }
    },
    created() {
        this.loading = true
        this.$store.dispatch('fetchProducts'/*, 'toys'*/) // dispatch is similar to commit but dedicated to actions
            .then(() => this.loading = false)
    }
}
</script>
<style scoped>

</style>
