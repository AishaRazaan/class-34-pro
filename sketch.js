const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,ground;
var clothe_con;
var clothe_con_2;
var clothe_con_3;
var rope3;

var bg_img;
var clothe,dress;
var girl1,girl2,girl3,girly;

var button,button2,button3;
var mute_btn;

function preload()
{
  bg_img = loadImage('bg.jpg');
  dress = loadImage('dress.png');
  girl1 = loadImage('moody.png');
  girl2 = loadImage("happy.png");
  girl3 = loadImage("cry.png");
  
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(80,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:80,y:90});
   rope2 = new Rope(8,{x:480,y:90});
  
  ground = new Ground(300,height,width,20);

  girly = createSprite(120,600,100,100);
  girly.addImage("pj",girl1);
  girly.addImage("happy",girl2);
  girly.addImage("sad",girl3);
  girly.changeImage("pj",girl1);
  girly.scale = 1.5

  clothe = Bodies.rectangle(300,300,40,40);
  Matter.Composite.add(rope.body,clothe);

  clothe_con = new Link(rope,clothe);
  clothe_con_2 = new Link(rope2,clothe);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(clothe!=null){
    image(dress,clothe.position.x,clothe.position.y,100,100);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(clothe,girly,80)==true)
  {
    World.remove(engine.world,clothe);
    girly.changeImage("happy",girl2);
    clothe = null
   }

   if(clothe!=null && clothe.position.y>=650)
  {
   girly.changeImage("sad",girl3);
    clothe=null;
   }
}

function drop()
{
  rope.break();
  clothe_con.dettach();
  clothe_con = null;
}

function drop2()
{
  rope2.break();
  clothe_con_2.dettach();
  clothe_con_2 = null;
}

function collide(body,sprite,distance)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=distance)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


