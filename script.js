/*
TODO LIST

- Gérer l'aléatoire dans le placement des images
- Pouvoir choisir le nombre de cartes en jeu
- Gérer les débuts et fin de parties
- Ajouter une animation (confetits) lors de victoire
- Pouvoir relancer une partie
- Gérer le bug du click deux fois sur la même image
- Compter le nombre de coups pour gagner (stocker les stats ?)
*/

let jeuTableau
let allCards = document.querySelectorAll(".card");
let cptClickCurrent = 0
let dataImageShowed;

allCards.forEach(card => {
  card.addEventListener("click", function(){
    playGame(card);
  })
})

function playGame(card){
  cptClickCurrent ++;
  
  if(cptClickCurrent == 1) {
    //premier click, je cache les images trouvées avant
    allCards.forEach(card => {
      if(card.classList.contains("finded")){
        //c'est une carte trouvée
      }
      else{
        //pas trouvée, il faut qu'elles soient masquées
        card.classList.add("hidden")
      }
    })
    //j'affiche la carte que je viens de cliquer
    card.classList.remove("hidden");
    //je stocke la réponse derrière la carte
    dataImageShowed = card.dataset.image;
  }
  else if(cptClickCurrent == 2){
    // 2e click, je vérifie si l'image à été trouvée
    card.classList.remove("hidden");
    if(dataImageShowed == card.dataset.image){
      allCards.forEach(card => {
        if(card.classList.contains("hidden")){
          //c'est une carte cachée
        }
        else{
          card.classList.add("finded")
          //c'est une carte trouvée
        }
      })
    }
    
    cptClickCurrent = 0;
    dataImageShowed = "";

    //compter les cards qui n'ont pas la classe "finded"
    // si = 0 alors on a gagné, le jeu est fini
  }
}