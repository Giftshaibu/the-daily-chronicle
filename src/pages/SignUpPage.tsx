import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up:", name, email, password);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
      <Link to="/" className="text-center mb-10">
        <span className="font-body text-sm font-light italic text-primary-foreground tracking-wide">the</span>
        <span className="font-headline font-black text-5xl md:text-7xl text-primary-foreground block -mt-2">
          Post Office
        </span>
      </Link>

      <div className="w-full max-w-sm">
        <h2 className="font-body text-primary-foreground text-center text-sm font-medium mb-6">
          Sign Up with Email & Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-primary-foreground text-foreground font-body h-12 rounded-sm border-none"
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-primary-foreground text-foreground font-body h-12 rounded-sm border-none"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-primary-foreground text-foreground font-body h-12 rounded-sm border-none"
            required
          />
          <Button
            type="submit"
            className="w-full h-12 bg-foreground text-background font-body font-semibold rounded-sm hover:bg-foreground/90"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-primary-foreground/70 font-body text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary-foreground font-semibold underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
