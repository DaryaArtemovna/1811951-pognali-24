const finder = document.querySelector('.finder');
const button = finder.querySelector('.finder__button');
const list = finder.querySelector('.finder__list');
const dropdown = finder.querySelector('.finder__dropdown');
const links = list.querySelectorAll('.finder__link');

function buttonClickHander(e) {
  e.preventDefault();
  button.classList.toggle('finder__button--active');
  list.classList.toggle('finder__list--active');
  dropdown.classList.toggle('finder__dropdown--active');
}

function linkClickHander(e) {
  e.preventDefault();
  const activeLink = list.querySelector('.finder__link--active');

  if (activeLink) {
    activeLink.classList.remove('finder__link--active');
  }

  this.classList.add('finder__link--active');
}

button.addEventListener('click', buttonClickHander);

links.forEach(link => {
  link.addEventListener('click', linkClickHander)
});
