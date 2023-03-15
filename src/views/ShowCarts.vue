<template>
  <div
    class="h-auto py-24 px-4 bg-slate-100 text-2xl text-black min-[412px]:text-xs min-[640px]:text-base"
  >
    <div class="bg-white w-full p-4 my-4 border-2">
      <h1 class="text-xl">Your Carts ({{ carts.carts.length }})</h1>
    </div>
    <div class="flex flex-col gap-4" v-if="carts.carts.length < 1">
      <div class="my-0 mx-auto">
        <h1 class="text-2xl font-bold">Empty Carts</h1>
      </div>
      <div class="my-0 mx-auto">
        <button
          class="border-2 border-black p-2 font-bold rounded bg-yellow-400"
          @click="goHome()"
        >
          Go To Homepage
        </button>
      </div>
    </div>
    <div
      class="bg-white p-4 flex justify-between border-2 gap-2"
      v-for="(product, index) in carts.carts"
    >
      <label class="inline-flex items-center">
        <input
          type="radio"
          class="form-radio h-4 w-4 text-blue-600"
          :value="index"
        />
      </label>
      <div class="product w-[350px]">
        <div>
          <h1 class="text-base text-center font-bold pb-4">Product</h1>
        </div>
        <div class="flex gap-2">
          <div></div>
          <div>
            <img :src="product.img" alt="" class="w-20" />
          </div>
          <div class="">
            <h1 class="">{{ product.name }}</h1>
          </div>
        </div>
      </div>
      <div class="price">
        <div>
          <h1 class="text-base text-center font-bold pb-4">Price</h1>
        </div>
        <div>
          <h1>${{ itemSingle[index] }}</h1>
        </div>
      </div>
      <div class="size">
        <div>
          <h1 class="text-base text-center font-bold pb-4">Size</h1>
        </div>
        <div>
          <h1>{{ product.size }}</h1>
        </div>
      </div>
      <div class="qty">
        <div>
          <h1 class="text-base text-center font-bold pb-4">Quantity</h1>
        </div>
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
    </div>
    <div class="w-48 my-4" v-if="carts.carts.length >= 1">
      <button class="p-2 rounded bg-yellow-400 cursor-pointer">Checkout</button>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { inject, computed } from "vue"
import { useRouter } from "vue-router"
export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const carts = inject("cart")
    const router = useRouter()

    const deleteItem = (product) => {
      const index = carts.carts.findIndex((item) => item.id === product.id)
      if (product.qty > 1) {
        product.qty--
      } else if (index !== -1) {
        carts.carts.splice(index, 1)
      }
    }
    const addItem = (product) => {
      product.qty++
    }

    const itemSingle = computed(() => {
      let total = {}

      carts.carts.forEach((item, index) => {
        total[index] = item.price * carts.carts[index].qty
      })

      return total
    })
    const goHome = () => {
      router.push("/")
    }

    return {
      carts,
      addItem,
      deleteItem,
      itemSingle,
      goHome,
    }
  },
}
</script>
