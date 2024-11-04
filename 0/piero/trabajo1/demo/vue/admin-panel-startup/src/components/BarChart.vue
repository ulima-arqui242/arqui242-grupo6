<template>
  <div>
    <Bar :chart-data="chartData" :options="options" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Registramos los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,  // Desactivamos el eje X que usualmente mostraría las labels
          },
        },
      }),
    },
  },
  components: {
    Bar,
  },
};
</script>

<style scoped>
div {
  height: 400px;
}
</style>
