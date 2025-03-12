import { FaSignInAlt, FaSignOutAlt, FaUser, FaCogs } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import axios from 'axios';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth)
  console.log(user, "user in header"); // Log the user data to check if it's correct

  const onLogout = async () => {
    try {
      // Call logout API
      await axios.post('http://localhost:5000/api/users/logout', {}, {
        withCredentials: true // Important for cookies
      });
      
      // Clear Redux state
      dispatch(logout())
      navigate('/') // Redirect to homepage after logout
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className='header'>
      <div className="logo">
        <Link to="/" className="logo-container">
          <img src="/logo.png" alt="Support Desk Logo" className="logo-img" />
          <span className="logo-text">HelpDesk</span>
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            {/* Check if user is an admin */}
            {user.isAdmin && (
              <li>
                <button className='btn' onClick={() => navigate('/dashboard')}>
                  <FaCogs /> Dashboard
                </button>
              </li>
            )}
            {/* Logout button */}
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Login and Register buttons for unauthenticated users */}
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header;
