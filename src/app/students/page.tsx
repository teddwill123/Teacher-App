import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentsPage() {
  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      gradeLevel: "8",
      assignmentScores: 85,
      quizScores: 90,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      gradeLevel: "7",
      assignmentScores: 78,
      quizScores: 82,
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      gradeLevel: "8",
      assignmentScores: 92,
      quizScores: 88,
    },
  ];

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
              <Input id="studentName" />
            </div>
            <div>
              <Label htmlFor="studentEmail">Email</Label>
              <Input id="studentEmail" type="email" />
            </div>
            <div>
              <Label htmlFor="studentGradeLevel">Grade Level</Label>
              <Input id="studentGradeLevel" />
            </div>
            <div>
              <Label htmlFor="parentContact">Parent Contact</Label>
              <Input id="parentContact" />
            </div>
            <Button type="button">Add Student</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search students..." className="mb-4" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Assignment Scores</TableHead>
                <TableHead>Quiz Scores</TableHead>
                <TableHead>Total Score</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const totalScore =
                  (student.assignmentScores + student.quizScores) / 2;
                const grade =
                  totalScore >= 90
                    ? "A"
                    : totalScore >= 80
                    ? "B"
                    : totalScore >= 70
                    ? "C"
                    : totalScore >= 60
                    ? "D"
                    : "F";
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.assignmentScores}</TableCell>
                    <TableCell>{student.quizScores}</TableCell>
                    <TableCell>{totalScore.toFixed(2)}</TableCell>
                    <TableCell>{grade}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
