import {closeElement, showElement,isEscapeKey, modalOpenAdd, modalOpenRemove} from './util.js';
import {picturesContainer} from './add-thumbnails.js';
import {similarPhotos} from './data.js';
const COUNT_STEP = 5;
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentTemplateElement = socialCommentsElement.querySelector('.social__comment');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let currentCount = 0;
let globalComments = [];


const hideLoadMoreButton = () => {
  commentLoaderElement.classList.add('hidden');
};
const showLoadMoreButton = () => {
  commentLoaderElement.classList.remove('hidden');
};
const updateBigPictureInfo = (photo) => {
  bigPictureImgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  socialCaptionElement.textContent = photo.description;
};

const addComments = (comments) => {
  const fragment = document.createDocumentFragment();
  const commentsToShow = comments.slice(currentCount, currentCount + COUNT_STEP);
  commentsToShow.forEach((comment) => {
    const socialComment = socialCommentTemplateElement.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(socialComment);
  });
  socialCommentsElement.appendChild(fragment);
  currentCount += commentsToShow.length;
  commentShownCountElement.textContent = currentCount;
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
  socialCommentsElement.innerText = '';
  currentCount = 0;
  const currentPhoto = similarPhotos.find((photo) => photo.id === Number(pictureId));
  updateBigPictureInfo(currentPhoto);
  globalComments = currentPhoto.comments;
  commentTotalCountElement.textContent = globalComments.length;
  addComments(globalComments);
  showElement(bigPictureElement);
  modalOpenAdd();
  document.addEventListener('keydown', onEscKeyDown);
};

const closeBigPicture = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  closeElement(bigPictureElement);
  modalOpenRemove();
  document.removeEventListener('keydown', onEscKeyDown);
};
function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const onPicturesContainerClick = (evt) => {
  const currentThumbnailPicture = evt.target.closest('.picture');
  if (currentThumbnailPicture){
    openBigPicture(currentThumbnailPicture.dataset.pictureId);
  }
};
const initaddEventListeners = () => {
  picturesContainer.addEventListener('click', onPicturesContainerClick);
  bigPictureCloseButtonElement.addEventListener('click', closeBigPicture);
  commentsLoaderElement.addEventListener('click', showMoreComments);
};

initaddEventListeners();
