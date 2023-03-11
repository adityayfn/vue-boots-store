<template>
  <div class="md:mx-28 px-20 relative min-[640px]:hidden">
    <div class="absolute max-sm:bottom-1/2 max-sm:right-0 max-sm:left-1 z-8">
      <button
        class="relative max-sm:left-8 rounded-full p-2 bg-black"
        @click="prev"
      >
        <font-awesome-icon
          icon="fa-solid fa-arrow-left"
          class="text-3xl text-white"
        />
      </button>
      <button
        class="absolute max-sm:right-8 rounded-full p-2 bg-black"
        @click="next"
      >
        <font-awesome-icon
          icon="fa-solid fa-arrow-right"
          class="text-3xl text-white"
        />
      </button>
    </div>
    <div
      class=""
      v-for="(data, index) in datas"
      :key="data.id"
      @click="getDetails(data.id)"
    >
      <div
        v-if="index === currentIndex"
        class="card max-sm:w-46 w-52 max-sm:my-10 my-0 mx-auto bg-slate-100 shadow-xl cursor-pointer"
      >
        <figure>
          <img
            :src="hovering === data.id ? data.hover : data.imgThumb"
            alt="Shoes"
            @mouseenter="hovering = data.id"
            @mouseleave="hovering = false"
          />
        </figure>
        <div class="p-3 relative h-32">
          <h6 class="font-bold text-sm text-black">{{ data.name }}</h6>
          <h2 class="absolute font-bold bottom-4 text-black">
            ${{ data.price }}
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
      class="card max-sm:w-42 w-48 max-sm:my-4 my-10 mx-auto bg-slate-100 shadow-xl cursor-pointer gap-3 border-2"
      v-for="data in datas"
      @click="getDetails(data.id)"
    >
      <figure>
        <img
          :src="hovering === data.id ? data.hover : data.imgThumb"
          alt="Shoes"
          @mouseenter="hovering = data.id"
          @mouseleave="hovering = false"
          class="w-48"
        />
      </figure>
      <div class="p-3 relative h-32">
        <h6 class="font-bold text-sm text-black">{{ data.name }}</h6>
        <h2 class="absolute font-bold bottom-4 text-black">
          ${{ data.price }}
        </h2>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

export default {
  props: ["datas"],
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    const hovering = ref(false)
    const router = useRouter()
    const currentIndex = ref(0)

    function getDetails(id) {
      return router.push({ name: "Details", params: { id: id } })
    }

    function next() {
      currentIndex.value = (currentIndex.value + 1) % props.datas.length
    }

    function prev() {
      currentIndex.value =
        (currentIndex.value + props.datas.length - 1) % props.datas.length
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
