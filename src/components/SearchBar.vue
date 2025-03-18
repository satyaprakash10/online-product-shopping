<template>
  <input
    v-model="searchText"
    @input="onSearch"
    type="text"
    placeholder="Search products..."
    class="border border-gray-100 hover:border-gray-500 w-full bg-white rounded-3xl text-gray-800 placeholder:text-gray-400 focus-none hover:bg-gray-200 font-medium text-lg cursor-pointer transition-all duration-500 ease-in-out px-3 py-2 sm:px-4"
  />
</template>

<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "search"],
  computed: {
    searchText: {
      get() {
        return this.modelValue || "";
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchText || "");
    },
  },
};
</script>
