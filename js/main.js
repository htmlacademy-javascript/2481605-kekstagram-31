import {addThumbnails,} from './add-thumbnails.js';
import {getData} from './api.js';
import {initializeGallery} from './big-photo-mode.js';
import {showErrorMessage, makeOpacityOne} from './util.js';
import {initSendForm} from './send-form.js';
import {initFiltersClick} from './img-filters.js';


getData()
  .then((photos) => {
    initFiltersClick(photos);
    photos.forEach(addThumbnails);
    initializeGallery(photos);
    makeOpacityOne();
  })
  .catch ((error) => {
    showErrorMessage(error.message);
  });

initSendForm();
