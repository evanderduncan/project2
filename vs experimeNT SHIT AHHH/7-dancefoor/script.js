let video;
let poseNet;
let poses = [];
let positions = [];
let bubbles = [];
let x = 0;
let y = 0;
var xspeed = 5;
var yspeed = 2;
var birds;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  //Introducing poseNet
  poseNet = ml5.poseNet(video, {flipHorizontal: false}, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
    console.log(poses);
  });

  //video.hide();

  //Drawing bubbles;
  for (let i = 0; i < 500; i++) {
    noStroke();
    fill(100, 120, 150);
    ellipse(x, y, 15, 15);
    x = x + 30;
    if (x > width) {
      x = 0;
      y = y + 30;
    }
    if (y > height) {
      y = 0;
    }

    let b = new Bubble(x, y, 15);
    bubbles.push(b);
  }
  
  
  birds = new Group();

  for (var i = 0; i < 5; i++) {
    var b = createSprite(
      random(width), random(height),
      random(10, 50), random(5, 25));
    b.shapeColor = color(255, random(255), random(255));
    b.friction = random(0.97, 0.99);
    b.maxSpeed = random(1, 4);
    b.rotateToDirection = true;
    birds.add(b);
  }
  
}

function modelReady() {
  select('#status').html('Model Loaded');
}


function draw() {
  background(0);
  //image(video, 0, 0, width, height);

  //get position of right hand
  if (poses.length > 0) {
    //let leftWrist = poses[0].pose.keypoints[9].position;
    let rightWrist = poses[0].pose.keypoints[10].position;
    fill(255, 64);
    ellipseMode(CENTER);

    //fill(frameCount/2, 100,100,100);
    noStroke();
    for (let i = 0; i < positions.length; i++) {
      positions[i][1]++;
    }
    positions.push([rightWrist.x, rightWrist.y]);
    noFill();

    //letting the bubbles do their jobs
    for (let i = 0; i < bubbles.length; i++) {
      //bubbles[i].move();
      bubbles[i].show();
      bubbles[i].hover(rightWrist.x, rightWrist.y);
    }
    
    
      for (var i = 0; i < birds.length; i++) {
    birds[i].attractionPoint(150, rightWrist.x, rightWrist.y);
  }
  drawSprites();
    
    
  }
  
  
  

}



class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = 125;
  }

  //Defining how the bubbles response to the post
  hover(pixelX, pixelY) {
    let distance = dist(pixelX, pixelY, this.x, this.y);
    if (distance < this.r) {
      this.color = this.color + random(0, 125);
      //bubbles[i].move();
      // this.x = this.x + random(-5, 5);
      // this.y = this.y + random(-5, 5);
      this.x = this.x + xspeed;
      this.y = this.y + yspeed;
      

      if (x > 625 || x < 15) {
        xspeed = -xspeed;
      }
      if (y > 465 || y < 15) {
        yspeed = -yspeed;
      }
    }

  }

  
  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }


  show() {
    // stroke(255);
    // strokeWeight(1);
    noStroke();
    fill(this.color, this.color, this.color * 2, 200);
    ellipse(this.x, this.y, this.r * 2);
  }
}