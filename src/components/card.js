
export function createCard (name, link, deleteAction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').setAttribute('src', link);
  cardElement.querySelector('.card__title').textContent = name;

  const image = cardElement.querySelector('.card__image');
  const linkImage = image.src;
  const like = cardElement.querySelector('.card__like-button');

  image.addEventListener('click', () => openImage(linkImage,name));

  like.addEventListener('click', likeCard)

  const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
  buttonDeleteCard.addEventListener('click', () => {
      deleteAction(cardElement)
  });
  return cardElement;
}

function openImage(imageLink, imageName) {
  const popUpImage = document.querySelector('.popup__image');
  const popUpText = document.querySelector('.popup__caption');
  const popUp = document.querySelector('.popup_type_image');
  popUpImage.src = imageLink;
  popUpText.textContent = imageName;
  popUp.classList.toggle('popup_is-opened')
}

function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active')
}

export function deleteCard (elementToDelete) {
  elementToDelete.remove();
}
