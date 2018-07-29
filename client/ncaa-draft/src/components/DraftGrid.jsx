import React, { Component } from 'react';
import './components.css';

class DraftGrid extends Component {
  keyCounter = 0;
  getKey() {
    return this.keyCounter++;
  }
  renderHeader() {
    var columns = [(<th key={this.getKey()}></th>)];
    for(var row in this.props.results) {
      var rowHeader = (<th key={this.getKey()}>{this.props.results[row].name}</th>)
      columns.push(rowHeader);
    }
    return (<tr id='header' key={this.getKey()}>{columns}</tr>);
  }
  renderBody() {
    var rows = [];
    for (var conf in this.props.results[0].picks) {
      var columns = [];
      var confCell = (<td key={this.getKey()} className='confColumn'>{conf}</td>)
      columns.push(confCell);
      for (var user in this.props.results) {
        var contents = [];
        for (var pick in this.props.results[user].picks[conf]) {
          const text = this.props.results[user].picks[conf][pick];
          var dom = (<span key={this.getKey()}>{text}<br/></span>);
          contents.push(dom);
        }
        var cell = (<td key={this.getKey()}>{contents}</td>)
        columns.push(cell);
      }
      var row = (<tr key={this.getKey()}>{columns}</tr>)
      rows.push(row);
    }
    return rows;
  }
  render() {
    return (
      <div className="picks">
        <table>
          <thead>{this.renderHeader()}</thead>
          <tbody>{this.renderBody()}</tbody>
        </table>
      </div>
    )
  }
}

export {DraftGrid};