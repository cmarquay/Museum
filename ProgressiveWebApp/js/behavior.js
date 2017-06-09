(function () {
    'use strict';

    var language = sessionStorage.getItem("language");

    if (language === null) {
        language = "english";
    }

    var signNumber = sessionStorage.getItem("signNumber");

    if (signNumber === null) {
        signNumber = 1;
    } else {
        signNumber = parseInt(signNumber);
    }

    var credits = document.getElementById('credits');

    var index = document.getElementById('index');

    var britishFlag = document.getElementById('britishFlag');

    var frenchFlag = document.getElementById('frenchFlag');

    var number = document.getElementsByName('signNumber')[0];

    var send = document.getElementById('send');

    var message = document.getElementById('error');

    var sign = document.getElementById('signs');

    var previous = document.getElementById('previousSign');

    var next = document.getElementById('nextSign');



    /***************/
    /*** CREDITS ***/
    /***************/



    if (credits !== null) {
        credits.onload = function() {
            var first = document.getElementById('par1');
            var second = document.getElementById('par2');
            switch (language) {
                case "french": first.innerHTML = "Les ressources appartiennent au Museum de La Rochelle.";
                    second.innerHTML = "Cette application a été créée dans le cadre d'un stage au l3i de l'université de La Rochelle par Christian Marquay.";
                    break;
                case "spanish": first.innerHTML = "Los recursos pertenecen al Museum de La Rochelle.";
                    second.innerHTML = "Esta aplicación fue creada como parte de una pasantía en el L3I de la Universidad de La Rochelle por Christian Marquay.";
                    break;
                case "german": first.innerHTML = "Die Ressourcen gehören das Museum von La Rochelle.";
                    second.innerHTML = "Diese Anwendung wurde im Rahmen eines Praktikums L3i Universität La Rochelle von Christian Marquay erstellt.";
                    break;
                default: first.innerHTML = "The resources belong to the Museum of La Rochelle.";
                    second.innerHTML = "This application was created as part of an internship at l3i of the University of La Rochelle by Christian Marquay.";
            }
        };
    }



    /***************/
    /***   HOME  ***/
    /***************/



    if (index !== null) {
        index.onload = function() {
            switch (language) {
                case "french":
                    number.placeholder = "Panneau";
                    send.value = "OK";
                    break;
                case "spanish":
                    number.placeholder = "Placa";
                    send.value = "Listo";
                    break;
                case "german":
                    number.placeholder = "Platte";
                    send.value = "Fertig";
                    break;
                default:
                    number.placeholder = "Sign";
                    send.value = "Done";
            }
            message.innerHTML = "";
        };
    }

    if (britishFlag !== null) {
        britishFlag.addEventListener('click', function () {
            language = "english";
            sessionStorage.setItem("language", language);
            number.placeholder = "Sign";
            send.value = "Done";
            message.innerHTML = "";
        });
    }

    if (frenchFlag !== null) {
        frenchFlag.addEventListener('click', function () {
            language = "french";
            sessionStorage.setItem("language", language);
            number.placeholder = "Panneau";
            send.value = "OK";
            message.innerHTML = "";
        });
    }

    if (send !== null) {
        send.addEventListener('click', function () {
            var signInput = document.getElementById("signNumber");
            if (is_int(signInput.value)) {
                if (signInput.value < 1 || signInput.value > 26) {
                    notExpected();
                } else {
                    signNumber = signInput.value;
                    message.innerHTML = "";
                    sessionStorage.setItem("language", language);
                    sessionStorage.setItem("signNumber", signNumber);
                    document.location = "signs.html";
                }
            } else {
                notExpected();
            }
        });
    }

    function notExpected() {
        switch (language) {
            case "french": message.innerHTML = "Merci de choisir un numéro de panneau entre 1 et 26.";
                break;
            case "spanish": message.innerHTML = "Gracias a elegir un número de placa entre 1 y 26.";
                break;
            case "german": message.innerHTML = "Wir danken Ihnen, ein Platte Zahl zwischen 1 und 26 zu wählen.";
                break;
            default: message.innerHTML = "Please choose a sign number between 1 and 26.";
        }
    }

    function is_int(value) {
        return parseFloat(value) === parseInt(value) && !isNaN(value);
    }



    /***************/
    /***  SIGNS  ***/
    /***************/



    if (sign !== null) {
        sign.onload = function () {
            var signContent = document.getElementById('signContent');
            switch (language) {
                case "french": signContent.innerHTML = "Panneau n°" + signNumber;
                    break;
                case "spanish": signContent.innerHTML = "Placa n°" + signNumber;
                    break;
                case "german": signContent.innerHTML = "Platte n°" + signNumber;
                    break;
                default: signContent.innerHTML = "Sign n°" + signNumber;
            }
            var p = document.getElementById('number');
            if (signNumber == 0) {
                p.innerHTML = "24bis";
            } else {
                p.innerHTML = signNumber;
            }
        };

        if (signNumber === 1) {
            previous.style.visibility = "hidden";
        } else {
            previous.style.visibility = "visible";
        }


        if (signNumber === 26) {
            next.style.visibility = "hidden";
        } else {
            previous.style.visibility = "visible";
            next.style.visibility = "visible";
        }
    }

    if (previous !== null) {
        previous.addEventListener('click', function () {
            switch (signNumber) {
                case 0:
                    signNumber = 24;
                    break;
                case 9:
                    signNumber = 7;
                    break;
                case 25:
                    signNumber = 0;
                    break;
                default:
                    signNumber--;
            }
            sessionStorage.setItem("signNumber", signNumber);
            document.location = "signs.html";
        });
    }

    if (next !== null) {
        next.addEventListener('click', function () {
            switch (signNumber) {
                case 0:
                    signNumber = 25;
                    break;
                case 7:
                    signNumber = 9;
                    break;
                case 24:
                    signNumber = 0;
                    break;
                default:
                    signNumber++;
            }
            sessionStorage.setItem("signNumber", signNumber);
            document.location = "signs.html";
        });
    }
})();