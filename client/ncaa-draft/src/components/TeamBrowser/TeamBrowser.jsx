import React, { Component } from 'react';
import './TeamBrowser.css';

class TeamBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'selectedConference': 'ACC'
        }
    }
    teamClicker(teamData) {
        return () => {
            this.selectTeam(teamData);
        }
    }
    selectTeam(teamData) {
        fetch('http://localhost:5000/opponents/' + teamData.id)
        .then(results => {
            return results.json()
        })
        .then(opponents => {
            this.setState({
                'selectedTeam': teamData,
                'selectedTeamSchedule': opponents.opponents
            })
        });
    }
    renderTeams() {
        if (!this.props.conferences) {
            return undefined;
        }
        let teams=[];
        const selectedConfTeams = this.props.conferences[this.state.selectedConference];
        for(var team in selectedConfTeams) {
            const teamData = selectedConfTeams[team];
            const className = teamData.owner ? 'owned' : this.state.selectedTeam === teamData ? 'selected' : undefined;
            const dom = (
                <li 
                    key={'team' + teamData['id']} 
                    className={className}
                    onClick={this.teamClicker(teamData)}
                >
                    <img src={'http://www.bradharris.name' + teamData['icon']} />
                    <span>{teamData['name']}</span>
                </li>
            )
            teams.push(dom);
        } 
        const teamsDom = (
            <div className={'confListing'}>
                <ul>{teams}</ul>
            </div>
        )
        let opponentsDom = undefined;
        if (this.state.selectedTeamSchedule) {
            let opponents = [];
            let weekCounter = 1;
            for(var week in this.state.selectedTeamSchedule) {
                const data = this.state.selectedTeamSchedule[week];
                if (data.week !== weekCounter) {
                    const byeWeek = (
                        <li key={'schedule' + weekCounter}>
                            <span key={'scheduleWeek'+weekCounter}>{weekCounter}. </span>
                            <span className={'bye'} key={'scheduleTeamBye'}>Bye</span>
                        </li>
                    );
                    opponents.push(byeWeek);
                    weekCounter++;
                }
                const dom = (
                    <li key={'schedule' + weekCounter}>
                        <span key={'scheduleWeek'+weekCounter}>{weekCounter}. </span>
                        <span key={'scheduleTeam'+data.name}>{data.name}</span>
                    </li>
                )
                opponents.push(dom);
                weekCounter++;
            }
            const buttonStyle = {backgroundColor: this.state.selectedTeam.color};
            const draftButton = this.state.selectedTeam.owner ? undefined : (
                <button 
                    key={'selectTeamButton'} 
                    className='selectTeam' 
                    style={buttonStyle}
                    onClick={(event) => {this.props.makePickCallback(this.state.selectedTeam)}}
                >
                    Select {this.state.selectedTeam.name}
                </button>
            )
            opponentsDom = (
                <div key={'schedule'} className='opponents'>
                    <h1 key={'h1schedule'}>{this.state.selectedTeam.name}</h1>
                    <ul key={'ulschedule'}>{opponents}</ul>
                    {draftButton}
                </div>
            )
        }
        return [teamsDom, opponentsDom];
    }
    conferenceClicker(conf) {
        return (event) => {
            this.setState({'selectedConference': conf});
        }
    }
    render() {
        const teamData = this.renderTeams();
        return (
            <div className='confViewer'>
                <div className='confHeader'>
                    <span 
                        className={this.state.selectedConference === 'ACC' ? 'selected' : undefined}
                        onClick={this.conferenceClicker('ACC')}>ACC</span>
                    <span 
                        className={this.state.selectedConference === 'Big 10' ? 'selected' : undefined}
                        onClick={this.conferenceClicker('Big 10')}>Big 10</span>
                    <span 
                        className={this.state.selectedConference === 'Big XII' ? 'selected' : undefined}
                        onClick={this.conferenceClicker('Big XII')}>Big XII</span>
                    <span 
                        className={this.state.selectedConference === 'Pac 12' ? 'selected' : undefined}
                        onClick={this.conferenceClicker('Pac 12')}>Pac 12</span>
                    <span 
                        className={this.state.selectedConference === 'SEC' ? 'selected' : undefined}
                        onClick={this.conferenceClicker('SEC')}>SEC</span>
                </div>
                <div className='confContent'>
                    {teamData}
                </div>
            </div>
        )
    }
}

export {TeamBrowser};