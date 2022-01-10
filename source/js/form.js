const selectButton = document.querySelector('.land__button--empty');

function selectButtonClickHandler(e) {
  e.preventDefault();
  this.classList.toggle("land__button--active");
}

selectButton.addEventListener('click', selectButtonClickHandler);
