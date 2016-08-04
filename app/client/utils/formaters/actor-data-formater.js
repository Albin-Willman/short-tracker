

export default function buildActorData(history, positions, detailed) {
  var actors = [];
  var labels = positions[0];
  for (var i = 0; i < labels.length; i += 1) {
    actors.push(defaultActorCase(labels[i]));
  }
  if(detailed) {
    computeDetails(actors, history, positions, labels);
  } else {
    var lastRow = positions[positions.length - 1];
    for (i = 1; i < labels.length; i += 1) {
      actors[i].currentPos = lastRow[i];
    }
  }
  return actors;
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
  var position = positions[i][j];
  if(position !== actor.currentPos) {
    if (position === 0) {
      actors[j] = defaultActorCase(actor.name, history[i][0]);
    } else {
      updateActor(actor, position, history[i]);
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
