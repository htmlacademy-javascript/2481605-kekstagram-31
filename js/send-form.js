import {sendData} from './api.js';
import {appendNotification} from './notifications.js';
import {onUploadCloseClick} from './img-upload.js';
import {pristine, textCommentsElement, textHashtagsElement} from './validation.js';
import {submitButton, imgUploadFormElement} from './search-elements.js';
import {templateSuccess, templateError} from './search-elements.js';

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

const onFormSubmit = (qwe) => {
  qwe.preventDefault();
  sendFormData(qwe.target);
};

const initSendForm = () => {
  imgUploadFormElement.addEventListener('submit', onFormSubmit);
};
initSendForm();

export{initSendForm};
