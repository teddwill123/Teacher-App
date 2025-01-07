import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Trophy } from "lucide-react";
import { PerformanceChart } from "@/components/performance-chart";

const data = [
  { name: "Jan", students: 65, grades: 70 },
  { name: "Feb", students: 85, grades: 80 },
  { name: "Mar", students: 95, grades: 85 },
  { name: "Apr", students: 75, grades: 90 },
  { name: "May", students: 85, grades: 95 },
  { name: "Jun", students: 95, grades: 85 },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: "Math Quiz",
    date: "17th April",
    class: "Grade 8",
    type: "Assessment",
  },
  {
    id: 2,
    title: "Science Project",
    date: "20th April",
    class: "Grade 7",
    type: "Project",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white">
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#7B3FF2]/10">
              <Users className="h-6 w-6 text-[#7B3FF2]" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-gray-500">Total Students</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#7B3FF2]/10">
              <BookOpen className="h-6 w-6 text-[#7B3FF2]" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-500">Active Classes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white sm:col-span-2 lg:col-span-1">
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#7B3FF2]/10">
              <Trophy className="h-6 w-6 text-[#7B3FF2]" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-gray-500">Average Grade</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Performance Chart */}
        <Card className="lg:col-span-5 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Class Performance</h3>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <PerformanceChart data={data} />
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-2 bg-[#7B3FF2] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Upcoming Deadlines</h3>
              <select className="text-sm bg-[#7B3FF2] text-white border-white/20 border rounded-md px-2 py-1">
                <option>This Week</option>
                <option>Next Week</option>
              </select>
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-4 rounded-lg bg-white/10">
                  <p className="font-semibold">{deadline.title}</p>
                  <div className="mt-2 text-sm text-white/80">
                    <p>Date: {deadline.date}</p>
                    <p>Class: {deadline.class}</p>
                    <p>Type: {deadline.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
