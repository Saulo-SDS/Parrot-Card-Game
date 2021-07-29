let number_of_cards;
let cards = [];
let roading_game;
let open_cards;
let card_one;
let card_two;
let hits;
let rounds;
let clock;
const images = ['bobrossparrot.gif','explodyparrot.gif','fiestaparrot.gif','metalparrot.gif','revertitparrot.gif','tripletsparrot.gif','unicornparrot.gif'];

function initGame(){  
    
    do{
        number_of_cards = prompt("Digite a quantidade de cartas");
    }while(number_of_cards & 1 || number_of_cards < 4 || number_of_cards > 14);

    roading_game = true;
    open_cards = 0;
    hits = 0;
    rounds = 0;
    clock = 0;
    insertCards();
}

function comparador() { 
    return Math.random() - 0.5; 
}

function insertCards() {
    const container = document.querySelector('.container');
    images.sort(comparador);
    for (let i = 0; i < (number_of_cards/2); ++i) {
        let card = `<div class="card" onclick="turnCard(this)">
                    <div class="front-face face"><img src="./assets/front.png" alt=""></div>
                    <div class="back-face face"><img src="./assets/${images[i]}" alt=""></div> 
                    </div>`;
        cards.push(card);
        cards.push(card);
    }

    cards.sort(comparador);
    for (let i=0; i < number_of_cards; ++i) {
        container.innerHTML += cards[i];
    }
}

function turnCard(card){
    rounds++;
    if(roading_game && !card.querySelector(".front-face").classList.contains("turn")){
        roading_game = false;
        card.querySelector(".front-face").classList.toggle("turn");
        card.querySelector(".back-face").classList.toggle("turn");
        setTimeout(checkMove(card),1000);
    }
}

function checkMove(element) {
    if(open_cards === 0){
        roading_game = true;
        open_cards++;
        card_one = element;
    }else{
        open_cards--;
        card_two = element;
        if(card_one.querySelector(".back-face").innerHTML === card_two.querySelector(".back-face").innerHTML ){
            hits++;
            setTimeout(checkPlayerWin, 1000);
        }else{
            setTimeout(untapCards, 1000);
        }
    }
}

function checkPlayerWin(){
    if(hits === number_of_cards/2){
        alert(`Você ganhou em ${rounds/2} jogadas!\nTempo de jogo: ${clock} segundos`);
        restartGame();
    }else{
        roading_game = true;
    }
}

function untapCards() {
    card_one.querySelector(".front-face").classList.toggle("turn");
    card_one.querySelector(".back-face").classList.toggle("turn");
    card_two.querySelector(".front-face").classList.toggle("turn");
    card_two.querySelector(".back-face").classList.toggle("turn");
    roading_game = true;
}

function restartGame() {
    let choice = prompt("Deseja jogar novamente?");
    if(choice === "sim"){
        document.querySelector(".container").innerHTML = "";
        cards = [];
        setTimeout(initGame, 500);
    }else{
        alert("Thanks for playing!!!");
    }
}

function releaseClock() {
	document.querySelector(".clock").innerHTML = clock++;
}

setInterval(releaseClock, 1000);