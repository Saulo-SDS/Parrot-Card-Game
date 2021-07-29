let number_of_cards;

function initGame(){  
    
    do{
        number_of_cards = prompt("Digite a quantidade de cartas");
        console.log("loop " + number_of_cards);
    }while(number_of_cards & 1 || number_of_cards < 4 || number_of_cards > 14);
}