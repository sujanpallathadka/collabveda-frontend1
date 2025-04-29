import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://your-backend-domain.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Optionally store token in localStorage or cookie
      localStorage.setItem("authToken", data.token); // if backend returns token
      navigate("/home");

    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={handleLogin} className="p-6 bg-gray-900 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded bg-white text-black w-full mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded bg-white text-black w-full mb-2"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded mt-2">
          Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
