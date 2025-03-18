import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    filteredProducts: [],
    categories: [],
    cart: [],
    wishlist: [],
    brands: [],
    searchQuery: "",
    selectedCategory: "",
    sortOption: "",
    currentPage: 1,
    itemsPerPage: 6,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products || [];
      state.filteredProducts = products || [];
      state.categories = [...new Set(products.map((p) => p.category))];
      state.brands = [...new Set(products.map((p) => p.brand))];
    },
    ADD_TO_WISHLIST(state, product) {
      if (!state.wishlist.some((item) => item.id === product.id)) {
        state.wishlist.push(product);
      }
    },
    REMOVE_FROM_WISHLIST(state, productId) {
      state.wishlist = state.wishlist.filter((item) => item.id !== productId);
    },

    FILTER_BY_PRICE(state, maxPrice) {
      state.filteredProducts = state.products.filter(
        (p) => p.price <= maxPrice
      );
    },

    //  Searching Product
    SEARCH_PRODUCTS(state, query) {
      const searchTerm = typeof query === "string" ? query.toLowerCase() : "";

      let products = [...state.products];

      // Apply category filter if a category is selected
      if (state.selectedCategory) {
        products = products.filter(
          (p) => p.category === state.selectedCategory
        );
      }

      // Apply search filter
      state.filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm)
      );
    },

    ADD_TO_CART(state, product) {
      const item = state.cart.find((item) => item.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    DECREMENT_QUANTITY(state, productId) {
      const item = state.cart.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== productId);
      }
    },

    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },

    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find((item) => item.id === productId);
      if (item) item.quantity = quantity;
    },

    FILTER_PRODUCTS(state) {
      let products = [...state.products];

      // Apply category filter if selected
      if (state.selectedCategory) {
        products = products.filter(
          (p) => p.category === state.selectedCategory
        );
      }

      // Apply brand filter if selected
      if (state.selectedBrand) {
        products = products.filter((p) => p.brand === state.selectedBrand);
      }

      // Apply search filter
      if (state.searchQuery) {
        products = products.filter((p) =>
          p.title.toLowerCase().includes(state.searchQuery)
        );
      }

      state.filteredProducts = products;
    },

    SORT_PRODUCTS(state, option) {
      state.sortOption = option;
      state.filteredProducts.sort((a, b) => {
        if (option === "name") return a.title.localeCompare(b.title);
        if (option === "price-low") return a.price - b.price;
        if (option === "price-high") return b.price - a.price;
      });
    },

    SET_PAGE(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        commit("SET_PRODUCTS", data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
  getters: {
    wishlistItems: (state) => state.wishlist,
    isWishlisted: (state) => (id) =>
      state.wishlist.some((item) => item.id === id),

    paginatedProducts(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredProducts.slice(start, start + state.itemsPerPage);
    },
    totalPages(state) {
      return Math.ceil(state.filteredProducts.length / state.itemsPerPage);
    },
    totalCartPrice(state) {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});
