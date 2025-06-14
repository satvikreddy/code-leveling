import IDE, { IDEProps } from "@/components/widgets/IDE";
import { lessonGetStaticFileData } from "@/utils/course.util";

async function getStaticFileData(): Promise<IDEProps> {
  return lessonGetStaticFileData({
    courseId: "design-patterns-using-typescript",
    lessonId: "4-singleton",
  });
}

export default async function Page() {
  const props = await getStaticFileData();

  return <IDE {...props} />;
}
