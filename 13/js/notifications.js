import {bodyElement} from './search-elements';
import {isEscapeKey} from './util';

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)){
    existElement.remove();
    bodyElement.removeEventListener('click', closeNotification);
    bodyElement.removeEventListener('keydown', closeNotification);
  }
};

const appendNotification = (template, trigger = null) => {
  if (trigger) {
    trigger();
  }
  const notificationNode = template.cloneNode(true);
  bodyElement.append(notificationNode);
  bodyElement.addEventListener('click', closeNotification);
  bodyElement.addEventListener('keydown', closeNotification);
};

export {appendNotification};
