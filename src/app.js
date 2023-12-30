"use strict";

import renderChart from "./charts.js";

let tempValue =30;
let humiValue =12;
let speedValue =2;
let pressureValue = 3; 
let rainValue = 4;

let element;
let typeName = 'temperature';

const infos = document.querySelectorAll('.info');
let lastStation;

const endpoint = "https://danepubliczne.imgw.pl/api/data/synop";
// fetch(endpoint) // to fetch mi daje response
//     .then(res => res.json()) // to nie wie jakiego typu to sa dane to moze byc img, html, music
//                              // my mowimy ze to ma byc json, i ta funkcja znowu da nam promisa
//     .then(data => console.log(...data)); // spreadoperator wyciaga po prostu z tablicy te itemy

async function getData() {
    const response = await fetch(endpoint);
    let data = await response.json();
    return data;
}

async function renderLi() {
    const list = document.querySelector('.station-list');
    const data = await getData();

    const html = data.map(s => {
        return `
            <li>
                <span id="${s.id_stacji}">${s.stacja}</span>
            </li>
        `;
    }).join('');

    list.innerHTML = html;
    const lis = document.querySelectorAll('li');
    lis.forEach(li => li.addEventListener('click', renderInfo));
}

renderLi();

async function renderInfo() {
    const name = document.getElementById('name');
    const id = document.getElementById('id');
    const date = document.getElementById('date');
    const hour = document.getElementById('hour');
    const temp = document.getElementById('temp');
    const humi = document.getElementById('humi');
    const speed = document.getElementById('speed');
    const pressure = document.getElementById('pressure');
    const rain = document.getElementById('rain');

    this.classList.add('active');
    if(lastStation) lastStation.classList.remove('active');
    if(lastStation === this) lastStation.classList.add('active');
    lastStation = this;

    const data = await getData();
    element = data.find(e => e.id_stacji === this.children[0].id);
    name.innerText = element.stacja;
    id.innerText = element.id_stacji;
    date.innerText = element.data_pomiaru;
    hour.innerText = `${element.godzina_pomiaru}:00`;
    temp.innerText = element.temperatura + ' [℃]';
    humi.innerText = element.wilgotnosc_wzgledna + ' [%]';
    speed.innerText = element.predkosc_wiatru + ' [km/h]';
    pressure.innerText = element.cisnienie + ' [hPa]';
    rain.innerText = element.suma_opadu + ' [mm]';

    temp.parentNode.dataset.value = element.temperatura;
    humi.parentNode.dataset.value = element.wilgotnosc_wzgledna;
    speed.parentNode.dataset.value = element.predkosc_wiatru;
    pressure.parentNode.dataset.value = element.cisnienie;
    rain.parentNode.dataset.value = element.suma_opadu;

    tempValue = element.temperatura;
    humiValue = element.wilgotnosc_wzgledna;
    speedValue = element.predkosc_wiatru;
    pressureValue = element.cisnienie;
    rainValue = element.suma_opadu;

    infos.forEach(info => info.classList.remove('chart'));
    infos[0].classList.add('chart');
    renderChart.renderChartTime(`${element.stacja}-${typeName}`, tempValue)

    renderChart.renderChartTemp(tempValue);
    renderChart.renderChartHumi(humiValue);
}

infos.forEach(info => info.addEventListener('click', typeInfoChart));

function typeInfoChart(){
    infos.forEach(info => info.classList.remove('chart'));
    this.classList.add('chart');
    typeName = this.dataset.type;
    const value = this.dataset.value;

    if(element) renderChart.renderChartTime(`${element.stacja}-${typeName}`, value);
}