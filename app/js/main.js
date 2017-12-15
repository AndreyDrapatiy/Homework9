import {createNewItem} from './createNewItem';
import {removeItem} from './removeItem';
import {openModal, closeModal} from './modalWindow';
import {startEdit, submitEdit} from './edit';


const keys = [];  // тут хранятся все ключи от item, по которым мы будем искать их контент(Заголовок, картинку и описание)
// сюда записываються сразу после загрузки из storage/и сюда добавляются все новые, которые потом запишуться в storage
const returnAllKeys = JSON.parse(localStorage.getItem('allKeys')); // получаем все ключи которые уже есть в Storage и парсим

function getKeysAfterReload() {   //пополняем массив keys из хранилища ключами если они там были
    if (returnAllKeys !== null) {   //Что бы не было ошибки Can not read property of null
        for (var i = 0; i < returnAllKeys.length; i++) {
            keys.unshift(returnAllKeys[i]);
        }
        return keys;
    }
}

window.onload = function () {
    getKeysAfterReload();
    getItems();
};


function getItems() {   // берем ранее полученый ключ от записи.
                        // По нему находим соответсвующую запись в storage
                        // наполняем страницу из storage циклом

    if (returnAllKeys !== null) {  //Что бы не было ошибки Can not read property of null
        for (var i = 0; i < returnAllKeys.length; i++) {

            const thisItem = JSON.parse(localStorage.getItem(returnAllKeys[i]));

            const newItemTitle = thisItem['title'];
            const newItemImage = thisItem['image'];
            const newItemDescription = thisItem['description'];

            const template = '<div class="col s12 card-panel grey lighten-5 z-depth-1 item"' + ' id="' + newItemTitle + '">' +
                '<div class="col s4">' + '<img' + ' src="' + newItemImage + '">' + '</div>' +
                '<div class="col s8">' +
                '<h2 class="item-title" id="item-title">' + newItemTitle + '</h2>' +
                '<p class="item-description">' + newItemDescription + '</p>' +
                '</div>' +
                '<div class="right">' +
                '<button class="btn waves-effect waves-light" onclick="openModal(this.parentNode.parentNode.id)">More...</button>' +
                '<button class="btn waves-effect waves-light" onclick="removeItem(this, this.parentNode.parentNode.id)">Remove</button>' +
                '<button class="btn waves-effect waves-light" onclick="startEdit(this,this.parentNode.parentNode.id)">Edit</button>' +
                '</div>' +
                '</div>';

            document.getElementById('items-list').innerHTML += template;
        }
    }
}

createNewItem ();

function openCloseCreator() {
    document.getElementById('items-list').classList.toggle('invisible');
    document.getElementById('creator').classList.toggle('invisible');
    document.getElementById('addBtn').classList.toggle('invisible');
}

function openCloseEditor() {
    document.getElementById('items-list').classList.toggle('invisible');
    document.getElementById('addBtn').classList.toggle('invisible');
    document.getElementById('editor').classList.toggle('invisible');
}


removeItem ();


openModal();
closeModal();

submitEdit();
submitEdit();


export default {keys, openCloseEditor}



