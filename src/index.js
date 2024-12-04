import './styles/index.css';
import { initialCards } from './scripts/cards';
import { closeModal, openModal } from './components/modal';
import { createCard, deleteCard } from './components/card';

const cardsSection = document.querySelector('.places__list');
const editProfileModal = document.querySelector('.popup_type_edit')
const editProfileButton = document.querySelector('.profile__edit-button')
const newCardModal = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];

const popUps = document.querySelectorAll('.popup');
for (const popUp of popUps) {
  popUp.classList.add('popup_is-animated');
  popUp.addEventListener('click', (event) => {
   if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup_is-opened'))  {
    closeModal(popUp)
   }
  })
}

editProfileForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = editProfileForm.elements.name;
  const description = editProfileForm.elements.description;
  document.querySelector('.profile__title').textContent = name.value;
  document.querySelector('.profile__description').textContent = description.value;
  closeModal(editProfileModal);
  name.value= '';
  description.value = '';
}


addCardForm.addEventListener('submit', handleCardSave)

function handleCardSave(evt) {
  evt.preventDefault();
  const placeName = addCardForm.elements['place-name'];
  const link = addCardForm.elements['link'];
  const newCard = createCard(placeName.value, link.value, deleteCard, openModal)
  cardsSection.prepend(newCard);
  closeModal(newCardModal);
  placeName.value= '';
  link.value = '';
}


editProfileButton.addEventListener('click', () =>  openModal(editProfileModal));
addNewCardButton.addEventListener('click', () =>  openModal(newCardModal))

for (const card of initialCards) {
    const newCard =  createCard(card.name, card.link, deleteCard, openModal);
    cardsSection.append(newCard);
}
