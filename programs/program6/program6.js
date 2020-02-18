"use strict";
const ONE_YEAR = 1;
let period = ONE_YEAR;

let flight = {
  from: "Kyiv",
  to: "Paris",
  depart: "2000-00-00",
  return: "2000-01-01",
  adults: 0,
  children: 0,
  baggage: 1,
  weight: 20
};

// Set date for input DEPART, min value is current date
setDateForInput('input[name="flightDepart"]');

let btnSearch = document.querySelector('input[name="flightSearch"]');
let form = document.querySelector("#flight__form");
let flightDepart = document.querySelector('input[name="flightDepart"]');
let flightReturn = document.querySelector('input[name="flightReturn"]');
let oneWay = document.querySelector("#flight__oneWay");
let baggage = document.querySelector("#flightBaggage");

form.addEventListener("change", () => {
  // checkFormValidation();
  getFormValue();
  if (oneWay.checked) {
    flightReturn.disabled = true;
  } else {
    flightReturn.disabled = false;
  }
});

baggage.addEventListener("click", () => {
  let countBaggage = document.querySelector("#flightBaggage");
  let smallCount = document.querySelector("#countBaggage");
  let weight = document.querySelector("#totalWeight");
  smallCount.innerHTML = countBaggage.value;
  weight.innerHTML = countBaggage.value * 20;
});

flightDepart.addEventListener("change", () => {
  let dateCurrent = new Date();
  flightReturn.min = flightDepart.value;
  flightReturn.max = setMaxDateForInput(dateCurrent, period);
  flightReturn.disabled = false;
});

btnSearch.addEventListener("click", () => {
  if (!validateForm()) {
    console.log("Enter all data");
    console.log(flight);
  }
  // alert(" You start searching tickets, wait a second ");
});

console.log(flight);

function setDateForInput(nameOfInput) {
  let dateControl = document.querySelector(nameOfInput);
  let dateCurrent = new Date();

  dateControl.value = getDateForInput(dateCurrent);
  dateControl.min = dateControl.value;
  dateControl.max = setMaxDateForInput(dateCurrent, period);
}

function getDateForInput(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1; //getMonth return from 0 to 11, where 0 - it's mean January, 11 - December
  let day = date.getDate();
  let dateForInput;

  if (month < 10) {
    month = "0" + month; //month must start from 0
  }
  if (day < 10) {
    day = "0" + day; //day must start from 0
  }

  dateForInput = `${year}-${month}-${day}`; //it's format of value to <input type:'date'>
  return dateForInput;
}

function setMaxDateForInput(date, period) {
  if (period > 2) {
    //rule of the Air Company, that sell tickes - MAX period 2 years
    period = 2;
  }
  let maxYear = date.getFullYear() + period;
  date.setFullYear(maxYear);
  return getDateForInput(date);
}

function getFormValue() {
  let from = document.querySelector('input[name="flightFrom"]').value;
  let to = document.querySelector('input[name="flightTo"]').value;
  let depart = document.querySelector('input[name="flightDepart"]').value;
  let returnBack = document.querySelector('input[name="flightReturn"]').value;
  let adults = document.querySelector('input[name="flightAdults"]').value;
  let children = document.querySelector('input[name="flightChildren"]').value;
  let baggage = document.querySelector("#flightBaggage").value;
  let div = document.querySelector("#ticket");

  flight.from = from;
  flight.to = to;
  flight.depart = depart;
  flight.return = returnBack;
  flight.adults = adults;
  if (!adults) {
    flight.adults = 0;
  }
  flight.children = children;
  if (!children) {
    flight.children = 0;
  }
  flight.baggage = baggage;
  flight.weight = flight.baggage * 20;

  console.log(flight);

  div.innerHTML = "";
  if (oneWay.checked) {
    div.innerHTML = `Your ticket: <b>${flight.from} - ${flight.to} </b> <br>
  Departure date: <b>${flight.depart}</b> <br>
  Return date: <br>
  Adult travelers: <b>${flight.adults}</b> <br> 
  Children travelers: <b>${flight.children}</b> <br>
  Baggage place: <b>${flight.baggage}</b> , sum weight: <b>${flight.weight}</b> kg`;
  } else {
    div.innerHTML = `Your ticket: <b>${flight.from} - ${flight.to} - ${flight.from}</b> <br>
  Departure date: <b>${flight.depart}</b> <br>
  Return date: <b>${flight.return}</b> <br>
  Adult travelers: <b>${flight.adults}</b> <br> 
  Children travelers: <b>${flight.children}</b> <br>
  Baggage place: <b>${flight.baggage}</b> , sum weight: <b>${flight.weight}</b> kg`;
  }
}

function validateForm() {
  getFormValue();
  if (flight.adults && flight.children) {
    console.log(flight.adults);
    console.log(flight.children);
    return false;
  }
  if (flight.from || flight.to) {
    console.log(flight.from);
    console.log(flight.to);
    return false;
  }
  if (!oneWay.checked) {
    console.log("Ticket only in one side");
    if (flight.return) {
      console.log(flight.return);
      return false;
    }
  }
  return true;
}
