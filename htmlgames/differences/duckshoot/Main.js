var vlx = null;
var mode = "front";
var backSurface;
var backContext = null;
var baseURL = "";
var imageManager = null;
var mainBox = null;
var ballBox = null;
var snowBox = null;
var world = {};
var level = 0;
var expTimer = 0;
var currentDialogContent = null;
var gameoverTicks = 0;
var tE = 0;
var timeRemaining = 0;
var ticksTillNext = 0;
var nextDelay = 50;
var bullets = 0;

function startGame() {
    vlx = new VectorlightGame();

    vlx.gameInit("stage", 1649, 320, 460, 33);
    backSurface = document.getElementById("gameSurface");
    if(navigator.userAgent.match("MSIE"))G_vmlCanvasManager.initElement(backSurface);
    backContext = backSurface.getContext('2d');

    //vlx.useTouch = false;

    if (vlx.useTouch) {
        backSurface.addEventListener('touchstart', touchClick, false);
        document.body.addEventListener('touchstart', touchProcess);
    }
    else {
        	if(navigator.userAgent.match("MSIE")){
        		// ???
        		gameSurface.attachEvent( 'onmousedown', mouseClick );
        	}else{
            	gameSurface.addEventListener('mousedown', mouseClick, false);
            }

    }

    imageManager = new ImageManager();
    imageManager.baseURL = baseURL;
    imageManager.onLoaded = imagesLoaded;

    var images = new Object();
    addImageSet(images, "f0", 1);
    addImageSet(images, "f1", 1);
    addImageSet(images, "f2", 1);
    addImageSet(images, "f3", 1);
    addImageSet(images, "f4", 1);
    addImageSet(images, "f5", 1);
    addImageSet(images, "f6", 1);
    addImageSet(images, "f7", 1);
    addImageSet(images, "f8", 1);
    addImageSet(images, "f9", 1);
    addImageSet(images, "f1c", 1);
    images["stars"] = "stars_1.jpg";
    addImageSet(images, "d11", 1);
    addImageSet(images, "d12", 1);
    addImageSet(images, "d13", 1);
    addImageSet(images, "d14", 1);
    addImageSet(images, "d21", 1);
    addImageSet(images, "d22", 1);
    addImageSet(images, "d23", 1);
    addImageSet(images, "d24", 1);
    addImageSet(images, "d31", 1);
    addImageSet(images, "d32", 1);
    addImageSet(images, "d33", 1);
    addImageSet(images, "d34", 1);
    addImageSet(images, "d41", 1);
    addImageSet(images, "d42", 1);
    addImageSet(images, "d43", 1);
    addImageSet(images, "d44", 1);
    addImageSet(images, "b", 1);
    addImageSet(images, "no", 1);

    imageManager.load(images);
}

function touchClick(ev) {
    var touch = ev.touches[0];
    handleClick(touch.pageX, touch.pageY);

    if (ev != null) {
        ev.stopPropagation();
        ev.preventDefault();
    }
    return false;
}

function mouseClick(ev) {

	if(document.all){
		 var x=ev.x;
		 var y=ev.y;
	}else{
	    var x = ev.clientX;
	    var y = ev.clientY;
	    var scrollY = window.pageYOffset * 1;
	    var scrollX = window.pageXOffset * 1;

	    y += scrollY;
	    x += scrollX;
	}
    	handleClick(x, y);
}

function handleClick(x, y) {
    var curleft = 0;
    var curtop = 0;
    var obj = backSurface;

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    x -= curleft;
    y -= curtop;

    var i;

    for (i = world.layers[1].length - 1; i >= 0; i--) {
        var m = world.layers[1][i];

        if (m.hitTest(x, y, 1)) {
            if (m.duck == 3) {
                createCantHit(m.x + ((m.width - 32) >> 1), m.y + ((m.height - 32) >> 1));
            }
            else {
                world.layers[1].splice(i, 1);

                m.speed = 3 + Math.random();
                m.direction.y = 2.5;

                if (m.direction.x == 0) {
                    m.direction.x = (0.5 - Math.random()) * 2;
                }

                m.onMoved = m_MovedHit;
                m.clipRect = null;
                m.mRotate = 15 + ((0.5 - Math.random()) * 5);

                world.layers[2].push(m);
                level += m.val;
            }
        }
    }

    bullets--;
    if (bullets <= 0) {
        gameoverTicks = 30;
    }
}

function imagesLoaded() {
    setupFront();
}

function touchProcess(e) {
    if (mode == "game") {
        return cD(e);
    }
    return true;
}

function cD(e) {
    if (e != null) {
        e.stopPropagation();
        e.preventDefault();
    }
    return false;
}

function showAd() { return
    if (vlx.useTouch) {
        vlx.dg('mainAd').style.top = "0px";
    }
}

function hideAd() { return
    if (vlx.useTouch) {
        vlx.dg('mainAd').style.top = "-100px";
    }
}

function quit() {
    setupFront();
}

function retry() {
    setupGame();
}

function setupHighscore() {
    mode = "finish";
    //showAd();

    var un = vlx.getUsername();
    if (un == null) {
        un = "";
    }

    vlx.dg("usernameInput").value = un;
    //showDialog("saveHighscore");
    saveHighscore();

    return false;
}

function saveHighscore() {
    hideDialog();
    vlx.setUsername(vlx.dg("usernameInput").value);
    setupFinish();

    if (vlx.useTouch) {
        window.scrollTo(0, vlx.loadScrollY);
    }
    return false;
}

function setupFinish() {
    mode = "finish";
    //showAd();

    showDialog("gameover");

    vlx.dg("gameoverTitle").innerHTML = "CONGRATULATIONS!";

    if (level <= 0) {
        vlx.dg("finishLogin").innerHTML = "You missed them. Better luck next time!";
    }
    else {
        vlx.saveAchievement(99, level);
        var hml = "";
        if (level < 8) {
            hml += "Good shooting.";
        }
        else if (level < 12) {
            hml += "Great shooting.";
        }
        else {
            hml += "Excellent shooting!";
        }

        hml += "<br /><span style='color:#F3F523; padding:4px 0 4px 0;'>You scored: " + level + "</span>";
        hml += "<br /><span style='color:#EB1515;'>See if you can get more!</span>";

        vlx.dg("finishLogin").innerHTML = hml;
    }
}

function setupFront() {
    //hideAd();
    hideDialog();

    mode = "front";
    vlx.sh("front");
    vlx.hd("gameSurface");
    vlx.hd("gameover");
    vlx.hd("bestTimer");
    vlx.hd("instPopup");
}

function setupGame() {
    //hideAd();
    hideDialog();

    try {
        util_createUnknownAccount();
    }
    catch (e) {
    }

    vlx.recordGamePlay();
    vlx.getBestAchievement(99, "bestBy", "bestLevNo");

    vlx.hd("front");
    vlx.sh("gameSurface");
    vlx.hd("gameover");
    vlx.sh("bestTimer");
    
    world = new GameWorld(3);
    world.width = backSurface.width;
    world.height = backSurface.height;

    mainBox = new BoundingBox(0, 0, world.width, world.height);

    level = 0;
    ticksTillNext = 70;
    nextDelay = 50;
    bullets = 12;

    $('#instPopup').fadeIn();
}

function letsGo() {
    mode = "game";
    $('#instPopup').fadeOut();

    return false;
}

function addDuck(p) {
    var m = null;
    var x = 480;
    var y = 200;
    var dX = 0;
    var dY = 0;
    var s = 1;
    var clip = null;
    var rnd = ((Math.random() * 4) >> 0) + 1;
    var val = 0;

    switch (p) {
        case 1:
            m = world.addComplex(1, "d" + rnd + "1", 0);
            x = 480;
            y = 200;
            dX = -1;
            dY = 0;
            s = 1;
            clip = null;
            val = 1;
            break;
        case 2:
            m = world.addComplex(1, "d" + rnd + "1", 0);
            x = 89;
            y = 175;
            dX = -1;
            dY = 0;
            s = 0.5;
            clip = new Array();
            clip.push(new BoundingBox(77, 155, 12, 40));
            clip.push(new BoundingBox(63, 175, 10, 20));
            m.moveType = 1;
            m.moveLowX = 70;
            m.moveClipX = 90;
            val = 2;
            break;
        case 3:
            m = world.addComplex(1, "d" + rnd + "4", 0);
            x = 191;
            y = 188;
            dX = 0;
            dY = -1;
            s = 0.5;
            clip = new Array();
            clip.push(new BoundingBox(191, 171, 19, 17));
            m.moveType = 2;
            m.moveLowY = 172;
            m.moveClipY = 190;
            val = 3;
            break;
        case 4:
            m = world.addComplex(1, "d" + rnd + "4", 0);
            x = 346;
            y = 185;
            dX = 0;
            dY = -1;
            s = 0.5;
            clip = new Array();
            clip.push(new BoundingBox(348, 170, 14, 15));
            m.moveType = 2;
            m.moveLowY = 169;
            m.moveClipY = 188;
            val = 3;
            break;
        case 5:
            m = world.addComplex(1, "d" + rnd + "2", 0);
            x = 386;
            y = 204;
            dX = 0;
            dY = -1;
            s = 1;
            clip = new Array();
            clip.push(new BoundingBox(368, 156, 47, 48));
            m.moveType = 2;
            m.moveLowY = 188;
            m.moveClipY = 205;
            val = 3;
            break;
        case 6:
            m = world.addComplex(1, "d" + rnd + "3", 0);
            x = 360;
            y = 168;
            dX = 1;
            dY = 0;
            s = 1;
            clip = new Array();
            clip.push(new BoundingBox(390, 156, 56, 45));
            m.moveType = 3;
            m.moveMaxX = 386;
            m.moveClipX = 359;
            val = 3;
            break;
        case 7:
            m = world.addComplex(1, "d" + rnd + "1", 0);
            x = 103;
            y = 106;
            dX = -1;
            dY = 0;
            s = 1;
            clip = new Array();
            clip.push(new BoundingBox(66, 103, 38, 50));
            m.moveType = 1;
            m.moveLowX = 74;
            m.moveClipX = 105;
            val = 2;
            break;
        case 8:
            m = world.addComplex(1, "d" + rnd + "3", 0);
            x = 320;
            y = 108;
            dX = 1;
            dY = 0;
            s = 1;
            clip = new Array();
            clip.push(new BoundingBox(349, 107, 56, 45));
            m.moveType = 3;
            m.moveMaxX = 349;
            m.moveClipX = 319;
            val = 2;
            break;
        case 9:
            m = world.addComplex(1, "d" + rnd + "3", 0);
            x = 106;
            y = 197;
            dX = 0;
            dY = -1;
            s = 1;
            clip = new Array();
            clip.push(new BoundingBox(106, 159, 31, 38));
            m.moveType = 2;
            m.moveLowY = 166;
            m.moveClipY = 198;
            val = 2;
            break;
    }

    m.x = x;
    m.y = y;
    m.type = p;
    m.val = val;
    m.duck = rnd;

    //var dir = getDPoints(m.getCenterX(), m.getCenterY(), world.earth.getCenterX(), world.earth.getCenterY());
    m.setMovement(dX, dY, s + (Math.random()));
    m.boundingBox = mainBox;
    m.clipAction = 1;
    m.clipRect = clip;
    m.onMoved = m_Moved;
}

function createCantHit(x,y) {
    var m = world.addComplex(2, "no", 0);
    m.x = x;
    m.y = y;
    m.fadeOut(20, 10);
}

function m_MovedHit(m) {
    m.direction.y += 0.01;
    m.rotate += m.mRotate;
}

function m_Moved(m) {
    switch (m.moveType) {
        case 1:
            if (m.x < m.moveLowX) {
                m.direction.x = -m.direction.x;
            }
            if (m.x > m.moveClipX) {
                return true;
            }
            break;
        case 2:
            if (m.y < m.moveLowY) {
                m.direction.y = -m.direction.y;
            }
            if (m.y > m.moveClipY) {
                return true;
            }
            break;
        case 3:
            if (m.x > m.moveMaxX) {
                m.direction.x = -m.direction.x;
            }
            if (m.x < m.moveClipX) {
                return true;
            }
            break;
    }
}

function showDialog(content) {
    vlx.sh("dialog");
    vlx.sh(content);

    currentDialogContent = content;
}

function hideDialog() {
    vlx.hd("dialog");

    if (currentDialogContent != null) {
        vlx.hd(currentDialogContent);
    }
}

function updateScore(context) {
    var s = vlx.pad(level, 4);
    var imgs = new Array();
    var i;
    var x = world.width - 50 - ((4*18)+4);
    var y = 4;

    imgs.push(imageManager.images["f" + s.charAt(0) + "_1"]);
    imgs.push(imageManager.images["f" + s.charAt(1) + "_1"]);
    imgs.push(imageManager.images["f" + s.charAt(2) + "_1"]);
    imgs.push(imageManager.images["f" + s.charAt(3) + "_1"]);

    for (i = 0; i < imgs.length; i++) {
        context.drawImage(imgs[i], x, y);
        x += imgs[i].width + 2;
    }
}

function updateTime(context) {
    var img = imageManager.images["b_1"];
    var x = 4;
    var y = 4;
    
    for (var i = 0; i < bullets; i++) {
        context.drawImage(img, x, y);
        x += img.width + 2;
    }
}

function addImageSet(images, baseName, count) {
    var i;
    var tmp;

    for (i = 1; i <= count; i++) {
        tmp = baseName + "_" + i;
        images[tmp] = tmp + ".png";
    }
}

function gameLoop() {
    if (imageManager.loaded && world != null) {
        switch (mode) {
            case "game":
                updateInGame();
                break;
        }
    }
}

function updateInGame() {
    world.renderAndUpdate(backContext);
    updateScore(backContext);
    updateTime(backContext);

    if (gameoverTicks == 0) {
        ticksTillNext--;

        if (ticksTillNext <= 0) {
            var rnd = (Math.random() * 9) >> 0;
            addDuck(rnd + 1);

            ticksTillNext = nextDelay + ((Math.random() * 10) >> 0);
        }

        timeRemaining--;
        if (timeRemaining <= 0) {
            timeRemaining = 0;
        }
    }
    else {
        gameoverTicks--;
        if (gameoverTicks == 45) {
        }
        
        if (gameoverTicks <= 0) {
            setupHighscore();
        }
    }
}

/* Image Manager */
function ImageManager() {
    this.baseURL = "";
    this.images = {};
    this.toLoadCount = 0;
    this.loadedCount = 0;
    this.loaded = !false;

    this.load = function(list) {
        var img;

        for (x in list) {
            this.toLoadCount++;

            img = new Image();
            img.onload = this.loadingComplete;
            img.src = this.baseURL + list[x];

            this.images[x] = img;
        }
    }

    this.loadingComplete = function(e) {
        imageManager.loadedCount++;

        if (imageManager.loadedCount == imageManager.toLoadCount) {
            imageManager.loaded = true;
            if (imageManager.onLoaded != null) {
               imageManager.onLoaded();
            }
        }
        this.imageManager = null;
    }
}

function GameWorld(layerCount) {
    this.layers = new Array();
    this.background = "rgba(255, 255, 255, 0.0)";
    this.width = 0;
    this.height = 0;

    this.initLayers = function(layerCount) {
        var i;

        for (i = 0; i < layerCount; i++) {
            this.layers.push(new Array());
        }
    }
    this.initLayers(layerCount);

    this.freezeLayer = function(layer) {
        var i;

        for (i = 0; i < this.layers[layer].length; i++) {
            this.layers[layer][i].isMoveable = false;
        }
    }

    this.add = function(layer, baseImage) {
        var obj = new GameVisual();
        obj.load(baseImage, 1, 1);

        this.addObject(layer, obj);
        return obj;
    }

    this.addAnimatedObject = function(layer, baseImage, count, delay) {
        var obj = new GameVisual();
        obj.load(baseImage, count, delay);

        this.addObject(layer, obj);
        return obj;
    }

    this.addComplex = function(layer, baseImage, rotate) {
        var obj = new ComplexGameVisual();
        obj.load(baseImage, 1, 1);
        obj.rotate = rotate;

        this.addObject(layer, obj);
        return obj;
    }

    this.addObject = function(layer, obj) {
        this.layers[layer].push(obj);
    }

    this.remove = function(layer, obj) {

    }

    this.render = function(context) {
        var i;
        var a;
        var defaultOpacity = context.globalAlpha;

        this.clearBackground(context);

        for (i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            for (a = layer.length - 1; a >= 0; a--) {
                layer[a].render(context);
            }
        }

        context.globalAlpha = defaultOpacity;
    }

    this.update = function() {
        var i;
        var a;

        for (i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            for (a = layer.length - 1; a >= 0; a--) {
                if (!layer[a].update()) {
                    layer.splice(i, 1);
                }
            }
        }
    }

    this.renderAndUpdate = function(context) {
        var i;
        var a;

        this.clearBackground(context);

        for (i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            for (a = layer.length - 1; a >= 0; a--) {
                layer[a].render(context);
                if (!layer[a].update()) {
                    layer.splice(a, 1);
                }
            }
        }
    }

    this.clearBackground = function(context) {
        if (this.background != null) {
            //context.fillStyle = this.background;
            context.clearRect(0, 0, this.width, this.height);
        }
    }
}

/* Game Visual */
function GameVisual() {
    this.id = 0;
    this.frames = new Array();
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.halfWidth = 0;
    this.halfHeight = 0;
    this.currentFrame = 0;
    this.repeat = false;
    this.isVisible = true;
    this.direction = new Point2();
    this.speed = 0;
    this.opacity = 1;
    this.isMoveable = false;
    this.boundingBox = null;
    this.clipAction = 0;
    this.removeWhenAnimated = false;
    this.initDelay = 0;

    this.onRemove = null;
    this.onPreMove = null;
    this.onMoved = null;
    this.onUpdated = null;

    this.setOpacity = function(value) {
        this.opacity = value;
    }

    this.setX = function(value) {
        this.x = value;
    }

    this.setY = function(value) {
        this.y = value;
    }

    this.getCenterX = function() {
        return this.x + this.halfWidth;
    }

    this.getCenterY = function() {
        return this.y + this.halfHeight;
    }

    // Getters/Setters
    this.getGridX = function() {
        return Math.round(this.x / map.cellWidth);
    }
    this.setGridX = function(value) {
        this.setX(value * map.cellWidth);
    }
    this.getGridY = function() {
        return Math.round((this.y + map.cellHeight) / map.cellHeight);
    }
    this.setGridY = function(value) {
        this.y = (value * map.cellHeight) - map.cellHeight;
    }

    // End Getters/Setters
    this.load = function(baseImage, count, delay) {
        var i, a;
        var tmp;

        for (i = 1; i <= count; i++) {
            tmp = baseImage + "_" + i;

            this.width = imageManager.images[tmp].width;
            this.height = imageManager.images[tmp].height;
            this.halfWidth = this.width >> 1;
            this.halfHeight = this.height >> 1;

            for (a = 0; a < delay; a++) {
                this.frames.push(imageManager.images[tmp]);
            }
        }
    }

    this.render = function(context) {
        if (this.isVisible && this.initDelay == 0) {
            context.globalAlpha = this.opacity;
            context.drawImage(this.frames[this.currentFrame], this.x >> 0, this.y >> 0);
        }
    }

    this.update = function() {
        if (this.initDelay > 0) {
            this.initDelay--;
        }
        else if (this.isVisible) {
            this.currentFrame++;
            if (this.currentFrame >= this.frames.length) {
                if (this.repeat) {
                    this.currentFrame = 0;
                }
                else {
                    this.currentFrame--;
                    this.animationComplete();

                    if (this.removeWhenAnimated) {
                        return false;
                    }
                }
            }

            if (this.isMoveable) {
                if (this.onPreMove != null) {
                    this.onPreMove(this);
                }

                this.x += (this.direction.x * this.speed);
                this.y += (this.direction.y * this.speed);

                if (this.onMoved != null) {
                    if (this.onMoved(this)) {
                        return false;
                    }
                }

                if (this.boundingBox != null) {
                    switch (this.clipAction) {
                        case 1:
                            if (this.x <= this.boundingBox.x - this.width || this.x >= this.boundingBox.right || this.y <= this.boundingBox.y - this.height || this.y >= this.boundingBox.bottom) {
                                this.remove(this);
                                return false;
                            }
                            break;
                        case 2:
                            if (this.direction.x < 0 && this.x <= this.boundingBox.x) {
                                this.direction.x = -this.direction.x;
                                this.x = this.boundingBox.x;
                            }
                            else if (this.direction.x > 0 && this.x >= this.boundingBox.right - this.width) {
                                this.direction.x = -this.direction.x;
                                this.x = this.boundingBox.right - this.width;
                            }

                            if (this.direction.y < 0 && this.y <= this.boundingBox.y) {
                                this.direction.y = -this.direction.y;
                                this.y = this.boundingBox.y;
                            }
                            else if (this.direction.y > 0 && this.y >= this.boundingBox.bottom - this.height) {
                                this.direction.y = -this.direction.y;
                                this.y = this.boundingBox.bottom - this.height;
                            }
                            break;
                        case 3:
                            if (this.direction.x < 0 && this.x - this.width <= this.boundingBox.x) {
                                this.x = this.boundingBox.right;
                            }
                            else if (this.direction.x > 0 && this.x >= this.boundingBox.right) {
                                this.x = this.boundingBox.x - this.width;
                            }

                            if (this.direction.y < 0 && this.y <= this.boundingBox.y - this.height) {
                                this.y = this.boundingBox.bottom;
                            }
                            else if (this.direction.y > 0 && this.y >= this.boundingBox.bottom) {
                                this.y = this.boundingBox.y - this.height;
                            }
                            break;
                        case 4:
                            if (this.direction.x < 0 && this.x <= this.boundingBox.x) {
                                this.x = this.boundingBox.x;
                            }
                            else if (this.direction.x > 0 && this.x >= this.boundingBox.right - this.width) {
                                this.x = this.boundingBox.right - this.width;
                            }

                            if (this.direction.y < 0 && this.y <= this.boundingBox.y) {
                                this.y = this.boundingBox.y;
                            }
                            else if (this.direction.y > 0 && this.y >= this.boundingBox.bottom - this.height) {
                                this.y = this.boundingBox.bottom - this.height;
                            }
                            break;
                    }
                }
            }
        }

        if (this.onUpdated != null) {
            return this.onUpdated(this);
        }

        return true;
    }

    this.animationComplete = function() {
    }

    this.remove = function() {
        if (this.onRemove != null) {
            this.onRemove(this);
        }
    }

    this.getCurrentImage = function() {
        return this.frames[this.currentFrame];
    }

    this.hitTest = function(x, y, diff) {
    if (x >= this.x - diff && x < this.x + this.width + diff && y >= this.y - diff && y < this.y + this.height + diff) {
            return true;
        }
        else {
            return false;
        }
    }

    this.setMovement = function(xDir, yDir, speed) {
        this.isMoveable = true;
        this.direction.x = xDir;
        this.direction.y = yDir;
        this.speed = speed;
    }
}

function ComplexGameVisual() {
    this.inheritFrom = GameVisual;
    this.inheritFrom();

    this.rotate = 0;
    this.clipRect = null;
    this.alphaFadeout = -1;
    this.alphaFadeoutDelay = -1;
    this.alphaFadeoutStep = 0;

    this.fadeOut = function(delay, length) {
        this.alphaFadeoutDelay = delay;
        this.alphaFadeoutStep = 1 / length;
        this.alphaFadeout = length;
    }

    this.render = function(context) {
        context.save();

        if (this.clipRect != null) {
            context.beginPath();
            for (var i = 0; i < this.clipRect.length; i++) {
                context.rect(this.clipRect[i].x, this.clipRect[i].y, this.clipRect[i].width, this.clipRect[i].height);
            }
            context.clip();
        }
        context.globalAlpha = this.opacity;
        context.translate(this.x + this.halfWidth, this.y + this.halfHeight);
        context.rotate(this.rotate * 0.0174532925199432957);
        context.translate(-this.halfWidth, -this.halfHeight);
        context.drawImage(this.frames[this.currentFrame], 0, 0);
        context.restore();
    }

    this.baseUpdate = this.update;
    this.update = function() {
        var r = this.baseUpdate();

        if (this.alphaFadeoutDelay <= 0) {
            if (this.alphaFadeout > 0) {
                this.alphaFadeout--;
                this.opacity -= this.alphaFadeoutStep;
            }
        }
        else {
            this.alphaFadeoutDelay--;
        }

        return r;
    }
}

function Point2() {
    this.x = 0;
    this.y = 0;
}

function BoundingBox(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.right = x + width;
    this.bottom = y + height;
}