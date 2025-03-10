import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import axios from 'axios';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = async () => {
    try {
      // Call logout API
      await axios.post('http://localhost:5000/api/users/logout', {}, {
        withCredentials: true // Important for cookies
      });
      
      // Clear Redux state
      dispatch(logout())
      navigate('/')
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
            {user.isAdmin && (
              <li>
                <button className='btn' onClick={() => navigate('/dashboard')}>
                  Dashboard
                </button>
              </li>
            )}
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
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

export default Header