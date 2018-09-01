'use strict';
window.initializeFilters = (function(evtFilter, effectImage, pipkaContainer, pipka, lineVal) {
  window.effectId = evtFilter.target.id.replace("upload-", "");

  var removeFilter = effectImage.classList.remove("filter-none", "filter-chrome", "filter-sepia", "filter-marvin", "filter-phobos", "filter-heat");
  var addFilter = effectImage.classList.add(effectId);
  var param = 20;

  switch (effectId) {
    case "filter-none":
    removeFilter;
    addFilter;
    pipkaContainer.classList.add('invisible');
    break;

    case "filter-chrome":
    removeFilter;
    addFilter;
    pipkaContainer.classList.remove('invisible');
    pipka.style.left = param;
    lineVal.style.width = param;
    effectImage.style.cssText = 'filter: grayscale('+ (param/100) +')';
    break;

    case "filter-sepia":
    removeFilter;
    addFilter;
    pipkaContainer.classList.remove('invisible');
    pipka.style.left = param;
    lineVal.style.width = param;
    effectImage.style.cssText = 'filter : sepia('+ (param/100) +')';
    break;

    case "filter-marvin":
    removeFilter;
    addFilter;
    pipkaContainer.classList.remove('invisible');
    pipka.style.left = param;
    lineVal.style.width = param;
    effectImage.style.cssText = 'filter: invert('+ param + '%)';
    break;

    case "filter-phobos":
    removeFilter;
    addFilter;
    pipkaContainer.classList.remove('invisible');
    pipka.style.left = param;
    lineVal.style.width = param;
    effectImage.style.cssText = 'filter: blur('+ (param * (3/100)) +'px)';
    break;

    case "filter-heat":
    removeFilter;
    addFilter;
    pipkaContainer.classList.remove('invisible');
    pipka.style.left = param;
    lineVal.style.width = param;
    effectImage.style.cssText = 'filter : brightness('+ (param * (3/100)) +')';
    break;
  }
});
