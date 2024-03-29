// import {imgUploadFormElement, sliderValue} from './img-upload';
/*
const textHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const textCommentsElement = imgUploadFormElement.querySelector('.text__description');


const pristineValidate = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',

});

const validateHashtags = (value) =>{
  if (value === ''){
    return true;
  }

  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const valueArray = value.split(' ');
  const valueSet = new Set(valueArray);
  if (valueArray.length !== valueSet.size || valueArray.length > 5){
    return false;
  }
  for (const item of valueArray) {
    if (!regexp.test(item)) {
      return false;
    }
  }
  return true;
};

const validateComments = (value) => value.length === 0 || value.length <= 140;


const initFunctions = () => {
  textHashtagsElement.addEventListener('keydown', (e) => e.stopPropagation());
  textCommentsElement.addEventListener('keydown', (e) => e.stopPropagation());
  pristineValidate.addValidator(textHashtagsElement, validateHashtags, 'Неверный хэштег');
  pristineValidate.addValidator(textCommentsElement, validateComments, 'Комментарий не должен превышать 140 символов');
  imgUploadFormElement.addEventListener('submit', (evt) => sendFormData(imgUploadFormElement, evt));
};

initFunctions();
export{textHashtagsElement, textCommentsElement, pristineValidate};
*/


const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;


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

export {errorHashtag, validateComments, isHashtagValid};

/*
const validateComments = (value) => {

  if (value.length === 0) {
    return {isValid:true};
  }
  if (value.length >= 140){
    return {isValid: false, error: 'Комментарий не должен превышать 140 символов'};
  }
  return {isValid:true};
};
const validateHashtags = (value, MAX_SYMBOLS = 20, MAX_HASHTAGS = 5, regexp = /^#[a-zа-яё0-9]{1,19}$/i) => {
  const inputText = value.toLowerCase().trim();
  if (inputText.length === 0) {
    return {isValid: true};
  }
  const inputArray = inputText.split(/\s+/);
  if (inputArray.some((item) => item === '#')){
    return {isValid: false, error: 'Хэштег не может состоять только из #'};
  }
  if (inputArray.some((item) => item.slice(1).includes('#'))){
    return {isValid: false, error: 'Хэштеги должны разделяться пробелами'};
  }
  if (inputArray.some((item) => item[0] !== '#')){
    return {isValid: false, error: 'Хэштег должен начинаться с символа #'};
  }

  if (inputArray.some((item, num, array) => array.includes(item, num + 1))){
    return {isValid: false, error: 'Хэштеги не должны повторяться'};
  }
  if (inputArray.some((item) => item.length > MAX_SYMBOLS)){
    return {isValid: false, error: `Максимальная длина хэштегов ${MAX_SYMBOLS} символов, включая #`};
  }
  if (inputArray.length > MAX_HASHTAGS){
    return {isValid: false, error: `Максимальное количество хэштегов - ${MAX_HASHTAGS}`};
  }
  if (inputArray.some((item) => !regexp.test(item))){
    return {isValid: false, error: 'Хэштег содержит недопустимые символы'};
  }
  return {isValid:true};
};
export {validateHashtags, validateComments};
*/


/*
const isCommentsValid = (value) => {
  errorMessageComment = '';
  if (value.length === 0) {
    return true;
  }
  const rules = [
    {
      check: value.length >= 140,
      errorComment: 'Комментарий не должен превышать 140 символов'
    }
  ];
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessageComment = rule.errorComment;
    }
    return !isInvalid;
  });
};
*/
