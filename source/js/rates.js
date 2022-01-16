const ESC = 27;
const modal = document.querySelector('.rates');
const modalCloseBtn = modal.querySelector('.rates__close');
const modalShowBtn = document.querySelector('.profile__button');

const modalShowClickHander = (e) => {
  e.preventDefault();
  modal.classList.add('rates--show');
}

const modalCloseClickHander = (e) => {
  e.preventDefault();
  modal.classList.remove('rates--show');
}

const closeModalOnEsc = (e) => {
  if (e.keyCode === ESC) { modal.classList.remove('rates--show') };
}

window.addEventListener('keydown', closeModalOnEsc);
modalShowBtn.addEventListener('click', modalShowClickHander);
modalCloseBtn.addEventListener('click', modalCloseClickHander);
