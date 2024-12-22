'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { FileDown, FileText, Image } from 'lucide-react'

type Note = {
  introduction: string
  mainPoints: string[]
  conclusion: string
  visualAid?: string
}

export default function NotesPage() {
  const [topics, setTopics] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [depth, setDepth] = useState(50)
  const [tone, setTone] = useState('neutral')
  const [includeVisuals, setIncludeVisuals] = useState(false)
  const [generatedNote, setGeneratedNote] = useState<Note | null>(null)

  const generateNotes = () => {
    // Mock function to generate notes
    const mockNote: Note = {
      introduction: "In this lesson, we will explore the fascinating world of photosynthesis, a crucial process that sustains life on Earth.",
      mainPoints: [
        "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce oxygen and energy in the form of sugar.",
        "The process takes place in the chloroplasts, specifically using the green pigment chlorophyll.",
        "The overall reaction can be summarized as: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2",
        "Factors affecting photosynthesis include light intensity, carbon dioxide concentration, and temperature."
      ],
      conclusion: "Understanding photosynthesis is crucial as it forms the basis of most food chains and is responsible for maintaining the balance of oxygen in our atmosphere.",
      visualAid: includeVisuals ? "/placeholder.svg?height=300&width=400" : undefined
    }
    setGeneratedNote(mockNote)
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
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="e.g., Photosynthesis, World War II"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade-level">Grade Level</Label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
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
            <Slider
              min={0}
              max={100}
              step={1}
              value={[depth]}
              onValueChange={(value) => setDepth(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
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
            <Switch
              id="include-visuals"
              checked={includeVisuals}
              onCheckedChange={setIncludeVisuals}
            />
            <Label htmlFor="include-visuals">Include Visual Aids</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generateNotes}>Generate Notes</Button>
        </CardFooter>
      </Card>

      {generatedNote && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Introduction:</h3>
              <p>{generatedNote.introduction}</p>
            </div>
            <div>
              <h3 className="font-semibold">Main Points:</h3>
              <ul className="list-disc pl-5">
                {generatedNote.mainPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Conclusion:</h3>
              <p>{generatedNote.conclusion}</p>
            </div>
            {generatedNote.visualAid && (
              <div>
                <h3 className="font-semibold">Visual Aid:</h3>
                <img src={generatedNote.visualAid} alt="Visual aid for the topic" className="mt-2 rounded-md" />
              </div>
            )}
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

