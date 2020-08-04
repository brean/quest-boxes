<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-btn :to="{name: 'NewQuest'}" color="primary" raised>Add new quest</v-btn>
    </v-row>
    <v-btn :to="{name: 'NewQuest'}" fab dark large color="primary" fixed right bottom>
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
};
</script>
