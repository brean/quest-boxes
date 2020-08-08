<template>
  <v-card
    class="d-flex align-center"
    height="200"
    :to="{name: 'QuestEditor', params: {questId: quest._id}}"
  >
    <v-scroll-y-transition>
      <div
        class="flex-grow-1 text-center">
        <h1>{{quest.name}}</h1>
        <span>{{quest.template}}</span>
      </div>
    </v-scroll-y-transition>
  </v-card>
</template>
<script>

export default {
  props: ['quest'],
  methods: {
    clicked: function () {
      console.log(this.quest)
    }
  }
};
</script>
