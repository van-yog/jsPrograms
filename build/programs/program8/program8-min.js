"use strict";let isPause,interval,speed,scoreGame,cvs=document.querySelector("#canvas"),ctx=cvs.getContext("2d"),btnStartStop=document.querySelector("#btnStartStop"),btnNewGame=document.querySelector("#btnNewGame"),player={},player1={},counter=0,spaceShip=new Image,spaceShip1=new Image,bgSpace=new Image,crashLine=new Image,blockUp=new Image,blockDown=new Image,life=new Image,block=[],saturn=new Image,earth=new Image,moon=new Image,star=new Image,asteroid=new Image,coin=new Image,imagesLoad=0,planet=[],coins=[],allPlanets=[saturn,earth,moon,star,asteroid],fly=new Audio,scoreAudio=new Audio,gameOver=new Audio,congratulations=new Audio,backgroundMusic=new Audio,beepStart=new Audio;function newGame(){localStorage.setItem("lifes",3),localStorage.setItem("sumScore","0"),isPause=!0,location.reload()}function drawStatistic(){ctx.drawImage(crashLine,0,cvs.height-crashLine.height);let e=10,a=cvs.height-50,t=Number(localStorage.getItem("lifes"));for(let c=0;c<t;c++)ctx.drawImage(life,e,a),e+=50;let c=Number(localStorage.getItem("sumScore")),r=Number(localStorage.getItem("record"));ctx.fillStyle="#ffd",ctx.font="20px Verdana",ctx.fillText("Record:"+r,cvs.width-130,cvs.height-80),ctx.fillText("Sum: "+c,cvs.width-130,cvs.height-50),ctx.fillText("Score: "+scoreGame,cvs.width-130,cvs.height-20)}function startGame(){counter||beepStart.play(),drawBackground(),drawPlanets(),drawCoins(),checkCrash(),checkCoinsTouch(),drawBlocks(),drawPlayer(),drawStatistic(),isPause||(backgroundMusic.play(),requestAnimationFrame(startGame))}function drawPlayer(){ctx.drawImage(spaceShip,player.x,player.y++)}function drawBackground(){ctx.drawImage(bgSpace,0,0)}function newY(){return Math.round(Math.random()*(cvs.height-crashLine.height-50))}function newX(){return cvs.width+Math.round(Math.random()*cvs.width)}function randomNamePlanet(){let e=Math.round(4*Math.random());return allPlanets[e]}function drawCoins(){for(let e=0;e<coins.length;e++)coins[e].x>-60?ctx.drawImage(coin,coins[e].x--,coins[e].y):(coins[e].y=newY(),coins[e].x=Math.round(Math.random()*cvs.width))}function drawPlanets(){counter++;for(let e=0;e<planet.length;e++)planet[e].x>-60?1==planet[e].speed&&counter%2?ctx.drawImage(planet[e].name,planet[e].x,planet[e].y):2==planet[e].speed&&counter%3?ctx.drawImage(planet[e].name,planet[e].x,planet[e].y):ctx.drawImage(planet[e].name,planet[e].x--,planet[e].y):(planet[e].y=newY(),planet[e].x=cvs.width+10,planet[e].name=randomNamePlanet())}function drawBlocks(){for(let e=0;e<block.length;e++)if(block[e].x+blockUp.width>=0){let a=block[e].y+blockUp.height+interval;ctx.drawImage(blockUp,block[e].x,block[e].y),ctx.drawImage(blockDown,block[e].x,a),block[e].x-=speed}else block[e].y=Math.floor(Math.random()*blockUp.height)-blockUp.height,block[e].x=cvs.width+60,scoreGame>10&&(speed=2),scoreGame>18&&(speed=3),scoreGame>26&&(speed=4),scoreGame>35&&(speed=5)}function checkCrash(){(isTouchBlock()||isFall())&&endOfLife()}function isFall(){if(player.y+spaceShip.height>=cvs.height-crashLine.height)return!0}function checkCoinsTouch(){for(let e=0;e<coins.length;e++){let a=Math.abs(coins[e].x-player.x),t=Math.abs(coins[e].y-player.y),c=coin.width;if(a<c&&t<c){scoreGame++;let a=Number(localStorage.getItem("sumScore"))+1;localStorage.setItem("sumScore",a),scoreAudio.play(),coins[e].y=newY(),coins[e].x=cvs.width/2+Math.round(Math.random()*cvs.width)}}}function isTouchBlock(){for(let e=0;e<block.length;e++){let a=block[e].x,t=block[e].y,c=player.x+spaceShip.width>=a,r=player.x<=a+blockUp.width;if(c&&r&&(player.y<=t+blockUp.height||player.y+spaceShip.height>=t+blockUp.height+interval))return!0}}function endOfLife(){backgroundMusic.pause();let e=Number(localStorage.getItem("lifes"))-1;console.log("Lifes :",e),localStorage.setItem("lifes",e),0===e&&(gameOver.play().then(()=>alert("Game Over")),checkRecord(),newGame()),isPause=!0,location.reload()}function setStartProperties(){isPause=!0,localStorage.lifes||localStorage.setItem("lifes",3),localStorage.record||localStorage.setItem("record",0),localStorage.sumScore||localStorage.setItem("sumScore",0),console.log(localStorage),spaceShip1.src="./src/img/spaceship1.png",spaceShip.src="./src/img/spaceship.png",bgSpace.src="./src/img/bgSpaceXXL.png",crashLine.src="./src/img/crashLineXXL.png",blockUp.src="./src/img/blockUp.png",blockDown.src="./src/img/blockDown.png",life.src="./src/img/life.png",saturn.src="./src/img/saturn.png",earth.src="./src/img/earth.png",moon.src="./src/img/moon.png",star.src="./src/img/star1.png",asteroid.src="./src/img/asteroid.png",coin.src="./src/img/coin.png",createPlanet(),createPlanet(2),createPlanet(3),createCoin(),createCoin(),createCoin(),createCoin(),createCoin(),createCoin(),createCoin(),createBlock(),createBlock(Math.round(2*cvs.width/3)),player={x:100,y:150},player1={x:100,y:200},fly.src="./src/audio/rocket.mp3",scoreAudio.src="./src/audio/score.mp3",backgroundMusic.src="./src/audio/backgroundMusic.mp3",congratulations.src="./src/audio/congratulations.mp3",gameOver.src="./src/audio/gameOver.mp3",beepStart.src="./src/audio/beepStart.mp3",interval=140,speed=1,scoreGame=0,drawBackground(),bgSpace.onload=drawBackground,setTimeout(drawPlayer,500),crashLine.onload=drawStatistic}function createCoin(){coins.push({x:Math.round(Math.random()*cvs.width),y:newY()})}function createPlanet(e=1){planet.push({x:newX(),y:newY(),speed:e,name:randomNamePlanet()})}function createBlock(e=0){block.push({x:cvs.width+e,y:Math.floor(Math.random()*blockUp.height)-blockUp.height})}function moveUp(){isPause||(player.y-=15,fly.play())}function checkRecord(){let e=Number(localStorage.getItem("record")),a=Number(localStorage.getItem("sumScore"));e<a&&(congratulations.play(),alert(`Congratulations! New record : ${a}`),localStorage.setItem("record",a))}function movePlayer(e){let a=e.code;e.preventDefault(),console.log(e),isPause||("KeyD"!==a&&"ArrowRight"!==a||(player.x+=20),"KeyA"!==a&&"ArrowLeft"!==a||(player.x-=20),"KeyS"!==a&&"ArrowDown"!==a||(player.y+=15),"KeyW"!==a&&"ArrowUp"!==a||(player.y-=25,fly.play()),checkBorders())}function checkBorders(){player.x+spaceShip.width>=cvs.width&&(player.x=cvs.width-spaceShip.width),player.x<=0&&(player.x=0),player.y<=0&&(player.y=0)}setStartProperties(),btnStartStop.addEventListener("click",()=>{let e=btnStartStop.innerText;isPause="Pause"===e,btnStartStop.innerText="Pause"===e?"Play":"Pause",startGame()}),btnNewGame.addEventListener("click",newGame),cvs.addEventListener("click",moveUp),document.body.addEventListener("keydown",e=>movePlayer(e));