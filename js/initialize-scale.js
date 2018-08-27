'use strict';
 (function initializeScale(currentValue, step, eventScale){

    var resultInc = currentValue + step;
    var resultDec = currentValue - step;
    var resultString = String (resultInc/100);
    var x = 'scale(' + resultString +')' ;

    if(resultInc > currentValue) {
      var newValueInc = currentValue.setAttribute('value', resultInc + '%');
      evevtScale.target.style.transform = x;
    }
    if(resultDec < currentValue) {
      var newValueDec = currentValue.setAttribute('value', resultDec + '%');
      eventScale.target.style.transform = x;
    }
  })();
