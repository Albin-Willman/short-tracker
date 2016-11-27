export default function(history, positions) {
  console.log(history, positions);
  var lastRow = [ ...positions[0] ];
  var actors = [ ...positions[0] ];
  console.log(positions);
  lastRow.fill(0);
  var changes = []
  for(var i = 1; i < positions.length; i += 1) {
    var dateData = positions[i];
    for(var j = 1; j < dateData.length - 1; j += 1) {
      var position = dateData[j];
      var lastPosition = lastRow[j];
      if(position !== lastRow[j]) {
        lastRow[j] = position;
        changes.push({
          position,
          change: position - lastPosition,
          name: actors[j],
          date: dateData[0],
        });
      }
    }
  }
  console.log(changes);
  return changes;
}
