<template>
  <div
    class="w-full relative sm:flex inline-block sm:space-x-10 space-y-5 sm:space-y-0 sm:p-6 p-3"
  >
    <div class="w-full order-2 sm:order-1">
      <h1
        class="sm:text-3xl font-semibold underline font-gray-600 text-xl mb-4"
      >
        Product Catalogs
      </h1>

      <!-- Search Bar -->
      <SearchBar v-model="searchText" @search="searchProducts" />

      <!-- Product Grid section -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5"
      >
        <div
          v-for="product in displayedProducts"
          :key="product.id"
          class="border border-gray-100 hover:border-gray-300 hover:bg-blue-50 group transition-all duration-500 ease-in-out cursor-pointer rounded-md px-2 py-2 sm:px-4 sm:py-4 shadow-xl"
        >
          <div class="bg-gray-200 rounded-md">
            <img
              @click="openProductModal(product)"
              :src="product.thumbnail"
              class="h-50 group-hover:scale-80 transition-all duration-800 ease-in-out w-full object-fit mb-2"
            />
          </div>

          <hr class="border-gray-200 mt-2 mb-2" />

          <h2 class="font-semibold text-sm sm:text-base text-gray-700">
            {{ product.title }}
          </h2>
          <p class="text-gray-400 text-sm sm:text-md font-normal">
            ${{ product.price }}
          </p>
          <!-- Add Item -->
          <div class="mt-2 sm:mt-4 flex items-center justify-between">
            <button
              @click="addToCart(product)"
              class="bg-indigo-500 font-normal text-xs sm:text-sm rounded-3xl w-50 sm:w-30 cursor-pointer hover:bg-indigo-600 transition-all duration-500 ease-in text-white px-2 py-1"
            >
              Add to Basket
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
      </div>

      <!-- See More Button -->
      <div class="mt-5 flex justify-center">
        <button
          v-if="displayedProducts.length < filteredProducts.length"
          @click="loadMoreProducts"
          class="bg-gray-500 font-normal text-xs sm:text-sm rounded-2xl w-30 cursor-pointer hover:bg-gray-600 transition-all duration-500 ease-in text-white px-2 py-2"
        >
          Load More
        </button>
      </div>
    </div>

    <!-- Product Filters -->
    <div
      class="rounded-md px-2 sm:px-4 py-2 sm:py-4 gap-4 mb-4 order-1 sm:order-2"
      style="background-color: oklch(0.95 0 0)"
    >
      <!-- Categories Filter -->
      <FilterDropdown
        v-model="selectedFilter"
        :categories="categories"
        :brands="brands"
        @update:modelValue="filterProducts"
      />

      <!-- Price & Name Filter -->
      <select
        @change="sortProducts($event.target.value)"
        class="border border-gray-400 rounded-md w-full cursor-pointer mt-5 sm:mt-5 p-2"
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>

      <div class="w-full sm:absolute bottom-15 mt-10 mb-2 sm:mt-0 sm:mb-0">
        <button
          @click="this.$router.push('/product-cart')"
          class="bg-green-500 flex items-center justify-between space-x-3 font-normal text-xs sm:text-sm rounded-3xl w-auto cursor-pointer hover:bg-green-600 transition-all duration-500 ease-in text-white px-3 py-2"
        >
          Go to Cart
          <span class="ml-3"
            ><svg
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              class="w-4"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              ></path></svg
          ></span>
        </button>
      </div>
    </div>

    <!-- Product Detail Modal -->
    <ProductDetailModal
      :show="showModal"
      :product="selectedProduct"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
import FilterDropdown from "@/components/FilterDropdown.vue";
import ProductDetailModal from "@/components/ProductDetailModal.vue";

export default {
  components: {
    SearchBar,
    FilterDropdown,
    ProductDetailModal,
  },
  data() {
    return {
      searchText: "",
      itemsPerPage: 6,
      selectedFilter: "",
      showModal: false,
    };
  },
  computed: {
    ...mapState([
      "cart",
      "categories",
      "searchQuery",
      "selectedCategory",
      "currentPage",
      "wishlist",
      "isWishlisted",
    ]),
    ...mapGetters(["paginatedProducts", "filteredProducts", "totalPages"]),

    isWishlisted() {
      return (id) => (this.wishlist || []).some((item) => item.id === id);
    },
    filteredProducts() {
      return this.$store.state.filteredProducts || [];
    },
    displayedProducts() {
      return this.filteredProducts.slice(0, this.itemsPerPage);
    },
    getCartItem() {
      return (id) =>
        this.cart.find((item) => item.id === id) || { quantity: 0 };
    },
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    ...mapMutations([
      "ADD_TO_CART",
      "FILTER_PRODUCTS",
      "ADD_TO_WISHLIST",
      "REMOVE_FROM_WISHLIST",
      "SEARCH_PRODUCTS",
      "SET_PAGE",
      "SORT_PRODUCTS",
    ]),
    openProductModal(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
    toggleWishlist(product) {
      if (this.isWishlisted(product.id)) {
        this.REMOVE_FROM_WISHLIST(product.id);
      } else {
        this.ADD_TO_WISHLIST(product);
      }
    },
    sortProducts(option) {
      this.SORT_PRODUCTS(option);
    },
    filterProducts(filterValue) {
      this.FILTER_PRODUCTS(filterValue);
    },
    searchProducts() {
      this.SEARCH_PRODUCTS(this.searchText || "");
    },
    loadMoreProducts() {
      this.itemsPerPage += 6; // Load 6 more products
    },
    decrementQuantity(product) {
      this.$store.commit("DECREMENT_QUANTITY", product.id);
    },
    addToCart(product) {
      this.$store.commit("ADD_TO_CART", product);
      this.$router.push("/product-cart");
    },
  },
  mounted() {
    this.fetchProducts().then(() => {
      if (!this.wishlist) this.$store.state.wishlist = []; // ✅ Initialize wishlist if missing
    });
  },
};
</script>
