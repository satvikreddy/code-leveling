"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Trash2 } from "lucide-react";

const defaultCode = `// Welcome to the TypeScript Playground!
// Write your TypeScript code here and click "Run" to see the output

console.log("Hello, TypeScript!");

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));

// Try some TypeScript features
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "Alice",
  age: 30
};

console.log("Person:", person);

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);`;

export default function IDE() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const executeCode = async () => {
    setIsRunning(true);
    setOutput([]);

    try {
      // Create a sandbox to capture console output
      const logs: string[] = [];
      const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
      };

      // Override console methods to capture output
      const mockConsole = {
        log: (...args: any[]) => {
          logs.push(
            `[LOG] ${args
              .map((arg) =>
                typeof arg === "object"
                  ? JSON.stringify(arg, null, 2)
                  : String(arg)
              )
              .join(" ")}`
          );
        },
        error: (...args: any[]) => {
          logs.push(`[ERROR] ${args.map((arg) => String(arg)).join(" ")}`);
        },
        warn: (...args: any[]) => {
          logs.push(`[WARN] ${args.map((arg) => String(arg)).join(" ")}`);
        },
        info: (...args: any[]) => {
          logs.push(`[INFO] ${args.map((arg) => String(arg)).join(" ")}`);
        },
      };

      // Replace console temporarily
      Object.assign(console, mockConsole);

      try {
        // Use TypeScript compiler API for proper transpilation
        const ts = await import("typescript");

        const result = ts.transpile(code, {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.CommonJS,
          strict: false,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: false,
        });

        // Execute the JavaScript code
        const executeFunction = new Function(result);
        executeFunction();

        if (logs.length === 0) {
          logs.push("[INFO] Code executed successfully (no output)");
        }
      } catch (error) {
        logs.push(
          `[ERROR] ${error instanceof Error ? error.message : String(error)}`
        );
      } finally {
        // Restore original console
        Object.assign(console, originalConsole);
      }

      setOutput(logs);
    } catch (error) {
      setOutput([
        `[ERROR] Failed to execute code: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  return (
    <div className="h-screen w-full bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={60} minSize={30}>
          <Card className="h-full flex flex-col rounded-none py-0 pt-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">TypeScript Editor</CardTitle>
                <div className="flex gap-2">
                  <Button
                    onClick={executeCode}
                    disabled={isRunning}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {isRunning ? "Running..." : "Run"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Editor
                height="100%"
                defaultLanguage="typescript"
                value={code}
                onChange={(value) => setCode(value || "")}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  folding: true,
                  autoIndent: "full",
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={40} minSize={25}>
          <Card className="h-full flex flex-col rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Output</CardTitle>
                <Button
                  onClick={clearOutput}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-4">
                {output.length === 0 ? (
                  <div className="text-muted-foreground text-sm">
                    Click "Run" to execute your TypeScript code and see the
                    output here.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {output.map((line, index) => (
                      <div
                        key={index}
                        className={`font-mono text-sm p-2 rounded ${
                          line.startsWith("[ERROR]")
                            ? "bg-destructive/10 text-destructive"
                            : line.startsWith("[WARN]")
                            ? "bg-yellow-500/10 text-yellow-600"
                            : line.startsWith("[INFO]")
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-muted"
                        }`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
