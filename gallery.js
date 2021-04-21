import galleryList from './gallery-items.js';


const refs = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalImg: document.querySelector('.lightbox__image'),

}

const cardsMarkup = createGalleryMarkup(galleryList);
refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);

// console.log(cardsMarkup);
// // console.log(refs.gallery);

// Повесить слушателя
refs.gallery.addEventListener('click', toOpenModal);
refs.modal.addEventListener('click', closeModal);



function createGalleryMarkup(galleryList) {
    return galleryList
        .map(({ preview, original, description }) => {
            return `<li class="gallery__item">
            <a
    class="gallery__link"
    href="${original}"
    >
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a> </li>`
        })
        .join('');
}

// Модалка
function toOpenModal(event) {
    if (!event.target.classList.contains('gallery__image')) {
        return;     
    };
    window.addEventListener('keydown', onEscapeKeyPress);
    
    event.preventDefault()
    refs.modal.classList.add('is-open');
refs.modalImg.setAttribute('src', event.target.getAttribute('data-source'));
} 

function toCloseModal() {
    refs.modal.classList.remove('is-open');
    refs.modalImg.removeAttribute('src');
}

function closeModal(event) {
    if (event.target.classList.contains('lightbox__overlay') || event.target.classList.contains('lightbox__button')) {
        toCloseModal();
    }
    window.removeEventListener('keydown', onEscapeKeyPress);
}

function onEscapeKeyPress(event) {
  if(event.code === 'Escape') {
      toCloseModal();          

  };          
}




