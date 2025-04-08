
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

const DashboardGrid = () => {
  const { isAuthenticated } = useAuth();
  
  const gridButtons = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Courses", path: "/courses" },
    { name: "Classroom", path: "/classroom" },
    { name: "Messages", path: "/messages" },
    { name: "Assignments", path: "/assignments" },
    { name: "Schedule", path: "/schedule" },
    { name: "Study Groups", path: "/study-groups" },
    { name: "Grades", path: "/grades" }
  ];
  
  if (!isAuthenticated) {
    return null; // Don't show grid for non-authenticated users
  }

  return (
    <section className="dashboard container mx-auto px-4 py-12">
      <h2 className="text-3xl font-playfair font-bold text-center mb-8">Welcome to EduConnect</h2>
      <div className="grid-buttons grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {gridButtons.map((button, index) => (
          <Link to={button.path} key={index}>
            <button className="w-full py-4 px-2 bg-deep-blue text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-deep-blue/90 hover:-translate-y-1">
              {button.name}
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DashboardGrid;
