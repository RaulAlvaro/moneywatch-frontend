<template>
  <v-app>
    <v-main>
      <!-- <MoneyWatch /> -->
      <Navbar />
    </v-main>
  </v-app>
</template>

<script>
// import MoneyWatch from './components/MoneyWatch.vue';
import Navbar from './layouts/Navbar.vue';

export default {
  name: 'App',

  components: {
    // MoneyWatch,
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
