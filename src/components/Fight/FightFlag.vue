<template>
  <img
    v-if="displayFight"
    src="../../../src/assets/images/fight.png"
    class="FightFlag__Fightimg"
  />
  <img
    v-if="displayWin"
    src="../../../src/assets/images/win.png"
    class="FightFlag__winimg"
  />
  <img
    v-if="displayLose"
    src="../../../src/assets/images/lose.png"
    class="FightFlag__loseimg"
  />
</template>

<script setup lang="ts">
import { onUnmounted } from "vue";
import { useCharacter } from "../../composable/character";
import { useGlobal } from "../../composable/global";

onUnmounted(() => {
  resetFlag();
});

const { displayFight, displayWin, displayLose, resetFlag } = useCharacter();

const { isJokers } = useGlobal();

setTimeout(() => {
  isJokers.value = true;
}, 1800);
</script>

<style scoped>
.FightFlag__Fightimg {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -40%) scale(1.5);
  animation: shrinkToTop 0.7s forwards;
  animation-delay: 1s;
}

.FightFlag__winimg,
.FightFlag__loseimg {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -40%) scale(0.8);
  animation: pulsateFinishFight 1s infinite;
  max-width: 70vw;
}

@media (max-width: 1200px) {
  .FightFlag__Fightimg {
    top: 40vh;
    width: 50vw;
  }
}
</style>
