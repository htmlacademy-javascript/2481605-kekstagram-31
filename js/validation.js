const form = document.querySelector('.img-upload form');
const textHashtags = form.querySelector('.text__hashtags');
const textComments = form.querySelector('.text__description');

const pristineValidate = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div'
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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristineValidate.validate();
  if (isValid) {
    form.submit();
  }
};


const initFunctions = () => {
  textHashtags.addEventListener('keydown', (e) => e.stopPropagation());
  textComments.addEventListener('keydown', (e) => e.stopPropagation());
  pristineValidate.addValidator(textHashtags, validateHashtags, 'Неверный хэштег');
  pristineValidate.addValidator(textComments, validateComments, 'Комментарий не должен превышать 140 символов');
  form.addEventListener('submit', onFormSubmit);
};

initFunctions();
export{textHashtags, textComments};
