

export default function computeHistoryData(history) {
  if(!history.data || history.data === 'No history') {
    return [];
  }
  var historyData = history.data.history;
  var labels = ['Date', 'Day low', 'Day high'];
  var data = [];
  for (var date in historyData) {
    if (historyData.hasOwnProperty(date)) {
      var dayData = historyData[date];
      data.push([date, dayData.low, dayData.high]);
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
