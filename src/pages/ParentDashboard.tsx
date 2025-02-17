
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ParentDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole || userRole !== 'parent') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Parent Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ViewOnlyCard
          title="Student Progress"
          description="View your child's academic progress"
        />
        <ViewOnlyCard
          title="Attendance Record"
          description="View attendance history"
        />
        <ViewOnlyCard
          title="Upcoming Events"
          description="View school calendar and events"
        />
        <ViewOnlyCard
          title="Communications"
          description="View messages and announcements"
        />
      </div>
    </div>
  );
};

const ViewOnlyCard = ({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-blue-600 mt-4">View Details →</p>
    </div>
  );
};

export default ParentDashboard;
