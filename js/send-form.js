import {sendData} from './api.js';
import {appendNotification} from './notifications.js';
import {onUploadCloseClick} from './img-upload.js';
import {pristine, textCommentsElement, textHashtagsElement} from './validation.js';
import {submitButtonElement, imgUploadFormElement} from './search-elements.js';
import {templateSuccess, templateError} from './search-elements.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  submitButtonElement.toggleAttribute('disabled');
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.toggleAttribute('disabled');
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

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

const initSendForm = () => {
  imgUploadFormElement.addEventListener('submit', onFormSubmit);
};

export{initSendForm};
