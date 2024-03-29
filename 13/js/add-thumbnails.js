const gallareyTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const addThumbnails = (({id, url, likes, comments}) => {
  const thumbnail = gallareyTemplate.cloneNode(true);
  thumbnail.dataset.pictureId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  picturesContainerElement.appendChild(thumbnail);
});

export{picturesContainerElement, addThumbnails};
