let API_KEY = '6fa8e52a1f475c9f3e9f38a375e50a25';
let api_base_url = 'https://api.themoviedb.org/3/';
let image_base_url = 'https://image.tmdb.org/t/p/w1280';

const params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
let query = params.search;

function showSearch()
{
    let divScreen = document.getElementById('movie');
    let text = '';
    let dataList = JSON.parse(this.responseText);

    for(i=0; i< dataList.results.length; i++){
        let data = dataList.results[i];
        console.log(data[i]);
        if(data.poster_path != null)
        {
        text += `
        <div id="movie" class="col-2">
            <a href="../detalhe/?movie=${data.id}">
                <div class="card shadow-sm" style="background-color: rgba(25,26,28);">                
                    <img class="cardImg" src="${image_base_url}${data.poster_path}">
                    <div class="card-body">
                        <h3 class="card-title" style="color: white;">${data.title}</h3>
                        <p class="card-text" style="overflow: hidden; height: 60px; color: white;">${data.release_date}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group"></div>
                        </div>
                    </div>                
                </div>
            </a>
        </div>
        `;
        }
    }

    divScreen.innerHTML = text;
}

function searchOnLoad()
{
    let xhr = new XMLHttpRequest();
    xhr.onload = showSearch;
    xhr.open('GET', `${api_base_url}search/movie?api_key=${API_KEY}&query=${query}`);
    xhr.send();
    console.log(query);
}

function searchStart()
{
    let query = document.getElementById('search-text').value;

    window.location.replace(`pesquisa/?search=${query}}`);
}

window.onload = searchOnLoad();
document.getElementById('search-btt').addEventListener('click', searchStart);
