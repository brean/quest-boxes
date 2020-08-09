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
            transform="rotate(180)" />
        </marker>
        <g id="zoom_root">
          <g id="nodes">
            <g v-for="node in quest.nodes" :key="node.title"
              v-bind:transform="'translate(' + node.x + ', ' + node.y + ')'"  >
              <foreignObject
                width="220px" height="400px">
                <v-card
                  class="move_card"
                  style="left: 2px; top: 2px;"
                  max-width="200px"
                  raised>
                  <v-select
                    :items="tasks"
                    v-model="node.task"
                    label="Task type"
                    style="margin: 3px; margin-top: 10px; margin-bottom: 0;"
                  ></v-select>
                  <v-card-title class="card-paddings truncate ignore-pointer">{{node.title}}</v-card-title>
                  <v-card-subtitle class="card-paddings truncate ignore-pointer">{{node.text}}</v-card-subtitle>
                  <div v-if="node.task == 'multiple_choice'">
                    <div v-for="(answer, index) in node.answers"
                        :key="answer">
                      <v-chip 
                        style="max-width: 180px; margin-left: 5px; margin-bottom: 5px;"
                        label
                        v-bind:color="node.rightAnswers.indexOf(index) > -1 ? 'green' : 'red'">
                        <span class="truncate">{{answer}}</span></v-chip><br/>
                    </div>
                  </div>
                  <!--div style="width: 100%; text-align: right; padding: 5px"-->
                  <v-card-actions>
                    <v-btn icon right color="red">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon right color="primary">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </foreignObject>
              <g v-if="node.task == 'multiple_choice'">
                <circle class="connect out multiple_choice_option"
                  v-for="(answer, index) in node.answers"
                  :key="answer+index"
                  :id="'connect_out_'+node.id+'_'+index"
                  v-bind:data-node-id="node.id"
                  v-bind:data-answer-index="index"
                  cx="186" v-bind:cy="161 + index * 37" r="12"
                />
              </g>
              <circle class="connect out"
                  v-bind:id="'connect_out_'+node.id"
                  cx="204" cy="70" r="12"
                />
              <circle class="connect in"
                  v-bind:id="'connect_in_'+node.id"
                  cx="-2" cy="70" r="12"
                />
            </g>
            <g id="edges">
              <path v-for="(edge, index) in quest.edges" 
                :key="'edge_'+index"
                :id="'edge_'+index"
                class="edge"
               />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <!--v-col
      cols="12"
      sm="6"
      class="py-2"
    >
      <v-btn-toggle v-model="selectedTool" mandatory>
          <v-btn v-for="tool in tools" v-bind:key="tool.icon">
            <v-icon>{{tool.icon}}</v-icon>
          </v-btn>
        </v-btn-toggle>
    </v-col-->
    <!--v-btn :to="{name: 'NewQuest'}" fab dark large color="primary" fixed right bottom>
      <v-icon dark>mdi-plus</v-icon>
    </v-btn-->
  </div>
</template>

<style>
  #Arrow2LendPath {
    stroke:black;
    stroke-opacity:1;
    fill:black;
    fill-opacity:1
  }
  .edge {
    fill: transparent;
    stroke: black;
    stroke-width: 2px;
    marker-end:url(#Arrow2Lend);
  }

  .truncate {
    display:inline-block;
    width:200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-paddings {
    padding-top: 0;
    padding-bottom: 4px;
    padding-left: 3px;
    padding-right: 3px;
  }

  circle.connect {
    stroke: black;
    stroke-width: 2;
    fill: white;
  }

  circle.hover {
    fill: lightblue;
  }

  circle.selected {
    fill: orange;
  }

  .ignore-pointer {
    pointer-events: none;
  }
</style>
<style scoped>
  div#chart {
    position: fixed;
    overflow: hidden;
    top: 64px;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>

<script>
import * as d3 from 'd3';
import Graph from '../graph/Graph';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PROTOCOL = window.location.protocol;
const API_SERVER = `${PROTOCOL}//${window.location.hostname}:3001`;

const graph = new Graph();

function createD3 (questData) {
  const width = window.innerWidth -2;
  const height = window.innerHeight - 64;
  const svg = d3.select('div#chart svg')
    .attr('width', width)
    .attr('height', height)
  graph.initZoom(svg)
  graph.data(questData);
}

function updateD3() {
  graph.updateDrag();
  graph.updateEdges();
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
            self.quest.nodes = [
              {
                id: uuidv4(),
                title: 'Some Topic',
                task: 'multiple_choice',
                text: 'This is a long text with a question',
                answers: ['Option 1', 'Option 2', 'Option 3, long but correct. Lorem ipsum dolor', 'Wrong but long Option 4'],
                rightAnswers: [2],
                x: 100,
                y: 100
              },
              {
                id: uuidv4(),
                title: 'Other Topic with a very long text',
                task: 'multiple_choice',
                text: 'Lorem ipsum dolor some filler text',
                answers: ['Option 1', 'Option 2', 'Option 3'],
                rightAnswers: [1],
                x: 350,
                y: 100
              },
              {
                id: uuidv4(),
                title: 'Text',
                task: 'text_or_image',
                text: 'Just text.',
                x: 650,
                y: 100
              },
              {
                id: uuidv4(),
                title: 'Text',
                task: 'text_or_image',
                text: 'Just text.',
                x: 600,
                y: 600
              }
            ]
            self.quest.edges = [
              {
                from: self.quest.nodes[0].id,
                to: self.quest.nodes[1].id
              },
              {
                from: self.quest.nodes[1].id,
                to: self.quest.nodes[2].id,
              },
              {
                from: self.quest.nodes[1].id,
                to: self.quest.nodes[3].id,
                answer: 1
              }
            ]
            createD3(self.quest)
          } else {
            // TODO: reroute to overview
          }
        })
    },
  },
  mounted: function () {
    this.init(this);
  },
  updated: function () {
    updateD3();
  },
  data: () => ({
    quest: {},
    tasks: [
      "text_or_image",
      "multiple_choice",
      "picture_puzzle",
      "spider_chart"
    ],
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