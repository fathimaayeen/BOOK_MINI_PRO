import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, withRouter, Redirect} from 'react-router-dom'

import {IoClose, IoMenu} from 'react-icons/io5'

import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      activeLink: '/',
    }
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  toggleMenu = () => {
    this.setState(prevState => ({isMenuOpen: !prevState.isMenuOpen}))
  }

  setActiveLink = link => {
    this.setState({activeLink: link, isMenuOpen: false})
    const {activeLink} = this.state

    if (activeLink === link) {
      return <Redirect to={activeLink} />
    }
  }

  render() {
    const {isMenuOpen, activeLink} = this.state
    return (
      <nav className='nav-header'>
        <div className='nav-content'>
          <Link to='/'>
            <img
              className='website-logo'
              src='https://res.cloudinary.com/dwppqua6v/image/upload/v1716818856/Book/Group_7732Icon_y7uiyj.png'
              alt='website logo'
            />
          </Link>
          <div
            className={`nav__menu ${isMenuOpen ? 'nav__menu--open' : ''}`}
            id='nav-menu'
          >
            <ul className='nav-menu'>
              <Link
                to='/'
                className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
                onClick={() => this.setActiveLink('/')}
              >
                <li>Home</li>
              </Link>
              <Link
                to='/shelf'
                className={`nav-link ${
                  activeLink === '/shelf' ? 'active' : ''
                }`}
                onClick={() => this.setActiveLink('/shelf')}
              >
                <li>Bookshelves</li>
              </Link>
            </ul>
            <button
              type='button'
              className='logout-desktop-btn'
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
          <button
            type='button'
            className='nav__toggle'
            id='nav-toggle'
            onClick={this.toggleMenu}
          >
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
