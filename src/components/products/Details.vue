<template>
  <div class="h-auto min-[640px]:hidden bg-white text-black relative">
    <div v-for="data in details" class="flex flex-wrap">
      <div class="px-8 mt-32 flex max-sm:flex-col max-sm:gap-2">
        <div class="title">
          <h1 class="font-bold text-2xl">{{ data.name }}</h1>
        </div>
        <div class="price">
          <h2 class="font-bold text-xl">${{ data.price }}</h2>
        </div>
      </div>

      <div class="relative w-full my-10">
        <div class="absolute max-sm:bottom-36 max-sm:right-0 max-sm:left-0 z-8">
          <button
            class="relative max-sm:left-10 rounded-full p-2 bg-gray-300"
            @click="prev(data.imgDetails)"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-3xl" />
          </button>
          <button
            class="absolute max-sm:right-10 rounded-full p-2 bg-gray-300"
            @click="next(data.imgDetails)"
          >
            <font-awesome-icon
              icon="fa-solid fa-arrow-right"
              class="text-3xl"
            />
          </button>
        </div>
        <div
          v-for="(imgd, index) in data.imgDetails"
          :key="index"
          class="my-0 mx-auto"
        >
          <div
            v-if="index === currentIndex"
            class="card max-sm:w-46 w-52 max-sm:my-10 bg-slate-100 shadow-xl cursor-pointer my-0 mx-auto"
          >
            <img :src="imgd" alt="" class="max-sm:w-full w-48" />
          </div>
        </div>
      </div>
      <div class="h-screen w-full px-8 flex max-sm:flex-col max-sm:gap-2">
        <div class="description">
          <h1 class="font-bold">Description :</h1>
          <p class="max-sm:text-sm">{{ data.description }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <div class="colors" v-for="(color, key) in data.colors">
            <h1 class="font-bold">{{ key.toUpperCase() }}</h1>
            <img
              :src="color"
              alt=""
              class="w-20 cursor-pointer active:p-2"
              @click="chooseColor(color, key)"
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-1 w-full">
          <div
            class="border-2 rounded-xl p-1 w-16 text-center active:bg-yellow-400"
            v-for="(size, key) in data.size"
            :key="key"
          >
            <h1 @click="addSize(size)">
              {{ size }}
            </h1>
          </div>
        </div>

        <div class="">
          <div
            class="alert"
            :class="alert ? 'alert-success' : 'alert-error'"
            v-if="notif !== null"
          >
            <div class="flex-1">
              <label>{{ notif }}</label>
            </div>
          </div>
        </div>
        <div class="">
          <button
            class="max-sm:w-48 max-sm:h-10 rounded-xl bg-yellow-400 text-xl"
            @click="addToCart(data)"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--  -->

  <div class="h-auto max-sm:hidden bg-white text-black relative">
    <div v-for="data in details" class="flex flex-wrap">
      <div
        class="px-8 mt-32 max-w-[40rem] flex flex-col max-lg:my-0 max-lg:mx-auto max-lg:mt-32"
      >
        <div class="title">
          <h1 class="font-bold min-[640px]:text-3xl">{{ data.name }}</h1>
        </div>
        <div class="price mt-5">
          <h2 class="font-bold min-[640px]:text-2xl">${{ data.price }}</h2>
        </div>
        <div class="w-[600px] my-0 mx-auto">
          <div class="my-10 flex flex-wrap gap-10">
            <div
              v-for="(imgd, index) in data.imgDetails"
              :key="index"
              class="my-0 mx-auto"
            >
              <img :src="imgd" alt="" class="w-64 my-4 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-[600px] mt-32 px-8 flex flex-wrap max-lg:my-0 max-lg:mx-auto"
      >
        <div class="description">
          <h1 class="font-bold text-2xl">Description :</h1>
          <p class="max-sm:text-sm text-xl">{{ data.description }}</p>
        </div>
        <div class="flex flex-wrap gap-2 h-64">
          <div class="colors" v-for="(color, key) in data.colors">
            <h1 class="font-bold text-xl">{{ key.toUpperCase() }}</h1>
            <img
              :src="color"
              alt=""
              class="w-24 cursor-pointer active:p-2 hover:p-1"
              @click="chooseColor(color, key)"
            />
          </div>
          <div>
            <div class="flex flex-wrap w-full gap-2">
              <div
                class="border-2 rounded-xl p-1 w-16 text-center cursor-pointer hover:bg-yellow-400 active:bg-yellow-500"
                v-for="(size, key) in data.size"
                :key="key"
              >
                <h1 @click="addSize(size)">
                  {{ size }}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <div
            class="alert"
            :class="alert ? 'alert-success' : 'alert-error'"
            v-if="notif !== null"
          >
            <div class="flex-1">
              <label>{{ notif }}</label>
            </div>
          </div>
          <button
            class="max-sm:w-48 max-sm:h-10 mt-3 rounded-xl bg-yellow-400 text-xl w-72 h-16 mb-4"
            @click="addToCart(data)"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getDatas from "../../composable/getDatas"
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Loading from "../../components/Loading.vue"

import { inject } from "vue"

export default {
  components: {
    FontAwesomeIcon,
    // Loading,
  },
  setup() {
    const isAddToCart = ref(false)

    const route = useRoute()
    const currentIndex = ref(0)
    const sz = ref("")
    const color = ref(null)
    const colorName = ref(null)

    const notif = ref(null)
    const alert = ref(false)

    const { datas, error, load } = getDatas()
    load()

    const state = inject("carts")

    const addSize = (size) => {
      sz.value = size
    }
    const chooseColor = (colors, key) => {
      color.value = colors
      colorName.value = key
    }

    const addToCart = (data) => {
      let productIndex
      let productExist = state.carts.filter(function (item, index) {
        if (
          item.id === data.id &&
          item.size === sz.value &&
          item.img === color.value
        ) {
          productIndex = index

          return true
        } else {
          return false
        }
      })
      if (!isAddToCart.value) {
        isAddToCart.value = true
        if (productExist.length) {
          state.carts[productIndex].qty++
          notif.value = "Successfully add same product to cart"
          alert.value = true
          setTimeout(() => {
            notif.value = null
          }, 1000)
        } else if (sz.value && color.value) {
          state.carts.push({
            id: data.id,
            name: data.name,
            img: color.value,
            size: sz.value,
            price: data.price,
            qty: 1,
            selected: false,
            isCheckout: false,
          })
          sz.value = null
          color.value = null
          notif.value = "Successfully add product to cart"
          alert.value = true
          setTimeout(() => {
            notif.value = null
          }, 1000)
          console.log(state)
        } else {
          notif.value =
            "Failed add product to cart, please choose color or size first"
          alert.value = false
          setTimeout(() => {
            notif.value = null
          }, 1000)
        }
        setTimeout(() => {
          isAddToCart.value = false
        }, 2000)
      }
    }

    const details = computed(() => {
      return datas.value.filter((d) => d.id == route.params.id)
    })

    function next(img) {
      currentIndex.value = (currentIndex.value + 1) % img.length
    }

    function prev(img) {
      currentIndex.value = (currentIndex.value + img.length - 1) % img.length
    }

    return {
      datas,
      details,
      error,
      sz,
      addToCart,
      addSize,
      state,
      next,
      prev,
      currentIndex,
      notif,
      alert,
      chooseColor,
      isAddToCart,
    }
  },
}
</script>
<style></style>
