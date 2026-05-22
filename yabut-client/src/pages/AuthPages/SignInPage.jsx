import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-2xl border-2 border-zinc-900 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:bg-white focus:shadow-[4px_4px_0_#18181b]";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-[11px] font-bold uppercase tracking-[0.2em]";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call login API
      const { data } = await loginUser({ email, password });

      console.log("Login successful:", data);

      // Save data to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);

      // Navigate to dashboard
      navigate("/dashboard", {
        state: {
          firstName: data.firstName,
          type: data.type,
        },
      });
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );

      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
        Welcome back to Draft & Drift
      </p>

      <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
        Sign in to your creative space.
      </h1>

      <p className="mt-4 text-sm leading-7 text-zinc-600">
        Access your purchased templates, brand kits, design assets, and digital
        downloads in one clean workspace.
      </p>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mt-4 rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        {/* EMAIL */}
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-bold text-zinc-800"
          >
            Email Address
          </label>

          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-bold text-zinc-800"
          >
            Password
          </label>

          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Keep your account secure to protect your saved orders and digital
            product access.
          </p>
        </div>

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-400 accent-zinc-900"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="font-bold text-zinc-700 transition hover:text-zinc-950"
          >
            Forgot Password?
          </button>
        </div>

        {/* SIGN IN BUTTON */}
        <Button
          type="submit"
          variant="secondary"
          className={actionButtonClassName}
        >
          Sign In
        </Button>

        {/* SOCIAL BUTTONS */}
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="tertiary"
            className={actionButtonClassName}
          >
            Google
          </Button>

          <Button
            type="button"
            variant="tertiary"
            className={actionButtonClassName}
          >
            Apple
          </Button>
        </div>

        {/* SIGN UP */}
        <p className="pt-2 text-center text-sm text-zinc-600">
          New to Draft & Drift?{" "}
          <Link
            to="/auth/signup"
            className="font-bold text-zinc-900 underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignInPage;