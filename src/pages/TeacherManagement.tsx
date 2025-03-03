
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, Trash, ArrowLeft, UserPlus, Edit, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
}

interface TeacherRegister {
  teacherId: string;
  date: string;
  notes: string;
}

const TeacherManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Todo list state
  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const savedTodos = localStorage.getItem('teacherTodos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  // Teacher management state
  const [teachers, setTeachers] = useState<TeacherProfile[]>(() => {
    const savedTeachers = localStorage.getItem('teacherProfiles');
    return savedTeachers ? JSON.parse(savedTeachers) : [];
  });
  const [registers, setRegisters] = useState<TeacherRegister[]>(() => {
    const savedRegisters = localStorage.getItem('teacherRegisters');
    return savedRegisters ? JSON.parse(savedRegisters) : [];
  });
  
  // Form states
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isAddingRegister, setIsAddingRegister] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
  });
  const [newRegister, setNewRegister] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Calculate completion percentage
  useEffect(() => {
    localStorage.setItem('teacherTodos', JSON.stringify(todos));
    
    // Calculate completion percentage
    if (todos.length === 0) {
      setCompletionPercentage(0);
    } else {
      const completedTasks = todos.filter(todo => todo.completed).length;
      setCompletionPercentage(Math.round((completedTasks / todos.length) * 100));
    }
  }, [todos]);

  // Save teachers and registers to localStorage
  useEffect(() => {
    localStorage.setItem('teacherProfiles', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('teacherRegisters', JSON.stringify(registers));
  }, [registers]);

  // Todo functions
  const handleAddTask = () => {
    if (newTask.trim() === '') {
      toast({
        title: "Error",
        description: "Task cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      task: newTask,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setNewTask('');
    
    toast({
      title: "Success",
      description: "New task added",
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list",
    });
  };

  // Teacher management functions
  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.subject) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const teacher: TeacherProfile = {
      id: Date.now().toString(),
      ...newTeacher
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher({ name: '', email: '', subject: '', phone: '' });
    setIsAddingTeacher(false);
    
    toast({
      title: "Success",
      description: "New teacher profile added",
    });
  };

  const deleteTeacher = (id: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
    setRegisters(registers.filter(register => register.teacherId !== id));
    
    toast({
      title: "Teacher deleted",
      description: "The teacher profile has been removed",
    });
  };

  const handleAddRegister = () => {
    if (!selectedTeacher || !newRegister.date) {
      toast({
        title: "Error",
        description: "Please select a teacher and date",
        variant: "destructive",
      });
      return;
    }

    const register: TeacherRegister = {
      teacherId: selectedTeacher,
      ...newRegister
    };

    setRegisters([...registers, register]);
    setNewRegister({ date: new Date().toISOString().split('T')[0], notes: '' });
    setIsAddingRegister(false);
    
    toast({
      title: "Success",
      description: "New register entry added",
    });
  };

  const getTeacherRegisters = (teacherId: string) => {
    return registers.filter(register => register.teacherId === teacherId);
  };

  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : "Unknown Teacher";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
      </div>

      {/* Todo List Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Assignment Todo List</h2>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium">Task Completion</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {completionPercentage}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        
        <div className="flex mb-4">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new assignment task..."
            className="mr-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTask();
            }}
          />
          <Button onClick={handleAddTask} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Status</TableHead>
                <TableHead>Assignment Task</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    No tasks added yet. Add a task to get started.
                  </TableCell>
                </TableRow>
              ) : (
                todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>
                      <Button
                        variant={todo.completed ? "default" : "outline"}
                        size="icon"
                        className={`h-8 w-8 ${todo.completed ? "bg-green-500 hover:bg-green-600" : ""}`}
                        onClick={() => toggleTaskCompletion(todo.id)}
                      >
                        {todo.completed && <Check className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                    <TableCell className={`font-medium ${todo.completed ? "line-through text-gray-500" : ""}`}>
                      {todo.task}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteTask(todo.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Teacher Management Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Teacher Profiles</h2>
          <Button 
            onClick={() => setIsAddingTeacher(true)} 
            className="flex items-center gap-2"
            disabled={isAddingTeacher}
          >
            <UserPlus className="h-4 w-4" />
            Add New Teacher
          </Button>
        </div>

        {isAddingTeacher && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Add New Teacher</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                <Input
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                  placeholder="Full Name"
                  className="mb-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <Input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                  placeholder="Email Address"
                  className="mb-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                <Input
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                  placeholder="Teaching Subject"
                  className="mb-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                  placeholder="Phone Number"
                  className="mb-2"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddTeacher}>Save Teacher</Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingTeacher(false);
                  setNewTeacher({ name: '', email: '', subject: '', phone: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No teachers added yet. Add a teacher to get started.
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.phone || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedTeacher(teacher.id);
                            setIsAddingRegister(true);
                          }}
                          title="Add Register Entry"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteTeacher(teacher.id)}
                          title="Delete Teacher"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Teacher Registers Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Teacher Registers</h2>
        </div>

        {isAddingRegister && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-medium mb-4">
              Add Register Entry for {getTeacherName(selectedTeacher || "")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                <Input
                  type="date"
                  value={newRegister.date}
                  onChange={(e) => setNewRegister({...newRegister, date: e.target.value})}
                  className="mb-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <Input
                  value={newRegister.notes}
                  onChange={(e) => setNewRegister({...newRegister, notes: e.target.value})}
                  placeholder="Additional notes"
                  className="mb-2"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddRegister}>Save Register Entry</Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingRegister(false);
                  setNewRegister({ date: new Date().toISOString().split('T')[0], notes: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    No register entries added yet.
                  </TableCell>
                </TableRow>
              ) : (
                registers.map((register, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{getTeacherName(register.teacherId)}</TableCell>
                    <TableCell>{register.date}</TableCell>
                    <TableCell>{register.notes || "N/A"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;
