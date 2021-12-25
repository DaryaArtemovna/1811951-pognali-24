const header = document.querySelector('.header');
const burger = header.querySelector('.header__button');
const headerSize = header.offsetHeight;

function burgerEventHandler(e) {
  e.preventDefault();
  header.classList.toggle('header--active');
}

burger.addEventListener('click', burgerEventHandler);


function windowScrollEventHandler() {
  if (window.pageYOffset >= headerSize) {
    header.classList.add('header--scroll');
  } else {
    header.classList.remove('header--scroll');
  }
}

window.addEventListener('scroll', windowScrollEventHandler);
