export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  const page = document.querySelector('.page');
  page.addEventListener('keydown', closeModalHandle)

}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('keydown', closeModalHandle)
}

function closeModalHandle(event) {
  const openedPopUp = document.querySelector('.popup_is-opened');
  if (event.key === 'Escape') {
    openedPopUp.classList.remove('popup_is-opened');
  }
}