<template>
  <div class="CharacterSlider">
    <img
      :src="config.img"
      class="CharacterSlider__character"
    />
    <img src="/assets/table4.png" class="CharacterSlider__table" />
    <img src="/assets/select.png" class="CharacterSlider__table__button" @click="setEnemy(config)"/>
    <div class="CharacterSlider__table__infos">
      <h3>{{ config.name }}</h3>
      <p>{{ config.hp }} PV</p>
      <p>Dégâts Max : {{ config.damage }}</p>
      <p>Heal Max : {{ config.heal }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacter } from "../composable/character";

const { setEnemy } = useCharacter();

defineProps<{
  config: {
    img: string;
    name: string;
    hp: number;
    damage: number;
    heal: number;
  };
}>();
</script>

<style scoped>
.CharacterSlider {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 25px;
}

.CharacterSlider__table {
  pointer-events: none;
  width: 300px;
  z-index: 1;
  transition: all .3s ease;
  filter: blur(2px);
}

.CharacterSlider__table__button {
  position: absolute;
  width: 250px;
  z-index: 2;
  bottom: -20%;
  transition: all .4s ease;
}

.CharacterSlider__table__button:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 20px rgba(201, 0, 0, 0.774));
}

.CharacterSlider__table__infos {
  position: absolute;
  z-index: 1;
  text-align: center;
  color: black;
  font-weight: 600;
}

.CharacterSlider__table__infos p {
  margin-top: 0;
  margin-bottom: 5px;
}

.CharacterSlider__table__infos h3 {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 1.5em;
  color: #ffffff;
  text-shadow: rgb(0, 0, 0) 1px 0 15px;
}

.CharacterSlider:hover .CharacterSlider__table {
  filter: blur(0);
}

.CharacterSlider:hover .CharacterSlider__character {
  filter: blur(0);
  animation: selectCharacter 5s infinite;
}

.CharacterSlider__character {
  position: absolute;
  pointer-events: none;
  top: -120%;
  height: 300px;
  transition: all .3s ease;
}
</style>
