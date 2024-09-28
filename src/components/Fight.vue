<template>
  <div class="Fight">
    <ParticlesComp id="tsparticlestwo" :options="particlesoptions" />
    <FightFlag />
    <FightData />
    <JokerDetail
      v-if="isDetailJokerComponentActive"
      :name="chosenJokerName"
      @activate-joker="
        validateJokerSelection(character, selectedPlayerJoker.index)
      "
    />
    <div class="Fight__jokers"></div>
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
          src="/assets/mochi.png"
          class="Fight__character Fight__character__hero"
          :class="
            roundHealPlayer > roundDamageEnemy ? 'Fight__character__heal' : ''
          "
        />
        <img src="/assets/table3.png" class="Fight__image" />
        <div class="Fight__character__info">
          <div class="Fight__character__info__life">
            <img src="/assets/vie.png" />
            <h3>{{ hp }} PV</h3>
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
        <div
          class="Fight__button Fight__button__attack"
          @click="useAttackWithDice()"
        >
          <img src="/assets/sword.png" />
        </div>
        <div
          class="Fight__button Fight__button__heal"
          @click="useHealWithDice()"
        >
          <img src="/assets/heal.png" />
        </div>
      </div>
    </div>
    <div class="Fight__dicetable">
      <div class="Fight__dicetable__pack">
        <transition name="slide-fade">
          <div v-if="showChosenEnemyJoker && selectedEnemyJoker" class="Fight__dicetable__pack__chosenJoker">
            <img
              src="/assets/cardjoker.png"
              class="Fight__dicetable__pack__chosenJoker__joker"
            />
            <p>{{ selectedEnemyJoker.name }}</p>
          </div>
        </transition>
        <img
          :src="chosenEnemy.img"
          class="Fight__character Fight__character__enemy"
          :class="
            roundHealEnemy > roundDamagePlayer ? 'Fight__character__heal' : ''
          "
        />
        <img
          src="/assets/table3.png"
          class="Fight__image"
          style="transform: scaleX(-1)"
        />
        <div class="Fight__character__info">
          <div class="Fight__character__info__life">
            <img src="/assets/vie.png" />
            <h3>{{ enemyHp }} HP</h3>
          </div>
          <div class="Fight__character__info__jokers">
            <div v-for="(joker, index) in enemyJokers" :key="index">
              <img
                src="/assets/cardjoker.png"
                class="Fight__character__info__jokers__joker"
              />
              <p>{{ joker.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCharacter } from "../composable/character";
import { useJoker } from "../composable/joker";
import ParticlesComp from "./Particles.vue";
import FightFlag from "./FightFlag.vue";
import FightData from "./FightData.vue";
import JokerDetail from "./JokerDetail.vue";

const {
  useAttackWithDice,
  useHealWithDice,
  validateJokerSelection,
  hp,
  enemyHp,
  roundHealPlayer,
  roundHealEnemy,
  roundDamagePlayer,
  roundDamageEnemy,
  fightIsFinished,
  playerJokers,
  enemyJokers,
  selectedPlayerJoker,
  selectedEnemyJoker,
  character,
  chosenEnemy
} = useCharacter();

const {
  isDetailJokerComponentActive,
  chosenJokerName,
  setJokerName,
  showChosenJoker,
  showChosenEnemyJoker,
} = useJoker();

const toggleAllSettingsForJokerDetails = (
  joker: Record<string, string | boolean | number>,
  index: number
) => {
  setJokerName(joker.name);
  isDetailJokerComponentActive.value = true;
  joker.index = index;
  selectedPlayerJoker.value = joker;
};

onMounted(() => {
  fightIsFinished.value = false;
});

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
.Fight {
  position: absolute;
  height: 101%;
  width: 100vw;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.795) 0%,
    rgba(0, 0, 0, 0.351) 50%,
    rgba(0, 0, 0, 0.802) 100%
  );
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 0 20px;
}

.Fight__dicetable {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: relative;
  min-width: 0;
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
  color: rgb(255, 76, 121);
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

.Fight__character__info__jokers div p, .Fight__dicetable__pack__chosenJoker p {
  padding: 14px;
  position: absolute;
  text-align: center;
  transition: all 0.3s ease;
}

@media (max-width: 1200px) {
  .Fight__character__info__jokers div p, .Fight__dicetable__pack__chosenJoker p {
    font-size: 1vw;
  }
}

.Fight__character__info__jokers__joker, .Fight__dicetable__pack__chosenJoker__joker {
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
}

.Fight__character {
  position: absolute;
  top: -85%;
  max-height: 100%;
}

.Fight__character__hero {
  animation: pulsate 8s infinite;
}

.Fight__character__enemy {
  animation: pulsate 8s infinite;
  animation-delay: 2s;
}

.Fight__button {
  width: 10vw;
  max-width: 110px;
  aspect-ratio: 626/533;
  z-index: 1;
  background: url("../../assets/woodenbutton.png") no-repeat center center;
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

@keyframes shrinkToTop {
  0% {
    transform: translate(-50%, -40%) scale(1.5); /* Position initiale au centre en bas */
  }
  100% {
    transform: translate(-50%, -100%) scale(0.5); /* Rétrécit et monte vers le haut */
  }
}

@keyframes pulsateFinishFight {
  0% {
    transform: translate(-50%, -40%) scale(0.8); /* Taille normale */
  }
  50% {
    transform: translate(-50%, -40%) scale(1); /* Grossit de 10% */
  }
  100% {
    transform: translate(-50%, -40%) scale(0.8); /* Retour à la taille normale */
  }
}

@keyframes pulsateFinishFight {
  0% {
    transform: translate(-50%, -40%) scale(0.8); /* Taille normale */
  }
  50% {
    transform: translate(-50%, -40%) scale(1); /* Grossit de 10% */
  }
  100% {
    transform: translate(-50%, -40%) scale(0.8); /* Retour à la taille normale */
  }
}
</style>
