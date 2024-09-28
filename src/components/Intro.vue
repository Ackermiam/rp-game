<template>
  <div class="Intro" ref="introRef">
    <div class="Intro__container">
      <button @click="toggleNarrative()">
        <img src="../../src/assets/images/histoire.png" />
      </button>
      <button @mouseover="changeBackground" @mouseleave="resetBackground" @click="toggleVersus()">
        <img src="../../src/assets/images/versusmodeone.png" />
      </button>
      <ParticlesComp
        v-if="showParticles"
        id="tsparticlesthree"
        :options="particlesoptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGlobal } from "../composable/global";
import ParticlesComp from "./Particles.vue";

const introRef = ref<HTMLDivElement | null>(null);
const showParticles = ref(false);

const {toggleNarrative, toggleVersus} = useGlobal();

const changeBackground = () => {
  if (introRef.value) {
    introRef.value.style.background =
      'url("../../src/assets/images/versusmodebg3.png") no-repeat center center';
    introRef.value.style.backgroundSize = "cover";
  }
  showParticles.value = true;
};

const resetBackground = () => {
  if (introRef.value) {
    introRef.value.style.background =
      'url("../../src/assets/images/bgmenu.png") no-repeat center center';
    introRef.value.style.backgroundSize = "cover";
  }
  showParticles.value = false;
};

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
.Intro {
  height: 80vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background: url("../../src/assets/images/bgmenu.png") no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.5s ease-in-out;
}

.Intro__container {
  position: absolute;
  height: 100%;
  width: 100vw;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  z-index: 10000;
  background: none;
  border: none;
  transition: all .6s ease;
  cursor: pointer;
}

button:hover {
  transform: scale(1.8);
}

button:first-child {
  margin-right: 6vw;
}

button:first-child:hover {
  filter: drop-shadow(0 0 20px rgb(0, 255, 213));
}

button:last-child:hover {
  filter: drop-shadow(0 0 20px rgb(255, 0, 0));
}

button img {
  width: 15vw;
}
</style>
