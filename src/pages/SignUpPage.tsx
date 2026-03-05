import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import logo1 from "@/assets/thePostOffice1Red.png";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up:", email, password);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── LEFT / TOP: Logo section ─────────────────────────── */}
      {/* Mobile: white strip at top; Desktop: white left half */}
      <div className="bg-white flex items-center justify-center px-10 py-12 md:w-1/2 md:min-h-screen">
        <Link to="/">
          <img
            src={logo1}
            alt="The Post Office"
            className="w-48 md:w-80 h-auto"
          />
        </Link>
      </div>

      {/* ── RIGHT / BOTTOM: Form section ─────────────────────── */}
      {/* Mobile: red full-width block; Desktop: red right half */}
      <div className="bg-primary flex flex-col items-center justify-center flex-1 px-8 py-14 md:w-1/2 md:min-h-screen">
        <h2 className="text-primary-foreground font-body text-xl text-center mb-8 leading-snug">
          Sign up<br />with Email &amp; Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
          {/* Email input */}
          <div className="bg-white px-4 py-3 rounded-sm">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-primary font-body text-sm outline-none border-b border-primary placeholder:text-primary/60"
            />
          </div>

          {/* Password input */}
          <div className="bg-white px-4 py-3 rounded-sm">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent text-primary font-body text-sm outline-none border-b border-primary placeholder:text-primary/60"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="text-primary-foreground font-body text-base underline underline-offset-2 mt-2 hover:opacity-80 transition-opacity text-center"
          >
            Sign up
          </button>
        </form>

        <p className="text-primary-foreground/80 font-body text-xs text-center mt-6 underline underline-offset-2">
          <Link to="/signin" className="hover:opacity-80 transition-opacity">
            Already have an account, go to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
