import { useState } from "react";

import { signupUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import Logo from "../components/common/Logo";
import CustomInput from "../components/common/CustomInput";
import CustomButton from "../components/common/CustomButton";
import AuthLayout from "../layouts/AuthLayout";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const result = await signupUser(
      fullName,
      email,
      password
    );

    console.log("Signup result:", result);

    alert("Signup Successful");

    navigate("/login");

  } catch (error) {
    console.error("Signup failed:", error);

    alert(
      error.response?.data?.message ||
      error.response?.data ||
      "Cannot signup"
    );
  }
};

  return (
    <AuthLayout>
      <Logo />

      <h2 className="text-2xl font-bold text-center mb-6">
        Create Account
      </h2>

      <CustomInput
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        icon={<FaUser />}
        value={fullName}
  onChange={(e) => setFullName(e.target.value)}
      />

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
        placeholder="Create a password"
        icon={<FaLock />}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
          value={password}
  onChange={(e) => setPassword(e.target.value)}

      />

      <CustomButton
       text="Create Account"
        onClick={handleSignup}
/>

      <p className="text-center mt-6">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Signup;