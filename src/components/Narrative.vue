<template>
  <div class="Narrative">
    <ParticlesComp id="tsparticles" :options="particlesoptions" />
    <img
      class="Narrative__img"
      src="../../src/assets/images/golddicetable.png"
    />
    <img
      v-if="isNarrativeCharacter"
      class="Narrative__character"
      src="/assets/koharu.png"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from "../composable/global";
import ParticlesComp from "./Particles.vue";

const { isNarrativeCharacter } = useGlobal();

const particlesoptions = {
  particles: {
    number: {
      value: 100,
    },
    move: {
      direction: "bottom",
      enable: true,
      random: false,
      straight: false,
    },
    color: {
      value: "#F599FF",
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
    },
    size: {
      value: { min: 1, max: 10 },
    },
    wobble: {
      distance: 20,
      enable: true,
      speed: {
        min: -5,
        max: 5,
      },
    },
  },
};
</script>

<style scoped>
.Narrative {
  position: absolute;
  left: 50%;
  bottom: 0%;
  transform: translateX(-50%);
  margin: auto;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 80vh;
}

.Narrative__img,
.Narrative__character {
  max-width: 90vw;
  max-height: 40vh;
  width: auto;
  height: auto;
}

.Narrative__character {
  position: absolute;
  top: 20%;
  z-index: 9;
  animation: pulsate 7s infinite;
}

.Narrative__img {
  position: absolute;
  top: 50%;
  z-index: 10;
}
</style>
