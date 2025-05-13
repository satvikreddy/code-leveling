import { ChestPlate } from "./item-chest-plate.class";
import { ItemDbData } from "./item-db-data";
import { Sword } from "./item-sword.class";

export abstract class Item {
  abstract defense(): number;
  abstract attack(): number;

  static fromDbData(rawItem: ItemDbData): Item {
    if (rawItem.type === "chest-plate") {
      return new ChestPlate();
    } else if (rawItem.type === "sword") {
      return new Sword();
    } else {
      throw new Error("Invalid item type");
    }
  }
}
