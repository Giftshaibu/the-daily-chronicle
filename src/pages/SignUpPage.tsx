import { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import logo1 from "@/assets/thePostOffice1Red.png";
import { useMutation } from "@tanstack/react-query";
import { register, resendVerificationEmailWithToken } from "@/api/auth";

type RegisterError = AxiosError<{
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
}>;

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [registered, setRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  // Store token locally (not in global auth) — used only for the resend button
  const [tempToken, setTempToken] = useState("");

  const passwordChecks = [
    { label: "12 or more characters", valid: password.length >= 12 },
    { label: "Uppercase and lowercase letters", valid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: "At least one number", valid: /\d/.test(password) },
    { label: "At least one symbol", valid: /[^A-Za-z0-9]/.test(password) },
    { label: "Passwords match", valid: password.length > 0 && password === passwordConfirmation },
  ];

  const registerMutation = useMutation({
    mutationFn: () => register(name, email, password, passwordConfirmation),
    onSuccess: (data) => {
      // Do NOT log the user into the app — store token only for resend
      setTempToken(data.access_token);
      setRegisteredEmail(email);
      setRegistered(true);
    },
    onError: (err: RegisterError) => {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.password?.[0] ||
        err?.response?.data?.errors?.name?.[0] ||
        err?.response?.data?.errors?.email?.[0] ||
        "Registration failed. Please try again.";
      setErrorMsg(message);
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => resendVerificationEmailWithToken(tempToken),
    onSuccess: () => setResendMsg("Verification email sent! Please check your inbox."),
    onError: () => setResendMsg("Could not resend. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (passwordChecks.some((check) => !check.valid)) {
      setErrorMsg("Please create a stronger password that satisfies every requirement.");
      return;
    }
    registerMutation.mutate();
  };

  // ── Check-your-email screen ──────────────────────────────────────────────
  if (registered) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="bg-white flex items-center justify-center px-10 py-12 md:w-1/2 md:min-h-screen">
          <Link to="/">
            <img src={logo1} alt="The Post Office" className="w-48 md:w-80 h-auto" />
          </Link>
        </div>

        <div className="bg-primary flex flex-col items-center justify-center flex-1 px-8 py-14 md:w-1/2 md:min-h-screen text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-primary-foreground mb-6 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
            />
          </svg>

          <h2 className="text-primary-foreground font-body text-xl mb-3 leading-snug">
            Check your email
          </h2>
          <p className="text-primary-foreground/80 font-body text-sm mb-1">
            We've sent a verification link to:
          </p>
          <p className="text-primary-foreground font-body text-sm font-semibold mb-6">
            {registeredEmail}
          </p>
          <p className="text-primary-foreground/70 font-body text-xs mb-8 max-w-xs">
            Click the link in the email to verify your account. You won't be
            able to sign in until your email is verified.
          </p>

          {resendMsg && (
            <p className="text-primary-foreground/90 font-body text-xs mb-4">
              {resendMsg}
            </p>
          )}

          <button
            onClick={() => {
              setResendMsg("");
              resendMutation.mutate();
            }}
            disabled={resendMutation.isPending}
            className="text-primary-foreground font-body text-xs underline underline-offset-2 hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {resendMutation.isPending
              ? "Sending..."
              : "Didn't get it? Resend verification email"}
          </button>

          <p className="text-primary-foreground/80 font-body text-xs text-center mt-8 underline underline-offset-2">
            <Link to="/signin" className="hover:opacity-80 transition-opacity">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // ── Registration form ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── LEFT / TOP: Logo section */}
      <div className="bg-white flex items-center justify-center px-10 py-12 md:w-1/2 md:min-h-screen">
        <Link to="/">
          <img src={logo1} alt="The Post Office" className="w-48 md:w-80 h-auto" />
        </Link>
      </div>

      {/* ── RIGHT / BOTTOM: Form section */}
      <div className="bg-primary flex flex-col items-center justify-center flex-1 px-8 py-14 md:w-1/2 md:min-h-screen">
        <h2 className="text-primary-foreground font-body text-xl text-center mb-8 leading-snug">
          Sign up<br />with Email &amp; Password
        </h2>

        {errorMsg && (
          <p className="text-sm text-red-200 font-body text-center mb-4">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
          <div className="bg-white px-4 py-3 rounded-sm">
            <input
              type="text"
              autoComplete="name"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent text-primary font-body text-sm outline-none border-b border-primary placeholder:text-primary/60"
            />
          </div>

          <div className="bg-white px-4 py-3 rounded-sm">
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-primary font-body text-sm outline-none border-b border-primary placeholder:text-primary/60"
            />
          </div>

          <div className="bg-white px-4 py-3 rounded-sm">
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={12}
              className="w-full bg-transparent text-primary font-body text-sm outline-none border-b border-primary placeholder:text-primary/60"
            />
          </div>

          <div className="bg-white px-4 py-3 rounded-sm">
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              minLength={12}
              className="w-full bg-transparent text-primary font-body text-sm outline-none border-b border-primary placeholder:text-primary/60"
            />
          </div>

          <div className="bg-white/10 border border-white/30 px-4 py-3 rounded-sm">
            <p className="text-primary-foreground font-body text-xs font-semibold mb-2">Password must include:</p>
            <ul className="space-y-1">
              {passwordChecks.map((check) => (
                <li
                  key={check.label}
                  className={`font-body text-xs ${check.valid ? "text-primary-foreground" : "text-primary-foreground/65"}`}
                >
                  {check.valid ? "OK" : "-"} {check.label}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="text-primary-foreground font-body text-base underline underline-offset-2 mt-2 hover:opacity-80 transition-opacity text-center disabled:opacity-50"
          >
            {registerMutation.isPending ? "Creating account..." : "Sign up"}
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
