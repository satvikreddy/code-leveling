# TypeScript Browser IDE

A browser-based interactive TypeScript learning environment that runs entirely in the browser - no server required!

## Features

✅ **TypeScript Editor with IntelliSense**
- Monaco Editor (VS Code's editor) with full TypeScript support
- Real-time syntax highlighting and error detection
- Auto-completion and type checking
- Dark theme optimized for coding

✅ **File Management**
- Create, edit, and delete TypeScript files
- Multi-tab interface for working with multiple files
- File explorer sidebar

✅ **Code Execution**
- Compile and run TypeScript code directly in the browser
- Real-time output display
- Error reporting for both compilation and runtime errors

✅ **Keyboard Shortcuts**
- `Ctrl + Enter`: Run current file
- `Ctrl + N`: Create new file
- `Enter`: Confirm dialog actions
- `Escape`: Cancel dialog actions

## Getting Started

### Option 1: Simple File Opening
1. Open `index.html` directly in your web browser
2. Start coding TypeScript immediately!

### Option 2: Local Development Server (Recommended)
1. Install a simple HTTP server:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server .
   
   # Or using PHP (if installed)
   php -S localhost:8000
   ```

2. Open your browser and navigate to:
   - `http://localhost:8000` (for Python/Node.js)
   - The URL shown by your chosen server

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## How to Use

### Creating Your First File
1. Click the "New File" button in the header or sidebar
2. Enter a filename ending with `.ts` (e.g., `hello.ts`)
3. Start writing TypeScript code!

### Running Code
1. Write your TypeScript code in the editor
2. Click the "▶ Run" button or press `Ctrl + Enter`
3. View the output in the right panel

### Example TypeScript Code to Try

```typescript
// Basic TypeScript features
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}

const users: User[] = [
  { name: "Alice", age: 30, email: "alice@example.com" },
  { name: "Bob", age: 25 }
];

function greetUser(user: User): string {
  const greeting = `Hello, ${user.name}! You are ${user.age} years old.`;
  return user.email ? `${greeting} Email: ${user.email}` : greeting;
}

users.forEach(user => {
  console.log(greetUser(user));
});

// Generic functions
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("TypeScript"));
console.log(identity<number>(42));

// Classes
class Animal {
  constructor(public name: string) {}
  
  speak(): string {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak(): string {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Buddy");
console.log(dog.speak());
```

## Technical Details

### What's Under the Hood
- **Monaco Editor**: The same editor that powers VS Code
- **TypeScript Compiler**: Full TypeScript compiler running in browser
- **No Server Required**: Everything runs client-side using CDN resources

### Browser Compatibility
- Modern browsers with ES2020 support
- Chrome, Firefox, Safari, Edge (recent versions)

### Limitations
- No npm package imports (browser environment)
- No file system access (security limitation)
- Files are stored in memory only (not persistent)

## Next Steps

This is the foundation for a TypeScript learning platform. Planned enhancements include:
- React/JSX support
- Persistent file storage (localStorage)
- npm package simulation
- Interactive tutorials
- Code challenges and exercises
- Sharing and collaboration features

## Contributing

Feel free to enhance this project! Some ideas:
- Add more built-in TypeScript examples
- Improve the UI/UX
- Add syntax themes
- Implement file import/export
- Add code formatting tools

## License

Open source - feel free to use and modify! 