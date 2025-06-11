import { ItemDbData } from "./item.dbData";

abstract class Item {
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

class Sword extends Item {
  defense(): number {
    return 0;
  }

  attack(): number {
    return 7;
  }
}

class ChestPlate extends Item {
  defense(): number {
    return 10;
  }

  attack(): number {
    return 0;
  }
}

export { Item, Sword, ChestPlate };
