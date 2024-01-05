// fetchMoviesByGenre.js
export default async function fetchMoviesByGenre(genre, type, rating, page) {
  
  const response = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=f2e3189ddbb0312728c6ef6a85f9dede&with_genres=${genre}&vote_average.gte=${rating}.0&vote_average.lte=${rating}.9&page=${page}`);
  const data = await response.json();
  return data.results;
}










// f2e3189ddbb0312728c6ef6a85f9dede