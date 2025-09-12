import { useEffect, useRef } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const navigate = useNavigate();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const verifier = localStorage.getItem('pkce_verifier');

    if (code && verifier) {
      axios
        .post(
          'http://localhost:8000/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: import.meta.env.VITE_CLIENT_ID,
            redirect_uri: 'http://localhost:5173/auth/callback',
            code,
            code_verifier: localStorage.getItem('pkce_verifier'),
          },
          { validateStatus: () => true }
        )
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.access_token);
            // localStorage.setItem('refresh_token', res.data.refresh_token);
            localStorage.removeItem('pkce_verifier');
            navigate('/admin/users');
          } else {
            console.warn('Token response:', res.status, res.data);
          }
        });
    }
  }, [navigate]);
  return <div>Signing you in...</div>;
};
export default Callback;

// ---------------------------
export const loader = () => {
  const token = localStorage.getItem('token');
  if (token) return redirect('/admin/users');
};
