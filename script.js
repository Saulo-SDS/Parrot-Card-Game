let number_of_cards;
let cards = [];
let roading_game;
let open_cards, card_one, card_two;
let hits, rounds;
let clock, idInterval;
let player_win, player_points, player_name;
let points, errs;
const images = ['bobrossparrot.gif','explodyparrot.gif','fiestaparrot.gif','metalparrot.gif','revertitparrot.gif','tripletsparrot.gif','unicornparrot.gif'];

function initGame(){  

    player_name = prompt("Digite seu nome");
    do{

        number_of_cards = prompt("Digite a quantidade de cartas entre 4-14");
    }while(number_of_cards & 1 || number_of_cards < 4 || number_of_cards > 14);

    roading_game = true, player_win = false;
    player_points = 0, open_cards = 0, hits = 0, rounds = 0, clock = 0, points = 0, errs = 0;
  
    informGame();
    insertCards();
    incrementCounter();
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

function informGame(){

    const informs = document.querySelector('.informsGame');
    informs.innerHTML = "";
    let infos = `<h6>Pontos: <span class="points">${player_points}</span></h6>
                 <h6>Tempo de jogo: <span class="clock"${clock}></span></h6>`;
                 
    informs.innerHTML = infos;
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
        roading_game = false;
        if(card_one.querySelector(".back-face").innerHTML === card_two.querySelector(".back-face").innerHTML ){
            hits++;
            player_win = (hits === number_of_cards/2);
            updatePoints();
            setTimeout(checkPlayerWin, 500);
        }else{
            errs++;
            setTimeout(untapCards, 1000);
        }
    }
}

function checkPlayerWin(){
    if(player_win){
        stopClock();
        alert(`Você ganhou em ${rounds/2} jogadas!\nTempo de jogo: ${clock} segundos\nPontuação total: ${points.toFixed(2)}`);
        saveRanking();
        showRanking();
        setTimeout(restartGame,3000);
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
        document.querySelector(".informsGame").innerHTML = "";
        document.querySelector(".container").innerHTML = "";
        cards = [];
        setTimeout(initGame, 500);
    }else{
        alert("Thanks for playing!!!");
    }
}

function releaseClock() {
    if(!player_win) clock++
    document.querySelector(".clock").innerHTML = clock;
}

function updatePoints() {
    if(errs === 0) points += 4;
    else if(errs > number_of_cards) points += 0.5;
    else points += 2 + (errs/number_of_cards);
    
    if(player_win) points = (points * number_of_cards) + (100/clock);
    
    errs = 0;
    document.querySelector(".points").innerHTML = points.toFixed(2);
}

function incrementCounter() {
    idInterval = setInterval(releaseClock, 1000);
}

function stopClock() {
    clearInterval(idInterval);
}

function saveRanking(){

    let ranking = [];
    if(JSON.parse(localStorage.getItem("ranking"))){
       ranking  = JSON.parse(localStorage.getItem("ranking"));
    }
    let player = {nome: player_name, cartas: number_of_cards, pontos: points};
    ranking.push(player);
    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function showRanking(){

    let top_raking =  `<div class="show-ranking">
                            <ul class="rank-pos"><p>Pos</p>          
                            </ul> 
                            <ul class="rank-name"><p>Jfaogador</p>
                            </ul>
                            <ul class="rank-card"><p>N° cartas</p>
                            </ul>
                            <ul class="rank-point"><p>Pontos</p>
                            </ul>
                        </div>`;

    document.querySelector(".container").innerHTML = top_raking;
    document.querySelector(".informsGame").innerHTML = "<h2>Ranking</h2>";

    let rank_pos = document.querySelector(".rank-pos");
    let rank_name = document.querySelector(".rank-name");
    let rank_card = document.querySelector(".rank-card");
    let rank_point = document.querySelector(".rank-point");
    let ranking = JSON.parse(localStorage.getItem("ranking"));

    ranking.sort((a, b) => b.pontos - a.pontos);
    for(let i = 0; i < ranking.length; ++i){
        rank_pos.innerHTML += `<li>${i+1}</li>`;
        rank_name.innerHTML += `<li>${ranking[i].nome}</li>`;
        rank_card.innerHTML += `<li>${ranking[i].cartas}</li>`;
        rank_point.innerHTML += `<li>${ranking[i].pontos.toFixed(2)}</li>`;
    }
}

