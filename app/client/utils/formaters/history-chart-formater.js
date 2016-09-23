

export default function computeHistoryData(history) {
  if(!history || Object.keys(history).length === 0) {
    return [];
  }
  var labels = ['Date', 'Day low', 'Day high', 'Day close'];
  var data = [];
  for (var date in history) {
    if (history.hasOwnProperty(date)) {
      var dayData = history[date];
      data.push([date, dayData.low, dayData.high, dayData.close]);
    }
  }
  var sortedData = data.sort(Comparator);
  sortedData.unshift(labels);
  return sortedData;
}


function Comparator(a, b) {
  if (a[0] < b[0]) {
    return -1;
  }
  if (a[0] > b[0]) {
    return 1;
  }
  return 0;
}
