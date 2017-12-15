import openCloseEditor from './main.js'
import removeItem from './removeItem'
import keys from './main.js'

function startEdit(thisElem, parentId) {
    openCloseEditor();

    const thisElemInStorage = JSON.parse(localStorage.getItem(parentId));

    const title = thisElemInStorage.title;
    const image = thisElemInStorage.image;
    const description = thisElemInStorage.description;

    document.getElementById('edit-title').value = title;
    document.getElementById('edit-image-link').value = image;
    document.getElementById('edit-description').value = description;

    removeItem(thisElem, parentId)

}

function submitEdit() {

    const title = document.getElementById('edit-title').value;
    const image = document.getElementById('edit-image-link').value;
    const description = document.getElementById('edit-description').value;

    const key = title;

    const obj = {
        title: title,
        image: image,
        description: description
    };

    const serialObj = JSON.stringify(obj);
    localStorage.setItem(key, serialObj);

    const returnObj = JSON.parse(localStorage.getItem(key));

    const inStorageTitleToKey = returnObj['title'];


    keys.push(inStorageTitleToKey);


    function updateKeys() {
        const serialKeys = JSON.stringify(keys);
        localStorage.setItem('allKeys', serialKeys);
        return keys;
    }

    updateKeys();

    location.reload();
}


export {startEdit, submitEdit}