"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var charts_js_1 = require("./charts.js");
var tempValue = 30;
var humiValue = 12;
var speedValue = 2;
var pressureValue = 3;
var rainValue = 4;
var element;
var typeName = "temperature";
var infos = document.querySelectorAll(".info");
var lastStation;
var endpoint = "https://danepubliczne.imgw.pl/api/data/synop";
// fetch(endpoint) // to fetch mi daje response
//     .then(res => res.json()) // to nie wie jakiego typu to sa dane to moze byc img, html, music
//                              // my mowimy ze to ma byc json, i ta funkcja znowu da nam promisa
//     .then(data => console.log(...data)); // spreadoperator wyciaga po prostu z tablicy te itemy
function getData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(endpoint)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function renderLi() {
    return __awaiter(this, void 0, void 0, function () {
        var list, data, html, lis;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    list = document.querySelector(".station-list");
                    return [4 /*yield*/, getData()];
                case 1:
                    data = _a.sent();
                    html = data
                        .map(function (s) {
                        return "\n            <li>\n                <span id=\"".concat(s.id_stacji, "\">").concat(s.stacja, "</span>\n            </li>\n        ");
                    })
                        .join("");
                    list.innerHTML = html;
                    lis = document.querySelectorAll("li");
                    lis.forEach(function (li) { return li.addEventListener("click", renderInfo); });
                    return [2 /*return*/];
            }
        });
    });
}
renderLi();
function renderInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var name, id, date, hour, temp, humi, speed, pressure, rain, data;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = document.getElementById("name");
                    id = document.getElementById("id");
                    date = document.getElementById("date");
                    hour = document.getElementById("hour");
                    temp = document.getElementById("temp");
                    humi = document.getElementById("humi");
                    speed = document.getElementById("speed");
                    pressure = document.getElementById("pressure");
                    rain = document.getElementById("rain");
                    this.classList.add("active");
                    if (lastStation)
                        lastStation.classList.remove("active");
                    if (lastStation === this)
                        lastStation.classList.add("active");
                    lastStation = this;
                    return [4 /*yield*/, getData()];
                case 1:
                    data = _a.sent();
                    element = data.find(function (e) { return e.id_stacji === _this.children[0].id; });
                    name.innerText = element.stacja;
                    id.innerText = element.id_stacji;
                    date.innerText = element.data_pomiaru;
                    hour.innerText = "".concat(element.godzina_pomiaru, ":00");
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
                    tempValue = element.temperatura;
                    humiValue = element.wilgotnosc_wzgledna;
                    speedValue = element.predkosc_wiatru;
                    pressureValue = element.cisnienie;
                    rainValue = element.suma_opadu;
                    infos.forEach(function (info) { return info.classList.remove("chart"); });
                    infos[0].classList.add("chart");
                    charts_js_1.default.renderChartTime("".concat(element.stacja, "-").concat(typeName), tempValue);
                    charts_js_1.default.renderChartTemp(tempValue);
                    charts_js_1.default.renderChartHumi(humiValue);
                    return [2 /*return*/];
            }
        });
    });
}
infos.forEach(function (info) { return info.addEventListener("click", typeInfoChart); });
function typeInfoChart() {
    infos.forEach(function (info) { return info.classList.remove("chart"); });
    this.classList.add("chart");
    typeName = this.dataset.type;
    var value = this.dataset.value;
    if (element)
        charts_js_1.default.renderChartTime("".concat(element.stacja, "-").concat(typeName), value);
}
