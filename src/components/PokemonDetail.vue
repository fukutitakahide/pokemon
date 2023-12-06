<template>
  <div class="pokemon-detail" v-if="pokemon">
    <h1>{{ pokemon.name }}</h1>
    <img :src="pokemon.image" :alt="pokemon.name" />
    <h2>Types</h2>
    <ul>
      <li v-for="type in pokemon.types" :key="type">
        {{ type }}
      </li>
    </ul>
    <h2>Status</h2>
    <!-- レーダーチャートコンポーネントの追加 -->
    <RadarChart :stats="pokemon.stats" />
  </div>
  <div v-else>Loading Pokemon details...</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import RadarChart from "./RadarChart.vue"; // RadarChartコンポーネントのインポート

export default {
  name: "PokemonDetail",
  components: {
    RadarChart, // コンポーネントの登録
  },
  setup() {
    const route = useRoute();
    const pokemon = ref(null);

    // ポケモンのデータをフェッチする関数
    const fetchPokemon = async () => {
      const id = route.params.id;
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        const pokemonData = {
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.front_default,
          types: response.data.types.map((type) => type.type.name),
          stats: response.data.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
        };
        pokemon.value = pokemonData;
      } catch (error) {
        console.error(`Error fetching Pokemon with ID ${id}:`, error);
      }
    };

    onMounted(fetchPokemon);

    return {
      pokemon,
    };
  },
};
</script>

<style scoped>
.pokemon-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.pokemon-detail img {
  max-width: 200px; /* 画像のサイズを適切に制限 */
  margin-bottom: 20px;
}

.pokemon-detail h1,
.pokemon-detail ul,
.pokemon-detail h2 {
  text-align: center;
  margin: 10px 0;
}

.pokemon-detail ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.pokemon-detail li {
  margin: 5px 15px;
  background-color: #f2f2f2; /* 背景色 */
  padding: 5px 10px;
  border-radius: 5px; /* 角を丸く */
}

/* レーダーチャートのスタイリング */
.radar-chart-container {
  max-width: 300px; /* グラフの最大幅 */
  width: 100%; /* レスポンシブ対応 */
  margin: 20px auto;
}

.radar-chart-container canvas {
  max-width: 100%;
  height: auto;
}
</style>
