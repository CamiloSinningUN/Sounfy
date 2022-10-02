"use strict";

function getThisList() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('list');
}

function buttonNoSongs(playBtn, addSongLabel, addSongLabelImg, addSongLabelP) {
  playBtn.classList.remove('hidden');
  addSongLabel.classList.remove('flex', 'justify-around', 'gap-5', 'w-auto', 'px-5');
  addSongLabel.classList.add('w-14', 'ml-5');
  addSongLabelImg.classList.add('ml-4');
  addSongLabelP.classList.add('hidden');
}

function buttonWSongs(playBtn, addSongLabel, addSongLabelImg, addSongLabelP) {
  playBtn.classList.add('hidden');
  addSongLabel.classList.remove('w-14', 'ml-5');
  addSongLabel.classList.add('flex', 'justify-around', 'gap-5', 'w-auto', 'px-5');
  addSongLabelImg.classList.remove('ml-4');
  addSongLabelP.classList.remove('hidden');
}

function initializeTitle(titulo, cantidad) {
  const playBtn = document.getElementById('playBtn');
  const addSongLabel = document.getElementById('addSongLabel');
  const addSongLabelImg = document.getElementById('addSongLabelImg');
  const addSongLabelP = document.getElementById('addSongLabelP');

  const title = thisList.titulo;
  const length = thisList.canciones.length;

  titulo.innerText = title;
  cantidad.innerText = length + " canciones";

  if (thisList.canciones.length > 0) {
    buttonNoSongs(playBtn, addSongLabel, addSongLabelImg, addSongLabelP);
  } else {
    buttonWSongs(playBtn, addSongLabel, addSongLabelImg, addSongLabelP);
  }
}

function animateButtonPages(){
  const nextPage = document.getElementById('nextPage');
  const previousPage = document.getElementById('previousPage');

  if(page < totalPages){
    nextPage.classList.add("hover:cursor-pointer", "hover:bg-[#333333]",  "active:bg-[#252525]");
  }else{
    nextPage.classList.remove("hover:cursor-pointer", "hover:bg-[#333333]",  "active:bg-[#252525]");
  }
  
  if(page>1){
    previousPage.classList.add("hover:cursor-pointer", "hover:bg-[#333333]",  "active:bg-[#252525]");
  }else
  {
    previousPage.classList.remove("hover:cursor-pointer", "hover:bg-[#333333]",  "active:bg-[#252525]");
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
              <div class="absolute right-36 -top-8 h-16 w-16 bg-[#3C3C3C] rounded-full text-center hover:cursor-default ">
                <p class="opacity-60 text-4xl mt-3" id = "currentpage">
                  ${page}
                </p>
              </div>
              <div class="absolute flex justify-around bg-[#3C3C3C] h-16 w-32 rounded-full right-0 -top-8 ">
                <div class="w-full h-full my-auto rounded-l-full" id = "previousPage">
                  <img class="h-8 mt-4 ml-5" src="assets/imgs/previousPage.png" alt="">
                </div>
                <img class="h-14 my-auto" src="assets/imgs/splitter.png" alt="">
                <div class="w-full h-full my-auto rounded-r-full " id="nextPage">
                  <img class=" h-8 mt-4 mr-5 ml-auto" src="assets/imgs/nextPage.png" alt="">
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

    for (let i = (page-1)*10; i < canciones.length && i < page*10; i++) {
      const cancion = canciones[i];
      const song = `
        <div class="group hover:scale-105 transition-all song"
        cancion = "${cancion.nombre}">
        <div class="flex mx-7 justify-between my-3 hover:cursor-pointer hover:animate-pulse song" cancion = "${cancion.nombre}">
          <div class="">
            <p cancion = "${cancion.nombre}" class = "song">${cancion.nombre}</p>
          </div>
          <div>
            <img
              class=" h-7 mt-1"
              src="assets/imgs/DeleteSong.png"
              alt=""
            />
          </div>
        </div>
        <hr class="opacity-10 group-hover:opacity-50 song" cancion = "${cancion.nombre}"/>
      </div>
        `;
      songsList.innerHTML += song;
    }
    animateButtonPages();
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

function showMusicBar(reproductor, songPlaying, playlistPlaying) {
  reproductor.classList.add('-translate-y-24');
  songPlaying.innerText = songTitle;
  playlistPlaying.innerText = thisList.titulo;
}

function playMusic(title = songTitle) {
  songTitle = title;
  playing = true;
  audio.src = thisList.canciones.filter(cancion => cancion.nombre === title)[0].url;
  symbolPlaying.src = 'assets/imgs/pause.png';
  audio.play();
}

function pauseMusic() {
  animateMusic();
  playing = false;
  audio.pause();
}

function animateMusic() {
  const roundedIconSong = document.getElementById('roundedIconSong');
  if (playing) {
    roundedIconSong.classList.remove('animate-none');
    roundedIconSong.classList.add('animate-spin');
  } else {
    roundedIconSong.classList.remove('animate-spin');
    roundedIconSong.classList.add('animate-none');
  }
}

function prepareButtons() {
  const playBtn = document.getElementById('playBtn');
  const titulo = document.getElementById('titulo');
  const cantidad = document.getElementById('cantidad');
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
    songTitle = thisList.canciones[0].nombre;
    showMusicBar(reproductor, songPlaying, playlistPlaying);
    playMusic(thisList.canciones[0].nombre, reproductor, songPlaying, playlistPlaying, symbolPlaying, roundedIconSong);
  });

  addSong.addEventListener('change', (e) => {
    const files = e.target.files;
    const songs = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.includes('audio')) {
        const nameList = file.name.split('.');
        nameList.pop();
        const name = nameList.join('.');
        if (thisList.canciones.filter(cancion => cancion.nombre === name).length === 0) {
          songs.push({
            nombre: name,
            url: URL.createObjectURL(file)
          });
        }
      }
    }

    thisList.canciones = thisList.canciones.concat(songs);
    totalPages = Math.ceil(thisList.canciones.length / 10);
    loadSongs();
    initializeTitle(titulo, cantidad);
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
      audio.pause();
    } else {
      symbolPlaying.src = 'assets/imgs/pause.png';
      playing = true;
      audio.play();
    }
    animateMusic();
  });

  board.addEventListener('click', (e) => {
    if (e.target.classList.contains('song')) {
      songTitle = e.target.getAttribute('cancion');
      showMusicBar(reproductor, songPlaying, playlistPlaying);
      playMusic(e.target.getAttribute('cancion'), reproductor, songPlaying, playlistPlaying, symbolPlaying, roundedIconSong);
    }
    if (e.target.src && e.target.src.includes('DeleteSong')) {
      const songName = e.target.parentElement.parentElement.children[0].children[0].getAttribute('cancion');
      thisList.canciones = thisList.canciones.filter(cancion => cancion.nombre !== songName);
      loadSongs();
      initializeTitle(titulo, cantidad);
    }

    if (e.target.id === "previousPage" || (e.target.src && e.target.src.includes('previousPage'))) {
      if (page > 1) {
        page--;
        loadSongs();
      }
    }

    if (e.target.id === "nextPage" ||(e.target.src && e.target.src.includes('nextPage'))) {
      if (page < totalPages) {
        page++;
        loadSongs();
      }
    }
  });

  audio.addEventListener('ended', () => {
    const index = thisList.canciones.findIndex(cancion => cancion.nombre === songTitle);
    if (index < thisList.canciones.length - 1) {
      songTitle = thisList.canciones[index + 1].nombre;
      playMusic(thisList.canciones[index + 1].nombre);
      songPlaying.innerText = songTitle;
    } else {
      pauseMusic();
    }
  });

}

var thisList = {
  titulo: getThisList(),
  canciones: []
}
var playing = false;
var audio = new Audio();
var songTitle;
var page = 1;
var totalPages;

initializeTitle(document.getElementById('titulo'), document.getElementById('cantidad'));
loadSongs();
prepareButtons();