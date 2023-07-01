<template>
  <div
    class="mt-2 bg-white p-2 border-2 flex justify-between"
    v-if="state.carts.length >= 1"
  >
    <div>
      <label :for="selectAll" class="flex">
        <input
          type="checkbox"
          class="form-checkbox h-4 text-indigo-600 w-4 mt-3"
          v-model="selectAll"
          @change="onSelectAllChange()"
        />
        <h1 class="font-bold p-2">Select All</h1>
      </label>
    </div>
    <div class="flex">
      <label
        for="my-modal-2"
        class="modal-button btn rounded bg-yellow-400 cursor-pointer text-black hover:bg-yellow-500"
      >
        <span class="">Checkout</span>
      </label>
      <input type="checkbox" id="my-modal-2" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box bg-yellow-400">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-black">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              class="input input-bordered text-white"
              v-model="form.fullname"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-black">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              class="input input-bordered text-white"
              v-model="form.email"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-black">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              class="input input-bordered text-white"
              v-model="form.address"
              required
            />
          </div>

          <div class="p-4 my-2 card">
            <h1>Payment :</h1>
            <div class="form-control">
              <label class="cursor-pointer label">
                <img src="/public/assets/paypal.svg" alt="" class="w-16" />

                <input
                  type="radio"
                  name="opt"
                  class="radio border-2 border-black"
                  value="paypal"
                  v-model="form.payment"
                />
              </label>
            </div>
            <div class="form-control">
              <label class="cursor-pointer label">
                <img
                  src="/public/assets/paywithgoogle.svg"
                  alt=""
                  class="w-16"
                />

                <input
                  type="radio"
                  name="opt"
                  class="radio border-2 border-black"
                  value="gpay"
                  v-model="form.payment"
                />
              </label>
            </div>
          </div>
          <div v-if="selects >= 1">
            <h1 class="text-xl">Total Price = ${{ finalPrice }}</h1>
            <p>(Include Tax and Shipping)</p>
          </div>
          <div v-else></div>

          <div class="modal-action">
            <label
              for="my-modal-2"
              class="rounded bg-black text-white btn"
              @click="checkout()"
              >Checkout</label
            >
            <label for="my-modal-2" class="btn">Cancel</label>
          </div>
        </div>
      </div>
      <h1 class="text-base mdL:text-xl p-2">
        Total Price <span class="font-bold">${{ cartTotal }}</span>
      </h1>
    </div>
  </div>
</template>
<script>
import { reactive, inject, ref, watch, computed } from "vue"

import { useToast } from "vue-toast-notification"
import "vue-toast-notification/dist/theme-sugar.css"

export default {
  setup() {
    const state = inject("carts")
    const toast = useToast()
    const selectAll = ref(false)

    const form = reactive({
      fullname: "",
      email: "",
      address: "",
      payment: "",
    })

    const cartTotal = computed(() => {
      let sum = 0
      const cart = state.carts.filter((item) => item.selected)
      for (let key in cart) {
        sum = sum + state.carts[key].price * state.carts[key].qty
      }
      return sum
    })

    const tax = ref(0.1)
    const shipping = ref(5)

    const priceAfterTax = computed(() => {
      return cartTotal.value * (1 + tax.value)
    })

    const priceAfterShipping = computed(() => {
      return priceAfterTax.value + shipping.value
    })

    const finalPrice = computed(() => {
      return priceAfterShipping.value.toFixed()
    })

    const checkout = () => {
      const selectedItems = state.carts.filter((item) => item.selected == true)
      const isCheckout = state.carts.filter((item) => item.isCheckout == false)

      if (selectedItems.length <= 0) {
        toast.error("Please choose item first", { position: "top" })
      } else if (
        form.fullname == "" ||
        form.email == "" ||
        form.address == "" ||
        form.payment == ""
      ) {
        toast.error("Please fill out all fields", { position: "top" })
      } else {
        state.carts = state.carts.filter((item) => !item.selected)
        Object.assign(form, {
          fullname: "",
          email: "",
          address: "",
          payment: "",
        })
        toast.success("Checkout Success", { position: "top" })
      }
    }

    const selects = computed(() => {
      const selectedItems = state.carts.filter((item) => item.selected == true)
      return selectedItems.length
    })

    const isAllSelect = () => {
      return state.carts.every((item) => item.selected)
    }

    const updateSelectAll = () => {
      selectAll.value = isAllSelect()
    }

    const onSelectAllChange = () => {
      state.carts.forEach((item) => (item.selected = selectAll.value))
    }
    const onItemChange = (index) => {
      if (!state.carts[index].selected) {
        selectAll.value = false
      } else {
        updateSelectAll()
      }
    }

    watch(
      state.carts,
      () => {
        updateSelectAll()
      },
      { deep: true }
    )

    return {
      form,
      checkout,
      state,
      selectAll,
      isAllSelect,
      updateSelectAll,
      onSelectAllChange,
      onItemChange,
      cartTotal,
      finalPrice,
      priceAfterTax,
      priceAfterShipping,
      selects,
    }
  },
}
</script>
<style></style>
