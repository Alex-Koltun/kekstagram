'use strict';
window.picture = (function() {
  document.querySelector('.upload-overlay').classList.add('hidden');

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesBlock = document.querySelector('.pictures');
  var galleryOverlayPreview = document.querySelector('.gallery-overlay .gallery-overlay-preview');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var picturesBlock = document.querySelector('.pictures');

  var renderPicture = (function (picture) {
      window.pictureElement = pictureTemplate.cloneNode(true);

       pictureElement.querySelector('.picture-stats .picture-likes').textContent = picture.likes;
       pictureElement.querySelector('.picture-stats .picture-comments').textContent = picture.comments;
       pictureElement.querySelector('.picture img').setAttribute('src', picture.url);
       pictureElement.querySelector('.picture img').setAttribute('tabindex', 0);

       return pictureElement;
 });

  var picterDraw = (function(pictures) {
      var fragment = document.createDocumentFragment();
      window.p = pictures;

      for (var i = 0; i < pictures.length; i++) {
        fragment.appendChild(renderPicture(pictures[i]));
      }
      picturesBlock.appendChild(fragment);

      var pictureList = picturesBlock.querySelectorAll('.picture');

      for( var k = 0; k < pictureList.length; k++) {
        pictureList[k].addEventListener('click', openGallery);
        pictureList[k].addEventListener('keydown', openGallery);
        pictureList[k].addEventListener('keydown',function(evt){
        });
      };
  });

  var picterError = (function(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  });

  var closeGallery = (function (evtClose) {
        if ((evtClose.type === 'keydown' && evtClose.keyCode === ESC_KEYCODE)||(evtClose.type === 'click')) {
          galleryOverlay.classList.add('invisible');
          document.querySelector('.upload-overlay').classList.add('hidden');
          document.removeEventListener('keydown', closeGallery);
        }
        galleryClose.addEventListener('keydown', function(evt) {
            if(evtClose.type === 'keydown' && evtClose.keyCode === ENTER_KEYCODE){
              galleryOverlay.classList.add('invisible');
              document.removeEventListener('keydown', closeGallery);
            };
          });
    });

  var openGallery = (function(evtOpen, pictures) {
    var imageUrl = evtOpen.target.attributes[0].textContent;
    evtOpen.preventDefault();
    if ((evtOpen.type === 'keydown' && evtOpen.keyCode === ENTER_KEYCODE) || (evtOpen.type === 'click')) {
      galleryOverlay.classList.remove('invisible');
    };

    if (evtOpen.type === 'keydown' &&  evtOpen.keyCode === ENTER_KEYCODE){
        imageUrl = evtOpen.target.children[0].attributes[0].textContent;
      };

      document.addEventListener('keydown', closeGallery);

      var imageProperties = window.p.find(function(item) {
        if(item.url === imageUrl) {
          return item;
        }
      });
        galleryOverlayPreview.querySelector('.gallery-overlay-controls .likes-count').textContent = imageProperties.likes;
        galleryOverlayPreview.querySelector('.gallery-overlay-controls .comments-count').textContent = imageProperties.comments;
        galleryOverlayPreview.querySelector('img').setAttribute('src', imageUrl);
  });

  window.backend.load(picterDraw, picterError);

  galleryClose.addEventListener('click', closeGallery);
  galleryClose.addEventListener('keydown', closeGallery);
});
