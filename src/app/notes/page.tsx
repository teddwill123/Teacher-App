"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileDown } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface MainPoint {
  heading: string;
  content: string;
  examples: string[];
}

interface Note {
  title: string;
  introduction: string;
  mainPoints: MainPoint[];
  conclusion: string;
  visualAidPrompt: string;
}

export default function NotesPage() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [complexity, setComplexity] = useState("");
  const [generatedNote, setGeneratedNote] = useState<Note | null>(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          gradeLevel,
          complexity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate notes");
      }

      const data = await response.json();
      setGeneratedNote(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedNote) return;

    const content = `# ${generatedNote.title}

## Introduction
${generatedNote.introduction}

## Main Points
${generatedNote.mainPoints
  .map(
    (point) => `
### ${point.heading}
${point.content}

Examples:
${point.examples.map((example) => `- ${example}`).join("\n")}
`
  )
  .join("\n")}

## Conclusion
${generatedNote.conclusion}
`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generatedNote.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notes Generator</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generate Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topics">Topic</Label>
            <Input
              id="topics"
              placeholder="e.g., Photosynthesis, World War II"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grade Level</Label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger id="grade">
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elementary">Elementary School</SelectItem>
                <SelectItem value="middle">Middle School</SelectItem>
                <SelectItem value="high">High School</SelectItem>
                <SelectItem value="college">College</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complexity">Complexity Level</Label>
            <Select value={complexity} onValueChange={setComplexity}>
              <SelectTrigger id="complexity">
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleGenerate}
            disabled={loading || !topic || !gradeLevel || !complexity}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Notes"
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedNote && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {generatedNote.title}
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <FileDown className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Introduction</h3>
              <p className="text-muted-foreground">{generatedNote.introduction}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Main Points</h3>
              <div className="space-y-4">
                {generatedNote.mainPoints.map((point, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{point.heading}</h4>
                    <p className="text-muted-foreground">{point.content}</p>
                    {point.examples.length > 0 && (
                      <div>
                        <p className="font-medium text-sm">Examples:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {point.examples.map((example, i) => (
                            <li key={i}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Conclusion</h3>
              <p className="text-muted-foreground">{generatedNote.conclusion}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
