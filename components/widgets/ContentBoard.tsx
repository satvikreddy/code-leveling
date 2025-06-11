"use client";

import useIDEStore from "@/components/widgets/IDEStore";
import MarkdownRenderer from "@/components/widgets/MarkdownRenderer";

type Props = {
  markdown: string;
};

const ContentBoard = (props: Props) => {
  const { handleActiveFileChange } = useIDEStore();

  return (
    <MarkdownRenderer
      markdown={props.markdown}
      onOpenFile={(file) => handleActiveFileChange(file)}
    />
  );
};

export default ContentBoard;
