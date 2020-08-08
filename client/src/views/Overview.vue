<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-btn v-if="quests.length == 0" :to="{name: 'NewQuest'}" color="primary" raised>Add new quest</v-btn>
      <v-container class="pa-0">
        <v-row>
          <v-col
            v-for="quest in quests"
            :key="quest.name"
            cols="12"
            md="4"
          >
          <QuestCard
            v-bind:quest="quest" />
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-btn :to="{name: 'NewQuest'}" fab dark large color="primary" fixed right bottom>
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';
import QuestCard from '../components/QuestCard.vue';
const PROTOCOL = window.location.protocol;
const API_SERVER = `${PROTOCOL}//${window.location.hostname}:3001`;

export default {
  // get data from API-server on mounted
  methods: {
    init: (self) => {
      axios.get(API_SERVER + '/quest')
        .then((result) => {
          if (result.data) {
            self.quests = result.data
          }
        })
    },
  },
  components: { QuestCard },
  mounted: function () {
    this.init(this);
  },
  data: () => ({
    quests: [],
  }),
};
</script>
