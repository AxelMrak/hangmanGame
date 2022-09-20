/**
 * * 
*/
const startGameBtn = document.getElementById('start-game');
const divToDisappear = document.getElementById('div-disappear');
const divToAppear = document.getElementById('div-appear');
const usedLettersElement = document.getElementById('usedLetters')
const wordContainer = document.getElementById('wordContainer')
const addWord = document.getElementById('add-word')
const inputNewWord = document.getElementById('input')
const btnInput = document.getElementById('btn-input')
const inputField = document.getElementById('inputField')

/**
 * * 
*/

let words = ['ALURA', 'LATAM', 'ORACLE', 'ONE']
let canvas = document.getElementById('canva');
let canvaContext = canvas.getContext('2d');
let secretWord = '';

canvaContext.canvas.width = 0;
canvaContext.canvas.height = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase()
    usedLettersElement.appendChild(letterElement)
}

const addBodyPart = (bodyPart) => {
    canvaContext.fillStyle = 'red';
    canvaContext.fillRect(...bodyPart)
}

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes])
    mistakes++
    if(mistakes === bodyParts.length) {
        endGame();
    }
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent)
    divToDisappear.style.display = 'block'
    divToAppear.style.display = 'none'
}

const correctLetter = letter => {
    const { children } = wordContainer;
    for(let i = 0; i < children.length; i++){
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden')
            hits++;
        } 
    }
    if (hits === selectedWord.length) {
        endGame();
    } 
}

const letterInput = letter => {
    selectedWord.includes(letter) ? correctLetter(letter) : wrongLetter();
    addLetter(letter);
    usedLetters.push(letter)
}

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter) ? letterInput(newLetter) : null;
}

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter')
        letterElement.classList.add('hidden')
        wordContainer.appendChild(letterElement)
    })
}

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase()
    selectedWord = word.split('')
}



const drawHangMan = () => {
    canvaContext.canvas.width = 120;
    canvaContext.canvas.height = 160;
    canvaContext.scale(20, 20);
    canvaContext.clearRect(0, 0, canvas.width, canvas.height);
    canvaContext.fillStyle = 'tomato';
    canvaContext.fillRect(0, 7, 4, 1)
    canvaContext.fillRect(1, 0, 1, 8)
    canvaContext.fillRect(2, 0, 3, 1)
    canvaContext.fillRect(4, 1, 1, 1)
};

const startGameFunction = e => {
    divToDisappear.style.display='none';
    divToAppear.style.display='unset';
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent)
}

startGameBtn.addEventListener('click', startGameFunction)

addWord.addEventListener('click', () => {
    inputNewWord.style.display = 'block'
})

btnInput.addEventListener('click', () => {
   words.push(inputField.value)
})