var database;
var position;
var balloon;
var bg;

function preload() {
   bg = loadImage("bg.png")
   balloon = loadImage("Ballon.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  balloon=createSprite(250,650,150,150);
 
  var balloonposition=database.ref('balloon/position');
  balloonposition.on("value",readposition, showError);
  
}


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    writePosition(-5,0);
    
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(5,0);
    
  }
  
  drawSprites();
  
}


function writePosition(x,y){
  database.ref('balloon/position').update({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readposition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}