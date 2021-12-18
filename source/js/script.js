const header = document.querySelector('.header');
const burger = header.querySelector('.header__button');

function burgerEventListener(e) {
  e.preventDefault();
  header.classList.toggle('header--active');
}

burger.addEventListener('click', burgerEventListener);
