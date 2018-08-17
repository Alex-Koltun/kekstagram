'use strict';
(function(){
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var uploadSelect = document.querySelector('#upload-select-image');
  var uploadFilter = document.querySelector('#upload-filter');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFile = document.querySelector('#upload-file');
  var uploadResizeDec = uploadFilter.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeInc = uploadFilter.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeControls = uploadFilter.querySelector('.upload-resize-controls-value');
  var filterLine = document.querySelector('.upload-filter-level');
  var effectImage = uploadOverlay.querySelector('.filter-image-preview');
  var uploadPreview = uploadOverlay.querySelector('.upload-form-preview');
  var uploadFilterPreview = uploadOverlay.querySelector('.upload-filter-preview');
  var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');

  filterLine.classList.add('hidden');
  uploadSelect.classList.remove('invisible');
  uploadFilter.classList.remove('invisible');

  function change(evt){
    uploadOverlay.classList.remove('hidden');
  };

  function closeFilter(evt) {
    if ((evt.type === 'keydown' && evt.keyCode === ESC_KEYCODE)||(evt.type === 'click')) {
      uploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', closeFilter);
    }
    uploadFilter.querySelector('#upload-cancel').addEventListener('keydown', function(evt) {
        if(evt.type === 'keydown' && evt.keyCode === ENTER_KEYCODE){
          document.querySelector('.upload-overlay').classList.add('hidden');
          document.removeEventListener('keydown', closeFilter);
        };
      });
  };

  uploadFile.addEventListener('change', change);
  document.addEventListener('keydown', closeFilter);

  var minValueResize = 25;
  var maxValueResize = 100;
  var step = 25;

  function resizeInc() {
    var currentValue = +uploadOverlay.querySelector('.upload-resize-controls-value').getAttribute('value').replace("%","");
    var resultInc = currentValue + step;
    var resultString = String (resultInc/100);
    var x = 'scale(' + resultString +')' ;

    if(resultInc <= maxValueResize){
      var newValue = uploadOverlay.querySelector('.upload-resize-controls-value').setAttribute('value', resultInc + '%');
      uploadPreview.style.transform = x;
    }
  };

  function resizeDec() {
    var currentValue = +uploadOverlay.querySelector('.upload-resize-controls-value').getAttribute('value').replace("%","");
    var resultDec = currentValue - step;
    var resultString = String (resultDec/100);
    var x = 'scale(' + resultString +')' ;

    if (resultDec >= 25) {
      var newValue = uploadOverlay.querySelector('.upload-resize-controls-value').setAttribute('value', resultDec + '%');
      uploadOverlay.querySelector('.upload-form-preview').style.transform = x;
    };
  };

  uploadResizeDec.addEventListener('click', resizeDec);
  uploadResizeInc.addEventListener('click', resizeInc);


  var effectList = uploadOverlay.querySelectorAll('.upload-filter-controls input');

  function addEffect(evt) {
    var y = evt.target.id;
    var effectId = y.replace("upload-", "");

    effectImage.classList.remove('filter-none', 'filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
    effectImage.classList.add(effectId);
  };

  function openLine(evt) {
    var currentFilter = evt.target;
    var noneFilter = uploadOverlay.querySelector('.upload-filter-preview');
    // if(){
      filterLine.classList.remove('hidden');
    // }
  };

  function dragLine(){

  };

  for( var i = 0 ; i < effectList.length; i++) {
    effectList[i].addEventListener('click', addEffect);
    effectList[i].addEventListener('click', addEffect);
  };

  uploadOverlay.querySelector('#upload-cancel').addEventListener('click', closeFilter);
  uploadFilterControls.addEventListener('click', openLine);
})();
