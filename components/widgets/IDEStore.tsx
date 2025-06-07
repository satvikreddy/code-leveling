import { OnChange, OnMount } from "@monaco-editor/react";
import { create } from "zustand";
import * as monaco from "monaco-editor";

interface IDEStore {
  files: FileData[];
  activeFileName: string;
  editor: monaco.editor.IStandaloneCodeEditor;
  monaco: typeof monaco;
  editorMounted: boolean;

  init: (args: { files: FileData[]; activeFileName: string }) => void;
  handleActiveFileChange: (fileName: string) => void;
  getModelForFile: (fileName: string) => monaco.editor.ITextModel | null;
  handleEditorOnMount: OnMount;
  handleEditorOnChange: OnChange;
}

const useIDEStore = create<IDEStore>((set, get) => ({
  activeFileName: "",
  files: [],
  editor: null as any,
  monaco: null as any,
  editorMounted: false,

  init: (args) => {
    set({ files: args.files, activeFileName: args.activeFileName });
  },
  getModelForFile: (fileName) => {
    const { monaco } = get();
    return monaco.editor.getModel(monaco.Uri.parse(`file:///${fileName}`));
  },
  handleEditorOnMount: (editor, monaco) => {
    set({ editorMounted: true, editor, monaco });
    const { files } = get();

    setupTypeScriptEnvironment({ editor, monaco, files });

    const { activeFileName, handleActiveFileChange } = get();
    handleActiveFileChange(activeFileName);
  },
  handleActiveFileChange: (fileName) => {
    set({ activeFileName: fileName });

    const { editor, monaco, getModelForFile } = get();
    const model = getModelForFile(fileName);
    if (model) editor.setModel(model);
  },
  handleEditorOnChange: (value, event) => {
    // do nothing
  },
}));

function setupTypeScriptEnvironment(args: {
  editor: monaco.editor.IStandaloneCodeEditor;
  monaco: typeof monaco;
  files: FileData[];
}) {
  const { editor, monaco, files } = args;

  // Configure TypeScript compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });

  // Add all files to editor
  for (const file of files) {
    monaco.editor.createModel(
      file.content,
      file.language,
      monaco.Uri.parse(`file:///${file.name}`)
    );
  }
}

export default useIDEStore;
