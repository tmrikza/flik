<template>
  <div class="home">
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";

export default {
  name: "ProductView",
  components: {
    ProductList,
  },
};
</script>
