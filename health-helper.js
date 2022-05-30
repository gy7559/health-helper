let video
let size=0;
let poseNet;
let poses=[];
//let keypointX=[];
//let keypointY=[];
//let skeletons=[];

let canvas;
let vid;


function gotFile(file){  
  video = createVideo([file.data], vidLoad)
  console.log('file: '+file.data)
  video.size(width,height)
  
  poseNet = ml5.poseNet(video,modelReady); 
  poseNet.on('pose', (results)=>{
      poses = results
  });
}


function setup() {
  canvas = createCanvas(300, 200);  
  canvas.drop(gotFile)
  background(150);   
}


function vidLoad(){
  video.loop()
  video.volume(1)
  console.log("video ON")
}

function modelReady(){
  console.log('model OK');
}

function drawKeypoints(){
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
         noStroke();
        fill(255, 0, 0);
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}
function drawSkeleton(){
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
function draw(){  
  background(100)
  drawKeypoints()
  drawSkeleton()
  
}
