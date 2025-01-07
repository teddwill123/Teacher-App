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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClassesPage() {
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
                <Input id="className" />
              </div>
              <div>
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Input id="gradeLevel" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" />
              </div>
              <Button type="button">Add Class</Button>
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
                <SelectItem value="class1">Math - Grade 8</SelectItem>
                <SelectItem value="class2">Science - Grade 7</SelectItem>
                <SelectItem value="class3">English - Grade 6</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
