import Youtube from './Youtube.js';

class SearchBar {
  constructor() {
    this.self = document.createElement('form');
    this.self.classList.add('search-bar');
    this.submit = document.createElement('input');
    this.submit.value = '';
    this.input = document.createElement('input');
    this.submit.setAttribute('type', 'submit');
    this.input.setAttribute('type', 'text');
    this.self.append(this.submit);
    this.self.append(this.input);
    this.youtube = new Youtube();
  }
}

export default SearchBar;
