import React, { Component } from 'react';
import './App.css';
import './StartDraft.css';
import App from './App';

class StartDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'draftOrder': ['', '', '', '', ''],
      'draftStarted': false
    };
  }
  startDraft() {
    const draftOrder = this.state.draftOrder;
    console.log(draftOrder);
    if (
      draftOrder.includes('Adam') &&
      draftOrder.includes('Brad') &&
      draftOrder.includes('Brian') &&
      draftOrder.includes('Chad') &&
      draftOrder.includes('Mike')
    ) {
      this.setState({'draftStarted': true});
      return;
    }
    var names = ['Adam', 'Brad', 'Brian', 'Chad', 'Mike'];
    for(var i=5; i>0; i--) {
      let index = Math.floor(Math.random() * i);
      let name = names[index];
      names[index] = names[i-1];
      names[i-1] = name;
    }
    this.setState({
      'draftStarted': true,
      'draftOrder': names
    });
  }
  changeCallback(event) {
    const {name, value} = event.target;
    let draftOrder = this.state.draftOrder;
    switch(name) {
      case 'one':
        draftOrder[0] = value;
      case 'two':
        draftOrder[1] = value;
      case 'three':
        draftOrder[2] = value;
      case 'four':
        draftOrder[3] = value;
      case 'five':
        draftOrder[4] = value;
    }
    this.setState(draftOrder);


  }
  render() {
    if (this.state.draftStarted) {
      return (<App draftOrder={this.state.draftOrder} />)
    }
    return (
      <div className='StartDraftApp'>
        <div className='draftOrder'>
          <h1>Set Custom Draft Order</h1>
          <div className='inputField'>
            1. <input id='firstPick' name='one' type='text' onBlur={this.changeCallback.bind(this)} />
          </div>
          <div className='inputField'>
            2. <input id='secondPick' name='two' type='text' onBlur={this.changeCallback.bind(this)} />
          </div>
          <div className='inputField'>
            3. <input id='thirdPick' name='three' type='text' onBlur={this.changeCallback.bind(this)} />
          </div>
          <div className='inputField'>
            4. <input id='fourthPick' name='four' type='text' onBlur={this.changeCallback.bind(this)} />
          </div>
          <div className='inputField'>
            5. <input id='fifthPick' name='five' type='text' onBlur={this.changeCallback.bind(this)} />
          </div>
        </div>
        <div className='startButton'>
          <button className='startDraft' onClick={this.startDraft.bind(this)}>Start Draft</button>
        </div>
      </div>
    );
    // return (
    //   <div className="App">
    //     <input />
    //     <button className='startDraft' onClick={this.startDraft.bind(this)}>Start Draft</button>
    //   </div>
    // )
  }
}

export default StartDraft;