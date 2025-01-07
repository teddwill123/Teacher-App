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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileUp, Plus, Trash } from "lucide-react";

const mockQuiz = {
  questions: [
    {
      id: "1",
      type: "multiple-choice",
      text: "What is the primary function of photosynthesis?",
      options: [
        "To produce oxygen",
        "To convert light energy into chemical energy",
        "To absorb carbon dioxide",
        "To release water vapor",
      ],
      correctAnswer: "To convert light energy into chemical energy",
    },
    {
      id: "2",
      type: "true-false",
      text: "Photosynthesis only occurs in green plants.",
      correctAnswer: false,
    },
    {
      id: "3",
      type: "short-answer",
      text: "Name two factors that affect the rate of photosynthesis.",
      correctAnswer: "Light intensity and carbon dioxide concentration",
    },
    {
      id: "4",
      type: "fill-in-the-blank",
      text: "The green pigment responsible for absorbing light in photosynthesis is called _______.",
      correctAnswer: "chlorophyll",
    },
  ],
};

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quiz Generator</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generate Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Lesson Topic</Label>
            <Input id="topic" placeholder="e.g., Photosynthesis" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Materials (PDF, Word)</Label>
            <Input id="file-upload" type="file" accept=".pdf,.doc,.docx" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question-type">Question Type</Label>
            <Select>
              <SelectTrigger id="question-type">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
                <SelectItem value="short-answer">Short Answer</SelectItem>
                <SelectItem value="fill-in-the-blank">
                  Fill in the Blank
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Generate Quiz</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockQuiz.questions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Question {question.id}
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={question.text}
                  readOnly
                  placeholder="Enter question text"
                  className="mb-2"
                />
                {question.type === "multiple-choice" && (
                  <div className="space-y-2">
                    {question.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={option}
                          readOnly
                          placeholder={`Option ${index + 1}`}
                        />
                        <Checkbox
                          checked={question.correctAnswer === option}
                          disabled
                        />
                      </div>
                    ))}
                  </div>
                )}
                {question.type === "true-false" && (
                  <RadioGroup
                    value={question.correctAnswer.toString()}
                    disabled
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id={`${question.id}-true`} />
                      <Label htmlFor={`${question.id}-true`}>True</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="false"
                        id={`${question.id}-false`}
                      />
                      <Label htmlFor={`${question.id}-false`}>False</Label>
                    </div>
                  </RadioGroup>
                )}
                {(question.type === "short-answer" ||
                  question.type === "fill-in-the-blank") && (
                  <Input
                    value={question.correctAnswer as string}
                    readOnly
                    placeholder="Enter correct answer"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardFooter>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Custom Question
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
