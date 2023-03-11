<template>
  <div class="md:mx-28 px-20 relative min-[640px]:hidden text-black">
    <div class="absolute max-sm:bottom-1/2 max-sm:right-0 max-sm:left-1 z-8">
      <button
        class="relative max-sm:left-8 rounded-full p-2 bg-gray-300"
        @click="prev"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-3xl" />
      </button>
      <button
        class="absolute max-sm:right-8 rounded-full p-2 bg-gray-300"
        @click="next"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-3xl" />
      </button>
    </div>
    <div
      class=""
      v-for="(men, index) in mens"
      :key="men.id"
      @click="getDetails(men.id)"
    >
      <div
        v-if="index === currentIndex"
        class="card max-sm:w-46 w-52 max-sm:my-10 my-0 mx-auto bg-slate-100 shadow-xl cursor-pointer"
      >
        <figure>
          <img
            :src="hovering === men.id ? men.hover : men.imgThumb"
            alt="Shoes"
            @mouseenter="hovering = men.id"
            @mouseleave="hovering = false"
          />
        </figure>
        <div class="p-3 relative h-32">
          <h6 class="font-bold text-sm text-black">{{ men.name }}</h6>
          <h2 class="absolute font-bold bottom-4 text-black">
            ${{ men.price }}
          </h2>
        </div>
      </div>
    </div>
  </div>
  <!--  -->

  <div
    class="flex flex-wrap min-[768px]:px-16 max-sm:hidden min-[768px]:w-full min-[1100px]:px-32"
  >
    <div
      class="card max-sm:w-42 w-52 max-sm:my-4 my-10 mx-auto bg-slate-100 shadow-xl cursor-pointer gap-3"
      v-for="men in mens"
      @click="getDetails(men.id)"
    >
      <figure>
        <img
          :src="hovering === men.id ? men.hover : men.imgThumb"
          alt="Shoes"
          @mouseenter="hovering = men.id"
          @mouseleave="hovering = false"
        />
      </figure>
      <div class="p-3 relative h-32">
        <h6 class="font-bold text-sm text-black">{{ men.name }}</h6>
        <h2 class="absolute font-bold bottom-4 text-black">${{ men.price }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router"
import { ref } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
export default {
  props: ["mens"],
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    const router = useRouter()
    const hovering = ref(false)
    const currentIndex = ref(0)
    function getDetails(id) {
      return router.push({ name: "Details", params: { id: id } })
    }
    function next() {
      currentIndex.value = (currentIndex.value + 1) % props.mens.length
    }

    function prev() {
      currentIndex.value =
        (currentIndex.value + props.mens.length - 1) % props.mens.length
    }

    return {
      getDetails,
      hovering,
      currentIndex,
      next,
      prev,
    }
  },
}
</script>
