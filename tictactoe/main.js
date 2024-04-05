var CurrentSymbol = "X";
var click = 0;
var IsClickable = true;

function Updatesymbol() {
    document.getElementById('CurrSymbol').innerText = CurrentSymbol;
    CheckWin()
}
Updatesymbol();
function AddSymbol() {
    var button = document.getElementById(event.srcElement.id);
    if (button.innerText == "" && IsClickable == true) {
        if (CurrentSymbol == "X") {
            button.innerText = "X";
            CurrentSymbol = "O";
            click++;
            Updatesymbol();
        } else if (CurrentSymbol == "O"){
            button.innerText = "O";
            CurrentSymbol = "X";
            click++;
            Updatesymbol();
        }
    }
}



function ShowWinner(winner) {
    if (winner == "draw") {
        Swal.fire({
            title: `Dönteten`,
            target: '#alertbox',
            heightAuto: false,
            background: '#434343',
            color: '#fafafa',
            padding: '30px 0 30px 0',
            allowOutsideClick: false,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Új játék",
        }).then((result) => {
            if (result.isConfirmed) {
                NewGame();
            }
        });
    } else {
        Swal.fire({
            title: `Nyertes: ${winner}`,
            target: '#alertbox',
            heightAuto: false,
            background: '#434343',
            color: '#fafafa',
            padding: '30px 0 30px 0',
            allowOutsideClick: false,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Új játék",
        }).then((result) => {
            if (result.isConfirmed) {
                NewGame();
            }
        });
    }
}

function DissbleButton(parms) {
    if (parms == "tiltas") {
        IsClickable = false;

        return "sikeres";
    }
    if ("mehet") {
        IsClickable = true;

        return "sikeres";
    }
}

function CheckWin() {
    var k1 = document.getElementById(1).innerText;
    var k2 = document.getElementById(2).innerText;
    var k3 = document.getElementById(3).innerText;

    var k4 = document.getElementById(4).innerText;
    var k5 = document.getElementById(5).innerText;
    var k6 = document.getElementById(6).innerText;

    var k7 = document.getElementById(7).innerText;
    var k8 = document.getElementById(8).innerText;
    var k9 = document.getElementById(9).innerText;


    // A 3 sor tesztelése
    if (k1 == "X" && k2 == "X" && k3 == "X" || k1 == "O" && k2 == "O" && k3 == "O") {
        if (k1 == "X") {
            ShowWinner("X");
        } else {
            ShowWinner("O");
        }
    }
    else if (k4 == "X" && k5 == "X" && k6 == "X" || k4 == "O" && k5 == "O" && k6 == "O") {
        if (k4 == "X") {
            ShowWinner("X");
        } else {
            ShowWinner("O");
        }
    }
    else if (k7 == "X" && k8 == "X" && k9 == "X" || k7 == "O" && k8 == "O" && k9 == "O") {
        if (k7 == "X") {
            ShowWinner("X");
        } else {
            ShowWinner("O");
        }
    }


    // 3 oszlopnak a tesztelése
    else if (k1 == "X" && k4 == "X" && k7 == "X" || k1 == "O" && k4 == "O" && k7 == "O") {
        if (k1 == "X") {
            ShowWinner("X");
        } else {
            ShowWinner("O");
        }
    }
    else if (k2 == "X" && k5 == "X" && k8 == "X" || k2 == "O" && k5 == "O" && k8 == "O") {
        if (k2 == "X") {
            ShowWinner("X");
        } else {
            ShowWinner("O");
        }
    }
    else if (k3 == "X" && k6 == "X" && k9 == "X" || k3 == "O" && k6 == "O" && k9 == "O") {
        if (k3 == "X") {
            ShowWinner("X");
        } else {
            ShowWinner("O");
        }
    }


    // 2 átló  tesztelés
    else if (k1 == "X" && k5 == "X" && k9 == "X" || k1 == "O" && k5 == "O" && k9 == "O") {
        if (k1 == "X") {
            ShowWinner("X");
        } else {
            ShowWinner("O");
        }
    }
    else if (k7 == "X" && k5 == "X" && k3 == "X" || k7 == "O" && k5 == "O" && k3 == "O") {
        if (k7 == "X") {
            ShowWinner("X");
        } else {
            ShowWinner("O");
        }
    }
    else if (click >= 9){
        ShowWinner("draw");
    }
}


function NewGame() {
    document.getElementById(1).innerText = '';
    document.getElementById(2).innerText = '';
    document.getElementById(3).innerText = '';
    document.getElementById(4).innerText = '';
    document.getElementById(5).innerText = '';
    document.getElementById(6).innerText = '';
    document.getElementById(7).innerText = '';
    document.getElementById(8).innerText = '';
    document.getElementById(9).innerText = '';
    click = 0;
    CurrentSymbol = "X";
    Updatesymbol();
}

window.onload = function() {
    var square = document.getElementById("jatekter");
    var width = square.offsetWidth;
    square.style.height = width + "px";
};