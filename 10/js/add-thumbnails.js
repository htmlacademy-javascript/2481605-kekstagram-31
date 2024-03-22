import {similarPhotos} from './data.js';
const gallareyTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

similarPhotos.forEach(({id, url, description, comments, likes}) => {
  const thumbnail = gallareyTemplate.cloneNode(true);
  thumbnail.dataset.pictureId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  fragment.appendChild(thumbnail);
});
picturesContainer.appendChild(fragment);
export{picturesContainer};
