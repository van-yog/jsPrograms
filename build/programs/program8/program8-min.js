"use strict";let cvs=document.querySelector("#canvas"),ctx=cvs.getContext("2d"),bird=new Image,bg=new Image,fg=new Image,pipeUp=new Image,pipeBottom=new Image;bird.src="./src/img/bird.png",bg.src="./src/img/bg.png",fg.src="./src/img/fg.png",pipeUp.src="./src/img/pipeUp.png",pipeBottom.src="./src/img/pipeBottom.png";let xPos=10,yPos=150,grav=1,fly=new Audio,score_audio=new Audio;fly.src="./src/audio/fly.mp3",score_audio.src="./src/audio/score.mp3";let gap=130;document.addEventListener("click",moveUp);let score=0,pipe=[];function moveUp(){console.log("blin"),yPos-=30,fly.play()}function draw(){ctx.drawImage(bg,0,0);for(let e=0;e<pipe.length;e++)ctx.drawImage(pipeUp,pipe[e].x,pipe[e].y),ctx.drawImage(pipeBottom,pipe[e].x,pipe[e].y+pipeUp.height+gap),pipe[e].x--,125==pipe[e].x&&pipe.push({x:cvs.width,y:Math.floor(Math.random()*pipeUp.height)-pipeUp.height}),xPos+bird.width>=pipe[e].x&&xPos<=pipe[e].x+pipeUp.width&&(yPos<=pipe[e].y+pipeUp.height||yPos+bird.height>=pipe[e].y+pipeUp.height+gap)&&(alert("Crash"),location.reload()),yPos+bird.height>=cvs.height-fg.height&&(console.log("Проверка на достижения дна"),location.reload()),pipe[e].x+pipeUp.width==5&&(score++,score_audio.play());ctx.drawImage(fg,0,cvs.height-fg.height),ctx.drawImage(bird,xPos,yPos),yPos+=grav,ctx.fillStyle="#000",ctx.font="24px Verdana",ctx.fillText("Score: "+score,10,cvs.height-20),requestAnimationFrame(draw)}pipe[0]={x:cvs.width,y:0},pipeBottom.onload=draw;