import { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";



const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("https://project-backend-dusky-two.vercel.app/auth/signup", form);
      toast.success("Signup successful! Please login.");
      // navigate("/login");
      navigate("/login", { replace: true });

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) navigate("/", { replace: true });
}, [navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg w-96 text-white shadow-lg">
        <h2 className="text-2xl text-blue-500 text-center mb-6">
          Signup
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 bg-black border border-gray-700 rounded"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 bg-black border border-gray-700 rounded"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 bg-black border border-gray-700 rounded"
          />

          {/* Role */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 mb-4 bg-black border border-gray-700 rounded"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
          >
            Signup
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
