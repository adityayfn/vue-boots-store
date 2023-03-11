<template>
  <div class="pt-20">
    <Splide
      :options="{
        rewind: true,
        autoplay: true,
      }"
    >
      <SplideSlide>
        <div class="h-96 bg-right slide">
          <div class="absolute left-[480px] bottom-36 max-md:hidden">
            <h1 class="text-center text-3xl font-bold bg-black text-white p-2">
              TURN UP THE VOLUME
            </h1>
            <button
              class="bg-yellow-400 p-4 font-bold text-black mt-2 absolute left-20"
            >
              SHOP BESTSELLERS
            </button>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="h-96 bg-center slide2">
          <div class="absolute left-[480px] bottom-36 w-72 max-md:hidden">
            <h1 class="text-center text-3xl font-bold bg-black text-white p-2">
              STEP IT UP
            </h1>
            <button
              class="bg-yellow-400 p-4 font-bold text-black mt-2 absolute left-7"
            >
              SHOP PLATFORM SHOES
            </button>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="h-96 bg-center slide3">
          <div class="absolute right-10 bottom-36 max-md:hidden">
            <h1 class="text-right text-3xl font-bold bg-black text-white p-2">
              ATTITUDE WITHOUT THE LEATHER
            </h1>
            <button
              class="bg-yellow-400 p-4 font-bold text-black mt-2 absolute right-0"
            >
              SHOP VEGAN
            </button>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>
<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide"
import "@splidejs/vue-splide/css"
export default {
  components: {
    Splide,
    SplideSlide,
  },
}
</script>
<style scoped>
.slide {
  background-image: url("/public/assets/navslide.jpeg");
}
.slide2 {
  background-image: url("/public/assets/navslide2.jpeg");
}
.slide3 {
  background-image: url("/public/assets/navslide3.jpeg");
}
</style>
