<template>
  <div
    class="pb-6 px-4 sm:mx-auto sm:container relative sm:text-3xl font-semibold underline font-gray-600 text-xl"
  >
    <h1>Your Order History Page</h1>
    <div class="w-full absolute flex justify-center left-0 right-0 top-40">
      <button
        @click="$router.push('/')"
        class="bg-green-500 flex items-center justify-between space-x-2 font-bold text-xs sm:text-sm rounded-full w-auto cursor-pointer hover:bg-green-600 transition-all duration-500 ease-in text-white px-3 py-2"
      >
        Add New Order
        <svg
          data-slot="icon"
          fill="gray"
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
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>
