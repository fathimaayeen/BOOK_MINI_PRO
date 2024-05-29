import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsFillStarFill} from 'react-icons/bs'

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

class BookDetails extends Component {
  state = {api: apiStatus.initial, book: []}

  componentDidMount = () => {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({api: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const format = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      console.log(format)
      this.setState({book: format, api: apiStatus.success})
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  successBookDetails = () => {
    const {book} = this.state
    const {
      title,
      readStatus,
      rating,
      id,
      coverPic,
      authorName,
      aboutBook,
      aboutAuthor,
    } = book
    return (
      <div style={{alignItems: 'center'}} className="col" key={id}>
        <div className="row">
          <img src={coverPic} alt={title} className="i1" />
          <div className="c">
            <h1>{title}</h1>
            <p>{authorName}</p>
            <p>
              Avg Rating <BsFillStarFill alt="star" style={{fill: 'yellow'}} />
              {rating}
            </p>
            <p>
              Status: <span>{readStatus}</span>
            </p>
          </div>
        </div>
        <hr style={{border: '1px solid #94A3B8', width: '100%'}} />
        <h1>About Author</h1>
        <p>{aboutAuthor}</p>
        <h1>About Book</h1>
        <p>{aboutBook}</p>
      </div>
    )
  }

  renderPrgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getBookDetails()
  }

  renderFailure = () => <SomethingWent onRetry={this.onRetry} />

  renderAll = () => {
    const {api} = this.state

    switch (api) {
      case apiStatus.success:
        return this.successBookDetails()

      case apiStatus.failure:
        return this.renderFailure()

      case apiStatus.inProgress:
        return this.renderPrgress()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="div">
          <div className="b">{this.renderAll()}</div>
          <Footer />
        </div>
      </>
    )
  }
}

export default BookDetails
