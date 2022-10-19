const API_MOVIE_URL = 'https://api.themoviedb.org/3';
const API_MOVIE_KEY_V3 = '44c9a4090281b266003fa81606d73c1f';
const API_MOVIE_KEY_V4 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGM5YTQwOTAyODFiMjY2MDAzZmE4MTYwNmQ3M2MxZiIsInN1YiI6IjYzMDUxZjU1MzBmNzljMDA5ODc2ZTdkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgTIeFu0Zl0qYhanl6tQ1d40Q_typPRc1Lvwq-gU8OA';
const API_MOVIE_LANGUAGE = 'es-AR';
let filter_new = ''
const Filter_types = {
  Valoradas: 'valoradas',
  Populares: 'populares',
  GenAccion: 'accion',
  GenAventura: 'aventura',
  GenComedia:'comedia',
  GenDrama:'drama',
  GenTerror:'terror',
}


const getPopularMovies = async (pagina = 1) => {
  

  switch(filter_new){
    case(Filter_types.Valoradas): 
      url = `${API_MOVIE_URL}/movie/top_rated?api_key=${API_MOVIE_KEY_V3}&${API_MOVIE_LANGUAGE}&${pagina}` 
      break;
    case(Filter_types.Populares):
      url = `${API_MOVIE_URL}/movie/popular?api_key=${API_MOVIE_KEY_V3}&${API_MOVIE_LANGUAGE}&${pagina}`
      break;
    case(Filter_types.GenAccion):
      url = `${API_MOVIE_URL}/discover/movie?with_genres=28&language=es-AR&api_key=${API_MOVIE_KEY_V3}&${pagina}`
      break;
    case(Filter_types.GenAventura):
      url = `${API_MOVIE_URL}/discover/movie?with_genres=12&language=es-AR&api_key=${API_MOVIE_KEY_V3}&${pagina}`
      break;
    case(Filter_types.GenComedia):
      url = `${API_MOVIE_URL}/discover/movie?with_genres=35&language=es-AR&api_key=${API_MOVIE_KEY_V3}&${pagina}`
      break;
    case(Filter_types.GenDrama):
      url = `${API_MOVIE_URL}/discover/movie?with_genres=18&language=es-AR&api_key=${API_MOVIE_KEY_V3}&${pagina}`
      break;
    case(Filter_types.GenTerror):
      url = `${API_MOVIE_URL}/discover/movie?with_genres=27&language=es-AR&api_key=${API_MOVIE_KEY_V3}&${pagina}`
      break;

    default:
      url = `${API_MOVIE_URL}/movie/upcoming?api_key=${API_MOVIE_KEY_V3}&${API_MOVIE_LANGUAGE}&${pagina}`
      const titulo = document.getElementById("titulo_filtro")
      titulo.innerText = "Próximos estrenos:"
      break;
  }

    
const data = await fetch(url, {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referer, *no-referrer-when
});
const popularMovies = await data.json();
return popularMovies;


  }

  function changefilter(filter) {
    if (filter == 1)
    { 
      filter_new = Filter_types.Valoradas
      const titulo = document.getElementById("titulo_filtro")
      titulo.innerText = "Pelis mejor valoradas:"
      buildCatalogue()

    }
    else if(filter == 2)
    {
      filter_new = Filter_types.Populares
      const titulo = document.getElementById("titulo_filtro")
      titulo.innerText = "Pelis más populares:"
      buildCatalogue()
    }

    else if(filter == 3)
    {
      filter_new = Filter_types.GenAccion
      const titulo = document.getElementById("titulo_filtro")
      titulo.innerText = "Pelis de acción:"
      buildCatalogue()
    }

    else if(filter == 4)
    {
      filter_new = Filter_types.GenAventura
      const titulo = document.getElementById("titulo_filtro")
      titulo.innerText = "Pelis de aventura:"
      buildCatalogue()
    }

    else if(filter == 5)
    {
      filter_new = Filter_types.GenComedia
      const titulo = document.getElementById("titulo_filtro")
      titulo.innerText = "Pelis de comedia:"

      buildCatalogue()
    }

    else if(filter == 6)
    {
    
      filter_new = Filter_types.GenDrama
      const titulo = document.getElementById("titulo_filtro")
      titulo.innerText = "Pelis de drama:"

      buildCatalogue()
    }

    else if(filter == 7)
    {
    
      filter_new = Filter_types.GenTerror
      const titulo = document.getElementById("titulo_filtro")
      titulo.innerText = "Pelis de terror:"

      buildCatalogue()
    }


  }
  
const buildCatalogue = async () => {
  try {

    const movieContainer = document.querySelector('.contenedor');
    while (movieContainer.firstChild){
      movieContainer.removeChild(movieContainer.lastChild)
    }
    const popularMovies = await getPopularMovies(1);
    const { page, results, total_pages, total_results } = popularMovies;
    const templateCard = document.getElementById('template-card').content;
    const fragment = document.createDocumentFragment();

    results.forEach((movie) => {
      const clone = templateCard.cloneNode(true);
      clone
        .querySelector('.poster')
        .setAttribute('src', `https://image.tmdb.org/t/p/w500/${movie.poster_path}`);

      clone.querySelector('.titulo').textContent = movie.title;
      console.log(movie.title);
      fragment.appendChild(clone);
    });

    movieContainer.appendChild(fragment);
  } catch (error) {
  } finally {
  }

}