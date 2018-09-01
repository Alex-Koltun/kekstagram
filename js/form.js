'use strict';
(function(){
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var INIT_CONST = 20 + '%';
  var uploadSelect = document.querySelector('#upload-select-image');
  var uploadFilter = document.querySelector('#upload-filter');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFile = document.querySelector('#upload-file');
  var uploadResizeDec = uploadFilter.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeInc = uploadFilter.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeControls = uploadFilter.querySelector('.upload-resize-controls-value');
  var scaleElement = uploadFilter.querySelector('.upload-resize-controls');
  var uploadFormPreview = uploadOverlay.querySelector('.upload-form-preview');
  var pipka = uploadFilter.querySelector('.upload-filter-level-pin');
  var linePipka = uploadFilter.querySelector('.upload-filter-level-line');
  var pipkaContainer = uploadFilter.querySelector('.upload-filter-level');
  var lineVal = uploadFilter.querySelector('.upload-filter-level-val');
  var filterContrast = document.querySelector(".filter-image-preview");
  var effectImage = uploadOverlay.querySelector('.filter-image-preview');

  var filterClick = function(evt){
    pipka.style.left = INIT_CONST;
    lineVal.style.width = INIT_CONST;
  };

  uploadSelect.classList.remove('invisible');
  uploadFilter.classList.remove('invisible');
  pipkaContainer.classList.add('invisible');

  var adjustScale = function(scale) {
    uploadFormPreview.style.transform = scale;
  };

  var applyFilter = function () {
    effectImage.classList.remove(effectId);
    effectImage.classList.add(effectId);
  }

  function change(){
    uploadOverlay.classList.remove('hidden');
  };

  function closeFilter(evt) {
    if ((evt.type === 'keydown' && evt.keyCode === ESC_KEYCODE)||(evt.type === 'click')) {
      document.querySelector('.upload-overlay').classList.add('hidden');
      document.removeEventListener('keydown', closeFilter);
    }
    uploadFilter.querySelector('#upload-cancel').addEventListener('keydown', function(evt) {
        if(evt.type === 'keydown' && evt.keyCode === ENTER_KEYCODE){
          document.querySelector('.upload-overlay').classList.add('hidden');
          document.removeEventListener('keydown', closeFilter);
        };
      });
  };

  var effectList = uploadOverlay.querySelectorAll('.upload-filter-controls input');

  function filterChange(param) {
    if(window.effectId === "filter-chrome") {
      effectImage.style.cssText = 'filter: grayscale('+ (param/100) +')';
    };

    if(window.effectId === "filter-sepia") {
    effectImage.style.cssText = 'filter: sepia('+ (param/100) +')';
    };

    if(window.effectId === "filter-marvin") {
    effectImage.style.cssText = 'filter: invert('+ param + '%)';
    };

    if(window.effectId === "filter-phobos") {
    effectImage.style.cssText = 'filter: blur('+ (param * (3/100)) +'px)';
    };

    if(window.effectId === "filter-heat") {
    effectImage.style.cssText = 'filter : brightness('+ (param * (3/100)) +')';
    };
  }



  for( var i = 0 ; i < effectList.length; i++) {
    effectList[i].addEventListener('click', function(evtFilter){
      return window.initializeFilters(evtFilter, effectImage, pipkaContainer, pipka, lineVal);
    });
    effectList[i].addEventListener('click', filterClick);
  };


  function activatePipka(evt) {
    evt.preventDefault();
    var linePipkaLong = +getComputedStyle(linePipka).width.replace("px","");
    var startX = evt.clientX;
    var pipkaX = evt.offsetX;
    var pipkaI = Math.round((pipkaX * 100/linePipkaLong));


      pipka.style.left = evt.offsetX + 'px';
      lineVal.style.width = evt.offsetX + 'px';

    filterChange(pipkaI);

    function movePipka(event) {
      var shift = startX - event.clientX;
      startX = event.clientX;
      pipkaX = pipka.offsetLeft - shift;
      pipkaI = Math.round((pipkaX * 100/linePipkaLong));

      if(pipkaX <= linePipkaLong && pipkaX >= 0) {
          pipka.style.left = pipkaX + 'px';
          lineVal.style.width = pipkaX + 'px';
          filterChange(pipkaI);
        };
      };

     function onMouseUp(upEvt) {
      linePipka.removeEventListener('mousemove', movePipka);
      document.removeEventListener('mouseup', onMouseUp);
    };

    linePipka.addEventListener('mousemove', movePipka);
    document.addEventListener('mouseup', onMouseUp);
  };

  linePipka.addEventListener('mousedown', activatePipka, false);
  // uploadResizeInc.addEventListener('click', function(evtScale) {
  //   return window.initializeScale(evtScale, uploadResizeControls, uploadFormPreview)
  // });
  // uploadResizeDec.addEventListener('click', function(evtScale) {
  //   return window.initializeScale(evtScale, uploadResizeControls, uploadFormPreview)
  // });
  uploadResizeInc.addEventListener('click', function(evtScale) {
    return window.initializeScale(evtScale, scaleElement, adjustScale)
  });
  uploadResizeDec.addEventListener('click', function(evtScale) {
    return window.initializeScale(evtScale, scaleElement, adjustScale)
  });
  uploadFile.addEventListener('change', change);
  document.addEventListener('keydown', closeFilter);
  uploadOverlay.querySelector('#upload-cancel').addEventListener('click',closeFilter);
})();
