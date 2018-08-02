'use strict';
var COMMENTS = [ 'Всё отлично!', 'В целом всё неплохо. Но не всё.',
 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var urlWay = ['photos/', '.jpg'];
var likesSummary = generateRandomNumber(15, 200);
var pictureTemplate = document.querySelector('#picture-template').content;
var picturesBlock = document.querySelector('.pictures');
var galleryOverlayPreview = document.querySelector('.gallery-overlay .gallery-overlay-preview');
var galleryOverlay = document.querySelector('.gallery-overlay');
var photoMax = 24;
var pictures = [];
var ipictures = generateRandomNumber(0, pictures.length - 1);
var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');


function generateRandomNumber(min, max) {
  return Math.floor((Math.random() * (max - min) + 1) + min);
};

function closeGallery(evt){
      if ((evt.type === 'keydown' && evt.keyCode === ESC_KEYCODE)||(evt.type === 'click')) {
        galleryOverlay.classList.add('invisible');
        document.querySelector('.upload-overlay').classList.add('hidden');
        document.removeEventListener('keydown', closeGallery);
      }
      galleryClose.addEventListener('keydown', function(evt) {
          if(evt.type === 'keydown' && evt.keyCode === ENTER_KEYCODE){
            galleryOverlay.classList.add('invisible');
            document.removeEventListener('keydown', closeGallery);
          };
        });
  };


for (var i = 0; i <= photoMax; i++) {
  pictures.push({
    url: urlWay[0] + (i + 1) + urlWay[1],
    likes: generateRandomNumber(15, 200),
    comments: COMMENTS[generateRandomNumber(0, COMMENTS.length - 1)]
  })
};

// pictureTemplate.querySelector('.picture img ').hasAttribute('src');

for (var j = 0; j < pictures.length; j++) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture-stats .picture-likes').textContent = pictures[j].likes;
  pictureElement.querySelector('.picture-stats .picture-comments').textContent = pictures[j].comments;
  pictureElement.querySelector('.picture img').setAttribute('src', pictures[j].url);
  pictureElement.querySelector('.picture img').setAttribute('src', pictures[j].url);
  pictureElement.querySelector('.picture img').setAttribute('tabindex', 0);

  picturesBlock.appendChild(pictureElement);

};

var pictureList = picturesBlock.querySelectorAll('.picture');

for( var k = 0; k < pictureList.length; k++) {
  pictureList[k].addEventListener('click', openGallery);
  pictureList[k].addEventListener('keydown', openGallery);
  pictureList[k].addEventListener('keydown',function(evt){
    evt.preventDefault();
  });
};

function openGallery(evt) {
  var imageUrl = evt.target.attributes[0].textContent;

  evt.preventDefault();

  if ((evt.type === 'keydown' && evt.keyCode === ENTER_KEYCODE) || (evt.type === 'click')) {
    galleryOverlay.classList.remove('invisible');
  };
  if (evt.type === 'keydown' &&  evt.keyCode === ENTER_KEYCODE){
      imageUrl = evt.target.children[0].attributes[0].textContent;
    };

    document.addEventListener('keydown', closeGallery);

  var imageProperties = pictures.find(function(item) {
    if(item.url === imageUrl) {
      return item;
    }
  });

  galleryOverlayPreview.querySelector('.gallery-overlay-controls .likes-count').textContent = imageProperties.likes;
  galleryOverlayPreview.querySelector('.gallery-overlay-controls .comments-count').textContent = imageProperties.comments;

  galleryOverlayPreview.querySelector('img').setAttribute('src', imageUrl);
  // if (evt.type === 'keydown' && evt.keyCode === ENTER_KEYCODE) {
  // galleryOverlayPreview.querySelector('img').setAttribute('src', keydownImageUrl);
  // };
};

// document.querySelector('.pictures .picture').addEventListener('click', openGallery);

document.querySelector('.upload-overlay').classList.add('hidden');

galleryClose.addEventListener('click', closeGallery);
galleryClose.addEventListener('keydown', closeGallery);



// galleryOverlay.classList.remove('invisible');



// document.addEventListener('keydown', closeGallery);
// picturesBlock.addEventListener('mouseover', photo);
