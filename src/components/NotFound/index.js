import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="div">
    <img
      src="https://res.cloudinary.com/dwppqua6v/image/upload/v1716818856/Book/Group_7484NotFound_jc11hx.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p className="p">
      we are sorry, the page you requested could not be found,
      <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button type="button" className="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
