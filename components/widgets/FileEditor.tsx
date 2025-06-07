"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Editor, OnChange, OnMount } from "@monaco-editor/react";
import React from "react";

type Props = {
  file: FileData | undefined;
  onMount: OnMount;
  onChange: OnChange;
};

const FileEditor = ({ file, onMount, onChange }: Props) => {
  return (
    <Card className="h-full flex flex-col rounded-none p-0 gap-0">
      <CardHeader className="py-3 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md">{file?.name}</CardTitle>
          {file?.isExecutable && (
            <div className="flex gap-2">
              {/* <Button
                onClick={executeCode}
                disabled={isRunning}
                size="sm"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {isRunning ? "Running..." : "Run"}
              </Button> */}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <Editor
          height="100%"
          language={file?.language}
          theme="vs-dark"
          onMount={onMount}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
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
  );
};

export default FileEditor;
