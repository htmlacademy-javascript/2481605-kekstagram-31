import {imgUploadInputElement, imgPreviewElement, effectsPreviewElement} from './search-elements';

const EXTENSIONS = ['jpg', 'jpeg', 'png'];

const appendPreviewPhoto = () => {
  const file = imgUploadInputElement.files[0];
  const url = URL.createObjectURL(file);
  const fileName = file.name.toLowerCase();
  const matches = EXTENSIONS.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreviewElement.src = url;
    imgPreviewElement.alt = file.name;
    effectsPreviewElement.forEach((qwe) => {
      qwe.style.background = `url(${url}) center no-repeat`;
      qwe.style.backgroundSize = '100% auto';
    });
  }
};

export {appendPreviewPhoto};
