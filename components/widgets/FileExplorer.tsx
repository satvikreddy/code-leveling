"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypescriptIcon from "@/components/ui/typescript";

interface FileData {
  name: string;
  content: string;
  language: "typescript";
}

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  fullPath?: string;
}

function FileExplorer(props: {
  files: FileData[];
  activeFileName: string;
  onFileSelect: (fileName: string) => void;
}) {
  const { files, activeFileName, onFileSelect } = props;
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  // Build file tree from flat file list
  const buildFileTree = (files: FileData[]): FileNode[] => {
    const root: FileNode[] = [];
    const folderMap = new Map<string, FileNode>();

    files.forEach((file) => {
      const parts = file.name.split("/");
      let currentLevel = root;
      let currentPath = "";

      // Process each part of the path
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (i === parts.length - 1) {
          // This is a file
          currentLevel.push({
            name: part,
            type: "file",
            fullPath: file.name,
          });
        } else {
          // This is a folder
          let folder = currentLevel.find(
            (node) => node.name === part && node.type === "folder"
          );

          if (!folder) {
            folder = {
              name: part,
              type: "folder",
              children: [],
            };
            currentLevel.push(folder);
            folderMap.set(currentPath, folder);
            // Expand all folders by default
            setExpandedFolders((prev) => new Set([...prev, currentPath]));
          }

          currentLevel = folder.children!;
        }
      }
    });

    return root;
  };

  const fileTree = buildFileTree(files);

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const renderNode = (
    node: FileNode,
    depth: number = 0,
    parentPath: string = ""
  ): React.ReactNode => {
    const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(currentPath);
    const isActive = node.type === "file" && node.fullPath === activeFileName;

    if (node.type === "folder") {
      return (
        <div key={currentPath}>
          <div
            className="flex items-center gap-1 py-1 px-2 hover:bg-gray-700/50 cursor-pointer text-gray-300 text-sm"
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={() => toggleFolder(currentPath)}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span>{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map((child) =>
                renderNode(child, depth + 1, currentPath)
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.fullPath}
        className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-700/50 cursor-pointer text-sm ${
          isActive ? "bg-blue-600/30 text-white" : "text-gray-300"
        }`}
        style={{ paddingLeft: `${depth * 12 + 24}px` }}
        // onClick={() => onFileSelect(node.fullPath!)}
        onPointerDown={() => onFileSelect(node.fullPath!)}
      >
        {node.name.endsWith(".ts") || node.name.endsWith(".tsx") ? (
          <TypescriptIcon className="w-4 h-4" />
        ) : (
          <FileText className="w-4 h-4 text-gray-400" />
        )}
        <span>{node.name}</span>
      </div>
    );
  };

  return (
    <div className="bg-card border-r border-gray-700 h-full">
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
          Explorer
        </h3>
      </div>
      <ScrollArea className="h-full">
        <div className="py-2">{fileTree.map((node) => renderNode(node))}</div>
      </ScrollArea>
    </div>
  );
}

export default FileExplorer;
