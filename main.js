const API_KEY = "5f7edd6a46bd439db22a6919970cf2a3";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("Career"));

function reload() {
    window.location.reload();
}



async function fetchNews(query) {
    try {
        console.log("Fetching news for query:", query);
        const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apikey=5f7edd6a46bd439db22a6919970cf2a3`);
        console.log("API Response:", res);

        if (res.ok) {
            const data = await res.json();

            if (data.articles) {
                console.log("Data from API:", data);
                bindData(data.articles);
            } else {
                console.error("Invalid or missing 'articles' data in API response:", data);
            }
        } else {
            console.error("Failed to fetch news. API returned an error:", res.status, res.statusText);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}


function bindData(articles) {
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = "";

    if (Array.isArray(articles)) {  // Check if 'articles' is an array
        articles.forEach(article => {
            if (!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardContainer.appendChild(cardClone);
        });
    } else {
        console.error("Invalid or undefined 'articles' data:", articles);
    }
}



function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})