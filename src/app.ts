"use strict";

import renderChart from "./charts.ts";

let tempValue: number | string = 30;
let humiValue: number | string = 12;
let speedValue: number | string = 2;
let pressureValue: number | string = 3;
let rainValue: number | string = 4;

let element: Data;
let typeName: string = "temperature";

const infos: NodeListOf<HTMLElement> = document.querySelectorAll(".info");
let lastStation: HTMLElement;

const endpoint: string = "https://danepubliczne.imgw.pl/api/data/synop";
// fetch(endpoint) // to fetch mi daje response
//     .then(res => res.json()) // to nie wie jakiego typu to sa dane to moze byc img, html, music
//                              // my mowimy ze to ma byc json, i ta funkcja znowu da nam promisa
//     .then(data => console.log(...data)); // spreadoperator wyciaga po prostu z tablicy te itemy

interface Data {
  id_stacji: string;
  cisnienie: string;
  data_pomiaru: string;
  godzina_pomiaru: string;
  kierunek_wiatru: string;
  predkosc_wiatru: string;
  stacja: string;
  suma_opadu: string;
  temperatura: string;
  wilgotnosc_wzgledna: string;
}

async function getData(): Promise<Data[]> {
  const response = await fetch(endpoint);
  let data = await response.json();
  return data;
}

async function renderLi(): Promise<void> {
  const list: HTMLElement = document.querySelector(".station-list");
  const data: Data[] = await getData();

  const html: string = data
    .map((s) => {
      return `
            <li>
                <span id="${s.id_stacji}">${s.stacja}</span>
            </li>
        `;
    })
    .join("");

  list.innerHTML = html;
  const lis: NodeList = document.querySelectorAll("li");
  lis.forEach((li) => li.addEventListener("click", renderInfo));
}

renderLi();

async function renderInfo(): Promise<void> {
  const name: HTMLElement = document.getElementById("name");
  const id: HTMLElement = document.getElementById("id");
  const date: HTMLElement = document.getElementById("date");
  const hour: HTMLElement = document.getElementById("hour");
  const temp: HTMLElement = document.getElementById("temp");
  const humi: HTMLElement = document.getElementById("humi");
  const speed: HTMLElement = document.getElementById("speed");
  const pressure: HTMLElement = document.getElementById("pressure");
  const rain: HTMLElement = document.getElementById("rain");

  this.classList.add("active");
  if (lastStation) lastStation.classList.remove("active");
  if (lastStation === this) lastStation.classList.add("active");
  lastStation = this;

  const data: Data[] = await getData();
  element = data.find((e) => e.id_stacji === this.children[0].id);
  name.innerText = element.stacja;
  id.innerText = element.id_stacji;
  date.innerText = element.data_pomiaru;
  hour.innerText = `${element.godzina_pomiaru}:00`;
  temp.innerText = element.temperatura + " [℃]";
  humi.innerText = element.wilgotnosc_wzgledna + " [%]";
  speed.innerText = element.predkosc_wiatru + " [km/h]";
  pressure.innerText = element.cisnienie + " [hPa]";
  rain.innerText = element.suma_opadu + " [mm]";

  temp.parentNode.dataset.value = element.temperatura;
  humi.parentNode.dataset.value = element.wilgotnosc_wzgledna;
  speed.parentNode.dataset.value = element.predkosc_wiatru;
  pressure.parentNode.dataset.value = element.cisnienie;
  rain.parentNode.dataset.value = element.suma_opadu;

  tempValue = Number(element.temperatura);
  humiValue = Number(element.wilgotnosc_wzgledna);
  speedValue = element.predkosc_wiatru;
  pressureValue = element.cisnienie;
  rainValue = element.suma_opadu;

  infos.forEach((info) => info.classList.remove("chart"));
  infos[0].classList.add("chart");
  renderChart.renderChartTime(`${element.stacja}-${typeName}`, tempValue);

  renderChart.renderChartTemp(tempValue);
  renderChart.renderChartHumi(humiValue);
}

infos.forEach((info) => info.addEventListener("click", typeInfoChart));

function typeInfoChart(): void {
  infos.forEach((info) => info.classList.remove("chart"));
  this.classList.add("chart");
  typeName = this.dataset.type;
  const value: string = this.dataset.value;

  if (element)
    renderChart.renderChartTime(`${element.stacja}-${typeName}`, value);
}
