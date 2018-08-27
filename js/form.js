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
  var pipkaCont = uploadFilter.querySelector('.upload-filter-level');
  var lineVal = uploadFilter.querySelector('.upload-filter-level-val');
  var filterContrast = document.querySelector(".filter-image-preview");

  uploadSelect.classList.remove('invisible');
  uploadFilter.classList.remove('invisible');
  pipkaCont.classList.add('invisible');


  function change(evt){
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
    pipkaCont.classList.remove('invisible');
    pipka.style.left = INIT_CONST;
    lineVal.style.width = INIT_CONST;
    if(window.effectId === "filter-none") {
      pipkaCont.classList.add('invisible');
    }
    if(window.effectId === "filter-chrome") {
      filterContrast.style.cssText = 'filter : grayscale('+ (INIT_CONST.replace("px","")) +')';
    }
    if(window.effectId === "filter-sepia") {
      filterContrast.style.cssText = 'filter : sepia('+ (INIT_CONST.replace("px","")) +')';
    }
    if(window.effectId === "filter-marvin") {
      filterContrast.style.cssText = 'filter : invert('+ (INIT_CONST.replace("px","")) +'%)';
    }
    if(window.effectId === "filter-phobos") {
      filterContrast.style.cssText = 'filter : blur('+ (INIT_CONST.replace("px","")*(3/100)) +'px)';
    }
    if(window.effectId === "filter-heat") {
      filterContrast.style.cssText = 'filter : brightness('+ (INIT_CONST.replace("px","")*(3/100)) +')';
    }
  };

  for( var i = 0 ; i < effectList.length; i++) {
    effectList[i].addEventListener('click', addEffect);
  };


  function activatePipka(evt) {
    evt.preventDefault();

    var initX = evt.offsetX;
    var pipkaX = +getComputedStyle(pipka).left.replace("px","");
    var linePipkaLong = getComputedStyle(linePipka).width.replace("px","");

    function movePipka(event) {
        event.preventDefault();

        var coordX = event.offsetX;
        var deltaX = coordX - initX;
        var changeX = pipkaX + deltaX;
        window.changeMove = Math.round((changeX * 100)/linePipkaLong);
        window.roundChange = changeMove + '%';

        if (changeMove <= 100 || changeMove <= 0) {
          pipka.style.left = roundChange;
          lineVal.style.width = roundChange;
        };

        if(window.effectId === "filter-chrome") {
          // filterContrast.style.cssText = 'filter : grayscale('+ (INIT_CONST.replace("px","")) +')';
          filterContrast.style.cssText = 'filter : grayscale('+ (window.changeMove/100) +')';
        };

        if(window.effectId === "filter-sepia") {
          // filterContrast.style.cssText = 'filter : sepia('+ (INIT_CONST.replace("px","")) +')';
          filterContrast.style.cssText = 'filter : sepia('+ (window.changeMove/100) +')';
        };

        if(window.effectId === "filter-marvin") {
          // filterContrast.style.cssText = 'filter : invert('+ (INIT_CONST.replace("px","")) +')';
          filterContrast.style.cssText = 'filter : invert('+ window.roundChange + ')';
        };

        if(window.effectId === "filter-phobos") {
          filterContrast.style.cssText = 'filter : blur('+ (INIT_CONST.replace("px","")) +')';
          filterContrast.style.cssText = 'filter : blur('+ window.changeMove * (3/100) +'px)';
        };

        if(window.effectId === "filter-heat") {
          filterContrast.style.cssText = 'filter : brightness('+ (INIT_CONST.replace("px","")) +')';
          filterContrast.style.cssText = 'filter : brightness('+ window.changeMove * (3/100) +')';
        };

      };

     function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', movePipka);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', movePipka);
    document.addEventListener('mouseup', onMouseUp);

    linePipka.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });
  };

  pipkaCont.addEventListener('mousedown', activatePipka);
  uploadResizeInc.addEventListener('click', resizeInc);
  uploadResizeDec.addEventListener('click', resizeDec);
  uploadFile.addEventListener('change', change);
  document.addEventListener('keydown', closeFilter);
  uploadOverlay.querySelector('#upload-cancel').addEventListener('click',closeFilter);
})();
