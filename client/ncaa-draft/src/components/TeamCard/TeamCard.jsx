import React, { Component } from 'react';
import './TeamCard.css';
import {opponents} from '../../opponents';

class DraftCard extends Component {
  getOpponents() {
    if(!this.props.team) {
      return undefined;
    }
    let opponentsDom = [];
    const schedule = opponents[this.props.team.id];
    console.log('schedule');
    let weekCounter = 1;
    for(var week in schedule) {
      const data = schedule[week];
      if (data.week !== weekCounter) {
        const byeWeek = (
          <li key={'schedule' + weekCounter}>
            <span key={'scheduleWeek'+weekCounter}>{weekCounter}. </span>
            <span className={'bye'} key={'scheduleTeamBye'}>Bye</span>
          </li>
        );
        opponentsDom.push(byeWeek);
        weekCounter++;
      }
      const dom = (
        <li key={'schedule' + weekCounter}>
          <span key={'scheduleWeek'+weekCounter}>{weekCounter}. </span>
          <span key={'scheduleTeam'+data.name}>{data.name}</span>
        </li>
      )
      opponentsDom.push(dom);
      weekCounter++;
    }
    return opponentsDom;
  }
  render() {
    const draftButton = this.props.team && this.props.available ? 
    (
      <button 
        className='selectTeam' 
        style={{backgroundColor: this.props.team.color}}
        onClick={(event) => {this.props.draftTeam(this.props.team)}}
      >
        Select {this.props.team.name}
      </button>
    ) : undefined;
    if (!this.props.team) {
      return (<div class='selectedTeamData' />);
    }
    return (
      <div className='selectedTeamData'>  
        <h1>
          <img src={'http://www.bradharris.name' + this.props.team.icon} />
          {this.props.team.name}
        </h1>
        <h2>Schedule</h2>
        <ul id='schedule'>
          {this.getOpponents()}
        </ul>
        {draftButton}
      </div>
    );
  }
}

export default DraftCard;