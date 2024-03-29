import './img-upload.js';
import {addThumbnails,} from './add-thumbnails.js';
import {getData} from './api.js';
import {initializeGallery} from './big-photo-mode.js';
import {showErrorMessage} from './util.js';


getData()
  .then((photos) => {
    photos.forEach(addThumbnails);
    initializeGallery(photos);
  })
  .catch ((error) => {
    showErrorMessage(error.message);
  });

