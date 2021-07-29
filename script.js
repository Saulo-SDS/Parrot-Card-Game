let number_of_cards;
let cards = [];
const images = ['bobrossparrot.gif','explodyparrot.gif','fiestaparrot.gif','metalparrot.gif','revertitparrot.gif','tripletsparrot.gif','unicornparrot.gif'];

function initGame(){  
    
    do{
        number_of_cards = prompt("Digite a quantidade de cartas");
    }while(number_of_cards & 1 || number_of_cards < 4 || number_of_cards > 14);

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
