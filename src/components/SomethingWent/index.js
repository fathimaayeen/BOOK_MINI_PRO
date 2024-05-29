import './index.css'

const SomethingWent = props => {
  const {onRetry} = props
  return (
    <div className="d">
      <img
        src="https://res.cloudinary.com/dwppqua6v/image/upload/v1716818856/Book/Group_7522WentWrong_dupnry.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="bu" onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}
export default SomethingWent
