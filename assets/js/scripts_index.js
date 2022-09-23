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
            <div
              class=" rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col w-60 aspect-square justify-center hover:cursor-pointer"
              id="${list.titulo}"
            >
              <p class="text-white text-6xl">${list.titulo}</p>
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

    addBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const addListForm = document.getElementById('addListForm');
            addListForm.classList.remove('hidden');
        });
    });

    cancelBtn.addEventListener('click', () => {
        const addListForm = document.getElementById('addListForm');
        addListForm.classList.add('hidden');
    });

    createBtn.addEventListener('click', () => {
        const titulo = document.getElementById('titulo').value;
        if (titulo != '') {

            for (const lista of listas) {
                if (lista.titulo == titulo) {
                    alert('El titulo ya existe');
                    return;
                }
            }

            const lista = {
                titulo: titulo,
                canciones: []
            }

            listas.push(lista)
            window.localStorage.setItem("listas", JSON.stringify(listas))
        }
    });
}

const listas = getList();
loadList();
prepareButtons();