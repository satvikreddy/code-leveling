## Intro

Conside we have an rpg game where users complete challenges to win items that increase their attributes.

- `item-db-data.ts`: represents data stored in a database item table
- `item.class.ts`: class for the item that exposes attack and defense values of the individual item
  - `item-chest-plate.class.ts`: specific implementation of item type 'chest-plate'
  - `item-sword.class.ts`: specific implementation of item type 'sword'
- `calculateTotalAttributes.ts`: loops over all user items to calculate total attack and defense

## Problem

There are 2 problems in [`calculateTotalAttributes.ts`](./problem/calculateTotalAttributes.ts):

- code duplication: converting raw data to the right Item class
- responsibility: the implemenation of converting data to Item is not responsibility of calulateTotalAttributes

## Solution

Let us expose a method from Item that contains the conversion logic. This can be used anytime we want to convert raw db data to Item class.

- [item.class.ts](./solution/item.class.ts): Implement conversion logic
- [calculateTotalAttributes.ts](./solution/calculateTotalAttributes.ts): simply call Item.fromDbData
