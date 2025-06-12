import CoursePage from "@/components/widgets/CoursePage";
import { Metadata } from "next";

const TITLE = "Design Patterns using Typescript";
const DESCRIPTION =
  "Learn 16 patterns like factory, builder, prototype, singleton using practical typescript examples.";

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
      "✓ Factory Pattern - Master object creation",
      "✓ Builder Pattern - Construct complex objects step by step",
      "✓ Singleton Pattern - Ensure single instance control",
      "✓ Observer Pattern - React to state changes",
      "... and more",
    ],
    url: "/learn/design-patterns-using-typescript/1-factory-method",
  };

  return <CoursePage course={courseData} />;
}
