const gameBoard = document.getElementById('gameBoard');
const animals = [
    'cat', 'dog', 'elephant', 'giraffe', 'lion', 'monkey', 'panda', 'zebra',
    'cat', 'dog', 'elephant', 'giraffe', 'lion', 'monkey', 'panda', 'zebra'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(animal) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.animal = animal;

    const img = document.createElement('img');
    img.src = `https://source.unsplash.com/100x100/?${animal}`;
    img.alt = animal;
    card.appendChild(img);

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function setupBoard() {
    shuffle(animals).forEach(animal => {
        gameBoard.appendChild(createCard(animal));
    });
}

setupBoard();
