(function() {
  var COMMENTS = [ 'Всё отлично!', 'В целом всё неплохо. Но не всё.',
   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var urlWay = ['photos/', '.jpg'];
  var likesSummary = generateRandomNumber(15, 200);
  var photoMax = 24;
  window.pictures = [];
  window.ipictures = generateRandomNumber(0, pictures.length - 1);

  function generateRandomNumber(min, max) {
    return Math.floor((Math.random() * (max - min) + 1) + min);
  };

  for (var i = 0; i <= photoMax; i++) {
    pictures.push({
      url: urlWay[0] + (i + 1) + urlWay[1],
      likes: generateRandomNumber(15, 200),
      comments: COMMENTS[generateRandomNumber(0, COMMENTS.length - 1)]
    })
  };
})();
