"use strict";

function getThisList() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('list');
}

function buttonNoSongs() {
  playBtn.classList.remove('hidden');
  addSongLabel.classList.remove('flex', 'justify-around', 'gap-5', 'w-auto', 'px-5');
  addSongLabel.classList.add('w-14', 'ml-5');
  addSongLabelImg.classList.add('ml-4');
  addSongLabelP.classList.add('hidden');
}

function buttonWSongs() {
  playBtn.classList.add('hidden');
  addSongLabel.classList.remove('w-14', 'ml-5');
  addSongLabel.classList.add('flex', 'justify-around', 'gap-5', 'w-auto', 'px-5');
  addSongLabelImg.classList.remove('ml-4');
  addSongLabelP.classList.remove('hidden');
}

function initializeTitle() {
  const title = thisList.titulo;
  const titulo = document.getElementById('titulo');
  const length = thisList.canciones.length;
  const cantidad = document.getElementById('cantidad');
  const playBtn = document.getElementById('playBtn');
  const addSongLabel = document.getElementById('addSongLabel');
  const addSongLabelP = document.getElementById('addSongLabelP');
  const addSongLabelImg = document.getElementById('addSongLabelImg');
  
  titulo.innerText = title;
  cantidad.innerText = length + " canciones";

  if (thisList.canciones.length > 0) {
    buttonNoSongs(playBtn, addSongLabel, addSongLabelP, addSongLabelImg);
  } else {
    buttonWSongs(playBtn, addSongLabel, addSongLabelP, addSongLabelImg);
  }
}

function loadSongs() {
  const canciones = thisList.canciones;
  const board = document.getElementById('board');
  board.innerHTML = '';

  if (canciones.length > 0) {
    const head = `
    <div class="text-white mt-5 text-3xl" id="songsList">
          <div>
            <div class="relative">
              <hr class="opacity-10"/>
              <div class="absolute right-36 -top-8 h-16 w-16 bg-[#3C3C3C] rounded-full text-center hover:cursor-default">
                <p class="opacity-60 text-4xl mt-3">
                  5
                </p>
              </div>
              <div class="absolute px-3 flex justify-around bg-[#3C3C3C] h-16 w-32 rounded-full right-0 -top-8">
                <div class="w-full h-full my-auto hover:cursor-pointer">
                  <img class="h-8 mt-4 ml-3" src="assets/imgs/previousPage.png" alt="">
                </div>
                <img class="h-14 my-auto" src="assets/imgs/splitter.png" alt="">
                <div class="w-full h-full my-auto hover:cursor-pointer">
                  <img class="h-8 mt-4 mr-3 ml-auto" src="assets/imgs/nextPage.png" alt="">
                </div>
              </div>
            </div>

            <div class="flex my-3 mx-7">
              <div class="flex opacity-50">
                <img
                  class="w-5 h-5 my-auto mr-2 "
                  src="assets/imgs/order.png"
                  alt=""
                />
                <p>Nombre</p>
              </div>
              <div class="opacity-0">
                <img
                  class="mr-10 h-7 mt-1"
                  src="assets/imgs/DeleteSong.png"
                  alt=""
                />
              </div>
            </div>
            <hr class="opacity-10"/>
          </div>
          <!-- Zona de canciones -->
        </div>
    `;
    board.innerHTML += head;
    const songsList = document.getElementById('songsList');
    canciones.forEach(cancion => {
      const song = `
        <div class="group hover:scale-105 transition-all song"
        id = "${cancion.nombre}">
        <div class="flex mx-7 justify-between my-3 hover:cursor-pointer hover:animate-pulse song" id = "${cancion.nombre}">
          <div class="">
            <p id = "${cancion.nombre}" class = "song">${cancion.nombre}</p>
          </div>
          <div>
            <img
              class=" h-7 mt-1"
              src="assets/imgs/DeleteSong.png"
              alt=""
            />
          </div>
        </div>
        <hr class="opacity-10 group-hover:opacity-50 song" id = "${cancion.nombre}"/>
      </div>
        `;
      songsList.innerHTML += song;
    });
  } else {
    const body = `
    <div class="text-white text-3xl" id="songsNoList">
        <div class=" flex flex-col">
          <hr class="opacity-20"/>
          <div class="mt-20">
            <img
              class="w-52 aspect-square mx-auto"
              src="assets/imgs/noSongs.png"
              alt=""
            />
            <h5
              class="text-white opacity-20 w-1/4 mx-auto text-2xl text-center mt-8"
            >
              No hay canciones, agrega la primera
            </h5>
          </div>
        </div>
        <!-- Zona de canciones -->
      </div>
    `;
    board.innerHTML += body;
  }

}

function showMusicBar(){
  reproductor.classList.add('-translate-y-24');
  songPlaying.innerText = thisList.canciones[0].nombre;
  playlistPlaying.innerText = thisList.titulo;
}

function playMusic(title = songTitle){

  songTitle = title;

  reproductor.classList.add('-translate-y-24');
  songPlaying.innerText = title;
  playlistPlaying.innerText = thisList.titulo;
  symbolPlaying.src = 'assets/imgs/pause.png';
  roundedIconSong.classList.remove('animate-none');
  roundedIconSong.classList.add('animate-spin');
  playing = true;

  audio.src = thisList.canciones.filter(cancion => cancion.nombre === title)[0].url;
  audio.play();
}

function prepareButtons() {
  const playBtn = document.getElementById('playBtn');
  const reproductor = document.getElementById('reproductor');
  const addSong = document.getElementById('addSong');
  const logo = document.getElementById('logo');
  const songPlaying = document.getElementById('songPlaying');
  const playlistPlaying = document.getElementById('playlistPlaying');
  const divListPlaying = document.getElementById('divListPlaying');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const symbolPlaying = document.getElementById('symbolPlaying');
  const roundedIconSong = document.getElementById('roundedIconSong');
  const board = document.getElementById('board');

  playBtn.addEventListener('click', () => {
    showMusicBar();
    playMusic(thisList.canciones[0].nombre);
  });

  addSong.addEventListener('change', (e) => {
    const files = e.target.files;
    const songs = [];

    for (let i = 0; i < files.length; i++) {

      const file = files[i];
      //verify if the file is a song
      if (file.type.includes('audio')) {
        const song = {
          nombre: file.name,
          url: URL.createObjectURL(file)
        };
        songs.push(song);
      }
    }
    thisList.canciones = thisList.canciones.concat(songs);
    loadSongs();
    initializeTitle();
  });

  logo.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  divListPlaying.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  playPauseBtn.addEventListener('click', () => {
    if (playing) {
      symbolPlaying.src = 'assets/imgs/resume.png';
      playing = false;
      pauseMusic();
    } else {
      symbolPlaying.src = 'assets/imgs/pause.png';
      playing = true;
      playMusic();
    }
    animateMusic();
  });

  board.addEventListener('click', (e) => {
    if (e.target.classList.contains('song')) {
      playMusic(e.target.id);
    }

    if (e.target.type === 'img' && e.target.src.includes('DeleteSong')) {
      const songName = e.target.parentElement.parentElement.children[0].children[0].innerText;
      thisList.canciones = thisList.canciones.filter(cancion => cancion.nombre !== songName);
      loadSongs();
      songTitle = thisList.canciones.filter(cancion => cancion.nombre === songName)[0].nombre;
      initializeTitle();
    }
  });
}


function animateMusic(){
  const roundedIconSong = document.getElementById('roundedIconSong');
  if(playing){
    roundedIconSong.classList.remove('animate-none');
    roundedIconSong.classList.add('animate-spin');
  }else{
    roundedIconSong.classList.remove('animate-spin');
    roundedIconSong.classList.add('animate-none');
  }
}

function pauseMusic(){
  animateMusic();
  playing = false;
  audio.pause();
}


var thisList = {
  titulo: getThisList(),
  canciones: []
}
var playing = false;
var audio = new Audio();
var songTitle;
initializeTitle();
loadSongs();
prepareButtons();