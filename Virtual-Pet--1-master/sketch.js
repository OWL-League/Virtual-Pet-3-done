var dog, dogIMG, dogIMG1, sadDog;
var database, gameState;
var food, foodStock;
var feedTime, lastFeed;
var feed, addFood, foodOBJ;
var changeGameState, readGameState;
var bedroomIMG, gardenIMG, bathroomIMG, backgroundIMG;

function preload()
{
  dogIMG = loadImage("images/dogImg.png");
  dogIMG1 = loadImage("images/dogImg1.png");
  sadDog = loadImage("images/deadDog.png");
  bedroomIMG = loadImage("images/Bedroom.png");
  gardenIMG = loadImage("images/Garden.png");
  bathroomIMG = loadImage("images/Bathroom.png");
}

function setup() {
	createCanvas(1000, 400);
  database = firebase.database();


  foodOBJ = new Food();

  dog = createSprite(800,200,150,150);
  dog.addImage(dogIMG);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feedTime = database.ref('FeedTime');
  feedTime.on("value", function(data){
    lastFeed = data.val();
  });

  feed = createButton("feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);


  addFood = createButton("add food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  readGameState = database.ref('GameState');
  readGameState.on("value", function(test){
  gameState=test.val();
  });
}


function draw() {  

  foodOBJ.display();
  
  drawSprites();


  console.log(lastFeed);

  fill(255, 255, 254);
  textSize(15);
  if(lastFeed >= 12){
    text("Last Feed: " + lastFeed%12 + " pm", 350, 30);
  }
  else if(lastFeed === 0){
    text("Last Feed: 12 am", 350, 30);
  }
  else{
    text("Last Feed: " + lastFeed + " am", 350, 30);
  }

   currentTime=hour();
  if(currentTime==(lastFeed+1)){
    update("Playing");
    foodOBJ.gardenIMG();
  }else if(currentTime==(lastFeed+2)){
    update("Sleeping");
    foodOBJ.bedroomIMG();
  }else if(currentTime>(lastFeed+2) && currentTime<=(lastFeed+4)){
    update("Bathing");
    foodOBJ.bathroomIMG();
  }else{
    update("Hungry");
    foodOBJ.display();
  }
  

  if(gameState!=="Hungry"){
    //feed.hide();
    //addFood.hide();
    //dog.remove();
  }else{
      dog.addImage(sadDog);
      feed.show();
      addFood.show();
    }
  
}


function readStock(data){
  food = data.val();
  foodOBJ.updateFoodStock(food);
}



function feedDog(){
  dog.addImage(dogIMG1);
  foodOBJ.updateFoodStock(foodOBJ.getFoodStock()-1);
  database.ref('/').update({
    Food: foodOBJ.getFoodStock(),
    FeedTime: hour()
  });
}

function addFoods(){
  foodOBJ.updateFoodStock(foodOBJ.getFoodStock()+1);
  database.ref('/').update({
    Food: foodOBJ.getFoodStock()
  });
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
