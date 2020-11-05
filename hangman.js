async function getWords(){
    let url = 'https://localhost:44325/api/hangman';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

var encryptedWord = [];
var guesses = [];


window.onload = function(){
    getWords().then(words => {
        var word = words[Math.floor(Math.random() * words.length)].word;
         console.log(word);
        if(encryptedWord.length === 0)
        {
        for(var i = 0; i < word.length; i++){
            encryptedWord[i] = "*";
        }
        }
        var guessesRemaining = 7;
        
         document.getElementById("guessesRemaining").innerText = guessesRemaining;
         document.getElementById("encryptedWord").innerHTML = encryptedWord;
         document.getElementById("word").value = word;
         
      
    });
}


function analyzeGuess()
{
    var guess = document.getElementById("guess").value;
    var word = document.getElementById("word").value;
    guessesRemaining = document.getElementById("guessesRemaining").innerText;
    if(guessesRemaining > 0)
     {
         if(guesses.indexOf(guess) === -1)
         {
             guesses.push(guess);
             evaluateGuess(guess, word);
         }
     }
  
     updateGame();
    checkWin();
}

function evaluateGuess(guess, word)
{
    encryptedWord = document.getElementById("encryptedWord").innerHTML.split(",");
    guessesRemaining = document.getElementById("guessesRemaining").innerText;
    console.log(guess);

   for (var i = 0; i < word.length; i++)
   {
      if(guess === word[i])
      {
           encryptedWord[i] = guess;
      }
   }
   if (!encryptedWord.includes(guess))
   {
       guessesRemaining--;
    }
   
}

function updateGame() {
    document.getElementById("encryptedWord").innerHTML = encryptedWord;
    document.getElementById("guesses").innerHTML = guesses;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;

}

function checkWin(){
    if(encryptedWord.indexOf("*") === -1){
        document.getElementById("result").innerHTML = "You won!";
    }
    else if (guessesRemaining === 0){
        document.getElementById("result").innerHTML = "You lost, better luck next time.";
    }
}
