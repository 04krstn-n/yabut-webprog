import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-2xl border-2 border-zinc-900 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:bg-white focus:shadow-[4px_4px_0_#18181b]";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-[11px] font-bold uppercase tracking-[0.2em]";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    address: "",
    username: "",
    email: "",
    password: "",
    type: "viewer",
    isActive: true,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const {
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      address,
      username,
      email,
      password,
    } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !age ||
      !gender ||
      !contactNumber.trim() ||
      !address.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return "Please fill in all required fields.";
    }

    if (Number(age) <= 0 || Number(age) > 120) {
      return "Please enter a valid age.";
    }

    if (contactNumber.length < 10) {
      return "Please enter a valid contact number.";
    }

    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // CLEAN PAYLOAD (important for backend validation)
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        contactNumber: formData.contactNumber.trim(),
        address: formData.address.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        type: "admin", // default to viewer, can be changed by admin later
        isActive: true,
      };

      const { data } = await createUser(payload);

      console.log("Account created:", data);

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/auth/signin");
      }, 1200);
    } catch (err) {
      console.error("Signup failed:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
        Join Draft & Drift
      </p>

      <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
        Create your digital design account.
      </h1>

      {error && (
        <div className="mt-4 rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 rounded-xl border border-green-400 bg-green-100 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSignUp} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-bold text-zinc-800">
              First Name
            </label>
            <input
              name="firstName"
              className={inputClasses}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-zinc-800">Last Name</label>
            <input
              name="lastName"
              className={inputClasses}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-bold text-zinc-800">Age</label>
            <input
              name="age"
              type="number"
              className={inputClasses}
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-zinc-800">Gender</label>
            <select
              name="gender"
              className={inputClasses}
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <input
          name="contactNumber"
          placeholder="Contact Number"
          className={inputClasses}
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          className={inputClasses}
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          name="username"
          placeholder="Username"
          className={inputClasses}
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className={inputClasses}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className={inputClasses}
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="secondary"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link to="/auth/signin" className="font-bold text-zinc-900 underline">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUpPage;
