"use client";

import MarkdownRenderer from "@/components/widgets/MarkdownRenderer";

type Props = {};

const ContentBoard = (props: Props) => {
  return <MarkdownRenderer markdown={markdown} />;
};

const markdown = `
# Factory Method Pattern

The Factory Method pattern is a creational design pattern that provides an interface for creating objects but lets subclasses decide which class to instantiate.

## Problem

In our game, we need to calculate total attack and defense stats for a user's inventory. Currently, we have to manually create different item types:

\`\`\`mermaid
flowchart TD
    A[rawItem] --> B{type?}
    B -->|chest-plate| C[new ChestPlate]
    B -->|sword| D[new Sword]
    C --> E[item]
    D --> E
\`\`\`

This approach has several issues:
- Violates Open/Closed Principle
- Code duplication
- Tight coupling between item creation and usage

## Solution

The Factory Method pattern suggests creating a factory class that will handle object creation:

\`\`\`mermaid
classDiagram
    class ItemFactory {
        <<abstract>>
        +createItem() Item
    }
    class GameItemFactory {
        +createItem() Item
    }
    class Item {
        <<abstract>>
        +attack() number
        +defense() number
    }
    class Sword {
        +attack() number
        +defense() number
    }
    class ChestPlate {
        +attack() number
        +defense() number
    }
    
    ItemFactory <|-- GameItemFactory
    Item <|-- Sword
    Item <|-- ChestPlate
    GameItemFactory ..> Item
\`\`\`

This pattern allows us to:
- Encapsulate object creation
- Make the code more maintainable
- Follow the Open/Closed Principle
- Reduce code duplication
`;

export default ContentBoard;
