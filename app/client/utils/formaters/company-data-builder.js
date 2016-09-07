import computeActorData from 'utils/formaters/actor-chart-formater';

export default function buildCompanyData(company) {
  var actorData = computeActorData(company.actors);
  var total30DaysAgo = findTotal30DaysAgo(actorData);
  var currentTotal = getCurrentTotal(actorData);
  return { ...company,
    total: currentTotal,
    change30Days: currentTotal - total30DaysAgo,
  };
}

function getCurrentTotal(actorData) {
  var lastDate = actorData[actorData.length - 1];
  return lastDate[lastDate.length - 1];
}

function findTotal30DaysAgo(actorData) {
  var today = new Date();
  var priorDate = new Date(new Date().setDate(today.getDate()-30));

  for(var i = actorData.length - 1; i > 0; i -= 1) {
    var dateData = actorData[i];
    if(Date.parse(dateData[0]) <= priorDate) {
      return dateData[dateData.length - 1];
    }
  }
  return 0.0;
}
