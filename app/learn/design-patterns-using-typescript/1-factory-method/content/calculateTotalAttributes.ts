import { ItemDbData } from "./item.dbData";
import { Item, Sword, ChestPlate } from "./item.class";

function calculateTotalDefenseOfUser(userItems: ItemDbData[]): number {
  let totalDefense = 0;

  for (const rawItem of userItems) {
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

function calculateTotalAttackOfUser(userItems: ItemDbData[]): number {
  let totalAttack = 0;

  for (const rawItem of userItems) {
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

export { calculateTotalDefenseOfUser, calculateTotalAttackOfUser };
