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


function createNewItem() {

    var title = document.getElementById('create-title').value;
    var image = document.getElementById('create-image-link').value;
    var description = document.getElementById('create-description').value;

    var key = title;    //ключ для поиска контента равен заголовку записи, передаем его в keys, который потом запищем в storage
                        //по нему мы потом найдем и саму запись и ее контент
    var obj = {
        title: title,
        image: image,
        description: description
    };

    var serialObj = JSON.stringify(obj); //сериализуем обьект
    localStorage.setItem(key, serialObj); //запишем его в хранилище по ключу, который равен заголовку

    var returnObj = JSON.parse(localStorage.getItem(key)); //спарсим его обратно

    var inStorageTitleToKey = returnObj['title'];


    keys.push(inStorageTitleToKey); //записываем заголовок как ключь для поиска в массив keys


    function updateKeys() {
        var serialKeys = JSON.stringify(keys);
        localStorage.setItem('allKeys', serialKeys);
        return keys;
    }

    updateKeys(); //обновляем keys  в storage

    location.reload();  // Что бы не вставлять в этом месте в Dom как в прошлой версии, просто перезагрузим страницу.
                        // GetItems() после перезагрузки сам выведет все с учетом новых item. Так же Очитска инпута более не нужна

}


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


function removeItem(thisElem, parentId) {

    thisElem.parentNode.parentNode.remove(); //Удаляем Item из DOM

    localStorage.removeItem(parentId); // Удаляем из Storage. Id елементов они же и ключи к их контенту в storage.

    var getAllKeysFromStorage = JSON.parse(localStorage.getItem('allKeys')); //получаем из Storage масив ключей, парсим  из строки в массив
    console.log(getAllKeysFromStorage);
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


function openModal(parentId) {
    document.getElementById('popup-container').classList.toggle('invisible'); //открываем модальное окно

    var thisElemInStorage = JSON.parse(localStorage.getItem(parentId));  //получаем контент кликнутого елемента по id/ключу

    var title = thisElemInStorage.title;
    var image = thisElemInStorage.image;
    var description = thisElemInStorage.description;


    document.getElementById('title-here').innerHTML = title;          // вставляем контент в dom модального окна
    document.getElementById('image-here').setAttribute('src', image);
    document.getElementById('description-here').innerHTML = description;

}

function closeModal() {
    document.getElementById('popup-container').classList.toggle('invisible');      // закрываем модальное окно
}


function startEdit(thisElem, parentId) {
    openCloseEditor();

    var thisElemInStorage = JSON.parse(localStorage.getItem(parentId));

    var title = thisElemInStorage.title;
    var image = thisElemInStorage.image;
    var description = thisElemInStorage.description;

    document.getElementById('edit-title').value = title;
    document.getElementById('edit-image-link').value = image;
    document.getElementById('edit-description').value = description;

    removeItem(thisElem, parentId)

}

function submitEdit() {

    var title = document.getElementById('edit-title').value;
    var image = document.getElementById('edit-image-link').value;
    var description = document.getElementById('edit-description').value;

    var key = title;

    var obj = {
        title: title,
        image: image,
        description: description
    };

    var serialObj = JSON.stringify(obj);
    localStorage.setItem(key, serialObj);

    var returnObj = JSON.parse(localStorage.getItem(key));

    var inStorageTitleToKey = returnObj['title'];


    keys.push(inStorageTitleToKey);


    function updateKeys() {
        var serialKeys = JSON.stringify(keys);
        localStorage.setItem('allKeys', serialKeys);
        return keys;
    }

    updateKeys();

    location.reload();
}



