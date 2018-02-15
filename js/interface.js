(function (root) {
    root.updateScore = function () {
        document.getElementById('score').value = root.score[0] + ':' + root.score[1];
    };

    root.getWord = function () {
        return document.getElementById('input').value;
    };

    root.setWord = function(newWord) {
        document.getElementById('input').value = newWord;
    };

    root.disableElements = function() {
        document.getElementById('input').setAttribute('disabled','true');
        document.getElementById('button').setAttribute('disabled','true');
    };

    root.enableElements = function() {
        document.getElementById('input').removeAttribute('disabled');
        document.getElementById('button').removeAttribute('disabled')
    };

    root.youTurn = function() {
        document.getElementById('computer').classList.remove('turn');
        document.getElementById('you').classList.add('turn');
    };

    root.computerTurn = function() {
      document.getElementById('you').classList.remove('turn');
      document.getElementById('computer').classList.add('turn')
    }

})(this.GAME);