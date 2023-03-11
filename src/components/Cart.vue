<template>
  <div
    class="dropdown dropdown-hover dropdown-end fixed right-1 z-10 cursor-pointer"
  >
    <div tabindex="0" class="m-1 bg-yellow-400 w-20 rounded-xl relative">
      <font-awesome-icon
        icon="fa-cart-shopping"
        class="text-2xl p-2 text-black"
      />
      <div class="badge bg-black text-white absolute border-none">
        <h1>{{ cartQty }}</h1>
      </div>
    </div>
    <ul
      tabindex="0"
      class="shadow menu dropdown-content bg-yellow-400 rounded-box w-96 text-black h-auto"
    >
      <li v-if="cartQty <= 0">
        <h1 class="my-0 mx-auto text-xl font-bold">Empty Cart</h1>
      </li>
      <li v-for="product in carts" v-if="cartQty >= 1">
        <div class="flex">
          <img :src="product.img" alt="" class="w-[50px]" />
          <h1 class="flex-1 text-sm">{{ product.name }}</h1>
          <p>{{ product.size }}</p>
          <p>${{ product.price }}</p>
          <div class="flex gap-3 bg-black text-yellow-400 p-1 rounded">
            <button @click="deleteItem(product)">
              <font-awesome-icon icon="fa-solid fa-minus" />
            </button>
            <p>{{ product.qty }}</p>
            <button @click="addItem(product)">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
          </div>
        </div>
      </li>
      <li v-if="cartQty >= 1">
        <div class="my-0 mx-auto">
          <div>
            <router-link
              :to="{ name: 'ShowCarts' }"
              class="bg-black text-yellow-400 p-2 rounded hover:bg-slate-900"
            >
              Show Carts
            </router-link>
          </div>
          <div class="bg-black text-yellow-400 p-2 rounded">
            <h1 class="font-semibold">${{ cartTotal }}</h1>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { ref, onMounted, computed } from "vue"
import { inject } from "vue"
export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    let carts = ref()
    const cart = inject("cart")
    // let emptyCart = ref()

    onMounted(() => {
      console.log(cart)
      carts.value = cart.carts
    })

    const cartQty = computed(() => {
      return cart.carts.length
    })

    const cartTotal = computed(() => {
      let sum = 0
      for (let key in carts.value) {
        sum = sum + carts.value[key].price * carts.value[key].qty
      }
      return sum
    })

    const deleteItem = (product) => {
      const index = carts.value.findIndex((item) => item.id === product.id)
      if (product.qty > 1) {
        product.qty--
      } else if (index !== -1) {
        carts.value.splice(index, 1)
      }
    }
    const addItem = (product) => {
      product.qty++
    }

    return { cartQty, carts, cartTotal, deleteItem, addItem }
  },
}
</script>
<style></style>
