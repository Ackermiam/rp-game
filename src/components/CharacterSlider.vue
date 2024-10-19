<template>
  <div class="CharacterSlider">
    <img :src="config.img" class="CharacterSlider__character" />
    <img
      src="../../src/assets/images/table4.png"
      class="CharacterSlider__table"
    />
    <img
      src="../../src/assets/images/select.png"
      class="CharacterSlider__table__button"
      @click="isPlayerChosen ? setEnemy(config) : setPlayer(config)"
    />
    <div class="CharacterSlider__table__infos">
      <h3>{{ config.name }}</h3>
      <div class="CharacterSlider__table__infos__info">
        <div class="CharacterSlider__table__infos__info">
          <img src="../../src/assets/images/sword.png" />
          <p>{{ config.damage }}</p>
        </div>
        <div class="CharacterSlider__table__infos__info">
          <img src="../../src/assets/images/vie.png" />
          <p>{{ config.hp }} PV</p>
        </div>
        <div class="CharacterSlider__table__infos__info">
          <img src="../../src/assets/images/heal.png" />
          <p>{{ config.heal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacter } from "../composable/character";

const { setEnemy, setPlayer, isPlayerChosen } = useCharacter();

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
  transition: all 0.3s ease;
  filter: blur(2px);
}

.CharacterSlider__table__button {
  position: absolute;
  width: 250px;
  z-index: 2;
  bottom: -20%;
  transition: all 0.4s ease;
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
  margin: 0;
}

.CharacterSlider__table__infos h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.5em;
  color: #ffffff;
  text-shadow: rgb(0, 0, 0) 1px 0 15px;
}

.CharacterSlider__table__infos__info {
  display: flex;
}

.CharacterSlider__table__infos__info div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.7vw;
  font-size: 1.3vw !important;
  color: rgb(255, 76, 121);
  font-weight: 600;
  filter: drop-shadow(0 0 10px rgba(90, 90, 90, 0.808));
}

.CharacterSlider__table__infos__info div img {
  width: 5vw;
  max-width: 35px;
  height: auto;
  object-fit: contain;
}

.CharacterSlider__table__infos__info:first-child {
  color: rgb(0, 255, 149);
}
.CharacterSlider__table__infos__info:last-child {
  margin-right: 0;
  color: rgb(0, 255, 149);
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
  transition: all 0.3s ease;
}

@media (max-width: 1200px) {
  .CharacterSlider__table {
    min-width: 120px;
    width: 20vw;
  }

  .CharacterSlider__character {
    height: 170px;
    top: -95%;
  }

  .CharacterSlider__table__button {
    width: 150px;
    bottom: -20%;
  }

  .CharacterSlider__table__infos h3 {
    font-size: 1em;
    margin-bottom: 5px;
  }

  .CharacterSlider__table__infos p {
    font-size: 0.9em;
    margin: 0;
    margin-bottom: 10px;
  }

  .CharacterSlider__table__infos__info div img {
    max-width: 25px;
  }
}
</style>
