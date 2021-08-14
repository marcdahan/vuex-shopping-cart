<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in cartProducts" v-bind:key="product.id" >
                {{product.title}} / {{product.price | currency}} / {{product.quantity}}
            </li>
        </ul>
        <p>Total : {{cartTotal | currency}}</p>
        <button @click="$store.dispatch('checkOut')">Checkout</button>
        <p v-if="checkOutStatus">{{ checkOutStatus }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            checkOutStatus: "checkOutStatus"
        }),
        ...mapGetters({
            cartProducts: "cartProducts",
            cartTotal: "cartTotal"

        }),
        ...mapActions({

        })
/*         cart () {
            return this.$store.getters.cartProducts
        },
        total() {
            return this.$store.getters.cartTotal
        },
        checkOutStatus() {
            return this.$store.state.checkOutStatus
        }*/
    },
}
</script>

<style>

</style>