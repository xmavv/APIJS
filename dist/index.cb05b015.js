// fetch(endpoint) // to fetch mi daje response
//     .then(res => res.json()) // to nie wie jakiego typu to sa dane to moze byc img, html, music
//                              // my mowimy ze to ma byc json, i ta funkcja znowu da nam promisa
//     .then(data => console.log(...data)); // spreadoperator wyciaga po prostu z tablicy te itemy
async function e(){let e=await fetch("https://danepubliczne.imgw.pl/api/data/synop");return await e.json()}async function t(){let t=document.getElementById("name"),n=document.getElementById("id"),i=document.getElementById("date"),a=document.getElementById("hour"),d=document.getElementById("temp"),c=document.getElementById("humi"),l=await e(),o=l.find(e=>e.id_stacji===this.children[0].id);t.innerText=o.stacja,n.innerText=o.id_stacji,i.innerText=o.data_pomiaru,a.innerText=o.godzina_pomiaru,d.innerText=o.temperatura,c.innerText=o.wilgotnosc_wzgledna,o.temperatura,o.wilgotnosc_wzgledna}//# sourceMappingURL=index.cb05b015.js.map
!async function(){let n=document.querySelector(".station-list"),i=await e(),a=i.map(e=>`
            <li>
                <span id="${e.id_stacji}">${e.stacja}</span>
            </li>
        `).join("");n.innerHTML=a;let d=document.querySelectorAll("li");d.forEach(e=>e.addEventListener("click",t))}();
//# sourceMappingURL=index.cb05b015.js.map
