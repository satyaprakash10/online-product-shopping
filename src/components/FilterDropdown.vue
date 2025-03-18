<template>
  <div class="w-full">
    <label for="filterType">Filter By:</label>
    <select
      v-model="selectedFilterType"
      @change="onFilterTypeChange"
      class="border border-indigo-500 rounded-lg hover:border-gray-300 cursor-pointer p-2 w-full"
    >
      <option value="category">Category</option>
      <option value="brand">Brand</option>
    </select>

    <select
      v-if="selectedFilterType === 'category'"
      @change="onFilterChange"
      class="border border-indigo-500 rounded-lg hover:border-gray-300 cursor-pointer p-2 mt-2 w-full"
    >
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <select
      v-if="selectedFilterType === 'brand'"
      @change="onFilterChange"
      class="border border-indigo-500 rounded-lg hover:border-gray-300 cursor-pointer p-2 mt-2 w-full"
    >
      <option value="">All Brands</option>
      <option v-for="brand in brands" :key="brand" :value="brand">
        {{ brand }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["categories", "brands"],
  data() {
    return {
      selectedFilterType: "category", // Default filter type
    };
  },
  methods: {
    onFilterTypeChange() {
      this.$emit("update:modelValue", ""); // Reset filter when type changes
    },
    onFilterChange(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
