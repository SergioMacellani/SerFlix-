let API_KEY = '6fa8e52a1f475c9f3e9f38a375e50a25';
let api_base_url = 'https://api.themoviedb.org/3/';
let image_base_url = 'https://image.tmdb.org/t/p/w1280';
let urlPage = 'file:///C:/Users/sergi/Desktop/Pesquisa-Serflix%2B/';

function getLatest()
{
    let xhr = new XMLHttpRequest();
    xhr.onload = latestMovies;
    xhr.open('GET', `${api_base_url}movie/now_playing?api_key=${API_KEY}&language=pt-BR`);
    xhr.send();
}

function latestMovies()
{
    let divScreen = document.getElementById('movie-container');
    let text = '';
    let dataList = JSON.parse(this.responseText);
    console.log(dataList);

    for(let i = 0; i < 3; i++)
    {
        let data = dataList.results[i];
        text += `
        <div id="latest-card" class="card" style="width: 18rem;">
            <a href="detalhe/?movie=${data.id}">
                <img id="latest-poster" class="card-img-top" src="${image_base_url}${data.backdrop_path}" alt="${data.title} Poster">
                <div class="card-body">
                    <h5 id="latest-title" class="card-title">${data.title}</h5>
                    <span id="latest-overview" class="card-text">${data.overview}</span>
                </div>
            </a>
        </div>
        `;
    }

    divScreen.innerHTML = text;
}

function searchStart()
{
    let query = document.getElementById('search-text').value;

    window.location.replace(`pesquisa/?search=${query}}`);
}

window.onload = getLatest();
document.getElementById('search-btt').addEventListener('click', searchStart);
