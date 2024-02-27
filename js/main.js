const NAMES = [
  'Иван',
  'Валера',
  'Мария',
  'Константин',
  'Виктор',
  'Юлия',
  'Лола',
  'Джерси',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const LIKES = {
  MIN: 15,
  MAX: 200
};
const QUANTITY_COMMENTS = {
  MIN: 0,
  MAX: 30
};
const SIMILAR_PHOTOS_COUNT = 25;
const createCount = () => {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
};
const idComment = createCount();
const idPhoto = createCount();
const unicUrl = createCount();
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const createComment = () =>
  [
    {
      id: idComment(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES),
    }
  ];
const createUserPhoto = () => ({
  id: idPhoto(),
  url: `photos/${unicUrl()}.jpg`,
  description: 'Сфотографировал недавно на выходных',
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments:
    Array.from({length: getRandomInteger(QUANTITY_COMMENTS.MIN, QUANTITY_COMMENTS.MAX)}, createComment)
});
const similarPhotos = Array.from({length: SIMILAR_PHOTOS_COUNT}, createUserPhoto);
similarPhotos.values();
