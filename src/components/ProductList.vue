<template>
  <b-container class="mt-3 justify-content-md-center text-center">
    <b-table striped hover :items="productList" :fields="fields">
      <template #cell(price)="row">
        <div v-if="row.item.discount > 0">
          <p>
            <s>{{ `$${row.value}` }}</s>
            {{ " $" + row.value * ((100 - row.item.discount) / 100) }}
          </p>
        </div>
        <p v-else>
          {{ `$${row.value}` }}
        </p>
      </template>

      <template #cell(action)="row">
        <b-button
          size="sm"
          @click="handleClick(row.item, row.item.isOnCart)"
          :variant="row.item.isOnCart ? 'danger' : 'success'"
        >
          {{ row.item.isOnCart ? "Remove from" : "Add to" }} Cart
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      fields: ["name", "price", "action"],
      items: [
        { id: 1, name: "Shirt", price: 30, discount: 0 },
        { id: 2, name: "T-Shirt", price: 40, discount: 15 },
        { id: 3, name: "Pants", price: 20, discount: 50 },
        { id: 4, name: "Bag", price: 50, discount: 0 },
      ],
    };
  },
  methods: {
    ...mapActions(["addProduct", "deleteProduct"]),

    handleClick(product, isOnCart) {
      if (!isOnCart) {
        this.addProduct({
          ...product,
          price: product.price * ((100 - product.discount) / 100),
        });
      } else {
        this.deleteProduct(product.id);
      }
    },
  },
  computed: {
    ...mapGetters(["chart"]),
    productList() {
      const products = this.chart.products;
      return this.items.map((item) => {
        let isOnCart = false;
        const filtered = products.filter((prod) => prod.id === item.id);
        if (filtered.length > 0) isOnCart = true;

        return {
          ...item,
          isOnCart,
        };
      });
    },
  },
};
</script>