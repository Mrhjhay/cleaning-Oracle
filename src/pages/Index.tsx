import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Bell, 
  Menu,
  X,
  Search,
  Edit,
  Save,
  Trash,
  Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_PASSWORD = "admin123"; // In a real app, this should be hashed and stored securely

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudent, setEditingStudent] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    grade: '',
    attendance: '',
    courses: [] as string[]
  });

  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", grade: "10th", attendance: "95%", courses: ["Math", "Science", "English"] },
    { id: 2, name: "Jane Smith", grade: "11th", attendance: "98%", courses: ["History", "Physics", "Literature"] },
    { id: 3, name: "Mike Johnson", grade: "10th", attendance: "92%", courses: ["Chemistry", "Biology", "French"] },
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Parent-Teacher Meeting", date: "2024-03-20", content: "Annual parent-teacher meeting scheduled next week." },
    { id: 2, title: "Sports Day", date: "2024-03-25", content: "Annual sports day celebration next month." },
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    const savedAnnouncements = localStorage.getItem('announcements');
    
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPasswordInput('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleEditClick = (student: any) => {
    if (!isAdmin) {
      setShowPasswordModal(true);
      return;
    }
    setEditingStudent(student.id);
    setEditFormData({
      name: student.name,
      grade: student.grade,
      attendance: student.attendance,
      courses: [...student.courses]
    });
  };

  const handleSaveClick = (id: number) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, ...editFormData }
        : student
    ));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: number) => {
    if (!isAdmin) {
      setShowPasswordModal(true);
      return;
    }
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleAddStudent = () => {
    if (!isAdmin) {
      setShowPasswordModal(true);
      return;
    }
    const newStudent = {
      id: students.length + 1,
      name: "New Student",
      grade: "10th",
      attendance: "100%",
      courses: [""]
    };
    setStudents([...students, newStudent]);
    handleEditClick(newStudent);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Admin Login Required</h2>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleLogin}>
                Login
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Status Bar */}
      <div className="bg-blue-100 p-2 text-center">
        {isAdmin ? (
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-green-600">Admin Mode Active</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Viewing Mode</span>
            <Button variant="outline" size="sm" onClick={() => setShowPasswordModal(true)}>
              Login as Admin
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">School Manager</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-2 p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
            <Users className="w-5 h-5" />
            Students
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-2 p-2 rounded-lg ${activeTab === 'courses' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
            <BookOpen className="w-5 h-5" />
            Courses
          </button>
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`w-full flex items-center gap-2 p-2 rounded-lg ${activeTab === 'attendance' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
            <Calendar className="w-5 h-5" />
            Attendance
          </button>
          <button 
            onClick={() => setActiveTab('announcements')}
            className={`w-full flex items-center gap-2 p-2 rounded-lg ${activeTab === 'announcements' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
            <Bell className="w-5 h-5" />
            Announcements
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1 max-w-xl ml-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </header>

        {/* Content based on active tab */}
        <main className="bg-white rounded-lg shadow p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Student Directory</h2>
                <Button 
                  onClick={handleAddStudent} 
                  className="bg-green-500 hover:bg-green-600"
                  disabled={!isAdmin}
                >
                  Add New Student
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Courses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingStudent === student.id ? (
                            <Input
                              value={editFormData.name}
                              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            />
                          ) : (
                            student.name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingStudent === student.id ? (
                            <Input
                              value={editFormData.grade}
                              onChange={(e) => setEditFormData({ ...editFormData, grade: e.target.value })}
                            />
                          ) : (
                            student.grade
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingStudent === student.id ? (
                            <Input
                              value={editFormData.attendance}
                              onChange={(e) => setEditFormData({ ...editFormData, attendance: e.target.value })}
                            />
                          ) : (
                            student.attendance
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingStudent === student.id ? (
                            <Input
                              value={editFormData.courses.join(", ")}
                              onChange={(e) => setEditFormData({ ...editFormData, courses: e.target.value.split(", ") })}
                              placeholder="Courses (comma-separated)"
                            />
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {student.courses.map((course, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {course}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingStudent === student.id ? (
                            <Button onClick={() => handleSaveClick(student.id)} variant="outline" size="sm">
                              <Save className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => handleEditClick(student)} 
                                variant="outline" 
                                size="sm"
                                disabled={!isAdmin}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                onClick={() => handleDeleteStudent(student.id)} 
                                variant="destructive"
                                size="sm"
                                disabled={!isAdmin}
                              >
                                <Trash className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg">{announcement.title}</h3>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-gray-600">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry'].map((course, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{course}</h3>
                    <p className="text-gray-600 text-sm">Click to view course details and enrolled students</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-green-600 text-xl font-semibold">95%</div>
                  <div className="text-sm text-gray-600">Average Attendance</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 text-xl font-semibold">150</div>
                  <div className="text-sm text-gray-600">Present Today</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-red-600 text-xl font-semibold">5</div>
                  <div className="text-sm text-gray-600">Absent Today</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
