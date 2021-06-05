var PLAY = 1,END = 0;
var gamestate = PLAY,score,count = 0;
var player,player_damage,player_running,player_jump,player_idle,player_shooting,player_dead
var backGround,background_image;
var obstacle_img,obstaclesGroup;
var invisbleGround;

function preload(){
player_damage = loadAnimation("damage01.png","damage02.png","damage03.png","damage04.png","damage05.png");
player_running = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png",
"run6.png","run7.png","run8.png");
player_idle = loadImage("idle01.png");
player_jump = loadAnimation("jump01.png","jump02.png","jump03.png","jump04.png");
player_shooting = loadAnimation("shooting1.01.png","shooting1.02.png","shooting1.03.png","shooting1.04.png",
"shooting2.01.png","shooting2.02.png","shooting2.03.png","shooting1.04.png",)
background_image = loadImage("f0c67138e03caef.png")
obstacle_img = loadImage("stone.png")
}

function setup() {
  createCanvas(1600,800);
  player = createSprite(200, 600, 50, 50);
  player.addAnimation("player_shooting",player_shooting);
  player.addAnimation("player_jump",player_jump);
  player.addAnimation("player_running",player_running)
  player.addAnimation("player_damage",player_damage)
  player.scale = 3.5;
  
  backGround = createSprite(600,320,1600,800);
  backGround.addImage("background_image",background_image);
  backGround.scale = 1.0;  
  backGround.velocityX = 2;
  obstaclesGroup = new Group()

  invisbleGround = createSprite(210,900,400,400);
  invisbleGround.visible = false;
}

function draw() {
  background(0);
  backGround.velocityX = -3;
  if(backGround.x < 0){
    backGround.x = 1200; 
  }
  player.depth = backGround.depth;
  player.depth = player.depth+1
  obstaclesGroup.depth =player.depth;
  console.log()
  
  if(keyDown("space") && player.y >= 468 ){
    player.velocityY = -15;
    player.changeAnimation("player_jump",player_jump);
  }
  
  spawnObstacles();

  if(obstaclesGroup.isTouching(player)){
    player.velocityY = 0;
    player.changeAnimation("player_damage",player_damage);
    obstaclesGroup.destroyEach();
    count = count+1
    

  }

  player.velocityY = player.velocityY + 0.8
  
  if(player.collide(invisbleGround)){
    player.changeAnimation("player_running",player_running);
  };
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,650,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}
