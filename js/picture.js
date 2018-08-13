'use strict';
window.picture = (function(){
  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesBlock = document.querySelector('.pictures');
  var pictures = window.pictures;

    for (var j = 0; j < pictures.length; j++) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture-stats .picture-likes').textContent = pictures[j].likes;
      pictureElement.querySelector('.picture-stats .picture-comments').textContent = pictures[j].comments;
      pictureElement.querySelector('.picture img').setAttribute('src', pictures[j].url);
      pictureElement.querySelector('.picture img').setAttribute('src', pictures[j].url);
      pictureElement.querySelector('.picture img').setAttribute('tabindex', 0);

      picturesBlock.appendChild(pictureElement);
  };
})();
