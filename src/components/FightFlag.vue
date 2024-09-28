<template>
  <img v-if="displayFight" src="../../src/assets/images/fight.png" class="FightFlag__Fightimg" />
  <img v-if="displayWin" src="../../src/assets/images/win.png" class="FightFlag__winimg" />
  <img v-if="displayLose" src="../../src/assets/images/lose.png" class="FightFlag__loseimg" />
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useCharacter } from "../composable/character";
import { useGlobal } from "../composable/global";

onUnmounted(() => {
  resetFlag();
})

const {
  displayFight,
  displayWin,
  displayLose,
  resetFlag
} = useCharacter();

const { isJokers } = useGlobal();

setTimeout(() => {
  isJokers.value = true;
}, 1800)

</script>

<style scoped>
.FightFlag__Fightimg {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -40%) scale(1.5); /* Position initiale */
  animation: shrinkToTop 0.7s forwards; /* Applique l'animation une seule fois */
  animation-delay: 1s;
}

.FightFlag__winimg,
.FightFlag__loseimg {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -40%) scale(0.8); /* Position initiale */
  animation: pulsateFinishFight 1s infinite;
  max-width: 70vw;
}

@keyframes shrinkToTop {
  0% {
    transform: translate(-50%, -40%) scale(1.5); /* Position initiale au centre en bas */
  }
  100% {
    transform: translate(-50%, -100%) scale(0.5); /* Rétrécit et monte vers le haut */
  }
}

@keyframes pulsateFinishFight {
  0% {
    transform: translate(-50%, -40%) scale(0.8); /* Taille normale */
  }
  50% {
    transform: translate(-50%, -40%) scale(1); /* Grossit de 10% */
  }
  100% {
    transform: translate(-50%, -40%) scale(0.8); /* Retour à la taille normale */
  }
}
</style>
