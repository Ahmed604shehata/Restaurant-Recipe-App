const hangmanImmage = document.querySelector('.hangman-box img');
const wordDisplay = document.querySelector('.word-display');
const guessestext = document.querySelector('.guesses-text b');
const keyboardDiv = document.querySelector('.keyboard');
const gameModal = document.querySelector('.game-modal');
const playAgainBtn = document.querySelector('.play-again');

let currentWord,correctLetters ,wrongGuessCount ;
const maxGuesses =6;

const resetGame = ()=>{
    correctLetters =[];
    wrongGuessCount =0;
    hangmanImmage.src = `images/hangman-${wrongGuessCount}.svg`
    guessestext.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll('button').forEach(btn =>btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split('').map(()=>`<li class="letter"></li>`).join('');
    gameModal.classList.remove('show');


}

const getRandomWord = ()=> {
    const {word,hint} = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    // console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) =>{
    setTimeout(()=>{
        const modalText = isVictory? `You found the word:`:`The correct word was:`;
        gameModal.querySelector('img').src = `images/${isVictory?'victory':'lost'}.gif`;
        gameModal.querySelector('h4').innerText = `${isVictory?'Congrates':'Game Over!'}`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b> `;
        gameModal.classList.add('show');
    },300)
}

const initGame = (button,clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index)=>{
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll('li')[index].innerHTML = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            }
        })
    }else{
        wrongGuessCount++;
        hangmanImmage.src = `images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true;
    guessestext.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

for(let i = 97; i <= 122; i++){
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener('click',e =>initGame(e.target,String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener('click',getRandomWord);