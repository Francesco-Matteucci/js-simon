/*
Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
NOTA: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.
BONUS 1:
Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
BONUS 2:
Generiamo gli input da JS, invece di scriverli nel codice
Consigli del giorno:
* Pensate prima in italiano.
* Dividete in piccoli problemi la consegna.
* Individuate gli elementi di cui avete bisogno per realizzare il programma.
* Immaginate la logica come fosse uno snack: "Dati 2 array di numeri, indica quali e quanti numeri ci sono in comune tra i due array" */

// Recupero il bottone dal DOM
const startButton = document.getElementById('startButton');

// Aggiungo l'event listener per il bottone di avvio
startButton.addEventListener('click', startGame);

//Creo una funzione per generare 5 numeri casuali
function generateRandomNumbers(count) {
    let numbers = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * 100) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

//Creo la funzione per mostrare il timer e i numeri
function displayNumbersAndTimer(numbers, timer) {
    container.innerHTML = `<div id="timer" class="my-3">Tempo rimanente: ${timer} secondi</div>
        <div id="numberDisplay">${numbers.join(' ')}</div>`;
}

//Creo una funzione per implementare il countdown e per nascondere i numeri alla scadenza
function startCountdown(timer, numbers) {
    const countdown = setInterval(() => {
        timer--;
        updateTimerDisplay(timer);

        if (timer === 0) {
            clearInterval(countdown);
            showInputFields(numbers);
        }
    }, 1000);
}

function updateTimerDisplay(timer) {
    document.getElementById('timer').innerText = `Tempo rimanente: ${timer} secondi`;
}

//Creo una funzione per l'avvio del gioco
function startGame() {
    const numbers = generateRandomNumbers(5);
    let timer = 30;

    //chiamate alla funzione...
    displayNumbersAndTimer(numbers, timer);
    startCountdown(timer, numbers);
};





