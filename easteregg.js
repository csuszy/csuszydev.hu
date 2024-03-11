
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