import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/auth/authSlice';
import axios from 'axios';
import Spinner from '../components/Spinner'; // Import Spinner

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Access user and loading state from redux store
  const { user, isLoading } = useSelector((state) => state.auth);

  // Track component mount status
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // If the user is already logged in, redirect to the dashboard or home page
    if (user) {
      navigate(user.isAdmin ? '/dashboard' : '/');
    }

    return () => setIsMounted(false);
  }, [navigate, user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      dispatch(loginStart());

      // Add withCredentials to handle cookies
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        { withCredentials: true }
      );

      if (!isMounted) return;

      if (response.data.success) {
        dispatch(loginSuccess(response.data.user));
        toast.success(`Welcome ${response.data.user.name}!`);

        // Redirect to dashboard if the user is an admin, else home page
        if (response.data.user.isAdmin) {
          navigate('/dashboard');
        } else {
          navigate('/'); // Regular user goes to the home page
        }
      }
    } catch (error) {
      if (!isMounted) return;

      const errorMessage =
        error.response?.data?.message ||
        'Login failed. Please check your credentials';
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <section className='heading'>
        <h3>
          <FaSignInAlt /> Login
        </h3>
        <p style={{ fontSize: '14px' }}>Please log in to continue</p>
      </section>

      <section className='form-container'>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
              autoComplete='email'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
              autoComplete='current-password'
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit' disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Login'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
