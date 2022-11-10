const $ = (querry) => document.querySelector(querry);
const $$ = (querry) => document.querySelectorAll(querry);

let canvas = $('#canvas');
console.log(canvas);
let ctx = canvas.getContext('2d');

canvas.height = 710;
canvas.width = 530;

const sprites = new Image();
sprites.src = '../img/sprites.png';

const pipeDown = new Image();
pipeDown.src = '../img/sprites/pipe-red-down.png';
const pipeUp = new Image();
pipeUp.src = '../img/sprites/pipe-red-up.png';

let game = 'start';
let frame = 0;

//START SCREEN

const start = {
  draw: function () {
    ctx.beginPath();
    ctx.drawImage(sprites, 1090, 10, 255, 68, canvas.width / 2 - 127, 50, 255, 68);
    ctx.drawImage(sprites, 1090, 78, 255, 68, canvas.width / 2 - 127, 200, 255, 68);
    ctx.drawImage(sprites, 880, 160, 190, 150, canvas.width / 2 - 85, 350, 190, 150);
  },
};

//END SCREEN

const end = {
  draw: function () {
    ctx.beginPath();
    ctx.drawImage(sprites, 1090, 148, 255, 68, canvas.width / 2 - 127, 50, 255, 68);
    ctx.drawImage(sprites, 650, 472, 297, 152, canvas.width / 2 - 149, 200, 297, 155);
    ctx.drawImage(sprites, 0, 110, 138, 81, canvas.width / 2 - 69, 380, 138, 83);
  },
};

//BACKGROUND

const bg = {
  sX: 163,
  sY: 0,
  sW: 229,
  sH: 625,
  cX: 0,
  cY: 0,
  cW: 229,
  cH: 625,
  draw: function () {
    ctx.beginPath();
    ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
    ctx.drawImage(
      sprites,
      this.sX,
      this.sY,
      this.sW,
      this.sH,
      this.cX + 229,
      this.cY,
      this.cW,
      this.cH
    );
    ctx.drawImage(
      sprites,
      this.sX,
      this.sY,
      this.sW,
      this.sH,
      this.cX + 458,
      this.cY,
      this.cW,
      this.cH
    );
  },
};

class Ground {
  constructor(cX, cY) {
    this.cX = cX;
    this.cY = cY;
    this.sX = 643;
    this.sY = 165;
    this.sW = 215;
    this.sH = 143;
    this.cW = 215;
    this.cH = 143;
    this.dx = -2;
  }
  draw() {
    ctx.beginPath();
    ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
  }
}

let arrGround = [];

for (let i = 0; i < 4; i++) {
  let ground = new Ground(i * 215, 625);
  arrGround.push(ground);
}

function drawArrayGround() {
  arrGround.forEach((item) => item.draw());
}

function updateArrayGround() {
  arrGround.forEach((item) => {
    item.cX += item.dx;
  });

  if (arrGround[0].cX <= -300) {
    arrGround.splice(0, 1);
    let ground = new Ground(arrGround[2].cX + 215, 625);
    arrGround.push(ground);
  }
}

//random
function random(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

//class Pipe
class Pipe {
  constructor(cX, cY, space) {
    this.cX = cX;
    this.cY = cY;
    this.space = space;
    this.cW = 52;
    this.cH = 420;
    this.sXt = 0;
    this.sYt = 0;
    this.sXb = 0;
    this.sYb = 0;
    this.sW = 52;
    this.sH = 320;
    this.dx = -2;
  }
  draw() {
    ctx.beginPath();
    ctx.drawImage(
      pipeDown,
      this.sXt,
      this.sYt,
      this.sW,
      this.sH,
      this.cX,
      this.cY,
      this.cW,
      this.cH
    );
    ctx.drawImage(
      pipeUp,
      this.sXb,
      this.sYb,
      this.sW,
      this.sH,
      this.cX,
      this.cY + this.cH + this.space,
      this.cW,
      this.cH
    );
  }
}

let arrPipe = [];

function drawArrayPipe() {
  arrPipe.forEach((item) => item.draw());
}

function newPipes() {
  for (let i = 0; i < 3; i++) {
    let pipe = new Pipe(random(530, 600) * i, random(-200, -100), 300);
    arrPipe.push(pipe);
  }
}

newPipes();

function updateArrayPipe() {
  arrPipe.forEach((item) => {
    item.cX += item.dx;
  });
  let y = random(-150, 100);
  if (arrPipe[0].cX <= -52) {
    arrPipe.splice(0, 1);
    let pipe = new Pipe(
      arrPipe[arrPipe.length - 1].cX + random(400, 500),
      random(-200, 100),
      random(200, 300)
    );
    arrPipe.push(pipe);
  }
}

const arrNumber = [
  {
    name: 0,
    sX: 1112,
    sY: 232,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 1,
    sX: 1170,
    sY: 232,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 2,
    sX: 1226,
    sY: 232,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 3,
    sX: 1284,
    sY: 232,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 4,
    sX: 1112,
    sY: 315,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 5,
    sX: 1170,
    sY: 315,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 6,
    sX: 1226,
    sY: 315,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 7,
    sX: 1284,
    sY: 315,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 4,
    sX: 1112,
    sY: 399,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
  {
    name: 5,
    sX: 1170,
    sY: 399,
    sW: 56,
    sH: 84,
    cW: 56,
    cH: 84,
  },
];

class Score {
  constructor(cX, cY, value) {
    this.cX = cX;
    this.cY = cY;
    this.value = value;
  }
  draw() {
    this.split = this.value.toString().split('');
    if (this.value >= 10) {
      arrNumber.forEach((number) => {
        if (this.split[0] == number.name) {
          ctx.drawImage(
            sprites,
            number.sX,
            number.sY,
            number.sW,
            number.sH,
            canvas.width / 2 - 56,
            60,
            number.cW,
            number.cH
          );
        }
        if (this.split[1] == number.name) {
          ctx.drawImage(
            sprites,
            number.sX,
            number.sY,
            number.sW,
            number.sH,
            canvas.width / 2 + 2,
            60,
            number.cW,
            number.cH
          );
        }
      });
    } else {
      arrNumber.forEach((number) => {
        if (this.split[0] == number.name) {
          ctx.drawImage(
            sprites,
            number.sX,
            number.sY,
            number.sW,
            number.sH,
            canvas.width / 2 - 28,
            60,
            number.cW,
            number.cH
          );
        }
      });
    }
  }
}

let score = new Score(340, 300, 0);

// class Bird
class Bird {
  constructor(cX, cY) {
    this.cX = cX;
    this.cY = cY;
    this.animate = [
      {
        sX: 876,
        sY: 6,
      },
      {
        sX: 936,
        sY: 6,
      },
      {
        sX: 996,
        sY: 6,
      },
    ];
    this.sW = 60;
    this.sH = 50;
    this.cW = 60;
    this.cH = 50;
    this.i = 0;
    this.v = 0;
    this.a = 0.5;
  }
  draw() {
    ctx.beginPath();
    if (game === 'start') {
      if (frame % 32 === 0) {
        this.i++;
        if (this.i > 2) {
          this.i = 0;
        }
      }
    }
    if (game === 'play') {
      if (frame % 16 === 0) {
        this.i++;
        if (this.i > 2) {
          this.i = 0;
        }
      }
    }
    ctx.drawImage(
      sprites,
      this.animate[this.i].sX,
      this.animate[this.i].sY,
      this.sW,
      this.sH,
      this.cX,
      this.cY,
      this.cW,
      this.cH
    );
  }

  update() {
    if (game === 'play' || game === 'end') {
      this.v += this.a;
      this.cY += this.v;

      // chim va cham noi nen dat
      if (this.cY + this.cH + this.v >= 625) {
        game = 'end';
        this.v = 0;
        this.cY = 625;
      }

      // kiem tra va cham cua chim voi ong nuoc
      if (
        this.cX + this.cW > arrPipe[0].cX &&
        this.cX < arrPipe[0].cX + arrPipe[0].cW &&
        (this.cY < arrPipe[0].cY + arrPipe[0].cH ||
          this.cY + this.cH > arrPipe[0].cY + arrPipe[0].cH + arrPipe[0].space)
      ) {
        game = 'end';
      }
      // an diem
      if (this.cX == arrPipe[0].cX + 70 || this.cX == arrPipe[0].cX + 71) {
        score.value++;
      }
    }
  }
}

let bird = new Bird(150, canvas.height / 2 - 25);

canvas.addEventListener('click', function (e) {
  switch (game) {
    case 'start':
      game = 'play';
      break;
    case 'play':
      console.log('bay len');
      bird.v = -8;
      break;
    case 'end':
      console.log('end');
      if (
        e.offsetX > canvas.width / 2 - 69 &&
        e.offsetX < canvas.width / 2 + 69 &&
        e.offsetY > 380 &&
        e.offsetY < 463
      ) {
        score.value = 0;
        arrPipe = [];
        newPipes();
        bird.v = 0;
        bird.cY = canvas.height / 2 - 12;
        game = 'start';
      }
      break;
  }
});

function draw() {
  bg.draw();
  if (game === 'start') {
    start.draw();
  }
  drawArrayPipe();
  drawArrayGround();
  if (game === 'play') {
    score.draw();
  }
  bird.draw();
  if (game === 'end') {
    end.draw();
  }
}

function update() {
  if (game === 'play') {
    updateArrayGround();
    updateArrayPipe();
  }
  bird.update();
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame++;
  draw();
  update();
}

animate();
