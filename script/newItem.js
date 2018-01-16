import {keys} from './main'

export default function createNewItem() {

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
