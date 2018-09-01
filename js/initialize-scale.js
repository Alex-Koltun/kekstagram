
// window.initializeScale = (function(evtScale, elementValue, elementOnChange) {
//     var minValueResize = 25;
//     var maxValueResize = 100;
//     var step = 25;
//     var currentValue = +elementValue.getAttribute('value').replace("%","");
//     var result = 0;
//
//     if(evtScale.target.innerHTML === "+") {
//       result = currentValue + step
//     } else  {
//       result =  currentValue - step;
//     };
//
//     if(result >= minValueResize && result <= maxValueResize){
//       var resultString =  String (result/100);
//       elementValue.setAttribute('value', result + '%');
//     }
//
//       var scale = 'scale(' + resultString +')';
//
//       elementOnChange.style.transform = scale;
// });

window.initializeScale = (function(evtScale, scaleElement, adjustScale) {
    var minValueResize = 25;
    var maxValueResize = 100;
    var step = 25;

      var currentValue = +scaleElement.querySelector('input').getAttribute('value').replace("%","");
      var result = 0;
      if(evtScale.target === scaleElement.querySelector('.upload-resize-controls-button-inc')) {
        result = currentValue + step
      } else if (evtScale.target === scaleElement.querySelector('.upload-resize-controls-button-dec')) {
        result =  currentValue - step;
      };

      if(result >= minValueResize && result <= maxValueResize){
        var resultString =  String (result/100);
        scaleElement.querySelector('input').setAttribute('value', result + '%');
      }

     var scale = 'scale(' + resultString +')';

     adjustScale(scale);
});
