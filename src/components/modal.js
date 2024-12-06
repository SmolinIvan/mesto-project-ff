export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  
  document.addEventListener("keydown", escapeModalHandle);
  document.addEventListener('click', clickOverlayModalHandle)
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeModalHandle);
  document.removeEventListener('click', clickOverlayModalHandle)
}

function escapeModalHandle(event) {
  if (event.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closeModal(openedPopUp);
  }
}

export function clickOverlayModalHandle(event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup_is-opened")
  ) {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closeModal(openedPopUp);
  }

}
