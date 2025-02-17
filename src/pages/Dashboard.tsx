
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole || userRole !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Administrative Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Student Management"
          description="Add, edit, and manage student records"
          link="/students"
        />
        <DashboardCard
          title="Course Management"
          description="Manage courses and class schedules"
          link="/courses"
        />
        <DashboardCard
          title="Teacher Management"
          description="Manage teacher profiles and assignments"
          link="/teachers"
        />
        <DashboardCard
          title="Administrative Tools"
          description="Access reports and administrative functions"
          link="/admin-tools"
        />
        <DashboardCard
          title="Calendar & Events"
          description="Manage school calendar and events"
          link="/calendar"
        />
        <DashboardCard
          title="Parent Communications"
          description="Manage parent access and communications"
          link="/communications"
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ 
  title, 
  description, 
  link 
}: { 
  title: string; 
  description: string; 
  link: string;
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(link)}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Dashboard;
