# React TypeScript Browser IDE

A browser-based interactive React + TypeScript learning environment that runs entirely in the browser - no server required! Build, edit, and preview React components with full TypeScript support.

## 🚀 Features

✅ **React + TypeScript Editor**
- Monaco Editor with full React/TypeScript support
- JSX/TSX syntax highlighting and IntelliSense
- Real-time type checking for React components
- Auto-completion for React hooks and APIs

✅ **Live React Preview**
- Dual-pane interface: Code editor + Live preview
- Real-time React component rendering
- Console output for debugging
- Switch between Console and Preview tabs

✅ **Advanced File Management**
- Support for `.tsx`, `.ts`, `.jsx`, and `.js` files
- File icons to distinguish React files (⚛ for .tsx)
- Multi-tab interface with file type indicators
- Smart templates for new React components

✅ **React-Specific Features**
- Pre-configured React 18 + TypeScript environment
- Built-in React hooks (useState, useEffect, etc.)
- Component props typing and interfaces
- JSX transformation via Babel

## 🎯 Getting Started

### Quick Start
1. Open `index-react.html` in your browser
2. You'll see a working React Counter component
3. Click "⚛ Run React" to render components
4. Click "▶ Run TS" for regular TypeScript execution

### ✨ New: Improved Import Handling
The IDE now automatically handles React imports in the browser environment:
- `import React from 'react'` → Automatically available
- `import { useState, useEffect } from 'react'` → Converted to `const { useState, useEffect } = React`
- No more "Cannot find module 'react'" errors!

### Setup Options

**Option 1: Direct File Access**
```bash
# Simply open the file
open index-react.html
```

**Option 2: Local Development Server**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server .

# Using PHP
php -S localhost:8000
```

**Option 3: VS Code Live Server**
1. Install "Live Server" extension
2. Right-click `index-react.html` → "Open with Live Server"

## 🧩 How to Use

### Creating React Components

1. **New React Component File**
   - Click "New File" button
   - Name it with `.tsx` extension (e.g., `Button.tsx`)
   - Get an automatic React component template

2. **Writing Components**
   - Use full TypeScript typing for props
   - Access React hooks with IntelliSense
   - Get real-time error checking

3. **Running Components**
   - Click "⚛ Run React" for component preview
   - Click "▶ Run TS" for console-only execution
   - Switch between Console and Preview tabs

### Example React Components

#### 1. Basic Function Component
```typescript
import React from 'react';

interface GreetingProps {
  name: string;
  age?: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
};

// Render the component
const App = () => <Greeting name="React Developer" age={25} />;

export default App;
```

#### 2. Interactive Counter with Hooks
```typescript
import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Timer: {seconds}s</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => { setSeconds(0); setIsRunning(false); }}>
        Reset
      </button>
    </div>
  );
};

const App = () => <Timer />;
export default App;
```

#### 3. Todo List with State Management
```typescript
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>TypeScript Todo List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px' }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            padding: '10px', 
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1
              }}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ 
                background: '#ff4444', 
                color: 'white', 
                border: 'none', 
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => <TodoApp />;
export default App;
```

## ⚡ Keyboard Shortcuts

- `Ctrl + Enter`: Auto-run React components (.tsx files) or TypeScript (.ts files)
- `Ctrl + N`: Create new file
- `Enter`: Confirm dialogs
- `Escape`: Cancel dialogs

## 🔧 Technical Implementation

### What's Included
- **React 18**: Latest React with Hooks support
- **ReactDOM**: For rendering components
- **Babel Standalone**: JSX/TSX transformation
- **TypeScript Compiler**: Full TS compilation in browser
- **Monaco Editor**: VS Code editor with React IntelliSense

### React-Specific Configuration
- JSX compilation via Babel presets
- TypeScript with React JSX support
- Auto-detection of React files (.tsx)
- Built-in React type definitions
- Component rendering with ReactDOM.createRoot

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript support required
- No installation or build tools needed

## 🎨 What You Can Build

### Learning Projects
- Interactive counters and timers
- Todo lists and task managers
- Simple games (tic-tac-toe, memory)
- Form validation components
- Data visualization with charts

### Advanced Concepts
- Custom hooks
- Context API usage
- Component composition
- Props drilling solutions
- State management patterns

## 🚧 Current Limitations

- **No npm packages**: Browser environment only
- **No file persistence**: Files stored in memory
- **No module imports**: Single-file components only
- **Basic error handling**: Limited debugging tools

## 🎯 Future Enhancements

- **npm package simulation**: Mock popular React libraries
- **Persistent storage**: Save projects to localStorage
- **Export functionality**: Download projects as ZIP
- **Multiple component imports**: File dependency system
- **Advanced debugging**: React DevTools integration
- **Templates library**: Pre-built component examples

## 🤝 Perfect For

- **Learning React + TypeScript**: Safe environment to experiment
- **Prototyping**: Quick component development
- **Teaching**: Classroom demonstrations
- **Code sharing**: Share working examples easily
- **Interview prep**: Practice React concepts

## 🎓 Learning Path

1. **Start with basics**: Function components and props
2. **Add interactivity**: useState and event handlers
3. **Lifecycle methods**: useEffect and cleanup
4. **Complex state**: Multiple state variables and objects
5. **Component composition**: Building larger applications
6. **TypeScript integration**: Proper typing throughout

Start with the included Counter example and build your way up to more complex React applications!

## 🔧 Troubleshooting

### Common Issues & Solutions

**Problem**: "Cannot find module 'react'" error
**Solution**: ✅ Fixed! The IDE now automatically handles React imports. Just use normal import syntax and it will work.

**Problem**: Babel compilation errors
**Solution**: ✅ Fixed! Added proper filename support and improved Babel configuration.

**Problem**: Component not rendering
**Solution**: Make sure you have either:
- An `App` variable: `const App = () => <YourComponent />;`
- A default export: `export default YourComponent;`
- The IDE will automatically detect and render your component

**Problem**: TypeScript errors in editor
**Solutions**:
- Use proper TypeScript syntax: `const [count, setCount] = useState<number>(0)`
- Import React properly: `import React, { useState } from 'react';`
- The editor provides real-time error checking to help you

**Problem**: Styles not working
**Solution**: Use inline styles or CSS-in-JS:
```typescript
<div style={{ color: 'blue', padding: '20px' }}>
  Styled content
</div>
```

## License

Open source - build amazing React applications! 🚀 