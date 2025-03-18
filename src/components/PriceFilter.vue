<template>
  <div>
    <label for="priceRange">Price Range:</label>
    <input
      type="range"
      id="priceRange"
      v-model="selectedPrice"
      :min="minPrice"
      :max="maxPrice"
      @input="onFilter"
      class="w-full"
    />
    <p>Max Price: ${{ selectedPrice }}</p>
  </div>
</template>

<script>
export default {
  props: ["minPrice", "maxPrice"],
  emits: ["update:modelValue"],
  data() {
    return {
      selectedPrice: this.maxPrice,
    };
  },
  methods: {
    onFilter() {
      this.$emit("update:modelValue", this.selectedPrice);
    },
  },
};
</script>
