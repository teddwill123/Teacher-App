'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Student = {
  id: number
  name: string
  email: string
  gradeLevel: string
  parentContact: string
  assignmentScores: number
  quizScores: number
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    gradeLevel: '',
    parentContact: '',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const addStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.gradeLevel && newStudent.parentContact) {
      setStudents([
        ...students,
        {
          id: Date.now(),
          ...newStudent,
          assignmentScores: Math.floor(Math.random() * 100),
          quizScores: Math.floor(Math.random() * 100),
        },
      ])
      setNewStudent({ name: '', email: '', gradeLevel: '', parentContact: '' })
    }
  }

  const deleteStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Students</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="studentName">Name</Label>
              <Input
                id="studentName"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="studentEmail">Email</Label>
              <Input
                id="studentEmail"
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="studentGradeLevel">Grade Level</Label>
              <Input
                id="studentGradeLevel"
                value={newStudent.gradeLevel}
                onChange={(e) => setNewStudent({ ...newStudent, gradeLevel: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="parentContact">Parent Contact</Label>
              <Input
                id="parentContact"
                value={newStudent.parentContact}
                onChange={(e) => setNewStudent({ ...newStudent, parentContact: e.target.value })}
              />
            </div>
            <Button type="button" onClick={addStudent}>Add Student</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Assignment Scores</TableHead>
                <TableHead>Quiz Scores</TableHead>
                <TableHead>Total Score</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const totalScore = (student.assignmentScores + student.quizScores) / 2
                const grade = totalScore >= 90 ? 'A' : totalScore >= 80 ? 'B' : totalScore >= 70 ? 'C' : totalScore >= 60 ? 'D' : 'F'
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.assignmentScores}</TableCell>
                    <TableCell>{student.quizScores}</TableCell>
                    <TableCell>{totalScore.toFixed(2)}</TableCell>
                    <TableCell>{grade}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => deleteStudent(student.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

