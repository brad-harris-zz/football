import React, { Component } from 'react';
import './TeamBrowser.css';
import {opponents} from '../../opponents.js';
import Conference from './Conference';

class TeamBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'selectedTeam' : undefined
    }
  }
  teamClicker(teamData) {
    return () => {
      this.selectTeam(teamData);
    }
  }
  selectTeam(teamData) {
    this.setState({
      'selectedTeam': teamData,
      'selectedTeamSchedule': opponents[teamData.id]
    });
    return;
    // fetch('http://localhost:5000/opponents/' + teamData.id)
    // .then(results => {
    //   return results.json()
    // })
    // .then(opponents => {
    //   this.setState({
    //     'selectedTeam': teamData,
    //     'selectedTeamSchedule': opponents.opponents
    //   })
    // });
  }
  renderTeams() {
    console.log(this.props.availableConferences);
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
      const draftButton = (this.state.selectedTeam.owner || !this.props.availableConferences.includes(this.state.selectedTeam.conference)) ? 
        undefined : 
        (
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
  renderConference(key) {
    if(!this.props.conferences) {
      return undefined;
    }
    return (
      <Conference name={key} teams={this.props.conferences[key]} />
    )
  }
  createClickHandler(teamData) {
    return (event) => {
      this.props.selectTeamCallback(teamData);
    }
  }
  getConference(key) {
    return (
      <Conference
        name={key}
        teams={this.props.conferences ? this.props.conferences[key] : undefined}
        getClickHandler={this.createClickHandler.bind(this)}
        selectedTeam={this.props.selectedTeam}
      />
    )
  }
  render() {
    return (
      <div className='confViewer'>
        <div className='confContent'>
          {this.getConference('ACC')}
          {this.getConference('Big 10')}
          {this.getConference('Big XII')}
          {this.getConference('Pac 12')}
          {this.getConference('SEC')}
        </div>
      </div>
    )
  }
}

export {TeamBrowser};