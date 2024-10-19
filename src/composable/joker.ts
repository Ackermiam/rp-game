import { ref } from "vue";

const isDetailJokerComponentActive = ref(false);
const chosenJokerName = ref("");
const showChosenJoker = ref(false);
const showChosenEnemyJoker = ref(false);
const selectedPlayerJoker = ref();
const selectedEnemyJoker = ref();

export const useJoker = () => {
  const setJokerName = (name: string) => {
    chosenJokerName.value = name;
  };

  const resetTourJoker = () => {
    selectedPlayerJoker.value = "";
    showChosenJoker.value = false;
    selectedEnemyJoker.value = "";
    showChosenEnemyJoker.value = false;
  };

  return {
    isDetailJokerComponentActive,
    chosenJokerName,
    showChosenJoker,
    showChosenEnemyJoker,
    selectedPlayerJoker,
    selectedEnemyJoker,
    setJokerName,
    resetTourJoker,
  };
};
