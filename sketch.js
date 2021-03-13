var monkey, monkey_running;
var ground;
var banana, bananaImage, stone, obstacleImage;
var foodGroup, stoneGroup;
var score;
var survivalTime =0;

var gameState = "play";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(100, 500, 50, 30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(300, 580, 800, 20);
  ground.velocityX = -4;


  stoneGroup = createGroup();
  bananaGroup = createGroup();



}


function draw() {
  background("white");
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: " + survivalTime, 100, 50);
  
  if(gameState == "play"){
    survivalTime = Math.ceil(frameCount / frameRate());
    if (ground.x < 300) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space")) {
    monkey.velocityY = -14;
  }

  monkey.velocityY = monkey.velocityY + 0.5;

  if (stoneGroup.isTouching(monkey)) {
    gameState = "end";
    


  }

  monkey.collide(ground);
  spawnFood();
  spawnStones();
    
    
  }
  else if(gameState=="end"){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
  }

  

  console.log(ground.x);

  
  drawSprites();
}


function spawnStones() {
  if (frameCount % 250 == 0) {
    stone = createSprite(600, 540, 20, 21);
    stone.addImage(obstacleImage);
    stone.scale = 0.2;

    stone.velocityX = -4;
    stone.lifetime = 200;
    stoneGroup.add(stone);




  }

}


function spawnFood() {
  if (frameCount % 200 == 0) {
    banana = createSprite(600, 300, 20, 21);
    banana.addImage(bananaImage);
    banana.scale = 0.2;

    banana.velocityX = -4;
    banana.lifetime = 200;
    bananaGroup.add(banana);




  }

}