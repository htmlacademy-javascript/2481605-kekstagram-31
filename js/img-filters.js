import {imgFiltersElement, picturesContainerElement} from './search-elements';
import {debounce} from './util';
import {addThumbnails,} from './add-thumbnails.js';

const RANDOM_COUNT = 10;
const FILTERS_BUTTON_ACTIVE = 'img-filters__button--active';
const sortDiscussed = (a, b) => b.comments.length - a.comments.length;
const sortRandom = () => 0.5 - Math.random();

let photos = [];

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let currentFilter = 'filter-default';

const updateGallery = (filteredPhotos) => {
  const photoElements = picturesContainerElement.querySelectorAll('.picture');
  photoElements.forEach((element) => element.remove());
  filteredPhotos.forEach(addThumbnails);
};

const debouncedUpdateGallery = debounce(updateGallery);
const useFilters = () => {
  let filterPhotos = [];
  if (currentFilter === Filters.DEFAULT) {
    filterPhotos = photos.slice();
  } else if (currentFilter === Filters.RANDOM) {
    filterPhotos = photos.slice().sort(sortRandom).slice(0, RANDOM_COUNT);
  } else if (currentFilter === Filters.DISCUSSED) {
    filterPhotos = photos.slice().sort(sortDiscussed);
  }
  debouncedUpdateGallery(filterPhotos);
};

const onFilterChange = (evt) => {
  const targetButton = evt.target;
  if (!targetButton.matches('button')) {
    return;
  }
  const activeButton = imgFiltersElement.querySelector(`.${FILTERS_BUTTON_ACTIVE}`);
  if (activeButton) {
    activeButton.classList.remove(FILTERS_BUTTON_ACTIVE);
  }
  targetButton.classList.add(FILTERS_BUTTON_ACTIVE);
  currentFilter = targetButton.getAttribute('id');
  useFilters();
};

const initFiltersClick = (photosData) => {
  imgFiltersElement.addEventListener('click', onFilterChange);
  photos = photosData;
};

export {initFiltersClick};

