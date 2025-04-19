import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { id, email, user_metadata } = user;
        const name = user_metadata.full_name || email.split('@')[0];
        const role = localStorage.getItem('selectedRole');

        const profileData = {
          id,
          email,
          name,
          role,
        };

        await supabase.from('profiles').upsert([profileData]);

        if (role === 'client') {
          await supabase.from('clients').upsert([{ id }]);
          navigate('/client-dashboard');
        } else if (role === 'seller') {
          await supabase.from('sellers').upsert([{ id }]);
          navigate('/sDashboard');
        } else {
          console.error("Role missing or invalid");
        }
      }
    };

    handleRedirect();
  }, [navigate]);

  return <div className="text-center mt-20 text-xl">Signing you in...</div>;
};

export default AuthCallback;
