import {FaYoutube, FaGoogle, FaTwitter, FaInstagram} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="coll">
    <div className="row">
      <FaGoogle className="icon" />
      <FaTwitter className="icon" />
      <FaInstagram className="icon" />
      <FaYoutube className="icon" />
    </div>
    <p>Contact us</p>
  </div>
)

export default Footer
