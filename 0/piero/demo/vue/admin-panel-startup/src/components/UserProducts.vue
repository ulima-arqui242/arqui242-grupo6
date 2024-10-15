<template>
  <div>
    <NavBar />
    <h2>Lista de Productos</h2>
    <ul>
      <!-- Renderizamos cada producto dentro de la lista -->
      <li v-for="(product, index) in products" :key="index">
        {{ product.name }} - Precio: {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
  name: 'UserProducts',
  components: {
    NavBar,
  },
  data() {
    return {
      // Definimos algunos productos
      products: [
        { name: 'Producto 1', price: 100 },
        { name: 'Producto 2', price: 200 },
        { name: 'Producto 3', price: 300 },
      ],
    };
  },
};
</script>

<style scoped>
h2 {
  color: #42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f3f3f3;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>
