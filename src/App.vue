<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">FLIK TEST</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="app-nav-link" :to="{ name: 'home' }" :class="{active: $route.name==='home'}">Home</b-nav-item>
          <b-nav-item class="app-nav-link" :to="{ name:'products' }" :class="{active: $route.name==='products'}">Products</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.modal-1>
            <b-icon icon="cart" aria-hidden="true"></b-icon> Cart
            <b-badge variant="light">{{chart.products.length}}</b-badge>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal id="modal-1" centered title="Cart">
      <b-table striped hover :items="chart.products" :fields="fields">

        <template #cell(action)="row">
          <b-button
            size="sm"
            @click="deleteProduct(row.item.id)"
            variant="danger"
          >
          Remove
          </b-button>
        </template>
      </b-table>
      <p class="ml-2"><b>Total : {{total}}</b></p>
    </b-modal>
    <router-view />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        fields: ["name", "price", "action"]
      }
    },
    methods: mapActions(["deleteProduct"]),
    computed: {
      ...mapGetters(["chart"]),
      total() {
        const initialValue = 0;
        const total = this.chart.products.reduce((a, b) => a + b.price, initialValue);
        return total;
      }
    }
  }
  </script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
