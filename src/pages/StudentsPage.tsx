import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GradeEntry {
  subject: string;
  score: number;
  date: string;
}

interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
  contact: string;
  grades: GradeEntry[];
}

const StudentsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      grade: "10th",
      class: "A",
      contact: "parent@example.com",
      grades: [
        { subject: "Mathematics", score: 85, date: "2024-02-15" },
        { subject: "English", score: 92, date: "2024-02-15" }
      ]
    },
    {
      id: "2",
      name: "Jane Smith",
      grade: "9th",
      class: "B",
      contact: "parent2@example.com",
      grades: [
        { subject: "Mathematics", score: 88, date: "2024-02-15" },
        { subject: "English", score: 95, date: "2024-02-15" }
      ]
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGradeForm, setShowGradeForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'grades'>>({
    name: '',
    grade: '',
    class: '',
    contact: ''
  });
  const [newGrade, setNewGrade] = useState<GradeEntry>({
    subject: '',
    score: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (students.length + 1).toString();
    setStudents([...students, { ...newStudent, id, grades: [] }]);
    setNewStudent({ name: '', grade: '', class: '', contact: '' });
    setShowAddForm(false);
    toast({
      title: "Success",
      description: "Student added successfully",
    });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
    toast({
      title: "Success",
      description: "Student removed successfully",
    });
  };

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    setStudents(students.map(student => {
      if (student.id === selectedStudentId) {
        return {
          ...student,
          grades: [...student.grades, newGrade]
        };
      }
      return student;
    }));

    setNewGrade({
      subject: '',
      score: 0,
      date: new Date().toISOString().split('T')[0]
    });
    setShowGradeForm(false);
    setSelectedStudentId(null);
    toast({
      title: "Success",
      description: "Grade added successfully",
    });
  };

  const openGradeForm = (studentId: string) => {
    setSelectedStudentId(studentId);
    setShowGradeForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToDashboard}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
        </div>
        <Button onClick={() => setShowAddForm(true)}>Add New Student</Button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Grade</label>
              <Input
                value={newStudent.grade}
                onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <Input
                value={newStudent.class}
                onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent Contact</label>
              <Input
                type="email"
                value={newStudent.contact}
                onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit">Save Student</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {showGradeForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Grade</h2>
          <form onSubmit={handleAddGrade} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <Input
                value={newGrade.subject}
                onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Score</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={newGrade.score}
                onChange={(e) => setNewGrade({ ...newGrade, score: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <Input
                type="date"
                value={newGrade.date}
                onChange={(e) => setNewGrade({ ...newGrade, date: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit">Save Grade</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowGradeForm(false);
                  setSelectedStudentId(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Parent Contact</TableHead>
              <TableHead>Average Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.contact}</TableCell>
                <TableCell>
                  {student.grades.length > 0
                    ? (student.grades.reduce((acc, grade) => acc + grade.score, 0) / student.grades.length).toFixed(1)
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => openGradeForm(student.id)}
                    >
                      Add Grade
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {students.map((student) => (
        student.grades.length > 0 && (
          <div key={`grades-${student.id}`} className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">{student.name}'s Grades</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.grades.map((grade, index) => (
                  <TableRow key={`${student.id}-grade-${index}`}>
                    <TableCell>{grade.subject}</TableCell>
                    <TableCell>{grade.score}</TableCell>
                    <TableCell>{grade.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      ))}
    </div>
  );
};

export default StudentsPage;
