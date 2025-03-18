<template>
  <div class="bg-gray-50">
    <SiteNavbar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import SiteNavbar from "./components/SiteNavbar.vue";

export default {
  components: {
    SiteNavbar,
  },
};
</script>

<style></style>
