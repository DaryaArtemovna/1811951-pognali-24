const filter = document.querySelector('.filter');
const filterButtons = filter.querySelectorAll('.filter__button');

function buttonsClickHandler(e) {
  e.preventDefault();
  this.classList.toggle('filter__button--active');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', buttonsClickHandler);
});
