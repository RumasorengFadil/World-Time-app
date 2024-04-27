import css from "./style/style.css";
import $ from "jquery";
import { dataCountries } from "./app/dataCountries.js";
import { setTime } from "./app/manageApi.js";

const filterBtn = document.querySelector(".search-cn__filter-box");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalOptions = document.querySelectorAll(".modal__option");
const finishBtn = document.querySelector(".modal__finish-btn");
const clockCn = document.querySelectorAll(".clock-cn");
const resetBtn = document.querySelector(".modal__reset-btn");
const inputCountry = document.querySelector(".search-cn__input-country");
//todo General
// Make Custom Element
class clock extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <img class="clock-box__second-line clock-box__clockwise" src="assets/Icon/second arrow.svg"></img>
        <img class="clock-box__minute-line clock-box__clockwise" src="assets/Icon/minute hours.svg"></img>
        <img class="clock-box__hours-line clock-box__clockwise" src="assets/Icon/hours arrow.svg"></img>
        <div class="clock-box__dot"></div>
        <div class="clock-box__jam-1 clock-box__delf-jam">1</div>
        <div class="clock-box__jam-2 clock-box__delf-jam">2</div>
        <div class="clock-box__jam-4 clock-box__delf-jam">4</div>
        <div class="clock-box__jam-5 clock-box__delf-jam">5</div>
        <div class="clock-box__jam-7 clock-box__delf-jam">7</div>
        <div class="clock-box__jam-8 clock-box__delf-jam">8</div>
        <div class="clock-box__jam-10 clock-box__delf-jam">10</div>
        <div class="clock-box__jam-11 clock-box__delf-jam">11</div>
        <div class="clock-box__jam-12 clock-box__delf-jam">12</div>
        <div class="clock-box__jam-3 clock-box__delf-jam"><span>3</span></div>
        <div class="clock-box__jam-6 clock-box__delf-jam"><span>6</span></div> 
        <div class="clock-box__jam-9 clock-box__delf-jam"><span>9</span></div> 
        `;
    }
}
customElements.define("clock-",clock);
const warningMessage = function(message){
    console.log("error " + message);
}
const togglePopup = () =>{
    modal.classList.toggle("visible");
    overlay.classList.toggle("visible");
}
//todo search clock
inputCountry.addEventListener("input", ()=>{
    const inputCountry = document.querySelector(".search-cn__input-country").value.toLowerCase();
    const countryNames = document.querySelectorAll(".clock-cn__item-heading");
    countryNames.forEach(function(cName){
        const clockItem = cName.parentElement;
        const carikan = cName.textContent.slice(0, inputCountry.length).toLowerCase();
        clockItem.classList.remove("hidden");
        if(inputCountry !== carikan){
            clockItem.classList.add("hidden");
        }
    })
})
//todo Filter
// modal option
modalOptions.forEach(cont =>{
    cont.addEventListener("click", e =>{
        modalOptions.forEach(cont => cont.classList.remove("disabled"));
        finishBtn.removeAttribute("disabled")
        e.target.classList.add("disabled");
    })
})
//finish button
$(finishBtn).click(()=>{
    const modalOption = [...modalOptions].filter(cont =>{
        return cont.classList.contains("disabled");
    })[0].textContent.toLowerCase();
    clockCn.forEach(clockCn =>{
        clockCn.classList.remove("hidden");
        if(!clockCn.classList.contains(`${modalOption}-time-cn`)){
            clockCn.classList.add("hidden");
        }
    })
    togglePopup();
})
//Reset btn
$(resetBtn).click(()=>{
    clockCn.forEach((clockCn,i) =>{
        clockCn.classList.remove("hidden");
        modalOptions[i].classList.remove("disabled");
        togglePopup();
    })
})
//todo display clock
const makeClock = ({continent, countryName, flag}, i) =>{
    const img = document.createElement("img");
    img.classList.add("clock-cn__flag-icn");
    img.setAttribute("src",flag);

    const h3 = document.createElement("h3");
    h3.textContent = countryName;

    const headingCn = document.createElement("div");
    headingCn.classList.add("clock-cn__item-heading");
    headingCn.append(img,h3);

    const clock = document.createElement("clock-");
    clock.classList.add("clock-box");
    const clockBox = document.createElement("div");
    clockBox.classList.add("clock-cn__item");
    clockBox.append(headingCn,clock);

    const clockCn = document.querySelector(`.${continent}-time-cn`);
    clockCn.append(clockBox);
}

const displayClock = ()=>{
    dataCountries.forEach((country,i) =>{
        switch(country.continent){
            case "asia" :
                makeClock(country, i);
                break;
            case "africa" :
                makeClock(country, i);
                break;
            case "australia" :
                makeClock(country, i);
                break;
            case "europe" :
                makeClock(country, i);
                break;
            case "america" :
                makeClock(country, i);
                break;
            default :
            warningMessage(country.continent);
        }
        setInterval(setTime,1000, country, i);
    })
}

$(filterBtn).click(togglePopup);
$(overlay).click(togglePopup);
$(document).ready(displayClock);

//Menyesuaikan ukuran homepage
const adjustHomePgSize = function(){
    const header = document.querySelector("header");
    header.style.height = `${window.innerHeight}px`;
}();

//If Scroll delete popUp
$(document).scroll(()=>{
    if(modal.classList.contains("visible")) togglePopup();
})
