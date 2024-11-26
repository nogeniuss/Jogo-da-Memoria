const cards = document.querySelectorAll(".memory-card");  // Seleciona todos os elementos com a classe "memory-card"

let hasFlippedCard = false;  // Indica se alguma carta está virada
let lockBoard = false;       // Indica se o jogo está bloqueado (evita novos cliques)
let firstCard, secondCard;  // Armazena as referências da primeira e segunda carta viradas

function flipCard() {
  if (lockBoard) return;  // Se o jogo estiver bloqueado, ignora o clique
  if (this === firstCard) return;  // Evita virar a mesma carta novamente

  this.classList.add("flip");  // Adiciona a classe "flip" para virar a carta

  if (!hasFlippedCard) {  // Se for a primeira carta virada
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;  // Armazena a referência da segunda carta virada
  checkForMatch();    // Verifica se as cartas são iguais
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;  // Verifica se os dados "framework" das cartas são iguais

  if (isMatch) {
    disableCards();  // Desabilita as cartas se forem iguais
  } else {
    unflipCards();  // Vira as cartas de volta se não forem iguais
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);  // Remove o evento de clique da primeira carta
  secondCard.removeEventListener("click", flipCard); // Remove o evento de clique da segunda carta

  resetBoard(); 1   // Reinicia o estado do jogo
}

function unflipCards() {
  lockBoard = true;  // Bloqueia o jogo temporariamente

  setTimeout(() => {
    firstCard.classList.remove("flip");  // Vira a primeira carta de volta
    secondCard.classList.remove("flip"); // Vira a segunda carta de volta

    resetBoard();  // Reinicia o estado do jogo
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];  // Reinicia os flags
  [firstCard, secondCard] = [null, null];      // Reinicia as referências das cartas
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);  // Gera uma posição aleatória dentro do número total de cartas
    card.style.order = randomPos;                            // Define a ordem do elemento para embaralhar
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));  // Adiciona o evento de clique a todas as cartas