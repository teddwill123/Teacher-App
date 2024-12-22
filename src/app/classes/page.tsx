'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Class = {
  id: number
  name: string
  gradeLevel: string
  subject: string
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [newClass, setNewClass] = useState({ name: '', gradeLevel: '', subject: '' })

  const addClass = () => {
    if (newClass.name && newClass.gradeLevel && newClass.subject) {
      setClasses([...classes, { id: Date.now(), ...newClass }])
      setNewClass({ name: '', gradeLevel: '', subject: '' })
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Classes</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Class</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Input
                  id="gradeLevel"
                  value={newClass.gradeLevel}
                  onChange={(e) => setNewClass({ ...newClass, gradeLevel: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                />
              </div>
              <Button type="button" onClick={addClass}>Add Class</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Class List</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id.toString()}>
                    {cls.name} - Grade {cls.gradeLevel} - {cls.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

