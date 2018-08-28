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
  var pipka = uploadFilter.querySelector('.upload-filter-level-pin');
  var linePipka = uploadFilter.querySelector('.upload-filter-level-line');
  var pipkaContainer = uploadFilter.querySelector('.upload-filter-level');
  var lineVal = uploadFilter.querySelector('.upload-filter-level-val');
  var filterContrast = document.querySelector(".filter-image-preview");

  uploadSelect.classList.remove('invisible');
  uploadFilter.classList.remove('invisible');
  pipkaContainer.classList.add('invisible');


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
    uploadOverlay.querySelector('.upload-form-preview').style.transform = x;
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

  var effectList = uploadOverlay.querySelectorAll('.upload-filter-controls input');

  function addEffect(evt) {
    var effectImage = uploadOverlay.querySelector('.filter-image-preview');
    var y = evt.target.id;
    window.effectId = y.replace("upload-", "");

    effectImage.classList.remove('filter-none', 'filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
    effectImage.classList.add(effectId);
    pipkaContainer.classList.remove('invisible');
    pipka.style.left = INIT_CONST;
    lineVal.style.width = INIT_CONST;
    if(window.effectId === "filter-none") {
      pipkaContainer.classList.add('invisible');
    }
    if(window.effectId === "filter-chrome") {
      filterContrast.style.cssText = 'filter: grayscale('+ (INIT_CONST.replace("%","")/100) +')';
    }
    if(window.effectId === "filter-sepia") {
      filterContrast.style.cssText = 'filter: sepia('+ (INIT_CONST.replace("%","")/100) +')';
    }
    if(window.effectId === "filter-marvin") {
      filterContrast.style.cssText = 'filter: invert('+ INIT_CONST +')';
    }
    if(window.effectId === "filter-phobos") {
      filterContrast.style.cssText = 'filter: blur('+ (INIT_CONST.replace("%","")*(3/100)) +'px)';
    }
    if(window.effectId === "filter-heat") {
      filterContrast.style.cssText = 'filter: brightness('+ (INIT_CONST.replace("%","")*(3/100)) +')';
    }
  };

  for( var i = 0 ; i < effectList.length; i++) {
    effectList[i].addEventListener('click', addEffect);
  };

  function filterChange(param) {
    if(window.effectId === "filter-chrome") {
      filterContrast.style.cssText = 'filter: grayscale('+ (param/100) +')';
    };

    if(window.effectId === "filter-sepia") {
      filterContrast.style.cssText = 'filter: sepia('+ (param/100) +')';
    };

    if(window.effectId === "filter-marvin") {
      filterContrast.style.cssText = 'filter: invert('+ param + '%)';
    };

    if(window.effectId === "filter-phobos") {
      filterContrast.style.cssText = 'filter: blur('+ (param * (3/100)) +'px)';
    };

    if(window.effectId === "filter-heat") {
      filterContrast.style.cssText = 'filter : brightness('+ (param * (3/100)) +')';
    };
  }


  function activatePipka(evt) {
    evt.preventDefault();
    var linePipkaLong = +getComputedStyle(linePipka).width.replace("px","");
    var startX = evt.clientX;
    var pipkaX = evt.offsetX;
    var pipkaI = Math.round((pipkaX * 100/linePipkaLong));

    if(evt.target !== pipka) {
      pipka.style.left = evt.offsetX + 'px';
      lineVal.style.width = evt.offsetX + 'px';
    };
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
  uploadResizeInc.addEventListener('click', resizeInc);
  uploadResizeDec.addEventListener('click', resizeDec);
  uploadFile.addEventListener('change', change);
  document.addEventListener('keydown', closeFilter);
  uploadOverlay.querySelector('#upload-cancel').addEventListener('click',closeFilter);
})();
