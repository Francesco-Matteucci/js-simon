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

// Recupero il bottone dal DOM e il contenitore principale
const startButton = document.getElementById('startButton');
const container = document.getElementById('gameContent');
const resultElement = document.getElementById('result');

// Aggiungo l'event listener per il bottone di avvio
startButton.addEventListener('click', startGame);

// Creo una funzione per avviare il gioco
function startGame() {
    // Nascondo il bottone "Inizia il Gioco"
    startButton.classList.add('d-none');

    // Genero 5 numeri casuali
    const numbers = generateRandomNumbers(5);

    // Imposto il timer a 30 secondi
    let timer = 3;

    // Mostro il timer e i numeri casuali
    container.innerHTML = `<div id="timer" class="fs-3 fw-bold text-center mb-3">Tempo rimanente: ${timer} secondi</div>
        <div id="numberDisplay" class="fs-2 text-center mb-4">${numbers.join(' ')}</div>`;

    // Avvio il conto alla rovescia
    const countdown = setInterval(() => {
        timer--;

        // Aggiorno il timer solo se esiste nel DOM
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.innerText = `Tempo rimanente: ${timer} secondi`;
        }

        if (timer === 0) {
            // ..fermo il countdown
            clearInterval(countdown);

            // Mostro i campi di input alla scadenza del timer
            showInputFields(numbers);
        }
    }, 1000);
}

// Creo una funzione per generare 5 numeri casuali
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

// Creo una funzione per mostrare i campi degli input
function showInputFields(correctNumbers) {
    container.innerHTML = `<form id="guessForm" class="p-4 bg-dark d-flex flex-column align-items-center">
            ${generateInputFields(5)}
            <div class="mt-3 text-center">
                <button type="submit" class="btn btn-success btn-lg">Verifica</button>
            </div>
        </form>`;

    const guessForm = document.getElementById('guessForm');
    guessForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Valido i numeri inseriti dall'utente
        validateAndCheck(correctNumbers);
    });
}

// Creo una funzione per generare dinamicamente i campi degli input
function generateInputFields(count) {
    let inputs = '';
    for (let i = 0; i < count; i++) {
        inputs += `<input type="number" class="form-control text-center mb-3" min="1" max="100" required>`;
    }
    return inputs;
}

// Creo una funzione per validare e verificare i numeri inseriti
function validateAndCheck(correctNumbers) {
    const inputs = document.querySelectorAll('input[type="number"]');
    let userNumbers = [];

    // Creo un ciclo for per iterare attraverso i campi degli input per raccogliere i numeri inseriti dall'utente
    for (let i = 0; i < inputs.length; i++) {
        const inputValue = parseInt(inputs[i].value);

        // Aggiungo il valore solo se è un numero valido
        if (!isNaN(inputValue)) {
            userNumbers.push(inputValue);
        }
    }

    // Controllo se ci sono duplicati
    if (hasDuplicates(userNumbers)) {
        showMessage("Hai inserito numeri duplicati!", "error");
        return;
    }

    // Trovo i numeri validi confrontando con correctNumbers
    let validNumbers = [];
    for (let i = 0; i < userNumbers.length; i++) {
        if (correctNumbers.includes(userNumbers[i])) {
            validNumbers.push(userNumbers[i]);
        }
    }

    // Mostro il risultato
    displayResult(validNumbers);
}

// Creo una funzione per controllare se ci sono duplicati
function hasDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                // Se trovo un duplicato..
                return true;
            }
        }
    }

    // Se non ci sono duplicati..
    return false;
}

// Creo una funzione per mostrare i messaggi all'utente
function showMessage(message, type) {
    let messageClass = "";
    switch (type) {
        case "error":
            messageClass = "alert-danger";
            break;
        case "success":
            messageClass = "alert-success";
            break;
        default:
            messageClass = "alert-info";
    }

    resultElement.className = `alert ${messageClass} mt-4`;
    resultElement.innerText = message;

    // Rimuovo la classe 'd-none' per mostrare il messaggio
    resultElement.classList.remove('d-none');

    // Aggiungo la classe 'show' per transizione e visibilità
    resultElement.classList.add('show');
}

// Creo una funzione per mostrare il risultato
function displayResult(validNumbers) {
    if (validNumbers.length > 0) {
        showMessage(`Hai indovinato ${validNumbers.length} numeri: ${validNumbers.join(', ')}`, "success");
    } else {
        showMessage("Non hai indovinato nessun numero.", "error");
    }
}


