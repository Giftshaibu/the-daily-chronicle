import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import logo1 from "@/assets/thePostOffice1.png";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth";

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation({
    mutationFn: () => resetPassword({
      token: token || "",
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
    onSuccess: () => {
      setSuccessMsg("Password reset successfully! Redirecting to sign in...");
      setTimeout(() => navigate('/signin'), 3000);
    },
    onError: (error: any) => {
      setErrorMsg(error.response?.data?.message || "Invalid or expired token. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    setErrorMsg("");
    resetPasswordMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="bg-primary flex items-center justify-center px-10 py-12 md:w-1/2 md:min-h-screen">
        <Link to="/">
          <img
            src={logo1}
            alt="The Post Office"
            className="w-48 md:w-80 h-auto brightness-0 invert"
          />
        </Link>
      </div>

      <div className="bg-primary md:bg-white flex flex-col items-center justify-center flex-1 px-8 py-14 md:w-1/2 md:min-h-screen">
        <div className="w-full max-w-xs bg-white md:shadow-lg rounded-sm px-8 py-10">
          <h2 className="text-primary font-body text-xl text-center mb-8 leading-snug">
            Choose New Password
          </h2>

          {errorMsg && (
            <p className="text-sm text-red-600 font-body text-center mb-4">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-sm text-green-600 font-body text-center mb-4">{successMsg}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="bg-primary px-4 py-3 rounded-sm hidden">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-black font-body text-sm outline-none"
              />
            </div>
            <div className="bg-primary px-4 py-3 rounded-sm">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-primary-foreground font-body text-sm outline-none border-b border-primary-foreground placeholder:text-primary-foreground/70"
              />
            </div>

            <div className="bg-primary px-4 py-3 rounded-sm">
              <input
                type="password"
                placeholder="Confirm password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="w-full bg-transparent text-primary-foreground font-body text-sm outline-none border-b border-primary-foreground placeholder:text-primary-foreground/70"
              />
            </div>

            <button
              type="submit"
              disabled={resetPasswordMutation.isPending || !!successMsg}
              className="text-primary font-body text-base underline underline-offset-2 mt-2 hover:opacity-80 transition-opacity text-center disabled:opacity-50"
            >
              {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-6 flex flex-col gap-1">
            <Link
              to="/signin"
              className="text-primary/70 font-body text-xs underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
