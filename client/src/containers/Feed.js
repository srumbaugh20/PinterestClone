import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SinglePin from './SinglePin';
// import axios from 'axios';
import './Feed.css';


class Feed extends Component {

  // getMore = () => {
  //   if(this.props.feed.feed.data) {
  //     axios.post('/api/pins', this.props.feed.feed.data)
  //       .then(() => {
  //         if(this.props.feed.feed.hasNext) {
  //           this.props.feed.feed.next();
  //         }
  //       })
  //   }
  // }

  render() {
    if (!this.props.user.loggedIn) {
      return (
        < Redirect to="/login"/>
      )
    }
    let pins = <div></div>
    if (this.props.feed.feed.data){
        pins = this.props.feed.feed.data.map((val, ind) => {
        return <SinglePin data={val} key={val.id} />
      })
    }


    return (
      <div className='feedWrapper'>
        <div className="feed feed-fade">{pins}</div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    feed: store.feed,
    user: store.user
  }
}

export default connect(mapStateToProps)(Feed);
