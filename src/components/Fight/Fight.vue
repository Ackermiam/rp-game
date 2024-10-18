<template>
  <div class="Fight">
    <ParticlesComp id="tsparticlestwo" :options="particlesoptions" />
    <FightData />
    <FightFlag />
    <JokerDetail
      v-if="isDetailJokerComponentActive"
      :name="chosenJokerName"
      @activate-joker="
        validateJokerSelection(character, selectedPlayerJoker.index)
      "
    />
    <div class="Fight__Characters">
      <FightCharacter />
      <FightCharacterEnemy />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCharacter } from "../../composable/character";
import { useJoker } from "../../composable/joker";
import ParticlesComp from "../Particles.vue";
import FightFlag from "./FightFlag.vue";
import FightData from "./FightData.vue";
import JokerDetail from "../JokerDetail.vue";
import FightCharacter from "./FightCharacter.vue";
import FightCharacterEnemy from "./FightCharacterEnemy.vue";

const {
  validateJokerSelection,
  fightIsFinished,
  selectedPlayerJoker,
  character,
} = useCharacter();

const { isDetailJokerComponentActive, chosenJokerName } = useJoker();

onMounted(() => {
  fightIsFinished.value = false;
});

const particlesoptions = {
  fpsLimit: 40,
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
    },
  },
  background: {
    image:
      "radial-gradient(circle, rgba(74,0,0,0.5) 50%, rgba(0,0,0,0.4) 100%)",
  },
};
</script>

<style scoped>
.Fight {
  position: absolute;
  height: 101%;
  width: 100vw;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.795) 0%,
    rgba(0, 0, 0, 0.351) 50%,
    rgba(0, 0, 0, 0.802) 100%
  );
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 0 20px;
}

.Fight__Characters {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
</style>
