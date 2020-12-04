var PLAY = 1;
var END  = 0;
var gamestate = PLAY;
var monkey , monkey_running;
var banana ,bananaImage,  obstacleImage,mI,aI;
var fg, og,mg,ag;
var score;
var ground,ground2,iground,grass;
var restart,restartI,gameover,gameoverI;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  grass = loadImage("a.png")
  restartI = loadImage("restart.png");
  gameoverI = loadImage("dah0jbw-0d1d59b1-f18b-4500-bab5-c187bae57bf9.png");
  mI=loadImage("leftmango.png");
  aI=loadImage("Apple.png")
}



function setup() {
  createCanvas(400, 400);
  fill("black");
   ground = createSprite(200,370,400,10);
  ground.addImage(grass);
  ground.scale = 0.2;
  ground.x = ground.width /2;
  
  ground2 = createSprite(200,370,400,10);
  ground2.addImage(grass);
  ground2.scale = 0.2
  
  gameover = createSprite(200,160,10,10)
  gameover.addImage(gameoverI)
  gameover.scale = 0.1;
  
  restart = createSprite(200,230,10,10)
  restart.addImage(restartI)
  restart.scale = 0.07
  
  
  iground = createSprite(200,400,400,5);
  iground.visible = false;
  
monkey = createSprite(30,380,10,10)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  score = 0;
  fg = createGroup();
   mg = createGroup();
  og = createGroup();
  ag = createGroup();
 }


function draw() {
background(23,165,137);
  if (gamestate === PLAY){
     gameover.visible = false;
     restart.visible = false;
   if(keyDown("space")&&  monkey.y >= 100) {
         monkey.velocityY = -12;
}
     monkey.velocityY =  monkey.velocityY + 0.8
if(fg.isTouching(monkey)){
   fg.destroyEach();
  score = score+ 2;
   }
    if(mg.isTouching(monkey)){
   mg.destroyEach();
  score = score+ 4;
   }
    if(ag.isTouching(monkey)){
   ag.destroyEach();
  score = score+ 10;
   }
     if(og.isTouching(monkey)){
   gamestate = END
     }
  if (ground.x < 0){
      ground.x = ground.width/2;
    }ground.velocityX = -4
 spawnObstacles();
  spawnbanana();
    spawnmango();
    spawnapple();
  }
  
  else if (gamestate === END){
    gameover.visible = true;
     restart.visible = true;
    
     ground.velocityX = 0;
    og.setLifetimeEach(-1);
    ag.setLifetimeEach(-1);
    mg.setLifetimeEach(-1);
    fg.setLifetimeEach(-1);
    
    og.setVelocityXEach(0);
    mg.setVelocityXEach(0);
    ag.setVelocityXEach(0);
    fg.setVelocityXEach(0);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  text("score = "+score,10,20)
monkey.collide(iground)
drawSprites();
  
}

function reset(){
  gamestate = PLAY;
  score = 0;

  
  restart.visible = false;
  gameover.visible = false;
og.destroyEach();
  fg.destroyEach();
  mg.destroyEach();
  ag.destroyEach();
  
}
function spawnObstacles(){
 if (frameCount % 200 === 0){
    var obstacle = createSprite(400,300,10,40);
   obstacle.velocityX = -(8+1*score/50 ) 
   
    //generate random obstacles
     obstacle.y = Math.round(random(390,391));
     obstacle.addImage(obstaceImage) 
 obstacle.scale = 0.1;
   obstacle.lifeTime = 34;
   og.add(obstacle);
    }
    
   
}


function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(30,330));
    banana.addImage(bananaImage);
   banana.scale = 0.1;
  banana.velocityX = -(3+1.5*score/15);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    fg.add(banana);

  }
}
function spawnmango() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var mango = createSprite(600,120,40,10);
    mango.y = Math.round(random(20,330));
    mango.addImage(mI);
   mango.scale = 0.1;
  mango.velocityX = -(8+1.5*score/20);
    
     //assign lifetime to the variable
    mango.lifetime = 200;
    mg.add(mango);

  }
}
function spawnapple() {
  //write code here to spawn the clouds
  if (frameCount % 130 === 0) {
    var apple = createSprite(600,120,40,10);
   apple.y = Math.round(random(20,320));
    apple.addImage(aI);
   apple.scale = 0.1;
  apple.velocityX = -(10+1.5*score/30);
    
     //assign lifetime to the variable
    apple.lifetime = 200;
    ag.add(apple);

  }
}