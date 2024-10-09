const API_KEY = "f3668b84f7874bccae98818ff807578a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const category = event.target.getAttribute('data-category'); 
        fetchNews(category); 
    });
});


const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const searchQuery = document.getElementById('searchInput').value; 
    if (searchQuery) {
        fetchNews(searchQuery);
    }
});

// Function to fetch news from the API
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json(); 
        if (data.articles) {
            bindData(data.articles); 
        } else {
            console.error("No articles found.");
        }
    } catch (error) {
        console.error("Error fetching news:", error); 
    }
}


function bindData(articles) {
    const mainBox = document.getElementById('mainBox');
    const templateNewsCard = document.getElementById('template-news-card');

    mainBox.innerHTML = ""; 

    articles.forEach(article => {
        if (!article.urlToImage) return;  

        const cardClone = templateNewsCard.content.cloneNode(true);

        
        const img = cardClone.querySelector('.card-img-top');
        const title = cardClone.querySelector('.card-title');
        const description = cardClone.querySelector('.card-text');
        const newSource = cardClone.querySelector('.news-source');
        const readMore = cardClone.querySelector('.read-more-btn');

        img.src = article.urlToImage;
        title.innerText = article.title;
        description.innerText = article.description || "No description available";
        newSource.innerText = `${article.source.name} • ${new Date(article.publishedAt).toLocaleString()}`;
        readMore.href = article.url;

        
        readMore.addEventListener('click', (event) => {
            event.preventDefault();
            window.open(article.url, '_blank'); 
        });

        mainBox.appendChild(cardClone); 
    });
}
