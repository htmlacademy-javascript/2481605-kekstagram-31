import {bodyElement, dataErrorTemplate, imgFiltersInactiveElement} from './search-elements';

const TIME_OUT = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const addModalOpen = () => {
  bodyElement.classList.add('modal-open');
};
const removeModalOpen = () => {
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

const makeOpacityOne = () => {
  imgFiltersInactiveElement.style.opacity = '1';
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  closeElement,
  showElement,
  addModalOpen,
  removeModalOpen,
  showErrorMessage,
  makeOpacityOne,
  debounce
};
