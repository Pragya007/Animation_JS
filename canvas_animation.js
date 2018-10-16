var interval = null;
window.onload = function(){
    doSetup();
    doDraw();
    interval = window.setInterval(doDraw,25);
    document.getElementById("stop").onclick = function(){ window.clearInterval(interval);};
}
var canvas = null;
var context = null;
var ball_radius = 10;
var ball_x=0;
var ball_y = 0;
var x_velocity = 1;
var y_velocity = 1;
var target_x = -1;
var target_y = -1;
var target_size = 2*ball_radius;
function doSetup(){
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    canvas.height = 100;
    canvas.width =120;
    target_x = canvas.width/2;
    target_y = canvas.height/2;
}

var doDraw = function(){
    context.fillStyle = 'lightblue';
    context.fillRect(0,0,canvas.width,canvas.height);
    moveBall();
    if(eclipse())
{
    context.strokeStyle='yellow';
    context.fillStyle='yellow';}
    else{
    context.strokeStyle = 'green';
    context.fillStyle = 'green';}
    context.fillRect(target_x-target_size/2,target_y-target_size/2,target_size,target_size);
    paintBall();
}

function paintBall(){
    context.beginPath();
    context.arc(ball_x+ball_radius,ball_y+ball_radius,ball_radius,0,6.283185307179586,false);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}
function moveBall(){
    ball_x = ball_x + x_velocity;
    ball_y = ball_y + y_velocity;
    
    var max_x = canvas.width - 2*ball_radius;
     var max_y = canvas.height - 2*ball_radius;
    
    if(ball_x>max_x){
        ball_x = max_x - (ball_x-max_x);
        x_velocity=-1;
    }else if(ball_x<0){
        ball_x = -1*ball_x;
        x_velocity=1;
    }
    
    if(ball_y>max_y){
        ball_y=max_y-(ball_y-max_y);
        y_velocity=-1;
    }else if(ball_y<0){
        ball_y=-1*ball_y;
        y_velocity=1;
    }
}
function eclipse(){
    var x_diff = Math.abs(target_x-(ball_x+ball_radius));
    var y_diff = Math.abs(target_y-(ball_y+ball_radius));
    if(x_diff<=ball_radius*2 && y_diff<=ball_radius*2){
        return true;
    }else{
        return false;
    }
}
