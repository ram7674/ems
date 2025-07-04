import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        alert(`Welcome ${data.role}: ${data.name}`);
        setErrorMsg("");

        if (data.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/employee-dashboard";
        }
      } else {
        setErrorMsg("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2>Login</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="**********"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;