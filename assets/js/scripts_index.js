"use strict";

function getList() {
    const listas = window.localStorage.getItem('listas')
    return (!listas || listas == 'null') ? [] : JSON.parse(listas);
}

function loadList() {
    if (listas.length) {
        const listsAreaPlus = document.getElementById('listsAreaPlus');
        listsAreaPlus.classList.remove('hidden');
        listsAreaZero.classList.add('hidden');
        listsAreaPlus.innerHTML = `<button
        class="border border-blue rounded-2xl border-solid flex flex-col w-60 aspect-square justify-center hover:cursor-pointer addBtn hover:scale-105 active:opacity-70 transition-all"
      >
        <img
          class="w-1/3 aspect-square mx-auto mb-12"
          src="assets/imgs/add.png"
          alt=""
        />
        <p class="text-blue text-5xl">Agregar</p>
      </button>`;
        listas.forEach(list => {
            const listElement = `
            <div class="relative group hover:cursor-pointer">
          <div
            class="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col w-60 h-60 justify-center p-5 group-hover:-top-1.5 group-hover:-left-1.5 transition-all list"
            id="${list.titulo}"
          >
            <p
              class="text-white break-normal whitespace-normal w-full text-6xl mx-auto truncate"
            >
              ${list.titulo}
            </p>
            <div
              class="absolute top-3 right-3 scale-0 group-hover:scale-100 transition-all delete"
              id="${list.titulo}"
            >
              <img
                class="w-5 h-5 aspect-square mx-auto mb-12"
                src="assets/imgs/delete.png"
                alt=""
              />
            </div>
          </div>
          <div
            class="rounded-2xl bg-orange w-60 h-60 -z-10 absolute top-0 left-0 group-hover:top-1.5 group-hover:left-1.5 transition-all"
          ></div>
        </div>
            `;
            listsAreaPlus.innerHTML += listElement;
        });
    } else {
        const listsAreaZero = document.getElementById('listsAreaZero');
        listsAreaZero.innerHTML = `
            <div
            class="border border-blue rounded-2xl border-solid flex flex-col w-72 h-72 justify-center hover:cursor-pointer addBtn animate-pulse hover:scale-105 hover:animate-none active:opacity-70 transition-all"
            >
            <img
                class="w-1/3 aspect-square mx-auto mb-12"
                src="assets/imgs/add.png"
                alt=""
            />
            <p class="text-blue text-4xl">Agregar</p>
            </div>`;
        listsAreaZero.classList.remove('hidden');
        listsAreaPlus.classList.add('hidden');
    }
}

function prepareButtons() {
    const addBtn = document.querySelectorAll('.addBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const createBtn = document.getElementById('createBtn');
    const tituloInput = document.getElementById('titulo');
    const form = document.getElementById('formNewList');
    const lists = document.querySelectorAll('.list');
    const deleteBtns = document.querySelectorAll('.list > .delete');
    const deleteListForm = document.getElementById('deleteListForm');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const errorAddList = document.getElementById('errorAddList');
    const logo = document.getElementById('logo');

    addBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const addListForm = document.getElementById('addListForm');
            addListForm.classList.remove('hidden');
            errorAddList.classList.add('hidden');
        });
    });

    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const addListForm = document.getElementById('addListForm');
        addListForm.classList.add('hidden');
        errorAddList.classList.add('hidden');
        resetInputs();
    });

    createBtn.addEventListener('click', (e) => {
        e.preventDefault();
        errorAddList.classList.add('hidden');
        const titulo = tituloInput.value;
        if (titulo != '') {
            for (const lista of listas) {
                if (lista.titulo == titulo) {
                    errorAddList.innerText = 'El título ya existe';
                    errorAddList.classList.remove('hidden');
                    e.preventDefault();
                    return;
                }
            }

            const lista = {
                titulo: titulo,
                canciones: []
            }

            listas.push(lista)
            window.localStorage.setItem("listas", JSON.stringify(listas))
            errorAddList.classList.add('hidden');
            addListForm.classList.add('hidden');
            updateList();
        } else {
            errorAddList.innerText = 'El titulo no puede estar vacio';
            errorAddList.classList.remove('hidden');
        }

    });

    form.addEventListener('submit', (e) => {
        createBtn.click();
    });

    form.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            createBtn.click();
        }
    });

    lists.forEach(list => {
        list.addEventListener('click', () => {
            const listName = list.id;
            console.log(listName);
            window.location.href = `playlist.html?list=${listName}`;
        });
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const listName = btn.id;
            deleteListForm.classList.remove('hidden');
            deleteBtn.setAttribute('list', listName);
        });
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteListForm.classList.add('hidden');
    });

    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const listName = deleteBtn.getAttribute('list');
        const index = listas.findIndex(list => list.titulo == listName);
        listas.splice(index, 1);
        window.localStorage.setItem("listas", JSON.stringify(listas))
        deleteListForm.classList.add('hidden');
        updateList();
    });

    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

function updateList() {
    const listsAreaPlus = document.getElementById('listsAreaPlus');
    listsAreaPlus.innerHTML = '';
    loadList();
    prepareButtons();
    resetInputs();
}

function resetInputs() {
    const tituloInput = document.getElementById('titulo');
    tituloInput.value = '';
}

const listas = getList();
loadList();
prepareButtons();






