import { ItemDbData } from "./item-db-data";
import { Item } from "./item.class";

export function calculateTotalDefenseOfUser(rawItems: ItemDbData[]): number {
  let totalDefense = 0;

  for (const rawItem of rawItems) {
    let item = Item.fromDbData(rawItem);

    totalDefense += item.defense();
  }

  return totalDefense;
}

export function calculateTotalAttackOfUser(rawItems: ItemDbData[]): number {
  let totalAttack = 0;

  for (const rawItem of rawItems) {
    let item = Item.fromDbData(rawItem);

    totalAttack += item.attack();
  }

  return totalAttack;
}
