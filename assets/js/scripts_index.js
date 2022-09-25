"use strict";

function getList() {
    const listas = window.localStorage.getItem('listas')
    return (!listas || listas == 'null') ? [] : JSON.parse(listas);
}

function loadList() {
    if (listas.length) {
        const listsAreaPlus = document.getElementById('listsAreaPlus');
        listsAreaPlus.classList.remove('hidden');
        listas.forEach(list => {
            const listElement = `
            <div class="relative group hover:cursor-pointer">
          <div
            class="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col w-60 h-60 justify-center absolute p-5 group-hover:-top-1.5 group-hover:-left-1.5 transition-all list"
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
        listsAreaZero.classList.remove('hidden');
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

    addBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const addListForm = document.getElementById('addListForm');
            addListForm.classList.remove('hidden');
        });
    });

    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const addListForm = document.getElementById('addListForm');
        addListForm.classList.add('hidden');
        errorAddList.classList.add('hidden');
    });

    createBtn.addEventListener('click', (e) => {
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
            window.location.reload();
        }else{
            errorAddList.innerText = 'El titulo no puede estar vacio';
            errorAddList.classList.remove('hidden');
        }
        e.preventDefault();
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
            deleteListForm.classList.remove('hidden');
            deleteBtn.setAttribute('list', btn.id);
        });
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteListForm.classList.add('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        const listName = deleteBtn.getAttribute('list');
        const index = listas.findIndex(list => list.titulo == listName);
        listas.splice(index, 1);
        window.localStorage.setItem("listas", JSON.stringify(listas))
        window.location.reload();
    });
}

const listas = getList();
loadList();
prepareButtons();






