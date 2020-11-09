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
         document.getElementById("encryptedWordHidden").value = encryptedWord;
         document.getElementById("encryptedWord").innerHTML = encryptedWord.join(" ");
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
    encryptedWord = document.getElementById("encryptedWordHidden").value.split(",");
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
    document.getElementById("encryptedWordHidden").value = encryptedWord;
    document.getElementById("encryptedWord").innerHTML = encryptedWord.join(" ");
    document.getElementById("guesses").innerHTML = guesses.join(", ");
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("guess").value = "";

}

function checkWin(){
    if(encryptedWord.indexOf("*") === -1){
        document.getElementById("result").innerHTML = "You won! <img src=\"images/F8H3.gif\">";
    }
    else if(guessesRemaining === 6){
        document.getElementById("result").innerHTML= "<img src=\"images/step1.png\">";
    }
    else if(guessesRemaining === 5){
        document.getElementById("result").innerHTML= "<img src=\"images/step2.png\">";
    }
    else if(guessesRemaining === 4){
        document.getElementById("result").innerHTML= "<img src=\"images/step3.png\">";
    }
    else if(guessesRemaining === 3){
        document.getElementById("result").innerHTML= "<img src=\"images/step4.png\">";
    }
    else if(guessesRemaining === 2){
        document.getElementById("result").innerHTML= "<img src=\"images/step5.png\">";
    }
    else if(guessesRemaining === 1){
        document.getElementById("result").innerHTML= "<img src=\"images/step6.png\">";
    }
    else if (guessesRemaining === 0){
        document.getElementById("result").innerHTML = "Game Over! <img src=\"images/step7.png\">";
    
    }
  }
  function playAgain() {
      
    location.reload();

}