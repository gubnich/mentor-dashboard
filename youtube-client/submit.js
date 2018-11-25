import {searchbar, carousel, pagination} from './index.js';
import Clip from './components/carousel/Clip.js';

function submit(event) {
  if (event) {
    event.preventDefault();
  }
  searchbar.youtube.search(searchbar.input.value).then(
    (result) => {
      const clips = document.createDocumentFragment();
      const items = JSON.parse(result.response).items;
      searchbar.youtube.next = JSON.parse(result.response).nextPageToken;
      items.forEach((item) => {
        const clip = new Clip(item);
        searchbar.youtube.getViews(item.id.videoId).then(
          (res) => {
            const stats = JSON.parse(res.response).items;
            clip.views.innerText = stats[0].statistics.viewCount;
          },
        );
        clips.append(clip.self);
      });
      carousel.self.append(clips);
      carousel.updateProps();
      if (pagination.empty) {
        const controlsAmount = Math.round(searchbar.youtube.maxResults / carousel.clipsPerPage);
        pagination.updateControls(controlsAmount);
      }
    },
    (result) => {
    },
  );
}

export {submit};
