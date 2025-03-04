import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'

function NewTicket() {
  const { user } = useSelector((state) => state.auth)

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')
  const [engineer, setEngineer] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/tickets')
        toast.success('New ticket created!')
      })
      .catch(toast.error)
  }

  return (
    <>
      <BackButton />
      <section className='heading'>
        <h4>Create New Ticket</h4>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Engineer Assignment Field */}
          <div className="form-group">
            <label htmlFor="engineer">Assign to Engineer</label>
            <select
              name="engineer"
              id="engineer"
              value={engineer}
              onChange={(e) => setEngineer(e.target.value)}
            >
              <option value="">Select Engineer</option>
              <option value="Adnan Sheikh">Adnan Sheikh</option>
              <option value="Shreyas Tare">Shreyas Tare</option>
            </select>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>

      </section>
    </>
  )
}

export default NewTicket
