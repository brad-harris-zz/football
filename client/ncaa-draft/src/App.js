import React, { Component } from 'react';
import {NCAADraft, NCAAPicks} from './NcaaDraft';
import {DraftGrid} from './components/DraftGrid';
import {DraftPicks} from './components/DraftPicks';
import {TeamBrowser} from './components/TeamBrowser';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'teams': undefined,
      'selectedTeam': undefined,
      'selectedTeamSchedule': undefined
    }
  }
  getTeams() {
    if (!this.state.teams) {
      fetch('http://bradharris.name:5000/power')
      .then(results => {
        return results.json();
      })
      .then(teams => {
        this.setState({teams});
      })
    }
  }
  selectTeam(selectedTeam) {
    if (this.state.selectedTeam == selectedTeam) {
      return;
    }
    fetch('http://bradharris.name:5000/opponents/' + selectedTeam)
    .then(results => {
      return results.json();
    })
    .then(opponents => {
      this.setState({
        'selectedTeam': opponents.team_id,
        'selectedTeamSchedule': opponents.opponents
      });
    })
  }
  render() {
    this.getTeams();
    if (this.state.selectedTeamSchedule) {
      console.log(this.state.selectedTeamSchedule);
    }
    return (
      <div className="App">
        <div className="sidebar">
          <h1>Picks</h1>
          <DraftPicks picks={NCAAPicks} />
        </div>
        <div className="content">
          <div id='gridResults'>
            <DraftGrid results={NCAADraft} />
          </div>
          <div id='teamPicker'>
            <TeamBrowser 
              teams={this.state.teams} 
              selectedTeam={this.state.selectedTeam} 
              selectTeamCallback={this.selectTeam.bind(this)}
              selectedTeamSchedule={this.state.selectedTeamSchedule} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
