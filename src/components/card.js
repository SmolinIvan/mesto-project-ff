export function createCard(name, link, likeAction, deleteAction, expandAction) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").setAttribute("src", link);

  const image = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");

  image.addEventListener("click", () => expandAction(link, name));

  like.addEventListener("click", () => likeAction(like));

  const buttonDeleteCard = cardElement.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", () => {
    deleteAction(cardElement);
  });
  return cardElement;
}

export function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}

export function deleteCard(elementToDelete) {
  elementToDelete.remove();
}
