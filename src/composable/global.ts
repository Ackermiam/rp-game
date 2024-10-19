import { ref } from "vue";

const isIntro = ref(true);
const isVersusMode = ref(false);
const isVersus = ref(false);
const isFight = ref(false);
const isNarrative = ref(false);
const isJokers = ref(false);
const isNarrativeCharacter = ref(true);
const isPlayerTour = ref(false);

export const useGlobal = () => {
  const toggleMenu = () => {
    isIntro.value = true;
    isNarrative.value = false;
    isFight.value = false;
  };

  const toggleVersus = () => {
    isVersus.value = true;
    isVersusMode.value = true;
    isIntro.value = false;
    isNarrative.value = false;
    isFight.value = false;
  };

  const toggleNarrative = () => {
    isIntro.value = false;
    isNarrative.value = true;
    isFight.value = false;
  };

  const toggleFight = () => {
    isIntro.value = false;
    isFight.value = true;
    isNarrative.value = false;
    isVersus.value = false;
  };
  const playerTour = () => {
    isPlayerTour.value = !isPlayerTour.value;
  };
  return {
    isIntro,
    isVersus,
    isFight,
    isNarrative,
    isJokers,
    isNarrativeCharacter,
    isPlayerTour,
    isVersusMode,
    toggleNarrative,
    toggleFight,
    toggleMenu,
    toggleVersus,
    playerTour,
  };
};
