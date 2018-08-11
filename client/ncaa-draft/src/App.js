import React, { Component } from 'react';
import {NCAADraft, NCAAPicks} from './NcaaDraft';
import {DraftCard} from './components/DraftCard/DraftCard';
import {DraftPicks} from './components/DraftPicks/DraftPicks';
import {TeamBrowser} from './components/TeamBrowser/TeamBrowser';
import {TeamData} from './teams.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'selectedTeamId': undefined,
      'teamData': TeamData,
      'conferences': undefined,
      'selectedTeam': undefined,
      'draftOrder': [],
      'draftGrid': {
        'Adam' : this.getEmptyIconData(),
        'Brad' : this.getEmptyIconData(),
        'Brian' : this.getEmptyIconData(),
        'Chad' : this.getEmptyIconData(),
        'Mike' : this.getEmptyIconData()
      },
      'pickIndex' : -1,
      'picks': []
    }
  }
  getEmptyIconData() {
    return {'ACC': [], 'Big 10': [], 'Big XII': [], 'Pac 12': [], 'SEC': []};
  }
  getTeams() {
    fetch('http://localhost:5000/power')
    .then(results => {
      return results.json();
    })
    .then(teams => {
      let teamDataList={};
      for(var conf in teams) {
        for(var team in teams[conf]) {
          teams[conf][team]['conference'] = conf;
        }
      }
      this.setState({'conferences': teams});
    })
  }
  selectTeam(selectedTeam) {
    if (this.state.selectedTeam === selectedTeam) {
      return;
    }
    fetch('http://localhost:5000/opponents/' + selectedTeam.id)
    .then(results => {
      return results.json();
    })
    .then(opponents => {
      this.setState({
        'selectedTeam': selectedTeam,
        'selectedTeamSchedule': opponents.opponents
      });
    })
  }
  selectConference(selectedConference) {
    if (selectedConference !== this.state.selectedConference) {
      this.setState({selectedConference});
    }
  }
  getDraftCards() {
    let cards = [];
    for (var d in this.state.draftOrder) {
      let drafter = this.state.draftOrder[d];
      let component = (
        <DraftCard
          key={drafter+'card'}
          name={drafter}
          picks={this.state.draftGrid[drafter]}
        />
      )
      cards.push(component);
    }
    return cards;
  }
  makePick(teamData) {
    var pickIndex = this.state.pickIndex;
    if (pickIndex === 60 ) {
      return;
    }
    var individualPicks = this.state.draftGrid;
    var picks = this.state.picks;
    const picker = picks[pickIndex].name;
    individualPicks[picker][teamData.conference].push(teamData);
    picks[pickIndex].team = teamData.name;
    pickIndex++;
    let teamDataState = this.state.teamData;
    teamDataState[teamData.id].owner = picker;
    let conferenceState = this.state.conferences;
    for (var t in conferenceState[teamData.conference]) {
      if (conferenceState[teamData.conference][t].id === teamData.id) {
        conferenceState[teamData.conference][t].owner = picker;
      }
    }
    this.setState({
      'draftGrid': individualPicks,
      'pickIndex': pickIndex,
      'picks': picks
    });
  }
  startDraft() {
    var names = ['Adam', 'Brad', 'Brian', 'Chad', 'Mike'];
    for(var i=5; i>0; i--) {
      let index = Math.floor(Math.random() * i);
      let name = names[index];
      names[index] = names[i-1];
      names[i-1] = name;
    }
    let pickerIndex = 0;
    let pickerDirection = 1;
    let picks = [];
    for(var i=0; i<60; i++) {
      picks[i] = {
        'name': names[pickerIndex],
        'team': undefined
      };
      pickerIndex += pickerDirection;
      if (pickerIndex === 5) {
        pickerDirection = -1;
        pickerIndex--;
      }
      if (pickerIndex === -1) {
        pickerDirection = 1;
        pickerIndex++
      }
    }
    this.setState({
      pickIndex: 0,
      picks: picks,
      draftOrder: names
    })
  }
  render() {
    if (this.state.pickIndex < 0 ) {
      return (
        <div className="App">
          <button className='startDraft' onClick={this.startDraft.bind(this)}>Start Draft</button>
        </div>
      )
    }
    if(!this.state.conferences) {
      this.getTeams();
    }
    return (
      <div className="App">
        <div className="sidebar">
          <h1>Picks</h1>
          <DraftPicks picks={this.state.picks} />
        </div>
        <div className="content">
          <div id='gridResults'>
            {this.getDraftCards()}
          </div>
          <div id='teamPicker'>
            <TeamBrowser 
              conferences={this.state.conferences}
              makePickCallback={this.makePick.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
