import openCloseCreator from './openCloseCreator'
import createNewItem from './newItem'
import submitEdit from './edit'
import './modal'


 var keys = [];  // тут хранятся все ключи от item, по которым мы будем искать их контент(Заголовок, картинку и описание)
                // сюда записываються сразу после загрузки из storage/и сюда добавляются все новые, которые потом запишуться в storage

 var returnAllKeys = JSON.parse(localStorage.getItem('allKeys')); // получаем все ключи которые уже есть в Storage и парсим

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

      var thisItem = JSON.parse(localStorage.getItem(returnAllKeys[i]));

      var newItemTitle = thisItem['title'];
      var newItemImage = thisItem['image'];
      var newItemDescription = thisItem['description'];



      var template = '<div class="col s12 card-panel grey lighten-5 z-depth-1 item"' + ' id="' + newItemTitle + '">' +
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

function openCloseEditor() {
  document.getElementById('items-list').classList.toggle('invisible');
  document.getElementById('addBtn').classList.toggle('invisible');
  document.getElementById('editor').classList.toggle('invisible');
}

function startEdit(thisElem, parentId) {
  openCloseEditor();

  var thisElemInStorage = JSON.parse(localStorage.getItem(parentId));
  console.log(thisElemInStorage)

  var title = thisElemInStorage.title;
  var image = thisElemInStorage.image;
  var description = thisElemInStorage.description;

  document.getElementById('edit-title').value = title;
  document.getElementById('edit-image-link').value = image;
  document.getElementById('edit-description').value = description;

  removeItem(thisElem, parentId)

}

function removeItem(thisElem, parentId) {

  thisElem.parentNode.parentNode.remove(); //Удаляем Item из DOM

  localStorage.removeItem(parentId); // Удаляем из Storage. Id елементов они же и ключи к их контенту в storage.

  var getAllKeysFromStorage = JSON.parse(localStorage.getItem('allKeys')); //получаем из Storage масив ключей, парсим  из строки в массив

  for (var i = 0; i < getAllKeysFromStorage.length; i++) { //идем по масиву с ключами
    if (getAllKeysFromStorage[i] === parentId) {            //и если мы нашли ключ(id/title) к удаляемому айтему, удаляем его из масива
      getAllKeysFromStorage.splice(i, 1);
      var serialise = JSON.stringify(getAllKeysFromStorage); //преобразовываем массив обратно в строку
      localStorage.setItem('allKeys', serialise);          // и записываем обратно в storage
    }
  }

  for (var j = 0; j < keys.length; j++) { //удаляем из временного массива keys
    if (keys[j] === parentId) {
      keys.splice(j, 1);
    }
  }
}


document.querySelector('.submitBtn').addEventListener('click', createNewItem, false) //запис в Storage і

document.querySelector('.btn-floating').addEventListener('click', openCloseCreator, false) //відкривається Creator
document.querySelector('.closeBtn').addEventListener('click', openCloseCreator, false) //закривається Creator

document.querySelector('.submitEdit').addEventListener('click', submitEdit, false)


window.removeItem = removeItem
window.startEdit = startEdit


export {keys}
