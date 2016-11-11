(function () {

  // MODELS -----------------------------------------------------------

  // News app.

  function NewsApp() {
    this.news = [];
  }

  NewsApp.prototype.getNews = function () {
    var newsApiUrl = 'http://content.guardianapis.com/search?show-fields=all&api-key=f82b7327-9c62-42a9-a8e5-fb351c498b90';
    return getJSON(newsApiUrl).then(
      this.onNewsSuccess.bind(this),
      this.onNewsError.bind(this)
    );
  };

  NewsApp.prototype.addNewsItem = function (data, i) {
    var newsItem = new NewsItem({
      title: data.webTitle,
      url: data.webUrl,
      body: data.fields.body,
      image: data.fields.thumbnail
    });
    // Add news item to collection.
    this.news.push(newsItem);
    // Fetch summary asynchronously.
    newsItem.getSummary();
  };

  NewsApp.prototype.onNewsSuccess = function (data) {
    data.response.results.forEach(this.addNewsItem.bind(this));
  };

  NewsApp.prototype.onNewsError = function () {
    alert('Could not fetch news.');
  };

  // News item.

  function NewsItem(data) {
    this.title = data.title;
    this.url = data.url;
    this.summary = data.title; // temporary
    this.body = data.body;
    this.image = data.image
  }

  NewsItem.prototype.getSummary = function () {
    var summaryApiUrl = 'http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=' + this.url;
    return getJSON(summaryApiUrl).then(
      this.onSummarySuccess.bind(this),
      this.onSummaryError.bind(this)
    );
  };

  NewsItem.prototype.onSummarySuccess = function (summary) {
    this.summary = summary.sentences;
  };

  NewsItem.prototype.onSummaryError = function (status) {
    console.error('Could not fetch summary: ' + status);
  };

  // VIEWS ------------------------------------------------------------

  var summary = document.getElementById('summary');
  var headlines = document.getElementById('headlines');

  var fullArticle = document.getElementById('fullArticle');
  var fullBodyId = document.getElementById('linkForFull');

  function generateNewsItemLinks() {
    newsApp.news.forEach(function (newsItem, i) {
      // Add news item link to headlines.
      headlines.appendChild(generateNewsItemLink(newsItem, i));
      headlines.appendChild(generateNewsItemImage(newsItem, i));
    });
  }

  function generateNewsItemLink(newsItem, i) {
    var listItem = document.createElement('li');

    var link = document.createElement('a');
    link.id = 'link' + i;
    link.className = 'link';
    link.href = '#';

    var linkText = document.createTextNode(newsItem.title);

    link.appendChild(linkText);
    listItem.appendChild(link);

    return listItem;
  }

  function generateNewsItemImage(newsItem, i) {
    var listImage = document.createElement('img');
    var link = document.getElementsByTagName('a');


    listImage.src = this.image;
    link.appendChild(listImage);

    return listImage;
  }

  function onNewsItemClick(evt) {
    evt.preventDefault();
    var target = evt.target;
    var targetId = target.id;
    var targetIndex = parseInt(targetId.replace('link', ''), 10);
    var newsItem = newsApp.news[targetIndex];
    summary.innerHTML = newsItem.summary;
    fullBodyId.id = targetIndex
    fullArticle.innerHTML = ''
  }

  function listenClicks() {
    headlines.addEventListener('click', onNewsItemClick);
    fullBodyId.addEventListener('click', onSummaryItemClick);
  }

  //////////////////////////

  function onSummaryItemClick(evt) {
    evt.preventDefault();
    var target = evt.target;
    var targetId = target.id;
    var targetIndex = parseInt(targetId.replace('link', ''), 10);
    var newsItem = newsApp.news[targetIndex];
    fullArticle.innerHTML = newsItem.body;
  }


  // HELPERS ----------------------------------------------------------

  function getJSON(url) {
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
  }

  // EXECUTION --------------------------------------------------------

  var newsApp = new NewsApp();
  newsApp.getNews()
    .then(generateNewsItemLinks)
    .then(listenClicks);
})();
