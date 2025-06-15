## Intro

Consider an rpg game where users complete tasks to win items that increase the attributes of their character.

- [item.dbData.ts](item.dbData.ts): represents data stored in item table of the database
- [item.class.ts](item.class.ts): exposes attributes of an individual item
- [calculateTotalAttributes.ts](calculateTotalAttributes.ts): loops over all user items to calculate total attributes

## Problem

There are 2 problems in calculateTotalAttributes.ts:

- code duplication: converting raw data to the right Item class
- responsibility: the implementation of converting data to Item is not responsibility of calculateTotalAttributes

When a new item type is added, it is very easy for dev to forget to add cases in all places.

## Solution

Let us expose a method from Item that contains the conversion logic. This can be used anytime we want to convert raw db data to Item class.

- [solved-item.class.ts](solved-item.class.ts): Implement conversion logic
- [solved-calculateTotalAttributes.ts](solved-calculateTotalAttributes.ts): use the new factory method Item.fromDbData

## Compare

[solved-calculateTotalAttributes.ts](solved-calculateTotalAttributes.ts) vs [old-calculateTotalAttributes.ts](calculateTotalAttributes.ts)

Solved one is so much cleaner. If we had 10 types of items, the solved one doesn't change but the old one would have each case handled.

We just used the "Factory Method" pattern.

🥱 Boring Defintion: Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

🌱 Lesson Complete!

[Next pattern: Builder →](/learn/design-patterns-using-typescript/2-builder)
