<template>
  <NavSlide />
  <section class="h-auto bg-slate-100 dark:bg-black">
    <div v-if="error">{{ error }}</div>
    <div v-if="wproduct.length">
      <h1 class="text-center text-3xl pt-6 dark:text-white text-black">
        WOMENS
      </h1>
      <WomenProduct :womens="wproduct" />
    </div>
    <div v-else>
      <Loading />
    </div>
    <About />
  </section>
</template>
<script>
import NavSlide from "../../components/NavSlide.vue"
import WomenProduct from "../../components/products/WomenProduct.vue"
import getDatas from "../../composable/getDatas"
import Loading from "../../components/Loading.vue"
import About from "../../components/About.vue"
import { computed } from "vue"
export default {
  components: {
    WomenProduct,
    NavSlide,
    About,
    Loading,
  },
  setup() {
    const { datas, error, load } = getDatas()
    load()
    const wproduct = computed(() => {
      return datas.value.filter((w) => w.sex === "women")
    })

    return { datas, error, load, wproduct }
  },
}
</script>
