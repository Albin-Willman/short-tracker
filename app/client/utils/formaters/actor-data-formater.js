export default function buildActorData(history, positions, keyData) {
  var actors = [];
  var labels = positions[0];
  if(!labels) {
    return actors;
  }
  for (var i = 0; i < labels.length; i += 1) {
    actors.push(defaultActorCase(labels[i]));
  }
  computeDetails(actors, history, positions, labels);
  for (i = 1; i < labels.length; i += 1) {
    findLastChange(i, positions, actors);
  }
  for (i = 1; i < labels.length; i += 1) {
    actors[i].key = findKey(keyData, actors[i].name);
  }

  return actors.filter((actor) => {
    return actor.name !== 'Date';
  });
}

function findKey(keyData, name) {
  for(var key in keyData) {
    if(keyData[key].name === name) {
      return key;
    }
  }
  return null;
}

function findLastChange(i, positions, actors) {
  for(var j = positions.length - 1; j > 1; j -= 1) {
    if(positions[j][i] !== positions[j-1][i]) {
      actors[i].lastChanged = positions[j][0];
      actors[i].lastChange = positions[j][i] - positions[j-1][i];
      actors[i].currentPos = positions[j][i];
      return;
    }
  }
  actors[i].lastChanged = positions[1][0];
  actors[i].lastChange = positions[1][i];
  actors[i].currentPos = positions[1][i];
}

function computeDetails(actors, history, positions, labels) {
  for (var i = 1; i < history.length; i += 1) {
    for (var j = 1; j < labels.length; j += 1) {
      evaluateChange(actors, positions, history, i, j);
    }
  }
}

function evaluateChange(actors, positions, history, i, j) {
  var actor = actors[j];
  var position = findDateData(history[i][0], positions, j);
  if(position && position !== actor.currentPos) {
    if (position === 0) {
      actors[j] = defaultActorCase(actor.name, history[i][0]);
    } else {
      updateActor(actor, position, history[i]);
    }
  }
}

function findDateData(date, positions, index) {
  for(var i = 0; i< positions.length; i += 1) {
    if(positions[i][0] === date) {
      return positions[i][index];
    }
  }
}

function updateActor(actor, position, dateData) {
  var oldPos = actor.currentPos;
  var change = position - oldPos;
  var bestPrice, worstPrice;
  if(change > 0) {
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
  actor.lastChange = change;
  actor.lastChanged = dateData[0];
  return actor;
}

function defaultActorCase(label, date = '-') {
  return {
    name: label,
    currentPos: 0,
    bestMean: 0,
    midMean: 0,
    worstMean: 0,
    lastChange: 0,
    lastChanged: date,
  };
}

function calculateNewMean(oldPos, oldMean, change, price) {
  return (oldPos*oldMean + change*price)/(oldPos + change);
}
