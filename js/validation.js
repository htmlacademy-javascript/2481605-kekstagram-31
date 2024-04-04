import {imgUploadFormElement, textHashtagsElement, textCommentsElement} from './search-elements';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

let errorMessageHashtag = '';

const addHashtagError = () => errorMessageHashtag;

const validateComments = (value) => value.length === 0 || value.length <= 140;

const isHashtagValid = (value) => {
  errorMessageHashtag = '';
  const inputText = value.toLowerCase().trim();
  if (inputText.length === 0) {
    return true;
  }
  const inputArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      addHashtagError: 'Хэштег не может состоять только из #'
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      addHashtagError: 'Хэштеги должны разделяться пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      addHashtagError: 'Хэштег должен начинаться с символа #'
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      addHashtagError: 'Хэштеги не должны повторяться'
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      addHashtagError: `Максимальная длина хэштегов ${MAX_SYMBOLS} символов, включая #`
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      addHashtagError: `Максимальное количество хэштегов - ${MAX_HASHTAGS}`
    },
    {
      check: inputArray.some((item) => !REGEXP.test(item)),
      addHashtagError: 'Хэштег содержит недопустимые символы'
    },
  ];
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessageHashtag = rule.addHashtagError;
    }
    return !isInvalid;
  });
};

const initValidaation = () => {
  pristine.addValidator(textHashtagsElement, isHashtagValid, () => addHashtagError(), 2, false);
  pristine.addValidator(textCommentsElement, validateComments, 'Максимальная длина 140 символов', 2, false);

  textHashtagsElement.addEventListener('keydown', (e) => e.stopPropagation());
  textCommentsElement.addEventListener('keydown', (e) => e.stopPropagation());
};
initValidaation();

export {pristine, textCommentsElement, textHashtagsElement};
