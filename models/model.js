(function () {

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
  this.image = data.image;
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

var newsApp = new NewsApp();
newsApp.getNews()
  .then(generateNewsItemLinks)
  .then(listenClicks);
})();
