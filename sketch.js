//Game States
var PLAY=1;
var END=0;
var gameState=1;

var fruit ,fruitGroup, fruit1, fruit2 ,fruit3,fruit4;
var sword, swordImage;
var monster, monsterImage, enemyGroup;
var gameOverImage;
var score =0

function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.5
  
  
  //set collider for sword
  sword.setCollider("circle",0,0,40);
  //sword.debug=true;

  // Score variables and Groups
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //spawn fruits and Enemy
    fruits();
    enemy();
    
    //sword follow mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    //score counter
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    else
    {
      //End state when sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);        
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();

        
        //Change sword animation to gameover animation and reset its position
        sword.addImage(gameOverImage);
        sword.scale = 0.75;
        sword.x=300;
        sword.y=250;
      }
    }
  }
  
  drawSprites();
  
  //Display score
  text("Score : "+ score,300,30);
}


function enemy(){
  if(World.frameCount%230===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("enemy", monsterImage);
    monster.velocityX=-8;
    monster.setLifetime=75;

    monster.y=Math.round(random(70,500));
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%60===0){
    fruit=createSprite(600,200,20,20);
    fruit.scale=0.2;
    fruit.velocityX=-6;
    fruit.setLifetime=100;
    
    var rand = Math.round(random(1,4));
    switch (rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
    }
    
    fruit.y=Math.round(random(50,550));

    fruitGroup.add(fruit);
  }
}