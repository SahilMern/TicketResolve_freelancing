import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className="heading">
        <h3>Welcome To the IT Helpdesk</h3>
        <p style={{fontSize:"16px"}}>
          Get help with technical issues, check the status of an existing ticket, find solutions to issues, and connect with your IT support team.</p>
          <p style={{fontSize:"14px"}}>Please choose from an option below</p>
      </section>

      <div className="btn-container">
        <Link to="/new-ticket" className="btn btn-reverse">
          <FaQuestionCircle /> Create New Ticket
        </Link>

        <Link to="/tickets" className="btn">
          <FaTicketAlt /> View My Tickets
        </Link>
      </div>
    </>

  )
}

export default Home
