import { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import logo1 from "@/assets/thePostOffice1.png";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/auth";

type ApiError = AxiosError<{ message?: string }>;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: () => forgotPassword(email),
    onSuccess: () => {
      setSuccessMsg("If your email exists in our system, you will receive a password reset link shortly.");
      setErrorMsg("");
    },
    onError: (error: ApiError) => {
      setErrorMsg(error.response?.data?.message || "Something went wrong. Please try again.");
      setSuccessMsg("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── LEFT / TOP: Logo section ─────────────────────────── */}
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
      <div className="bg-primary md:bg-white flex flex-col items-center justify-center flex-1 px-8 py-14 md:w-1/2 md:min-h-screen">
        {/* White card wrapper */}
        <div className="w-full max-w-xs bg-white md:shadow-lg rounded-sm px-8 py-10">
          <h2 className="text-primary font-body text-xl text-center mb-4 leading-snug">
            Reset Password
          </h2>
          <p className="text-center font-body text-sm text-gray-600 mb-8">
            Enter your email to receive a password reset link.
          </p>

          {successMsg && (
            <p className="text-sm text-green-600 font-body text-center mb-4">{successMsg}</p>
          )}
          {errorMsg && (
            <p className="text-sm text-red-600 font-body text-center mb-4">{errorMsg}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="text-primary font-body text-base underline underline-offset-2 mt-2 hover:opacity-80 transition-opacity text-center disabled:opacity-50"
            >
              {forgotPasswordMutation.isPending ? "Sending link..." : "Send link"}
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

export default ForgotPasswordPage;
