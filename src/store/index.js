import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chart: {
      products: []
    }
  },
  getters: {
    chart: state => state.chart
  },
  mutations: {
    addItem: (state, product) => {
      state.chart.products.push(product)
    },
    removeItem: (state, id) => {
      const products = state.chart.products;
      const filtered = products.filter(prod => prod.id != id);
      state.chart.products = filtered;
    }
  },
  actions: {
    addProduct({ commit }, product) {
      commit("addItem", product)
    },
    deleteProduct({ commit }, id) {
      commit("removeItem", id)
    }
  },
  modules: {
  }
})
