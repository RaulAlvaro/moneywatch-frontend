<template>
  <v-card class="mx-auto container-navbar">
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            MoneyWatch
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group :value="true" prepend-icon="mdi-cog-outline">
          <template v-slot:activator>
            <v-list-item-title>Configuraciones</v-list-item-title>
          </template>
          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            link
            class="ml-2"
          >
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [{ title: 'General', icon: 'mdi-home' }],
      admins: [
        ['Tipo de cuenta', 'mdi-file-account'],
        ['Cuenta', 'mdi-wallet-outline'],
        ['Categoría', 'mdi-shape'],
      ],
      right: null,
    };
  },
};
</script>

<style scoped>
.container-navbar {
  height: 100vh;
}
</style>
