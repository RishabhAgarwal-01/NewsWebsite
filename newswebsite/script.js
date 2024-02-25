const apikey= '' //Your apikey
const blogcontainer = document.getElementById("blog-container");
const searchField= document.getElementById("search-input");
const searchButton= document.getElementById("search-button");


//fetching random news
async function fetchRandomNews(){
    try {
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apikey}`
        const response = await fetch(apiUrl)
        const data= await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching random news", error)
        return []
    }
}

//seaerch button function
searchButton.addEventListener("click", async ()=>{
    const query= searchField.value.trim();
    if(query !== ""){
        try {
            const article= await fetchNewsQuery(query);
            const articles = article.filter((element)=> element.urlToImage !== '');
            displayBlogs(articles);
        } catch (error) {
            console.log("error dispatching news by query", error);
        }
    }
});


//fetching only searched matched news
async function fetchNewsQuery(uery){
    try {
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apikey}`
        const response = await fetch(apiUrl)
        const data= await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching random news", error)
        return [];
    }
}


//dynamically displaying cards
function displayBlogs(articles){
       blogcontainer.innerHTML="";

        articles.forEach(article => {
        const blogCard= document.createElement("div");
        blogCard.classList.add("blog-card");
        const img=document.createElement("img")
        img.src= article.urlToImage;
        img.alt=article.title;
        const title=document.createElement("h2")
        const truncatedTitle= article.title.length >30 ? article.title.slice(0.30)+"...." :article.title;
        title.textContent= truncatedTitle;
        const description=document.createElement("p");
        description.textContent = article.description;
        
        const truncatedDes = article.title.description >120 ? article.description.slice(120)+"...." :article.description;
        description.textContent = truncatedDes;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        
        blogCard.addEventListener("click", ()=>{
            window.open(article.url, "_blank");
        });
        blogcontainer.appendChild( blogCard);

      });
}

//calling the random news function every time the window loads or no search is made
(async ()=>{
    try {
        const articles= await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.log("Error fetching random news", error);
    }
})();
