import IDE3 from "@/components/widgets/IDE3";

export default function IDEPage() {
  return <IDE3 initialFiles={initialFiles} />;
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
