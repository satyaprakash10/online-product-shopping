<template>
  <div class="flex justify-center gap-2">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="setPage(page)"
      class="px-4 py-2 border"
      :class="{ 'bg-blue-500 text-white': page === currentPage }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["totalPages", "currentPage"],
  emits: ["update:currentPage"],
  methods: {
    setPage(page) {
      this.$emit("update:currentPage", page);
    },
  },
};
</script>
