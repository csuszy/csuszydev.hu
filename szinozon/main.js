var jatekter = document.getElementById('jatekter');
var currentsor = 1;
var coloronsor = 0;
var addcolortosor = document.getElementById(currentsor);
var eltalalt = [];
var temp = 0;


var szinek = ["feher","piros","lila","narancs","citrom","zold","kek"];
var eztkellkitalalni = [];

function newkitalalas() {
    for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * szinek.length);
        eztkellkitalalni.push(szinek[randomIndex]);
    }
    console.table(eztkellkitalalni);
}
newkitalalas();

function addcolor(color) {
    addcolortosor = document.getElementById(currentsor);
    if (coloronsor < 4) {
        addcolortosor.innerHTML += `<button class="${color}"></button>`
        coloronsor++;
    }
    if (coloronsor == 4 && currentsor < 10) {
        addcolortosor.innerHTML += `
            <div class="kisikon" id="sor${currentsor}"></div>`
        ellenorzes();
        coloronsor = 0;
        currentsor++;
        jatekter.innerHTML += `<div class="sor" id="${currentsor}"></div>`;
    }
    if (coloronsor == 4 && currentsor == 10) {
        addcolortosor.innerHTML += `<div class="kisikon" id="sor${currentsor}"></div>`
        ellenorzes();
    }
}

function reset() {
    currentsor = 1;
    coloronsor = 0;
    eltalalt = [];
    temp = 0;
    jatekter.innerHTML = '<div class="sor" id="1"></div>';

    var resgomb = document.querySelectorAll('#rescolor');
    for (let i = 0; i < resgomb.length; i++) {
        resgomb[i].classList.remove(eztkellkitalalni[i]);
    }

    eztkellkitalalni = [];
    newkitalalas();
    document.getElementById('reset').classList.add('hide');
    document.getElementById('losetext').classList.add('hide');
    document.getElementById('wintext').classList.add('hide');
}

var visszajelzokispont = "";

function ellenorzes() {
    var currenttipp = document.getElementById(currentsor);
    var gombok = currenttipp.getElementsByTagName('button');
    for (var i = 0; i < gombok.length; i++) {
        if (eztkellkitalalni[i] == gombok[i].className) {
            eltalalt.push("X");
        }
        else{
            eltalalt.push("O");
        }
        if (i == 3) {
            eltalalt.forEach(element => {
                if (element == "X") {
                    visszajelzokispont +=  `<button class="feher"></button>`;
                    temp++;
                }
                else{
                    visszajelzokispont += `<button class="fekete"></button>`;
                }
            });
            if (temp == 4) {
                document.getElementById('wintext').classList.remove('hide');
                var resgomb = document.querySelectorAll('#rescolor');
                for (let i = 0; i < resgomb.length; i++) {
                    resgomb[i].classList.add(eztkellkitalalni[i]);
                }
                temp = 0;
                document.getElementById('reset').classList.remove('hide');
            }
            if (currentsor == 10) {
                document.getElementById('losetext').classList.remove('hide');
                document.getElementById('reset').classList.remove('hide');
                var resgomb = document.querySelectorAll('#rescolor');
                for (let i = 0; i < resgomb.length; i++) {
                    resgomb[i].classList.add(eztkellkitalalni[i]);
                }
            }
            document.getElementById('sor'+`${currentsor}`).innerHTML = visszajelzokispont;
            visszajelzokispont = "";
            temp = 0;
        }
    }
    eltalalt = [];
}
