import CoursePage from "@/components/widgets/CoursePage";
import { Metadata } from "next";

const TITLE = "Design Patterns using Typescript";
const DESCRIPTION =
  "Learn 5 patterns like factory, builder, prototype, singleton using practical typescript examples.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.png" }],
  },
};

export default function LearnPage() {
  const courseData = {
    title: TITLE,
    description: DESCRIPTION,
    courseIndex: [
      "✓ Factory Pattern",
      "✓ Builder Pattern",
      "✓ Singleton Pattern",
      "✓ Adapter Pattern",
      "... and more",
    ],
    url: "/learn/design-patterns-using-typescript/1-factory-method",
  };

  return <CoursePage course={courseData} />;
}
