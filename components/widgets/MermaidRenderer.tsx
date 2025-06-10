"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

const MermaidRenderer = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
      });

      mermaid
        .render("mermaid-" + Math.random().toString(36).substr(2, 9), chart)
        .then((result) => {
          if (ref.current) {
            ref.current.innerHTML = result.svg;
          }
        });
    }
  }, [chart]);

  return <div ref={ref} className="mermaid-container" />;
};

export default MermaidRenderer;
