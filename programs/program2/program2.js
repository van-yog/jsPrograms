"use strict";

let FavoriteFilm = {
  filmName: "Lord Of The Ring",
  filmDirector: "Piter Jackson",
  filmYear: 2001,
  filmOscar: true,
  filmRate: 5
};

// Elements for Show and Hide blocks 
let elem = document.getElementById("editFavoriteFilm");
let elem2 = document.getElementById("yourFilm");

function editFavoriteFilm() {
  elem.style.display = "block";
  elem2.style.display = "none";
}

function saveFavoriteFilm() {
  FavoriteFilm.filmName = document.form__film.filmName.value;
  FavoriteFilm.filmDirector = document.form__film.filmDirector.value;
  FavoriteFilm.filmYear = document.form__film.filmYear.value;

  if (document.form__film.filmOscarYes.checked === true) {
    FavoriteFilm.filmOscar = true;
  } else {
    FavoriteFilm.filmOscar = false;
  }

  FavoriteFilm.filmRate = document.form__film.filmRate.value;
}

function saveAndShow() {
  saveFavoriteFilm();
  return showFavoriteFilm();
}

function showFavoriteFilm() {
  elem.style.display = "none";
  elem2.style.display = "block";

  return `<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Options</th>
      <th scope="col">Film</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Your favorite film is</td>
      <td class="font-weight-bold">${FavoriteFilm.filmName}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Director</td>
      <td class="font-weight-bold">${FavoriteFilm.filmDirector}</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Year of the film</td>
      <td class="font-weight-bold">${FavoriteFilm.filmYear}</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Oscars</td>
      <td class="font-weight-bold">${FavoriteFilm.filmOscar}</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Rate of film max 5</td>
      <td class="font-weight-bold">${FavoriteFilm.filmRate}</td>
    </tr>
  </tbody>
</table>`;
}
