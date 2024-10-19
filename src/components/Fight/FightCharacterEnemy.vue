<template>
  <div class="FightCharacterEnemy__dicetable">
    <div class="FightCharacterEnemy__dicetable__pack">
      <transition name="slide-fade">
        <div
          v-if="showChosenEnemyJoker && selectedEnemyJoker"
          class="FightCharacterEnemy__dicetable__pack__chosenJoker"
        >
          <img
            src="/assets/cardjoker.png"
            class="FightCharacterEnemy__dicetable__pack__chosenJoker__joker"
          />
          <p>{{ selectedEnemyJoker.name }}</p>
        </div>
      </transition>
      <img
        :src="chosenEnemy.img"
        class="FightCharacterEnemy__character FightCharacterEnemy__character__enemy"
        :class="
          roundHealEnemy > roundDamagePlayer
            ? 'FightCharacterEnemy__character__heal'
            : ''
        "
      />
      <img
        src="../../../src/assets/images/table3.png"
        class="FightCharacterEnemy__image"
        style="transform: scaleX(-1)"
      />
      <div class="FightCharacterEnemy__character__info">
        <div class="FightCharacterEnemy__character__info__life">
          <div class="FightCharacterEnemy__character__info__life__other">
            <img src="../../../src/assets/images/sword.png" />
            <p>{{ chosenEnemy.damage }}</p>
          </div>
          <div
            class="FightCharacterEnemy__character__info__life__other FightCharacterEnemy__character__info__life__other--life"
          >
            <img src="../../../src/assets/images/vie.png" />
            <h3>{{ enemyHp }} PV</h3>
          </div>
          <div class="FightCharacterEnemy__character__info__life__other">
            <img src="../../../src/assets/images/heal.png" />
            <p>{{ chosenEnemy.heal }}</p>
          </div>
        </div>
        <div class="FightCharacterEnemy__character__info__jokers">
          <div v-for="(joker, index) in enemyJokers" :key="index">
            <img
              src="/assets/cardjoker.png"
              class="FightCharacterEnemy__character__info__jokers__joker"
            />
            <p>{{ joker.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCharacter } from "../../composable/character";
import { useJoker } from "../../composable/joker";

const {
  enemyHp,
  roundHealEnemy,
  roundDamagePlayer,
  fightIsFinished,
  enemyJokers,
  selectedEnemyJoker,
  chosenEnemy,
} = useCharacter();

const { showChosenEnemyJoker } = useJoker();

onMounted(() => {
  fightIsFinished.value = false;
});
</script>

<style scoped>
.FightCharacterEnemy__dicetable {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: relative;
  min-width: 0;
}

.FightCharacterEnemy__dicetable__pack:hover .FightCharacterEnemy__image {
  filter: blur(2px);
}

.FightCharacterEnemy__dicetable__pack__chosenJoker {
  position: absolute;
  top: -15vw;
  left: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: flame 4s infinite;
}

.FightCharacterEnemy__dicetable__pack {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.FightCharacterEnemy__image,
.FightCharacterEnemy__character {
  max-width: 100%;
  width: auto;
  height: auto;
  transition: all 0.5s ease;
}

.FightCharacterEnemy__character {
  transition: filter 0.5s ease;
}

.FightCharacterEnemy__character__heal {
  filter: drop-shadow(0 0 30px rgb(0, 255, 115));
}

.FightCharacterEnemy__character__info {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.FightCharacterEnemy__character__info__life {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: rgb(252, 90, 90);
  margin-bottom: 0.7vw;
  margin-top: 1vw;
}

.FightCharacterEnemy__character__info__life__other {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2.5vw;
  font-size: 1.3vw !important;
  color: rgb(255, 76, 121);
  font-weight: 600;
  filter: drop-shadow(0 0 10px rgba(90, 90, 90, 0.808));
}

.FightCharacterEnemy__character__info__life__other:first-child {
  color: rgb(0, 255, 149);
}
.FightCharacterEnemy__character__info__life__other:last-child {
  margin-right: 0;
  color: rgb(0, 255, 149);
}

.FightCharacterEnemy__character__info__life__other img,
p {
  margin: 0 !important;
}

.FightCharacterEnemy__character__info__life__other--life {
  margin-bottom: 20px;
}

.FightCharacterEnemy__character__info__life img {
  width: 5vw;
  max-width: 35px;
  height: auto;
  object-fit: contain;
  margin-right: 0.5vw;
}

.FightCharacterEnemy__character__info__life h3 {
  margin: 0;
  font-size: 1.5vw;
}

.FightCharacterEnemy__character__info__jokers {
  display: flex;
  gap: 1.5vw;
}

.FightCharacterEnemy__character__info__jokers div {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.FightCharacterEnemy__character__info__jokers div:hover {
  transform: scale(1.02);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.FightCharacterEnemy__character__info__jokers div p,
.FightCharacterEnemy__dicetable__pack__chosenJoker p {
  padding: 14px;
  position: absolute;
  text-align: center;
  transition: all 0.3s ease;
}

@media (max-width: 1200px) {
  .FightCharacterEnemy__character__info__jokers div p,
  .FightCharacterEnemy__dicetable__pack__chosenJoker p {
    font-size: 1vw;
  }
}

.FightCharacterEnemy__character__info__jokers__joker,
.FightCharacterEnemy__dicetable__pack__chosenJoker__joker {
  pointer-events: none;
  width: 7vw;
  max-width: 100px;
  height: auto;
  object-fit: contain;
}

.FightCharacterEnemy__image {
  z-index: 1;
  aspect-ratio: 468/350;
  max-height: 325px;
  max-width: 480px;
  width: 25vw;
}

@media (max-width: 1200px) {
  .FightCharacterEnemy__image {
    width: 23vw;
  }

  .FightCharacterEnemy__character__info__jokers__joker {
    width: 7vw;
    max-width: 50px;
  }
}

.FightCharacterEnemy__character {
  position: absolute;
  top: -85%;
  max-height: 100%;
}

.FightCharacterEnemy__character__enemy {
  animation: pulsate 8s infinite;
  animation-delay: 2s;
}

.FightCharacterEnemy__button {
  width: 10vw;
  max-width: 110px;
  aspect-ratio: 626/533;
  z-index: 1;
  background: url("../../../src/assets/images/woodenbutton.png") no-repeat
    center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.FightCharacterEnemy__button img {
  width: auto;
  margin-left: 7%;
}

.FightCharacterEnemy__button:first-child img {
  height: 70%;
}
.FightCharacterEnemy__button:last-child img {
  height: 60%;
}

.FightCharacterEnemy__button:first-child {
  margin-bottom: 1rem;
}

.FightCharacterEnemy__button__attack,
.FightCharacterEnemy__button__heal,
.FightCharacterEnemy__button__attack img,
.FightCharacterEnemy__button__heal img {
  transition: all 0.3s ease;
}

.FightCharacterEnemy__button__attack:hover {
  filter: drop-shadow(0 0 10px rgb(252, 90, 90, 0.25));
  transform: scale(1.05);
}

.FightCharacterEnemy__button__attack:hover img {
  filter: drop-shadow(0 0 10px rgb(252, 90, 90));
}

.FightCharacterEnemy__button__heal:hover {
  filter: drop-shadow(0 0 10px rgba(0, 255, 115, 0.25));
  transform: scale(1.05);
}

.FightCharacterEnemy__button__heal:hover img {
  filter: drop-shadow(0 0 10px rgb(0, 255, 115));
}

@media (max-width: 1200px) {
  .FightCharacterEnemy__character__info__life img {
    max-width: 25px;
  }

  .FightCharacterEnemy__character__info__life__other {
    margin-right: 2vw;
    font-size: 1.2vw !important;
  }

  .FightCharacterEnemy__character__info__life h3 {
    font-size: 1.2vw;
  }

  .FightCharacterEnemy__character__info__life__other--life {
    margin-bottom: 10px;
  }
}
</style>
