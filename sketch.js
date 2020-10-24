var dog,happyDog
var database
var foodS
var foodStock
var feed,addFood
var fedTime,lastFed
var foodObj


function preload(){
  
  dogIMG=loadImage("images/dogImg.png");
  happyDogIMG=loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  createCanvas(700, 700);

  dog=createSprite(550,250,40,40);
  dog.addImage(dogIMG);
  dog.scale=0.15;

  foodObj=new Food(10,10,70,50);

  foodStock=database.ref('Foods');
  foodStock.on("value",readStock);
  
  feed=createButton("Feed The Dog ");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
getTime();
background(46,139,87)
foodObj.display();


fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
})


drawSprites();
textSize(30);
fill(0);
stroke(255);
text("Remaining Food :   "   +foodS,250,125);

  fill(255,255,254);
  noStroke();
  textSize(15);

  if(lastFed>=12){
    text("Last Fed:"+lastFed%12+"PM",350,30);
  }
  else if(lastFed===0){
  text("Last Fed:12 AM",350,30);
  }
  else{
    text("Last Fed:"+lastFed+"AM",350,30);
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Foods:x
  })

}


async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
}

function feedDog(){
  dog.addImage(happyDogIMG);

  if(foodS>0){
    foodS=foodS-1;
    }
    
 database.ref('/').update({
 Food:foodS,
 FeedTime:hour()
})

}

function addFoods(){
  dog.addImage(dogIMG);
  foodS++
  database.ref('/').update({
  Foods:foodS
  })

}