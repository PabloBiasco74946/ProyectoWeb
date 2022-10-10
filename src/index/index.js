const API_MOVIE_URL = 'https://api.themoviedb.org/3';
const API_MOVIE_KEY_V3 = '44c9a4090281b266003fa81606d73c1f';
const API_MOVIE_KEY_V4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGM5YTQwOTAyODFiMjY2MDAzZmE4MTYwNmQ3M2MxZiIsInN1YiI6IjYzMDUxZjU1MzBmNzljMDA5ODc2ZTdkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgTIeFu0Zl0qYhanl6tQ1d40Q_typPRc1Lvwq-gU8OA';
const API_MOVIE_LANGUAGE = 'es-MX';

const getPopularMovies = async (pagina = 1) => {
  const url = `${API_MOVIE_URL}/movie/popular?api_key=${API_MOVIE_KEY_V3}&language=${API_MOVIE_LANGUAGE}&page=${pagina}`;

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
};

const buildCatalogue = async (pagina) => {
  try {
    const popularMovies = await getPopularMovies(pagina);
    const { page, results, total_pages, total_results } = popularMovies;

    const movieContainer = document.querySelector('.contenedor');
    const templateCard = document.getElementById('template-card').content;
    const fragment = document.createDocumentFragment();

    results.forEach((movie) => {
      const clone = templateCard.cloneNode(true);
      clone
        .querySelector('.poster')
        .setAttribute('src', `https://image.tmdb.org/t/p/w500/${movie.poster_path}`);

      clone.querySelector('.titulo').textContent = movie.title;

      fragment.appendChild(clone);
    });

    movieContainer.appendChild(fragment);
  } catch (error) {
  } finally {
  }
};
