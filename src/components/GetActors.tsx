export default async function fetchActors(page : number ) {
  
    const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=f2e3189ddbb0312728c6ef6a85f9dede&page=${page}`);
    const data = await response.json();
    return data.results;
  }