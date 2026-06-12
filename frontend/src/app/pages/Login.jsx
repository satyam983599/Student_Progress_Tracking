import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(data.admin)
      );

      navigate("/");
    } catch (error) {
      setError("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-violet-600 to-blue-600">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-3 rounded-xl"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have account?{" "}
          <Link
            to="/register"
            className="text-violet-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;