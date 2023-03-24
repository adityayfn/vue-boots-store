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
      <li
        v-for="(product, index) in displayedItems"
        :key="index"
        v-if="cartQty >= 1"
      >
        <div class="flex">
          <img :src="product.img" alt="" class="w-[50px]" />
          <h1 class="flex-1 text-sm">{{ product.name }}</h1>
          <p>{{ product.size }}</p>
          <p>${{ itemSingle[index] }}</p>
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
          <button
            @click="showMore()"
            class="bg-black text-yellow-400 p-2 rounded hover:bg-slate-900"
          >
            <div v-if="carts.length <= 3">
              <h1>Show Carts</h1>
            </div>
            <div v-if="carts.length > 3">
              <h1>{{ carts.length - 3 }} More Items</h1>
            </div>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { ref, onMounted, computed } from "vue"
import { inject } from "vue"
import { useRouter } from "vue-router"
export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const router = useRouter()
    let carts = ref()
    const state = inject("carts")

    onMounted(() => {
      carts.value = state.carts
    })

    const cartQty = computed(() => {
      return state.carts.length
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
    const itemSingle = computed(() => {
      let total = {}

      carts.value.forEach((item, index) => {
        total[index] = item.price * carts.value[index].qty
      })

      return total
    })

    const limit = ref(3)
    const displayedItems = computed(() => {
      console.log(carts.value)
      return carts.value.slice(0, limit.value)
    })

    const showMore = () => {
      router.push("/carts")
    }

    return {
      cartQty,
      carts,

      deleteItem,
      addItem,
      itemSingle,
      showMore,
      displayedItems,
    }
  },
}
</script>
<style></style>
