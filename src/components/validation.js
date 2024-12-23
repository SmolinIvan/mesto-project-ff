export function enableValidation({
  formSelector,
  formInput,
  inputErrorClass,
  errorClass,
  buttonSelector,
  buttonInactiveClass,
}) {
  const formElement = document.querySelector(formSelector);
  const buttonElement = formElement.querySelector(buttonSelector);
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(formInput));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, buttonInactiveClass);
    });
  });
  toggleButtonState(inputList, buttonElement);
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы"
    );
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, buttonInactiveClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonInactiveClass);
  } else {
    buttonElement.classList.remove(buttonInactiveClass);
    buttonElement.disabled = false;
  }
}

export function clearValidation(form, {
  formSelector,
  formInput,
  buttonSelector,
  buttonInactiveClass,
  inputErrorClass,
  errorClass,
}) {
  const buttonElement = form.querySelector(buttonSelector);
  buttonElement.classList.add(buttonInactiveClass);
  buttonElement.disabled = true;
  const inputList = Array.from(form.querySelectorAll(formInput));
  inputList.forEach((inputElement) => {
    hideInputError(
      form,
      inputElement,
      inputErrorClass,
      errorClass
    ) 
  });
  

}