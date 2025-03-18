<template>
  <transition name="modal-fade">
    <div>
      <div
        class="bg-gray-800 absolute transition-all duration-500 ease-in-out inset-0 opacity-90"
        v-show="show"
      ></div>
      <div
        v-if="show"
        class="fixed inset-0 flex justify-center items-center z-50"
      >
        <transition name="modal-scale">
          <div
            class="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full relative"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute cursor-pointer top-2 right-2 text-gray-600 hover:text-red-500"
            >
              <svg
                data-slot="icon"
                fill="none"
                class="w-7 h-7"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
            </button>

            <h2 class="text-2xl font-bold mb-2">{{ product.title }}</h2>
            <img
              :src="product.thumbnail"
              class="w-full h-64 object-contain rounded-lg bg-gray-100 mb-4"
            />
            <hr class="text-gray-200 mt-2 mb-2" />

            <div class="inline-block sm:flex items-center justify-between">
              <p class="text-gray-500">
                <strong class="text-gray-800">Price:</strong> ${{
                  product.price
                }}
              </p>
              <p class="text-green-600">
                <strong class="text-gray-500">Brand:</strong>
                {{ product.brand }}
              </p>
              <p class="text-indigo-500">
                <strong class="text-gray-500">Category:</strong>
                {{ product.category }}
              </p>
            </div>
            <hr class="text-gray-200 mt-2 mb-2" />

            <p class="mt-2 text-gray-500 font-normal text-sm">
              {{ product.description }}
            </p>
            <div class="mt-5 sm:mt-4 flex items-center justify-between">
              <!-- Add to Cart -->
              <button
                @click="addToCart(product)"
                class="bg-indigo-500 flex items-center font-normal text-xs sm:text-sm rounded-3xl w-auto cursor-pointer hover:bg-indigo-600 transition-all duration-500 ease-in text-white px-3 py-2"
              >
                Add to Basket
                <svg
                  data-slot="icon"
                  fill="gray"
                  class="w-6 h-6 ml-2"
                  stroke-width="1.5"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  ></path>
                </svg>
              </button>
              <!-- Add Item Wishlist -->
              <button @click="toggleWishlist(product)">
                <svg
                  v-if="isWishlisted(product.id)"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 text-white cursor-pointer"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-6 h-6 text-gray-300 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    show: Boolean,
    product: Object,
  },
  computed: {
    ...mapState(["cart", "wishlist", "isWishlisted"]),

    isWishlisted() {
      return (id) => (this.wishlist || []).some((item) => item.id === id);
    },
  },

  methods: {
    ...mapMutations(["ADD_TO_CART", "ADD_TO_WISHLIST", "REMOVE_FROM_WISHLIST"]),
    closeModal() {
      this.$emit("close");
    },
    addToCart(product) {
      this.$store.commit("ADD_TO_CART", product);
      this.$router.push("/product-cart");
    },
    toggleWishlist(product) {
      if (this.isWishlisted(product.id)) {
        this.REMOVE_FROM_WISHLIST(product.id);
      } else {
        this.ADD_TO_WISHLIST(product);
      }
    },
  },
};
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active {
  transition: transform 0.3s ease-in-out;
}
.modal-scale-enter {
  transform: scale(1.1);
}
.modal-scale-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
