//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gOverSound , swoshSound ;
var k_boy , k_boyImg ;
var bg , bg_img;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  k_boyImg = loadImage("k_boy.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  bg_img = loadImage("bg.jpg");
  //load sound
  gOverSound = loadSound("gameover.mp3");
  swoshSound = loadSound("knifeSwoosh.mp3");
  

}



function setup() {
  createCanvas(600, 600);

  bg = createSprite(300,300);
  bg.addImage(bg_img);
  bg.scale=0.3;
  
  //creating knife sprite
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  


  //collider
  knife.debug = false;
  knife.setCollider("rectangle",0,0,100,100);
}
 
 

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      swoshSound.play();
      score=score+1;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
       
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        gOverSound.play();
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=350;
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  fill("black")
  text("Score : "+ score,230,50);

  //display text ( fruit cutter )
  textSize(80);
  textFont("vagabond")
  fill("yellow");
  text("fruit cutter",140,280);

  textSize(30);
  fill("green");
  textFont("algerian")
  text("CTRL+R  to play again",145,30);
  
}


function Monster(){
  if(World.frameCount%150===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -(4 + score/90);
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= 7;
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}