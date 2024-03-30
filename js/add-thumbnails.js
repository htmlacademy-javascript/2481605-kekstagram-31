import {picturesContainerElement, gallareyTemplate} from './search-elements';

const addThumbnails = (({id, url, likes, comments}) => {
  const thumbnail = gallareyTemplate.cloneNode(true);
  thumbnail.dataset.pictureId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  picturesContainerElement.appendChild(thumbnail);
});

export{addThumbnails};
