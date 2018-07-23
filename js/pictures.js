'use strict';
var COMMENTS = [ 'Всё отлично!', 'В целом всё неплохо. Но не всё.',
 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var urlWay = ['photos/', '.jpg'];
var pictureTemplate = document.querySelector('#picture-template').content;
var picturesBlock = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay .gallery-overlay-preview');
var likesSummary = generateRandomNumber(15, 200);
var photoMax = 24;
var propertiesOtherUsers = [];

function generateRandomNumber(min, max) {
  return Math.floor((Math.random() * (max - min) + 1) + min);
};

for (var i = 0; i <= photoMax; i++) {
  propertiesOtherUsers.push({
    url: urlWay[0] + (i + 1) + urlWay[1],
    likes: generateRandomNumber(15, 200),
    comments: COMMENTS[generateRandomNumber(0, COMMENTS.length - 1)]
  });
};

pictureTemplate.querySelector('.picture img ').hasAttribute('src');

for (var j = 0; j < propertiesOtherUsers.length; j++) {

  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture-stats .picture-likes').textContent = propertiesOtherUsers[j].likes;
  pictureElement.querySelector('.picture-stats .picture-comments').textContent = propertiesOtherUsers[j].comments;
  pictureElement.querySelector('.picture img').setAttribute('src', propertiesOtherUsers[j].url);

  picturesBlock.appendChild(pictureElement);
};
var ipropertiesOtherUsers = generateRandomNumber(0, propertiesOtherUsers.length);

galleryOverlay.querySelector('img').setAttribute('src', propertiesOtherUsers[ipropertiesOtherUsers].url);
galleryOverlay.querySelector('.gallery-overlay-controls .likes-count').textContent = propertiesOtherUsers[ipropertiesOtherUsers].likes;
galleryOverlay.querySelector('.gallery-overlay-controls .gallery-overlay-controls-comments').textContent = propertiesOtherUsers[ipropertiesOtherUsers].comments;
document.querySelector('.upload-overlay').classList.add('hidden');
document.querySelector('.gallery-overlay').classList.remove('invisible');
