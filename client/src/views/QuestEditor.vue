<template>
  <div id="content-parent">
    <div id="chart">
      <svg>
        <marker orient="auto" 
            refY="0.0" 
            refX="0.0" 
            id="Arrow2Lend" 
            style="overflow:visible;">
          <path id="Arrow2LendPath" 
            style="fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round;" 
            d="M 8.7185878,4.0337352 L -2.2072895,0.016013256 L 8.7185884,-4.0017078 C 6.9730900,-1.6296469 6.9831476,1.6157441 8.7185878,4.0337352 z " 
            transform="scale(.5) rotate(180) translate(5,0)" />
        </marker>
      </svg>
    </div>
    <v-col
      cols="12"
      sm="6"
      class="py-2"
    >
      <v-btn-toggle v-model="selectedTool" mandatory>
          <v-btn v-for="tool in tools" v-bind:key="tool.icon">
            <v-icon>{{tool.icon}}</v-icon>
          </v-btn>
        </v-btn-toggle>
    </v-col>
  </div>
</template>

<style>
  html {
    overflow: hidden !important;
  }
</style>
<style scoped>

  main.v-main div, div#content-parent {
    overflow: hidden;
  }
  div#chart {
    overflow: hidden;
    position: absolute;
    top: 0;
  }
</style>

<script>
import * as d3 from 'd3';
import Graph from '../graph/Graph';
import axios from 'axios';

const PROTOCOL = window.location.protocol;
const API_SERVER = `${PROTOCOL}//${window.location.hostname}:3001`;

function createD3 (questData) {
  const width = window.innerWidth -1;
  const height = window.innerHeight - 65;
  const svg = d3.select('div#chart svg')
    .attr('width', width)
    .attr('height', height)
  new Graph(svg);
  
}

export default {
  props: ['questId'],
  // get data from API-server on mounted
  methods: {
    init: (self) => {
      axios.get(API_SERVER + '/quest/' + self.questId)
        .then((result) => {
          if (result.data) {
            // self.data = result.data
            self.quest = result.data;
            createD3(self.quest);
          } else {
            // TODO: reroute to overview
          }
        })
    },
  },
  mounted: function () {
    this.init(this);
  },
  data: () => ({
    quest: {},
    tools: [
      {
        name: 'default',
        icon: 'mdi-cursor-default'
      },
      {
        name: 'add-box',
        icon: 'mdi-plus-box'
      },
      {
        name: 'connect-box',
        icon: 'mdi-arrow-right'
      },
      {
        name: 'delete-box',
        icon: 'mdi-delete'
      }
    ],
    selectedTool: null
  }),
};
</script>