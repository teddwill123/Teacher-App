'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LessonEditor } from "@/components/lesson-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Download, FileText } from "lucide-react";
import { toast } from "sonner";

interface LessonPlan {
  title: string;
  subject: string;
  grade: string;
  duration: string;
  objectives: {
    text: string;
    standard: string;
  }[];
  activities: {
    type: string;
    description: string;
    duration: string;
  }[];
  content: string;
  materials?: string[];
  assessment?: {
    method: string;
    description: string;
  };
}

const subjects = [
  "Mathematics",
  "Science",
  "English Language Arts",
  "Social Studies",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
];

const standardSets = [
  "Common Core",
  "Next Generation Science Standards",
  "State Standards",
];

const defaultPlan: LessonPlan = {
  title: "",
  subject: "",
  grade: "",
  duration: "60 minutes",
  objectives: [],
  activities: [],
  content: "",
};

export default function LessonPlansPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(defaultPlan);
  const [topic, setTopic] = useState("");
  const [selectedStandard, setSelectedStandard] = useState(standardSets[0]);

  const handleGenerate = async () => {
    if (!topic || !lessonPlan.subject || !lessonPlan.grade) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/lesson-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: lessonPlan.subject,
          grade: lessonPlan.grade,
          topic,
          standard: selectedStandard,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to generate lesson plan');
      }

      const generatedPlan = await response.json();
      setLessonPlan(generatedPlan);
      toast.success("Lesson plan generated successfully!");
    } catch (error: any) {
      console.error('Error generating lesson plan:', error);
      toast.error(error.message || "Failed to generate lesson plan");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format: 'pdf' | 'docx') => {
    toast.info(`Exporting as ${format}... This feature is coming soon!`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Generate Lesson Plan</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={lessonPlan.subject}
                  onValueChange={(value) =>
                    setLessonPlan({ ...lessonPlan, subject: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level</Label>
                <Select
                  value={lessonPlan.grade}
                  onValueChange={(value) =>
                    setLessonPlan({ ...lessonPlan, grade: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={`Grade ${i + 1}`}>
                        Grade {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Key Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter main topic"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="standards">Educational Standards</Label>
                <Select
                  value={selectedStandard}
                  onValueChange={setSelectedStandard}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select standards" />
                  </SelectTrigger>
                  <SelectContent>
                    {standardSets.map((standard) => (
                      <SelectItem key={standard} value={standard}>
                        {standard}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !topic || !lessonPlan.subject || !lessonPlan.grade}
              className="w-full"
            >
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isGenerating ? "Generating..." : "Generate Lesson Plan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {lessonPlan.title && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{lessonPlan.title}</h1>
              <div className="text-gray-500 mt-1">
                {lessonPlan.subject} • {lessonPlan.grade} • {lessonPlan.duration}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('docx')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as Word
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
                  <ul className="space-y-3">
                    {lessonPlan.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <div>
                          <p>{objective.text}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Aligned to: {objective.standard}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {lessonPlan.materials && lessonPlan.materials.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Materials Needed</h2>
                    <ul className="list-disc pl-6 space-y-1">
                      {lessonPlan.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold mb-4">Activities Timeline</h2>
                  <div className="space-y-4">
                    {lessonPlan.activities.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {activity.duration}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold">{activity.type}</h3>
                          <p className="text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {lessonPlan.assessment && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Assessment</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">{lessonPlan.assessment.method}</h3>
                      <p className="text-gray-600">{lessonPlan.assessment.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <LessonEditor initialContent={lessonPlan.content} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
