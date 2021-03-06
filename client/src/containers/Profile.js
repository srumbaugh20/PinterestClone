import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import CreateBoard from './CreateBoard';
import SingleBoard from './SingleBoard';
import UpdateBoard from './updateBoardModal';

//Stylings and Pics
import './Profile.css';
import nut from '../pics/nut.png';
import dotdotdot from '../pics/dotdotdot.png';
import share from '../pics/upload.png';
import blankProfile from '../pics/bananaLady.jpg';
import AddBoard from './AddBoard';
import SinglePin from './SinglePin';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      create: false,
      edit: false,
      pins: false
    }
  }

  createBoard = () => {
    this.setState({create: true})
  }

  closeWindow = () => {
    this.setState({create: false})
  }

  editBoard = () => {
    this.setState({edit: true})
  }

  closeEditWindow = () => {
    this.setState({edit: false})
  }

  displayPins = () => {
    this.setState({pins: true})
  }

  displayBoards = () => {
    // console.log("displayBoards");
    this.setState({pins: false})
  }

  render() {

    if (!this.props.user.loggedIn) {
      return (< Redirect to = "/login" />)
    }
    const data = {
      first: this.props.user.data.first + ' ' + this.props.user.data.last,
      bio: this.props.user.data.bio,
      img: blankProfile
    }

    // const boards = data   .boards   .map((v) => {     return <SingleBoard
    // data={v} key={v.name}/>   })

    let boards = <div></div>
    if (this.props.user.data.boards) {
      boards = this.props.user.data.boards.map((val, ind) => {
          let boardPins = this.props.user.data.pins.filter(v => {
              return v.board.name === val.name
            })
          val.pins = boardPins
          return <SingleBoard data={val} key={val.name} editBoard={() => this.editBoard()}/>
        })
    }

    let pins = <div></div>
    if (this.props.user.data.pins) {
      pins = this.props.user.data.pins.map((val, ind) => {
          return <SinglePin data={val} key={val.id}/>
        })
    }
  return (
    <div className="profile-container">
      <div className="profile-nav">
        <div className="profile-side-margin">
          <div className="profile-icon">
            <img className="profile-nut" src={nut} alt=""/>
          </div>
          <div className="profile-icon">
            <img className="profile-share" src={share} alt=""/>
          </div>
          <div className="profile-icon">
            <img className="profile-dotdotdot" src={dotdotdot} alt=""/>
          </div>
        </div>
      </div>
      <div className="profile-profile-info">
        <div className="profile-side-margin profile-info-margin">
          <div className="profile-name">
            <h3 className="profile-nameBold">{data.first}</h3>
          </div>
          <div className="profile-profile-info-right">
            <div className="profile-info-bio">{data.bio}</div>
            <div className="profile-info-pic-container">
              <img className="profile-info-pic" src={data.img} alt="missing profile pic"/>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-filter">
        <div className="profile-side-margin profile-buttons">
          <button
            className="profile-button profile-button-boards"
            onClick={() => this.displayBoards()}>Boards</button>
          <button
            className="profile-button profile-button-pins"
            onClick={() => this.displayPins()}>Pins</button>
        </div>
      </div>
      <div className="profile-boards-pins">
        {this.state.create && <CreateBoard closeWindow={() => this.closeWindow()}/>}
        {this.state.edit && <UpdateBoard data={''} closeEditWindow={() => this.closeEditWindow()}/>}
        {!this.state.pins && <AddBoard createBoard={() => this.createBoard()}/>}
        {!this.state.pins && boards}
      </div>
      <div className="profile-pins-wrapper">
        <div className="profile-pins">
          {this.state.pins && pins}
        </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps(store) {
  return {user: store.user}
}

export default connect(mapStateToProps)(Profile);
