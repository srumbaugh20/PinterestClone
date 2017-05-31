import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


//Stylings and Pics
import './UserBoard.css';
import blankProfile from '../pics/blank-profile.png';


class UserBoard extends Component {


  render() {
    if (!this.props.user.loggedIn) {
      return (< Redirect to = "/login" />)
    }
    const data = this.props.user.selectedBoard;
    const length = data.pins ? data.pins.length : 0;
    return (
      <div className="board-wrapper">
        <div className="board-mainContainer">
          <div className="board-barDiv">
              <div className="board-fixedBar">
                    <div className="board-iconDiv">
                      <button className="board-icons1"></button>
                      <button className="board-icons2"></button>
                      <button className="board-icons3"></button>
                    </div>
              </div>
              <div className="board-header">
                  <h3 className="board-title">{data.name}</h3>
                  <div className="board_boardinfodiv">
                      <div className="board-data">
                        <p className="board-number"><b>{length} </b> Pins</p>
                        <p className="board-description"><b>{data.description}</b></p>
                      </div>
                      <img alt="" src={blankProfile} className="board_userImg" />
                  </div>
              </div>
              <div className="board-grid">

              </div>

           </div>
      </div>
    </div>

    )
  }
}

function mapStateToProps(store) {
    return {user: store.user}
}

export default connect(mapStateToProps) (UserBoard);
