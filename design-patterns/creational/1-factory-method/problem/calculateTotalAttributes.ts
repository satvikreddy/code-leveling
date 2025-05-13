import { ChestPlate } from "./item-chest-plate.class";
import { ItemDbData } from "./item-db-data";
import { Sword } from "./item-sword.class";
import { Item } from "./item.class";

export function calculateTotalDefenseOfUser(rawItems: ItemDbData[]): number {
  let totalDefense = 0;

  for (const rawItem of rawItems) {
    let item: Item;
    if (rawItem.type === "chest-plate") {
      item = new ChestPlate();
    } else if (rawItem.type === "sword") {
      item = new Sword();
    } else {
      throw new Error("Invalid item type");
    }

    totalDefense += item.defense();
  }

  return totalDefense;
}

export function calculateTotalAttackOfUser(rawItems: ItemDbData[]): number {
  let totalAttack = 0;

  for (const rawItem of rawItems) {
    let item: Item;
    if (rawItem.type === "chest-plate") {
      item = new ChestPlate();
    } else if (rawItem.type === "sword") {
      item = new Sword();
    } else {
      throw new Error("Invalid item type");
    }

    totalAttack += item.attack();
  }

  return totalAttack;
}
