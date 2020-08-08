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
        <form>
          <v-card-text>
            <v-text-field label="Name" v-model.trim="name" required>
            </v-text-field>
          </v-card-text>
          <v-item-group mandatory
            v-model="templateIndex">
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
                    <QuestTemplate
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
              @click="submit"
              color="success"
            >
              Create
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import QuestTemplate from '../components/QuestTemplate.vue';
const PROTOCOL = window.location.protocol;
const API_SERVER = `${PROTOCOL}//${window.location.hostname}:3001`;

export default {
  props: {
    source: String,
  },
  methods: {
    submit: function () {
      const data = {
        name: this.name,
        template: this.templates[this.templateIndex].name
      };
      // TODO: use good-old post from form instead?
      // TODO: send data - axios api request
      axios.post(API_SERVER + '/quest', data).then((res) => {
        console.log(res);
        if (res.data.ok) {
          // TODO: forward to /quest/name
        } else {
          // TODO: get text label and highlight error
          alert(res.data.msg);
        }
      })
    },
    clear: function (event) {
      console.log(event);
    },
  },
  components: { QuestTemplate },
  data: () => ({
    templateIndex: null,
    name: '',
    templates: [
      {
        titleen: 'Empty',
        name: 'empty'
      },
      {
        titleen: 'Simple Multiple Choice',
        name: 'multiple_choice'
      },
      {
        titleen: 'Simple Picture Puzzle',
        name: 'picture_puzzle'
      },
      {
        titleen: 'Simple Spider Chart',
        name: 'spider_chart'
      },
    ],
  }),
};
</script>
