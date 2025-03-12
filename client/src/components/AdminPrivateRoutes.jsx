import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you're using redux for user state management

// AdminPrivateRoute component for protecting admin routes
const AdminPrivateRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.auth.user); // Assuming user is under 'auth' in your redux state

  // If no user is logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the route is for admins only and the user is not an admin, redirect to the home page
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  // If the user is logged in and it's either not an admin route or the user is an admin, allow access
  return children;
};

export default AdminPrivateRoute;
