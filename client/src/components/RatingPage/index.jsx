import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'material-ui/Slider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import style from './RatingPage.css';
import Navbar from '../globals/Navbar/index.jsx';
import Button from '../globals/Button/index.jsx';
import Profile from '../globals/Profile/index.jsx';
import actions from '../../../Redux/actions/ratings_page_actions';

class Rate extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: null,
      users: [],
    };
  }

  componentDidMount = () => {
    this.props.fetchMoreUsersToRate();
  }

  submitUserAttractiveness = () => {
    
    if (this.state.rating === null) {
      alert('please rate this person')
    } else {
      const body = {
        ratee: this.props.userToRate.id,
        attractiveness: this.state.rating,
        rater: this.props.id,
      };
      this.props.submitRating(body);
    }
  }
  
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }

  render() {
    return (
      <div>
      <Navbar />
      <div className={style.ratingContainer}>
        <div className={style.profileContainer}>
          <Profile 
            url={this.props.userToRate.photos[0]}
            firstname={this.props.userToRate.firstname}
            lastname={this.props.userToRate.lastname}
            age={this.props.userToRate.age}
            tags={this.props.userToRate.tags}
            bio={this.props.userToRate.bio}
          />
          <div className={style.ratingScaleContainer}>
            <Slider 
              max={10}
              defaultValue={5}
              step={1}
              onChange={(e, val) => this.setState({ rating: val })}
            />
            hotness: {this.state.rating}
          </div>
        </div>
        <Button 
          onClick={() => this.submitUserAttractiveness()}
          className="next"
        />
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchMoreUsersToRate: actions.fetchMoreUsersToRate,
    submitRating: actions.submitRating,
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    userToRate: state.ratings[state.ratings.length - 1],
    id: state.accountData.id
  };
} 

export default connect(mapStateToProps, mapDispatchToProps)(Rate);
