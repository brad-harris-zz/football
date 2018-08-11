import React, { Component } from 'react';
import {DraftCard} from './components/DraftCard/DraftCard';
import {DraftPicks} from './components/DraftPicks/DraftPicks';
import {TeamBrowser} from './components/TeamBrowser/TeamBrowser';
import {TeamData, ConferenceData} from './teams.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'teamData': TeamData,
      'conferences': undefined,
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
    let teamData = ConferenceData;
    for (var conf in teamData) {
      for (var team in teamData[conf]) {
        teamData[conf][team]['conference'] = conf;
      }
    }
    this.setState({'conferences': teamData});
    // fetch('http://localhost:5000/power')
    // .then(results => {
    //   return results.json();
    // })
    // .then(teams => {
    //   let teamDataList={};
    //   for(var conf in teams) {
    //     for(var team in teams[conf]) {
    //       teams[conf][team]['conference'] = conf;
    //     }
    //   }
    //   this.setState({'conferences': teams});
    // })
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
  getPicker() {
    let index = this.state.pickIndex % 10;
    return index < 5 ? this.state.draftOrder[index] : this.state.draftOrder[9-index];
  }
  makePick(teamData) {
    var pickIndex = this.state.pickIndex;
    if (pickIndex === 60 ) {
      return;
    }
    var individualPicks = this.state.draftGrid;
    var picks = this.state.picks;
    const picker = this.getPicker();
    console.log(picker + ' picks ' + teamData.name);
    individualPicks[picker][teamData.conference].push(teamData);
    picks[pickIndex] = {
      'team' : teamData.name,
      'name' : picker
    };
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
    this.setState({
      pickIndex: 0,
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
    let availableConferences = [];
    const onTheClock = this.getPicker();
    if (this.state.pickIndex >= 0 && this.state.pickIndex < 50 ) {
      var picks = this.state.draftGrid[onTheClock];
      for(var conf in picks) {
        if(picks[conf].length < 2) {
          availableConferences.push(conf);
        }
      }
    } else if (this.state.pickIndex < 60 ) {
      availableConferences = ['ACC', 'Big 10', 'Big XII', 'Pac 12', 'SEC'];
    }

    return (
      <div className="App">
        <div className="sidebar">
          <h1>Picks</h1>
          <DraftPicks 
            picks={this.state.picks}
          />
        </div>
        <div className="content">
          <div id='gridResults'>
            {this.getDraftCards()}
          </div>
          <div id='teamPicker'>
            <TeamBrowser 
              conferences={this.state.conferences}
              makePickCallback={this.makePick.bind(this)}
              availableConferences={availableConferences}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
