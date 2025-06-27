//declaration
let allHoles = ["hole1","hole2","hole3","hole4","hole5","hole6","hole7","hole8","hole9"];
let whackScore = [];

let start = document.querySelector(".start");
let resign = document.querySelector(".resign");
let holes = document.querySelectorAll(".holes");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");

let started = false;
let level = 0;
let score = 0;

let moleTimeout;
let gameTimer;
let countdownTimer;
let timeLeft = 30;
let timerDisplay = document.createElement("h3");
document.querySelector(".head").append(timerDisplay);

let moleIsVisible = false;
let currentMoleId = "";


//main program
start.addEventListener( "click", ()=>{
    if(started == false){
        console.log("Game started");

        started = true;
        
        //time-clock-UI
        timerDisplay.innerText = `Time left : ${timeLeft}s`;

        countdownTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.innerText = `Time left : ${timeLeft}s`;
        }, 1000);

        //stop-game-after-30sec
        gameTimer = setTimeout(()=>{
            started = false;
            clearInterval(countdownTimer);

            h1.innerText = "TIME OVER !";
            h3.innerHTML = `Your score was <b>${score}</b> <br>Press start to play again <br>`;
            whackScore.push(score);
            restart();
            highestScore(whackScore);
        },30000);

        moles();
        
    };
});

for(let hole of holes){
    hole.addEventListener("click",holePress);
};

resign.addEventListener( "click", ()=>{
    h1.innerText = "GAME OVER!";
    h3.innerHTML = `Press start to play again`;
    restart();
});
//functions
function moles() {
    if (started === false){
        return;
    };
    
    level++;
    h1.innerText = "Game Started";
    h3.innerText =`level : ${level}`;

    let holeNum= Math.floor(Math.random()*9)+1;
    let hole = document.querySelector(`#hole${holeNum}`);
    hole.classList.add("mole");

    moleIsVisible = true;
    currentMoleId = `hole${holeNum}`;
    console.log(`the number is ${holeNum}`);

    moleTimeout = setTimeout( ()=>{
        hole.classList.remove("mole");
        moleIsVisible = false;
        currentMoleId = "";
        if (started) moles();
    },750);
};

function holePress(){
    let clickedHole= this.id;

    if (moleIsVisible && (clickedHole === currentMoleId)) {
        score++;
    }
    else{
        h1.innerText = "GAME OVER!";
        h3.innerHTML = `Your score was <b>${score}</b><br>Press start to play again`;
        whackScore.push(score);
        highestScore(whackScore);
        restart();
    }
};

function restart(){
    started = false;
    level = 0;
    score = 0;
    timeLeft = 30;
    clearTimeout(gameTimer);
    clearInterval(countdownTimer);
    clearTimeout(moleTimeout);
    timerDisplay.innerText = "";

    holes.forEach(hole => {
        hole.classList.remove("mole");
    });

    moleIsVisible = false;
    currentMoleId = "";
};

function highestScore(arr){
    let largest = arr[0];
    for(let i = 0;i<arr.length;i++){
        if(arr[i]>largest){
            largest = arr[i];
        }
        else{
            continue;
        }
    }
    let highscr = document.querySelector("#highSCR");
    highscr.innerHTML = `<b>Highest score is : </b>${largest}`;
}