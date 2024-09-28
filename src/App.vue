<template>
  <div class="App" @mousemove="handleMouseMove">
    <transition name="slide">
      <Scene />
    </transition>
  </div>
</template>

<script setup lang="ts">
import Scene from "./components/Scene.vue";
import { useParallax } from "./composable/parallax";

const { handleMouseMove } = useParallax();
</script>

<style>
* {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

button,
a {
  outline: none;
}

.App {
  height: 100vh;
  width: 100%;
  background: #161616;
  overflow: hidden;
  display: flex;
  align-items: center;
}
</style>
