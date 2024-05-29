import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect, Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {PrevArrow, NextArrow} from './CustomArrows'

import Footer from '../Footer'

import SomethingWent from '../SomethingWent'

import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {api: apiStatus.initial, list: []}

  componentDidMount = () => {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({api: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const format = data.books.map(i => ({
        authorName: i.author_name,
        coverPic: i.cover_pic,
        id: i.id,
        title: i.title,
      }))

      this.setState({list: format, api: apiStatus.success})
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  getAllBook = () => {
    const {list} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: <PrevArrow className="colo" />,
      nextArrow: <NextArrow className="colo" />,
    }
    return (
      <div>
        {list.length === 0 ? (
          <SomethingWent onRetry={this.onRetry} />
        ) : (
          <Slider {...settings}>
            {list.map(book => (
              <div key={book.id} className="book-item">
                <Link to={`/books/${book.id}`}>
                  <img src={book.coverPic} className="book-cover" alt="title" />
                </Link>
                <h1 className="book-title">{book.title}</h1>
                <p className="book-author">{book.authorName}</p>
              </div>
            ))}
          </Slider>
        )}
      </div>
    )
  }

  renderPrgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getBooks()
  }

  renderFailure = () => <SomethingWent onRetry={this.onRetry} />

  renderAll = () => {
    const {api} = this.state

    switch (api) {
      case apiStatus.success:
        return this.getAllBook()

      case apiStatus.failure:
        return this.renderFailure()

      case apiStatus.inProgress:
        return this.renderPrgress()

      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>

            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>

            <div className="bg">
              <div className="books-section">
                <div className="r">
                  <h1>Top Rated Books</h1>
                  <Link to="/shelf">
                    <button type="button" className="shop-now-button">
                      Find Books
                    </button>
                  </Link>
                </div>
              </div>
              {this.renderAll()}
            </div>
          </div>

          <Footer />
        </div>
      </>
    )
  }
}

export default Home
