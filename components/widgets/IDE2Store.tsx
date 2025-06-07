import { create } from "zustand";
import * as monaco from "monaco-editor";

interface IDE2Store {
  // State
  files: FileData[];
  activeFile: string;
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null> | null;
  monacoRef: React.MutableRefObject<typeof monaco | null> | null;

  // Actions
  initializeFiles: (initialFiles: FileData[]) => void;
  setActiveFile: (fileName: string) => void;
  setEditorRef: (
    ref: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
  ) => void;
  setMonacoRef: (ref: React.MutableRefObject<typeof monaco | null>) => void;
  setupTypeScriptEnvironment: () => void;
  setupDefinitionProvider: () => void;
  handleGoToDefinition: (position: monaco.Position | null) => Promise<void>;
  handleFileSelect: (fileName: string) => void;
  handleEditorDidMount: (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => void;
}

export const useIDE2Store = create<IDE2Store>((set, get) => ({
  // Initial state
  files: [],
  activeFile: "main.ts",
  editorRef: null,
  monacoRef: null,

  // Actions
  initializeFiles: (initialFiles: FileData[]) => {
    set({ files: initialFiles });
  },

  setActiveFile: (fileName: string) => {
    set({ activeFile: fileName });
  },

  setEditorRef: (
    ref: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
  ) => {
    set({ editorRef: ref });
  },

  setMonacoRef: (ref: React.MutableRefObject<typeof monaco | null>) => {
    set({ monacoRef: ref });
  },

  setupTypeScriptEnvironment: () => {
    const { monacoRef, files } = get();
    if (!monacoRef?.current) return;

    const monacoInstance = monacoRef.current;

    // Configure TypeScript compiler options
    monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monacoInstance.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution:
        monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monacoInstance.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monacoInstance.languages.typescript.JsxEmit.React,
      allowJs: true,
      typeRoots: ["node_modules/@types"],
    });

    // Add all files to Monaco's TypeScript service
    files.forEach((file) => {
      const uri = monacoInstance.Uri.parse(`file:///${file.name}`);

      // Check if model already exists
      let model = monacoInstance.editor.getModel(uri);
      if (model) {
        model.setValue(file.content);
      } else {
        model = monacoInstance.editor.createModel(
          file.content,
          file.language,
          uri
        );
      }
    });

    // Enable IntelliSense and cross-file navigation
    monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
      {
        noSemanticValidation: false,
        noSyntaxValidation: false,
      }
    );
  },

  setupDefinitionProvider: () => {
    const { monacoRef, editorRef } = get();
    if (!monacoRef?.current) return;

    const monacoInstance = monacoRef.current;

    // Register a definition provider that handles cross-file navigation
    monacoInstance.languages.registerDefinitionProvider("typescript", {
      provideDefinition: async (model, position) => {
        // Get the TypeScript worker
        const worker =
          await monacoInstance.languages.typescript.getTypeScriptWorker();
        const client = await worker(model.uri);

        // Get definition locations
        const definitions = await client.getDefinitionAtPosition(
          model.uri.toString(),
          model.getOffsetAt(position)
        );

        if (!definitions || definitions.length === 0) {
          return [];
        }

        return definitions.map((def) => {
          const uri = monacoInstance.Uri.parse(def.fileName);
          const startPos = model.getPositionAt(def.textSpan.start);
          const endPos = model.getPositionAt(
            def.textSpan.start + def.textSpan.length
          );

          return {
            uri,
            range: {
              startLineNumber: startPos.lineNumber,
              startColumn: startPos.column,
              endLineNumber: endPos.lineNumber,
              endColumn: endPos.column,
            },
          };
        });
      },
    });

    // Handle when user clicks on a definition in another file
    editorRef?.current?.onDidChangeModel(() => {
      if (editorRef.current) {
        editorRef.current.onMouseDown((e) => {
          if (e.event.ctrlKey || e.event.metaKey) {
            // Handle Ctrl+Click for go to definition
            get().handleGoToDefinition(e.target.position);
          }
        });
      }
    });
  },

  handleGoToDefinition: async (position: monaco.Position | null) => {
    const { monacoRef, editorRef, activeFile, files, setActiveFile } = get();
    if (!position || !monacoRef?.current || !editorRef?.current) return;

    const monacoInstance = monacoRef.current;
    const model = editorRef.current.getModel();
    if (!model) return;

    try {
      const worker =
        await monacoInstance.languages.typescript.getTypeScriptWorker();
      const client = await worker(model.uri);

      const definitions = await client.getDefinitionAtPosition(
        model.uri.toString(),
        model.getOffsetAt(position)
      );

      if (definitions && definitions.length > 0) {
        const def = definitions[0];
        const targetUri = monacoInstance.Uri.parse(def.fileName);
        const targetFileName = targetUri.path.substring(1); // Remove leading slash

        // Check if the definition is in a different file
        if (targetFileName !== activeFile) {
          // Switch to the target file
          const targetFile = files.find((f) => f.name === targetFileName);
          if (targetFile) {
            setActiveFile(targetFileName);

            // Wait for the file to be loaded, then navigate to the position
            setTimeout(() => {
              if (editorRef.current) {
                const targetModel = monacoInstance.editor.getModel(targetUri);
                if (targetModel) {
                  editorRef.current.setModel(targetModel);
                  const startPos = targetModel.getPositionAt(
                    def.textSpan.start
                  );
                  editorRef.current.setPosition(startPos);
                  editorRef.current.revealPositionInCenter(startPos);
                }
              }
            }, 100);
          }
        }
      }
    } catch (error) {
      console.error("Error in go to definition:", error);
    }
  },

  handleFileSelect: (fileName: string) => {
    const { monacoRef, editorRef, setActiveFile } = get();
    if (!monacoRef?.current || !editorRef?.current) return;

    setActiveFile(fileName);

    const uri = monacoRef.current.Uri.parse(`file:///${fileName}`);
    const model = monacoRef.current.editor.getModel(uri);

    if (model) {
      editorRef.current.setModel(model);
    }
  },

  handleEditorDidMount: (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => {
    const {
      activeFile,
      setupTypeScriptEnvironment,
      setupDefinitionProvider,
      handleGoToDefinition,
    } = get();

    // Set refs
    set({
      editorRef: { current: editor },
      monacoRef: { current: monacoInstance },
    });

    setupTypeScriptEnvironment();
    setupDefinitionProvider();

    // Set up the editor for the active file
    const uri = monacoInstance.Uri.parse(`file:///${activeFile}`);
    const model = monacoInstance.editor.getModel(uri);
    if (model) {
      editor.setModel(model);
    }

    // Add command for F12 (Go to Definition)
    editor.addCommand(monacoInstance.KeyCode.F12, () => {
      const position = editor.getPosition();
      if (position) {
        handleGoToDefinition(position);
      }
    });

    // Add command for Ctrl+Click
    editor.onMouseDown((e) => {
      if ((e.event.ctrlKey || e.event.metaKey) && e.target.position) {
        handleGoToDefinition(e.target.position);
      }
    });
  },
}));
