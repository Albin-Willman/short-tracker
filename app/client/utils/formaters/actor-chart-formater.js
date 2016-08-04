export default function computeActorData(actors) {
  var rows = [];
  rows.push(buildLabels(actors));
  var allDates = findAllDates(actors);

  var lastRow = new Array(Object.keys(actors).length + 1);
  lastRow.fill(0);
  for (var i = 0; i < allDates.length; i += 1) {
    var row = buildRow(actors, allDates[i], lastRow);
    rows.push(row);
    lastRow = row;
  }
  return rows;
}


function buildRow(actors, date, lastRow) {
  var row = [];

  for (var actor in actors) {
    if (actors.hasOwnProperty(actor)) {
      var value = actors[actor].positions[date];
      if(typeof value === 'undefined') {
        value = lastRow[row.length + 1];
      }
      row.push(value);
    }
  }
  row.push(sumArray(row));
  row.unshift(date);
  return row;
}

function buildLabels(actors) {
  var labels = ['Date'];
  for (var actor in actors) {
    if (actors.hasOwnProperty(actor)) {
      labels.push(actors[actor].name);
    }
  }
  labels.push('Total');
  return labels;
}

function sumArray(row) {
  return row.reduce(function (pv, cv) {
    return pv + cv;
  }, 0);
}

function findAllDates(actors) {
  var res = [];
  for(var actor in actors) {
    if (actors.hasOwnProperty(actor)) {
      res = res.concat(Object.keys(actors[actor].positions));
    }
  }
  return res.filter((value, index, self) => {
    return self.indexOf(value) === index;
  }).sort();
}
