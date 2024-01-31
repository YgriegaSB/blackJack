
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// Referencias
let puntosJugador = 0, 
    puntosComputador = 0;

let divCartasJugador = document.querySelector( '#jugador-cartas' );
let divCartasComputador = document.querySelector( '#computadora-cartas' );

const btnPedir = document.querySelector( '#btnGetCard' );
const btnQuedarse = document.querySelector( '#btnStay' );
const btnNuevoJuego = document.querySelector( '#btnNewGame' );

let puntosHtml = document.querySelectorAll( 'small' );

// Create deck
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos) {
        for(let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

// get card
const pedirCarta = () => {

    if(deck.length === 0) {
        throw "No quedan cartas";
    }

    const carta = deck.shift();
    return carta;
}

// get valor carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;    
}

// events
// funcion de callback (funcion que se manda como argumento)

// Get card - DONE
btnPedir.addEventListener( 'click', () => {

    const card = pedirCarta();
    puntosJugador += valorCarta(card);
    puntosHtml[0].innerText = puntosJugador;

    // add points to player
    const carta = document.createElement('img');
    carta.classList.add('carta')
    carta.src = `assets/cards/${card}.png`;
    divCartasJugador.append(carta);

    setPointsComputer();

    return console.log(puntosJugador, ' - ', puntosComputador);
});

const setPointsComputer = () => {
    
    const card = pedirCarta();
    puntosComputador += valorCarta(card);
    puntosHtml[1].innerText = puntosComputador;

    const cartaComputadora = document.createElement('img');
    cartaComputadora.classList.add('carta')
    cartaComputadora.src = `assets/cards/${card}.png`;
    divCartasComputador.append(cartaComputadora);

    return (puntosComputador < 22 && puntosComputador >= 17) ? puntosComputador===20 : puntosComputador;
};


// New game - DONE
btnNuevoJuego.addEventListener( 'click', () => {

    puntosJugador = 0;
    puntosHtml[0].innerText = puntosJugador;

    puntosComputador = 0;
    puntosHtml[1].innerText = puntosComputador;

    divCartasJugador.innerHTML = '';
    divCartasComputador.innerHTML = '';
});

// Develop button stay - DONE (needs work)
btnQuedarse.addEventListener( 'click', () => {
    console.log(puntosJugador,' - ', puntosComputador);
    switch (puntosJugador, puntosComputador) {
        case puntosJugador === 21 || puntosJugador > 18:
            alert('Ganaste contra la casa');
            break;
        case puntosJugador > 21:
            alert('Perdiste contra la casa');
            break;
        case puntosComputador > 21:
            alert('Ganaste contra la casa');
            break;
        default:
            alert('Perdiste contra la casa');
            break;
    }
});

createDeck();