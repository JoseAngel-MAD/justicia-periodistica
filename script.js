const secciónInfo = document.getElementById('información');
const infoBtn = document.getElementById('info-botón');
const secciónNúmeroPeriodistas = document.getElementById('número-periodistas');
const input = document.getElementById('número-periodistas-input');
const form = document.getElementById('form');
const númeroBtn = document.getElementById('número-periodistas-botón');
const secciónLista = document.getElementById('lista-orden');
const lista = document.getElementById('lista-números');
const listaBtn = document.getElementById('lista-orden-botón')
const secciónApp = document.getElementById('aplicación');
const númeroApp = document.getElementById('aplicación-número');
const noMásNúmeros = document.getElementById('no-números');
const hechoBtn = document.getElementById('hecho');
const otraVezBtn = document.getElementById('otra-vez');
const noBtn = document.getElementById('no');
const secciónBtn = document.getElementById('sección-botones');
let n = 0;
let arrNúmeros = []
let arrNúmerosMásAdelante = [];


infoBtn.addEventListener('click', function(){
    secciónInfo.style.display = 'none';
    secciónNúmeroPeriodistas.style.display = 'block';
})

númeroBtn.addEventListener('click', function(){
    if(input.value != '' && !isNaN(input.value)){
        secciónNúmeroPeriodistas.style.display = 'none';
        secciónLista.style.display = 'block';
}})

listaBtn.addEventListener('click', function(){
    secciónLista.style.display = 'none';
    secciónApp.style.display = 'block'
})



function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
}


form.addEventListener('submit', function(e){
    e.preventDefault()
    n = input.value;
    input.value = '';
    arrNúmeros = Array.from({length: n}, (e, i)=> i+1)
    shuffle(arrNúmeros);
    let html = '';
    for (let item of arrNúmeros){
        html +=  `
        <div class='f'>
            <span class='lista-números-html'>${item}</span>
        </div>
        `
    }
    lista.innerHTML = html
    númeroApp.textContent = arrNúmeros[0]        
})


function display() {
    númeroApp.style.display = 'none'
    noMásNúmeros.style.display = 'block';
    secciónBtn.style.display = 'none'
} 


function hecho(){
        if(arrNúmeros.includes(Number(númeroApp.textContent))){
            arrNúmeros.shift()
            if(arrNúmeros.length > 0){
                númeroApp.textContent = arrNúmeros[0]
            }
            else if(!arrNúmeros.length && !arrNúmerosMásAdelante.length ){
                display()            
            }
            else if(!arrNúmeros.length && arrNúmerosMásAdelante.length)
                númeroApp.textContent = arrNúmerosMásAdelante[0]
        }     
        
        else if (arrNúmerosMásAdelante.includes(Number(númeroApp.textContent))){
            arrNúmerosMásAdelante.shift()
            if(arrNúmerosMásAdelante.length > 0){
                númeroApp.textContent = arrNúmerosMásAdelante[0]
            }
            else if(!arrNúmerosMásAdelante.length){
                display()            
            }

        }
        
    }


function otraVez(){
        if(arrNúmeros.includes(Number(númeroApp.textContent))){
            arrNúmerosMásAdelante.push(arrNúmeros[0])
            arrNúmeros.shift()
            if(arrNúmeros.length > 0){
                númeroApp.textContent = arrNúmeros[0]
            }
            else if(arrNúmerosMásAdelante.length > 0){
                númeroApp.textContent = arrNúmerosMásAdelante[0]
            }
        }
        else if(arrNúmerosMásAdelante.includes(Number(númeroApp.textContent))){
            arrNúmerosMásAdelante.push(arrNúmerosMásAdelante[0])
            arrNúmerosMásAdelante.shift()
            númeroApp.textContent = arrNúmerosMásAdelante[0]
        }    
    
    }

hechoBtn.addEventListener('click', hecho)
otraVezBtn.addEventListener('click', otraVez)
noBtn.addEventListener('click', hecho)
