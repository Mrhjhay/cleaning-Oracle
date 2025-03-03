
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

// Define the time slots for the timetable
const timeSlots = [
  "8:00 - 9:00",
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00"
];

// Define the days of the week
const daysOfWeek = [
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday"
];

// Define the grade levels
const gradeOptions = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12"
];

// Define available subjects
const subjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physical Education",
  "Art",
  "Music",
  "Computer Science",
  "Foreign Language",
  "Social Studies",
  "Break/Lunch"
];

// Define the timetable entry type
type TimetableEntry = {
  subject: string;
  teacher?: string;
  room?: string;
};

// Define the timetable structure
type Timetable = {
  [grade: string]: {
    [day: string]: {
      [timeSlot: string]: TimetableEntry | null;
    };
  };
};

const CourseManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for the selected grade to view/edit
  const [selectedGrade, setSelectedGrade] = useState(gradeOptions[0]);
  
  // State for the timetable data
  const [timetables, setTimetables] = useState<Timetable>(() => {
    // Initialize empty timetable for all grades
    const initialTimetables: Timetable = {};
    
    gradeOptions.forEach(grade => {
      initialTimetables[grade] = {};
      
      daysOfWeek.forEach(day => {
        initialTimetables[grade][day] = {};
        
        timeSlots.forEach(timeSlot => {
          initialTimetables[grade][day][timeSlot] = null;
        });
      });
    });
    
    return initialTimetables;
  });
  
  // State for the currently editing cell
  const [editingCell, setEditingCell] = useState<{
    day: string;
    timeSlot: string;
    subject: string;
    teacher: string;
    room: string;
  } | null>(null);
  
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  const handleCellClick = (day: string, timeSlot: string) => {
    const currentValue = timetables[selectedGrade][day][timeSlot];
    
    setEditingCell({
      day,
      timeSlot,
      subject: currentValue?.subject || "",
      teacher: currentValue?.teacher || "",
      room: currentValue?.room || ""
    });
  };
  
  const handleSaveCell = () => {
    if (!editingCell) return;
    
    const { day, timeSlot, subject, teacher, room } = editingCell;
    
    // Create a deep copy of the timetables object
    const updatedTimetables = JSON.parse(JSON.stringify(timetables));
    
    // Update the specific cell
    updatedTimetables[selectedGrade][day][timeSlot] = {
      subject,
      teacher,
      room
    };
    
    // Update the state
    setTimetables(updatedTimetables);
    setEditingCell(null);
    
    toast({
      title: "Timetable Updated",
      description: `${subject} has been scheduled for ${day} at ${timeSlot} in ${selectedGrade}.`,
      duration: 3000,
    });
  };
  
  const handleCancelEdit = () => {
    setEditingCell(null);
  };
  
  const handleClearCell = (day: string, timeSlot: string) => {
    const updatedTimetables = JSON.parse(JSON.stringify(timetables));
    updatedTimetables[selectedGrade][day][timeSlot] = null;
    setTimetables(updatedTimetables);
    
    toast({
      title: "Timetable Updated",
      description: `Schedule cleared for ${day} at ${timeSlot} in ${selectedGrade}.`,
      duration: 3000,
    });
  };
  
  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
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
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Academic Timetable</h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <label className="font-medium text-gray-700">Select Grade:</label>
          <div className="flex flex-wrap gap-2">
            {gradeOptions.map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                size="sm"
                onClick={() => handleGradeChange(grade)}
              >
                {grade}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Time Slot</TableHead>
                {daysOfWeek.map((day) => (
                  <TableHead key={day}>{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map((timeSlot) => (
                <TableRow key={timeSlot}>
                  <TableCell className="font-medium">{timeSlot}</TableCell>
                  {daysOfWeek.map((day) => {
                    const cellData = timetables[selectedGrade][day][timeSlot];
                    return (
                      <TableCell 
                        key={`${day}-${timeSlot}`} 
                        className="min-w-52 p-2 border cursor-pointer hover:bg-gray-50"
                        onClick={() => handleCellClick(day, timeSlot)}
                      >
                        {cellData ? (
                          <div className="p-2 rounded bg-blue-50 border border-blue-100">
                            <div className="font-semibold text-blue-800">{cellData.subject}</div>
                            {cellData.teacher && <div className="text-sm text-gray-600">Teacher: {cellData.teacher}</div>}
                            {cellData.room && <div className="text-sm text-gray-600">Room: {cellData.room}</div>}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-1 h-6 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClearCell(day, timeSlot);
                              }}
                            >
                              Clear
                            </Button>
                          </div>
                        ) : (
                          <div className="h-20 flex items-center justify-center text-gray-400">
                            Click to add
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {editingCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Edit Timetable: {editingCell.day} at {editingCell.timeSlot}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={editingCell.subject}
                  onChange={(e) => setEditingCell({...editingCell, subject: e.target.value})}
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <Input
                  value={editingCell.teacher}
                  onChange={(e) => setEditingCell({...editingCell, teacher: e.target.value})}
                  placeholder="Teacher name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room
                </label>
                <Input
                  value={editingCell.room}
                  onChange={(e) => setEditingCell({...editingCell, room: e.target.value})}
                  placeholder="Room number"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button 
                  disabled={!editingCell.subject} 
                  onClick={handleSaveCell}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
