import { Item } from "./item.class";

export class ChestPlate extends Item {
  defense(): number {
    return 10;
  }

  attack(): number {
    return 0;
  }
}
