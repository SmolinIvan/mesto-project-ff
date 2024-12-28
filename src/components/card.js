import { deletePostedCard, putLikeCard, deleteLikeCard } from "./api";

export function createCard(
  userId,
  cardID,
  cardName,
  cardLink,
  cardOwnerID,
  cardLikes,
  likeAction,
  deleteAction,
  expandAction
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement.querySelector(".card__image").setAttribute("src", cardLink);
  cardElement.querySelector(".card__image").setAttribute("alt", cardName);
  cardElement.querySelector(".card__like-counter").textContent =
    cardLikes.length;

  const image = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");

  const currentLikeStatus = cardLikes.some((like) => like._id == userId);

  if (currentLikeStatus) {
    like.classList.add("card__like-button_is-active");
  }

  image.addEventListener("click", () => expandAction(cardLink, cardName));

  like.addEventListener("click", () => {
    likeAction(like, cardElement, cardID);
  });

  const buttonDeleteCard = cardElement.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", () => {
    deleteAction(cardElement, cardID);
  });

  if (cardOwnerID != userId) {
    cardElement.querySelector(".card__delete-button").remove();
  }

  return cardElement;
}

export function likeCard(likeElement, currentCardElement, cardID) {
  if (likeElement.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardID)
      .then((cardData) => {
        currentCardElement.querySelector(".card__like-counter").textContent =
          cardData.likes.length;
        likeElement.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    putLikeCard(cardID)
      .then((cardData) => {
        currentCardElement.querySelector(".card__like-counter").textContent =
          cardData.likes.length;
        likeElement.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

export function deleteCard(elementToDelete, cardID) {
  deletePostedCard(cardID)
    .then(() => elementToDelete.remove())
    .catch((err) => console.log(err));
}
