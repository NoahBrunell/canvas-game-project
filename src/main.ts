const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d');
document.body.append(canvas);

let a = false
let d = false

let gameOver = false
let playerSpeed = 15
let obstacleSpeed = 5

interface Rectangle {
  x: number,
  y: number,
  w: number,
  h: number,
}

let player: Rectangle = {
  x: 380,
  y: 450,
  w: 40,
  h: 40,
}

let obstacle: Rectangle = {
  x: 0,
  y: 0,
  w: 800,
  h: 10,
}

let safeZone: Rectangle = {
  x: 0,
  y: 0,
  w: 100,
  h: 10,
}

let fakeObstacle: Rectangle = {
  x: 0,
  y: 0,
  w: 800,
  h: 10,
}

let fakeSafeZone: Rectangle = {
  x: 0,
  y: 0,
  w: 100,
  h: 10,
}



document.addEventListener('keydown', (e) => {
  if (e.key == 'a') {
    a = true
  }
  if (e.key == 'd') {
    d = true
  }
})

document.addEventListener('keyup', (e) => {
  if (e.key == 'a') {
    a = false
  }
  if (e.key == 'd') {
    d = false
  }
})



requestAnimationFrame(gameLoop);


function gameLoop() {
  if (gameOver == false) {
    requestAnimationFrame(gameLoop);
  } else {
    player.x = 380
    player.y = 450
    obstacle.y = 0
    safeZone.y = 0
    document.addEventListener('keypress', (e) => {
      if ((e.key == 'r') && gameOver == true) {
        gameOver = false
        requestAnimationFrame(gameLoop);
      }
    })
  }
  
  update();
  render();
}

function update() {
  movement()
  handleObstacle()
  
}

function movement() {
  if ((a == true) && (player.x > 0)) player.x -= playerSpeed
  if ((d == true) && (player.x + player.w < 800)) player.x += playerSpeed

  if (obstacle.y < 600) {
    obstacle.y += obstacleSpeed
  } else {
    obstacle.y = 0

  }
  safeZone.y = obstacle.y

  fakeObstacle.y += obstacleSpeed
  fakeSafeZone.y += obstacleSpeed

}

function handleObstacle() {
  if ((player.y <= obstacle.y + obstacle.h) && ((player.x + player.w <= safeZone.x) || (player.x >= safeZone.x + safeZone.w)) && player.y + player.h >= obstacle.y) {
    gameOver = true
  } else if (player.y <= obstacle.y + obstacle.h) {
    obstacleSpeed = obstacleSpeed + 0.1
    fakeObstacle.y = obstacle.y
    fakeSafeZone.y = safeZone.y
    fakeSafeZone.x = safeZone.x
    obstacle.y = 0
    safeZone.x = getRandomNumber(10, 690)
  }
}

function getRandomNumber(min: number, max: number): number {
  const randomNumber = Math.random() * (max - min) + min;
  return Math.floor(randomNumber);
}

function render() {
  context!.clearRect(0,0,800,600)
  context!.fillStyle = 'rgb(255, 0, 0)'
  context!.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h)
  context!.fillStyle = 'rgb(0, 255, 0)'
  context!.fillRect(safeZone.x, safeZone.y, safeZone.w, safeZone.h)
  context!.fillStyle = 'rgb(255, 0, 0)'
  context!.fillRect(fakeObstacle.x, fakeObstacle.y, fakeObstacle.w, fakeObstacle.h)
  context!.fillStyle = 'rgb(0, 255, 0)'
  context!.fillRect(fakeSafeZone.x, fakeSafeZone.y, fakeSafeZone.w, fakeSafeZone.h)
  context!.fillStyle = 'rgb(0, 0, 0)'
  context!.fillRect(player.x, player.y, player.w, player.h)
}