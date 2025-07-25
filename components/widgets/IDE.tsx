"use client";

import { useEffect, useState } from "react";
import FileExplorer from "@/components/widgets/FileExplorer";
import useIDEStore from "@/components/widgets/IDEStore";
import FileEditor from "@/components/widgets/FileEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ContentBoard from "@/components/widgets/ContentBoard";

export type IDEProps = {
  initialFiles: FileData[];
  markdown: string;
  hideFileExplorer?: boolean;
};

function IDE(props: IDEProps) {
  const [isDesktop, setIsDesktop] = useState(true);

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

  useEffect(() => {
    // Check screen size only on mount
    setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
  }, []);

  const activeFile = files.find((file) => file.name === activeFileName);

  // Show mobile message for small screens
  if (!isDesktop) {
    return (
      <div className="flex h-screen items-center justify-center bg-card p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Use Desktop for Best Experience
          </h2>
          <p className="text-muted-foreground">
            This IDE works best on larger screens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-card select-none">
      {/* File Explorer */}
      {!props.hideFileExplorer && (
        <div className="w-56 bg-gray-800 border-r border-gray-700">
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
      )}

      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel defaultSize={50}>
            {/* Editor */}
            <FileEditor
              file={activeFile}
              onMount={handleEditorOnMount}
              onChange={handleEditorOnChange}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          {/* Content Board */}
          <ResizablePanel defaultSize={50} minSize={40} maxSize={60}>
            <div className="h-full w-full border-l border-gray-700 bg-background">
              <ContentBoard markdown={props.markdown} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default IDE;
