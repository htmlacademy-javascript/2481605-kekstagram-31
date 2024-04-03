import {bodyElement} from './search-elements';
import {isEscapeKey} from './util';

const getExistingElement = () => document.querySelector('.success') || document.querySelector('.error');

const onCloseNotificationClick = (evt) => {
  getExistingElement();
  const closeButton = getExistingElement().querySelector('button');
  if (evt.target === getExistingElement() || evt.target === closeButton){
    getExistingElement().remove();
    removeNotificationListeners();
  }
};
const onCloseNotificationKeydown = (evt) => {
  evt.stopPropagation();
  getExistingElement();
  if (isEscapeKey(evt)) {
    getExistingElement().remove();
    removeNotificationListeners();
  }
};

function removeNotificationListeners () {
  bodyElement.removeEventListener('click', onCloseNotificationClick);
  bodyElement.removeEventListener('keydown', onCloseNotificationKeydown);
}

const appendNotification = (template, trigger = null) => {
  if (trigger) {
    trigger();
  }
  const notificationNode = template.cloneNode(true);
  bodyElement.append(notificationNode);
  bodyElement.addEventListener('click', onCloseNotificationClick);
  bodyElement.addEventListener('keydown', onCloseNotificationKeydown);
};

export {appendNotification};
