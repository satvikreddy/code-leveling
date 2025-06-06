"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useIDE2Store, type FileData } from "./IDE2Store";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Trash2 } from "lucide-react";

function IDE2(props: { initialFiles: FileData[]; executableFile: string }) {
  const {
    files,
    activeFile,
    initializeFiles,
    handleFileSelect,
    handleEditorDidMount,
  } = useIDE2Store();

  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const activeFileData = files.find((f) => f.name === activeFile);

  useEffect(() => {
    // Initialize files when component mounts
    initializeFiles(props.initialFiles);
  }, [props.initialFiles, initializeFiles]);

  const executeCode = async () => {
    setIsRunning(true);
    setOutput([]);

    try {
      // Find the executable file
      const executableFileData = files.find(
        (f) => f.name === props.executableFile
      );
      if (!executableFileData) {
        setOutput([
          `[ERROR] Executable file '${props.executableFile}' not found`,
        ]);
        setIsRunning(false);
        return;
      }

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

        // Create a module system to handle imports
        const moduleCache: { [key: string]: any } = {};

        // Transpile all files
        const transpiledFiles: { [key: string]: string } = {};
        files.forEach((file) => {
          const result = ts.transpile(file.content, {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.CommonJS,
            strict: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: false,
          });
          transpiledFiles[file.name] = result;
        });

        // Create a simple require function for our module system
        const createRequire = (currentFile: string) => {
          return (modulePath: string) => {
            // Handle relative imports
            let resolvedPath = modulePath;
            if (modulePath.startsWith("./")) {
              resolvedPath = modulePath.substring(2);
            }

            // Add .ts extension if not present
            if (!resolvedPath.includes(".")) {
              resolvedPath += ".ts";
            }

            if (moduleCache[resolvedPath]) {
              return moduleCache[resolvedPath];
            }

            const moduleCode = transpiledFiles[resolvedPath];
            if (!moduleCode) {
              throw new Error(`Module '${modulePath}' not found`);
            }

            // Create module exports object
            const moduleExports = {};
            const module = { exports: moduleExports };

            // Execute the module code
            const moduleFunction = new Function(
              "require",
              "module",
              "exports",
              "console",
              moduleCode
            );

            moduleFunction(
              createRequire(resolvedPath),
              module,
              moduleExports,
              mockConsole
            );

            // Cache the module
            moduleCache[resolvedPath] = module.exports;
            return module.exports;
          };
        };

        // Execute the main file with proper module context
        const mainCode = transpiledFiles[props.executableFile];
        const mainExports = {};
        const mainModule = { exports: mainExports };

        const executeFunction = new Function(
          "require",
          "module",
          "exports",
          "console",
          mainCode
        );

        executeFunction(
          createRequire(props.executableFile),
          mainModule,
          mainExports,
          mockConsole
        );

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
    <div className="flex h-screen bg-gray-900">
      {/* File Explorer */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Files</h3>
        </div>
        <div className="p-2">
          {files.map((file) => (
            <div
              key={file.name}
              onClick={() => handleFileSelect(file.name)}
              className={`p-2 rounded cursor-pointer transition-colors ${
                activeFile === file.name
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">📄</span>
                <span>{file.name}</span>
                {file.name === props.executableFile && (
                  <span className="text-green-400 text-xs">▶</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700 mt-4">
          <div className="text-xs text-gray-400">
            <p className="mb-2">💡 Try this:</p>
            <ul className="space-y-1">
              <li>• Right-click on imports</li>
              <li>• Select "Go to Definition"</li>
              <li>• Or press F12</li>
              <li>• Or Ctrl+Click</li>
              <li>• Navigate between files</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex-1">
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
                  language={activeFileData?.language || "typescript"}
                  theme="vs-dark"
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    wordWrap: "on",
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    renderWhitespace: "selection",
                    contextmenu: true,
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: "on",
                    tabCompletion: "on",
                    parameterHints: { enabled: true },
                    hover: { enabled: true },
                    definitionLinkOpensInPeek: false,
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
                      Click "Run" to execute {props.executableFile} and see the
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
    </div>
  );
}

export default IDE2;
