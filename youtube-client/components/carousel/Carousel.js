class Carousel {
  constructor() {
    this.self = document.createElement('ul');
    this.self.classList.add('carousel');
    this.pagesAmount = 0;
    this.pageNumber = 0;
    this.clipsTotal = 18;
    this.prevPageNumber = 0;
    this.clipsPerPage = 0;
    this.clipsLeft = 0;
  }

  getClipsPerPage() {
    return Math.round(this.self.clientWidth / this.self.firstElementChild.offsetWidth);
  }

  getPagesAmount() {
    return Math.floor(this.clipsTotal / this.clipsPerPage);
  }

  getClipsLeft() {
    return this.pageNumber * this.clipsPerPage;
  }

  updateProps() {
    this.prevClipsPerPage = this.clipsPerPage;
    this.prevPageNumber = this.pageNumber;
    this.clipsPerPage = this.getClipsPerPage();
    this.pagesAmount = this.getPagesAmount();
    this.pageNumber = Math.floor(this.clipsLeft / this.clipsPerPage);
  }
}

export default Carousel;
