import keys from './main.js'
export function removeItem(thisElem, parentId) {

    thisElem.parentNode.parentNode.remove(); //Удаляем Item из DOM

    localStorage.removeItem(parentId); // Удаляем из Storage. Id елементов они же и ключи к их контенту в storage.

    const getAllKeysFromStorage = JSON.parse(localStorage.getItem('allKeys')); //получаем из Storage масив ключей, парсим  из строки в массив
    console.log(getAllKeysFromStorage);
    for (var i = 0; i < getAllKeysFromStorage.length; i++) { //идем по масиву с ключами
        if (getAllKeysFromStorage[i] === parentId) {            //и если мы нашли ключ(id/title) к удаляемому айтему, удаляем его из масива
            getAllKeysFromStorage.splice(i, 1);
            const serialise = JSON.stringify(getAllKeysFromStorage); //преобразовываем массив обратно в строку
            localStorage.setItem('allKeys', serialise);          // и записываем обратно в storage
        }
    }

    for (var j = 0; j < keys.length; j++) { //удаляем из временного массива keys
        if (keys[j] === parentId) {
            keys.splice(j, 1);
        }
    }
}