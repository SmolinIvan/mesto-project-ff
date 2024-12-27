import "./styles/index.css";
import {
  clickOverlayModalHandle,
  closeModal,
  openModal,
} from "./components/modal";
import { createCard, deleteCard, likeCard } from "./components/card";
import { enableValidation } from "./components/validation";
import { clearValidation } from "./components/validation";
import {
  getInitialCards,
  getCurrentUser,
  postCard,
  patchProfileInfo,
  patchAvatar,
} from "./components/api";

const avatar = document.querySelector(".profile__image");
const avatarModal = document.querySelector(".popup_type_edit_avatar");
const cardsSection = document.querySelector(".places__list");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const newCardModal = document.querySelector(".popup_type_new-card");
const addNewCardButton = document.querySelector(".profile__add-button");
const editProfileForm = document.forms["edit-profile"];
const addNewCardForm = document.forms["new-place"];
const editAvatarForm = document.forms["edit-avatar"];

const userNameInput = editProfileForm.elements.name;
const userAboutInput = editProfileForm.elements.description;
const userAvatarInput = editAvatarForm.elements.avatar;
const cardNameInput = addNewCardForm.elements["place-name"];
const cardLinkInput = addNewCardForm.elements["link"];
const userNameOnScreen = document.querySelector(".profile__title")
const userDescriptionOnScreen = document.querySelector(".profile__description")

const popUpImage = document.querySelector(".popup__image");
const popUpText = document.querySelector(".popup__caption");
const popUp = document.querySelector(".popup_type_image");

const formSelectors = {
  formSelector: ".popup__form",
  formInput: ".popup__input",
  buttonSelector: ".popup__button",
  buttonInactiveClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const validationConfig = {
  formInput: ".popup__input",
  buttonSelector: ".popup__button",
  buttonInactiveClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popUps = document.querySelectorAll(".popup");

for (const popUp of popUps) {
  popUp.addEventListener("click", clickOverlayModalHandle);
  popUp.classList.add("popup_is-animated");
}

avatar.addEventListener("click", () => {
  openModal(avatarModal);
  clearValidation(editAvatarForm, validationConfig);
});

function handleEditAvatar(evt) {
  evt.preventDefault();
  const saveButton = editAvatarForm.querySelector(".button");
  saveButton.textContent = "Сохранение...";
  patchAvatar(userAvatarInput.value)
    .then(() => {
      avatar.style.backgroundImage = `url(${userAvatarInput.value})`;
      saveButton.textContent = "Сохранить";
      editAvatarForm.reset();
      closeModal(avatarModal);
    })
    .catch((err) => {
      saveButton.textContent = "Не удалось изменить аватар :(";
      console.log(err);
    });
}

editAvatarForm.addEventListener("submit", handleEditAvatar);

editProfileButton.addEventListener("click", () => {
  userNameInput.value = document.querySelector(".profile__title").textContent;
  userAboutInput.value = document.querySelector(".profile__description").textContent;
  openModal(editProfileModal);
  clearValidation(editProfileForm, validationConfig);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const saveButton = editProfileForm.querySelector(".button");
  saveButton.textContent = "Сохранение...";
  patchProfileInfo(userNameInput.value, userAboutInput.value)
    .then(() => {
      userNameOnScreen.textContent = userNameInput.value;
      userDescriptionOnScreen.textContent = userAboutInput.value;
    })
    .then(() => {
      saveButton.textContent = "Сохранить";
      closeModal(editProfileModal);
      editProfileForm.reset();
    })
    .catch((err) => {
      saveButton.textContent = "Не удалось сохранить :(";
      console.log(err);
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

addNewCardButton.addEventListener("click", () => {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openModal(newCardModal);
  clearValidation(addNewCardForm, validationConfig);
});

function handleCardSave(evt) {
  evt.preventDefault();
  const saveButton = addNewCardForm.querySelector(".button");
  saveButton.textContent = "Сохранение...";
  postCard(cardNameInput.value, cardLinkInput.value)
    .then((createdCardData) => {
      const newCard = createCard(
        createdCardData.owner,
        cardNameInput.value,
        cardLinkInput.value,
        likeCard,
        deleteCard,
        showImage,
        createdCardData._id,
        []
      );
      cardsSection.prepend(newCard);
    })
    .then(() => {
      saveButton.textContent = "Сохранить";
      closeModal(newCardModal);
    })
    .catch((err) => {
      saveButton.textContent = "Не удалось сохранить картинку :(";
      console.log(err);
    });
}

addNewCardForm.addEventListener("submit", handleCardSave);

function showImage(imageLink, imageName) {
  popUpImage.src = imageLink;
  popUpText.textContent = imageName;
  openModal(popUp);
}

enableValidation(formSelectors);

const cardsPromise = getInitialCards();
const userPromise = getCurrentUser();
const dataPromises = [cardsPromise, userPromise];

Promise.all(dataPromises)
  .then((data) => {
    const cardsInfo = data[0];
    const userInfo = data[1];
    
    for (const card of cardsInfo) {
      const likesInfo = card.likes;
      const newCard = createCard(
        userInfo,
        card.name,
        card.link,
        likeCard,
        deleteCard,
        showImage,
        card._id,
        likesInfo
      );
      if (card.owner._id != userInfo._id) {
        newCard.querySelector(".card__delete-button").remove();
      }
      cardsSection.append(newCard);
    }
    userNameOnScreen.textContent = userInfo.name;
    userDescriptionOnScreen.textContent =
      userInfo.about;
    avatar.style.backgroundImage = `url(${userInfo.avatar})`;
  })
  .catch((err) => {
    userNameOnScreen.textContent = "Не удалось";
    userNameOnScreen.textContent =
      "Загрузить данные";
    const errorCard = createCard(
      "Ошибка загрузки",
      "",
      likeCard,
      deleteCard,
      showImage,
      null,
      null,
      []
    );
    errorCard.querySelector(".card__like-block").remove();
    errorCard.querySelector(".card__delete-button").remove();
    cardsSection.append(errorCard);
    console.log(err);
  });
