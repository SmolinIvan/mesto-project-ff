import { deletePostedCard, putLikeCard, deleteLikeCard } from "./api";

export function createCard(
  userInfo,
  name,
  link,
  likeAction,
  deleteAction,
  expandAction,
  dataCardID,
  dataLikes,
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").setAttribute("src", link);
  cardElement.querySelector(".card__like-counter").textContent =
    dataLikes.length;

  const image = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");

  const currentLikeStatus = dataLikes.some(likeInfo => JSON.stringify(likeInfo) == JSON.stringify(userInfo))

  if (currentLikeStatus) {
    like.classList.add("card__like-button_is-active");
  }

  image.addEventListener("click", () => expandAction(link, name));

  like.addEventListener("click", () => {
    likeAction(userInfo, like, cardElement, dataCardID, dataLikes)
  });

  const buttonDeleteCard = cardElement.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", () => {
    deleteAction(cardElement, dataCardID);
  });

  return cardElement;
}

export function likeCard(
  userInfo,
  likeElement,
  currentCardElement,
  dataCardID,
  dataLikes,
) {
  
  if (likeElement.classList.contains("card__like-button_is-active")) {
    const index = JSON.stringify(dataLikes).indexOf(JSON.stringify(userInfo));
    deleteLikeCard(dataCardID)
      .then((cardData) => {
        currentCardElement.querySelector(".card__like-counter").textContent =
          cardData.likes.length;
        likeElement.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    putLikeCard(dataCardID)
      .then((cardData) => {
        currentCardElement.querySelector(".card__like-counter").textContent =
          cardData.likes.length;
        likeElement.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

export function deleteCard(elementToDelete, dataCardID) {
  deletePostedCard(dataCardID)
    .then(() => elementToDelete.remove())
    .catch((err) => console.log(err));
}
