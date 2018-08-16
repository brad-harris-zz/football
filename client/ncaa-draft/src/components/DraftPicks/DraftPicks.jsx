import React, { Component } from 'react';
import './DraftPicks.css';

class DraftPicks extends Component {
    keyCounter = 1000;
    getKey() {
      return this.keyCounter++;
    }
    render() {
        let picks = [];
        for (var pick in this.props.picks) {
            const line = this.props.picks[pick];
            const key = 'pick' + pick;
            const dom = (<li key={'li'+key}>
                <span className='teamPick' key={'team'+key}>{line.team}</span>
                <span className='picker' key={'picker'+key}>{line.name}</span>
            </li>);
            picks.push(dom);
        }
        return (
            <div className='picks'>
                <ol>{picks}</ol>
            </div>
        );
    }
}

export {DraftPicks};