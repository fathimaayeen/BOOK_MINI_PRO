import './index.css'

const SideBar = props => {
  const {bookshelvesList, onChangeList, activeId} = props

  const onChangeValue = value => {
    onChangeList(value)
  }

  return (
    <div className="v">
      <h1>Bookshelves</h1>
      <ul className="sel">
        {bookshelvesList.map(i => (
          <li key={i.id} value={i.value}>
            <button
              className={`${activeId === i.value ? 'active' : 'butt'}`}
              onClick={() => onChangeValue(i.value)}
            >
              {i.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default SideBar
