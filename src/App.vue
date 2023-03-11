<template>
  <div class="relative">
    <div v-if="!isLoad" class="my-0 mx-auto">
      <Loading />
    </div>
    <div v-if="isLoad">
      <Navbar />
      <router-view></router-view>

      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"

import Footer from "./components/Footer.vue"
import Loading from "./components/Loading.vue"

import { ref, onMounted } from "vue"
export default {
  components: {
    Navbar,
    Footer,
    Loading,
  },
  setup() {
    const isLoad = ref(false)

    onMounted(() => {
      setTimeout(() => {
        isLoad.value = true
      })
    })

    return {
      isLoad,
    }
  },
}
</script>

<style scoped></style>
