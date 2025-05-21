import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAuth, getRedirectResult } from 'firebase/auth';

const AuthCallback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const auth = getAuth();
        const result = await getRedirectResult(auth);
        
        if (result?.user) {
          // Successfully signed in
          navigate('/dashboard');
        } else if (user) {
          // User is already signed in
          navigate('/dashboard');
        } else {
          // No redirect result and no user, go back to home
          navigate('/', { state: { error: 'Authentication failed' } });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/', { state: { error: 'Authentication failed' } });
      }
    };

    handleRedirect();
  }, [navigate, user, location]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;