import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center px-6">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
          Expense Management System
        </h1>

        {/* Subheading */}
        <p className="text-gray-300 mb-10">
          Manage employee expenses easily and efficiently
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">

          <button
            onClick={() => navigate("/admin")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition duration-300"
          >
            Admin
          </button>
          <button
            onClick={() => navigate("/manager")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition duration-300"
          >
            Manager
          </button>
          <button
            onClick={() => navigate("/employee")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition duration-300"
          >
            Employee
          </button>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
