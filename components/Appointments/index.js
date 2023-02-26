import {Component} from 'react'
import {v4 as V4Id} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: ''}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    const date = `Date: ${format(
      new Date(event.target.value),
      'dd MMMM yyyy, EEEE',
    )}`
    this.setState({date})
  }

  update = () => {
    const {title, date} = this.state
    const newAppointmentList = {
      id: V4Id(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointmentList],
      title: '',
      date: '',
    }))
  }

  onUpdateButton = event => {
    event.preventDefault()
    this.update()
  }

  onClickStarButton = () => {
    const {appointmentList} = this.state
    const filteredAppointments = appointmentList.filter(
      eachItem => eachItem.isStarred === true,
    )
    this.setState({appointmentList: filteredAppointments})
  }

  onClickFavButton = id => {
    const {appointmentList} = this.state
    const updatedList = appointmentList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, isStarred: !eachItem.isStarred}
      }
      return eachItem
    })
    this.setState({appointmentList: updatedList})
  }

  render() {
    const {appointmentList, title, date} = this.state
    return (
      <div className="main-container">
        <div className="details-container">
          <div className="input-details-image">
            <div>
              <h1>Add Appointment</h1>
              <form className="form-container" onSubmit={this.onUpdateButton}>
                <label htmlFor="input01">TITLE</label>
                <input
                  type="text"
                  id="input01"
                  placeholder="Title"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="input02">DATE</label>
                <input
                  type="date"
                  id="input02"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <button type="submit">Add</button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="button-appointment-cont">
            <h1>Appointments</h1>
            <button type="button" onClick={this.onClickStarButton}>
              Starred
            </button>
          </div>
          <ul>
            {appointmentList.map(eachList => (
              <AppointmentItem
                appointmentItem={eachList}
                onClickFavButton={this.onClickFavButton}
                key={eachList.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
