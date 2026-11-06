// 1. Selección de elementos del DOM
const container = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');

// 2. Variables de Estado
let playerX = 180;
const playerSpeed = 15;
let score = 0;
let gameOver = false;
let gameInterval;
let bugSpawnInterval;

// 3. Controles del Teclado
document.addEventListener('keydown', (e) => {
  if (gameOver) return;

  if ((e.key === 'ArrowLeft' || e.key === 'a') && playerX > 0) {
    playerX -= playerSpeed;
  }
  if ((e.key === 'ArrowRight' || e.key === 'd') && playerX < container.clientWidth - 40) {
    playerX += playerSpeed;
  }
  
  player.style.left = `${playerX}px`;
});

// 4. Función utilitaria para detectar colisión entre 2 elementos del DOM
function checkCollision(elem1, elem2) {
  const r1 = elem1.getBoundingClientRect();
  const r2 = elem2.getBoundingClientRect();

  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.right < r2.left ||
    r1.left > r2.right
  );
}

// 5. TODO por los alumnos:
var puntaje = 0
function bajar(elemento){
  let distancia = 50;

  const intervalo = setInterval(() => {
      distancia += 10;
      elemento.style.top = `${distancia}px`;
      if(checkCollision(player,elemento))
        document.getElementById("game-over-screen").style.display = "flex";
  },100);

  if(elemento.style.top >= '600px'){
    elemento.remove();
    puntaje++;
    document.getElementById("score").innerHTML = puntaje;
  }
}

function addElement(){
  //creo el div
  var newDiv = document.createElement("div");

  //contenido
  newDiv.innerHTML = "<img src='img/TieFighter.png'>";

  //propiedades
  newDiv.style.position = "absolute";
  var aleatorio = Math.floor(Math.random()*390);
  newDiv.style.left = `${aleatorio}px`;
  newDiv.style.top = "50px";
  newDiv.style.fontSize = "40px";
  newDiv.id = `bug-${Date.now()}`;

  //añado el div al contenedor del juego
  var juegoContenedor = document.getElementById("game-container");
  juegoContenedor.appendChild(newDiv);

  bajar(newDiv);

}
setInterval(addElement,3000);

document.getElementById("restart-btn").addEventListener("click",() => {location.reload()});

// - Función para crear bugs periódicamente (document.createElement)
// - Mover los bugs hacia abajo en un intervalo/frame

// - Comprobar colisión con checkCollision(player, bug)

// - Actualizar puntuación y gestionar Game Over