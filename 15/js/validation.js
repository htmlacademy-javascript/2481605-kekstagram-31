import {imgUploadFormElement, textHashtagsElement, textCommentsElement} from './search-elements';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

let errorMessageHashtag = '';

const errorHashtag = () => errorMessageHashtag;

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
      errorHashtag: 'Хэштег не может состоять только из #'
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      errorHashtag: 'Хэштеги должны разделяться пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      errorHashtag: 'Хэштег должен начинаться с символа #'
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      errorHashtag: 'Хэштеги не должны повторяться'
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      errorHashtag: `Максимальная длина хэштегов ${MAX_SYMBOLS} символов, включая #`
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      errorHashtag: `Максимальное количество хэштегов - ${MAX_HASHTAGS}`
    },
    {
      check: inputArray.some((item) => !regexp.test(item)),
      errorHashtag: 'Хэштег содержит недопустимые символы'
    },
  ];
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessageHashtag = rule.errorHashtag;
    }
    return !isInvalid;
  });
};

pristine.addValidator(textHashtagsElement, isHashtagValid, () => errorHashtag(), 2, false);
pristine.addValidator(textCommentsElement, validateComments, 'Максимальная длина 140 символов', 2, false);

textHashtagsElement.addEventListener('keydown', (e) => e.stopPropagation());
textCommentsElement.addEventListener('keydown', (e) => e.stopPropagation());

export {pristine, textCommentsElement, textHashtagsElement};
