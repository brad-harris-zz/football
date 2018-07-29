import React, { Component } from 'react';
import './components.css';

class TeamBrowser extends Component {
    renderTeams() {
        let confs = [];
        for(var conf in this.props.teams) {
            let teams=[];
            for(var team in this.props.teams[conf]) {
                const teamName = this.props.teams[conf][team];
                const dom = (<li key={teamName}>{teamName}</li>)
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