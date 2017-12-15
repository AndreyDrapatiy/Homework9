import keys from './main.js'
export function createNewItem() {

    const title = document.getElementById('create-title').value;
    const image = document.getElementById('create-image-link').value;
    const description = document.getElementById('create-description').value;

    const key = title;    //ключ для поиска контента равен заголовку записи, передаем его в keys, который потом запищем в storage
                        //по нему мы потом найдем и саму запись и ее контент
    const obj = {
        title: title,
        image: image,
        description: description
    };

    const serialObj = JSON.stringify(obj); //сериализуем обьект
    localStorage.setItem(key, serialObj); //запишем его в хранилище по ключу, который равен заголовку

    const returnObj = JSON.parse(localStorage.getItem(key)); //спарсим его обратно

    const inStorageTitleToKey = returnObj['title'];


    keys.push(inStorageTitleToKey); //записываем заголовок как ключь для поиска в массив keys


    function updateKeys() {
        const serialKeys = JSON.stringify(keys);
        localStorage.setItem('allKeys', serialKeys);
        return keys;
    }

    updateKeys(); //обновляем keys  в storage

    location.reload();  // Что бы не вставлять в этом месте в Dom как в прошлой версии, просто перезагрузим страницу.
                        // GetItems() после перезагрузки сам выведет все с учетом новых item. Так же Очитска инпута более не нужна
}



