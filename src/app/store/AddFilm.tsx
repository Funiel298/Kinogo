// AddFilmStore.js

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

  getSavedFilms() {
    return this.savedFilms.slice();
  }
}

const addFilmStore = new AddFilmStore();

export default addFilmStore;
