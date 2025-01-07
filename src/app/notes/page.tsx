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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { FileDown, FileText, Image } from "lucide-react";

export default function NotesPage() {
  const mockNote = {
    introduction:
      "In this lesson, we will explore the fascinating world of photosynthesis, a crucial process that sustains life on Earth.",
    mainPoints: [
      "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce oxygen and energy in the form of sugar.",
      "The process takes place in the chloroplasts, specifically using the green pigment chlorophyll.",
      "The overall reaction can be summarized as: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2",
      "Factors affecting photosynthesis include light intensity, carbon dioxide concentration, and temperature.",
    ],
    conclusion:
      "Understanding photosynthesis is crucial as it forms the basis of most food chains and is responsible for maintaining the balance of oxygen in our atmosphere.",
    visualAid: "/placeholder.svg?height=300&width=400",
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
            <Label htmlFor="topics">Topics or Themes</Label>
            <Input
              id="topics"
              placeholder="e.g., Photosynthesis, World War II"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade-level">Grade Level</Label>
            <Select>
              <SelectTrigger id="grade-level">
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Depth of Content</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="include-visuals" />
            <Label htmlFor="include-visuals">Include Visual Aids</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Generate Notes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Introduction:</h3>
            <p>{mockNote.introduction}</p>
          </div>
          <div>
            <h3 className="font-semibold">Main Points:</h3>
            <ul className="list-disc pl-5">
              {mockNote.mainPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Conclusion:</h3>
            <p>{mockNote.conclusion}</p>
          </div>
          {mockNote.visualAid && (
            <div>
              <h3 className="font-semibold">Visual Aid:</h3>
              <img
                src={mockNote.visualAid}
                alt="Visual aid for the topic"
                className="mt-2 rounded-md"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export as PDF
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export as Word
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
