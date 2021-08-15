<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in cartProducts" v-bind:key="product.id" >
                {{product.title}} / {{product.price | currency}} / {{product.quantity}}
            </li>
        </ul>
        <p>Total : {{cartTotal | currency}}</p>
        <button @click="checkOut">Checkout</button>
        <p v-if="checkOutStatus">{{ checkOutStatus }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    computed: {
        ...mapState('module_cart', {
            checkOutStatus: state => state.checkOutStatus
        }),
        ...mapGetters('module_cart', [
            "cartProducts",
            "cartTotal"
        ]),
    },
    methods: {
        ...mapActions('module_cart', [
            "checkOut"
        ])
    }
}
</script>

<style>

</style>
