<template>
  <NavSlide />
  <section class="h-full bg-slate-100">
    <div v-if="error">{{ error }}</div>
    <div v-if="datas.length">
      <h1 class="text-center text-3xl pt-6 text-black">SHOP NEW ARRIVAL</h1>
      <HomeProduct :datas="datas" />
    </div>
    <div v-else>
      <Loading />
    </div>
    <About />
  </section>
</template>
<script>
import NavSlide from "../components/NavSlide.vue"
import About from "../components/About.vue"
import HomeProduct from "../components/products/HomeProduct.vue"
import getDatas from "../composable/getDatas"
import Loading from "../components/Loading.vue"

export default {
  components: {
    NavSlide,
    HomeProduct,
    About,
    Loading,
  },
  setup() {
    const { datas, error, load } = getDatas()
    load()

    return { datas, error, load }
  },
}
</script>
