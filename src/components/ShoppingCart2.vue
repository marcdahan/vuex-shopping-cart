<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in cart" v-bind:key="product.id" >
                {{product.title}} / {{product.price | currency}} / {{product.quantity}}
            </li>
        </ul>
        <p>Total : {{total | currency}}</p>
        <button @click="$store.dispatch('checkOut')">Checkout</button>
        <p v-if="checkOutStatus">{{ checkOutStatus }}</p>
  </div>
</template>

<script>
export default {
    computed: {
        cart () {
            return this.$store.getters.cartProducts
        },
        total() {
            return this.$store.getters.cartTotal
        },
        checkOutStatus() {
            return this.$store.state.checkOutStatus
        }
    },
}
</script>

<style>

</style>