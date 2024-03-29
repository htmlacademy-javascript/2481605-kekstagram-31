const TIME_OUT = 5000;

const bodyElement = document.querySelector('body');
const dataErrorTemplate = bodyElement.querySelector('#data-error').content;
const templateSuccess = bodyElement.querySelector('#success').content;
const templateError = bodyElement.querySelector('#error').content;


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';
const modalOpenAdd = () => {
  bodyElement.classList.add('modal-open');
};
const modalOpenRemove = () => {
  bodyElement.classList.remove('modal-open');
};
const closeElement = (element) => element.classList.add('hidden');
const showElement = (element) => element.classList.remove('hidden');

const showErrorMessage = () => {
  const errorMessage = dataErrorTemplate.cloneNode(true);
  bodyElement.append(errorMessage);
  const dataErrorMessage = bodyElement.querySelector('.data-error');
  setTimeout(() => {
    dataErrorMessage.remove();
  }, TIME_OUT);
};

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
  trigger?.();
  const notificationNode = template.cloneNode(true);
  bodyElement.append(notificationNode);
  bodyElement.addEventListener('click', closeNotification);
  bodyElement.addEventListener('keydown', closeNotification);
};

export {
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  isEnterKey,
  closeElement,
  showElement,
  modalOpenAdd,
  modalOpenRemove,
  showErrorMessage,
  appendNotification,
  templateSuccess,
  templateError
};
