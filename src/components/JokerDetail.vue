<template>
  <transition name="slide-fade">
    <div class="JokerDetail" @mousemove="getMouseValue">
      <div
        class="JokerDetail__container"
        :style="{
          transform: `rotateX(${y / 2}deg) rotateY(${-x / 2}deg)`,
        }"
      >
        <img src="/assets/cardjoker.png" class="JokerDetail__img" />
        <div class="JokerDetail__infos">
          <h3>Nom de la carte</h3>
          <p>{{ jokerInfos.name }}</p>
          <h3>Description</h3>
          <p>{{ jokerInfos.descript }}</p>
        </div>
      </div>
      <div class="JokerDetail__actions">
        <Button
          text="Activer"
          :filled="false"
          @click="$emit('activate-joker')"
        />
        <Button text="Retour" :filled="false" @click="quitInterface()" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from "vue";
import { returnRightJoker } from "../utils/jokers";
import { useJoker } from "../composable/joker";
import Button from "./Button.vue";

const { isDetailJokerComponentActive } = useJoker();

const props = defineProps<{
  name: string;
}>();

const jokerInfos: Ref<Record<string, string | boolean>> = ref({});
const x = ref(0);
const y = ref(0);

const quitInterface = () => {
  isDetailJokerComponentActive.value = false;
};

const getMouseValue = (event: MouseEvent) => {
  const { innerWidth, innerHeight } = window;
  x.value = (event.clientX - innerWidth / 2) / 30;
  y.value = (event.clientY - innerHeight / 2) / 30;
};

onMounted(() => {
  jokerInfos.value = returnRightJoker(props.name);
});

onUnmounted(() => {
  jokerInfos.value = {};
});
</script>

<style scoped>
.JokerDetail {
  width: 100vw;
  height: 80vh;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: absolute;
  perspective: 1000px;
}

.JokerDetail__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 19vw;
}

.JokerDetail__img {
  display: block;
  max-width: 350px;
  width: 19vw;
  aspect-ratio: 535/756;
  object-fit: contain;
  transition: transform 0.1s ease-out;
  animation: flame 4s infinite ease-out;
}

.JokerDetail__infos {
  position: absolute;
  width: 12vw;
  margin: 0;
  text-align: center;
}

.JokerDetail__actions {
  position: absolute;
  display: flex;
  bottom: 1em;
  gap: 30px;
}

p {
  font-size: 1vw;
  margin-top: 0.2em;
}

h3 {
  font-size: 1vw;
  margin-bottom: 0;
  color: rgb(201, 164, 0);
}

@media (max-width: 1200px) {
  .JokerDetail__img {
    width: 15vw;
  }

  .JokerDetail__container {
    margin-bottom: 5vw;
  }
  .JokerDetail__infos {
    width: 10vw;
  }
}
</style>
