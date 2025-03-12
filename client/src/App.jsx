import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewTicket from './pages/NewTicket'
import PrivateRoute from './components/PrivateRoute'
import MyTickets from './pages/TicketPages/MyTickets'
import Dashboard from './pages/Dashboard'
import AdminPrivateRoute from './components/AdminPrivateRoutes'
import SingleTicket from './pages/SingleTicket'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          {/* <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/new-ticket'
              element={
                <PrivateRoute>
                  <NewTicket />
                </PrivateRoute>
              }
            />
            
            <Route
              path='/tickets'
              element={
                <PrivateRoute>
                  <MyTickets />
                </PrivateRoute>
              }
            />

          </Routes> */}

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            //Ticket Routes
            <Route
              path='/new-ticket'
              element={
                <PrivateRoute>
                  <NewTicket />
                </PrivateRoute>
              }
            />
            //GET MY All tickets
            <Route
              path='/tickets'
              element={
                <PrivateRoute>
                  <MyTickets />
                </PrivateRoute>
              }
            />
            //Admin PrivateRoute routes
            <Route
              path='/dashboard'
              element={
                <AdminPrivateRoute adminOnly={true}>
                  <Dashboard />
                </AdminPrivateRoute>
              }
            />
            <Route
              path='/dashboard/:id'
              element={
                <AdminPrivateRoute adminOnly={true}>
                  <SingleTicket />
                </AdminPrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
{
  /* <Route
              path='/ticket/:ticketId'
              element={
                <PrivateRoute>
                  <Ticket />
                </PrivateRoute>
              }
            /> */
}
