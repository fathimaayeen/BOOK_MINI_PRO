import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {BsFillStarFill, BsSearch} from 'react-icons/bs'

import SideBar from '../SideBar'

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
const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    activeId: bookshelvesList[0].value,
    searchValue: '',
    details: [],
    api: apiStatus.initial,
  }

  componentDidMount = () => {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({api: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchValue, activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeId}&search=${searchValue}`
    console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const format = data.books.map(i => ({
        authorName: i.author_name,
        coverPic: i.cover_pic,
        id: i.id,
        rating: i.rating,
        readStatus: i.read_status,
        title: i.title,
      }))
      console.log(format)
      this.setState({details: format, api: apiStatus.success})
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  getTotal = () => {
    const {details, activeId, searchValue} = this.state
    const f = bookshelvesList.filter(i => i.value === activeId)
    const fLabels = f.map(item => item.label)
    console.log(fLabels)
    return (
      <div className="col">
        <h1>{fLabels} Books</h1>
        {details.length === 0 ? (
          <div>
            <img
              src="https://res.cloudinary.com/dwppqua6v/image/upload/v1716818857/Book/Asset_1_1Search_pttn34.png"
              alt="no books"
            />
            <p>Your search for {searchValue} did not find any matches</p>
          </div>
        ) : (
          <ul className="row">
            {details.map(i => (
              <li key={i.id}>
                <Link to={`/books/${i.id}`}>
                  <img src={i.coverPic} alt={i.title} className="i1" />
                </Link>
                <li className="col">
                  <h1>{i.title}</h1>
                  <p>{i.authorName}</p>
                  <p>
                    Avg Rating
                    <BsFillStarFill alt="star" style={{fill: 'yellow'}} />
                    {i.rating}
                  </p>
                  <p>
                    Status <span>{i.readStatus}</span>
                  </p>
                </li>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  onChangeList = label => {
    this.setState({activeId: label}, this.getDetails)
  }

  onChangeValue = event => {
    this.setState({searchValue: event.target.value}, this.getDetails)
  }

  renderPrgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getDetails()
  }

  renderFailure = () => <SomethingWent onRetry={this.onRetry} />

  renderAll = () => {
    const {api} = this.state

    switch (api) {
      case apiStatus.success:
        return this.getTotal()

      case apiStatus.failure:
        return this.renderFailure()

      case apiStatus.inProgress:
        return this.renderPrgress()

      default:
        return null
    }
  }

  renderSearch = () => {
    const {searchValue} = this.state
    console.log(searchValue)
    return (
      <div style={{display: 'flex', flexDirection: 'row', width: '10%'}}>
        <input
          type="search"
          placeholder="search"
          value={searchValue}
          onChange={this.onChangeValue}
        />
        <button type="button" className="sbutton" testid="searchButton">
          <BsSearch />
        </button>
      </div>
    )
  }

  render() {
    const {activeId} = this.state
    return (
      <>
        <Header />
        <div className="to">
          {this.renderSearch()}

          <div className="div">
            <div className="flex-item">
              <SideBar
                bookshelvesList={bookshelvesList}
                onChangeList={this.onChangeList}
                activeId={activeId}
              />
              <div className="col flex-item">{this.renderAll()}</div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}
export default Bookshelves
