import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || { general: data.message });
      } else {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-top">
        <h1 className="auth-heading">Log In</h1>
        <p className="auth-subheading">Welcome back! Enter your details to continue.</p>
      </div>

      <div className="auth-card">
        {errors.general && <div className="auth-error-box">{errors.general}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" placeholder="Enter your email"
              value={form.email} onChange={handleChange} required
              className={`form-input ${errors.email ? "input-error" : ""}`} />
            {errors.email && <span className="error-msg">{errors.email[0]}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" placeholder="Enter your password"
              value={form.password} onChange={handleChange} required
              className={`form-input ${errors.password ? "input-error" : ""}`} />
            {errors.password && <span className="error-msg">{errors.password[0]}</span>}
          </div>

          <button type="submit" disabled={loading} className={`auth-btn ${loading ? "btn-loading" : ""}`}>
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <a href="/signup" className="auth-link">Sign Up</a>
        </p>
      </div>

      <div className="auth-bottom-image" />
    </div>
  );
}