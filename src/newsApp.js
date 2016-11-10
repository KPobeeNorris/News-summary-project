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
      headline += data.response.results[i].webTitle + "<br>"
      myDiv.innerHTML = headline;
    }
}, function(status) { //error detection....
  alert('Something went wrong.');
});
