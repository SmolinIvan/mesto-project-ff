const cardsSection = document.querySelector('.places__list');

function createCard (name, link, deleteAction) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').setAttribute('src', link);
    cardElement.querySelector('.card__title').textContent = name;
    const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
    buttonDeleteCard.addEventListener('click', deleteAction);
    return cardElement;
}

const deleteCard = function () {
    const deleteButton = this;
    const card = deleteButton.closest('.card');
    card.remove();
}

for (const card of initialCards) {
    const newCard =  createCard(card.name, card.link, deleteCard);
    cardsSection.append(newCard);
};
