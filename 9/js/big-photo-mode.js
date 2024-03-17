import {closeElement, showElement,isEscapeKey, modalOpenAdd, modalOpenRemove} from './util.js';
import {picturesContainer} from './add-thumbnails.js';
import {similarPhotos} from './data.js';
const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');

const COUNT_STEP = 5;
let currentCount = 0;
let globalComments = [];
const hideLoadMoreButton = () => {
  commentLoader.classList.add('hidden');
};
const showLoadMoreButton = () => {
  commentLoader.classList.remove('hidden');
};
const updateBigPictureInfo = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
};

const addComments = (comments) => {
  const fragment = document.createDocumentFragment();
  const commentsToShow = comments.slice(currentCount, currentCount + COUNT_STEP);
  commentsToShow.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(socialComment);
  });
  socialComments.appendChild(fragment);
  currentCount += commentsToShow.length;
  commentShownCount.textContent = currentCount;
  if (currentCount >= comments.length) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
};

const showMoreComments = () => {
  addComments(globalComments);
};

const openBigPicture = (pictureId) => {
  socialComments.innerHTML = '';
  currentCount = 0;
  const currentPhoto = similarPhotos.find((photo) => photo.id === Number(pictureId));
  updateBigPictureInfo(currentPhoto);
  globalComments = currentPhoto.comments;
  commentTotalCount.textContent = globalComments.length;
  addComments(globalComments);
  showElement(bigPicture);
  modalOpenAdd();
  document.addEventListener('keydown', onEscKeyDown);
};

document.querySelector('.comments-loader').addEventListener('click', showMoreComments);

const closeBigPicture = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  closeElement(bigPicture);
  modalOpenRemove();
  document.removeEventListener('keydown', onEscKeyDown);
};
function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}
closeButton.addEventListener('click', closeBigPicture);

picturesContainer.addEventListener('click', (evt) => {
  const currentThumbnailPicture = evt.target.closest('.picture');
  if (currentThumbnailPicture){
    openBigPicture(currentThumbnailPicture.dataset.pictureId);
  }
});
