import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import logo1 from "@/assets/thePostOffice1.png";
import { verifyEmail, getUserProfile } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";

const VerifyEmailPage = () => {
  const { id, hash } = useParams<{ id: string; hash: string }>();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const navigate = useNavigate();
  const { setAuth, token } = useAuth();
  
  useEffect(() => {
    const verify = async () => {
      try {
        // Construct the full URL matching the backend route
        const expires = searchParams.get('expires');
        const signature = searchParams.get('signature');
        
        let url = `/verify-email/${id}/${hash}`;
        if (expires && signature) {
          url += `?expires=${expires}&signature=${signature}`;
        }

        await verifyEmail(url);
        
        // Refresh the user profile to get the updated email_verified_at
        if (token) {
          const user = await getUserProfile();
          setAuth(user, token);
        }
        
        setStatus('success');
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        setStatus('error');
      }
    };

    if (id && hash) {
      verify();
    }
  }, [id, hash, searchParams, navigate, setAuth, token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <Link to="/" className="mb-8">
        <img src={logo1} alt="The Post Office" className="w-48 md:w-64 h-auto" />
      </Link>
      
      <div className="w-full max-w-md bg-primary text-primary-foreground p-8 rounded-sm shadow-lg text-center font-body">
        {status === 'verifying' && (
          <>
            <h2 className="text-xl mb-4">Verifying your email...</h2>
            <p className="text-sm opacity-80">Please wait a moment while we confirm your email address.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h2 className="text-xl mb-4 text-green-400">Email Verified!</h2>
            <p className="text-sm opacity-80 mb-6">Thank you for verifying your email address. You will be redirected shortly.</p>
            <Link to="/" className="underline underline-offset-2 hover:opacity-80">Go to Home Page</Link>
          </>
        )}
        {status === 'error' && (
          <>
            <h2 className="text-xl mb-4 text-red-400">Verification Failed</h2>
            <p className="text-sm opacity-80 mb-6">The verification link is invalid or has expired.</p>
            <Link to="/verify-email-notice" className="underline underline-offset-2 hover:opacity-80">Request a new link</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
