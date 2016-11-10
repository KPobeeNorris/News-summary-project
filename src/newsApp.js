var NewsApp = function () {
  this.summarisedArticle = "";
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

getJSON('https://content.guardianapis.com/search?api-key=f82b7327-9c62-42a9-a8e5-fb351c498b90').then(function(data) {
    // alert('Your Json result is:  ' + data);
    var myDiv = document.getElementById('headline');
    var headline = "";
    for (i=0; i < data.response.results.length; i++) {
      var article = data.response.results[i].webTitle;
      var link = data.response.results[i].webUrl;
      headline += "<a id=link" + i + " href=#" + article + "</a>" + article + "<br>";
      myDiv.innerHTML = headline;
    }
}, function(status) { //error detection....
  alert('Something went wrong.');
});

NewsApp.prototype.summarise = function(link) {
  var summarisedArticle = "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + link;
  return summarisedArticle; 
};

function clickCreateSummary() {
  document
  .getElementById(link)
  .addEventListener("click", function(clickEvent){
    clickEvent.preventDefault();
    summarise(headline);
  });
}

clickCreateSummary();
summarise(link);
