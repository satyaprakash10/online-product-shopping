<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4 text-gray-800">
      My Wishlist:
      <!-- <span v-if="wishlist.length"> ({{ wishlist.length }})</span> -->
    </h1>

    <div v-if="wishlist.length">
      <div
        v-for="product in wishlist"
        :key="product.id"
        class="border border-gray-400 rounded-md px-2 py-2 shadow-lg mb-2"
      >
        <div class="flex items-center justify-between">
          <div class="bg-gray-200 rounded-lg">
            <img :src="product.thumbnail" class="h-20 w-30" />
          </div>

          <h2 class="font-bold text-gray-800 text-sm sm:text-base font-sans">
            {{ product.title }}
          </h2>
          <p class="text-gray-500 text-sm sm:text-base">${{ product.price }}</p>
          <div>
            <button class="" @click="removeFromWishlist(product.id)">
              <!-- class="bg-red-500 font-medium text-xs sm:text-sm rounded-xl cursor-pointer hover:bg-red-600 transition-all duration-500 ease-in text-white px-1 py-2" -->
              <svg
                data-slot="icon"
                class="w-6 cursor-pointer"
                fill="none"
                stroke-width="1.5"
                stroke="red"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-600">Your wishlist is empty.</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["wishlist"]),
  },
  methods: {
    ...mapMutations(["REMOVE_FROM_WISHLIST"]),
    removeFromWishlist(id) {
      this.REMOVE_FROM_WISHLIST(id);
    },
  },
};
</script>
