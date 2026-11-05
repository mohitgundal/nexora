import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
} from "lucide-react";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    await registerUser({
      name,
      email,
      password,
    });

    navigate("/dashboard");
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">

        {/* LEFT SIDE */}

        <div className="hidden w-[45%] border-r border-white/10 bg-[#080808] lg:block">
          <div className="flex h-full flex-col justify-between p-10">

            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Nexora"
                className="size-12 object-contain"
              />

              <span className="text-2xl font-bold">
                Nexora
              </span>
            </Link>

            <div className="max-w-lg">

              <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
                Start building
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight">
                Turn your ideas
                <br />
                into reality.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                Create powerful websites using nothing but your ideas.
                Nexora handles the design, structure, and code.
              </p>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

                <div className="flex items-center gap-3">
                  <span className="size-2 animate-pulse rounded-full bg-purple-400" />

                  <span className="text-sm text-white/60">
                    Your next website starts here
                  </span>
                </div>

                <div className="mt-5 space-y-3">

                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10" />
                    <div className="flex-1">
                      <div className="h-2 w-3/4 rounded bg-white/10" />
                      <div className="mt-2 h-2 w-1/2 rounded bg-white/5" />
                    </div>
                  </div>

                  <div className="h-20 rounded-xl border border-white/10 bg-black/30" />

                </div>
              </div>

            </div>

            <p className="text-xs text-white/30">
              © 2026 Nexora. Build at the speed of thought.
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="mb-10 flex justify-center lg:hidden">
              <Link to="/" className="flex items-center gap-3">

                <img
                  src="/logo.png"
                  alt="Nexora"
                  className="size-10 object-contain"
                />

                <span className="text-xl font-bold">
                  Nexora
                </span>

              </Link>
            </div>

            {/* Heading */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold">
                Create your account.
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Start turning your ideas into websites.
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm text-white/70">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-purple-400/50"
                />

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm text-white/70">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-purple-400/50"
                />

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm text-white/70">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-white/20 focus:border-purple-400/50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/70"
                  >

                    {showPassword ? (
                      <EyeOffIcon className="size-5" />
                    ) : (
                      <EyeIcon className="size-5" />
                    )}

                  </button>

                </div>

              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}

              </button>

            </form>

            {/* Login */}

            <p className="mt-8 text-center text-sm text-gray-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-medium text-white transition hover:text-purple-400"
              >
                Log in
              </Link>

            </p>

            {/* Back */}

            <div className="mt-8 text-center">

              <Link
                to="/"
                className="text-xs text-white/30 transition hover:text-white/60"
              >
                ← Back to Nexora
              </Link>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
};

export default Register;