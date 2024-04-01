import {closeElement, showElement,isEscapeKey, modalOpenAdd, modalOpenRemove} from './util.js';
import {imgUploadInputElement, imgUploadOverlayElement, imgPreviewElement, previewCloseButtonElement, scaleControlSmallerElement,
  scaleControlBiggerElement, scaleControlValueElement, effectLevelValueElement, imgUploadEffectsElement, effectLevelSliderElement,
  imgUploadEffectLevelElement, imgUploadFormElement} from './search-elements.js';
import {pristine} from './validation.js';
import {appendPreviewPhoto} from './append-preview-photo.js';

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const PERCENT = '%';

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
    imgPreviewElement.style.transform = `scale(${currentValue / 100})`;
  }
};
const onScaleUpClick = () => {
  let currentValue = parseInt(scaleControlValueElement.value, 10);
  if (currentValue < SCALE_MAX) {
    currentValue += SCALE_STEP;
    scaleControlValueElement.value = currentValue + PERCENT;
    imgPreviewElement.style.transform = `scale(${currentValue / 100})`;
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
    imgPreviewElement.style.filter = apply(value);
    const formattedValue = Number.isInteger(value) ? value.toString() : value.toFixed(1);
    effectLevelValueElement.setAttribute('value', formattedValue);
  });
};

const resetForm = () => {
  imgUploadFormElement.reset();
  pristine.reset();
  scaleControlValueElement.value = SCALE_MAX + PERCENT;
  imgPreviewElement.style.transform = 'scale(1)';
  document.querySelector('.effects__radio[value="none"]').checked = true;
  imgPreviewElement.style.filter = '';
  effectLevelSliderElement.value = 'none';
};

const onUploadChange = () => {
  showElement(imgUploadOverlayElement);
  closeElement(imgUploadEffectLevelElement);
  appendPreviewPhoto();
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

const initUploadEvents = () => {
  imgUploadInputElement.addEventListener('change', onUploadChange);
  previewCloseButtonElement.addEventListener('click',onUploadCloseClick);
  scaleControlSmallerElement.addEventListener('click', onScaleDownClick);
  scaleControlBiggerElement.addEventListener('click', onScaleUpClick);
  imgUploadEffectsElement.addEventListener('change', onUpdateSliderChange);
};

initUploadEvents();

export {onUploadCloseClick};

