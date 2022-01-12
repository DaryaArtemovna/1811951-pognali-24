const htmlElement = document.querySelector('html');
const header = document.querySelector('.header');
const burger = header.querySelector('.header__button');
const headerSize = header.offsetHeight;

function burgerEventHandler(e) {
  e.preventDefault();
  if (!header.classList.contains('header--active')) {
    header.classList.add('header--active');
    htmlElement.style.overflow = 'hidden';
    htmlElement.style.position = 'fixed';
  } else {
    header.classList.remove('header--active');
    htmlElement.style.overflow = '';
    htmlElement.style.position = '';
  }
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
