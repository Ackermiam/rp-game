<template>
  <div
    class="Scene"
    :style="{
      background: `url(${bgImage}) no-repeat center center`,
      backgroundSize: 'cover',
    }"
  >
    <div
      v-if="layer2img"
      class="Scene__layer2"
      :style="[
        {
          background: `url(${layer2img}) no-repeat center center`,
          backgroundSize: 'cover',
        },
        layer2Style,
      ]"
    />

    <div
      v-if="layer1img"
      class="Scene__layer1"
      :style="[
        {
          background: `url(${layer1img}) no-repeat center center`,
          backgroundSize: 'cover',
        },
        layer1Style,
      ]"
    />

    <transition name="slide">
      <Intro v-if="isIntro" />
    </transition>

    <transition name="slide-fade">
      <Narrative v-if="isNarrative" />
    </transition>

    <transition name="slide-fade">
      <VersusMode v-if="isVersus" />
    </transition>

    <transition name="slide-fade">
      <Fight v-if="isFight" />
    </transition>

    <transition name="slide-fade">
      <Jokers v-if="isJokers && isFight" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useParallax } from "../composable/parallax";
import { useGlobal } from "../composable/global";
import { useCharacter } from "../composable/character";
import Narrative from "../components/Narrative.vue";
import Fight from "./Fight/Fight.vue";
import Jokers from "./Jokers.vue";
import Intro from "./Intro.vue";
import VersusMode from "./VersusMode.vue";

const { layer1Style, layer2Style } = useParallax();
const { isNarrative, isFight, isJokers, isIntro, isVersus, isVersusMode } =
  useGlobal();
const { setNumberBackground, chosenBackground } = useCharacter();

const bgImage = ref("/rp-game/assets/scene1_background.png");
const layer1img = ref("/rp-game/assets/scene1_foreground.png");
const layer2img = ref("/rp-game/assets/scene1_midlayer.png");

watch(isVersusMode, (newValue) => {
  if (newValue === true) {
    setNumberBackground();

    bgImage.value = `/rp-game/assets/scene${chosenBackground.value}_background.png`;
    layer1img.value = `/rp-game/assets/scene${chosenBackground.value}_foreground.png`;
    layer2img.value = `/rp-game/assets/scene${chosenBackground.value}_midlayer.png`;
  }
});
</script>

<style>
.Scene {
  height: 80vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.Scene__layer1,
.Scene__layer2 {
  height: 100%;
  width: 100%;
  position: absolute;
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1s;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 4s;
}

.slide-enter-from {
  opacity: 0;
}

.slide-leave-to {
  opacity: 0;
}

@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pulsatePlayer {
  0% {
    transform: scaleX(-1) scale(1);
  }
  50% {
    transform: scaleX(-1) scale(1.1);
  }
  100% {
    transform: scaleX(-1) scale(1);
  }
}

@keyframes flame {
  0% {
    filter: drop-shadow(0 0 20px rgba(201, 164, 0, 0.74));
  }
  25% {
    filter: drop-shadow(0 0 10px rgba(201, 164, 0, 0.315));
  }
  40% {
    filter: drop-shadow(0 0 15px rgba(201, 137, 0, 0.418));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(0, 154, 201, 0.74));
  }
  75% {
    filter: drop-shadow(0 0 15px rgba(0, 161, 201, 0.274));
  }
  90% {
    filter: drop-shadow(0 0 10px rgba(201, 164, 0, 0.445));
  }
  100% {
    filter: drop-shadow(0 0 20px rgba(201, 164, 0, 0.74));
  }
}

@keyframes selectCharacter {
  0% {
    filter: drop-shadow(0 0 20px rgba(201, 164, 0, 0.74));
    transform: scale(1);
  }
  25% {
    filter: drop-shadow(0 0 10px rgba(201, 164, 0, 0.315));
  }
  40% {
    filter: drop-shadow(0 0 15px rgba(201, 137, 0, 0.418));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(201, 164, 0, 0.8));
    transform: scale(1.1);
  }
  75% {
    filter: drop-shadow(0 0 15px rgba(201, 164, 0, 0.274));
  }
  90% {
    filter: drop-shadow(0 0 10px rgba(201, 164, 0, 0.445));
  }
  100% {
    filter: drop-shadow(0 0 20px rgba(201, 164, 0, 0.74));
    transform: scale(1);
  }
}

@keyframes shrinkToTop {
  0% {
    transform: translate(-50%, -40%) scale(1.5);
  }
  100% {
    transform: translate(-50%, -100%) scale(0.5);
  }
}

@keyframes shrinkToTopSelect {
  0% {
    transform: translate(-50%, -40%) scale(1.5);
  }
  100% {
    transform: translate(-50%, -100%) scale(1.1);
  }
}

@keyframes pulsateFinishFight {
  0% {
    transform: translate(-50%, -40%) scale(0.8);
  }
  50% {
    transform: translate(-50%, -40%) scale(1);
  }
  100% {
    transform: translate(-50%, -40%) scale(0.8);
  }
}

@keyframes damageAnimation {
  0% {
    transform: translateX(10px);
    opacity: 0;
  }
  30% {
    transform: translateX(-25px);
    opacity: 1;
  }
  100% {
    transform: translateX(-30px);
    opacity: 0;
  }
}

@keyframes damageEnemyAnimation {
  0% {
    transform: translateX(-10px);
    opacity: 0;
  }
  30% {
    transform: translateX(25px);
    opacity: 1;
  }
  100% {
    transform: translateX(30px);
    opacity: 0;
  }
}

@keyframes healAnimation {
  0% {
    transform: translateY(0px);
    opacity: 0;
  }
  30% {
    transform: translateY(-25px);
    opacity: 1;
  }
  100% {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
