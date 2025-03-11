import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';

function NewTicket() {
  // Dynamic state for name, email, product, description, and engineer
  const [name, setName] = useState(''); // For customer's name
  const [email, setEmail] = useState(''); // For customer's email
  const [product, setProduct] = useState('iPhone'); // For selected product
  const [description, setDescription] = useState(''); // For issue description
  const [engineer, setEngineer] = useState(''); // For engineer assignment

  // const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    // Include engineer in the ticket data
    const ticketData = { product, description, engineer };

    try {
      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
        credentials: 'include', // Include credentials (cookies) with the request
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || 'Failed to create ticket');
        return;
      }

      const data = await response.json();
      console.log(data, "data iin When ticket created");
      
      toast.success('New ticket created!');
      // navigate('/tickets'); // Redirect after success (uncomment this line if needed)
    } catch (error) {
      console.log(error, "errro");
      
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <BackButton />
      <section className='heading'>
        <h4>Create New Ticket</h4>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        {/* Customer Name Input Field */}
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)} // Handle name input change
            placeholder='Enter customer name'
          />
        </div>

        {/* Customer Email Input Field */}
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input change
            placeholder='Enter customer email'
          />
        </div>

        {/* Form */}
        <form onSubmit={onSubmit}>
          {/* Product Selection Field */}
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)} // Handle product selection
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>

          {/* Description Input Field */}
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Enter issue description'
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Handle description input change
            ></textarea>
          </div>

          {/* Engineer Assignment Field */}
          <div className='form-group'>
            <label htmlFor='engineer'>Assign to Engineer</label>
            <select
              name='engineer'
              id='engineer'
              value={engineer}
              onChange={(e) => setEngineer(e.target.value)} // Handle engineer selection
            >
              <option value=''>Select Engineer</option>
              <option value='Adnan Sheikh'>Adnan Sheikh</option>
              <option value='Shreyas Tare'>Shreyas Tare</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
