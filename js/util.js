import {bodyElement, dataErrorTemplate} from './search-elements';

const TIME_OUT = 5000;

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
};
