import {keys} from './main'

export default function submitEdit() {

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




