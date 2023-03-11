<template>
  <nav
    class="navbar flex items-center justify-between flex-wrap bg-teal p-3 fixed w-full z-10 text-white bg-black"
  >
    <div class="flex items-center flex-no-shrink ml-6">
      <router-link
        :to="{ name: 'Home' }"
        class="block sm:inline-block sm:mt-0 text-xl mr-4"
        ><img
          src="/public/assets/drm-logo.svg"
          alt=""
          class="w-12 md:w-20 h-16 ml-10 cursor-pointer"
      /></router-link>
    </div>

    <Cart />
    <div class="block sm:hidden fixed left-0 top-2">
      <button
        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none left-0"
        type="button"
        @click="toggleNav()"
      >
        <font-awesome-icon icon="fa-bars" class="text-3xl p-3" />
      </button>
    </div>
    <div
      :class="showMenu ? 'block' : 'hidden'"
      class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
    >
      <div class="flex text-sm sm:flex-grow justify-between relative">
        <ul class="p-3 ml-5 block relative">
          <router-link
            :to="{ name: 'Home' }"
            class="block sm:inline-block sm:mt-0 text-xl mr-4"
            >For All</router-link
          >
          <router-link
            :to="{ name: 'ShowMens' }"
            class="block sm:inline-block sm:mt-0 text-xl mr-4"
            >Mens</router-link
          >
          <router-link
            :to="{ name: 'ShowWomens' }"
            class="block sm:inline-block sm:mt-0 text-xl mr-4"
            >Womens</router-link
          >
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { ref } from "vue"
import Cart from "../components/Cart.vue"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
export default {
  components: {
    Cart,

    FontAwesomeIcon,
  },
  setup() {
    let showMenu = ref(false)
    const toggleNav = () => {
      showMenu.value = !showMenu.value
    }

    return {
      showMenu,
      toggleNav,
    }
  },
}
</script>
<style></style>
