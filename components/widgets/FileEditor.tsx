"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Editor, OnMount } from "@monaco-editor/react";
import React from "react";

type Props = {
  file: FileData;
  onMount: OnMount;
};

const FileEditor = ({ file, onMount }: Props) => {
  return (
    <Card className="h-full flex flex-col rounded-none py-0 pt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{file.name}</CardTitle>
          {file.isExecutable && (
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
          language={file.language}
          theme="vs-dark"
          onMount={onMount}
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
  );
};

export default FileEditor;
