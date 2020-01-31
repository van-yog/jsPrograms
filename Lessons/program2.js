"use strict";

let FavoritFilm = {
  filmName: "Lord Of The Ring",
  filmDirector: "Piter Jackson",
  filmYear: 2001,
  filmOscar: true,
  filmRate: 5
};

// Elements for Show and Hide blocks
let elem = document.getElementById("editFavoritFilm");
let elem2 = document.getElementById("yourFilm");

function editFavoritFilm() {
  elem.style.display = "block";
  elem2.style.display = "none";
}

function saveFavoritFilm() {
  FavoritFilm.filmName = document.form__film.filmName.value;
  FavoritFilm.filmDirector = document.form__film.filmDirector.value;
  FavoritFilm.filmYear = document.form__film.filmYear.value;

  if (document.form__film.filmOscarYes.checked === true) {
    FavoritFilm.filmOscar = true;
  } else {
    FavoritFilm.filmOscar = false;
  }

  FavoritFilm.filmRate = document.form__film.filmRate.value;
}

function showFavoritFilm() {
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
      <td>Your favorit film is</td>
      <td class="font-weight-bold">${FavoritFilm.filmName}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Director</td>
      <td class="font-weight-bold">${FavoritFilm.filmDirector}</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Year of the film</td>
      <td class="font-weight-bold">${FavoritFilm.filmYear}</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Oscars</td>
      <td class="font-weight-bold">${FavoritFilm.filmOscar}</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Rate of film max 5</td>
      <td class="font-weight-bold">${FavoritFilm.filmRate}</td>
    </tr>
  </tbody>
</table>`;
}


le div = document.createElement ( "div");
div.InnerHtml = 