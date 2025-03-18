import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/views/ProductList.vue";
import ProductCart from "@/views/ProductCart.vue";
import ProductWishlist from "@/views/ProductWishlist.vue";
import ProductOrder from "@/views/ProductOrder.vue";
const routes = [
  { path: "/", component: ProductList },
  { path: "/product-cart", component: ProductCart },
  { path: "/product-wishlist", component: ProductWishlist },
  { path: "/product-order", component: ProductOrder },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
