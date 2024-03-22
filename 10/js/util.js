const body = document.querySelector('body');
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
  body.classList.add('modal-open');
};
const modalOpenRemove = () => {
  body.classList.remove('modal-open');
};
const closeElement = (element) => element.classList.add('hidden');
const showElement = (element) => element.classList.remove('hidden');
export {
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  isEnterKey,
  closeElement,
  showElement,
  modalOpenAdd,
  modalOpenRemove
};
