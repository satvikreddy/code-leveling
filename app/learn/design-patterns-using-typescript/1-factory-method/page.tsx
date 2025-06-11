import IDE, { IDEProps } from "@/components/widgets/IDE";
import fs from "fs";
import path from "path";

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

async function getStaticFileData(): Promise<IDEProps> {
  const contentDir = path.join(
    process.cwd(),
    "app/learn/design-patterns-using-typescript/1-factory-method/content"
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

export default async function Page() {
  const props = await getStaticFileData();

  return <IDE {...props} />;
}
