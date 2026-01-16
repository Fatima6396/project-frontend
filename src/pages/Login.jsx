

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  
const submitHandler = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const { data } = await API.post("https://project-backend-dusky-two.vercel.app/auth/login", {
      email,
      password,
    });

    console.log("Login response:", data); // check what backend sends

    // Save user in localStorage and AuthContext
    login(data.user || data); // if backend returns { user, token }

    // Redirect based on role
    const role = (data.user || data).role;
    if (role === "employee") navigate("/employee", { replace: true });
    else if (role === "manager") navigate("/manager", { replace: true });
    else if (role === "admin") navigate("/admin", { replace: true });
    else navigate("/"); // fallback
  } catch (err) {
    console.error(err.response || err);
    toast.error(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="bg-gray-900 p-8 rounded w-96"
      >
        <h2 className="text-2xl text-blue-500 mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full p-2 mb-4 bg-black border border-blue-600 rounded text-white"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-2 mb-4 bg-black border border-blue-600 rounded text-white"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/Signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;



