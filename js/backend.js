(function () {
  var SERVER_URL = 'https://js.dump.academy/kekstagram';

  var setupXhrRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      }
      else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000;
    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var request = setupXhrRequest(onLoad, onError);

      request.open('POST', SERVER_URL);
      request.send(data);
    },
    load: function (onLoad, onError) {
      var request = setupXhrRequest(onLoad, onError);

      request.open('GET', SERVER_URL + '/data');
      request.send();
    }
  };
})();
