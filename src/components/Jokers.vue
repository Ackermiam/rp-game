<template>
  <div class="Jokers">
    <JokerDetail
      v-if="isDetailJokerComponentActive"
      :name="chosenJokerName"
      @activate-joker="
        selectRandom = false;
        selectJoker(currentIndex);
      "
    />
    <div v-if="jokers.length > 0" class="Jokers__imgs">
      <transition name="slide">
        <img
          v-show="blockChose === 0"
          src="../../src/assets/images/playerturn.png"
          class="Jokers__turnimg"
        />
      </transition>
      <transition name="slide">
        <img
          v-show="blockChose === 1"
          src="../../src/assets/images/enemyturn.png"
          class="Jokers__turnimg"
        />
      </transition>
    </div>
    <div class="Jokers__support">
      <Joker
        v-for="(joker, index) in jokers"
        :key="index"
        :name="joker.name"
        :description="joker.descript"
        img="/rp-game/assets/cardjoker.png"
        @click="
          blockChose === 1
            ? ''
            : toggleAllSettingsForJokerDetails(joker.name, index)
        "
      />
    </div>
    <Button
      v-if="selectRandom"
      :filled="false"
      @click="selectRandomJokers()"
      text="Choix aléatoire"
      style="margin-top: 25px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCharacter } from "../composable/character";
import { choseJokers } from "../utils/jokers";
import { useGlobal } from "../composable/global";
import { useJoker } from "../composable/joker";
import JokerDetail from "./JokerDetail.vue";
import Joker from "./Joker.vue";
import Button from "./Button.vue";

const { playerAlreadyPlayed, pushJoker } = useCharacter();
const { isJokers } = useGlobal();

const jokers = ref(choseJokers());
const currentIndex = ref();
const blockChose = ref(0);
const selectRandom = ref(true);

const { isDetailJokerComponentActive, chosenJokerName, setJokerName } =
  useJoker();

const toggleAllSettingsForJokerDetails = (name: string, index: number) => {
  setJokerName(name);
  isDetailJokerComponentActive.value = true;
  currentIndex.value = index;
};

const selectJoker = (index: number) => {
  isDetailJokerComponentActive.value = false;
  blockChose.value = 1;
  const [chosenJoker] = jokers.value.splice(index, 1);
  pushJoker("player", chosenJoker);
  setTimeout(() => {
    selectJokerEnemy();
    blockChose.value = 0;
    if (jokers.value.length <= 0) {
      isJokers.value = false;
      playerAlreadyPlayed.value = false;
    }
  }, 2000);
};

const selectRandomJokers = () => {
  selectRandom.value = false;
  selectRandomJoker();
};

const selectJokerEnemy = () => {
  const random = Math.floor(Math.random() * jokers.value.length);
  const [chosenJoker] = jokers.value.splice(random, 1);
  pushJoker("enemy", chosenJoker);
};

const selectRandomJoker = () => {
  for (let i = 0; i < jokers.value.length; i++) {
    blockChose.value = 1;
    const random = Math.floor(Math.random() * jokers.value.length);
    selectJoker(random);
  }
};
</script>

<style scoped>
.Jokers {
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
  position: absolute;
  z-index: 9;
}

.Jokers__turnimg {
  width: 30vw;
  transition: all 1s ease;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.Jokers__imgs {
  top: 1vh;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.Jokers__support {
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  flex-wrap: wrap;
  transition: all 0.3s ease;
  margin-top: 15vh;
}

.Jokers__description {
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin: 2rem;
  text-shadow: 2px 2px 10px rgb(255, 208, 0);
}
</style>
