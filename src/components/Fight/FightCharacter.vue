<template>
  <div class="Fight__dicetable">
    <div class="Fight__dicetable__pack">
      <transition name="slide-fade">
        <div v-if="showChosenJoker" class="Fight__dicetable__pack__chosenJoker">
          <img
            src="/assets/cardjoker.png"
            class="Fight__dicetable__pack__chosenJoker__joker"
          />
          <p>{{ selectedPlayerJoker.name }}</p>
        </div>
      </transition>
      <img
        :src="chosenPlayer.img"
        class="Fight__character"
        :class="[
          'Fight__character__hero',
          toggleAttackAnimation ? 'Fight__character__attack' : '',
          roundHealPlayer > roundDamageEnemy ? 'Fight__character__heal' : '',
        ]"
      />
      <img src="../../../src/assets/images/table3.png" class="Fight__image" />
      <div class="Fight__character__info">
        <div class="Fight__character__info__life">
          <div class="Fight__character__info__life__other">
            <img src="../../../src/assets/images/sword.png" />
            <p>{{ chosenPlayer.damage }}</p>
          </div>
          <div
            class="Fight__character__info__life__other Fight__character__info__life__other--life"
          >
            <img src="../../../src/assets/images/vie.png" />
            <h3>{{ hp }} PV</h3>
          </div>
          <div class="Fight__character__info__life__other">
            <img src="../../../src/assets/images/heal.png" />
            <p>{{ chosenPlayer.heal }}</p>
          </div>
        </div>
        <div class="Fight__character__info__jokers">
          <div
            v-for="(joker, index) in playerJokers"
            :key="index"
            @click="toggleAllSettingsForJokerDetails(joker, index)"
          >
            <img
              src="/assets/cardjoker.png"
              class="Fight__character__info__jokers__joker"
            />
            <p>{{ joker.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="Fight__button Fight__button__attack" @click="attack()">
        <img src="../../../src/assets/images/sword.png" />
      </div>
      <div class="Fight__button Fight__button__heal" @click="useHealWithDice()">
        <img src="../../../src/assets/images/heal.png" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCharacter } from "../../composable/character";
import { useJoker } from "../../composable/joker";

const {
  useAttackWithDice,
  useHealWithDice,
  hp,
  fightIsFinished,
  playerJokers,
  selectedPlayerJoker,
  chosenPlayer,
  roundHealPlayer,
  roundDamageEnemy,
} = useCharacter();

const { isDetailJokerComponentActive, setJokerName, showChosenJoker } =
  useJoker();

const toggleAllSettingsForJokerDetails = (
  joker: Record<string, string | boolean | number>,
  index: number
) => {
  setJokerName(joker.name);
  isDetailJokerComponentActive.value = true;
  joker.index = index;
  selectedPlayerJoker.value = joker;
};

const attack = () => {
  toggleAttackAnimation.value = true;

  useAttackWithDice();

  setTimeout(() => {
    toggleAttackAnimation.value = false;
  }, 300);
};

const toggleAttackAnimation = ref(false);

onMounted(() => {
  fightIsFinished.value = false;
});
</script>

<style scoped>
.Fight__dicetable {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: relative;
  min-width: 0;
  margin-right: 4vw;
}

.Fight__dicetable__pack:hover .Fight__image {
  filter: blur(2px);
}

.Fight__dicetable__pack__chosenJoker {
  position: absolute;
  top: -15vw;
  left: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: flame 4s infinite;
}

.Fight__dicetable__pack {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.Fight__image,
.Fight__character {
  max-width: 100%;
  width: auto;
  height: auto;
  transition: all 0.5s ease;
}

.Fight__character {
  transition: filter 0.5s ease;
}

.Fight__character__heal {
  filter: drop-shadow(0 0 30px rgb(0, 255, 115));
}

.Fight__character__info {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.Fight__character__info__life {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: rgb(252, 90, 90);
  margin-bottom: 0.7vw;
  margin-top: 1vw;
}

.Fight__character__info__life__other {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2.5vw;
  font-size: 1.3vw !important;
  color: rgb(255, 76, 121);
  font-weight: 600;
  filter: drop-shadow(0 0 10px rgba(90, 90, 90, 0.808));
}

.Fight__character__info__life__other:first-child {
  color: rgb(0, 255, 149);
}
.Fight__character__info__life__other:last-child {
  margin-right: 0;
  color: rgb(0, 255, 149);
}

.Fight__character__info__life__other img,
p {
  margin: 0 !important;
}

.Fight__character__info__life__other--life {
  margin-bottom: 20px;
}

.Fight__character__info__life img {
  width: 5vw;
  max-width: 35px;
  height: auto;
  object-fit: contain;
  margin-right: 0.5vw;
}

.Fight__character__info__life h3 {
  margin: 0;
  font-size: 1.5vw;
}

.Fight__character__info__jokers {
  display: flex;
  gap: 1.5vw;
}

.Fight__character__info__jokers div {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.Fight__character__info__jokers div:hover {
  transform: scale(1.02);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.Fight__character__info__jokers div p,
.Fight__dicetable__pack__chosenJoker p {
  padding: 14px;
  position: absolute;
  text-align: center;
  transition: all 0.3s ease;
}

@media (max-width: 1200px) {
  .Fight__character__info__jokers div p,
  .Fight__dicetable__pack__chosenJoker p {
    font-size: 1vw;
  }
}

.Fight__character__info__jokers__joker,
.Fight__dicetable__pack__chosenJoker__joker {
  pointer-events: none;
  width: 7vw;
  max-width: 100px;
  height: auto;
  object-fit: contain;
}

.Fight__image {
  z-index: 1;
  aspect-ratio: 468/350;
  max-height: 325px;
  max-width: 480px;
  width: 25vw;
}

@media (max-width: 1200px) {
  .Fight__image {
    width: 23vw;
  }
  .Fight__character__info__jokers__joker {
    width: 7vw;
    max-width: 50px;
  }
}

.Fight__character {
  position: absolute;
  top: -85%;
  max-height: 100%;
}

.Fight__character__hero {
  animation: pulsatePlayer 8s infinite;
}

.Fight__character__attack {
  animation: attack 0.3s ease-in-out;
}

.Fight__button {
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

.Fight__button img {
  width: auto;
  margin-left: 7%;
}

.Fight__button:first-child img {
  height: 70%;
}
.Fight__button:last-child img {
  height: 60%;
}

.Fight__button:first-child {
  margin-bottom: 1rem;
}

.Fight__button__attack,
.Fight__button__heal,
.Fight__button__attack img,
.Fight__button__heal img {
  transition: all 0.3s ease;
}

.Fight__button__attack:hover {
  filter: drop-shadow(0 0 10px rgb(252, 90, 90, 0.25));
  transform: scale(1.05);
}

.Fight__button__attack:hover img {
  filter: drop-shadow(0 0 10px rgb(252, 90, 90));
}

.Fight__button__heal:hover {
  filter: drop-shadow(0 0 10px rgba(0, 255, 115, 0.25));
  transform: scale(1.05);
}

.Fight__button__heal:hover img {
  filter: drop-shadow(0 0 10px rgb(0, 255, 115));
}

@media (max-width: 1200px) {
  .Fight__button {
    max-width: 7vw;
  }

  .Fight__character__info__life img {
    max-width: 25px;
  }

  .Fight__character__info__life__other {
    margin-right: 2vw;
    font-size: 1.2vw !important;
  }

  .Fight__character__info__life h3 {
    font-size: 1.2vw;
  }

  .Fight__character__info__life__other--life {
    margin-bottom: 10px;
  }
}

@keyframes attack {
  0% {
    transform: translateX(0) scaleX(-1);
  }
  10% {
    transform: translateX(-25px) scaleX(-1);
    filter: blur(4px);
  }
  80% {
    transform: translateX(60px) scaleX(-1);
    filter: blur(2px);
  }
  100% {
    transform: translateX(0) scaleX(-1);
    filter: blur(0);
  }
}
</style>
