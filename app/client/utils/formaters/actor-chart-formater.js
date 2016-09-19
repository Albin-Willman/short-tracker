export default function computeActorData(actors) {
  console.log(actors);
  var rows = [];
  if(Object.keys(actors).length === 0) {
    return rows;
  }
  rows.push(buildLabels(actors));
  var allDates = findAllDates(actors);

  var lastRow = [];
  for(var i = 0; i < Object.keys(actors).length + 1; i += 1) {
    lastRow.push(0);
  }
  for (var j = 0; j < allDates.length; j += 1) {
    var row = buildRow(actors, allDates[j], lastRow);
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
