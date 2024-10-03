export interface PlayerInterface {
  name: string;
  hp: number;
  abilities: Record<string, string | boolean>[];
  attack: Function;
  heal: Function;
  resetStat: Function;
  maxheal: number;
  maxdamage: number;
}
