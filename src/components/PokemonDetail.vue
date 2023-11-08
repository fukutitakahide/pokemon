//ぽけもんの詳細を表示するコンポーネント
<template>
  <div class="pokemon-detail"></div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "PokemonDetail",

  setup(props) {
    //router-linkで渡されたidを受け取る
    console.log(props.id);

    const pokemon = ref(null);

    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${props.id}/`
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
        console.log("pokemon.value");
      } catch (error) {
        console.error(`Error fetching Pokemon with ID ${props.id}:`, error);
      }
    };

    onMounted(fetchPokemon);

    return {
      pokemon,
    };
  },
};
</script>
