import React, { Component } from 'react';
import './TeamBrowser.css';
import ClassNames from 'classnames';

class TeamLine extends Component {
	render() {
		const {teamData, clickHandler, selected} = this.props;
		const classNames = ['teamLine']
		teamData.owner ? classNames.push('ownedTeam') : undefined;
		selected ? classNames.push('selectedTeam') : undefined;
		return (
			<div className={ClassNames(classNames)} id={teamData.name} onClick={clickHandler}>
				<img src={'http://www.bradharris.name' + teamData.icon} />
				<span>{teamData.name}</span>
			</div>
		);
	}
}

export default TeamLine;