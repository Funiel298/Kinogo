import { makeAutoObservable } from "mobx";

class AddFilmStore {
  savedFilms: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFilm(id: number) {
    this.savedFilms.push(id);
    console.log("added");
  }
}

const addFilmStore = new AddFilmStore();

export default addFilmStore;
