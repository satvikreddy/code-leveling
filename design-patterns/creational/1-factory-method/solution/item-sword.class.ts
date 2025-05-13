import { Item } from "./item.class";

export class Sword extends Item {
  defense(): number {
    return 0;
  }

  attack(): number {
    return 7;
  }
}
