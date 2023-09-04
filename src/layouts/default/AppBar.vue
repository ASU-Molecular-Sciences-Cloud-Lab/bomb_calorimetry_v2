<template>
  <v-app-bar
    scroll-behavior="elevate"
    color="rgb(140, 29, 64)"
    style="font-size: medium"
  >
    <v-app-bar-title>
      <v-icon
        @click="$router.push('/')"
        class="display-1"
        style="cursor: pointer"
        >mdi-fire</v-icon
      >
      <span
        @click="$router.push('/')"
        class="display-1"
        style="cursor: pointer"
      >
        YargerLab Bomb Calorimetry
      </span>
    </v-app-bar-title>

    <v-btn to="/experiment"> Choose Sample </v-btn>

    <v-btn to="/instructions"> Instructions </v-btn>

    <v-btn to="/discussion"> Discussion </v-btn>

    <v-btn to="/constants"> Constants </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
//
</script>
