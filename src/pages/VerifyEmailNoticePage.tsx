import { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "@/assets/thePostOffice1.png";
import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";

const VerifyEmailNoticePage = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { user } = useAuth();

  const resendMutation = useMutation({
    mutationFn: () => resendVerificationEmail(),
    onSuccess: () => {
      setSuccessMsg("A new verification link has been sent to your email address.");
      setErrorMsg("");
    },
    onError: (error: any) => {
      setErrorMsg(error.response?.data?.message || "Failed to send verification link. Please try again.");
      setSuccessMsg("");
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <Link to="/" className="mb-8">
        <img src={logo1} alt="The Post Office" className="w-48 md:w-64 h-auto" />
      </Link>
      
      <div className="w-full max-w-md bg-primary text-primary-foreground p-8 rounded-sm shadow-lg text-center font-body">
        <h2 className="text-xl mb-4">Please Verify Your Email</h2>
        <p className="text-sm opacity-80 mb-6">
          Before you can access this section of the site, you need to verify your email address. 
          Please check your inbox (and spam folder) for a verification link.
        </p>

        {successMsg && (
          <p className="text-sm text-green-400 font-body text-center mb-4">{successMsg}</p>
        )}
        {errorMsg && (
          <p className="text-sm text-red-400 font-body text-center mb-4">{errorMsg}</p>
        )}

        <button
          onClick={() => resendMutation.mutate()}
          disabled={resendMutation.isPending}
          className="text-white border border-white px-6 py-2 rounded text-sm hover:bg-white hover:text-primary transition-colors disabled:opacity-50 mt-2 mb-6"
        >
          {resendMutation.isPending ? "Sending..." : "Resend Verification Email"}
        </button>

        <div className="mt-4 pt-4 border-t border-white/20">
          <Link to="/" className="text-sm underline underline-offset-2 hover:opacity-80">
            Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailNoticePage;
