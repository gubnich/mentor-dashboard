class Youtube {
  constructor() {
    this.base = 'https://www.googleapis.com/youtube/v3';
    this.key = 'AIzaSyANtg_BKDQBNwrJTxtyrMDVwGKqF4NhcVw';
    this.next = '';
    this.maxResults = 18;
  }

  search(query) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open('GET', `${this.base}/search?part=snippet&type=video&key=${this.key}&q=${query}&maxResults=${this.maxResults}&pageToken=${this.next}`, true);
      xhr.onload = () => resolve(xhr);
      xhr.send();
    });
  }

  getViews(id) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open('GET', `${this.base}/videos?part=statistics&key=${this.key}&id=${id}`);
      xhr.onload = () => resolve(xhr);
      xhr.send();
    });
  }
}

export default Youtube;
