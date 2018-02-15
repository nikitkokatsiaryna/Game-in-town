(function (root) {
    root.start(function () {
        root.onSpeechResult(function (event) {
            var results = event.results;
            var word = results[results.length - 1][0].transcript.replace(/^\s+|\s+$/g, "");

            root.chooseCountry.call(root, word, changeCountrySuccess);
        });
    });

    document.getElementById('button').addEventListener('click', function () {
        var word = root.getWord();
        root.chooseCountry.call(root, word, changeCountrySuccess);
    });

    function changeCountrySuccess(countryName) {
        var lastLetter = root.lastWord.toLowerCase()[root.lastWord.length - 1];
        var firstLetter = countryName[0].toLowerCase();

        if (root.lastWord === '' || lastLetter === firstLetter) {
            root.disableElements();
            root.computerTurn();

            root.lastWord = countryName;
            root.score[0] = root.score[0] + 1;

            root.setWord(countryName);
            root.moveMap();
            root.addLastPlacemark();
            root.updateScore();
            root.toggleTurn();

            root.findCountry(countryName, function() {
                root.moveMap();
                root.addLastPlacemark();
                root.updateScore();
                root.enableElements();
                root.youTurn();
            });
        } else {
            alert('Слово "' + countryName + '" не подходит, шалунишка)');
        }
    }

})(this.GAME);
