<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-card>
        <v-toolbar
          dense
          color="indigo"
          >
          <v-toolbar-title>Create a new Quest</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field label="Name" required>
          </v-text-field>
        </v-card-text>
        <v-item-group mandatory>
          <v-subheader>Templates</v-subheader>
          <v-container class="pa-0">
            <v-row>
              <v-col
                v-for="templ in templates"
                :key="templ.name"
                cols="12"
                md="4"
              >
                <v-item v-slot:default="{ active, toggle }">
                  <QuestCard
                    v-bind:active_color="active ? 'primary' : ''"
                    v-bind:templ="templ"
                    v-bind:toggle="toggle" />
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import QuestCard from '../components/QuestCard.vue';

export default {
  props: {
    source: String,
  },
  components: { QuestCard },
  data: () => ({
    templates: [
      {
        name: 'Empty',
      },
      {
        name: 'Simple Multiple Choice',
      },
      {
        name: 'Simple Picture Puzzle',
      },
      {
        name: 'Simple Spider Chart',
      },
    ],
  }),
};
</script>
