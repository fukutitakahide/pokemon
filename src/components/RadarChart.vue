<template>
  <div class="radar-chart-container">
    <canvas ref="radarChartCanvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default defineComponent({
  props: {
    stats: Array,
  },
  setup(props) {
    const radarChartCanvas = ref(null);

    const createChart = (stats) => {
      if (radarChartCanvas.value) {
        const context = radarChartCanvas.value.getContext("2d");
        new Chart(context, {
          type: "radar",
          data: {
            labels: stats.map((stat) => stat.name),
            datasets: [
              {
                label: "Status",
                data: stats.map((stat) => stat.value),
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
                pointBackgroundColor: "rgb(255, 99, 132)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(255, 99, 132)",
              },
            ],
          },
          options: {
            elements: {
              line: {
                borderWidth: 3,
              },
            },
          },
        });
      }
    };

    watch(
      () => props.stats,
      (newStats) => {
        if (newStats) {
          createChart(newStats);
        }
      },
      {
        immediate: true,
      }
    );

    onMounted(() => {
      if (props.stats) {
        createChart(props.stats);
      }
    });

    return {
      radarChartCanvas,
    };
  },
});
</script>
<style scoped>
.radar-chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* または適切な高さ */
  width: 300px; /* または適切な幅 */
}

.radar-chart-container canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>
