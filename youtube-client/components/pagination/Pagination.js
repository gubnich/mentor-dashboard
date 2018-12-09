class Pagination {
  constructor() {
    this.self = document.createElement('ul');
    this.self.classList.add('controls');
    this.controls = [];
    this.empty = true;
    this.firstControl = 0;
    this.lastControl = 0;
    this.currentControl = 0;
  }

  updateControls(amount) {
    const temp = document.createDocumentFragment();
    this.controls = [];
    for (let i = 1; i <= amount && i < 6; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      li.append(a);
      a.innerText = i;
      a.setAttribute('data-index', i - 1);
      temp.append(li);
      this.controls.push(a);
    }
    this.controls[this.currentControl].classList.add('current');
    this.self.append(temp);
    this.empty = false;
    this.firstControl = this.controls[0]; // eslint-disable-line
    this.lastControl = this.controls[this.controls.length - 1];
  }
}

export default Pagination;
