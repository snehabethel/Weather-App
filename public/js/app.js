//const { response } = require("express");

var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date'); 

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0,3) + "\n" + new Date().getFullYear();

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(search.value);
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
       response.json().then(data => {
           if(data.error){
               locationElement.textContent = data.error;
               tempElement.textContent = "";
               weatherCondition.textContent = "";
           }else{
               if(data.description.includes("rain") ){
                   weatherIcon.className = "wi wi-day-rain"
               }
               else if(data.description === "fog" || data.description.includes("mist") || data.description.includes("smoke")){
                weatherIcon.className = "wi wi-day-fog"
               }
               else if(data.description.includes("clear")){
                weatherIcon.className = "wi wi-day-sunny"
               }
               else{
                weatherIcon.className = "wi wi-day-cloudy"
               }
            locationElement.textContent = data.cityName;
            tempElement.textContent = ((data.temperature-273.15)*9/5 + 32).toFixed(2) + String.fromCharCode(176) + "F";
            weatherCondition.textContent = data.description.toUpperCase();
           }
       })
    });
})