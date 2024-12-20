import "./styles/index.css";
import { initialCards } from "./scripts/cards";
import { clickOverlayModalHandle, closeModal, openModal } from "./components/modal";
import { createCard, deleteCard, likeCard } from "./components/card";
import { enableValidation } from "./components/validation";

const cardsSection = document.querySelector(".places__list");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const newCardModal = document.querySelector(".popup_type_new-card");
const addNewCardButton = document.querySelector(".profile__add-button");
const editProfileForm = document.forms["edit-profile"];
const addNewCardForm = document.forms["new-place"];

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
  enableValidation({formSelector:'.popup_is-opened', 
    formInput: '.popup__input', 
    buttonSelector: '.popup__button',
    buttonInactiveClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const name = editProfileForm.elements.name;
  const description = editProfileForm.elements.description;
  document.querySelector(".profile__title").textContent = name.value;
  document.querySelector(".profile__description").textContent =
    description.value;
  closeModal(editProfileModal);
  editProfileForm.reset();
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
  const placeName = addNewCardForm.elements["place-name"];
  const link = addNewCardForm.elements["link"];
  const newCard = createCard(
    placeName.value,
    link.value,
    likeCard,
    deleteCard,
    showImage
  );
  cardsSection.prepend(newCard);
  closeModal(newCardModal);
}

addNewCardButton.addEventListener("click", () => {
  addNewCardForm.elements["place-name"].value = "";
  addNewCardForm.elements["link"].value = "";
  openModal(newCardModal);
});

for (const card of initialCards) {
  const newCard = createCard(card.name, card.link, likeCard, deleteCard, showImage);
  cardsSection.append(newCard);
}
