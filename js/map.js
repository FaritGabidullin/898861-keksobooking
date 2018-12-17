'use strict';

var titleList = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

var typeList = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var checkinList = [
  '12:00',
  '13:00',
  '14:00'
];
var checkoutList = [
  '12:00',
  '13:00',
  '14:00'
];
var featuresList = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];

var photosList = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
]

var pinSize = {
  "width": 40,
  "height": 44
};

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

var getFeatures = function () {
  var generatedFeatureList = [];
  for (var i = 0; i < featuresList.length; i++) {
    if (randomInteger(0, 1)) {
      generatedFeatureList[generatedFeatureList.length] = featuresList[i];
    }
  }
  return generatedFeatureList
}

var compareRandom = function (a, b) {
  return Math.random() - 0.5;
}

var getPhotosList = function (clonePhotosList) {
  return clonePhotosList.sort(compareRandom);
}

var getAdver = function (adverIndex) {
  var adver = {
    "author": {
      "avatar": 'img/avatars/user0' + String(adverIndex + 1) + '.png'
    },
    "offer": {
      "title": titleList[adverIndex],
      "address": String(randomInteger(130, 630)) + ', ' + String(randomInteger(130, 630)),
      "price": randomInteger(1000, 1000000),
      "type": typeList[randomInteger(0, 3)],
      "rooms": randomInteger(1, 5),
      "guests": randomInteger(1, 5),
      "checkin": checkinList[randomInteger(0, 2)],
      "checkout": checkoutList[randomInteger(0, 2)],
      "features": getFeatures(featuresList),
      "description": '',
      "photos": getPhotosList(photosList),
    },
    "location": {
      "x": randomInteger(130, 630),
      "y": randomInteger(130, 630)
    }
  }
  return adver;
}

var generationOfDate = function (adverCount) {
  var adverList = [];
  for (var i = 0; i < adverCount; i++) {
    adverList[i] = getAdver(i);
  }
  return adverList;
}

var createMark = function (adver, card) {
  var newElement = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  newElement.style.left = adver.location.x + 'px';
  newElement.style.top = adver.location.y + 'px';
  newElement.firstElementChild.src = adver.author.avatar;
  newElement.firstElementChild.alt = adver.offer.title;

  newElement.addEventListener('click', function () {
    var allcards = document.querySelectorAll('article.map__card.popup');
    allcards.forEach(function (eachcard) {
      eachcard.classList.add('hidden');
    })
    card.classList.remove('hidden');
  })

  return newElement;
}



var createCard = function (adver) {
  var cardTemplate = document.querySelector('#card').cloneNode(true);
  var card = cardTemplate.content.querySelector('.popup');
  var cardTitle = card.querySelector('.popup__title');
  cardTitle.textContent = adver.offer.title;
  var cardAddress = card.querySelector('.popup__text--address');
  cardAddress.textContent = adver.offer.address;
  var cardPrice = card.querySelector('.popup__text--price');
  cardPrice.textContent = String(adver.offer.price) + '₽' + '/ночь';
  var cardType = card.querySelector('.popup__type');
  if (adver.offer.type === 'palace') {
    cardType.textContent = 'Дворец';
  } else if ('flat') {
    cardType.textContent = 'Квартира';
  }
  else if ('house') {
    cardType.textContent = 'Дом';
  }
  else if ('bungalo') {
    cardType.textContent = 'Бунгало';
  };
  var cardCapacity = card.querySelector('.popup__text--capacity');
  cardCapacity.textContent = adver.offer.rooms + ' комнаты для ' + adver.offer.guests + ' гостей';
  var cardTime = card.querySelector('.popup__text--time');
  cardTime.textContent = 'Заезд после ' + adver.offer.checkin + ', выезд до ' + adver.offer.checkout;
  var cardFeatures = card.querySelector('.popup__features');
  var cardFeatureWifi = cardFeatures.querySelector('.popup__feature--wifi');
  if (adver.offer.features.indexOf('wifi') === -1) {
    cardFeatures.removeChild(cardFeatureWifi);
  };
  var cardFeatureDishwasher = cardFeatures.querySelector('.popup__feature--dishwasher');
  if (adver.offer.features.indexOf('dishwasher') === -1) {
    cardFeatures.removeChild(cardFeatureDishwasher);
  };
  var cardFeatureParking = cardFeatures.querySelector('.popup__feature--parking');
  if (adver.offer.features.indexOf('parking') === -1) {
    cardFeatures.removeChild(cardFeatureParking);
  };
  var cardFeatureWasher = cardFeatures.querySelector('.popup__feature--washer');
  if (adver.offer.features.indexOf('washer') === -1) {
    cardFeatures.removeChild(cardFeatureWasher);
  };
  var cardFeatureElevator = cardFeatures.querySelector('.popup__feature--elevator');
  if (adver.offer.features.indexOf('elevator') === -1) {
    cardFeatures.removeChild(cardFeatureElevator);
  };
  var cardFeatureConditioner = cardFeatures.querySelector('.popup__feature--conditioner');
  if (adver.offer.features.indexOf('conditioner') === -1) {
    cardFeatures.removeChild(cardFeatureConditioner);
  };

  var cardDescription = card.querySelector('.popup__description');
  cardDescription.textContent = adver.offer.description;
  var cardPhotos = card.querySelector('.popup__photos');
  for (var i = 0; i < adver.offer.photos.length; i++) {
    var cardPhoto = cardPhotos.querySelector('.popup__photo').cloneNode(true);
    cardPhoto.src = adver.offer.photos[i];
    cardPhotos.appendChild(cardPhoto);
  }
  cardPhotos.removeChild(cardPhotos.children[0]);
  var cardAvatar = card.querySelector('.popup__avatar');
  cardAvatar.src = adver.author.avatar;
  card.classList.add('hidden');

  card.addEventListener('click', function (evt) {
    evt.currentTarget.classList.remove('hidden');
  })

  var buttonsClose = card.querySelector('.popup__close');
    buttonsClose.addEventListener('click', function (evt) {
      evt.currentTarget.parentElement.classList.add('hidden');
      evt.stopPropagation()
  });

  return card;
}

var getCards = function (adverList) {
  var fragment = document.createDocumentFragment();
  var fragmentMark = document.createDocumentFragment();
  for (var i = 0; i < adverList.length; i++) {
    var adver = adverList[i];
    var newElement = createCard(adver)
    fragment.appendChild(newElement);

    var mapPins = document.querySelector('.map__pins');

    var newElementMark = createMark(adver, newElement);
    fragmentMark.appendChild(newElementMark);

  }
  mapPins.appendChild(fragmentMark);
  return fragment;
}

var setState = function (Visibility) {

  var formElements = document.querySelectorAll('fieldset');
  formElements.forEach(function (fieldset) {
    fieldset.disabled = Visibility;
  });

  var map = document.querySelector('.map');
  if (Visibility) {
    map.classList.add('map--faded');
  } else {
    map.classList.remove('map--faded');
  }

  var formFilters = document.querySelectorAll('.map__filter');
  formFilters.forEach(function (formFiltersElement) {
    formFiltersElement.disabled = Visibility;
  });

  var adForm = document.querySelector('.ad-form');
  if (Visibility) {
    adForm.classList.add('ad-form--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
  }

  var mapPin = document.querySelector('.map__pin');
  if (!Visibility) {
    var mapPins = document.querySelector('.map__pins');
    var generatedDate = generationOfDate(8);

    var map = document.querySelector('.map');
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var generatedCards = getCards(generatedDate);
    map.insertBefore(generatedCards, mapFiltersContainer);

    mapPin.removeEventListener('mouseup', onMapPinMouseup);
  }
  if (Visibility) {
    setAddress(parseInt(mapPin.style.left) + Math.round(mapPin.clientWidth / 2), parseInt(mapPin.style.top) + Math.round(mapPin.clientHeight / 2));
  }

}

var setAddress = function (X, Y) {

  var pinInMap = document.querySelector('#address');
  pinInMap.value = Math.round(X + pinSize.width / 2) + ', ' + Math.round(Y + pinSize.height);
}

var onMapPinMouseup = function (evt) {
  setState(false);
  setAddress(evt.clientX, evt.clientY);
}

setState(true);

var mapPin = document.querySelector('.map__pin');
mapPin.addEventListener('mouseup', onMapPinMouseup);


