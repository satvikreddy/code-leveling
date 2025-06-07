import { OnMount } from "@monaco-editor/react";
import { create } from "zustand";

interface IDEStore {
  files: FileData[];
  activeFileName: string;

  init: (args: { files: FileData[]; activeFileName: string }) => void;
  setActiveFile: (fileName: string) => void;
  handleEditorOnMount: OnMount;
}

const useIDEStore = create<IDEStore>((set, get) => ({
  activeFileName: "",
  files: [],

  init: (args) => {
    set({ files: args.files, activeFileName: args.activeFileName });
  },
  setActiveFile: (fileName) => {
    set({ activeFileName: fileName });
  },
  handleEditorOnMount: (editor, monaco) => {},
}));

export default useIDEStore;
