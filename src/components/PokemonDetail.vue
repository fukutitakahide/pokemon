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
    <h2>Stats</h2>
    <ul>
      <li v-for="stat in pokemon.stats" :key="stat.name">
        {{ stat.name }}: {{ stat.value }}
      </li>
    </ul>
  </div>
  <div v-else>Loading Pokemon details...</div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "PokemonDetail",

  setup() {
    const route = useRoute();
    const pokemon = ref(null);

    const fetchPokemon = async () => {
      // URLからIDを取得
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
        console.log(pokemon.value);
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
  min-height: 100vh; /* 画面の高さに合わせる */
}

.pokemon-detail img {
  max-width: 100%; /* 画像が画面幅を超えないようにする */
  height: auto; /* 高さを自動調整 */
}

.pokemon-detail h1,
.pokemon-detail ul {
  text-align: center;
}

.pokemon-detail ul {
  list-style: none;
  padding: 0;
}
</style>
