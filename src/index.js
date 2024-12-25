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
} from "./components/api";

const cardsSection = document.querySelector(".places__list");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const newCardModal = document.querySelector(".popup_type_new-card");
const addNewCardButton = document.querySelector(".profile__add-button");
const editProfileForm = document.forms["edit-profile"];
const addNewCardForm = document.forms["new-place"];

const formSelectors = {
  formSelector: ".popup_is-opened",
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

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addNewCardForm.addEventListener("submit", handleCardSave);

editProfileButton.addEventListener("click", () => {
  editProfileForm.elements.name.value =
    document.querySelector(".profile__title").textContent;
  editProfileForm.elements.description.value = document.querySelector(
    ".profile__description"
  ).textContent;
  openModal(editProfileModal);
  const openedPopup = document.querySelector(".popup_is-opened");
  enableValidation(formSelectors);
  clearValidation(openedPopup, formSelectors);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const name = editProfileForm.elements.name;
  const description = editProfileForm.elements.description;
  const saveButton = editProfileForm.querySelector("button");
  saveButton.textContent = "Сохранить...";
  patchProfileInfo(name.value, description.value)
    .then(() => {
      document.querySelector(".profile__title").textContent = name.value;
      document.querySelector(".profile__description").textContent =
        description.value;
    })
    .then(() => {
      saveButton.textContent = "Сохранить";
      closeModal(editProfileModal);
      editProfileForm.reset();
    })
    .catch((err) => console.log(err));
}

function showImage(imageLink, imageName) {
  const popUpImage = document.querySelector(".popup__image");
  const popUpText = document.querySelector(".popup__caption");
  const popUp = document.querySelector(".popup_type_image");
  popUpImage.src = imageLink;
  popUpText.textContent = imageName;
  openModal(popUp);
}

function handleCardSave(evt) {
  evt.preventDefault();
  const openedPopup = document.querySelector(".popup_is-opened");
  const placeName = addNewCardForm.elements["place-name"];
  const saveButton = addNewCardForm.querySelector("button");
  const link = addNewCardForm.elements["link"];
  saveButton.textContent = "Сохранить...";
  postCard(placeName.value, link.value)
    .then((createdCardData) => {
      const newCard = createCard(
        placeName.value,
        link.value,
        likeCard,
        deleteCard,
        showImage,
        createdCardData._id,
        createdCardData.owner._id,
        []
      );
      cardsSection.prepend(newCard);
    })
    .then(() => {
      saveButton.textContent = "Сохранить";

      closeModal(newCardModal);
      clearValidation(openedPopup, formSelectors);
    })
    .catch((err) => {
      console.log(err);
    });
}

addNewCardButton.addEventListener("click", () => {
  addNewCardForm.elements["place-name"].value = "";
  addNewCardForm.elements["link"].value = "";
  openModal(newCardModal);
  const openedPopup = document.querySelector(".popup_is-opened");
  enableValidation(formSelectors);
  clearValidation(openedPopup, formSelectors);
});

const cardsPromise = getInitialCards();
const userPromise = getCurrentUser();
const dataPromises = [cardsPromise, userPromise];

Promise.all(dataPromises).then((data) => {
  const cardsInfo = data[0];
  const userInfo = data[1];
  for (const card of cardsInfo) {
    const likesCount = card.likes;
    const newCard = createCard(
      card.name,
      card.link,
      likeCard,
      deleteCard,
      showImage,
      card._id,
      userInfo._id,
      likesCount
    );
    if (card.owner._id != userInfo._id) {
      newCard.querySelector(".card__delete-button").remove();
    }
    cardsSection.append(newCard);
  }
  document.querySelector(".profile__title").textContent = userInfo.name;
  document.querySelector(".profile__description").textContent = userInfo.about;
});
