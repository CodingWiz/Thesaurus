var intJeuTempsEnMinutes = 1;

var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
var booTemps = false;

var intervalID = 0;

function chrono() {
    end = new Date()
    diff = end - start
    diff = new Date(diff)
    var msec = diff.getMilliseconds()
    var sec = diff.getSeconds()
    var min = diff.getMinutes()
    var hr = diff.getHours() - 1
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    if (msec < 10) {
        msec = "00" + msec
    } else if (msec < 100) {
        msec = "0" + msec
    }
    if (booTemps) {
        document.getElementById("chronotime").innerHTML = min + ":" + sec
    }

    timerID = setTimeout("chrono()", 10)
}

function chronoReset() {
    updateChronometre(true);

    document.getElementById("chronotime").innerHTML = "00:00"
    start = new Date()
}

function demarrerChrono() {
    document.getElementById("chronotime").innerHTML = "";

    document.getElementById("idMeter").max = intJeuTempsEnMinutes;
    document.getElementById("idMeter").min = 0;
    document.getElementById("idMeter").optimum = document.getElementById("idMeter").max;
    document.getElementById("idMeter").low = parseFloat(document.getElementById("idMeter").optimum)/6;
    document.getElementById("idMeter").high = parseFloat(document.getElementById("idMeter").optimum)/2;
    document.getElementById("idMeter").value = document.getElementById("idMeter").optimum;

    chronoReset();
    booTemps = true;
    chrono();
    
    intervalID = setInterval(function() {
        if (parseFloat(document.getElementById("idMeter").value).toFixed(4) > 0 && 
            parseFloat(document.getElementById("idMeter").value).toFixed(4)-(1/60) > 0) {
            document.getElementById("idMeter").value = parseFloat(document.getElementById("idMeter").value).toFixed(4)-(1/60);
            //console.log(Math.round(parseFloat(parseFloat(document.getElementById("idMeter").value) * 60)));
        }
        else {
            audioRecommencer.play();

            timerRecommencer = setTimeout(function() {
                changerNiveau(false);

                effacerCanevas(objgl);
                dessiner(objgl, objProgShaders, objScene3D);
            }, 2000);
        }
    }, 1000);
}