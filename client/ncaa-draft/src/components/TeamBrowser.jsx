import React, { Component } from 'react';
import './components.css';

class TeamBrowser extends Component {
    renderTeams() {
        let confs = [];
        for(var conf in this.props.teams) {
            let teams=[];
            for(var team in this.props.teams[conf]) {
                const teamData = this.props.teams[conf][team];
                const className = this.props.selectedTeam === teamData['id'] ? 'selected' : undefined;
                const dom = (
                    <li 
                        key={'team' + teamData['id']} 
                        className={className}
                        onClick={(event) => {this.props.selectTeamCallback(teamData['id'])}}
                    >
                        {teamData['name']}
                    </li>)
                teams.push(dom);
            } 
            const dom = (
                <div key={'div'+conf} className='conference'>
                    <h1 key={'h1'+conf}>{conf}</h1>
                    <ul key={'ul'+conf}>{teams}</ul>
                </div>
            )
            confs.push(dom);
        }
        if (this.props.selectedTeamSchedule) {
            let opponents = [];
            for(var week in this.props.selectedTeamSchedule) {
                const data = this.props.selectedTeamSchedule[week];
                const dom = (
                    <li key={'schedule' + data['name']}>
                        <span key={'scheduleWeek'+data['week']}>{data['week']}. </span>
                        <span key={'scheduleTeam'+data['name']}>{data['name']}</span>
                    </li>
                )
                opponents.push(dom);
            }
            const dom = (
                <div key={'schedule'} className='conference'>
                    <h1 key={'h1schedule'}>Opponents</h1>
                    <ul key={'ulschedule'}>{opponents}</ul>
                </div>
            )
            confs.push(dom);
        }
        return confs;
    }
    render() {
        const teamData = this.renderTeams();
        return (
            <div className='confViewer'>{teamData}</div>
        )
    }
}

export {TeamBrowser};