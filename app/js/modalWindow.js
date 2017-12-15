function openModal(parentId) {
    document.getElementById('popup-container').classList.toggle('invisible'); //открываем модальное окно

    const thisElemInStorage = JSON.parse(localStorage.getItem(parentId));  //получаем контент кликнутого елемента по id/ключу

    const title = thisElemInStorage.title;
    const image = thisElemInStorage.image;
    const description = thisElemInStorage.description;


    document.getElementById('title-here').innerHTML = title;          // вставляем контент в dom модального окна
    document.getElementById('image-here').setAttribute('src', image);
    document.getElementById('description-here').innerHTML = description;

}

function closeModal() {
    document.getElementById('popup-container').classList.toggle('invisible');      // закрываем модальное окно
}

export {openModal, closeModal}