"use strict"

let FavoritFilm =  {
  name: "The Lord of the Rings",
  part: ["The Fellowship of the Ring", "The Two Towers","The Return of the King" ],
  author: "Tolkien",
  year: 2001,
  oscar: true,
  rateOfSite: 9.9,
  rateOfVlad : null,
  rateOfUser: null,
  director: "Peter Jackson",
  boxOffice: 2919000000,
  runTimeMinutes: 558,
  countOfOscar: 17,
  setRate : function () {
    do {
    this.rateOfUser = prompt("А как вы оцениваете фильм от 0 до 10?", "10");
    if (this.rateOfUser >= 0 && this.rateOfUser <=10) {
     alert ( this.rateOfUser );
    break;
    } else {
    alert ( "You enter wrong value");
    }
    } while (true);
  },
  checkRate : function () {
      if(this.rateOfUser===null ) {
      alert ("Can not check rate of the film, start setRate() method");
    } else if (this.rateOfUser <5) {
      alert ( `This is BAD FILM, rate is ${this.rateOfUser}`);
    } else { 
      alert ( `GOOD FILM. You can watch it, rate is ${this.rateOfUser}`)
    }    
  }
};

function getRecommendation (rate) {
  if ( rate ===10) {
    alert("Super FILM");
  } else {
    alert("Not super FILM")
  }
}

getRecommendation(10);
getRecommendation(8);

FavoritFilm.countOfOscar = 17;

alert(`${FavoritFilm.name} has ${FavoritFilm.countOfOscar} oscars`);

FavoritFilm.rateOfVlad = 9.5;

FavoritFilm.checkRate();
FavoritFilm.setRate();
FavoritFilm.checkRate();





