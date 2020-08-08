<template>
  <v-card
    :color="active_color"
    class="d-flex align-center"
    height="200"
    @click="toggle"
  >
    <v-scroll-y-transition>
      <div
        class="display-1 flex-grow-1 text-center">
        {{templ.titleen}}
      </div>
    </v-scroll-y-transition>
  </v-card>
</template>
<script>
export default {
  props: ['templ', 'active_color', 'toggle'],
};
</script>
