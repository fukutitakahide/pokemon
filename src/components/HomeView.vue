<template>
  <v-container>
    <v-row>
      <v-col v-for="pokemon in pokemons" :key="pokemon.name" cols="2">
        <router-link :to="`/pokemon/${pokemon.id}`">
          <v-card>
            <v-img :src="pokemon.image" aspect-ratio="1"></v-img>
            <v-card-title>{{ pokemon.name }}</v-card-title>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const pokemons = ref([]);

    const fetchPokemons = async () => {
      for (let i = 1; i <= 151; i++) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}/`
          );

          const pokemonData = {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.front_default,
          };
          pokemons.value.push(pokemonData);
        } catch (error) {
          console.error(`Error fetching Pokemon with ID ${i}:`, error);
        }
      }
      console.log(pokemons.value);
    };

    onMounted(fetchPokemons);

    return {
      pokemons,
    };
  },
};
</script>
