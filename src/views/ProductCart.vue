<template>
  <div class="sm:container sm:mx-auto w-full p-3 sm:p-6">
    <h1 class="text-3xl underline text-gray-800 font-bold mb-4">
      Shopping Basket:
      <!-- <span v-if="cart.length"> ({{ cart.length }})</span> -->
    </h1>

    <div v-if="cart.length" class="sm:flex w-full space-x-10 justify-between">
      <div class="w-full">
        <div
          v-for="item in cart"
          :key="item.id"
          class="border border-gray-300 rounded-lg group cursor-pointer hover:bg-blue-100 bg-gray-50 transition-all duration-500 ease-in px-2 sm:px-4 py-2 shadow-lg mb-2 sm:flex justify-between items-center"
        >
          <div class="">
            <div class="bg-gray-200 rounded-lg h-40 w-full">
              <img
                :src="item.images"
                class="h-full object-contain group-hover:bg-white rounded-lg w-full"
              />
            </div>
            <h2 class="font-bold w-50 group-hover:underline mt-3">
              {{ item.title }}
            </h2>
            <p class="text-gray-60 mt-3 sm:mt-00">${{ item.price }} each</p>
          </div>
          <div>
            <div
              class="flex bg-gray-200 mt-3 sm:mt-0 rounded-2xl group-hover:bg-white p-2 justify-center items-center"
            >
              <button
                @click="decrementQuantity(item.id)"
                class="bg-gray-800 rounded-md cursor-pointer hover:bg-red-500 text-white px-2"
              >
                -
              </button>
              <span class="px-4">{{ item.quantity }}</span>
              <button
                @click="incrementQuantity(item.id)"
                class="bg-gray-800 rounded-md cursor-pointer hover:bg-indigo-500 text-white px-2"
              >
                +
              </button>
            </div>

            <p class="text-gray-600 mt-3 font-bold">
              ${{ item.price * item.quantity }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="rounded-md w-full relative shadow-xl sm:w-80 gap-4 mb-4 order-1 sm:order-2"
        style="background-color: oklch(0.95 0 0)"
      >
        <div class="py-2 px-2 mt-5 sm:mt-0">
          <h6 class="text-gray-600 text-base font-medium">Order Summmary</h6>
          <p
            class="text-gray-400 mt-2 text-sm flex w-full justify-between font-normal"
          >
            Subtotal: <span>${{ totalCartPrice }}</span>
          </p>
          <hr class="text-gray-200 mt-2 mb-2" />
          <p
            class="text-gray-400 mt-2 text-sm flex w-full justify-between font-normal"
          >
            Shipping:
            <span class="text-green-500">Free</span>
          </p>
          <hr class="text-gray-200 mt-2 mb-2" />
          <p
            class="text-gray-400 mt-2 text-sm flex w-full justify-between font-normal"
          >
            Tax:
            <span class="text-red-500"
              >GST: <span class="text-xs text-gray-400">10%</span></span
            >
          </p>
          <hr class="text-gray-200 mt-2 mb-2" />
          <p
            class="text-gray-400 mt-2 text-sm flex w-full justify-between font-normal"
          >
            Payment Mode:
            <span class="text-blue-500">@UPI</span>
          </p>
          <hr class="text-gray-200 mt-2" />
          <a
            href="#"
            class="text-indigo-500 flex items-center mt-2 hover:text-indigo-800 text-sm font-normal cursor-pointer"
            >Coupon Apply
            <svg
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              ></path></svg
          ></a>
        </div>

        <div
          class="bg-gray-200 absolute bottom-0 w-full rounded-b-md px-2 border-t-1 border-gray-400"
        >
          <p class="text-sm flex mt-1 w-full justify-between font-semibold">
            Total:
            <span class="text-gray-500 font-medium text-xs font-semibold"
              >${{ totalCartPrice }}</span
            >
          </p>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-600">Your basket is empty.</p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["cart", "wishlist"]),
    ...mapGetters(["totalCartPrice"]),
  },
  methods: {
    ...mapMutations(["ADD_TO_CART", "DECREMENT_QUANTITY"]),

    incrementQuantity(id) {
      this.$store.commit("ADD_TO_CART", { id });
    },
    decrementQuantity(id) {
      this.$store.commit("DECREMENT_QUANTITY", id);
    },
  },
};
</script>
