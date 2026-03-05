import { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "@/assets/thePostOffice1.png";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", email, password);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── LEFT / TOP: Logo section ─────────────────────────── */}
      {/* Desktop: red left half with white logo; Mobile: red strip at top */}
      <div className="bg-primary flex items-center justify-center px-10 py-12 md:w-1/2 md:min-h-screen">
        <Link to="/">
          <img
            src={logo1}
            alt="The Post Office"
            className="w-48 md:w-80 h-auto brightness-0 invert"
          />
        </Link>
      </div>

      {/* ── RIGHT / BOTTOM: Form section ─────────────────────── */}
      {/* Desktop: white right half with red-accented form card */}
      <div className="bg-primary md:bg-white flex flex-col items-center justify-center flex-1 px-8 py-14 md:w-1/2 md:min-h-screen">

        {/* White card wrapper (desktop only) */}
        <div className="w-full max-w-xs bg-white md:shadow-lg rounded-sm px-8 py-10">
          <h2 className="text-primary font-body text-xl text-center mb-8 leading-snug">
            Sign In<br />with Email &amp; Password
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email input */}
            <div className="bg-primary px-4 py-3 rounded-sm">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-primary-foreground font-body text-sm outline-none border-b border-primary-foreground placeholder:text-primary-foreground/70"
              />
            </div>

            {/* Password input */}
            <div className="bg-primary px-4 py-3 rounded-sm">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-primary-foreground font-body text-sm outline-none border-b border-primary-foreground placeholder:text-primary-foreground/70"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="text-primary font-body text-base underline underline-offset-2 mt-2 hover:opacity-80 transition-opacity text-center"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6 flex flex-col gap-1">
            <Link
              to="/signup"
              className="text-primary/70 font-body text-xs underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Don't have an account, go to sign up
            </Link>
            <Link
              to="/forgot-password"
              className="text-primary/70 font-body text-xs underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Forgot Email or Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
