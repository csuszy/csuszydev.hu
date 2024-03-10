const url = "https://csuszy.dszcbaross.edu.hu";
var winnerList;

async function logWinner() {
    const response = await fetch(`${url}/winner`);
    const winner = await response.json();
    winnerList = winner;
    console.table(winnerList);
    
    var tabla = document.querySelector('#winnerTable');
    let i = -1;
    document.querySelector('#winnerTable').innerHTML = "";
    winnerList.forEach(element => {
        var row = tabla.insertRow(i + 1);
        var id = row.insertCell(0);
        var firstname = row.insertCell(1);
        var lastname = row.insertCell(2);
        var school = row.insertCell(3);
        var text = row.insertCell(4);

        id.innerHTML = element.id;
        firstname.innerHTML = element.firstname;
        lastname.innerHTML = element.lastname;
        school.innerHTML = element.school;
        text.innerHTML = element.text;
    });
}

setInterval(function() {
    logWinner();
}, 5000);

