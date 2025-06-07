"use client";

import { useEffect } from "react";
import FileExplorer from "@/components/widgets/FileExplorer";
import useIDEStore from "@/components/widgets/IDEStore";
import FileEditor from "@/components/widgets/FileEditor";

function IDE3(props: { initialFiles: FileData[] }) {
  const {
    files,
    activeFileName,
    editorMounted,
    init,
    handleActiveFileChange,
    handleEditorOnMount,
    handleEditorOnChange,
  } = useIDEStore();

  useEffect(() => {
    // Initialize files when component mounts
    init({
      files: props.initialFiles,
      activeFileName: "main.ts",
    });
  }, []);

  const activeFile = files.find((file) => file.name === activeFileName);

  return (
    <div className="flex h-screen bg-card select-none">
      {/* File Explorer */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <FileExplorer
          files={files}
          activeFileName={activeFileName}
          onFileSelect={(fileName) => {
            if (editorMounted) {
              handleActiveFileChange(fileName);
            }
          }}
        />
      </div>

      <div className="flex-1">
        {/* Editor */}
        <FileEditor
          file={activeFile}
          onMount={handleEditorOnMount}
          onChange={handleEditorOnChange}
        />
      </div>
    </div>
  );
}

export default IDE3;
