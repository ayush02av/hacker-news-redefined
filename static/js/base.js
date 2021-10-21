const articlesContainer = document.getElementById('feed');

const baseUrl = "https://hacker-news.firebaseio.com/v0/";
const extra = ".json?print=pretty";

function generate_url(endpoint){
	return baseUrl + endpoint + extra
}

var articlesId = [];
var articles = [];

axios({
	method: "get",
	url: generate_url('topstories'),
})
.then(function(response){articlesId = response.data; loadArticles();})
.catch(function(error){console.log(error);})

function loadArticles(numberOfArticlesToBeLoaded=10){
	let articleLoadLimit = articles.length + numberOfArticlesToBeLoaded;

	if(articleLoadLimit > articlesId.length){ articleLoadLimit=articlesId.length; }

	for(i=articles.length; i<articleLoadLimit; i++){
		axios({
			method: "get",
			url: generate_url('item/'+articlesId[i]),
		})
		.then(function(response){
			articles.push(response.data);

			var article = document.createElement("div");
			article.classList.add("small-inner-section");

			var articleHeading = document.createElement("h3");
			articleHeading.classList.add("heading");
			articleHeading.innerHTML = response.data.title + " | <br>By: " + response.data.by;

			var articleLink = document.createElement("a");
			articleLink.innerHTML = response.data.url;
			articleLink.href = response.data.url;
			articleLink.setAttribute('target', '_blank');

			article.appendChild(articleHeading);
			article.appendChild(articleLink);

			articlesContainer.appendChild(article);
		})
		.catch(function(error){ console.log(error); })
	}
}