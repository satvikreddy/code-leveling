import fs from "fs";
import path from "path";

export function lessonGetStaticFileData(args: {
  courseId: string;
  lessonId: string;
}) {
  const contentDir = path.join(
    process.cwd(),
    `app/learn/${args.courseId}/${args.lessonId}/content`
  );

  const files = fs.readdirSync(contentDir);
  const fileData: FileData[] = [
    {
      name: "main.ts",
      language: "typescript",
      content: `// Read the content on the right side and click links as you go`,
    },
  ];
  let markdown = "";

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const content = fs.readFileSync(filePath, "utf-8");
      const language = getLanguageFromExtension(file);
      if (language === "typescript") {
        fileData.push({
          name: file,
          content: content,
          language: language,
        });
      } else if (language === "markdown") {
        markdown = content;
      }
    }
  }

  return {
    hideFileExplorer: true,
    initialFiles: fileData,
    markdown,
  };
}

function getLanguageFromExtension(
  filename: string
): "typescript" | "markdown" | null {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".ts":
    case ".tsx":
      return "typescript";
    case ".md":
    case ".mdx":
      return "markdown";
    default:
      return null;
  }
}
