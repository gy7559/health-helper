let dropBox
let video
let size=0;
let poseNet;
let poses=[];
//let keypointX=[];
//let keypointY=[];
//let skeletons=[];


function setup() {
  dropBox = createCanvas(1240, 1080);
  background(100)
  input = createFileInput((file)=>{
    if(file.type === "video"){
      video = createVideo(file.data, vidLoad)
      video.size(width,height)
      video.hide()
      dropBox.resize(video.width,video.height)
      poseNet = ml5.poseNet(video,modelReady); 
      poseNet.on('pose', (results)=>{
      poses = results
      });
    }
  })
  input.position(0,0)
  //video = createCapture(VIDEO)
  
  
  /*dropBox.drop(afterDrop)*/
  
}


/*function afterDrop(file){
  console.log(file)
  dropBox.hide()
  video = createVideo(file.data, vidLoad)
  video.hide()
  poseNet = ml5.poseNet(video,modelReady);  
  poseNet.on('pose', gotResult);
  console.log("posenet excute")
}*/

function vidLoad(){
  video.loop()
  video.volume(0)
  console.log("video ON")
}

function modelReady(){
  console.log('model OK');
}

/*function gotResult(results){
  console.log("results = "+results)
  poses = results[0].pose.keypoints;
  skeletons = results[0].skeleton;
}*/
function drawKeypoints(){
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 5; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
         noStroke();
        fill(255, 0, 0);
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}
function drawSkeleton(){
    // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
function draw(){
  //imageMode(CORNER)
  if(video){
    image(video,0,0,width,height);
    drawKeypoints()
    drawSkeleton()  
  }
  /*fill('#FFFF00');
  stroke('#FF0000');
  strokeWeight(3);
  for(let i = 5; i < poses.length; i++){
    keypointX[i]=round(poses[i].position.x);
    keypointY[i]=round(poses[i].position.y);
    ellipse(keypointX[i], keypointY[i],10);
  }
  stroke('#FFFF00');
  strokeWeight(2);
  for(let i=0; i< skeletons.length; i++){
    line(round(skeletons[i][0].position.x), round(skeletons[i][0].position.y), round(skeletons[i][1].position.x), round(skeletons[i][1].position.y));
  }*/
