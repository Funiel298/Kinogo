import { makeAutoObservable, observable } from "mobx";

class AddFilmStore {
  savedFilms = observable([])

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
