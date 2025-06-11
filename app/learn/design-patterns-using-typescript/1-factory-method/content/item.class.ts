abstract class Item {
  abstract defense(): number;
  abstract attack(): number;
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
