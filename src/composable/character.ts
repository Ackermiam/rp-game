import { ref, reactive, toRefs } from "vue";
import { PlayerInterface } from "../types/player";
import { rollDice } from "../utils/dice";
import { calculatePercent } from "../utils/percent";
import { useGlobal } from "./global";
import { useJoker } from "../composable/joker";
import { useFightFlag } from "../composable/fightFlag";
import Player from "../characters/player";
import story from "../story/story.json";
import * as jokers from "../utils/jokersFunc";

const { toggleNarrative, toggleFight, toggleVersus, isVersusMode } =
  useGlobal();

const {
  displayFight,
  displayWin,
  displayLose
} = useFightFlag();

const {
  isDetailJokerComponentActive,
  showChosenJoker,
  showChosenEnemyJoker,
  selectedPlayerJoker,
  selectedEnemyJoker,
  resetTourJoker,
} = useJoker();

const chosenEnemy = ref();
const chosenPlayer = ref();
const chosenBackground = ref();
const isPlayerChosen = ref(false);

const character: PlayerInterface = reactive(new Player("Mochi", 100, [], 0, 0));
const characterenemy: PlayerInterface = reactive(new Player("", 0, [], 0, 0));

const roundState = reactive({
  damagePlayer: 0,
  healPlayer: 0,
  damageEnemy: 0,
  healEnemy: 0,
});

const playerAlreadyPlayed = ref(true);
const currentRound = ref(1);
const roundIsPlaying = ref(false);
const fightIsFinished = ref(false);

let maxLifeEnemy = characterenemy.hp;
let maxLifePlayer: number = character.hp;

export const useCharacter = () => {
  const setEnemy = (config: any) => {
    chosenEnemy.value = config;
    characterenemy.hp = chosenEnemy.value.hp;
    characterenemy.name = chosenEnemy.value.name;
    characterenemy.maxdamage = chosenEnemy.value.damage;
    characterenemy.maxheal = chosenEnemy.value.heal;
    maxLifeEnemy = chosenEnemy.value.hp;
    toggleFight();
  };

  const setPlayer = (config: any) => {
    chosenPlayer.value = config;
    character.hp = chosenPlayer.value.hp;
    character.name = chosenPlayer.value.name;
    character.maxdamage = chosenPlayer.value.damage;
    character.maxheal = chosenPlayer.value.heal;
    maxLifePlayer = chosenPlayer.value.hp;
    isPlayerChosen.value = true;
    console.log(config);
  };

  const setNumberBackground = () => {
    chosenBackground.value = rollDice(Object.keys(story.backgrounds).length);
  };

  const attack = (person: PlayerInterface, damage: number) => {
    character.attack(person, damage);
  };

  const heal = (person: PlayerInterface, amount: number) => {
    if (person === character) {
      console.log(maxLifePlayer);
      character.hp + amount > maxLifePlayer
        ? person.maxHeal(maxLifePlayer)
        : person.heal(amount);
    }
    if (person === characterenemy) {
      characterenemy.hp + amount > maxLifeEnemy
        ? (characterenemy.hp = maxLifeEnemy)
        : person.heal(amount);
    }
  };

  const enemyUseJoker = () => {
    const useJoker = rollDice(2);
    useJoker === 1 ? enemyChoseJoker(characterenemy) : "";
  };

  const enemyChoseJoker = (person: PlayerInterface) => {
    const choseJoker = rollDice(person.abilities.length) - 1;
    selectedEnemyJoker.value = person.abilities.splice(choseJoker, 1)[0];
    showChosenEnemyJoker.value = true;
    manageEnemyJoker();
  };

  const manageEnemyJoker = () => {
    const funcName = selectedEnemyJoker.value.func;
    const funcToExecute = jokers[funcName];
    const effect = selectedEnemyJoker.value.effectEnemy;
    const effectValue = roundState[effect];
    const result = funcToExecute(effectValue);
    roundState[effect] = result;
  };

  const pushJoker = (
    charac: string,
    joker: Record<string, string | boolean>
  ) => {
    charac === "player"
      ? character.abilities.push(joker)
      : characterenemy.abilities.push(joker);
  };

  const resetData = () => {
    roundState.damagePlayer = 0;
    roundState.healPlayer = 0;
    roundState.damageEnemy = 0;
    roundState.healEnemy = 0;
  };

  const useAttackWithDice = () => {
    if (fightIsFinished.value === true) {
      return;
    }
    if (playerAlreadyPlayed.value === false) {
      roundState.damagePlayer = rollDice(character.maxdamage);
      playerAlreadyPlayed.value = true;
      playRound();
    }
  };

  const useHealWithDice = () => {
    if (fightIsFinished.value === true) {
      return;
    }
    if (playerAlreadyPlayed.value === false) {
      roundState.healPlayer = rollDice(character.maxheal);
      playerAlreadyPlayed.value = true;

      playRound();
    }
  };

  const useEnemyActionWithDice = (
    actionType: "attack" | "heal",
    diceMax: number
  ) => {
    if (actionType === "attack") {
      roundState.damageEnemy = rollDice(diceMax);
    } else {
      roundState.healEnemy = rollDice(diceMax);
    }
  };

  const enemyChoseAction = () => {
    const diceMax =
      calculatePercent(characterenemy.hp, maxLifeEnemy) < 80 ? 2 : 1;
    const choseAction = rollDice(diceMax);
    choseAction === 1
      ? useEnemyActionWithDice("attack", chosenEnemy.value.damage)
      : useEnemyActionWithDice("heal", chosenEnemy.value.heal);
  };

  const resolveRound = () => {
    if (roundState.damagePlayer > 0) {
      attack(characterenemy, roundState.damagePlayer);
    }

    if (roundState.damageEnemy > 0) {
      attack(character, roundState.damageEnemy);
    }

    if (roundState.healPlayer > 0) {
      heal(character, roundState.healPlayer);
    }

    if (roundState.healEnemy > 0) {
      heal(characterenemy, roundState.healEnemy);
    }
  };

  const managePlayerJoker = () => {
    if (
      !selectedPlayerJoker.value ||
      !selectedPlayerJoker.value.func ||
      !selectedPlayerJoker.value.effect
    ) {
      resolveRound();
      return;
    }

    const funcName = selectedPlayerJoker.value.func;
    const funcToExecute = jokers[funcName];

    if (typeof funcToExecute !== "function") {
      resolveRound();
      return;
    }

    const effect = selectedPlayerJoker.value.effect;
    const effectValue = roundState[effect];

    if (effectValue === undefined) {
      resolveRound();
      return;
    }

    const result = funcToExecute(effectValue);
    roundState[effect] = result;

    resolveRound();
  };

  const validateJokerSelection = (person: PlayerInterface, index: number) => {
    isDetailJokerComponentActive.value = false;
    person.abilities.splice(index, 1);
    showChosenJoker.value = true;
  };

  const playRound = () => {
    roundIsPlaying.value = true;
    enemyChoseAction();
    if (characterenemy.abilities.length > 0) {
      enemyUseJoker();
    }
    managePlayerJoker();

    setTimeout(() => {
      currentRound.value += 1;
      resetData();
      playerAlreadyPlayed.value = false;
      roundIsPlaying.value = false;
      resetTourJoker();
      checkIfFinished();
    }, 2000);
  };

  const handleEndOfFight = (winner: "player" | "enemy") => {
    fightIsFinished.value = true;
    displayFight.value = false;
    if (winner === "enemy") {
      displayLose.value = true;
    } else {
      displayWin.value = true;
    }
    setTimeout(() => {
      choseWhatToDisplayEndOfFight();
      endFight();
    }, 2000);
  };

  const choseWhatToDisplayEndOfFight = () => {
    if (isVersusMode) {
      toggleVersus();
    } else {
      toggleNarrative();
    }
  };

  const deleteAbilities = () => {
    character.abilities = [];
    characterenemy.abilities = [];
  };

  const checkIfFinished = () => {
    if (character.hp <= 0 && characterenemy.hp <= 0) {
      handleEndOfFight("player");
    } else if (character.hp <= 0) {
      handleEndOfFight("enemy");
    } else if (characterenemy.hp <= 0) {
      handleEndOfFight("player");
    }
  };

  const endFight = () => {
    character.resetStat(100);
    characterenemy.resetStat(maxLifeEnemy);
    deleteAbilities();
    isPlayerChosen.value = false;
  };

  const resetFlag = () => {
    displayFight.value = true;
    displayWin.value = false;
    displayLose.value = false;
  };

  return {
    hp: toRefs(character).hp,
    enemyHp: toRefs(characterenemy).hp,
    playerJokers: toRefs(character).abilities,
    enemyJokers: toRefs(characterenemy).abilities,
    roundDamagePlayer: toRefs(roundState).damagePlayer,
    roundHealPlayer: toRefs(roundState).healPlayer,
    roundDamageEnemy: toRefs(roundState).damageEnemy,
    roundHealEnemy: toRefs(roundState).healEnemy,
    roundIsPlaying,
    displayFight,
    displayWin,
    displayLose,
    fightIsFinished,
    playerAlreadyPlayed,
    selectedPlayerJoker,
    selectedEnemyJoker,
    character,
    chosenEnemy,
    chosenPlayer,
    chosenBackground,
    isPlayerChosen,
    setEnemy,
    setPlayer,
    resetFlag,
    pushJoker,
    useHealWithDice,
    useAttackWithDice,
    setNumberBackground,
    validateJokerSelection,
  };
};
