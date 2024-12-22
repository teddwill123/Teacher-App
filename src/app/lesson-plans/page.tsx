'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

type LessonPlan = {
  objectives: string[]
  activities: { name: string; duration: string }[]
  materials: string[]
  assessment: string
}

export default function LessonPlansPage() {
  const [gradeLevel, setGradeLevel] = useState('')
  const [subject, setSubject] = useState('')
  const [topics, setTopics] = useState('')
  const [generatedPlan, setGeneratedPlan] = useState<LessonPlan | null>(null)
  const [editedPlan, setEditedPlan] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const generateLessonPlan = () => {
    // Mock function to generate a lesson plan
    const mockPlan: LessonPlan = {
      objectives: [
        "Students will be able to explain the process of photosynthesis",
        "Students will be able to identify the key components needed for photosynthesis"
      ],
      activities: [
        { name: "Introduction to Photosynthesis", duration: "15 minutes" },
        { name: "Group Discussion: Plant Life Cycle", duration: "20 minutes" },
        { name: "Hands-on Experiment: Leaf Chlorophyll", duration: "30 minutes" }
      ],
      materials: [
        "Textbook",
        "Whiteboard and markers",
        "Plant leaves",
        "Microscopes"
      ],
      assessment: "Quiz on photosynthesis process and components"
    }
    setGeneratedPlan(mockPlan)
    setEditedPlan(JSON.stringify(mockPlan, null, 2))
  }

  const exportPDF = () => {
    // Mock function to export as PDF
    console.log("Exporting as PDF...")
  }

  const exportWord = () => {
    // Mock function to export as Word
    console.log("Exporting as Word...")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lesson Plan Generator</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Generate Lesson Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="grade-level">Grade Level</Label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger id="grade-level">
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i} value={`Grade ${i + 1}`}>
                    Grade {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="topics">Key Topics</Label>
            <Input
              id="topics"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="e.g., Photosynthesis, World War II"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generateLessonPlan}>Generate Lesson Plan</Button>
        </CardFooter>
      </Card>

      {generatedPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Lesson Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Objectives:</h3>
              <ul className="list-disc pl-5">
                {generatedPlan.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Activities:</h3>
              <ul className="list-disc pl-5">
                {generatedPlan.activities.map((activity, index) => (
                  <li key={index}>{activity.name} ({activity.duration})</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Materials:</h3>
              <ul className="list-disc pl-5">
                {generatedPlan.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Assessment:</h3>
              <p>{generatedPlan.assessment}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {generatedPlan && mounted && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Lesson Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactQuill theme="snow" value={editedPlan} onChange={setEditedPlan} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={exportPDF}>
              <FileDown className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
            <Button variant="outline" onClick={exportWord}>
              <FileText className="mr-2 h-4 w-4" />
              Export as Word
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

