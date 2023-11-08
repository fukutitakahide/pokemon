<template>
  <AppHeader></AppHeader>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <AppFooter></AppFooter>
</template>

<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
export default {
  components: {
    AppHeader,
    AppFooter,
  },
  // 他のオプション...
};
</script>