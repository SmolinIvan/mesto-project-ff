import { deletePostedCard, getInitialCards, putLikesCard, removeLikesCard } from "./api";

export function createCard(name, link, likeAction, deleteAction, expandAction, cardId , userId, likes) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").setAttribute("src", link);
  cardElement.querySelector(".card__like-counter").textContent = likes.length

  const image = cardElement.querySelector(".card__image");
  const like = cardElement.querySelector(".card__like-button");

  for (const likeData of likes) {
    if (likeData._id.indexOf(userId) != -1) {
      like.classList.add("card__like-button_is-active");
      break;
    }  
  }

  image.addEventListener("click", () => expandAction(link, name));

  like.addEventListener("click", () => {
    likeAction(like, cardElement, cardId, userId)

  });

  const buttonDeleteCard = cardElement.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", () => {
    deleteAction(cardElement, cardId, userId);
  });
  
  
  return cardElement;
}

export function likeCard(element, card, cardId, userId) {
  getInitialCards().then(
    cards => { 
      const currentCard = cards.find(card => card._id == cardId)
      const currentUser = currentCard.likes.find(user => user._id == userId)
      if (currentUser) {
        removeLikesCard(cardId).then(res => card.querySelector(".card__like-counter").textContent = res.likes.length)
        element.classList.remove("card__like-button_is-active");
      } else {
        putLikesCard(cardId).then(res => card.querySelector(".card__like-counter").textContent = res.likes.length )
        element.classList.add("card__like-button_is-active");
      }

      // if (currentCard.likes.indexOf(userId) != -1) {
      //   removeLikesCard(cardId)
      //   element.classList.remove("card__like-button_is-active");
      // } else {
      //   element.classList.add("card__like-button_is-active");
      //   putLikesCard(cardId).then(res => console.log(res))
      // }

      // for (let i = 0; i < cards.length; i ++) {
      //   if (cards[i].likes.indexOf(userId) == -1 ) {
      //     element.classList.add("card__like-button_is-active");
      //     putLikesCard(cardId).then(res => console.log(res))
      //     break
      //   } else {
      //     removeLikesCard(cardId)
      //     element.classList.remove("card__like-button_is-active");
      //   }
      // }
    }
  )

  element.classList.toggle("card__like-button_is-active");
}

export function deleteCard(elementToDelete, cardId, userId) {
  getInitialCards().then(
    cards => { 
      const currentCard = cards.find(card => card._owner == userId)
      // const currentUser = currentCard.find(card => card.owner == userId)
      if (currentCard) {
        deletePostedCard(cardId).then(res => console.log(res))
      } else {
        deletePostedCard(cardId)
      }
    }
  )
  elementToDelete.remove();
}


// function isCardLike(cards, cardId, userId) {
//   const currentCard = cards.find(card => card._id == cardId)
//   const currentUser = currentCard.likes.find(user => user._id == userId)
//   if (currentUser) {
//     return true
//   }
// }