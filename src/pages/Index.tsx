
import { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Bell, 
  Menu,
  X,
  Search
} from 'lucide-react';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const students = [
    { id: 1, name: "John Doe", grade: "10th", attendance: "95%", courses: ["Math", "Science", "English"] },
    { id: 2, name: "Jane Smith", grade: "11th", attendance: "98%", courses: ["History", "Physics", "Literature"] },
    { id: 3, name: "Mike Johnson", grade: "10th", attendance: "92%", courses: ["Chemistry", "Biology", "French"] },
  ];

  const announcements = [
    { id: 1, title: "Parent-Teacher Meeting", date: "2024-03-20", content: "Annual parent-teacher meeting scheduled next week." },
    { id: 2, title: "Sports Day", date: "2024-03-25", content: "Annual sports day celebration next month." },
  ];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
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
              <h2 className="text-xl font-semibold mb-4">Student Directory</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Courses</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.attendance}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {student.courses.map((course, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {course}
                              </span>
                            ))}
                          </div>
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
