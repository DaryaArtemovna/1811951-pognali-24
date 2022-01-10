const letters = document.querySelector(".letters");
const buttons = letters.querySelectorAll(".letters__button");
const countries = document.querySelector('.countries');
const countriesSections = countries.querySelectorAll('.countries__wrapper');

function changeCountriesSection(letter) {
  countriesSections.forEach(section => {
    const sectionLetter = section.querySelector('.countries__letter').textContent;

    if (letter === sectionLetter) {
      const activeSection = countries.querySelector('.countries__wrapper--active');
      activeSection.classList.remove('countries__wrapper--active');
      section.classList.add('countries__wrapper--active');
    }
  });
}

function buttonClickHandler(e) {
  e.preventDefault();
  const activeButton = letters.querySelector(".letters__button--active");
  const letter = this.textContent;
  if (activeButton) {
    activeButton.classList.remove("letters__button--active");
  }
  this.classList.add("letters__button--active");
  changeCountriesSection(letter)

}

buttons.forEach((button) => {
  button.addEventListener("click", buttonClickHandler);
});
