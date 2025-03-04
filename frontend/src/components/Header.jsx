import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Accessing user from Redux state
  const { user } = useSelector((state) => state.auth)

  // Function to navigate to dashboard
  const handleClick = () => {
    navigate('/dashboard')
  }

  // Function for logout
  const onLogout = () => {
    dispatch(logout())  // Log the user out by dispatching the logout action
    navigate('/')  // Redirect to home page after logout
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
                <button className='btn' onClick={handleClick}>
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
