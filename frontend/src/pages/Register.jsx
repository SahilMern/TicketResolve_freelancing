import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    if (!name || !email || !password || !password2) {
      toast.error('Please fill in all fields')
      return
    }

    if (password !== password2) {
      toast.error('Passwords do not match')
      return
    }

    try {
      // Send user registration request
      const userData = {
        name,
        email,
        password,
      }

      const response = await axios.post('http://localhost:5000/api/users', userData)

      // Handle successful registration
      toast.success('Registration successful!')
      navigate('/login')  // Navigate to login page after successful registration
    } catch (error) {
      // Handle errors from the backend
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h3>
          <FaUser /> Register
        </h3>
        <p style={{ fontSize: '14px' }}>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
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
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
