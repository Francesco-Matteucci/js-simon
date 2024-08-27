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
const container = document.querySelector('.container');

// Aggiungo l'event listener per il bottone di avvio
startButton.addEventListener('click', startGame);

//Creo una funzione per l'avvio del gioco
function startGame() {
    const numbers = generateRandomNumbers(5);
    let timer = 30;

    //chiamate alla funzione...
    displayNumbersAndTimer(numbers, timer);
    startCountdown(timer, numbers);
};

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

//Creo una funzione per aggiornare il timer
function updateTimerDisplay(timer) {
    document.getElementById('timer').innerText = `Tempo rimanente: ${timer} secondi`;
}

// Creo una funzione per mostrare i campi input, cosicchè l'utente possa inserire i numeri
function showInputFields(correctNumbers) {
    container.innerHTML = `
        <form id="guessForm">
            <input type="number" min="1" max="100" required>
            <input type="number" min="1" max="100" required>
            <input type="number" min="1" max="100" required>
            <input type="number" min="1" max="100" required>
            <input type="number" min="1" max="100" required>
            <div class="mt-3 text-center">
                <button type="submit" class="btn btn-success">Verifica</button>
            </div>
        </form>
        <div id="result" class="mt-3"></div>
    `;

    const guessForm = document.getElementById('guessForm');
    guessForm.addEventListener('submit', function (e) {
        e.preventDefault();
        validateAndCheck(correctNumbers);
    });
}

// Creo una funzione per validare e verificare i numeri inseriti
function validateAndCheck(correctNumbers) {
    const inputs = document.querySelectorAll('input[type="number"]');
    let userNumbers = [];

    inputs.forEach(input => {
        userNumbers.push(parseInt(input.value));
    });

    if (hasDuplicates(userNumbers)) {
        alert("Hai inserito numeri duplicati!");
        return;
    }

    let validNumbers = [];
    userNumbers.forEach(num => {
        if (correctNumbers.includes(num)) {
            validNumbers.push(num);
        }
    });

    displayResult(validNumbers);
}

// Creo una funzione per controllare se ci sono duplicati
function hasDuplicates(array) {
    const counts = {};

    for (let i = 0; i < array.length; i++) {
        const num = array[i];
        if (counts[num]) {

            // se c'è un duplicato..
            return true;
        } else {
            counts[num] = 1;
        }
    }

    //nessun duplicato..
    return false;
}

// Funzione per mostrare il risultato
function displayResult(validNumbers) {
    document.getElementById('result').innerText = `Hai indovinato ${validNumbers.length} numeri: ${validNumbers.join(', ')}`;
}








