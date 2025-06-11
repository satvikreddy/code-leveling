import IDE from "@/components/widgets/IDE";

export default function IDEPage() {
  return <IDE initialFiles={initialFiles} markdown={markdown} />;
}

const initialFiles: FileData[] = [
  {
    name: "utils.ts",
    content: `export function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

export function add(a: number, b: number): number {
  return a + b;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
  
  divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
}`,
    language: "typescript",
  },
  {
    name: "main.ts",
    isExecutable: true,
    content: `import { greet, add, User, Calculator } from "./utils";

// Right-click on 'greet', 'add', 'User', or 'Calculator' and select "Go to Definition"
// to navigate to the utils.ts file

const message = greet("World");
console.log(message);

const sum = add(5, 3);
console.log(\`Sum: \${sum}\`);

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};

const calc = new Calculator();
const product = calc.multiply(4, 7);
const quotient = calc.divide(10, 2);

console.log(\`Product: \${product}, Quotient: \${quotient}\`);`,
    language: "typescript",
  },
];

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
