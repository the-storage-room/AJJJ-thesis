import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './Dashboard.css';
import Button from '../globals/Button/index.jsx';
import Navbar from '../globals/Navbar/index.jsx';
import Leaderboard from '../LeaderboardPage/index.jsx';
import FollowsContainer from '../FollowsPage/FollowsContainer.jsx';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			show: true,
		};
	}

	// firstname={this.props.firstname}
	// lastname={this.props.lastname}
	// tags={this.props.tags}
	// age={this.props.age}
	// bio={this.props.bio}

	render() {
		return (
			<div className="row">
				<Navbar />
				<div className={style.wrapper}>
					<div className={style.column}>
						<div className={style.welcome}>Welcome back, user</div>
						<img className={style.photo} src={this.props.photos[0].url} />
						<div className={style.info}>
							<div className={style.userranking}>Power Ranking Score</div>
							<div className={style.countdown}>You have X more points to rank up</div>

							<progress max="100" value="25">
								Hi
							</progress>
						</div>
					</div>
					<div className={style.column}>
						<div className={style.choice}>
							<Button
								onClick={() => {
									this.setState({ show: false });
								}}
								text="Follow"
							/>
							<Button
								onClick={() => {
									this.setState({ show: true });
								}}
								text="Leaderboard"
							/>
						</div>
						{this.state.show ? (
							<div className={style.leaderboardContainer}>
								{/* {this.props.leaderboard.map((boarditem, index) => {
									return (
										<LeaderboardItem
											key={index}
											username={boarditem.username}
											powerranking={boarditem.powerranking}
											primaryPhoto={boarditem.primaryPhoto}
											index={index}
                    /> */}
								<Leaderboard />
							</div>
						) : (
							<FollowsContainer />
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch);
};

const mapStateToProps = ({ accountData, userPhotos, bioData, tags, leaderboard }) => {
	console.log(leaderboard);
	return {
		firstname: accountData.firstname,
		lastname: accountData.lastname,
		age: bioData.age,
		tags: tags.user,
		photos: userPhotos,
		leaderboard: leaderboard,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
