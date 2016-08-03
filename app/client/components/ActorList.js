
import React from 'react';

import Table from 'react-bootstrap/lib/Table';

export default class ActorList extends React.Component {

  static propTypes = {
    positions: React.PropTypes.array,
    history: React.PropTypes.array,
    detailed: React.PropTypes.bool,
  }

  static defaultProps = {
    labels: [],
    positions: [],
    history: [],
    detailed: false,
  }

  buildRow(actorCase, detailed) {
    var cases, lastChanged;
    if(detailed) {
      cases = [
        <td key="best">{actorCase.bestMean.toFixed(2)}</td>,
        <td key="mid">{actorCase.midMean.toFixed(2)}</td>,
        <td key="worst">{actorCase.worstMean.toFixed(2)}</td>
      ];
      lastChanged = <td>{actorCase.lastChange}</td>
    }

    return (<tr key={actorCase.name}>
        <td>{actorCase.name}</td>
        {cases}
        <td>{actorCase.currentPos.toFixed(2)} %</td>
        {lastChanged}
      </tr>);
  }

  buildHeaders() {
    if(!this.props.detailed){
      return false;
    }
    return (<thead><tr>
        <th>Company</th>
        <th>Best case</th>
        <th>Mid case</th>
        <th>Worst case</th>
        <th>Current</th>
        <th>last change</th>
      </tr></thead>);
  }

  render() {
    var { positions, detailed, history } = this.props;
    var rows = [];

    var cases = computeCases(history, positions)

    for(var i = 1; i < cases.length; i += 1) {
      rows.push(this.buildRow(cases[i], detailed));
    }

    var headers = this.buildHeaders();

    return (
      <Table >
        {headers}
        <tbody>
          {rows}
        </tbody>
      </Table>
      );
  }
}


function computeCases(history, positions){
  var actors = [];
  var labels = positions[0];
  for ( var i = 0; i < labels.length; i += 1) {
    actors.push(defaultActorCase(labels[i]));
  }
  for (var i = 1; i < history.length; i += 1) {
    for (var j = 1; j < labels.length; j += 1) {
      var actor = actors[j];
      var position = positions[i][j];
      if(position !== actor.currentPos) {
        if (position === 0) {
          actors[j] = defaultActorCase(actor.name, history[i][0]);
        } else {
          updateActor(actor, position, history[i]);
        }
      }
    }
  }
  return actors;
}

function updateActor(actor, position, dateData){
  var oldPos = actor.currentPos
  var change = position - oldPos;
  var bestPrice, worstPrice;
  if(change > 0){
    bestPrice = dateData[2];
    worstPrice = dateData[1];
  } else {
    bestPrice = dateData[1];
    worstPrice = dateData[2];
  }
  var midPrice = (bestPrice + worstPrice)/2;

  actor.midMean = calculateNewMean(oldPos, actor.midMean, change, midPrice);
  actor.bestMean = calculateNewMean(oldPos, actor.bestMean, change, bestPrice);
  actor.worstMean = calculateNewMean(oldPos, actor.worstMean, change, worstPrice);
  actor.currentPos = position;
  actor.lastChange = dateData[0];
  return actor;
}

function defaultActorCase(label, date = '-') {
  return {
    name: label,
    currentPos: 0,
    bestMean: 0,
    midMean: 0,
    worstMean: 0,
    lastChange: date,
  };
}

function calculateNewMean(oldPos, oldMean, change, price) {
  return (oldPos*oldMean + change*price)/(oldPos + change);
}


