import { Link } from 'react-router-dom'

function TicketItem({ ticket }) {
  return (
    <div className='ticket'>
      <div>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleString('en-US') : 'N/A'}</div>
      <div>{ticket.product || 'N/A'}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/tickets/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default TicketItem;
