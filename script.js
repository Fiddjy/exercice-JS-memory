/*
TODO LIST

- Ajouter une animation (confetits) lors de victoire
- Compter le nombre de coups pour gagner (stocker les stats ?)
*/

// Déclarer un tableau de toutes les cartes
let jeuTableau
let cptClickCurrent = 0
let CardClickedId;
const cards = ["king", "queen", "valet", "as", "kingPiq", "kingtrefle"];
const gameBoard = document.getElementById("GameBoard");
let nbPairesOnGame;
let cptCartesTrouvees = 0;

document.getElementById("playButton").addEventListener("click", function() {
  let nbCardInput = document.getElementById("nbCardInput")
  initGame(nbCardInput.value)
})

// Cette fonction gère ce qu'il se passe quand on clique sur une carte
function clickOnCardEvent(card) {
  let allCards = document.querySelectorAll(".card");
  if (card.classList.contains("finded")) {
    return
  }
  cptClickCurrent++;

  if (cptClickCurrent == 1) {
    //premier click, je cache les images trouvées avant
    allCards.forEach(card => {
      if (card.classList.contains("finded")) {
        //c'est une carte trouvée
      }
      else {
        //pas trouvée, il faut qu'elles soient masquées
        card.classList.add("hidden")
      }
    })
    //j'affiche la carte que je viens de cliquer
    card.classList.remove("hidden");
    //je stocke la réponse derrière la carte
    CardClickedId = card.id;
  }
  else if (cptClickCurrent == 2) {
    // 2e click, je vérifie si l'image à été trouvée
    if (CardClickedId == card.id) {
      cptClickCurrent = 1;
    }
    else {
      card.classList.remove("hidden");
      let cardClickedBefore = document.getElementById(CardClickedId)
      if (cardClickedBefore.dataset.image == card.dataset.image) {
        allCards.forEach(card => {
          if (card.classList.contains("hidden")) {
            //c'est une carte cachée : je ne fais rien
          }
          else if (!card.classList.contains("finded")) {
            card.classList.add("finded");
            cptCartesTrouvees++;
          }
        })
      }

      cptClickCurrent = 0;
      CardClickedId = "";
    }
    if (cptCartesTrouvees == nbPairesOnGame * 2) {
      //Animation rigolote
      setAnimationWin()
    }
  }
}

function initGame(nbPaires) {
  gameBoard.innerHTML = "";
  stopAnimation()
  nbPairesOnGame = nbPaires;
  cptCartesTrouvees = 0;
  let gameCard = [];
  for (let i = 0; i < nbPaires; i++) {
    gameCard.push([cards[i], false]);
    gameCard.push([cards[i], false]);
  }

  for (let i = 0; i < gameCard.length; i++) {
    let cardIsPositionned = false
    while (!cardIsPositionned) {
      let randomNumber = getRandomArbitrary(0, gameCard.length)
      if (gameCard[randomNumber][1] == false) {
        cardIsPositionned = true;
        gameCard[randomNumber][1] = true;
        // Positionner la carte dans le HTML, et l'inclure.
        let cardHtml = getHtmlCodeCard(gameCard[randomNumber][0], i);
        gameBoard.innerHTML += cardHtml;
      }
    }
  }
  // J'ajoute l'évènement de clique sur toutes les cartes
  let allCards = document.querySelectorAll(".card");
  allCards.forEach(card => {
    card.addEventListener("click", function() {
      clickOnCardEvent(card);
    })
  })
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getHtmlCodeCard(nomCard, id) {
  return ` <div class="card hidden" id="${id}" data-image="${nomCard} ">
          <img src="/img/${nomCard}.png"/>
        </div> ` ;

}

function setAnimationWin() {
  let animateDiv = document.getElementById("allconfettis");
  animateDiv.innerHTML = "";

  for (let i = 0; i < 100; i++) {
    let confeti = document.createElement("div");
    confeti.classList.add("confetti");
    confeti.style.left = getRandomArbitrary(0, 100) + '%';
    confeti.style.animationDelay = 50 * i + "ms";
    confeti.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    animateDiv.appendChild(confeti);
  }
}

function stopAnimation() {
  let animateDiv = document.getElementById("allconfettis");
  animateDiv.innerHTML = "";
}