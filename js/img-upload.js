import {closeElement, showElement,isEscapeKey, modalOpenAdd, modalOpenRemove} from './util.js';
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
const scaleControlSmaller = imgUploadPreviewContainerElement.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadPreviewContainerElement.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadPreviewContainerElement.querySelector('.scale__control--value');
const imgUploadEffectLevel = imgUploadPreviewContainerElement.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const imgUploadEffects = imgUploadOverlayElement.querySelector('.img-upload__effects');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');

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

const showImgUpload = () => {
  showElement(imgUploadOverlayElement);
  modalOpenAdd();
  document.addEventListener('keydown', onEscKeyDown);
};

const closeImgUpload = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  closeElement(imgUploadOverlayElement);
  modalOpenRemove();
  document.removeEventListener('keydown', onEscKeyDown);
};
function onEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    closeImgUpload();
  }
}

const scaleDown = () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue > SCALE_MIN) {
    currentValue -= SCALE_STEP;
    scaleControlValue.value = currentValue + PERCENT;
    imgUploadPreviewElement.style.transform = `scale(${currentValue / 100})`;
  }
};
const scaleUp = () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue < SCALE_MAX) {
    currentValue += SCALE_STEP;
    scaleControlValue.value = currentValue + PERCENT;
    imgUploadPreviewElement.style.transform = `scale(${currentValue / 100})`;
  }
};

noUiSlider.create (effectLevelSlider, {
  range: {
    min: 0,
    max:100
  },
  start: 0,
  connect: 'lower'
});

imgUploadEffectLevel.style.display = 'none';
const updateSlider = (evt) => {
  const effect = evt.target.value;
  const isNoneEffect = effect === 'none';
  if (isNoneEffect) {
    imgUploadEffectLevel.style.display = 'none';
  } else {
    imgUploadEffectLevel.style.display = 'block';
  }

  const {range, start, step, apply} = filters[effect];

  if (!effectLevelSlider.noUiSlider) {
    noUiSlider.create(effectLevelSlider, {
      start,
      range,
      step,
      connect: 'lower',
    });
  } else {

    effectLevelSlider.noUiSlider.updateOptions({
      range,
      start: start,
      step,
    });
  }

  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]);
    imgUploadPreviewElement.style.filter = apply(value);
    effectLevelValue.value = value.toFixed(1);
  });
};

const initaddEventListeners = () => {
  imgUploadInputElement.addEventListener('change', showImgUpload);
  previewCloseButtonElement.addEventListener('click',closeImgUpload);
  scaleControlSmaller.addEventListener('click', scaleDown);
  scaleControlBigger.addEventListener('click', scaleUp);
  imgUploadEffects.addEventListener('change', updateSlider);
};

initaddEventListeners();

