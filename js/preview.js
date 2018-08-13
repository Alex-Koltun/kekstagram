  window.preview = (function() {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var galleryOverlayPreview = document.querySelector('.gallery-overlay .gallery-overlay-preview');
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
    var picturesBlock = document.querySelector('.pictures');

    function closeGallery(evt) {
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

        var imageProperties = pictures.find(function(item) {
          if(item.url === imageUrl) {
            return item;
          }
        });
          galleryOverlayPreview.querySelector('.gallery-overlay-controls .likes-count').textContent = imageProperties.likes;
          galleryOverlayPreview.querySelector('.gallery-overlay-controls .comments-count').textContent = imageProperties.comments;
          galleryOverlayPreview.querySelector('img').setAttribute('src', imageUrl);
    };

    document.querySelector('.upload-overlay').classList.add('hidden');

    galleryClose.addEventListener('click', closeGallery);
    galleryClose.addEventListener('keydown', closeGallery);

    var pictureList = picturesBlock.querySelectorAll('.picture');

    for( var k = 0; k < pictureList.length; k++) {
      pictureList[k].addEventListener('click', openGallery);
      pictureList[k].addEventListener('keydown', openGallery);
      pictureList[k].addEventListener('keydown',function(evt){
      evt.preventDefault();
      });
    };

})();
