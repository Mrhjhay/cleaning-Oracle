
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, Trash, ArrowLeft } from 'lucide-react';
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

const TeacherManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const savedTodos = localStorage.getItem('teacherTodos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);

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
    </div>
  );
};

export default TeacherManagement;
