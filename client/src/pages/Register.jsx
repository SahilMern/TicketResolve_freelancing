import { useState, useEffect } from 'react'; // Add useEffect
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux'; // Import useSelector to get the user state

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);
  
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();

  // Get user state from redux
  const { user } = useSelector((state) => state.auth);

  // Track if the component is mounted
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // If user is already logged in, redirect them to the home or dashboard page
    if (user) {
      navigate(user.isAdmin ? '/dashboard' : '/');
    }

    return () => {
      // Cleanup function: set isMounted to false when the component unmounts
      setIsMounted(false);
    };
  }, [user, navigate]); // Depend on user and navigate to check for changes

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!name || !email || !password || !password2) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true); // Start loading

    try {
      const userData = { name, email, password };
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      
      // Only update state if the component is still mounted
      if (isMounted) {
        toast.success(response.data.message || 'Registration successful!');
        navigate('/login'); // Navigate to login page after successful registration
      }
    } catch (error) {
      // Only update state if the component is still mounted
      if (isMounted) {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        toast.error(errorMessage);
      }
    } finally {
      // Only update state if the component is still mounted
      if (isMounted) {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <>
      <section className="heading">
        <h3>
          <FaUser /> Register
        </h3>
        <p style={{ fontSize: '14px' }}>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" disabled={loading}>
              {loading ? <Spinner /> : 'Submit'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
