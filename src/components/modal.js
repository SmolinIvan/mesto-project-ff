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
  const openedPopUp = document.querySelector(".popup_is-opened");
  if (event.key === "Escape") {
    openedPopUp.classList.remove("popup_is-opened");
  }
  document.removeEventListener("keydown", escapeModalHandle);
  document.removeEventListener('click', clickOverlayModalHandle)
}

function clickOverlayModalHandle(event) {
  const openedPopUp = document.querySelector(".popup_is-opened");
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup_is-opened")
  ) {
    openedPopUp.classList.remove("popup_is-opened")
    document.removeEventListener("keydown", escapeModalHandle);
    document.removeEventListener('click', clickOverlayModalHandle)
  }

}
