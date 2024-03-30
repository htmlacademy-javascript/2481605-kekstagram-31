import {closeElement, showElement,isEscapeKey, modalOpenAdd, modalOpenRemove} from './util.js';
import {picturesContainerElement, bigPictureCloseButtonElement, bigPictureImgElement, socialCommentTemplateElement,
  likesCountElement, socialCaptionElement, commentLoaderElement, commentShownCountElement,
  commentTotalCountElement, commentsLoaderElement, socialCommentsElement, bigPictureElement} from './search-elements.js';

const COUNT_STEP = 5;

let newPhotos = [];
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
  const currentPhoto = newPhotos.find((photo) => photo.id === Number(pictureId));
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
  picturesContainerElement.addEventListener('click', onPicturesContainerClick);
  bigPictureCloseButtonElement.addEventListener('click', closeBigPicture);
  commentsLoaderElement.addEventListener('click', showMoreComments);
};
const initializeGallery = (photos) => {
  newPhotos = photos;
  initaddEventListeners();
};

export {initializeGallery};
