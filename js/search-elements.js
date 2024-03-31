const gallareyTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

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


const imgUploadElement = document.querySelector('.img-upload');
const imgUploadInputElement = imgUploadElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = imgUploadElement.querySelector('.img-upload__overlay');
const imgUploadPreviewContainerElement = imgUploadOverlayElement.querySelector('.img-upload__preview-container');
const imgUploadPreviewElement = imgUploadPreviewContainerElement.querySelector('.img-upload__preview');
const previewCloseButtonElement = imgUploadPreviewContainerElement.querySelector('.img-upload__cancel');
const scaleControlSmallerElement = imgUploadPreviewContainerElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imgUploadPreviewContainerElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadPreviewContainerElement.querySelector('.scale__control--value');
const imgUploadEffectLevelElement = imgUploadPreviewContainerElement.querySelector('.img-upload__effect-level');
const effectLevelValueElement = imgUploadEffectLevelElement.querySelector('.effect-level__value');
const imgUploadEffectsElement = imgUploadOverlayElement.querySelector('.img-upload__effects');
const effectLevelSliderElement = imgUploadEffectLevelElement.querySelector('.effect-level__slider');
const imgUploadFormElement = imgUploadElement.querySelector('.img-upload__form');

const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');

const bodyElement = document.querySelector('body');
const dataErrorTemplate = bodyElement.querySelector('#data-error').content;
const templateSuccess = bodyElement.querySelector('#success').content;
const templateError = bodyElement.querySelector('#error').content;

const textHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const textCommentsElement = imgUploadFormElement.querySelector('.text__description');

export {gallareyTemplate,
  picturesContainerElement,
  bigPictureCloseButtonElement,
  bigPictureImgElement,
  socialCommentTemplateElement,
  likesCountElement,
  socialCaptionElement,
  commentLoaderElement,
  commentShownCountElement,
  commentTotalCountElement,
  commentsLoaderElement,
  socialCommentsElement,
  bigPictureElement,
  imgUploadInputElement,
  imgUploadOverlayElement,
  imgUploadPreviewElement,
  previewCloseButtonElement,
  scaleControlSmallerElement,
  scaleControlBiggerElement,
  scaleControlValueElement,
  effectLevelValueElement,
  imgUploadEffectsElement,
  effectLevelSliderElement,
  submitButtonElement,
  imgUploadEffectLevelElement,
  imgUploadFormElement,
  bodyElement,
  dataErrorTemplate,
  templateSuccess,
  templateError,
  textHashtagsElement,
  textCommentsElement
};
