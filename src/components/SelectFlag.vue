<template>
  <img
    v-if="!isPlayerChosen"
    src="../assets/images/selectplayer.png"
    class="SelectFlag__Player"
  />
  <img
    v-if="isPlayerChosen"
    src="../assets/images/selectenemy.png"
    class="SelectFlag__Player"
  />
</template>

<script setup lang="ts">
import { useCharacter } from "../composable/character";

const { isPlayerChosen } = useCharacter();
</script>

<style scoped>
.SelectFlag__Player {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -40%) scale(1.5);
  animation: shrinkToTopSelect 0.7s forwards;
}

@media (max-width: 1200px) {
  .SelectFlag__Player {
    top: 40vh;
    width: 50vw;
  }
}
</style>
