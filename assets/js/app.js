// Patron modulo
// funcion anonima auto invocada
(() => {
    'use strict'

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
        return deck;
    }

    createDeck();

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

        return console.log(puntosJugador, ' - ', puntosComputador);
    });

    const setPointsComputer = () => {
        while (puntosComputador < 21) {
            const card = pedirCarta();
            const valor = valorCarta(card);
            if (puntosComputador + valor > 21) {
                break;
            }
            puntosComputador += valor;
            const cartaComputadora = document.createElement('img');
            cartaComputadora.classList.add('carta');
            cartaComputadora.src = `assets/cards/${card}.png`;
            divCartasComputador.append(cartaComputadora);
            puntosHtml[1].innerText = puntosComputador;
        }

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


    // Stay - DONE
    btnQuedarse.addEventListener('click', () => {
        setPointsComputer();

        const jugadorPerdio = puntosJugador > 21;
        const casaPerdio = puntosComputador > 21;
        const empate = puntosJugador === puntosComputador;

        const mensaje =
            jugadorPerdio ? 'La casa gana. Has perdido por pasarte de 21.' :
            casaPerdio ? '¡Felicidades! Has ganado. La casa se pasó de 21.' :
            empate ? 'Empate. Nadie gana.' :
            puntosJugador > puntosComputador ? '¡Felicidades! Has ganado.' :
            'La casa gana.';

        alert(mensaje);
    });

})();
