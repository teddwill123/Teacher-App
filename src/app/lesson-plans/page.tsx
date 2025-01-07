import { Card, CardContent } from "@/components/ui/card";
import { LessonEditor } from "@/components/lesson-editor";

const mockPlan = {
  title: "Introduction to Photosynthesis",
  subject: "Biology",
  grade: "Grade 8",
  duration: "45 minutes",
  objectives: [
    "Understand the basic process of photosynthesis",
    "Identify the key components needed for photosynthesis",
    "Explain the importance of photosynthesis in nature",
  ],
  content: "",
};

export default function LessonPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{mockPlan.title}</h1>
          <div className="text-gray-500 mt-1">
            {mockPlan.subject} • {mockPlan.grade} • {mockPlan.duration}
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Learning Objectives</h2>
              <ul className="list-disc pl-6 space-y-1">
                {mockPlan.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <LessonEditor initialContent={mockPlan.content} />
        </CardContent>
      </Card>
    </div>
  );
}
