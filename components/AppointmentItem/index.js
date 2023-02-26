const AppointmentItem = props => {
  const {appointmentItem, onClickFavButton} = props
  const {id, title, date, isStarred} = appointmentItem

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFav = () => {
    onClickFavButton(id)
  }

  return (
    <li>
      <div>
        <p>{title}</p>
        <button type="button" data-testid="star" onClick={onClickFav}>
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p>{date}</p>
    </li>
  )
}

export default AppointmentItem
