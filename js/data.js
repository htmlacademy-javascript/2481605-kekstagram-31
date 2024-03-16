import {getRandomInteger, getRandomArrayElement} from './util.js';
const Names = [
  'Иван',
  'Валера',
  'Мария',
  'Константин',
  'Виктор',
  'Юлия',
  'Лола',
  'Джерси',
];
const Comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const Likes = {
  MIN: 15,
  MAX: 200
};
const QuantityComments = {
  MIN: 0,
  MAX: 30
};
const RandomAvatars = {
  MIN: 1,
  MAX: 6
};
const SIMILAR_PHOTOS_COUNT = 25;
const createCount = () => {
  let count = 0;
  return function() {
    return ++count;
  };
};
const idComment = createCount();
const idPhoto = createCount();
const unicUrl = createCount();

const createComment = () => ({
  id: idComment(),
  avatar: `img/avatar-${getRandomInteger(RandomAvatars.MIN, RandomAvatars.MAX)}.svg`,
  message: getRandomArrayElement(Comments),
  name: getRandomArrayElement(Names),
});
const createUserPhoto = () => ({
  id: idPhoto(),
  url: `photos/${unicUrl()}.jpg`,
  description: 'Классно получилось?',
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments:
    Array.from({length: getRandomInteger(QuantityComments.MIN, QuantityComments.MAX)}, createComment)
});
const similarPhotos = Array.from({length: SIMILAR_PHOTOS_COUNT}, createUserPhoto);
export {similarPhotos};
