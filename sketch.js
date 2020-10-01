//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogIMG, dogIMG2
var fedTime = 0;
var lastFed = 0;

var changeGameState, readGameState
var bedroom, garden, washroom

function preload()
{
  //load images here
  dogIMG = loadImage("images/dogIMG.png")
  dogIMG2 = loadImage("images/dogImg1.png")

  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()

  dog = createSprite(250,250,40,40)
  dog.addImage(dogIMG)
  
  foodStock=database.ref('food')
    foodStock.on("value", readStock)

  foodObj = new Food()

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val
  })
}


function draw() {  
  background(46,139,87)

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30)
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30)
  }

  fedTime=database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed=data.val()
  })

  foodObj.display()
  drawSprites();
  
  textSize(20)
  fill("white")
  stroke()
  //add styles here

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing")
    foodObj.garden()
  }else if(currentTime==(lastFed+2)){
    update("Sleeping")
      foodOnj.bedroom()
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing")
      foodObj.washroom()
  }else{
    update("Hungry")
    foodObj.display
  }

}

function readStock(data){
  foodS=data.val()
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




