import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import Logo from "../components/common/Logo";
import CustomInput from "../components/common/CustomInput";
import CustomButton from "../components/common/CustomButton";
import AuthLayout from "../layouts/AuthLayout";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const user = await loginUser(email, password);

        console.log("Logged in user:", user);

        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");

    } catch (error) {
        console.error("Login failed:", error);

        alert(
            error.response?.data?.message ||

            error.response?.data ||
            "Invalid email or password"
        );
    }
};  return (
    <AuthLayout>
      <Logo />

      <CustomInput
  label="Email"
  type="email"
  placeholder="Enter your email"
  icon={<FaEnvelope />}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

      <CustomInput
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        icon={<FaLock />}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <div className="flex justify-between items-center mb-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember Me
        </label>

        <a href="#" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>

      <CustomButton
  text="Login"
  onClick={handleLogin}
/>

      <p className="text-center mt-6">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;