import { ref } from "vue";

const displayFight = ref(true);
const displayWin = ref(false);
const displayLose = ref(false);

export const useFightFlag = () => {
  return {
    displayFight,
    displayWin,
    displayLose,
  };
};
