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
      'teams': undefined
    }
  }
  getTeams() {
    if (!this.state.teams) {
      fetch('http://localhost:5000/power')
      .then(results => {
        return results.json();
      })
      .then(teams => {
        this.setState({teams});
      })
    }
  }
  render() {
    this.getTeams();
    return (
      <div className="App">
        <div>
          <div className="results">
            <h1>Recent Picks</h1>
            <div className="picksList">
              <DraftPicks picks={NCAAPicks} />
            </div>
          </div>
          <DraftGrid results={NCAADraft} />
        </div>
        <div>
          <TeamBrowser teams={this.state.teams} />
        </div>
      </div>
    );
  }
}

export default App;
