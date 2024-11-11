const cardsSection = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button')
const editProfilePopUp = document.querySelector('.popup_type_edit');
const editProfilePopUpButtonClose = editProfilePopUp.querySelector('.popup__close')
const saveProfileButton = editProfilePopUp.querySelector('.popup__button')

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopUp = document.querySelector('.popup_type_new-card')
const addCardPopUpCloseButton = addCardPopUp.querySelector('.popup__close')
const saveCardButton = addCardPopUp.querySelector('.popup__button')

const imagePopUp = document.querySelector('.popup_type_image');
const imagePopUpCloseButton = imagePopUp.querySelector('.popup__close');

editProfileButton.addEventListener('click', function () {
    editProfilePopUp.classList.add('popup_is-opened');
})

editProfilePopUpButtonClose.addEventListener('click', function () {
    editProfilePopUp.classList.remove('popup_is-opened');
})

addCardButton.addEventListener('click', function () {
    addCardPopUp.classList.add('popup_is-opened');
})

addCardPopUpCloseButton.addEventListener('click', function () {
    addCardPopUp.classList.remove('popup_is-opened');
})

imagePopUpCloseButton.addEventListener('click', function () {
    imagePopUp.classList.remove('popup_is-opened');
})

function changeProfileData(name, speciality) {
    document.querySelector('.profile__title').textContent = name
    document.querySelector('.profile__description').textContent = speciality;
}

saveProfileButton.addEventListener('click', function () {
    const yourName = editProfilePopUp.querySelector('.popup__input_type_name');
    const yourSpeciality = editProfilePopUp.querySelector('.popup__input_type_description');

    if (yourName.value !== '' && yourSpeciality.value !== '') {
        editProfilePopUp.classList.remove('popup_is-opened')
        changeProfileData(yourName.value, yourSpeciality.value);
        yourName.value = '';
        yourSpeciality.value = '';
    }
})

function cardButtonsRender (element) {
    const buttonDeleteCard = element.querySelector('.card__delete-button');
    buttonDeleteCard.addEventListener('click', function () {
        element.remove();
    });

    const buttonLikeCard = element.querySelector('.card__like-button');
    buttonLikeCard.addEventListener('click', function (event) {
        event.target.classList.toggle('card__like-button_is-active');
    });

    const cardImage = element.querySelector('.card__image');
    cardImage.addEventListener('click', function () {
        document.querySelector('.popup_type_image').classList.add('popup_is-opened');
        const popUpImageLink = element.querySelector('.card__image').getAttribute('src');
        const popUpImageDescription = element.querySelector('.card__title').textContent;
        document.querySelector('.popup__image').setAttribute('src', popUpImageLink);
        document.querySelector('.popup__caption').textContent = popUpImageDescription;
    })
}

function addCard(titleValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = titleValue;
    cardElement.querySelector('.card__image').src = linkValue;

    cardButtonsRender(cardElement);
    cardsSection.append(cardElement);
}

saveCardButton.addEventListener('click', function () {
    const cardTitle = addCardPopUp.querySelector('.popup__input_type_card-name');
    const imgLink = addCardPopUp.querySelector('.popup__input_type_url');

    if (cardTitle.value !== '' && imgLink.value !== '') {
        addCard(cardTitle.value, imgLink.value);
        addCardPopUp.classList.remove('popup_is-opened');
        cardTitle.value = '';
        imgLink.value = '';
    }
});

for (const card of initialCards) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').setAttribute('src', card.link);
    cardElement.querySelector('.card__title').textContent = card.name;

    cardButtonsRender(cardElement);
    cardsSection.append(cardElement);
}
