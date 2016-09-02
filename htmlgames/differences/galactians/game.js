
/*
	Galactians
	(C) Mark Wilcox 
	More games at www.spacemonsters.co.uk
	
	IE6,7,8 Modded by pf
*/

var isMSIE = navigator.userAgent.match("MSIE");

var GAMETITLE = "GALACTIANS";
var SCOREFONT = "Arial, Sans-Serif";
var IPHONEHACK = true;
var ISPORTRAIT = true;

var g = {}; 
g.go = 0;

var m = { 
	spritesheets : [],
	player : null,
	explosion : [],
	lasers : [],
	aliens : [],
	alienbomb : [],
	textsprites : []
};

var stars = [];
var gameaudio = []; 

g.checkSum = gamedata.imageFiles.length;// + gamedata.audioFiles.length; 
g.checkCount = 0;
g.imageData = [];
g.audioData = [];
g.aliensarray = [];

g.colours = [];
g.colours[0] = "#bf0000";
g.colours[1] = "#4386d0";
g.colours[2] = "#28d98c";
g.colours[3] = "#3de231";
g.colours[4] = "#d8e231";
g.colours[5] = "#feba4f";
g.colours[6] = "#fe5b4f";
g.colours[7] = "#fe4fd7";
g.colours[8] = "#ca4ffe";

max_stars = (isMSIE)?0:15;

function createStars()
{
	for (var a=0;a<max_stars;a++) 
	{ 
		stars[a] = new star("star"+a, rnd(g.canvaswidth), rnd(g.canvasheight), 4, rnd(2)+1, 4, g.colours[rnd(g.colours.length)-1]); 
	}
}

function createSprites()
{

		// Load game media
		for (var a=0;a<imglib.length;a++)
		{
			m.spritesheets[imglib[a].sheetname] = new spritesheet(imglib[a]);
			
		}
		
		g.titlescreen		= new Image();	g.titlescreen.src	= g.imageData[0].src; 
		g.titleback		= new Image();	g.titleback.src		= g.imageData[1].src; 
		g.gameback		= new Image();	g.gameback.src		= "gameback.png"; ///
		g.playpause		= new Image();	g.playpause.src		= "playpause.png"; ///
		g.splash		= new Image();	g.splash.src		= "splash.png"; ///
		
		//g.volumecontrol = new Image(); g.volumecontrol.src = "volumecontrols.png"; ///

		// STANDARD SPRITES
		m.player = new sprite("player", "player", m.spritesheets["playersheet"], 0, 0, 16, 4, 1);

		// SPRITE POTS
		for (var a=0;a<6;a++) m.alienbomb[a] = new sprite("alienbomb"+a, "alienbomb", m.spritesheets["alienbombsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<40;a++) m.aliens[a] = new sprite("aliens"+a, "alien", m.spritesheets["aliensheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<8;a++) m.explosion[a] = new sprite("explosion"+a, "explosion", m.spritesheets["explosionsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<6;a++) m.lasers[a] = new laser("laser"+a, 2, 16, "255,255,255", 16);
		for (var a=0;a<40;a++) m.textsprites[a] = new textsprite("textsprite"+a,-32,-32,"",0.1);

		// SET UP THE TOUCH SCREEN
		initTouch();

		// SET UP THE GAME START
		initHiScore();
		setSplash();

		// TICKER
		g.ticker = setTimeout("loop()", 0);
		

}

function rnd(threshold)
{
	return Math.floor(Math.random()*threshold) + 1;
}

function preCache() {

	for (var a=0;a<gamedata.imageFiles.length;a++)
	{
		g.imageData[a] = new Image();
		g.imageData[a].src = gamedata.imageFiles[a];
		//g.imageData[a].onload = check;
	}
	createSprites();

}

function check() {

		g.checkCount++;
		var pc = Math.round((g.checkCount / g.checkSum) * 100);
		var bar = Math.round(g.canvaswidth * (pc / 100));
		g.ctx.clearRect(140,150,32,16);
		g.ctx.fillStyle = "rgb(16,16,16)";
		g.ctx.fillRect(0,200,g.canvaswidth,16);
		g.ctx.fillStyle = "rgb(80,80,80)";
		g.ctx.fillRect(0,200,bar,16);
		
		if ( (g.checkCount >= g.checkSum) )
		{
			createSprites();
		}

}


function rnd(threshold)
{
	return Math.floor(Math.random()*threshold) + 1;
}

function init()
{

		if(isMSIE){
		    g.canvas = document.getElementById("gameSurface");
		    G_vmlCanvasManager.initElement(g.canvas);
		}else{
		    g.canvas = document.querySelector('canvas');
		}		
		
		g.ctx = g.canvas.getContext('2d');
		g.canvas.setAttribute('class', 'canvas');

		g.ori = 0;
		g.scale = 1;

		setResolution();
		setCanvasDimensions();
		g.canvas.style.backgroundColor = "#000";

		g.nextthink = 0;

		BrowserDetect.init();

		var br = new String(BrowserDetect.OS);
		g.framedelay = (isMSIE)?0:30;
		g.ISIPHONE = false;
		if (br.indexOf("iPhone") != -1)
		{
			//if (IPHONEHACK) { g.framedelay = 0; }
			g.ISIPHONE = true;
		}

		g.nextthink = 0;

		window.scrollTo(0,0);

		g.pausemode = 0;
		g.audiomode = 1;

		createStars();
		preCache();

}

function setResolution()
{
	var w = 0;
	var h = 0;

	if(document.all){
		h = document.body.offsetHeight;
		w = document.body.offsetWidth;
	}
	else
	{
		h = innerHeight;
		w = innerWidth;
	}
	
	g.canvaswidth = 320;
	g.canvasheight = 480;
	g.scale = 1;

	/*
	// avoid splitting integers
	if (w % 2 > 0) w ++;
	if (h % 2 > 0) h ++;

	// force resolution on larger devices
	if (w > 320) 
	{
		if (w >= 480 && h >= 640)
		{
			g.canvaswidth = 480;
			g.canvasheight = 640;
			g.scale = 1.5;
		} else {
			if (w <= (g.canvaswidth * 1.5) && h <= (g.canvasheight * 1.5))
			{ // stretch to full screen - dimension acceptable
				g.canvaswidth = w;
				g.canvasheight = h;
				g.scale = 1.25;
			}
		}
	}
	*/
}

function setCanvasDimensions(e)
{
	g.canvaspadding = 32;
	g.displaypadding = 0;
	if (typeof(window.orientation)!="undefined")
	{
		g.ori = window.orientation; // 0, -90 or 90
	}

	g.canvas.width = g.canvaswidth;
	g.canvas.height = g.canvasheight;

	g.textcentre = g.canvaswidth / 2;
	g.canvascentre = g.canvasheight / 2;

	window.scrollTo(0,1);
}

function initTouch()
{
	if(checkForTouch()) {
		if (document.body.addEventListener)
		{
			document.body.addEventListener('touchmove', touchMove, false);
			document.body.addEventListener('touchstart', touchStart, false);
			document.body.addEventListener('touchend', touchEnd, false);
		} else {
			window.addEventListener('touchmove', touchMove, false);
			window.addEventListener('touchstart', touchStart, false);
			window.addEventListener('touchend', touchEnd, false);
		}
	} else {
		if(isMSIE){
			document.body.attachEvent('onmousemove', mouseMove);
			document.body.attachEvent('onmouseup', mouseUp);
		
		}else{
			window.addEventListener('mousemove', mouseMove, false);
			window.addEventListener('mouseup', mouseUp, false);
		}
	}
}

function initHiScore()
{
	try{
		if (typeof localStorage.key == "function")
		{
			if (localStorage.getItem(GAMETITLE + "-hiscore") != null)
			{
				m.player.hiscore = localStorage.getItem(GAMETITLE + "-hiscore");
			} else {
				m.player.hiscore = 0;
			}
		}
	}catch(e){}
}

function sfx(o)
{
}

function handleAudio()
{
}

function checkForTouch() {
	if(isMSIE)return false;
	var d = document.createElement("div");
	d.setAttribute("ontouchmove", "return;");
	return typeof d.ontouchmove == "function" ? true : false;
}

function touch(event) {
	if (g.mode == "title") setGame();
	var o = m.player;
	
	//if MSIE...
	if(document.all){
		var tx = (event.x - (g.canvas.offsetParent ? g.canvas.parentNode.offsetLeft : 0)) - (o.w / 2);
		var ty = (event.y - (g.canvas.offsetParent ? g.canvas.parentNode.offsetTop : 0)) - (o.h / 2);
	
	}else{
		var tx = (event.pageX - (g.canvas.offsetParent ? g.canvas.parentNode.offsetLeft : 0)) - (o.w / 2);
		var ty = (event.pageY - (g.canvas.offsetParent ? g.canvas.parentNode.offsetTop : 0)) - (o.h / 2);
	}
	
	if (g.pausemode < 1)
	{
		o.x = tx;
	}

	if (tx < 64 && ty < 64) 
	{
		g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0;
	}

	if (o.x > (g.canvaswidth - o.w)) m.player.x = g.canvaswidth - o.w;
	if (o.x < 0) o.x = 0;
}

function touchStart(event) { 
	touch(event.touches[0]);
}

function touchMove(event) {
	touch(event.touches[0]);
	window.scrollTo(0, 1);
	event.preventDefault();
}

function touchEnd(event) {
	touch(event.touches[0]);
}

function mouseMove(event) {
	if (g.mode != "title") touch(event);
}

function mouseUp(event) {
	touch(event);
}

function setSplash()
{
	g.mode = "splash";
	g.resetting = (isMSIE)?50:100;
}

function setTitle()
{
	g.mode = "title";
	g.canvas.style.backgroundImage = "none";
	g.canvas.style.backgroundColor = "#000000";
	g.stage = 0; 
}

function setGame()
{

	g.mode = "pregame";
	g.resetting = (isMSIE)?100:200;
	g.time = new Date();
	m.player.score = 0;
	m.player.targetscore = 0;
	m.player.lives = 3;
	g.level = 1;
	g.displaylevel = 1;
	g.resetting = (isMSIE)?60:120;
	g.bonuspoints = 0;
	g.lasercooldown = 0;
	g.alienbombcooldown = 0;
	g.wavetype = 1;
	g.bonuslife1 = false; // 100,000
	g.bonuslife2 = false; // 500,000
	g.canvas.style.backgroundImage = "none";
	g.canvas.style.backgroundColor = "#000000";
	setLevel(); 
	playerStart();
}

function setLevel()
{
	wipe(true);
	m.player.dying = false;
	m.player.visible = true;
	setStars();
	g.aliensarray.splice(0,g.aliensarray.length);
	setAliens();
	g.shotsfired = 0;
	g.hitratio = 0;
}

function setStars()
{
	for (var a=0;a<stars.length;a++) 
	{ 
		stars[a].x = rnd(g.canvaswidth);
		stars[a].y = rnd(g.canvasheight); 
		stars[a].speed = stars[a].basespeed;
	}
}

function setLandscape()
{
	g.oldmode = g.mode;
	g.mode = "landscape";
}

function playerStart()
{
	m.player.x = g.canvaswidth / 2 - (m.player.w / 2);
	m.player.y = g.canvasheight - 120;
	m.player.targetx = m.player.x + (m.player.w / 2);
	m.player.targety = g.canvasheight - 128;
	m.player.basey = g.canvasheight - 128;
}

function wipe(doentities)
{
	for (var a=0;a<m.alienbomb.length;a++) kill(m.alienbomb[a]);
	for (var a=0;a<m.aliens.length;a++) kill(m.aliens[a]);
	for (var a=0;a<m.explosion.length;a++) kill(m.explosion[a]);
	for (var a=0;a<m.lasers.length;a++) kill(m.lasers[a]);
	for (var a=0;a<m.textsprites.length;a++) kill(m.textsprites[a]); 
}

function kill(o)
{
	o.visible = false;
}

function playerDeath()
{
	for (var a=0;a<m.lasers.length;a++) { kill(m.lasers[a]); }
	for (var a=0;a<m.alienbomb.length;a++) { kill(m.alienbomb[a]); }
	if (m.player.dying) return;
	spawnExplosion(m.player,0,1);
	m.player.dying = true;
	kill(m.player);
	m.player.lives --;
	g.resetting = (isMSIE)?15:30;
}

function drawPlayer(o)
{

	if (!o.visible) return;
		if (isNaN(o.attacking)) o.attacking = 0;
		if (o.attacking > 0)
		{
			o.attacking --;
			o.frame = o.spritesheet.attackframe;
		} else {
			g.ctx.save();
			if (o.spinning > 0)
			{
				o.angle += 32; if (o.angle > 360) o.angle = 0;
				g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
				g.ctx.rotate(o.angle * (Math.PI / 180));
				g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, 0, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h); // pf
				o.spinning --;
				if (o.spinning < 1)
				{
					g.roadspeed = g.roadspeedmax;
				}
			} else {
				if (isNaN(o.frame)) o.frame = o.startframe;
				o.framedelay --;
				if (o.framedelay < 0)
				{
					o.framedelay = o.framedelaymax;
					o.frame ++;
					if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
					{
						o.frame = o.startframe;
					}
					if (o.magicpower > 0 && o.magicpower < 50)
					{
						o.row ++; if (o.row > 1) o.row = 0;
					}
				}
				if (o.inpain) { o.frame = o.spritesheet.painframe; o.inpain = false; }

				o.angle = 0;
				g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
				g.ctx.rotate(o.angle * (Math.PI / 180));
				
				if (!o.dying) g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h); // pf
			}
			g.ctx.restore();
		}

}

function drawStar(o)
{
		g.ctx.fillStyle = o.colour;
		if (g.mode == "game")
		{
			o.size = g.hyperdrive > 0 ? o.basesize * 4 : o.basesize;
		} else if (g.mode == "endlevel")
		{
			if (g.resetting <= (g.warplength / 2))
			{
				o.size -= 0.5;
			} else {
				o.size += 0.5;
			}
		} else if (g.mode == "endgame")
		{
			g.ctx.fillStyle = rnd(10) < 5 ? "#4362b2" : "#365298";
			o.size = 64;
			o.direction = 0;
		}
		g.ctx.fillRect(o.x,o.y,2,o.size);
}

function moveStar(o)
{

	if (g.mode == "game")
	{
		o.speed = g.hyperdrive > 0 ? o.basespeed * 8 : o.basespeed;
	} else if (g.mode == "endlevel")
	{
		if (g.resetting <= (g.warplength / 2))
		{
			o.speed -= 0.5;
		} else {
			o.speed += 0.5;
		}
	} else if (g.mode == "endgame")
	{
		o.speed = o.basespeed + 16;
	}
	switch (o.direction)
	{
	case 0:
		o.y -= o.speed;
		break;			
	case 1:
		o.y -= (o.speed / 1.5);
		o.x += (o.speed / 1.5);
		break;			
	case 2:
		o.x += o.speed;
		break;			
	case 3:
		o.y += (o.speed / 1.5);
		o.x += (o.speed / 1.5);
		break;			
	case 4:
		o.y += o.speed;
		break;			
	case 5:
		o.y += (o.speed / 1.5);
		o.x -= (o.speed / 1.5);
		break;			
	case 6:
		o.x -= o.speed;
		break;			
	case 7:
		o.y -= (o.speed / 1.5);
		o.x -= (o.speed / 1.5);
		break;			
	}

		if ((o.x + o.w) < 0) o.x = o.canvaswidth;
		if (o.x > g.canvaswidth) o.x = (o.size * -1); 
		if ((o.y + o.size) < 0) o.y = g.canvasheight; 
		if (o.y > g.canvasheight) o.y = o.size * -1;
}


function draw(o)
{
	if (!o.visible) return;

		if (isNaN(o.attacking)) o.attacking = 0;
		if (o.attacking > 0)
		{
			o.attacking --;
			o.frame = o.spritesheet.attackframe;
		} else if (!o.diving) {
			if (isNaN(o.frame)) o.frame = o.startframe;
			o.framedelay --;
			if (o.framedelay < 0)
			{
				o.framedelay = o.framedelaymax;
				o.frame ++;
				if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
				{
					if (o.spritesheet.type == "explosion")
					{
						kill(o);
					} else {
						o.frame = o.startframe;
					}
				}
			}
			if (o.inpain) { o.frame = o.spritesheet.painframe; o.inpain = false; }
		} else {
			o.frame = 0;
		}
		g.ctx.save();
		if (o.diving)
		{
			var angle = 0;
			if (o.divestage == 1) angle = o.divedirection == 6 ? -45 : 45;
			if (o.divestage == 2) angle = o.divedirection == 6 ? 225 : 135;
			if (o.divestage == 3) angle = o.divedirection == 6 ? 165 : -165;
			g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
			g.ctx.rotate(angle * (Math.PI / 180));
			g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h); // pf
		} else {
			g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h); // pf
		}
		g.ctx.restore();

}

function moveLaser(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;
	o.y -= o.speed;
	if (o.y < (o.h * -1)) kill(o);
}

function drawLaser(o)
{

		if (!o.visible || o.dead || g.pausemode > 0) return;
		g.ctx.fillStyle = "rgb(" + o.color + ")";
		g.ctx.fillRect(o.x,o.y,o.w,o.h);
}

function moveToTarget(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;

	o.oldx = o.x;
	o.oldy = o.y;

	if (o.targetx < 0 && o.targety < 0)
	{
		switch (o.direction)
		{
		case 0:
			o.y -= o.speed;
			break;			
		case 1:
			o.y -= (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 2:
			o.x += o.speed;
			break;			
		case 3:
			o.y += (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 4:
			o.y += o.speed;
			break;			
		case 5:
			o.y += (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		case 6:
			o.x -= o.speed;
			break;			
		case 7:
			o.y -= (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		}
	} else {
		if (o.jumping)
		{
			if (o.y >= o.targety)
			{
				if (!o.bounced)
				{
					o.bounced = true;
					o.y = o.y - 8;
					o.speed = -8;
				} else {
					o.speed = o.basespeed;
					o.jumping = false;
				}
			}
			if (o.dying > 0)
			{
				if (o.targetx > o.x) { o.x += o.speed; }
				if (o.targetx < o.x) { o.x -= o.speed; }
				if (o.targety < o.y) { o.y -= o.speed; }
				if (o.targety > o.y) { o.y += o.speed; }
				if (o.y < 0)
				{
					kill(o);
				}
			}
			if (o.bounced) o.speed += 2;
			if (o.y < o.targety) { o.y += o.speed; }
		} else {
			if (o.divestage == 4 && o.diving)
			{
				var thresh = 1;
				if ((Math.round(o.x) >= Math.round(o.targetx) - thresh) 
					&& 
					(Math.round(o.x) <= Math.round(o.targetx) + o.w + thresh) 
					&& 
					(Math.round(o.y) >= Math.round(o.targety) - thresh)
					&& 
					(Math.round(o.y) <= Math.round(o.targety) + o.h + thresh)
					)
				{
					o.divestage = 0;
					o.diving = false;
					o.speed = o.basespeed;
					g.divingaliens --;
				} else {
					if (o.targetx > o.x) { o.x += o.speed; }
					if (o.targetx < o.x) { o.x -= o.speed; }
					if (o.targety < o.y) { o.y -= o.speed; }
					if (o.targety > o.y) { o.y += o.speed; }
				}
			} else {
				// Target co-ords set by screen touch.
				if (o.targetx > o.x) { o.x += o.speed; }
				if (o.targetx < o.x) { o.x -= o.speed; }
				if (o.targety < o.y) { o.y -= o.speed; }
				if (o.targety > o.y) { o.y += o.speed; }
			}
		}
	}
	if (o.dying < 1)
	{
		if (o.x < g.canvaspadding) o.x = g.canvaspadding;
		if ((o.x + o.w) > (g.canvaswidth - g.canvaspadding)) o.x = g.canvaswidth - g.canvaspadding - o.w;
		if (o.y < g.canvaspadding) o.y = g.canvaspadding;
		if ((o.y + o.h) > (g.canvasheight - g.canvaspadding)) o.y = g.canvasheight - g.canvaspadding - o.h;
	}
}


function setAliens()
{

	g.levelaliens = 0;
	g.alienskilled = 0;
	g.maxdivingaliens = (g.level); if (g.maxdivingaliens > 4) g.maxdivingaliens = 4;
	g.divingaliens = 0;

	var c = 0;
	var r = 0;

	g.level ++;
	if (g.level > 12) g.level = 12;

	for (var row=0;row<4;row++)
	{
		for (var a=0;a<4;a++)
		{
			var x = ((g.canvaswidth / 2) - 112) + (a * 64);
			var y = 64 + (row * 24); 
			var d = 4;
			var s = 0.5;
			var f = 0;
			var ty = -1;
			var hp = 1;
			if (!(row == 0 && (a== 0 || a == 3)))
			{
				spawnAlien(x,y,d,s,hp,r);
				g.levelaliens ++;
			}
			c ++;
		}
		r ++; if (r > 3) r = 0;
	}
}

function resetAliens()
{
	g.divingaliens = 0;
	for (var a=0;a<g.aliensarray.length;a++)
	{
		var o = g.aliensarray[a];
		if (!o.killed)
		{
			o.visible = true;
			o.x = o.originx;
			o.y = o.originy;
			o.diving = false;
			o.speed = o.basespeed;
			o.direction = 4;
		}
	}
}

function move(o)
{
	if (!o.visible || g.pausemode > 0) return;

	var bomb = o.spritesheet.type == "alienbomb" ? true : false;

	switch (o.direction)
	{
	case 0:
		o.y -= o.speed;
		break;			
	case 1:
		o.y -= (o.speed / 1.5);
		o.x += (o.speed / 1.5);
		break;			
	case 2:
		o.x += o.speed;
		break;			
	case 3:
		o.y += (o.speed / 1.5);
		o.x += (o.speed / 1.5);
		break;			
	case 4:
		o.x += bomb ? o.xmod : o.speed;
		o.y += o.speed;
		break;			
	case 5:
		o.y += (o.speed / 1.5);
		o.x -= (o.speed / 1.5);
		break;			
	case 6:
		o.x -= o.speed;
		break;			
	case 7:
		o.y -= (o.speed / 1.5);
		o.x -= (o.speed / 1.5);
		break;			
	}
	if (bomb)
	{
		if (o.y > (g.canvasheight - 70))
		{
			kill(o);
		}
	}
}

function moveAlien(o)
{
	if (!o.visible || g.pausemode > 0) return;

	if (!o.diving)
	{
		o.nextthink --;
		if (o.nextthink < 1)
		{
			o.nextthink = o.basenextthink;
			changeDirection(o);
		}

		switch (o.direction)
		{
		case 0:
			o.y -= o.speed;
			break;			
		case 1:
			o.y -= (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 2:
			o.x += o.speed;
			break;			
		case 3:
			o.y += (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 4:
			o.y += o.speed;
			break;			
		case 5:
			o.y += (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		case 6:
			o.x -= o.speed;
			break;			
		case 7:
			o.y -= (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		}
	} else {
		// Diving alien

		if (o.divestage == 1)
		{
			o.steps ++;
			if (o.steps > 4) 
			{ 
				o.divestage = 2; 
				o.steps = 0; 
			}
			o.y -= o.speed;
			o.x += o.divedirection == 6 ? o.speed * -1 : o.speed; 
		}

		if (o.divestage == 2)
		{
			o.steps ++;
			if (o.steps > 4) 
			{ 
				o.divestage = 3; 
				o.steps = 0; 
				o.speed = 2 + rnd(2);
				o.xmod = o.divedirection == 6 ? 4 : -4;
				o.ymod = rnd(3);
			}
			o.y += o.speed;
			o.x += o.divedirection == 6 ? o.speed * -1 : o.speed; 
		}

		if (o.divestage == 3)
		{
			o.xmod -= 0.1;
			o.ymod -= 0.1; if (o.ymod < 1) o.ymod = 1;
			o.y += o.speed + o.ymod;
			o.x += o.xmod;
			if (o.y > g.canvasheight)
			{
				o.x = g.canvaswidth / 2 - (o.w / 2);
				o.y = o.h * -1;
				o.targetx = Math.round(o.storedx);
				o.targety = Math.round(o.storedy);
				o.speed = 2;
				o.divestage = 4;
			}
		}

		if (o.divestage == 4)
		{
			moveToTarget(o);
		}

		//o.x = Math.round(o.x);
		//o.y = Math.round(o.y);

	}

}

function spawnDive(o)
{
	var x = (g.levelaliens + 1) - (g.levelaliens - g.alienskilled);

	if (rnd(100) > (x * 4) || !o.visible || o.diving || (g.divingaliens >= g.maxdivingaliens) || g.mode != "game") return;
	g.divingaliens ++;
	o.diving = true;
	o.divestage = 1;
	o.direction = 4;
	o.divedirection = o.x < (g.canvaswidth / 2) ? 6 : 2;
	o.inc = 0;
	o.speed = 2;
	o.storedx = o.x;
	o.storedy = o.y;
	o.steps = 0;
	o.turned = false;
}


function changeDirection(o)
{
	switch (o.direction)
	{
	case 0:
		o.direction = 4;
	break;
	case 1:
		o.direction = 5;
	break;
	case 2:
		o.direction = 6;
	break;
	case 3:
		o.direction = 7;
	break;
	case 4:
		o.direction = 0;
	break;
	case 5:
		o.direction = 1;
	break;
	case 6:
		o.direction = 2;
	break;
	case 7:
		o.direction = 3;
	break;
	}
}


function entityCollision(o,m) 
{
	if (!o.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
	if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
	if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
	if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		switch(o.row) // Which entity ?
		{
			default:
				break;
		}
	}
}

function alienMissileCollision(o) 
{
	if (!o.visible || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	for (var z=0;z<m.aliens.length;z++)
	{
		var a = m.aliens[z];
		if (a.visible)
		{
			var mx = a.x;
			var my = a.y;
			var mw = a.w;
			var mh = a.h;

			var c1 = false, c2 = false, c3 = false, c4 = false;
			
			if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
			if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
			if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
			if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

			if (c1 == true || c2 == true || c3 == true || c4 == true)
			{
				a.hp -= o.damage;
				if (a.hp < 1)
				{
					kill(a);
					alienKill(a);
				}
				kill(o);
			}
		}
	}
}

function endLevel()
{
	g.hitratio = Math.round((g.levelaliens/g.shotsfired)*100);
	m.player.score += g.hitratio * 100;
	m.player.targetscore = m.player.score;
	g.mode = "levelup";
	g.resetting = (isMSIE)?45:90;
	g.starfighterbonus = 0;
	g.starfighterrank = "";
	if (g.hitratio > 40) { g.starfighterbonus = 2000; g.starfighterrank = textdata[11]; } 
	if (g.hitratio > 50) { g.starfighterbonus = 5000; g.starfighterrank = textdata[12]; } 
	if (g.hitratio > 55) { g.starfighterbonus = 10000; g.starfighterrank = textdata[13]; } 
	if (g.hitratio > 60) { g.starfighterbonus = 25000; g.starfighterrank = textdata[14]; } 
	m.player.score += g.starfighterbonus;
	m.player.targetscore = m.player.score;
}

function alienBonus(a)
{
	var bonus = 0;
	bonus = Math.round(a.y * 10);
	if (bonus > 3000)
	{
		spawnTextSpriteXY(a.x,a.y-24,textdata[5] + " " + textdata[6]);
		bonus = bonus * 5;
	} else if (bonus > 2500)
	{
		spawnTextSpriteXY(a.x,a.y-24,textdata[4] + " " + textdata[6]);
		bonus = bonus * 2;
	}
	m.player.score += bonus;
	m.player.targetscore = m.player.score;
	m.player.targetscore += 10;
}

function alienBombCollision(o,m) 
{
	if (!o.visible || !m.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 8; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		kill(o);
		playerDeath();
	}
}

function alienPlayerCollision(o,m) 
{
	if (!o.visible || !m.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 8; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		alienBonus(o);
		kill(o);
		alienKill(o);
		playerDeath();
	}
}

function alienKill(o)
{
	for (var a=0;a < g.aliensarray.length;a++)
	{
		var b = g.aliensarray[a];
		if (b == o)
		{
			b.killed = true;
			break;
		}
	}
	if (o.diving) 
	{
		g.divingaliens --;
	}
	alienBonus(o);
	spawnExplosionXY(o.x,o.y,0,1);
	g.alienskilled ++;
	if (g.alienskilled >= g.levelaliens)
	{
		endLevel();
	}
}

function writeText(t,x,y,s,f,r)
{
	if(isMSIE && r)return;
	var sx = x;
	var grid = {};
	grid.w = 10;
	grid.h = 16;
	var text = new String(t);	
	//text = text.toUpperCase();
	g.ctx.save();
	var ss = "";
	g.ctx.font = "normal "+(s*g.scale)+"px '"+f+"', Sans-Serif";
	g.ctx.textAlign = "center";
	g.ctx.fillStyle = "#ffffff";
	if (y > 260) // Starfighter bonus !
	{
		g.ctx.fillStyle = g.colours[rnd(g.colours.length-1)];
	}
	g.ctx.fillText(text, x,y+8);
	g.ctx.restore();
}

function drawTextSprite(o)
{
	if (!o.visible) return;
	var text = new String(o.text);	
	g.ctx.save();
	g.ctx.font = "normal " + (14*g.scale) + "px " + SCOREFONT;
	g.ctx.textAlign = "left";
	g.ctx.fillStyle = g.colours[rnd(g.colours.length)-1];
	g.ctx.fillText(text, o.x,o.y+8);
	g.ctx.restore();
}

function moveTextSprite(o)
{
	if (!o.visible) return;
	o.y -= o.speed;
	o.ticks --;
	if (o.ticks < 0) kill(o);
}


/** ---------------------------------------------------------------- **/
/** ---------------------------------------------------------------- **/

function loop()
{
		clearTimeout(g.ticker);
		g.ctx.save();
		g.ctx.clearRect(0, 0, g.canvaswidth, g.canvasheight);

		switch (g.mode)
		{
			case "splash":
				g.ctx.drawImage(g.splash,0,0);
				g.resetting --;
				if (g.resetting < 1) 
				{ 
					setTitle();
				}
			break;
			case "title":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				hiScore();
				g.ctx.drawImage(g.titlescreen,(g.canvaswidth/2)-160,0);
				writeText(textdata[1],g.textcentre,216,22,SCOREFONT);
			break;
			case "pregame":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				drawPlayer(m.player);
				g.resetting --;
				if (g.resetting < 1) 
				{ 
					g.mode = "game";
				}
				for (var a=0;a < m.aliens.length;a++)
				{
					moveAlien(m.aliens[a]);
					draw(m.aliens[a]);
				}
				writeText(textdata[0],g.textcentre,200,20,SCOREFONT);
				updateScore(isMSIE);
				playerLives();
			break;
			case "game":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				if (g.nextthink > 0) g.nextthink --;

				if (m.player.dying)
				{
					g.resetting --;
					if (g.resetting < 1)
					{
						if (m.player.lives < 1)
						{
							g.mode = "gameover";
							g.resetting = (isMSIE)?50:100;
							g.time = new Date() - g.time;
						} else {
							resetAliens();
							m.player.visible = true;
							m.player.dying = false;
							g.mode = "pregame";
							g.resetting = (isMSIE)?50:100;
						}
					}
				}

				drawPlayer(m.player);

				if (g.lasercooldown < 1)
				{
					spawnLaser(m.player.x + (m.player.w / 2) - 2, m.player.y - 8);
					g.lasercooldown = 12;
				} else {
					g.lasercooldown --;
				}

				g.alienbombcooldown --;
				if (g.alienbombcooldown < 1) g.alienbombcooldown = 6;

				for (var a=0;a < m.lasers.length;a++)
				{
					moveLaser(m.lasers[a]);
					drawLaser(m.lasers[a]);
					alienMissileCollision(m.lasers[a]);
				}
				for (var a=0;a < m.aliens.length;a++)
				{
					moveAlien(m.aliens[a]);
					draw(m.aliens[a]);
					spawnAlienBomb(m.aliens[a]);
					spawnDive(m.aliens[a]);
					alienPlayerCollision(m.aliens[a],m.player);
				}
				for (var a=0;a < m.explosion.length;a++)
				{
					move(m.explosion[a]);
					draw(m.explosion[a]);
				}
				for (var a=0;a<m.alienbomb.length;a++)
				{
					move(m.alienbomb[a]);
					draw(m.alienbomb[a]);
					alienBombCollision(m.alienbomb[a],m.player);
				}
				for (var a=0;a < m.textsprites.length;a++)
				{
					moveTextSprite(m.textsprites[a]);
					drawTextSprite(m.textsprites[a]);
				}

				updateScore(isMSIE);
				playerLives();
			break;

			case "landscape":
			break;
			case "levelup":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				g.resetting --;
				if (g.resetting < 1)
				{
					setLevel();
					playerStart();
					g.mode = "game";
				}
				writeText(textdata[7],g.textcentre,150,20,SCOREFONT);
				writeText(textdata[8] + g.shotsfired,g.textcentre,180,14,SCOREFONT);
				writeText(textdata[9] + g.hitratio+"%",g.textcentre,210,14,SCOREFONT);
				writeText(textdata[10] + (g.hitratio*100),g.textcentre,240,14,SCOREFONT);
				if (g.starfighterbonus > 0)
				{
					writeText(g.starfighterrank + " " + textdata[10] + " " + g.starfighterbonus,g.textcentre,270,14,SCOREFONT);
				}
				updateScore();
				playerLives();
				for (var a=0;a < m.textsprites.length;a++)
				{
					moveTextSprite(m.textsprites[a]);
					drawTextSprite(m.textsprites[a]);
				}
				drawPlayer(m.player);
			break;
			case "gameover":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				writeText(textdata[3],g.textcentre,200,20,SCOREFONT);
				g.resetting --;
				if (g.resetting < 1)
				{
					//postData();
					setTitle();
				}
				updateScore();
			break;
		}
		if (g.mode != "splash" && g.mode != "title") g.ctx.drawImage(g.playpause, g.pausemode * 32, 0, 32, 32, 8, 8, 32, 32);

		if (ISPORTRAIT && (g.ori != 0 && g.ori != 180) || !ISPORTRAIT && (g.ori != 90 && g.ori != -90))
		{
			g.ctx.fillStyle = "rgba(0,0,0,0.5)";
			g.ctx.fillRect(0,184,g.canvaswidth,40);
			writeText(textdata[2],g.textcentre - (ISPORTRAIT ? 0 : 80),200,16,SCOREFONT); 
			g.pausemode = 1;
		}

		g.ticker = setTimeout("loop()", g.framedelay);
		
		g.ctx.restore();
}

function playerLives()
{
	var o = m.player;
	for (var a=0;a<m.player.lives;a++)
	{
		g.ctx.drawImage(o.spritesheet.image, 0, 0, o.w, o.h, (g.canvaswidth-90)+(a * 18), 16, 16, 16); // pf
	}
}

function testFPS()
{

		// FPS
		if (isNaN(g.fps)) g.fps = 0;
		if (g.fps) 
		{
			var d = new Date();
			var c = Math.round(1000 / (d - g.fps));
		}
		var s = new String(c);
		g.fps = new Date();
		//if (c) writeString(s,220,g.canvasheight - 128);
		if (isNaN(g.testy)) g.testy = 0;
		if (isNaN(g.ave)) g.ave = 0;
		if (g.testy < 20) 
		{ 
			g.testy ++; g.ave += c; 
			if (g.testy >= 10)
			{
				if (g.ave > 1000) g.framedelay = 42; // throttle the fast devices
			}
		}
}

function spawnTextSprite(o,t)
{
	for (var a=0;a<m.textsprites.length;a++)
	{
		if (!m.textsprites[a].visible)
		{
			var e = m.textsprites[a];
			e.visible = true;
			e.ticks = 30;
			e.x = o.x;
			e.y = o.y;
			e.text = t;
			e.speed = 1;
			break;
		}
	}
}

function spawnTextSpriteXY(x,y,t)
{
	for (var a=0;a<m.textsprites.length;a++)
	{
		if (!m.textsprites[a].visible)
		{
			var e = m.textsprites[a];
			e.visible = true;
			e.ticks = 30;
			e.x = x;
			e.y = y;
			e.text = t;
			e.speed = 1;
			break;
		}
	}
}

function spawnExplosion(o,d,sp)
{
	for (var a=0;a<m.explosion.length;a++)
	{
		if (!m.explosion[a].visible)
		{
			var e = m.explosion[a];
			e.visible = true;
			e.direction = d;
			e.x = o.x;
			e.y = o.y;
			e.speed = 0.1;
			e.frame = 0;
			break;
		}
	}
}

function spawnExplosionXY(x,y,d,sp)
{
	for (var a=0;a<m.explosion.length;a++)
	{
		if (!m.explosion[a].visible)
		{
			var e = m.explosion[a];
			e.visible = true;
			e.direction = d;
			e.x = x;
			e.y = y;
			e.speed = sp;
			e.frame = 0;
			break;
		}
	}
}

function spawnAlien(x,y,d,sp,hp,r)
{
	for (var a=0;a<m.aliens.length;a++)
	{
		if (!m.aliens[a].visible)
		{
			var e = m.aliens[a];
			e.visible = true;
			e.direction = d;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.x = x;
			e.y = y;
			e.originx = x;
			e.originy = y;
			e.killed = false;
			e.targetx = x;
			e.targety = y;
			e.hp = hp;
			e.speed = sp;
			e.basespeed = sp;
			e.frame = 0;
			e.row = r;
			e.nextthink = 16;
			e.decay = 0;
			e.basenextthink = e.nextthink;
			e.startframe = 0;
			e.inpain = 0;
			e.diving = false;
			e.divestage = 0;
			e.mod = 0; 
			e.moddir = "right";
			g.aliensarray.push(e);
			break;
		}
	}
}



function spawnEntityChance(o)
{
	var x = 0; var y = 0;
	if ((rnd(100) < 10) && g.pausemode < 1) 
	{
		x = o.x + 32 + (rnd(g.roadwidth - 64));
		y = 0;
		var row = parseInt(m.spritesheets["entitysheet"].height) / parseInt(m.spritesheets["entitysheet"].frameheight);
		var r = rnd(100)<(g.level)?rnd(3)-1:2+rnd(row-3);
		if (g.level < 5 && r == 5)
		{
			if (rnd(100)>5) r = 4; // frig to prevent too much missile exposure on early levels
		}
		spawnEntity(x, y, r);
	}
}

function spawnEntity(x,y,row)
{
	for (var a=0;a<m.entity.length;a++)
	{
		if (!m.entity[a].visible)
		{
			var s = m.entity[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.direction = 4;
			s.speed = g.roadspeed;
			s.dying = 0;
			s.row = row;
			break;
		}
	}
}

function spawnAlienBomb(o)
{
	if (rnd(500) > (g.level * 3)) { return; }
	if (!o.visible) { return; }
	if (g.pausemode > 0) { return; }
	if (!o.diving) { return; }
	if ((o.x + o.w) < 0) { return; }
	if (o.x > g.canvaswidth) { return; }
	if (g.alienbombcooldown > 2) { return; } 
	if (g.mode != "game") { return; }
	if (m.player.dying) { return; }
	var d = 4;  
	for (var a=0;a<m.alienbomb.length;a++)
	{
		if (!m.alienbomb[a].visible)
		{
			var s = m.alienbomb[a];
			s.visible = true;
			s.direction = d;
			s.x = o.x + (o.w/2);
			s.y = o.y + (o.h/2);
			s.spawny = o.y + 16;
			s.decay = 0;
			s.opacity = 1;
			s.row = 0;
			s.xmod = 0;
			s.speed = 8;
			if (g.level > 6 && rnd(100) < 49 && (o.y < (g.canvasheight - 250)))
			{
				s.speed = (g.level / 2) + 2;
				s.row = 1;
				calculateMods(o,m.player,s);
			}
			break;
		}
	}
}

function calculateModsAlien(a)
{
	var steps = (a.ghosty - (a.y + a.h)) / a.speed;
	var gx = a.ghostx; //a.divestage == 2 ? m.player.x : a.ghostx;
	a.xmod = (gx - a.x) / steps;
}

function calculateMods(a,p,o)
{
	var steps = ((p.y + p.h) - (a.y + a.h)) / o.speed;
	o.xmod = (p.x - a.x) / steps;
}

function spawnLaser(x,y)
{

		if (m.player.dying) return;
		for (var a=0;a<m.lasers.length;a++)
		{
			if (!m.lasers[a].visible)
			{
				var s = m.lasers[a];
				s.visible = true;
				s.x = x;
				s.y = y;
				s.speed = 16;
				s.dead = false;
				s.damage = 1;
				var c1 = 100 + rnd(155);
				var c2 = 100 + rnd(155);
				var c3 = 100 + rnd(155);
				s.color = "255,255,255";
				g.shotsfired ++;
				break;
			}
		}

}

function writeString(s,x,y)
{
	var o = m.spritesheets["numberssheet"];
	for (var a=0;a<s.length;a++)
	{
		x += o.framewidth;
		var i = s.substr(a,1);
		g.ctx.drawImage(o.image, i*o.framewidth, 0, o.framewidth, o.frameheight, x, y, o.framewidth, o.frameheight);
	}
}

function writeLevel()
{
	var ph = new String();
	var ph2 = new String(g.level);
	var ls = ph2.length;
	var s = new String();
	
	for (var b = 0; b < ph2.length; b++) s += ph2.substring(b,b+1);
	
	writeString(s,190,200);

}

function hiScore()
{
		if(typeof m.player.hiscore == "undefined")m.player.hiscore= 0;
		var sScore = new String();
		var sInScore = new String(m.player.hiscore);
		var ls = sInScore.length;
		var s = new String();
		
		for (var a = 0; a < (8-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		writeText(s,g.textcentre,26,28,SCOREFONT,true)
		

}

function updateScore(ss)
{

		m.player.score += 1;
		if (m.player.score > m.player.targetscore) m.player.score = m.player.targetscore;
		if (m.player.score > m.player.hiscore) 
		{
			m.player.hiscore = Math.round(m.player.score);
			try{localStorage.setItem(GAMETITLE + "-hiscore", m.player.hiscore);}catch(e){}
		}
		if (m.player.score > 99999999) m.player.score = 99999999;
		var sScore = new String();
		var sInScore = new String(m.player.score);
		var ls = sInScore.length;
		var s = new String();
		
		for (var a = 0; a < (8-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		if (m.player.score >= 250000 && !g.bonuslife1) 
		{
			m.player.lives ++;
			spawnTextSprite(m.player,textdata[16]);
			g.bonuslife1 = true;
		}

		if (m.player.score >= 500000 && !g.bonuslife2) 
		{
			m.player.lives ++;
			spawnTextSprite(m.player,textdata[16]);
			g.bonuslife2 = true;
		}
		writeText(s,g.textcentre,26,28,SCOREFONT,ss)
		
}


function scanInput(e)
{
	if (window.event) keypress = e.keyCode;
	else if(e.which) keypress = e.which;
	switch (keypress)
	{
		case 16: // SHIFT
			break;
		case 18: // ALT
			break;
		case 32: // Space
			if (g.mode == "title") setGame();
			break;
		case 38: // Up
			break;
		case 40: // Down
			break;
		case 39: // Right
			break;
		case 37: // Left
			break;
		case 80: // P
			g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0;
			break;
		case 83: // S
			g.audiomode ++; if (g.audiomode > 1) g.audiomode = 0;
			handleAudio();
			break;
		case 17: // CTRL
		case 90: // Z
			if (g.mode == "title") setGame();
			break;
	}
}

function stopMove(e)
{
	if (window.event) // IE
	{
		keyup = e.keyCode;
	}
	else if(e.which)
	{
		keyup = e.which;
	}

	var k = 0;
	if (keyup >= 48 && keyup <= 57)
	{
		k = (48 - keyup) * -1;
	}
	switch (keyup)
	{
		case 16: // SHIFT
			break;
		case 18: // ALT
			break;
		case 32: // Space
			break;
		case 38: // Up
			break;
		case 40: // Down
			break;
		case 39: // Right
			break;
		case 37: // Left
			break;
		case 67: // C
			break;
		case 75: // K
			playerDeath();
			break;
		case 83: // S
			break;
		case 17: // CTRL
		case 90: // Z
			break;
	}
}

window.onorientationchange = function(event) {
	setCanvasDimensions(event);
}

