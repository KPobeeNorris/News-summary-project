var summary = document.getElementById('summary');
var headlines = document.getElementById('headlines');

var fullArticle = document.getElementById('fullArticle');
var fullBodyId = document.getElementById('linkForFull');

function generateNewsItemLinks() {
  newsApp.news.forEach(function (newsItem, i) {
    // Add news item link to headlines.
    headlines.appendChild(generateNewsItemLink(newsItem, i));
  });
}

function generateNewsItemLink(newsItem, i) {
  var listItem = document.createElement('li');
  var listImage = document.createElement('img');
  var link = document.createElement('a');
  link.id = 'link' + i;
  link.className = 'link';
  link.href = '#';

  listImage.src = newsItem.image;

  var linkText = document.createTextNode(newsItem.title);

  link.appendChild(linkText);
  listItem.appendChild(link);
  listItem.appendChild(listImage);

  return listItem;
}


function onNewsItemClick(evt) {
  evt.preventDefault();
  var target = evt.target;
  var targetId = target.id;
  var targetIndex = parseInt(targetId.replace('link', ''), 10);
  var newsItem = newsApp.news[targetIndex];
  summary.innerHTML = newsItem.summary;
  fullBodyId.id = targetIndex;
  fullArticle.innerHTML = '';
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
