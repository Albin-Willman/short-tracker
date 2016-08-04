

export default function computeHistoryData(history) {
  if(!history.data || history.data === 'No history') {
    return [];
  }
  var historyData = history.data.history;
  var data = [['Date', 'Day low', 'Day high']];
  for (var date in historyData) {
    if (historyData.hasOwnProperty(date)) {
      var dayData = historyData[date];
      data.push([date, dayData.low, dayData.high]);
    }
  }
  return data;
}
