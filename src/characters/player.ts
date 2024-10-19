import { PlayerInterface } from "../types/player";

export default class Player implements PlayerInterface {
  public name: string;
  public hp: number;
  public abilities: Record<string, string | boolean>[];
  public maxheal: number;
  public maxdamage: number;

  constructor(
    name: string,
    hp: number,
    abilities: Record<string, string | boolean>[],
    maxheal: number,
    maxdamage: number
  ) {
    this.name = name;
    this.hp = hp;
    this.abilities = abilities;
    this.maxheal = maxheal;
    this.maxdamage = maxdamage;
  }

  public attack(enemy: PlayerInterface, damage: number): void {
    if (enemy.hp > 0) {
      if (enemy.hp - damage < 0) {
        enemy.hp = 0;
      } else {
        enemy.hp -= damage;
      }
    }
  }

  public heal(amount: number): void {
    this.hp += amount;
  }

  public maxHeal(value: number): void {
    this.hp = value;
  }

  public resetStat(amount: number) {
    this.hp = amount;
  }
}
