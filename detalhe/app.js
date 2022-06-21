let API_KEY = '6fa8e52a1f475c9f3e9f38a375e50a25';
let api_base_url = 'https://api.themoviedb.org/3/';
let image_base_url = 'https://image.tmdb.org/t/p/w1280';

const params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
let query = params.movie;

function showSearch()
{
    let divScreen = document.getElementById('movie-detail');
    let divBackground = document.getElementById('backround-blur');
    let data = JSON.parse(this.responseText);
    let text = '';
    console.log(data)
    text = `
    <div id="movie">
        <img id="movie-poster" src="${image_base_url}${data.poster_path}" alt="${data.title} Poster" height="450" width="300" title="${data.title} Poster">
        <h1 id="movie-title" style="color: white;">${data.title}</h1>
        <h4 id="movie-date" style="color: white;">Data de Lançamento: ${data.release_date}</h4>
        <h4 id="movie-rating" style="color: white;">Nota media: ${data.vote_average*10}%</h4>
        <h5 id="movie-sinopse" style="color: white;">Sinopse: ${data.overview}</h5>
    </div>
    `;

    divScreen.innerHTML = text;

    text = `<div class="backround-blur" style="background-image: url('${image_base_url}${data.backdrop_path}')"></div>`;

    divBackground.innerHTML = text;
}

function searchOnLoad()
{
    let xhr = new XMLHttpRequest();
    xhr.onload = showSearch;
    xhr.open('GET', `${api_base_url}movie/${query}?api_key=${API_KEY}&language=pt-BR`);
    xhr.send();
    console.log(query);
}

window.onload = searchOnLoad();