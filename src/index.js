import './style.css';
document.addEventListener("DOMContentLoaded",()=>{

    let lista1 = document.querySelector(".lista1");
    let bekezdes = document.querySelector(".bekezdes");
    let lista2 = document.querySelector(".lista2");
    let terulet = document.querySelector(".terulet");
    let checkBoxClass = document.querySelector(".checkBoxClass");

async function adatBetoltes(){

    const responese = await fetch('../src/planets.json');
    const eredmeny = await responese.json();

    const nevAlapjan = eredmeny.planets.sort((i,x)=>{
        let planetValtozo1 = i.name.toLowerCase(),
          planetValtozo2 = x.name.toLowerCase();
          if(planetValtozo1>planetValtozo2){
            return 1;
          }
          if(planetValtozo1<planetValtozo2){
            return -1;
          }
          return 0;
    });
    document.querySelector(".osszBolygoButton").addEventListener("click",()=>{
        nevAlapjan.forEach(element => {
            if(element.dwarf == true){
                lista1.innerHTML += `<li><i>${element.name}</i></li>`;
            }else{
                lista1.innerHTML += `<li>${element.name}</li>`;
            }
        });
    })
    document.querySelector(".TheMButton").addEventListener("click",()=>{
        nevAlapjan.forEach(element => {
            let terulet = element.area;
            console.log(terulet);
            let math = 2 * Math.sqrt(terulet / (4 * Math.PI));
            bekezdes.innerHTML += `${math}; \n`;
        });
    });
    document.querySelector(".kisebbNagyobbButton").addEventListener("click",()=>{
        lista2.innerHTML=``;
        let elsoSzam = document.querySelector(".elsoSzam").value;
        let masodikSzam = document.querySelector(".masodikSzam").value;
        nevAlapjan.forEach(element=>{
            if(element.area > elsoSzam && element.area< masodikSzam){
                lista2.innerHTML+=`<li>${element.name}</li>`
            }
        })
    });
    document.querySelector(".torpeButton").addEventListener("click",()=>{
        terulet.value=``;
        let osszes = 0;
        if(checkBoxClass.checked == true){
            nevAlapjan.forEach(element=>{
        if(element.dwarf == true){
            osszes += element.area;
             }
            })
            terulet.value += `${osszes}`
        }else{
            nevAlapjan.forEach(element=>{
            if(element.dwarf == false){
                osszes += element.area;
                }
            })
            terulet.value += `${osszes}`
        }
    });
}
adatBetoltes();
})