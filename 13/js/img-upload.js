import {closeElement, showElement,isEscapeKey, modalOpenAdd, modalOpenRemove, appendNotification, templateSuccess, templateError} from './util.js';
import {errorHashtag, validateComments, isHashtagValid} from './validation.js';
import {sendData} from './api.js';

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const PERCENT = '%';

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
const textHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const textCommentsElement = imgUploadFormElement.querySelector('.text__description');
const submitButton = imgUploadFormElement.querySelector('.img-upload__submit');


const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


noUiSlider.create (effectLevelSliderElement, {
  range: {
    min: 0,
    max:100
  },
  start: 0,
  connect: 'lower'
});
const filters = {
  'none': {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    apply: () => 'none'
  },
  'chrome': {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    apply: (value) => `grayscale(${value})`
  },
  'sepia': {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    apply: (value) => `sepia(${value})`
  },
  'marvin': {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    apply: (value) => `invert(${value}%)`
  },
  'phobos': {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    apply: (value) => `blur(${value}px)`
  },
  'heat': {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    apply: (value) => `brightness(${value})`
  }
};
const resetInputFile = () => {
  imgUploadInputElement.value = '';
};

const onScaleDownClick = () => {
  let currentValue = parseInt(scaleControlValueElement.value, 10);
  if (currentValue > SCALE_MIN) {
    currentValue -= SCALE_STEP;
    scaleControlValueElement.value = currentValue + PERCENT;
    imgUploadPreviewElement.style.transform = `scale(${currentValue / 100})`;
  }
};
const onScaleUpClick = () => {
  let currentValue = parseInt(scaleControlValueElement.value, 10);
  if (currentValue < SCALE_MAX) {
    currentValue += SCALE_STEP;
    scaleControlValueElement.value = currentValue + PERCENT;
    imgUploadPreviewElement.style.transform = `scale(${currentValue / 100})`;
  }
};

const onUpdateSliderChange = (evt) => {
  const effect = evt.target.value;
  const isNoneEffect = effect === 'none';
  if (isNoneEffect) {
    closeElement(imgUploadEffectLevelElement);
  } else {
    showElement(imgUploadEffectLevelElement);
  }

  const {range, start, step, apply} = filters[effect];

  if (!effectLevelSliderElement.noUiSlider) {
    noUiSlider.create(effectLevelSliderElement, {
      start,
      range,
      step,
      connect: 'lower',
    });
  } else {

    effectLevelSliderElement.noUiSlider.updateOptions({
      range,
      start: start,
      step,
    });
  }

  effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]);
    imgUploadPreviewElement.style.filter = apply(value);
    effectLevelValueElement.value = value.toFixed(1);
  });
};


const resetForm = () => {
  imgUploadFormElement.reset();
  pristine.reset();
  scaleControlValueElement.value = SCALE_MAX + PERCENT;
  imgUploadPreviewElement.style.transform = 'scale(1)';
  document.querySelector('.effects__radio[value="none"]').checked = true;
  imgUploadPreviewElement.style.filter = '';
  effectLevelSliderElement.value = 'none';
};

const onUploadChange = () => {
  showElement(imgUploadOverlayElement);
  closeElement(imgUploadEffectLevelElement);
  modalOpenAdd();
  document.addEventListener('keydown', onEscKeyDown);
};

const onUploadCloseClick = () => {
  closeElement(imgUploadOverlayElement);
  resetForm();
  resetInputFile();
  modalOpenRemove();
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    onUploadCloseClick();
  }
}
pristine.addValidator(textHashtagsElement, isHashtagValid, () => errorHashtag(), 2, false);
pristine.addValidator(textCommentsElement, validateComments, 'Максимальная длина 140 символов', 2, false);

const sendFormData = async (formElement) => {

  if (pristine.validate()) {
    blockSubmitButton();
    textHashtagsElement.value = textHashtagsElement.value.trim().replaceAll(/\s+/g, ' ');
    textCommentsElement.value = textCommentsElement.value.trim().replaceAll(/\s+/g, ' ');
    try {
      await sendData(new FormData(formElement));
      appendNotification(templateSuccess, () => onUploadCloseClick());
    } catch {
      appendNotification(templateError);
    } finally {
      unblockSubmitButton();
    }
  }
};
const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

const initAddEventListeners = () => {
  textHashtagsElement.addEventListener('keydown', (e) => e.stopPropagation());
  textCommentsElement.addEventListener('keydown', (e) => e.stopPropagation());
  imgUploadInputElement.addEventListener('change', onUploadChange);
  previewCloseButtonElement.addEventListener('click',onUploadCloseClick);
  scaleControlSmallerElement.addEventListener('click', onScaleDownClick);
  scaleControlBiggerElement.addEventListener('click', onScaleUpClick);
  imgUploadEffectsElement.addEventListener('change', onUpdateSliderChange);
  imgUploadFormElement.addEventListener('submit', onFormSubmit);

};

initAddEventListeners();

export {imgUploadFormElement};

