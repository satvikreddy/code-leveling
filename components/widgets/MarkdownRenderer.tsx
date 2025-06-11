"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import React from "react";
import MermaidRenderer from "@/components/widgets/MermaidRenderer";

type Props = {
  markdown: string;
  onOpenFile?: (file: string) => void;
};

const MarkdownRenderer = (props: Props) => {
  return (
    <ScrollArea className="h-full">
      <div className="prose prose-slate dark:prose-invert max-w-none p-6 bg-card">
        <ReactMarkdown
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              // Check if it's a mermaid code block
              if (language === "mermaid") {
                return (
                  <MermaidRenderer
                    chart={String(children).replace(/\n$/, "")}
                  />
                );
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a({ href, children, ...linkProps }) {
              // Check if the link looks like a file path
              const isFilePath = href && href.match(/\.(tsx?|jsx?|md)$/i);

              if (isFilePath) {
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.onOpenFile?.(href);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit inline"
                  >
                    {children}
                  </button>
                );
              }

              return (
                <a href={href} {...linkProps}>
                  {children}
                </a>
              );
            },
          }}
        >
          {props.markdown}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default MarkdownRenderer;
