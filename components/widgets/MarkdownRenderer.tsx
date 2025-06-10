"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import React from "react";
import MermaidRenderer from "@/components/widgets/MermaidRenderer";

type Props = {
  markdown: string;
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
          }}
        >
          {props.markdown}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default MarkdownRenderer;
