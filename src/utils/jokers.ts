const jokers = [
  {
    name: "Coup Critique",
    func: "DoubleDamage",
    descript: "Double les dégâts pendant ce tour",
    isBlockingTour: false,
    effect: "damagePlayer",
    effectEnemy: "damageEnemy",
  },
  {
    name: "Coup De Grâce",
    func: "DivineDamage",
    descript: "Attaque de 20 dégâts",
    isBlockingTour: true,
    effect: "damagePlayer",
    effectEnemy: "damageEnemy",
  },
  {
    name: "Soin puissant",
    func: "DoubleHeal",
    descript: "Double le heal pendant ce tour",
    isBlockingTour: false,
    effect: "healPlayer",
    effectEnemy: "healEnemy",
  },
  {
    name: "Bouclier de Pierre",
    func: "DivideDamage",
    descript: "Divise les dégâts ennemi par deux pendant ce tour",
    isBlockingTour: false,
    effect: "damageEnemy",
    effectEnemy: "damagePlayer",
  },
  {
    name: "Bouclier Divin",
    func: "BlockDamage",
    descript: "Bloque les dégâts ennemi pendant ce tour",
    isBlockingTour: false,
    effect: "damageEnemy",
    effectEnemy: "damagePlayer",
  },
  {
    name: "Double Tranchant",
    func: "ForceDamage",
    descript: "Les dégâts de l'ennemi sont bloqués à 10 pour ce tour",
    isBlockingTour: false,
    effect: "damageEnemy",
    effectEnemy: "damagePlayer",
  },
  {
    name: "Soin Divin",
    func: "DivineHeal",
    descript: "Soigne de 20 PV",
    isBlockingTour: true,
    effect: "healPlayer",
    effectEnemy: "healEnemy",
  },
  {
    name: "Soin rapide",
    func: "QuickHeal",
    descript: "Soigne de 10 PV",
    isBlockingTour: false,
    effect: "healPlayer",
    effectEnemy: "healEnemy",
  },
];

export const choseJokers = () => {
  const jokerToChose = [...jokers];
  const chosenJokers = [];

  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * jokerToChose.length);
    const [extractedJoker] = jokerToChose.splice(random, 1);
    chosenJokers.push(extractedJoker);
  }

  return chosenJokers;
};

export const returnRightJoker = (
  name: string
): Record<string, string | boolean> => {
  const [rightjoker] = jokers.filter((joker) => joker.name === name);
  return rightjoker;
};
