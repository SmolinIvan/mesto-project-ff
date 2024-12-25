import {
  deletePostedCard,
  getInitialCards,
  putLikeCard,
  deleteLikeCard,
} from "./api";

export function createCard(
  name,
  link,
  likeAction,
  deleteAction,
  expandAction,
  dataCardID,
  dataUserID,
  dataLikes
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

  for (const dataLike of dataLikes) {
    if (dataLike._id.indexOf(dataUserID) != -1) {
      like.classList.add("card__like-button_is-active");
      break;
    }
  }

  image.addEventListener("click", () => expandAction(link, name));

  like.addEventListener("click", () => {
    likeAction(like, cardElement, dataCardID, dataUserID);
  });

  const buttonDeleteCard = cardElement.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", () => {
    deleteAction(cardElement, dataCardID);
  });

  return cardElement;
}

export function likeCard(
  likeElement,
  currentCardElement,
  dataCardID,
  dataUserID
) {
  getInitialCards()
    .then((dataCards) => {
      const currentCardData = dataCards.find(
        (dataCard) => dataCard._id == dataCardID
      );
      const currentUserData = currentCardData.likes.find(
        (user) => user._id == dataUserID
      );
      if (currentUserData) {
        deleteLikeCard(dataCardID)
          .then((cardData) => {
            currentCardElement.querySelector(
              ".card__like-counter"
            ).textContent = cardData.likes.length;
            likeElement.classList.remove("card__like-button_is-active");
          })
          .catch((err) => console.log(err));
      } else {
        putLikeCard(dataCardID)
          .then((cardData) => {
            currentCardElement.querySelector(
              ".card__like-counter"
            ).textContent = cardData.likes.length;
            likeElement.classList.add("card__like-button_is-active");
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteCard(elementToDelete, dataCardID) {
  deletePostedCard(dataCardID)
    .then(() => elementToDelete.remove())
    .catch((err) => console.log(err));
}
