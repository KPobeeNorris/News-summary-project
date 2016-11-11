(function () {

var newsApp = new NewsApp();
newsApp.getNews()
  .then(generateNewsItemLinks)
  .then(listenClicks);
})();
