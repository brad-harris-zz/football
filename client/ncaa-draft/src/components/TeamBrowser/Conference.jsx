import React, { Component } from 'react';
import TeamLine from './TeamLine';
import './TeamBrowser.css';

class Conference extends Component {
	renderTeams() {
		var teams = [];
		for(var t in this.props.teams) {
			const teamData = this.props.teams[t];
			var teamComp = (
				<TeamLine
					teamData={teamData}
					clickHandler={this.props.getClickHandler(teamData)}
					selected={this.props.selectedTeam ? this.props.selectedTeam.id === teamData.id : false}
				/> 
			)
			teams.push(teamComp);
		}
		return teams;
	}
	render() {
		const teams = this.renderTeams();
		return (
			<div className='confListing'>
				<h1>{this.props.name}</h1>
				{teams}
			</div>
		)
	}
}

export default Conference;