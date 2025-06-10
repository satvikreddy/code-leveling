import CoursePage from "@/components/widgets/CoursePage";

export default function LearnPage() {
  const courseData = {
    title: "Design Patterns using Typescript",
    description:
      "Learn 16 patterns like factory, builder, prototype, singleton using practical typescript examples.",
    courseIndex: [
      "✓ Factory Pattern - Master object creation",
      "✓ Builder Pattern - Construct complex objects step by step",
      "✓ Singleton Pattern - Ensure single instance control",
      "✓ Observer Pattern - React to state changes",
      "... and more",
    ],
  };

  return <CoursePage course={courseData} />;
}
