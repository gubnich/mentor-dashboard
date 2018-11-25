import SearchBar from './components/searchbar/Searchbar.js';
import Carousel from './components/carousel/Carousel.js';
import Pagination from './components/pagination/Pagination.js';
import {submit} from './submit.js';
import {eventdown,  eventup, eventclick} from './service.js';

const body = document.createElement('div');
body.classList.add('wrapper');
const searchbar = new SearchBar();
const carousel = new Carousel();
const pagination = new Pagination();
body.append(searchbar.self);
body.append(carousel.self);
body.append(pagination.self);
document.body.prepend(body);



let diff;
window.onresize = () => {
  carousel.updateProps();
  diff = carousel.pageNumber - carousel.prevPageNumber;
  if (carousel.prevClipsPerPage - carousel.clipsPerPage > 0) {
    carousel.self.style.transform = `translateX(${(-100) * carousel.pageNumber}%)`;
    carousel.self.style.transition = 'transform 1s';
    pagination.controls.forEach((elem) => {
      elem.innerText = (Number(elem.innerText) + diff);  // eslint-disable-line
    });
  }
  if (carousel.prevClipsPerPage - carousel.clipsPerPage < 0) {
    carousel.self.style.transform = `translateX(${(-100) * carousel.pageNumber}%)`;
    carousel.self.style.transition = 'transform 1s';
    pagination.controls.forEach(elem => elem.innerText = Number(elem.innerText) + diff); // eslint-disable-line
  }
};








pagination.self.addEventListener('touchstart', (event) => {
  const span = document.createElement('span');
  if (event.target.innerText.length < 6) {
    span.innerText = event.target.innerText;
  }
  span.classList.add('display');
  event.target.append(span);
});
pagination.self.addEventListener('touchend', (event) => {
  event.target.lastChild.remove();
});



searchbar.self.addEventListener('submit', submit);
carousel.self.addEventListener('mousedown', eventdown);
carousel.self.addEventListener('touchstart', eventdown);

carousel.self.addEventListener('mouseup', eventup);
carousel.self.addEventListener('touchend', eventup);

pagination.self.addEventListener('click', eventclick);

export {searchbar, carousel, pagination};
