<template>
  <NavSlide />
  <section class="h-auto bg-slate-100 dark:bg-black">
    <div v-if="error">{{ error }}</div>
    <div v-if="mproduct.length">
      <h1 class="text-center text-3xl pt-6 dark:text-white text-black">MENS</h1>
      <MenProduct :mens="mproduct" />
    </div>
    <div v-else>
      <Loading />
    </div>
    <About />
  </section>
</template>
<script>
import NavSlide from "../../components/NavSlide.vue"
import MenProduct from "../../components/products/MenProduct.vue"
import getDatas from "../../composable/getDatas"
import Loading from "../../components/Loading.vue"
import About from "../../components/About.vue"
import { computed } from "vue"
export default {
  components: {
    MenProduct,
    NavSlide,
    About,
    Loading,
  },
  setup() {
    const { datas, error, load } = getDatas()
    load()
    const mproduct = computed(() => {
      return datas.value.filter((m) => m.sex === "men")
    })
    return { datas, error, load, mproduct }
  },
}
</script>
