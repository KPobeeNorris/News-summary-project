var NewsApp = function() {
  this.urlArray = [];
  this.headlineArray = [];
  this.summaryArray = [];
  this.fullArticleArray = [];
};

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

getJSON('http://content.guardianapis.com/search?show-fields=all&api-key=f82b7327-9c62-42a9-a8e5-fb351c498b90').then(function(data) {
  newsApp = new NewsApp();
  var myDiv = document.getElementById('headline');
  var headline = "";
  for (i=0; i < data.response.results.length; i++) {
    var article = data.response.results[i].webTitle;
    headline += "<a href=#" + article + "</a>" + article + "<br>";

    newsApp.headlineArray.push(data.response.results[i].webTitle);
    newsApp.urlArray.push(data.response.results[i].webUrl);
    newsApp.fullArticleArray.push(data.response.results[i].fields.body);
    myDiv.innerHTML = headline;
  }
  var mySumDiv = document.getElementById('summary');
  var summary = "";
    for (var i = 0; i < data.response.results.length; i++) {
      var sumUrl = data.response.results[i].webUrl;
      getJSON('http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=' + sumUrl).then(function(dataSum) {
        newsApp.summaryArray.push(dataSum.sentences);
      });
    }
  }, function(status) { //error detection....
    alert('Something went wrong.');
});

function clickCreateSummary() {
  document
  .getElementById(link)
  .addEventListener("click", function(clickEvent){
    clickEvent.preventDefault();
    summarise(headline);
  });
}

clickCreateSummary();
