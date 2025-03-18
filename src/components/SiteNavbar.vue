<template>
  <div class="">
    <nav
      class="flex justify-between items-center bg-gray-500 text-white font-medium text-sm uppercase p-2 mb-6"
    >
      <h1
        class="font-semibold cursor-pointer italic font-serif text-xs"
        @click="$router.push('/')"
      >
        <svg
          data-slot="icon"
          class="w-8 flex items-center h-8"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
          ></path>
        </svg>
        Shopping Store
      </h1>

      <!-- Mobile Menu Icon -->
      <button @click="toggleDrawer" class="md:hidden focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div class="hidden md:flex">
        <ul class="flex items-center mr-12 space-x-3">
          <li>
            <router-link
              to="/"
              class="font-semibold nav-link transition-all duration-500"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/product-order"
              class="font-semibold nav-link transition-all duration-500"
              >Orders
            </router-link>
          </li>
        </ul>

        <div class="flex items-center space-x-4 justify-end">
          <router-link
            to="/product-cart"
            class="font-semibold nav-link items-center text-center text-xs transition-all duration-500"
          >
            <svg
              data-slot="icon"
              fill="lightgreen"
              class="w-6 h-6"
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
            {{ cart.length }}
          </router-link>
          <router-link
            to="/product-wishlist"
            class="font-semibold items-center text-xs text-center transition-all duration-500"
          >
            <svg
              data-slot="icon"
              fill="white"
              class="w-6 h-6"
              stroke-width="1.5"
              stroke="red"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              ></path>
            </svg>
            {{ wishlist.length }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Mobile Drawer Menu -->
    <div
      class="fixed inset-0 cursor-pointer bg-gray-900 opacity-80 z-50 transition-opacity duration-300"
      v-if="drawerOpen"
      @click="toggleDrawer"
    ></div>

    <div
      class="fixed left-0 top-0 h-full w-64 bg-green-200 shadow-lg transform transition-transform duration-500 ease-in-out z-50"
      :class="{ 'translate-x-0': drawerOpen, '-translate-x-full': !drawerOpen }"
    >
      <!-- Close Button -->
      <button
        @click="toggleDrawer"
        class="absolute cursor-pointer top-3 right-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Mobile Navigation Links -->
      <div class="flex flex-col mt-10 space-y-4 px-4">
        <router-link to="/" class="nav-link" @click="toggleDrawer"
          >Home</router-link
        >
        <router-link to="/product-cart" class="nav-link" @click="toggleDrawer"
          >Cart ({{ cart.length }})</router-link
        >
        <router-link
          to="/product-wishlist"
          class="nav-link"
          @click="toggleDrawer"
          >Wishlist ({{ wishlist.length }})</router-link
        >
        <router-link to="/product-order" class="nav-link" @click="toggleDrawer"
          >Orders
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      drawerOpen: false, // Mobile drawer state
    };
  },
  computed: {
    ...mapState(["cart", "wishlist"]),
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
  },
};
</script>

<style>
.nav-link {
  text-decoration: none;
  transition: background-color 0.3s;
}

.router-link-active {
  color: rgb(1, 1, 14);
}

/* Smooth Transform for Drawer */
.transition-transform {
  will-change: transform;
}
</style>
