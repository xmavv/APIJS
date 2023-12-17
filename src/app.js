"use strict";

import renderChart from "./charts.js";

let tempValue =30;
let humiValue =12;

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

    const data = await getData();
    const element = data.find(e => e.id_stacji === this.children[0].id);
    name.innerText = element.stacja;
    id.innerText = element.id_stacji;
    date.innerText = element.data_pomiaru;
    hour.innerText = element.godzina_pomiaru;
    temp.innerText = element.temperatura;
    humi.innerText = element.wilgotnosc_wzgledna;

    tempValue = element.temperatura;
    humiValue = element.wilgotnosc_wzgledna;

    renderChart.renderChartTemp(tempValue);
    renderChart.renderChartHumi(humiValue);
    renderChart.renderChartTime(element.stacja, tempValue);
}