import { makeAutoObservable, observable } from "mobx";

class AddFilmStore {
  savedFilms = observable([
    {id:104088, name: 'Mr. Fox and Miss Rose',image: 'https://image.tmdb.org/t/p/w500//9YncW006K0NFzzAxp5Kbx6yq9Yo.jpg', ranking: 9.0, link: '/Series/104088'}
  ])

  constructor() {
    makeAutoObservable(this)
  }

  addFilm = (film) => {
    const index = this.savedFilms.findIndex((savedFilm) => savedFilm.id === film.id);
    if (index !== -1) {
      this.savedFilms.splice(index, 1)
      console.log("removed", film.id)
    } else {
      this.savedFilms.push(film)
      console.log("added", film.id)
    }
  }
  
}
const addFilmStore = new AddFilmStore()

export default addFilmStore
