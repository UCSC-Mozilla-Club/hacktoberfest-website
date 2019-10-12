document.addEventListener('DOMContentLoaded', function (event) {
    var dataText = ["Hacktoberfest 2019!", "Contribute to Open Source!"];
    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
            document.querySelector("#tagline").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        }
        else if (typeof fnCallback == 'function') {
            // call callback after timeout
            setTimeout(fnCallback, 700);
        }
    }
    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined') {
            setTimeout(function () {
                StartTextAnimation(0);
            }, 20000);
        }
        if (i < dataText[i].length) {
            typeWriter(dataText[i], 0, function () {
                StartTextAnimation(i + 1);
            });
        }
    }
    StartTextAnimation(0);
});