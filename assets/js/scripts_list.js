"use strict";

function getList() {
    const listas = window.localStorage.getItem('listas')
    return (!listas || listas == 'null') ? [] : JSON.parse(listas);
}

function getThisList() {
    const urlParams = new URLSearchParams(window.location.search);
    const titulo = urlParams.get('list');
    return listas.find(list => list.titulo == titulo);
}

function initializeTitle() {
    const title = thisList.titulo;
    const titulo = document.getElementById('titulo');
    titulo.innerText = title;
    const length = thisList.canciones.length;
    const cantidad = document.getElementById('cantidad');
    cantidad.innerText = length + " canciones";
}

function loadSongs() {
    const canciones = thisList.canciones;
    const songsList = document.getElementById('songsList');
    const songsNoList = document.getElementById('songsNoList');
    
    if (canciones.length > 0) {
        songsList.classList.remove('hidden');
        canciones.forEach(cancion => {
            const song = `
        <div>
        <div class="flex my-3 hover:cursor-pointer hover:animate-pulse">
          <div class="flex w-1/5 justify-center">
            <p>${cancion.nombre}</p>
          </div>
          <div class="flex w-4/5 justify-center">
            <p>${cancion.autor}</p>
          </div>
          <div>
            <img
              class="mr-10 h-7 mt-1"
              src="assets/imgs/options.png"
              alt=""
            />
          </div>
        </div>
        <hr class="opacity-50" />
      </div>
        `;
            songsList.innerHTML += song;
        });
    } else {
        songsNoList.classList.remove('hidden');
    }

}

function prepareButtons() {
    const playBtn = document.getElementById('playBtn');
    const reproductor = document.getElementById('reproductor');
    const normalBtn = document.getElementById('normalBtn');
    const registerSongBtn = document.getElementById('registerSongBtn');
    const addSong = document.getElementById('addSong');

    playBtn.addEventListener('click', () => {
        reproductor.classList.add('-translate-y-24');
    });

    addSong.addEventListener('click', () => {
        registerSongBtn.classList.remove('hidden');
        normalBtn.classList.add('hidden');
    });
    
    
}

const listas = getList();
const thisList = getThisList();
initializeTitle();
loadSongs();
prepareButtons();