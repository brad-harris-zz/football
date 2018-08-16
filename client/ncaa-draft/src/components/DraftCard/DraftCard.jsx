import React, { Component } from 'react';
import './DraftCard.css';
import ClassNames from 'classnames';

class DraftCard extends Component {
    renderIcons() {
        let contents = [];
        for (var conf in this.props.picks) {
            let confDiv = [];
            const key = this.props.name+conf;
            const header = (<h1 key={key}>{conf}</h1>);
            confDiv.push(header);
            var icons = [];
            for (var pick in this.props.picks[conf]) {
                const teamData = this.props.picks[conf][pick];
                const iconDom = (
                    <li key={key+teamData.icon}>
                        <img className='draftIcon' src={'http://www.bradharris.name' + teamData.icon} alt={teamData.name} title={teamData.name} />
                    </li>
                );
                icons.push(iconDom);
            }
            const iconList = (
                <ul key={key+'icons'} className='draftIconList'>
                    {icons}
                </ul>
            );
            confDiv.push(iconList);
            const confDom = (
                <div className='confIcons'>
                    {confDiv}
                </div>
            )
            contents.push(confDom);
        }
        return contents;
    }
    render() {
        return (
            <div className={ClassNames('draftCard', this.props.active ? 'active' : undefined)}>
                <div className='cardHeader'>
                    <h1>{this.props.name}</h1>
                </div>
                <div className={'cardContent'}>
                    {this.renderIcons()}
                    {"\u00a0"}
                </div>
            </div>
        )
    }
}

export {DraftCard};