class Clip {
  constructor(item) {
    this.self = document.createElement('li');
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
    this.link = document.createElement('a');
    this.preview = document.createElement('img');
    this.author = document.createElement('span');
    this.description = document.createElement('p');
    this.description.innerText = item.snippet.description;
    this.author.classList.add('author');
    this.author.innerText = item.snippet.channelTitle;
    this.pubdate = document.createElement('span');
    this.pubdate.classList.add('pubdate');
    this.pubdate.innerText = new Date(item.snippet.publishedAt).toLocaleDateString('en-US');
    this.views = document.createElement('span');
    this.views.classList.add('views');
    this.preview.src = item.snippet.thumbnails.medium.url;
    this.preview.alt = 'clip preview';
    this.link.href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
    this.link.innerText = item.snippet.title;
    this.self.append(this.figure);
    this.figure.append(this.figcaption);
    this.figcaption.append(this.link);
    this.figure.append(this.preview);
    this.figure.append(this.author);
    this.figure.append(this.pubdate);
    this.figure.append(this.views);
    this.figure.append(this.description);
  }
}

export default Clip;
