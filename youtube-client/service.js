import {searchbar, carousel, pagination} from './index.js';
import {submit} from './submit.js';

let eventdownPoint = 0;

function eventmove(event) {
  const eventmovePoint = event.pageX || event.changedTouches[0].pageX;
  carousel.self.style.transform = `translateX(${carousel.pageNumber * (-carousel.self.clientWidth) + eventmovePoint - eventdownPoint}px)`;
  return carousel.self.style.transform;
}
function eventdown(event) {
  eventdownPoint = event.pageX || event.changedTouches[0].pageX;
  carousel.self.style.transition = null;
  carousel.self.addEventListener('mousemove', eventmove);
  carousel.self.addEventListener('touchmove', eventmove);
}

function move() {
  carousel.clipsLeft = carousel.pageNumber * carousel.clipsPerPage;
  carousel.self.style.transform = `translateX(${(-100) * carousel.pageNumber}%)`;
  carousel.self.style.transition = 'transform 1s';
}

function eventup(event) {
  carousel.self.removeEventListener('mousemove', eventmove);
  carousel.self.removeEventListener('touchmove', eventmove);
  const eventupPoint = event.pageX || event.changedTouches[0].pageX;
  if (eventupPoint < eventdownPoint) {
    if (carousel.pageNumber < carousel.pagesAmount - 1) {
      carousel.pageNumber++;
      if (pagination.controls[pagination.currentControl].getAttribute('data-index') < pagination.controls.length - 2) {
        pagination.controls[pagination.currentControl].classList.remove('current');
        pagination.currentControl++;
        pagination.controls[pagination.currentControl].classList.add('current');
      } else {
          pagination.controls.forEach(elem => elem.innerText++); // eslint-disable-line
      }
    }
    move();
  }
  if (eventupPoint > eventdownPoint && carousel.pageNumber >= 0) {
    if (carousel.pageNumber > 0) {
      carousel.pageNumber--;
      if (pagination.controls[pagination.currentControl].getAttribute('data-index') > 1 || pagination.controls[pagination.currentControl].innerText === '2') {
        pagination.controls[pagination.currentControl].classList.remove('current');
        pagination.currentControl--;
        pagination.controls[pagination.currentControl].classList.add('current');
      } else {
        pagination.controls.forEach(elem => elem.innerText--); // eslint-disable-line
      }
    }
    move();
  }
  if (carousel.pageNumber >= carousel.pagesAmount / 2) {
    submit();
    carousel.clipsTotal += searchbar.youtube.maxResults;
    carousel.pagesAmount = carousel.getPagesAmount();
  }
}

function changeControl(next) {
  pagination.controls[pagination.currentControl].classList.remove('current');
  pagination.currentControl = next;
  pagination.controls[next].classList.add('current');
}

function eventclick(event) {
  const cellNumber = Number(event.target.innerText);
  if (!cellNumber) return;
  carousel.pageNumber = cellNumber - 1;
  if (event.target === pagination.firstControl) {
    if (cellNumber > 1) {
      pagination.controls.forEach(elem => elem.innerText--); // eslint-disable-line
      changeControl(1);
    }
    if (cellNumber === 1) {
      changeControl(event.target.getAttribute('data-index'));
    }
    move();
  } else if (event.target === pagination.lastControl) {
    if (carousel.pageNumber >= carousel.pagesAmount / 2) {
      submit();
      carousel.clipsTotal += searchbar.youtube.maxResults;
      carousel.pagesAmount = carousel.getPagesAmount();
    }
    changeControl(event.target.getAttribute('data-index') - 1);
    move();
    pagination.controls.forEach(elem => elem.innerText++); // eslint-disable-line no-param-reassign
  } else if (cellNumber < pagination.lastControl.innerText) {
    if (carousel.pageNumber >= carousel.pagesAmount / 2) {
      submit();
      carousel.clipsTotal += searchbar.youtube.maxResults;
      carousel.pagesAmount = carousel.getPagesAmount();
    }
    changeControl(event.target.getAttribute('data-index'));
    move();
  }
}

export {eventmove, eventdown, eventup, eventclick};
