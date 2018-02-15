(function (root) {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    root.recognizer = new SpeechRecognition();
    root.recognizer.lang = 'ru-Ru';
    root.recognizer.continuous = true;
    root.recognizer.start();

    root.start = function (callback) {
        var self = this;

        ymaps.ready(function () {
            ymaps.geocode('Минск').then(function (res) {
                self.myMap = new ymaps.Map("map", {
                    center: res.geoObjects.get(0).geometry.getCoordinates(),
                    zoom: 11,
                    type: 'yandex#satellite'
                });

                callback();
            }, function (err) {
                alert(err.message);
            });
        });
    };

    root.chooseCountry = function (word, success, error) {
        var root = this;
        ymaps.geocode(word, {
            kind: 'locality'
        }).then(function (res) {
            if (res.geoObjects.getLength() !== 0) {
                var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                var countryName = res.geoObjects.get(0).properties.get('name');

                root.lastBounds = res.geoObjects.get(0).properties.get('boundedBy');
                root.lastCoordinates = coordinates;
                root.lastCountryName = countryName;

                if (success) {
                    success(countryName);
                }
            } else {
                if (error) {
                    error();
                }
            }
        });
    };

    root.findCountry = function (country, success, error) {
        var lastLetter = country[country.length - 1];
        var newWords = root.countries.filter(function (item) {
            return item[0].toLowerCase() === lastLetter;
        });
        var newWordIndex = Math.floor(Math.random() * newWords.length);

        ymaps.geocode(newWords[newWordIndex], {kind: 'locality'}).then(
            function (res) {
                var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                var countryName = res.geoObjects.get(0).properties.get('name');

                root.lastBounds = res.geoObjects.get(0).properties.get('boundedBy');
                root.lastCoordinates = coordinates;
                root.lastCountryName = countryName;
                root.lastWord = countryName;
                root.score[1] = root.score[1] + 1;

                if (success) {
                    success();
                }
            });
    };

    root.addLastPlacemark = function () {
        root.myMap.geoObjects.add(new ymaps.Placemark(root.lastCoordinates, {
            iconContent: root.lastCountryName
        }, {
            preset: 'twirl#' + (!root.myTurn ? 'red' : 'blue') + 'StretchyIcon',
            balloonMaxWidth: '250'
        }));
    };

    root.moveMap = function () {
        root.myMap.setBounds(root.lastBounds);
        root.myMap.setCenter(root.lastCoordinates);
    };

    root.toggleTurn = function () {
        root.myTurn = !root.myTurn;
    };

    root.recognizerStop = function () {
        root.recognizer.stop();
    };

    root.recognizerStart = function () {
        root.recognizer.start();
    };

    root.onSpeechResult = function (callback) {
        root.recognizer.onresult = callback;
    };
})(this.GAME);
