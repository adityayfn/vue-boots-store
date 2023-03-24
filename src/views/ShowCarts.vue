<template>
  <div
    class="h-auto py-24 px-4 bg-slate-100 text-2xl text-black min-[412px]:text-xs min-[640px]:text-base"
  >
    <div class="bg-white w-full p-4 my-4 border-2">
      <h1 class="text-xl">Your Carts ({{ unCheckout.length }})</h1>
    </div>
    <div class="flex flex-col gap-4" v-if="state.carts.length < 1">
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
    <!--  -->
    <div
      class="bg-white p-4 border-2 relative"
      v-for="(product, index) in unCheckout"
      :key="index"
    >
      <div></div>
      <div class="absolute z-[8] top-6">
        <label class="">
          <input
            type="checkbox"
            class="form-checkbox h-4 text-indigo-600 w-4"
            :id="'item-' + index"
            v-model="product.selected"
            @change="onItemChange(index)"
          />
        </label>
      </div>

      <div class="flex relative justify-between gap-2">
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
    </div>

    <Checkout />
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { inject, computed, ref, watch } from "vue"
import { useRouter } from "vue-router"
import Checkout from "../components/Checkout.vue"
export default {
  components: {
    FontAwesomeIcon,
    Checkout,
  },
  setup() {
    const state = inject("carts")
    const router = useRouter()

    const deleteItem = (product) => {
      const index = state.carts.findIndex((item) => item.id === product.id)
      if (product.qty > 1) {
        product.qty--
      } else if (index !== -1) {
        state.carts.splice(index, 1)
      }
    }
    const addItem = (product) => {
      product.qty++
    }

    const itemSingle = computed(() => {
      let total = {}

      state.carts.forEach((item, index) => {
        total[index] = item.price * state.carts[index].qty
      })

      return total
    })

    // const cartTotal = computed(() => {
    //   let sum = 0
    //   const cart = carts.carts.filter((item) => item.selected)
    //   for (let key in cart) {
    //     sum = sum + carts.carts[key].price * carts.carts[key].qty
    //   }
    //   return sum
    // })
    const goHome = () => {
      router.push("/")
    }

    // const checkout = () => {
    //   const selectedItem = carts.carts.filter((item) => item.selected)
    //   console.log(selectedItem)
    //   console.log(form)
    // }
    const selectAll = ref(false)

    const isAllSelect = () => {
      return state.carts.every((item) => item.selected)
    }

    const updateSelectAll = () => {
      selectAll.value = isAllSelect()
    }

    const onSelectAllChange = () => {
      // selectAll.value = !selectAll.value
      state.carts.forEach((item) => (item.selected = selectAll.value))
    }
    const onItemChange = (index) => {
      if (!state.carts[index].selected) {
        selectAll.value = false
      } else {
        updateSelectAll()
      }
    }

    const unCheckout = computed(() => {
      return state.carts.filter((item) => item.isCheckout == false)
    })

    watch(
      state.carts,
      () => {
        updateSelectAll()
      },
      { deep: true }
    )

    return {
      state,
      addItem,
      deleteItem,
      itemSingle,
      goHome,
      // cartTotal,
      // checkout,
      selectAll,
      // selectAllItems,
      onSelectAllChange,
      onItemChange,
      // form,
      unCheckout,
    }
  },
}
</script>
