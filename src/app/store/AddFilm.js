import { makeAutoObservable, observable } from "mobx";

class AddFilmStore {
  savedFilms = observable([]);

  constructor() {
    makeAutoObservable(this);
  }

  addFilm = (id) => {
    this.savedFilms.push(id);
    console.log("added", this.savedFilms);
  }

}

const addFilmStore = new AddFilmStore();

export default observable(addFilmStore);
