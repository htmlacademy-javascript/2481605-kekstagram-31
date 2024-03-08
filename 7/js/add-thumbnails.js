import {similarPhotos} from './data.js';
const gallareyTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const createThumbnail = (thumbnail, { url, description, likes , comments }) => {
  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  return thumbnail;
};
const fragment = document.createDocumentFragment();
const addThumbnail = () => {
  similarPhotos.forEach((photo) => {
    const thumbnail = createThumbnail(gallareyTemplate.cloneNode(true), photo);
    fragment.append(thumbnail);
  });
  picturesContainer.append(fragment);
};
addThumbnail(similarPhotos);
export{addThumbnail};
