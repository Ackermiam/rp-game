<template>
  <div class="VersusMode">
    <SelectFlag />
    <div
      class="slider-container"
      @mouseup="handleMouseUpOrLeave"
      @mouseleave="handleMouseUpOrLeave"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      ref="sliderContainer"
    >
      <div class="slider">
        <CharacterSlider
          v-for="(charac, index) in story.enemies"
          :key="index"
          class="slide"
          :config="charac"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import story from "../story/story.json";
import CharacterSlider from "./CharacterSlider.vue";
import SelectFlag from "./SelectFlag.vue";

const sliderContainer = ref<HTMLElement | null>(null);

let isDown = false;
let startX: number;
let scrollLeft: number;

const handleMouseDown = (e: MouseEvent) => {
  if (!sliderContainer.value) return;
  isDown = true;
  sliderContainer.value.classList.add("active");
  startX = e.pageX - sliderContainer.value.offsetLeft;
  scrollLeft = sliderContainer.value.scrollLeft;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDown || !sliderContainer.value) return;
  e.preventDefault();
  const x = e.pageX - sliderContainer.value.offsetLeft;
  const walk = (x - startX) * 2;
  sliderContainer.value.scrollLeft = scrollLeft - walk;
};

const handleMouseUpOrLeave = () => {
  isDown = false;
  if (sliderContainer.value) {
    sliderContainer.value.classList.remove("active");
  }
};
</script>

<style scoped>
.VersusMode {
  position: absolute;
  height: 101%;
  width: 100vw;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.351) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.slider-container {
  width: 95vw;
  height: 80vh;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding-bottom: 10px;
  white-space: nowrap;
  cursor: grab;
  display: flex;
  align-items: end;
  padding-bottom: 200px;
}

@media (max-width: 1200px) {
  .slider-container {
    padding-bottom: 45px;
  }
}

.slider-container::-webkit-scrollbar {
  display: none;
}
.slider-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.slider {
  display: flex;
}

.slide {
  scroll-snap-align: start;
}

.slider-container.active {
  cursor: grabbing;
}
</style>
