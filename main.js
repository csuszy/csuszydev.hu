//szunetertesito 5 perc elott
function szunetertesito(){
    let timerInterval
    Swal.fire({
    title: 'Szünet lesz 5 perc múlva!',
    timer: 30000,
    timerProgressBar: true,
    showCloseButton: true,
    didOpen: () => {
        Swal.showLoading()
        document.title = "Szünet lesz lassan!";
    },
    willClose: () => {
        clearInterval(timerInterval)
        document.title = "Csengetési rend";
    }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}




//Tablázat felzöltése
var csengetesrend = [
    {id:1,ora:"7:40 - 8:25",szunhosz:5},
    {id:2,ora:"8:30 - 9:15",szunhosz:10},
    {id:3,ora:"9:25 - 10:10",szunhosz:10},
    {id:4,ora:"10:20 - 11:05",szunhosz:10},
    {id:5,ora:"11:15 - 12:00",szunhosz:20},
    {id:6,ora:"12:20 - 13:05",szunhosz:5},
    {id:7,ora:"13:10 - 13:55",szunhosz:5},
    {id:8,ora:"14:00 - 14:45",szunhosz:5},
    {id:9,ora:"14:50 - 15:35",szunhosz:5},
];



var tabla = document.querySelector('#csngetesrend');
for (var i = 0; i < csengetesrend.length; i++) {
    var row = tabla.insertRow(i + 1);
    var id = row.insertCell(0);
    var ora = row.insertCell(1);
    var szun = row.insertCell(2);

    id.innerHTML = csengetesrend[i].id;
    ora.innerHTML = csengetesrend[i].ora;
    szun.innerHTML = csengetesrend[i].szunhosz;
}



//jelelegi het
function getISOWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7); // Adjust to Thursday
    const yearStart = new Date(d.getFullYear(), 0, 4); // January 4th
    return 1 + Math.round((d - yearStart) / 604800000); // 604800000 milliseconds in a week
}
const currentDate = new Date();
const weekNumber = getISOWeekNumber(currentDate);
console.log(`ISO Week Number: ${weekNumber}`);
var week = getISOWeekNumber(currentDate);


if (week%2==1) {
    document.querySelector('#cim').innerHTML = `Csengetési rend [A hét]`;
}
else if (week%2==0) {
    document.querySelector('#cim').innerHTML = `Csengetési rend [B hét]`;
}



//Jelenlegi óra kiemelése
const tbody = document.querySelector("table tbody");
const rows = tbody.querySelectorAll("tr");
function  jelenlegiora(num){
    rows.forEach(row => {
        row.style.backgroundColor = "";
        row.style.fontWeight = "";
        row.style.fontSize = "";
    });
    if (num != 'remove') {
        rows[num].style.backgroundColor = "#9C0606";
        rows[num].style.fontWeight = 700;
        rows[num].style.fontSize = "1.2rem";
    }
}


//csengetesek
const kicsengetes = [
    new Date('2023-01-01T08:25:00'),//0
    new Date('2023-01-02T09:15:00'),//1
    new Date('2023-01-03T10:10:00'),//2
    new Date('2023-01-04T11:05:00'),//3
    new Date('2023-01-05T12:00:00'),//4
    new Date('2023-01-06T13:05:00'),//5
    new Date('2023-01-07T13:55:00'),//6
    new Date('2023-01-08T14:45:00'),//7
    new Date('2023-01-08T15:35:00'),//8
];


//Kiiratas    kesesmod
szunetperc = 0;
insec = 0;
function szunetwrite(type){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const fullmin = parseInt(hours*60) + parseInt(minutes);
    let kesekmod = document.getElementById('kesesmod').checked;

    
    if (type == 'ora') {

        if (kesekmod == true) {
            if (szunetperc == 1) {
                document.querySelector('#szunet').innerHTML = `Szünet ${60-seconds} másodperc múlva`;
            } else {
                document.querySelector('#szunet').innerHTML = `Késés ${45 - szunetperc} perc`;
            }
            if (5 == szunetperc && seconds == 1) {
                szunetertesito();
            }
        } else {
            if (szunetperc == 1) {
                document.querySelector('#szunet').innerHTML = `Szünet ${60-seconds} másodperc múlva`;
            } else {
                document.querySelector('#szunet').innerHTML = `Szünet ${szunetperc} perc múlva`;
            }
            if (5 == szunetperc && seconds == 1) {
                szunetertesito();
            }
        }

    } 
    else if (type == 'kaja') {
        if (szunetperc == 1) {
        document.querySelector('#szunet').innerHTML = `Ebédszünet ${60-seconds} másodperc múlva`;
        }
        else {
            document.querySelector('#szunet').innerHTML = `Ebédszünet ${szunetperc} perc múlva`;
        }
    }
    else if (type == 'szun') {
        document.querySelector('#szunet').innerHTML = `Szünetből még hátra van: ${szunetperc} perc`;
    }
    else {
        console.log("hiba");
    }}




function szunet(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const fullmin = parseInt(hours*60) + parseInt(minutes);

    if (7 > hours && 40 > minutes) {
        document.querySelector('#szunet').innerHTML = 'Még korán van...';
    }
    //1. SZUNET
    else if (kicsengetes[0].getHours() > hours ||kicsengetes[0].getHours() == hours && (kicsengetes[0].getMinutes() > minutes)) {
        szunetperc = ((kicsengetes[0].getHours()*60+kicsengetes[0].getMinutes()) - fullmin);
        szunetwrite('ora');
        jelenlegiora(1);
    }
    else if (kicsengetes[0].getHours() == hours && kicsengetes[0].getMinutes() + 5 > minutes) {
        szunetperc = ((kicsengetes[0].getHours()*60+kicsengetes[0].getMinutes()) - fullmin + 5);
        szunetwrite('szun');
        jelenlegiora(2);
    }

    //2. SZUNET
    else if (kicsengetes[1].getHours() > hours ||kicsengetes[1].getHours() >= hours && (kicsengetes[1].getMinutes() > minutes)) {
        szunetperc = ((kicsengetes[1].getHours()*60+kicsengetes[1].getMinutes()) - fullmin);
        szunetwrite('ora');
        jelenlegiora(2);
    }
    else if (kicsengetes[1].getHours() == hours && kicsengetes[1].getMinutes() + 10 > minutes) {
        szunetperc = ((kicsengetes[1].getHours()*60+kicsengetes[1].getMinutes()) - fullmin + 10);
        szunetwrite('szun');
        jelenlegiora(3);
    }

    //3. SZUNET
    else if (kicsengetes[2].getHours() > hours ||kicsengetes[2].getHours() == hours && (kicsengetes[2].getMinutes() > minutes)) {
        szunetperc = ((kicsengetes[2].getHours()*60+kicsengetes[2].getMinutes()) - fullmin);
        szunetwrite('ora');
        jelenlegiora(3);
    }
    else if (kicsengetes[2].getHours() == hours && kicsengetes[2].getMinutes() + 10 > minutes) {
        szunetperc = ((kicsengetes[2].getHours()*60+kicsengetes[2].getMinutes()) - fullmin + 10);
        szunetwrite('szun');
        jelenlegiora(4);
    }

    //4. SZUNET
    else if (kicsengetes[3].getHours() > hours || kicsengetes[3].getHours() == hours && kicsengetes[3].getMinutes() > minutes) {
        szunetperc = ((kicsengetes[3].getHours()*60+kicsengetes[3].getMinutes()) - fullmin);
        szunetwrite('ora');
        jelenlegiora(4);
    }
    else if (kicsengetes[3].getHours() == hours && kicsengetes[3].getMinutes() + 10 > minutes) {
        szunetperc = ((kicsengetes[3].getHours()*60+kicsengetes[3].getMinutes()) - fullmin + 10);
        szunetwrite('szun');
        jelenlegiora(5);
    }

    //5. SZUNET
    else if (kicsengetes[4].getHours() > hours) {
        szunetperc = ((kicsengetes[4].getHours()*60+kicsengetes[4].getMinutes()) - fullmin);
        szunetwrite('kaja');
        jelenlegiora(5);
    }
    else if (kicsengetes[4].getHours() == hours && kicsengetes[4].getMinutes() + 20 > minutes) {
        szunetperc = ((kicsengetes[4].getHours()*60+kicsengetes[4].getMinutes()) - fullmin + 20);
        szunetwrite('szun');
        jelenlegiora(6);
    }

    //6. SZUNET
    else if (kicsengetes[5].getHours() > hours || kicsengetes[5].getHours() == hours  && (kicsengetes[5].getMinutes() > minutes)) {
        szunetperc = ((kicsengetes[5].getHours()*60+kicsengetes[5].getMinutes()) - fullmin);
        szunetwrite('ora');
        jelenlegiora(6);
    }
    else if (kicsengetes[5].getHours() == hours && kicsengetes[5].getMinutes() + 5 > minutes) {
        szunetperc = ((kicsengetes[5].getHours()*60+kicsengetes[5].getMinutes()) - fullmin + 5);
        szunetwrite('szun');
        jelenlegiora(7);
    }

    //7. SZUNET
    else if (kicsengetes[6].getHours() > hours || kicsengetes[6].getHours() == hours && (kicsengetes[6].getMinutes() > minutes)) {
        szunetperc = ((kicsengetes[6].getHours()*60+kicsengetes[6].getMinutes()) - fullmin);
        szunetwrite('ora');
        jelenlegiora(7);
    }
    else if (kicsengetes[6].getHours() == hours && kicsengetes[6].getMinutes() + 5 > minutes) {
        szunetperc = ((kicsengetes[6].getHours()*60+kicsengetes[6].getMinutes()) - fullmin + 5);
        szunetwrite('szun');
        jelenlegiora(8);
    }


    //8. SZUNET
    else if (kicsengetes[7].getHours() > hours || kicsengetes[7].getHours() == hours && (kicsengetes[7].getMinutes() > minutes)) {
        szunetperc = ((kicsengetes[7].getHours()*60+kicsengetes[7].getMinutes()) - fullmin);
        szunetwrite('ora');
        jelenlegiora(8);
    }
    else if (kicsengetes[7].getHours() == hours && kicsengetes[7].getMinutes() + 5 > minutes) {
        szunetperc = ((kicsengetes[7].getHours()*60+kicsengetes[7].getMinutes()) - fullmin + 5);
        szunetwrite('szun');
        jelenlegiora("9");
    }


    //9. szun
    else if (kicsengetes[8].getHours() > hours || kicsengetes[8].getHours() == hours && (kicsengetes[8].getMinutes() > minutes)) {
        szunetperc = ((kicsengetes[8].getHours()*60+kicsengetes[8].getMinutes()) - fullmin);
        szunetwrite('ora');
        jelenlegiora(9);
    }




    else{
        document.querySelector('#szunet').innerHTML = 'Mára vége!';
        jelenlegiora("remove");
    }
}



function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.querySelector('#clock').innerHTML = timeString;
    szunet()
}

setInterval(updateClock, 1000);
updateClock();




document.getElementById('zenmod').addEventListener("change", function (e) {
    let main = document.getElementById("main");
    let zenmod = document.getElementById('zenmod').checked;
    if (zenmod == true) {
        main.style.visibility = "hidden";
    } else {
        main.style.visibility = "visible";
    }
});









const messages = [
    "Gratulálok! Találtál egy tojást!",
    "Szuper! Egy újabb tojás!",
    "Ügyes vagy! Itt egy tojás!",
    // További üzenetek hozzáadhatók a listához
];

const specialMessages = [
    "WOW! Arany tojást találtál! Különleges üzenet vár rád!",
    // További különleges üzenetek hozzáadhatók a listához
];

function showRandomMessage(messagesArray) {
    const randomIndex = Math.floor(Math.random() * messagesArray.length);
    const randomMessage = messagesArray[randomIndex];
    alert(randomMessage);
}

function removeEgg(egg) {
    egg.remove();
}

function spawnEgg() {
    const existingEggs = document.querySelectorAll('.egg, .special-egg');
    if (existingEggs.length === 0) {
        const isSpecialEgg = Math.random() < 0.001; // 0.1% esély speciális tojásra (1000:1 arány)
        console.log(isSpecialEgg);
        const messageArray = isSpecialEgg ? specialMessages : messages;

        const egg = document.createElement("div");
        egg.className = isSpecialEgg ? "special-egg" : "egg";
        egg.innerHTML = isSpecialEgg ? "🥚" : "🥚";
        egg.style.left = `${Math.random() * window.innerWidth}px`;
        egg.style.top = `${Math.random() * window.innerHeight}px`;
        egg.onclick = function () {
            showRandomMessage(messageArray);
            removeEgg(egg);
        };

        document.body.appendChild(egg);
    }
}

function startEggSpawn() {
    setInterval(spawnEgg, (Math.random() * 900000) + 900000); // 15-30 perc (900000-1800000 milliszekundum)
}

startEggSpawn();