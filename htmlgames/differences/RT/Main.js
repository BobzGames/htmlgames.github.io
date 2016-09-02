var pageID = 1186;
var baseURL = "";
var assetsPath = "";
var imageManager = new ImageManager();
var map = new PathFindingMap();
var turrets = null;
var creeps = null;
var bullets = null;
var waves = null;
var gameSurface = null;
var gameSurfaceContext = null;
var gameWidth = 312;
var gameHeight = 452;
var objects = null;
var overlay = null;
var selected = null;
var selectedMarker = null;
var inGame = false;
var isGameOver = false;
var isPaused = false;
var enableSound = false;

var buttonClickSound = null;
var buttonClick2Sound = null;
var highscores = new Array();
var userID = "";
var userIDDisplay = "";
var instanceID = "";

var gunHover = null;
var gunSelected = null;

var lives = 0;
var score = 0;
var credits = 0;
var waveNo = 0;

var tick = 0;
var nextID = 0;

var mode = "normal";
var isIpad = false;
var isIphone = false;

var gameGun1 = null;
var gameGun2 = null;
var gameGun3 = null;
var gameGun4 = null;

var gameHearts = new Array();

var waveText = "";
var waveTextCounter;
var initialLoadComplete = false;

var gun1Cost = 500;
var gun2Cost = 700;
var gun3Cost = 1400;
var gun4Cost = 2500;

var moreGamesButton = null;
var nextButton = null;
var playButton = null;
var quitButton = null;
var quitButtonLarge = null;
var retryButton = null;

var redrawGameOver = false;

var redrawLives = false;
var redrawScore = false;
var redrawGuns = false;

var bottomPanelY = gameHeight - 88;
var useTouch = false;
var isLevSelect = false;
var levNo = 1;
var vlx;

function run() {
    isIpad = navigator.userAgent.match(/iPad/i) != null;
    isIphone = navigator.userAgent.match(/iPhone/i) != null;
    isAndroid = navigator.userAgent.match(/Android/i) != null;

    useTouch = isIpad | isIphone | isAndroid;

    //enableSound = !isIpad;
    enableSound = false;

    var images = new Object();

    gameSurface = document.getElementById("gameSurface");

	if(navigator.userAgent.match("MSIE"))G_vmlCanvasManager.initElement(gameSurface);

    if (gameSurface.getContext) {
        gameSurfaceContext = gameSurface.getContext('2d');

        if (useTouch) {
            gameSurface.addEventListener('touchstart', touchClick, false);
            document.body.onload = scrollToTop;
        }
        else {
        
         	if(navigator.userAgent.match("MSIE")){
        		// ???
        		gameSurface.attachEvent( 'onmousedown', mouseClick );
        		gameSurface.attachEvent( 'onmousemove', mouseMove );
        	}else{
	            gameSurface.addEventListener('mousedown', mouseClick, false);
	            gameSurface.addEventListener('mousemove', mouseMove, false);
            }        
        
        }
    }
    else {
        return;
    }

    baseURL = "";
    if (window.location.hostname == "localhost") {
        baseURL = "";
    }
    else {
        baseURL = "";
    }

    instanceID = document.getElementById("instanceid").value;
    assetsPath = baseURL + "";
    imageManager.baseURL = assetsPath;

    if (enableSound) {
    }

    addImageSet(images, "logo", 1);
    addImageSet(images, "back2", 1);
    addImageSet(images, "backEmpty", 1);
    addImageSet(images, "backEmpty2", 1);
    addImageSet(images, "backEmpty3", 1);
    addImageSet(images, "backEmpty4", 1);
    addImageSet(images, "backPath", 1);
    addImageSet(images, "backPath2", 1);
    addImageSet(images, "backPath3", 1);
    addImageSet(images, "backPath4", 1);
    addImageSet(images, "gunBase1", 1);
    addImageSet(images, "gunBase2", 1);
    addImageSet(images, "gunBase3", 1);
    addImageSet(images, "gunBase4", 1);
    addImageSet(images, "gun1", 1);
    addImageSet(images, "gun2", 1);
    addImageSet(images, "gun3", 1);
    addImageSet(images, "gun4", 1);
    addImageSet(images, "heart", 1);
    addImageSetJpeg(images, "thumb1", 1);
    addImageSetJpeg(images, "thumb2", 1);
    addImageSetJpeg(images, "thumb3", 1);
    addImageSetJpeg(images, "thumb4", 1);
    addImageSetJpeg(images, "thumb5", 1);
    addImageSetJpeg(images, "thumb6", 1);

    imageManager.load(images);

    setTimeout(loop, 33);

    vlx = new VectorlightGame();
    vlx.setUrl();

    userID = vlx.getUsername();
    userIDDisplay = userID;

    if (userID == null) {
        userIDDisplay = "Guest";
    }
    
}

function showAd() {
    //document.getElementById('mainAd').style.top = "376px";
}

function hideAd() {
    //document.getElementById('mainAd').style.top = "-100px";
}

function scrollToTop() {
    setTimeout(function() { window.scrollTo(0, 0); }, 100);
}

var fadeOutOpacity = 0;
var fadeOutTarget = "";

function beginFadeOut(target) {
    fadeOutOpacity = 0.01;
    fadeOutTarget = target;
}

function updateFadeOut() {
    if (fadeOutOpacity > 0) {
        gameSurfaceContext.save();

        gameSurfaceContext.globalAlpha = fadeOutOpacity;
        gameSurfaceContext.fillStyle = "#000000";
        gameSurfaceContext.fillRect(0, 0, gameWidth, gameHeight);

        gameSurfaceContext.globalAlpha = 1;
        gameSurfaceContext.restore();

        fadeOutOpacity += 0.05;
        if (fadeOutOpacity >= 0.5) {
            fadeOutOpacity = 0;

            switch (fadeOutTarget) {
                case "sg":
                    sg();
                    break;
                case "bg":
                    bg();
                    break;
                case "qt":
                    qt();
                    break;
            }
        }
    }
}

var path1 = null;
var path2 = null;

function setupLevelMap() {
    var x, y;
    var cell;

    for (x = 0; x < map.width; x++) {
        for (y = 0; y < map.height; y++) {
            cell = new CellContent();
            cell.type = 0;
            cell.redraw = true;
            
            map.set(x, y, cell);
        }
    }

    var levelData;
    var i;

    creepNo = 0;

    switch (levNo) {
        case 1:
            levelData = [7, 1, 7, 2, 7, 3, 7, 4, 7, 5, 5, 6, 6, 6, 7, 6, 5, 7, 5, 8, 5, 9, 5, 10, 6, 10, 7, 10, 8, 10, 9, 10, 9, 11, 9, 12, 9, 13, 9, 14, 9, 15, 9, 16];
            break;
        case 2:
            levelData = [4, 0, 4, 1, 4, 2, 4, 3, 5, 3, 6, 3, 7, 3, 8, 3, 8, 4, 8, 5, 8, 6, 9, 6, 10, 6, 11, 6, 12, 6, 12, 7, 12, 8, 12, 9, 12, 10, 8, 11, 9, 11, 10, 11, 11, 11, 12, 11, 8, 12, 8, 13, 4, 14, 5, 14, 6, 14, 7, 14, 8, 14, 4, 15, 4, 16, 4, 17];
            break;
        case 3:
            levelData = [7, 0, 9, 0, 7, 1, 9, 1, 7, 2, 9, 2, 4, 3, 5, 3, 6, 3, 7, 3, 9, 3, 10, 3, 11, 3, 12, 3, 4, 4, 12, 4, 4, 5, 12, 5, 4, 6, 5, 6, 6, 6, 7, 6, 9, 6, 10, 6, 11, 6, 12, 6, 7, 7, 9, 7, 7, 8, 9, 8, 6, 9, 7, 9, 9, 9, 10, 9, 6, 10, 10, 10, 6, 11, 10, 11, 6, 12, 10, 12, 6, 13, 7, 13, 8, 13, 9, 13, 10, 13, 8, 14, 8, 15, 8, 16, 8, 17];
            break;
        case 4:
            levelData = [12, 0, 12, 1, 12, 2, 3, 3, 4, 3, 5, 3, 6, 3, 7, 3, 8, 3, 9, 3, 12, 3, 3, 4, 9, 4, 10, 4, 11, 4, 12, 4, 3, 5, 5, 5, 6, 5, 7, 5, 3, 6, 5, 6, 7, 6, 8, 6, 9, 6, 10, 6, 11, 6, 12, 6, 3, 7, 5, 7, 12, 7, 3, 8, 5, 8, 7, 8, 8, 8, 9, 8, 10, 8, 12, 8, 3, 9, 5, 9, 7, 9, 10, 9, 12, 9, 3, 10, 4, 10, 5, 10, 7, 10, 10, 10, 11, 10, 12, 10, 7, 11, 3, 12, 4, 12, 5, 12, 6, 12, 7, 12, 9, 12, 10, 12, 11, 12, 12, 12, 3, 13, 9, 13, 12, 13, 3, 14, 4, 14, 5, 14, 6, 14, 7, 14, 8, 14, 9, 14, 12, 14, 12, 15, 12, 16, 12, 17];
            break;
        case 5:
            levelData = [3, 0, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 4, 5, 5, 5, 6, 5, 7, 5, 8, 5, 9, 5, 10, 5, 11, 5, 12, 5, 12, 6, 3, 7, 4, 7, 5, 7, 6, 7, 7, 7, 8, 7, 9, 7, 10, 7, 11, 7, 12, 7, 3, 8, 3, 9, 4, 9, 5, 9, 6, 9, 7, 9, 8, 9, 9, 9, 10, 9, 11, 9, 12, 9, 12, 10, 3, 11, 4, 11, 5, 11, 6, 11, 7, 11, 8, 11, 9, 11, 10, 11, 11, 11, 12, 11, 3, 12, 3, 13, 4, 13, 5, 13, 6, 13, 7, 13, 8, 13, 9, 13, 10, 13, 11, 13, 12, 13, 12, 14, 12, 15, 12, 16, 12, 17];
            break;
        case 6:
            levelData = [3, 0, 12, 0, 3, 1, 12, 1, 3, 2, 12, 2, 3, 3, 4, 3, 5, 3, 10, 3, 11, 3, 12, 3, 5, 4, 10, 4, 5, 5, 10, 5, 5, 6, 6, 6, 9, 6, 10, 6, 6, 7, 9, 7, 6, 8, 9, 8, 6, 9, 9, 9, 6, 10, 9, 10, 6, 11, 9, 11, 6, 12, 9, 12, 3, 13, 4, 13, 5, 13, 6, 13, 9, 13, 10, 13, 11, 13, 12, 13, 3, 14, 12, 14, 3, 15, 12, 15, 3, 16, 12, 16, 3, 17, 12, 17];
            break;
    }

    for (i = 0; i < levelData.length; i+= 2) {
        map.setPath(levelData[i], levelData[i+1]);
    }

    switch (levNo) {
        case 1:
            path1 = setPathArray(map.FindPath(7, 1, 9, 16));
            break;
        case 2:
            path1 = setPathArray(map.FindPath(4, 1, 4, 16));
            break;
        case 3:
            path1 = setPathArray(map.FindPath(7, 1, 8, 16));
            path2 = setPathArray(map.FindPath(9, 1, 8, 16));
            break;
        case 4:
            path1 = setPathArray(map.FindPath(12, 1, 12, 16));
            break;
        case 5:
            path1 = setPathArray(map.FindPath(3, 1, 12, 16));
            break;
        case 6:
            path1 = setPathArray(map.FindPath(3, 1, 3, 16));
            path2 = setPathArray(map.FindPath(12, 1, 12, 16));
            break;
    }
}

function setPathArray(endCell) {
    var current = endCell;
    var path = new Array();

    while (current != null) {
        path.push(new Point2((current.X * map.cellWidth) - 39, (current.Y * map.cellHeight) - 39));
        current = current.Parent;
    }

    path.reverse();
    
    return path;
}

var creepNo = 0;

function setCreepPath(creep) {
    switch (levNo) {
        case 1:
            creep.setPath(path1);
            break;
        case 2:
            creep.setPath(path1);
            break;
        case 3:
            if ((creepNo & 1) == 0) {
                creep.setPath(path1);
            }
            else {
                creep.setPath(path2);
            }
            break;
        case 4:
            creep.setPath(path1);
            break;
        case 5:
            creep.setPath(path1);
            break;
        case 6:
            if ((creepNo & 1) == 0) {
                creep.setPath(path1);
            }
            else {
                creep.setPath(path2);
            }
            break;
    }

    creepNo++;
}

function recordHighscore() {
    vlx.saveAchievement(37, score);
}

function recordGamePlay() {
}

function pg(type) {
    var select = false;

    switch (type) {
        case 0:
            if (credits < gun1Cost) {
                return;
            }
            break;
        case 1:
            if (credits < gun2Cost) {
                return;
            }
            break;
        case 2:
            if (credits < gun3Cost) {
                return;
            }
            break;
    }

    gunSelected = null;
    
    if (gunHover == null) {
        select = true;
    }
    else if (gunHover.type != type) {
        select = true;
    }

    if (select) {
        gunHover = new Turret();
        gunHover.setType(type);
    }
    else {
        gunHover = null;
        gameGun1.isSelected = false;
        gameGun2.isSelected = false;
        gameGun3.isSelected = false;
        gameGun4.isSelected = false;
    }

    redrawGuns = true;
    redrawScore = true;
}

var canvasData = null;
var splashTimer = 100;
var splashOpacity = 0;

function loop() {
    var i;

    if (imageManager.loaded && splashTimer <= 0) {
        updateFadeOut();

        if (fadeOutOpacity > 0) {
            setTimeout(loop, 33);
            return;
        }
        
        if (!initialLoadComplete) {
            //showGameOver();
            initialLoadComplete = true;

            moreGamesButton = new GameButton();
            moreGamesButton.content = "MORE GAMES";
            moreGamesButton.width = 144;
            moreGamesButton.height = 43;

            nextButton = new GameButton();
            nextButton.content = "NEXT";
            nextButton.width = 70;
            nextButton.height = 32;

            quitButton = new GameButton();
            quitButton.content = "QUIT";
            quitButton.width = 70;
            quitButton.height = 32;

            playButton = new GameButton();
            playButton.content = "PLAY";
            playButton.width = 144;
            playButton.height = 43;

            quitButtonLarge = new GameButton();
            quitButtonLarge.content = "QUIT";
            quitButtonLarge.width = 134;
            quitButtonLarge.height = 43;

            retryButton = new GameButton();
            retryButton.content = "RETRY";
            retryButton.width = 134;
            retryButton.height = 43;

            gameGun1 = new GameButton();
            gameGun1.load("gun1", 1, 1);
            gameGun1.ignoreHover = true;

            gameGun2 = new GameButton();
            gameGun2.load("gun2", 1, 1);
            gameGun2.ignoreHover = true;

            gameGun3 = new GameButton();
            gameGun3.load("gun3", 1, 1);
            gameGun3.ignoreHover = true;

            gameGun4 = new GameButton();
            gameGun4.load("gun4", 1, 1);
            gameGun4.ignoreHover = true;

            document.getElementById("splash").style.display = "none";
            document.getElementById("theGame").style.display = "block";
            showFront();
        }

        if (inGame) {
            drawBackground();
            drawObjects();
            drawWaveText();

            if (redrawGameOver) {
                drawGameOver();
                redrawGameOver = false;
            }

            if (!isGameOver) {
                var bits = (tick & 3);

                if (bits == 0 && redrawGuns) {
                    drawGunPanel();
                    redrawGuns = false;
                }
                else if (bits == 1 && redrawLives) {
                    drawLives();
                    redrawLives = false;
                }
                else if (bits == 2 && redrawScore) {
                    drawScore();
                    redrawScore = false;
                }
            }
        }
        else {
            
        }

        drawnFrontWhole = false; //true;
    }
    else {
        var totalLoaded = imageManager.loadedCount + 1;
        var toLoad = imageManager.toLoadCount;
        var percent = (totalLoaded / toLoad) * 100;

        if (percent > 100) {
            percent = 100;
        }

        document.getElementById("loadingProgress").innerHTML = "Loading " + Math.round(percent) + "%";
        document.getElementById("splash").style.opacity = splashOpacity;
        splashTimer--;
        splashOpacity += 0.05;
    }

    setTimeout(loop, 33);
    tick++;
}

function drawFrontControl() {
    gameSurfaceContext.fillStyle = "#4C4D51";
    gameSurfaceContext.fillRect(0, bottomPanelY, gameWidth, 88);

    moreGamesButton.setPosition(0, bottomPanelY + 7);
    moreGamesButton.render(gameSurfaceContext);

    playButton.setPosition(168, bottomPanelY + 7);
    playButton.render(gameSurfaceContext);

    drawLogin();
}

function drawGameControl() {
    gameSurfaceContext.fillStyle = "#4C4D51";
    gameSurfaceContext.fillRect(0, bottomPanelY, gameWidth, 88);

    nextButton.setPosition(152, bottomPanelY + 7);
    nextButton.render(gameSurfaceContext);

    quitButton.setPosition(152, bottomPanelY + 53);
    quitButton.render(gameSurfaceContext);

    drawStatPanel();
    drawGunPanel();
}

function drawStatPanel() {
    gameSurfaceContext.fillStyle = "#222327";
    gameSurfaceContext.fillRect(0, bottomPanelY + 4, 146, 84);

    var scoreText = "Score:";
    var creditsText = "Credits:";
    var textSize = get_textWidth(scoreText, 12);

    gameSurfaceContext.strokeStyle = '#ffffff';
    gameSurfaceContext.strokeText(scoreText, 66 - textSize, bottomPanelY + 43, 12);

    textSize = get_textWidth(creditsText, 12);
    gameSurfaceContext.strokeText(creditsText, 66 - textSize, bottomPanelY + 63, 12);
    
    drawLives();
    drawScore();
}

function drawLives() {
    var x = 8;

    gameSurfaceContext.save();

    gameSurfaceContext.fillStyle = "#222327";
    gameSurfaceContext.fillRect(9, bottomPanelY + 9, 126, 28);

    var i;

    for (i = 0; i < 5; i++, x += 26) {
        if (lives > i) {
            gameSurfaceContext.drawImage(imageManager.images["heart_1"], x, bottomPanelY + 13);
        }
        else {
            gameSurfaceContext.globalAlpha = 0.3;
            gameSurfaceContext.drawImage(imageManager.images["heart_1"], x, bottomPanelY + 13);
            gameSurfaceContext.globalAlpha = 1;
        }
    }

    gameSurfaceContext.restore();
}

function drawScore() {
    var scoreText = pad(score, 6);
    var creditsText = "$" + credits;

    gameSurfaceContext.fillStyle = "#222327";
    gameSurfaceContext.fillRect(73, bottomPanelY + 41, 60, 41);

    gameSurfaceContext.save();

    gameSurfaceContext.strokeStyle = '#ffffff';
    gameSurfaceContext.strokeText(scoreText, 73, bottomPanelY + 44, 12);

    gameSurfaceContext.strokeStyle = '#ffff00';
    gameSurfaceContext.strokeText(creditsText, 73, bottomPanelY + 63, 12);

    gameSurfaceContext.restore();
}

function drawGunPanel() {
    gameSurfaceContext.fillStyle = "#222327";
    gameSurfaceContext.fillRect(228, bottomPanelY + 4, 84, 84);

    gameGun1.setPosition(234, bottomPanelY + 10);
    gameGun2.setPosition(274, bottomPanelY + 10);
    gameGun3.setPosition(234, bottomPanelY + 50);
    gameGun4.setPosition(274, bottomPanelY + 50);

    if (credits >= gun1Cost) {
        gameGun1.opacity = 1;
        gameGun1.render(gameSurfaceContext);
    }
    else {
        gameGun1.opacity = 0.6;
        gameGun1.render(gameSurfaceContext);
    }

    if (credits >= gun2Cost) {
        gameGun2.opacity = 1;
        gameGun2.render(gameSurfaceContext);
    }
    else {
        gameGun2.opacity = 0.6;
        gameGun2.render(gameSurfaceContext);
    }

    if (credits >= gun3Cost) {
        gameGun3.opacity = 1;
        gameGun3.render(gameSurfaceContext);
    }
    else {
        gameGun3.opacity = 0.6;
        gameGun3.render(gameSurfaceContext);
    }

    if (credits >= gun4Cost) {
        gameGun4.opacity = 1;
        gameGun4.render(gameSurfaceContext);
    }
    else {
        gameGun4.opacity = 0.6;
        gameGun4.render(gameSurfaceContext);
    }
}

function showFront() {
    inGame = false;
    isLevSelect = false;
    isGameOver = false;

    gameSurfaceContext.save();
    gameSurfaceContext.drawImage(imageManager.images["back2_1"], 0, 0);
    gameSurfaceContext.drawImage(imageManager.images["logo_1"], 31, 9);

    gameSurfaceContext.restore();

    moreGamesButton.reset();
    playButton.reset();
    drawFrontControl();
}

var levSelectButtons = null;

function showLevelSelect() {
    isLevSelect = true;

    gameSurfaceContext.drawImage(imageManager.images["back2_1"], 0, 0);

    var text = "Select a conveyor belt";
    var textSize = get_textWidth(text, 16);

    gameSurfaceContext.strokeStyle = '#ffffff';
    gameSurfaceContext.strokeText(text, (gameWidth - textSize) * 0.5, 40, 16);

    var x = 19;
    var y = 84;
    var i = 0;
    var a = 0;

    if (levSelectButtons == null) {
        var levButton;

        levSelectButtons = new Array();

        for (i = 0; i < 3; i++) {
            x = 57;

            for (a = 0; a < 2; a++) {
                levButton = new LevelSelectButton();
                levButton.setPosition(x, y);
                levButton.width = 96;
                levButton.height = 111;
                levButton.number = levSelectButtons.length + 1;

                levSelectButtons.push(levButton);

                x += 101;
            }

            y += 116;
        }
    }

    for (i = 0; i < levSelectButtons.length; i++) {
        levSelectButtons[i].isSelected = false;
        levSelectButtons[i].render(gameSurfaceContext);
    }
}

function drawLogin() {
    gameSurfaceContext.save();
    gameSurfaceContext.strokeStyle = '#ffffff';

    var text = " - please visit " + userIDDisplay;
    var textSize = get_textWidth(text, 10);

    gameSurfaceContext.strokeText(text, gameWidth - textSize, gameHeight - 20, 10);

    var text = "Differences API";

    gameSurfaceContext.strokeText(text, 0, gameHeight - 20, 10);

    gameSurfaceContext.restore();
}

function sg() {
    showLevelSelect();
}

function bg() {
    showGame();
    recordGamePlay();
}

function showGameOver(complete) {
    isGameOver = true;
    redrawGameOver = true;
}

function showGame() {
    inGame = true;

    nextButton.reset();
    quitButton.reset();

    setupLevel();
    drawGameControl();
}

function nx() {
    nextButton.reset();
    
    if (waveTextCounter > 0) {
        waveTextCounter = 0;
    }
}

function qt() {
    showFront();
}

function setupLevel() {
    var turret;
    var creep;

    lives = 5;
    score = 0;
    credits = 1000;
    waveNo = 1;
    inGame = true;
    isGameOver = false;

    if (levNo == 3 || levNo == 6) {
        credits += 400;
    }

    gunHover = null;
    gunSelected = null;

    tick = 0;
    waveText = "";
    waveTextCounter = 0;

    map.setup();
    setupLevelMap();
        
    turrets = new Array();
    creeps = new Array();
    bullets = new Array();
    waves = new Array();
    
    // Type, Qty, Delay, Defense, Speed
    waves.push(new Wave(0, 5, 30, 5, 5)); // 1
    waves.push(new Wave(0, 10, 20, 3, 6.5)); // 2
    waves.push(new Wave(0, 20, 15, 1.5, 8)); // 3
    waves.push(new Wave(0, 25, 13, 1.5, 9)); // 4
    waves.push(new Wave(0, 30, 10, 1.3, 8)); // 5
    waves.push(new Wave(1, 30, 15, 1.2, 9)); // 6
    waves.push(new Wave(1, 35, 12, 1, 10)); // 7
    waves.push(new Wave(0, 30, 10, 0.9, 10)); // 8
    waves.push(new Wave(0, 50, 8, 0.8, 11)); // 9
    waves.push(new Wave(1, 40, 10, 0.8, 11)); // 10
    waves.push(new Wave(0, 60, 6, 0.7, 13)); // 11
    waves.push(new Wave(1, 35, 10, 0.6, 12)); // 12
    waves.push(new Wave(0, 30, 8, 0.5, 13)); // 13
    waves.push(new Wave(0, 50, 7, 0.45, 13)); // 14
    waves.push(new Wave(1, 30, 6, 0.4, 8)); // 15
    waves.push(new Wave(0, 60, 6, 0.38, 14)); // 16
    waves.push(new Wave(1, 50, 5, 0.36, 9)); // 17
    waves.push(new Wave(0, 60, 5, 0.35, 10)); // 18
    waves.push(new Wave(1, 70, 5, 0.34, 9)); // 19
    waves.push(new Wave(0, 65, 4, 0.32, 8)); // 20

    setWaveText(waveNo);
}

function setWaveText(no) {
    waveTextCounter = 100;

    if (no > 1) {
        waveTextCounter = 300;
    }

    if (no >= 20) {
        waveText = "FINAL WAVE!";
    }
    else {
        waveText = "WAVE " + no;
    }
}

var drawnFrontWhole = false;
var debugText = "";

function drawDebug() {
    //redrawBackground(150, 2, 250, 31);
    gameSurfaceContext.strokeStyle = '#ffffff';
    gameSurfaceContext.strokeText(debugText + "", 151, 2, 16);
}

function drawWaveText() {
    if (isGameOver) {
        return;
    }
    
    if (waveTextCounter > 0) {
        if (waveTextCounter <= 100) {
            gameSurfaceContext.save();

            if (waveTextCounter < 10) {
                gameSurfaceContext.globalAlpha = waveTextCounter * 0.1;
            }

            var textSize = get_textWidth(waveText, 21);

            map.invalidate(((312 - textSize) * 0.5) + 52, 180 + 52, textSize + 52, 52);

            gameSurfaceContext.shadowOffsetX = 2;
            gameSurfaceContext.shadowOffsetY = 2;
            gameSurfaceContext.shadowBlur = 4;
            gameSurfaceContext.shadowColor = "#000000";

            gameSurfaceContext.strokeStyle = '#ffffff';
            gameSurfaceContext.strokeText(waveText, (312 - textSize) * 0.5, 180, 21);

            gameSurfaceContext.globalAlpha = 1;
            gameSurfaceContext.restore();
        }

        waveTextCounter -= 1;
    }
}

function drawGameOver() {
    var text = "GAME OVER";
    var text2;
    var text3;
    var scoreText;

    if (waves.length == 0) {
        text = "GAME COMPLETE!";
    }

    scoreText = "You Scored: " + pad(score, 7);
    var scoreTextWidth = get_textWidth(scoreText, 15);

    gameSurfaceContext.save();

    gameSurfaceContext.fillStyle = "#4C4D51";
    gameSurfaceContext.fillRect(0, bottomPanelY, gameWidth, 88);

    quitButtonLarge.reset();
    retryButton.reset();

    gameSurfaceContext.globalAlpha = 0.8;
    gameSurfaceContext.fillStyle = "#000000";
    gameSurfaceContext.fillRect(8, 8, gameWidth - 16, gameHeight - 104);

    gameSurfaceContext.globalAlpha = 1;

    var textSize = get_textWidth(text, 21);

    gameSurfaceContext.shadowOffsetX = 2;
    gameSurfaceContext.shadowOffsetY = 2;
    gameSurfaceContext.shadowBlur = 4;
    gameSurfaceContext.shadowColor = "#000000";

    gameSurfaceContext.strokeStyle = '#ffffff';

    if (waves.length == 0) {
        gameSurfaceContext.strokeText(text, ((gameWidth - textSize) * 0.5), 80, 21);

        gameSurfaceContext.strokeStyle = '#e0e0e0';
        text = "You survived all the waves!";
        textSize = get_textWidth(text, 12);
        gameSurfaceContext.strokeText(text, ((gameWidth - textSize) * 0.5), 110, 12);

        gameSurfaceContext.strokeStyle = '#ffffff';
        gameSurfaceContext.strokeText(scoreText, ((gameWidth - scoreTextWidth) * 0.5), 170, 15);
    }
    else {
        gameSurfaceContext.strokeText(text, ((gameWidth - textSize) * 0.5), 110, 21);

        gameSurfaceContext.strokeStyle = '#ffffff';
        gameSurfaceContext.strokeText(scoreText, ((gameWidth - scoreTextWidth) * 0.5), 170, 15);
    }

    if (vlx.getUserId() != null) {
        //text = "Your score has been submitted";
        //recordHighscore();
    }
    else {
        //text = "Please login to save you scores";
    }
	text = "Nice!";

    gameSurfaceContext.strokeStyle = '#ffff00';

    textSize = get_textWidth(text, 12);
    gameSurfaceContext.strokeText(text, ((gameWidth - textSize) * 0.5), 230, 12);

    text = "Thanks for playing!";
    textSize = get_textWidth(text, 12);
    gameSurfaceContext.strokeText(text, ((gameWidth - textSize) * 0.5), 250, 12);

    gameSurfaceContext.restore();

    quitButtonLarge.setPosition(15, bottomPanelY - 58);
    quitButtonLarge.render(gameSurfaceContext);

    retryButton.setPosition(163, bottomPanelY - 58);
    retryButton.render(gameSurfaceContext);

    showAd();
    drawLogin();
}

var colVar = 0;

function drawObjects() {
    var i;
    var pi2 = Math.PI * 2;

    if (isGameOver) {
        return;
    }

    gameSurfaceContext.save();
    gameSurfaceContext.beginPath();
    gameSurfaceContext.rect(0, 0, 312, gameHeight - 88);
    gameSurfaceContext.clip();

    for (i = turrets.length-1; i >= 0 ; i--) {
        turrets[i].render(gameSurfaceContext);
        turrets[i].update();
    }

    if (creeps.length > 0) {
        gameSurfaceContext.fillStyle = creeps[0].baseColor;
        gameSurfaceContext.lineWidth = 0;        
        
        for (i = creeps.length - 1; i >= 0; i--) {
            if (!creeps[i].runningExplosion) {
                if (!creeps[i].removeNextFrame) {
                    gameSurfaceContext.beginPath();
                    gameSurfaceContext.arc(creeps[i].x, creeps[i].y, creeps[i].baseRadius, 0, pi2, false);
                    gameSurfaceContext.closePath();

                    gameSurfaceContext.fill();
                }
                else {
                    creeps.splice(i, 1);
                }
            }
        }

        if (creeps.length > 0) {
            gameSurfaceContext.lineWidth = 1;
            gameSurfaceContext.strokeStyle = creeps[0].hpOutlineColor;
            gameSurfaceContext.fillStyle = creeps[0].hpFillColor;

            for (i = creeps.length - 1; i >= 0; i--) {
                if (!creeps[i].runningExplosion) {
                    gameSurfaceContext.strokeRect(creeps[i].x + creeps[i].OffsetHP.x, creeps[i].y + creeps[i].OffsetHP.y, 16, 6);
                    gameSurfaceContext.fillRect(creeps[i].x + creeps[i].OffsetHPContent.x, creeps[i].y + creeps[i].OffsetHPContent.y, 14 * creeps[i].hp, 4);

                    creeps[i].update();
                    if (isGameOver) {
                        gameSurfaceContext.restore();
                        return;
                    }
                }
                else {
                    creeps[i].render(gameSurfaceContext);
                    creeps[i].update();
                }
            }
        }
    }

    if (bullets.length > 0) {
        gameSurfaceContext.lineWidth = 0;
        gameSurfaceContext.globalAlpha = 0.5;
        
        for (i = bullets.length - 1; i >= 0; i--) {
            if (!bullets[i].removeNextFrame) {
                gameSurfaceContext.beginPath();
                gameSurfaceContext.arc(bullets[i].x, bullets[i].y, bullets[i].baseRadius, 0, pi2, false);
                gameSurfaceContext.closePath();

                gameSurfaceContext.fillStyle = bullets[i].baseColor;
                gameSurfaceContext.fill();
                bullets[i].update();
            }
            else {
                bullets.splice(i, 1);
            }
        }

        gameSurfaceContext.globalAlpha = 1;
    }

    var off;

    if (gunHover != null) {
        gunHover.redraw = 1;

        if (!useTouch) {
            off = gunHover.range - 39;
            map.invalidate(gunHover.x - off, gunHover.y - off, (gunHover.range * 2) + 52, (gunHover.range * 2) + 52);

            gunHover.render(gameSurfaceContext);
        }
    }

    if (gunSelected != null) {
        off = gunHover.range - 39;
        map.invalidate(gunHover.x - off, gunHover.y - off, (gunHover.range * 2) + 52, (gunHover.range * 2) + 52);

        gunHover.redraw = 1;
        gunSelected.renderSelected(gameSurfaceContext);
    }

    gameSurfaceContext.restore();

    if (waves.length > 0 && waveTextCounter <= 0) {
        waves[0].update();
    }

    if (!isGameOver && waves.length == 0 && creeps.length == 0) {
        showGameOver(true);
    }
}

var frameCount = 0;

function drawBackground() {
    if (isGameOver) {
        return;
    }
    
    var x, y;
    var cell;
    var emptyCells = new Array();
    var pathCells = new Array();

    emptyCells.push(imageManager.images["backEmpty_1"]);
    emptyCells.push(imageManager.images["backEmpty2_1"]);
    emptyCells.push(imageManager.images["backEmpty3_1"]);
    emptyCells.push(imageManager.images["backEmpty4_1"]);

    pathCells.push(imageManager.images["backPath_1"]);
    pathCells.push(imageManager.images["backPath2_1"]);
    pathCells.push(imageManager.images["backPath3_1"]);
    pathCells.push(imageManager.images["backPath4_1"]);

    emptyCells.push(imageManager.images["gunBase1_1"]);
    emptyCells.push(imageManager.images["gunBase2_1"]);
    emptyCells.push(imageManager.images["gunBase3_1"]);
    emptyCells.push(imageManager.images["gunBase4_1"]);

    for (x = 2; x < map.width - 2; x++) {
        for (y = 2; y < map.height - 2; y++) {
            cell = map.get(x, y);

            if (cell.redraw) {
                if (cell.content != null) {
                    cell.content.redraw = 1;
                }
                /*if ((frameCount & 1) == 0) {
                    gameSurfaceContext.fillStyle = "#00ff00";
                }
                else {
                    gameSurfaceContext.fillStyle = "#ff0000";
                }
                
                gameSurfaceContext.fillRect((x * map.cellWidth) - 52, (y * map.cellHeight) - 52, 26, 26);*/
                
                
                if (cell.type != 1) {
                    gameSurfaceContext.drawImage(emptyCells[cell.subType], (x * map.cellWidth) - 52, (y * map.cellHeight) - 52);
                }
                else {
                    gameSurfaceContext.drawImage(pathCells[cell.subType], (x * map.cellWidth) - 52, (y * map.cellHeight) - 52);
                }

                cell.redraw = false;
            }
        }
    }

    frameCount++;
}

function drawHighscores() {
}

function playClickSound() {
    if (enableSound) {
        buttonClick2Sound.load();
        buttonClick2Sound.play();
    }
}

function playSound(name) {
    var snd = new Audio(assetsPath + name);
    snd.play();
}

function startGame(m) {
    recordGamePlay();

    objects = new Array();
    overlay = new Array();
}

function addImageSet(images, baseName, count) {
    var i;
    var tmp;

    for (i = 1; i <= count; i++) {
        tmp = baseName + "_" + i;

        images[tmp] = tmp + ".png";
    }
}

function addImageSetJpeg(images, baseName, count) {
    var i;
    var tmp;

    for (i = 1; i <= count; i++) {
        tmp = baseName + "_" + i;

        images[tmp] = tmp + ".jpg";
    }
}

/* Event Handlers */
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
		var scrollY = f_scrollTop() * 1;
		var scrollX = f_scrollLeft() * 1;

		y += scrollY;
		x += scrollX;
	}
	
    handleClick(x, y);
}

function mouseMove(ev) {

	if(document.all){
		 var x=ev.x;
		 var y=ev.y;
	}else{
	    var x = ev.clientX;
	    var y = ev.clientY;
	    var scrollY = f_scrollTop() * 1;
	    var scrollX = f_scrollLeft() * 1;

	    y += scrollY;
	    x += scrollX;
	}
	
    handleMove(x, y);
}

function handleClick(x, y) {
    var curleft = 0;
    var curtop = 0;
    var obj = gameSurface;
    var i;

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    x -= curleft;
    y -= curtop;

    if (isIpad) {
        //alert(x + "," + y);
        
        y = (y + 224) * 0.5;
        x = (x + 146) * 0.5;

        //alert(x + "," + y);
    }

    if (inGame && y < bottomPanelY) {
        var gridX = Math.round((x + 39) / map.cellWidth);
        var gridY = Math.round((y + 39) / map.cellHeight);

        if (useTouch) {
            if (gunHover != null) {
                gunHover.redraw = 1;
                gunHover.setPosition(x, y);
                gunHover.setMarker(1);
            }
        }

        if (gunHover != null) {
            if (gunHover.showMarker == 1) {
                placeUnit();
            }
        }
        else {
            gridX = Math.round((x + 0) / map.cellWidth);
            gridY = Math.round((y + 0) / map.cellHeight);

            var cell = map.get(gridX, gridY);

            if (cell != null) {
                if (cell.content != null && gunSelected != cell.content) {
                    gunSelected = cell.content;
                }
                else {
                    gunSelected = null;
                }
            }
            else {
                gunSelected = null;
            }
        }
    }

    if (isGameOver) {
        quitButtonLarge.setSelected(quitButtonLarge.hitTest(x, y));
        retryButton.setSelected(retryButton.hitTest(x, y));

        if (quitButtonLarge.isSelected) {
            hideAd();
            beginFadeOut("qt");
        }
        if (retryButton.isSelected) {
            hideAd();
            beginFadeOut("bg");
        }
    }
    else if (inGame) {
        gameGun1.isMouseOver = gameGun1.hitTest(x, y);
        gameGun2.isMouseOver = gameGun2.hitTest(x, y);
        gameGun3.isMouseOver = gameGun3.hitTest(x, y);
        gameGun4.isMouseOver = gameGun4.hitTest(x, y);
        nextButton.setSelected(nextButton.hitTest(x, y));
        quitButton.setSelected(quitButton.hitTest(x, y));
    
        if (nextButton.isSelected) {
            nx();
        }
        if (quitButton.isSelected) {
            beginFadeOut("qt");
        }

        if (credits >= gun1Cost && gameGun1.isMouseOver) {
            gameGun1.isSelected = true;
            gameGun2.isSelected = false;
            gameGun3.isSelected = false;
            gameGun4.isSelected = false;
            pg(0);
        }
        if (credits >= gun2Cost && gameGun2.isMouseOver) {
            gameGun1.isSelected = false;
            gameGun2.isSelected = true;
            gameGun3.isSelected = false;
            gameGun4.isSelected = false;
            pg(1);
        }
        if (credits >= gun3Cost && gameGun3.isMouseOver) {
            gameGun1.isSelected = false;
            gameGun2.isSelected = false;
            gameGun3.isSelected = true;
            gameGun4.isSelected = false;
            pg(2);
        }
        if (credits >= gun4Cost && gameGun4.isMouseOver) {
            gameGun1.isSelected = false;
            gameGun2.isSelected = false;
            gameGun3.isSelected = false;
            gameGun4.isSelected = true;
            pg(3);
        }
    }
    else if (isLevSelect) {
        var sel;

        for (i = 0; i < levSelectButtons.length; i++) {
            sel = levSelectButtons[i].hitTest(x, y);

            if (levSelectButtons[i].isSelected != sel) {
                
                levSelectButtons[i].isSelected = sel;
                levSelectButtons[i].render(gameSurfaceContext);

                if (sel) {
                    levNo = i + 1;
                    beginFadeOut("bg");
                }
            }
        }
    }
    else {
        moreGamesButton.setSelected(moreGamesButton.hitTest(x, y));
        playButton.setSelected(playButton.hitTest(x, y));
        
        if (moreGamesButton.isSelected) {
            window.location = "http://goo.gl/zI6A";
        }
        if (playButton.isSelected) {
            beginFadeOut("sg");
        }
    }
}

function handleMove(x, y) {
    var curleft = 0;
    var curtop = 0;
    var obj = gameSurface;

    if (useTouch) {
        return;
    }

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    x -= curleft;
    y -= curtop;

    if (isGameOver) {
        quitButtonLarge.setMouseOver(quitButtonLarge.hitTest(x, y));
        retryButton.setMouseOver(retryButton.hitTest(x, y));
    }
    else if (inGame) {
        gameGun1.setMouseOver(gameGun1.hitTest(x, y));
        gameGun2.setMouseOver(gameGun2.hitTest(x, y));
        gameGun3.setMouseOver(gameGun3.hitTest(x, y));
        gameGun4.setMouseOver(gameGun4.hitTest(x, y));
        nextButton.setMouseOver(nextButton.hitTest(x, y));
        quitButton.setMouseOver(quitButton.hitTest(x, y));
    }
    else if (isLevSelect) {
        var sel;

        for (i = 0; i < levSelectButtons.length; i++) {
            sel = levSelectButtons[i].hitTest(x, y);

            if (levSelectButtons[i].isMouseOver != sel) {
                levSelectButtons[i].setMouseOver(sel);
                //levSelectButtons[i].isSelected = sel;
                //levSelectButtons[i].render(gameSurfaceContext);
            }
        }
    }
    else {
        moreGamesButton.setMouseOver(moreGamesButton.hitTest(x, y));
        playButton.setMouseOver(playButton.hitTest(x, y));
    }

    if (gunHover != null) {
        gunHover.setPosition(x, y);
        gunHover.setMarker(1);
    }
}

function canPlaceUnit() {
    if (gunHover != null) {
        if (gunHover.cost <= credits) {
            return true;
        }
    }

    return false;
}

function placeUnit() {
    gunHover.setMarker(0);
    turrets.push(gunHover);

    credits -= gunHover.cost;
    redrawScore = true;
    redrawGuns = true;

    gunHover = null;

    gameGun1.isSelected = false;
    gameGun2.isSelected = false;
    gameGun3.isSelected = false;
    gameGun4.isSelected = false;
}

function f_scrollLeft() {
    return window.pageXOffset;
}

function f_scrollTop() {
    return window.pageYOffset;
}

function GameVisual_Delete(source) {
    var i;

    for (i = overlay.length - 1; i >= 0; i--) {

        if (overlay[i] == source) {
            overlay.splice(i, 1);
            break;
        }
    }
}

function Turret_SelectTarget(source) {
    var i;

    for (i = 0; i < creeps.length; i++) {
        var dist = getDistanceBetweenPoints(source.x, source.y, creeps[i].x, creeps[i].y);

        if (dist < source.range) {
            source.enemy = creeps[i];

            if (Math.random() > 0.3) {
                return;
            }
        }
    }
    source.enemy = creeps[0];
}

function Turret_Fire(source) {
    var bullet = new Bullet();

    bullet.setTarget(source, source.enemy);
    bullet.setType(source.type);
    bullets.push(bullet);
}

function Creep_Killed(source) {
    score += source.value;
    score += source.earlyKillCounter;
    
    credits += source.value * 0.25;

    redrawScore = true;
    redrawGuns = true;
}

function Creep_HitTower(source) {
    source.killedBase = true;
    source.destroy(25);

    lives--;
    redrawLives = true;

    if (lives <= 0) {
        showGameOver(false);
    }
}

function Wave_Spawn(source) {
    var creep = new Creep();
    creeps.push(creep);
    creep.setType(source.type);
    creep.defense = source.defense;
    creep.speed = source.speed + (Math.random() * 4);
    setCreepPath(creep);
}

function Wave_End(source) {
    waves.splice(0, 1);

    waveNo++;
    if (waves.length > 0) {
        setWaveText(waveNo);
    }
}

/* Useful functions */
function ArrayRemove(array, item) {
    var i = ArrayIndexOf(array, item);

    if (i >= 0) {
        array.splice(i, 1);
    }
}

function ArrayContains(array, item) {
    if (ArrayIndexOf(array, item) >= 0) {
        return true;
    }
    else {
        return false;
    }
}

function ArrayIndexOf(array, item) {
    var result = -1;
    var i;

    for (i = 0; i < array.length; i++) {
        if (array[i] == item) {
            result = i;
            break;
        }
    }

    return result;
}

function ArrayIndexOfById(array, id) {
    var result = -1;
    var i;

    for (i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            result = i;
            break;
        }
    }

    return result;
}

function DegToRad(d) {
    return d * 0.0174532925199432957;
}

function RadToDeg(r) {
    return (180 / Math.PI) * r;
}

function GetRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function pad(number, length) {

    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;

}

function clearTrace() {
    //document.getElementById("output").innerHTML = "";
}

function calculateDifferenceBetweenAngles(firstAngle, secondAngle) {
    var difference = secondAngle - firstAngle;

    while (difference < -180)
    {
        difference += 360;
    }
    while (difference > 180)
    {
        difference -= 360;
    }

    return difference;
}

function getDistanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function calculateAngle(p1, p2) {
    var ACoords = new Array();
    var result = 0;

    ACoords.push(p2.y - p1.y);
    ACoords.push(p2.x - p1.x);

    if (ACoords[0] == 0)
    {
        ACoords[0] = 0.00000001;
    }
    if (ACoords[1] == 0)
    {
        ACoords[1] = 0.00000001;
    }

    result = Math.atan(ACoords[0] / ACoords[1]) + (Math.PI * 0.5);

    if (ACoords[1] < 0)
    {
        result = result + Math.PI;
    }

    return RadToDeg(result);
}

function getDirectionBetweenPoints(p1x, p1y, p2x, p2y) {
    var offsetX = p2x - p1x;
    var offsetY = p2y - p1y;
    var dist = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));

    return new Point2(offsetX / dist, offsetY / dist);
}

function writeTrace(o) {
    //o = tick + ": " + o;
    //document.getElementById("output").innerHTML = document.getElementById("output").innerHTML + o + "<br />";
}



/* Image Manager */
function ImageManager() {
    this.baseURL = "";
    this.images = {};
    this.toLoadCount = 0;
    this.loadedCount = 0;
    this.loaded = false;

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
    this.transformedPoints = new Array();
    this.direction = new Point2();
    this.speedMod = 1;
    this.opacity = 1;
    this.redraw = 0;
    this.lastDrawnX = 0;
    this.lastDrawnY = 0;
    this.removeNextFrame = false;

    this.setOpacity = function(value) {
        if (value != this.opacity) {
            this.redraw = 2;
        }
        else {
            this.redraw = 0;
        }
        this.opacity = value;
    }

    this.setX = function(value) {
        this.x = value;
    }

    this.setY = function(value) {
        this.y = value;
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

    this.setGridPosition = function(valueX, valueY) {
        this.x = (valueX * map.cellWidth) - 39;
        this.y = (valueY * map.cellHeight) - 39;
    }
    
    this.setPosition = function(valueX, valueY) {
        this.x = valueX;
        this.y = valueY;
    }

    // End Getters/Setters

    this.load = function(baseImage, count, delay) {
        var i, a;
        var tmp;

        for (i = 1; i <= count; i++) {
            tmp = baseImage + "_" + i;

            this.width = imageManager.images[tmp].width;
            this.height = imageManager.images[tmp].height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;

            for (a = 0; a < delay; a++) {
                this.frames.push(imageManager.images[tmp]);
            }
        }
    }

    this.render = function(context) {
        context.drawImage(this.frames[this.currentFrame], this.x, this.y);

        this.lastDrawnX = this.x;
        this.lastDrawnY = this.y;
    }

    this.update = function() {
        this.currentFrame++;
        if (this.currentFrame >= this.frames.length) {
            if (this.repeat) {
                this.currentFrame = 0;
            }
            else {
                this.animationComplete();
            }
        }
    }

    this.animationComplete = function() {
    }

    this.remove = function() {
        this.redraw = 2;
        GameVisual_Delete(this);
    }

    this.getCurrentImage = function() {
        return this.frames[this.currentFrame];
    }

    this.hitTest = function(x, y) {
        if (x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height) {
            return true;
        }
        else {
            return false;
        }
    }
}

function ComplexGameVisual() {
    this.inheritFrom = GameVisual;
    this.inheritFrom();

    this.rotate = 0;

    this.render = function(context) {
        context.save();
        context.globalAlpha = this.opacity;
        context.translate(this.x + this.halfWidth, this.y + this.halfHeight);
        context.rotate(DegToRad(this.rotate));
        context.translate(-this.halfWidth, -this.halfHeight);
        context.drawImage(this.frames[this.currentFrame], 0, 0);
        context.restore();
    }

    this.baseUpdate = this.update;
    this.update = function() {
        this.baseUpdate();
    }
}

/* Turret */
function Turret() {
    this.inheritFrom = ComplexGameVisual;
    this.inheritFrom();

    this.baseColor = "#f0f0f0";
    this.baseRadius = 12;
    this.gunColor = "#222222";
    this.markerColor = "";

    this.rotate = 0;
    this.enemy = null;
    this.range = 100;
    this.targetAngle = 0;
    this.turningSpeedX = 4;

    this.nextFireTick = 0;
    this.fireDelay = 10;

    this.showMarker = 0;
    this.markerX = 0;
    this.markerY = 0;

    this.cost = 100;
    this.type = 0;
    this.currentPulse = 0;

    this.placedGridX = 0;
    this.placedGridY = 0;

    this.setType = function(type) {
        this.type = type;

        switch (type) {
            case 0:
                this.baseColor = "#c0f0c0";
                this.baseRadius = 10;
                this.gunColor = "#002000";

                this.cost = gun1Cost;
                this.range = 70;
                this.turningSpeedX = 8;
                this.fireDelay = 9;
                break;
            case 1:
                this.baseColor = "#f0f0f0";
                this.baseRadius = 10;
                this.gunColor = "#222222";

                this.cost = gun2Cost;
                this.range = 90;
                this.turningSpeedX = 7;
                this.fireDelay = 8;
                break;
            case 2:
                this.baseColor = "#aaaaaa";
                this.baseRadius = 12;
                this.gunColor = "#222222";

                this.cost = gun3Cost;
                this.range = 110;
                this.turningSpeedX = 8;
                this.fireDelay = 6;
                break;
            case 3:
                this.baseColor = "#aaaaaa";
                this.baseRadius = 12;
                this.gunColor = "#222222";

                this.cost = gun4Cost;
                this.range = 140;
                this.turningSpeedX = 12;
                this.fireDelay = 4;
                break;
            default:
                break;
        }
    }

    this.setMarker = function(type) {
        var gridX = Math.round((this.x + 39) / map.cellWidth);
        var gridY = Math.round((this.y + 39) / map.cellHeight);

        this.showMarker = type;

        if (type != 0) {
            this.markerX = (gridX - 2) * map.cellWidth;
            this.markerY = (gridY - 2) * map.cellHeight;

            var cell = map.get(gridX, gridY);
            if (cell.type == 0 && canPlaceUnit()) {
                this.showMarker = 1;
                this.markerColor = "#008800";
            }
            else {
                this.showMarker = 2;
                this.markerColor = "#ff0000";
            }
        }
        else {
            this.placedGridX = gridX;
            this.placedGridY = gridY;

            this.setPosition(this.markerX + 13, this.markerY + 13);

            var cell = map.get(gridX, gridY);
            cell.type = 2;
            cell.content = this;
            cell.subType = 4 + this.type;
            cell.redraw = 1;
        }
    }

    this.renderSelected = function(context) {
        context.save();

        context.beginPath();
        context.arc(this.x, this.y, this.range, 0, Math.PI * 2, false);
        context.closePath();

        context.strokeStyle = "#e0e0e0";
        context.lineWidth = 1;
        context.stroke();

        if (this.currentPulse >= 0) {
            if (this.currentPulse > this.range - 20) {

                context.globalAlpha = (20 - (this.currentPulse - (this.range - 20))) * 0.05;
            }

            context.beginPath();
            context.arc(this.x, this.y, this.currentPulse, 0, Math.PI * 2, false);
            context.closePath();

            context.strokeStyle = "#d0d0d0";
            context.lineWidth = 1;
            context.stroke();

            context.globalAlpha = 1;
        }

        this.currentPulse+= 2;

        if (this.currentPulse >= this.range) {
            this.currentPulse = -10;
        }

        context.restore();
    }

    this.render = function(context) {
        if (this.redraw == 0) {
            return;
        }

        context.save();

        if (this.showMarker != 0) {
            context.globalAlpha = 0.3;
            context.fillStyle = this.markerColor;
            context.fillRect(this.markerX, this.markerY, 26, 26);
            context.globalAlpha = 1;

            context.beginPath();
            context.arc(this.x, this.y, this.range, 0, Math.PI * 2, false);
            context.closePath();

            context.strokeStyle = this.markerColor;
            context.lineWidth = 1;
            context.stroke();
        }
        else {
            switch (this.type) {
                case 0:
                    context.translate(this.x, this.y);
                    context.rotate(DegToRad(this.rotate - 90));
                    context.translate(0, -2);

                    context.fillStyle = this.gunColor;
                    context.fillRect(0, 0, 10, 4);
                    break;
                case 1:
                    context.translate(this.x, this.y);
                    context.rotate(DegToRad(this.rotate - 90));
                    context.translate(0, -3);

                    context.fillStyle = this.gunColor;
                    context.fillRect(0, 0, 11, 6);
                    break;
                case 2:
                    context.translate(this.x, this.y);
                    context.rotate(DegToRad(this.rotate - 90));
                    context.translate(0, -4);

                    context.fillStyle = this.gunColor;
                    context.fillRect(0, 0, 11, 8);
                    break;
                case 3:
                    context.translate(this.x, this.y);
                    context.rotate(DegToRad(this.rotate - 90));
                    context.translate(0, -3);

                    context.fillStyle = this.gunColor;
                    context.fillRect(0, 0, 11, 6);
                    break;
            }
        }

        context.restore();

        this.redraw = 0;
    }

    this.update = function() {
        var rd = false;

        if (this.enemy != null) {
            if (this.enemy.isDead) {
                this.enemy = null;
                return;
            }
            var dist = getDistanceBetweenPoints(this.x, this.y, this.enemy.x, this.enemy.y);

            if (dist >= this.range) {
                this.enemy = null;
                return;
            }

            this.targetAngle = calculateAngle(new Point2(this.x, this.y), new Point2(this.enemy.x, this.enemy.y));

            var angleDiff = calculateDifferenceBetweenAngles(this.rotate, this.targetAngle);

            if (angleDiff > this.turningSpeedX) {
                this.rotate += this.turningSpeedX;
                rd = true;
            }
            else if (angleDiff < -this.turningSpeedX) {
                this.rotate -= this.turningSpeedX;
                rd = true;
            }
            else {
                this.rotate = this.targetAngle;
                rd = true;
                if (this.nextFireTick == 0) {
                    Turret_Fire(this);
                    this.nextFireTick = this.fireDelay;
                }
            }

            if (rd) {
                // map.invalidate1x1(this.x - 52, this.y - 52);
                map.grid[this.placedGridX][this.placedGridY].redraw = true;
            }
        }
        else {
            Turret_SelectTarget(this);
        }

        if (this.nextFireTick > 0) {
            this.nextFireTick-= 1;
        }
    }
}

/* Creep */
function Creep() {
    this.stepX = 0;
    this.stepY = 0;
    this.speed = 8;
    
    this.inheritFrom = GameVisual;
    this.inheritFrom();

    this.baseColor = "#ff0000";
    this.hpOutlineColor = "#ffffff";
    this.hpFillColor = "#0088bb";
    this.explosionColor = "#ffff00";

    this.baseRadius = 8;
    this.maxBlastRadius = 10;
    this.blastThickness = 5;

    this.path = null;

    this.earlyKillCounter = 200;
    this.value = 100;
    this.defense = 0.4;
    this.hp = 1;

    this.OffsetHP = new Point2(-8, -12);
    this.OffsetHPContent = new Point2(-7, -11);

    this.isDead = false;
    this.runningExplosion = false;
    this.explosionRadius = 1;
    this.explosionOpacity = 1;
    this.explosionOpacityStep = 0.1;

    this.type = 0;
    this.killedBase = false;

    this.setType = function(type) {
        this.type = type;

        switch (type) {
            case 0:
                this.baseColor = "#ff0000";
                this.explosionColor = "#ffff00";

                this.OffsetHP = new Point2(-8, -12);
                this.OffsetHPContent = new Point2(-7, -11);

                this.value = 120;

                this.baseRadius = 8;
                this.maxBlastRadius = 10;
                this.blastThickness = 5;

                this.speed = 6 + (Math.random() * 4);
                break;
            case 1:
                this.baseColor = "#338833";
                this.explosionColor = "#aaffaa";

                this.OffsetHP = new Point2(-8, -12);
                this.OffsetHPContent = new Point2(-7, -11);

                this.value = 160;

                this.baseRadius = 8;
                this.maxBlastRadius = 10;
                this.blastThickness = 5;

                this.speed = 9 + (Math.random() * 3);
                break;
            default:
                break;
        }
    }

    this.render = function(context) {
        context.save();
        context.globalAlpha = this.explosionOpacity;
        context.beginPath();
        context.arc(this.x, this.y, this.explosionRadius, 0, Math.PI * 2, false);
        context.closePath();

        context.strokeStyle = this.explosionColor;
        context.lineWidth = this.blastThickness;
        context.stroke();
        context.globalAlpha = 1;
        context.restore();
    }

    this.setPath = function(path) {
        var i;
        
        this.path = new Array();
        
        for(i=0; i<path.length; i++) {
            this.path.push(path[i]);
        }

        if (this.path.length > 0) {
            this.setPosition(this.path[0].x, this.path[0].y);

            if (this.path.length > 1) {
                this.stepX = (this.path[1].x - this.x) * 0.01;
                this.stepY = (this.path[1].y - this.y) * 0.01;
            }
        }

        if (this.path.length > 1) {
            this.path.splice(0, 1);
        }
    }

    this.hit = function(source) {
        this.hp -= (source.strength * this.defense);

        if (this.hp < 0) {
            if (!this.isDead) {
                Creep_Killed(this);
            }

            this.destroy(10);
        }
    }

    this.destroy = function(radius) {
        if (!this.runningExplosion) {
            this.hp = 0;
            this.isDead = true;
            this.maxBlastRadius = radius;
            this.blastThickness = radius * 0.5;

            this.runningExplosion = true;
            this.explosionRadius = 1 + (radius - 10);
            this.explosionOpacity = 1;

            this.explosionOpacityStep = 1 / (radius - this.explosionRadius + 1);
        }
    }

    this.update = function() {
        if (!this.runningExplosion) {
            map.invalidate2x2PathOnly(this.x - (this.baseRadius + 8), this.y - (this.baseRadius + 6));

            this.x += this.stepX * this.speed;
            this.y += this.stepY * this.speed;

            if (this.x >= this.path[0].x - 3 && this.x < this.path[0].x + 3 && this.y >= this.path[0].y - 3 && this.y < this.path[0].y + 3) {
                this.setPosition(this.path[0].x, this.path[0].y);

                if (this.path.length > 1) {
                    this.path.splice(0, 1);
                    this.stepX = (this.path[0].x - this.x) * 0.01;
                    this.stepY = (this.path[0].y - this.y) * 0.01;
                }
                else {
                    Creep_HitTower(this);
                }
            }

            this.earlyKillCounter--;
            if (this.earlyKillCounter < 0) {
                this.earlyKillCounter = 0;
            }
        }
        else {
            if (this.killedBase) {
                map.invalidate4x2ByGridY(this.x - 39, 15);
            }
            else {
                map.invalidate2x2PathOnly(this.x - (this.baseRadius + 4), this.y - (this.baseRadius + 6));
            }

            this.explosionRadius += 1;
            this.explosionOpacity -= this.explosionOpacityStep;

            if (this.explosionRadius > this.maxBlastRadius) {
                this.runningExplosion = false;
                this.removeNextFrame = true;
            }
        }
    }
}

/* Bullet */
function Bullet() {
    this.speed = 4;
    this.strength = 0.3;

    this.inheritFrom = GameVisual;
    this.inheritFrom();

    this.baseColor = "#404040";
    this.baseRadius = 2;

    this.target = null;

    this.setType = function(type) {
        switch (type) {
            case 0:
                this.speed = 4;
                this.strength = 0.25;
                this.baseColor = "#404040";
                this.baseRadius = 2;
                break;
            case 1:
                this.speed = 4;
                this.strength = 0.3;
                this.baseColor = "#00a000";
                this.baseRadius = 4;
                break;
            case 2:
                this.speed = 4;
                this.strength = 0.35;
                this.baseColor = "#e0e020";
                this.baseRadius = 6;
                break;
            case 3:
                this.speed = 4;
                this.strength = 0.25;
                this.baseColor = "#20e0f0";
                this.baseRadius = 5;
                break;
        }
    }

    this.setTarget = function(source, target) {
        this.target = target;
        var direction = getDirectionBetweenPoints(source.x, source.y, target.x, target.y);
        
        this.setPosition(source.x + (direction.x * 16), source.y + (direction.y * 16));
    }

    this.update = function() {
        //map.invalidate2x2(this.x - this.baseRadius, this.y - this.baseRadius);
        var gridX;
        var gridY;

        gridX = Math.round((this.x + 39 - this.baseRadius) / map.cellWidth);
        gridY = Math.round((this.y + 39 - this.baseRadius) / map.cellHeight);
        map.grid[gridX][gridY].redraw = true;
        gridX = Math.round((this.x + 39 + this.baseRadius) / map.cellWidth);
        gridY = Math.round((this.y + 39 - this.baseRadius) / map.cellHeight);
        map.grid[gridX][gridY].redraw = true;
        gridX = Math.round((this.x + 39 - this.baseRadius) / map.cellWidth);
        gridY = Math.round((this.y + 39 + this.baseRadius) / map.cellHeight);
        map.grid[gridX][gridY].redraw = true;
        gridX = Math.round((this.x + 39 + this.baseRadius) / map.cellWidth);
        gridY = Math.round((this.y + 39 + this.baseRadius) / map.cellHeight);
        map.grid[gridX][gridY].redraw = true;

        var diffX = (this.target.x - this.x) * 0.1;
        var diffY = (this.target.y - this.y) * 0.1;

        if (diffX < -2 || diffX > 2 || diffY < -2 || diffY > 2) { diffX *= 0.5; diffY *= 0.5; }
        if ((diffX > -0.5 && diffX < 0.5) || diffY > -0.5 && diffY < 0.5) { diffX *= 2; diffY *= 2; }

        this.y += diffY * this.speed;
        this.x += diffX * this.speed;

        if (this.x >= this.target.x - 10 && this.x < this.target.x + 10 && this.y >= this.target.y - 10 && this.y < this.target.y + 10) {
            this.target.hit(this);
            this.removeNextFrame = true;
        }
    }
}

/* Explosion */
function Explosion() {
    this.inheritFrom = GameVisual;
    this.inheritFrom();

    this.animationComplete = function() {
        this.remove();
    }
}

/* Game Button */
function GameButton() {
    this.inheritFrom = GameVisual;
    this.inheritFrom();
    this.opacityDir = -0.02;
    this.isMouseOver = false;
    this.isSelected = false;
    this.content = "";
    this.fontSize = 14;
    this.ignoreHover = false;

    this.reset = function() {
        this.isSelected = false;
        this.isMouseOver = false;
    }

    this.setMouseOver = function(state) {
        if (state != this.isMouseOver) {
            this.isMouseOver = state;
            if (!this.ignoreHover) {
                this.render(gameSurfaceContext);
            }
        }

        this.isMouseOver = state;
    }

    this.setSelected = function(state) {
        if (state != this.isSelected) {
            this.isSelected = state;
            if (!this.ignoreHover) {
                this.render(gameSurfaceContext);
            }
        }

        this.isSelected = state;
    }

    this.render = function(context) {
        if (fadeOutOpacity > 0) {
            return;
        }
        
        context.save();

        context.globalAlpha = this.opacity;

        if (this.content != "") {
            var textSize = get_textWidth(this.content, this.fontSize);
            var textHeight = get_textHeight(this.fontSize);

            if (!this.ignoreHover && this.isMouseOver) {
                context.fillStyle = "#F0F1F1";
                context.strokeStyle = "#595140";
            }
            else {
                context.fillStyle = "#D0D1D1";
                context.strokeStyle = "#494130";
            }

            context.fillRect(this.x, this.y, this.width, this.height);
            context.strokeText(this.content, this.x + ((this.width - textSize) * 0.5), this.y + ((this.height - textHeight) * 0.5), this.fontSize);
        }
        else {
            context.drawImage(this.frames[this.currentFrame], this.x, this.y);
        }

        context.lineWidth = 2;

        if (this.isSelected) {
            context.strokeStyle = "#F51801";
        }
        else if (this.isMouseOver) {
            context.strokeStyle = "#9F9FA1";
        }
        else {
            context.strokeStyle = "#8F8F91";
        }

        context.strokeRect(this.x, this.y, this.width, this.height);

        context.globalAlpha = 1;
        context.restore();
    }
}

/* Level Select Button */
function LevelSelectButton() {
    this.inheritFrom = GameVisual;
    this.inheritFrom();
    this.opacityDir = -0.02;
    this.isMouseOver = false;
    this.isSelected = false;
    this.number = 0;

    this.setMouseOver = function(state) {
        if (state != this.isMouseOver) {
            this.isMouseOver = state;
            this.render(gameSurfaceContext);
        }

        this.isMouseOver = state;
    }

    this.render = function(context) {
        if (fadeOutOpacity > 0) {
            return;
        }
    
        context.drawImage(imageManager.images["thumb" + this.number + "_1"], this.x + 1, this.y + 1);

        context.lineWidth = 2;

        if (this.isSelected) {
            context.strokeStyle = "#F51801";
        }
        else if (this.isMouseOver) {
            context.strokeStyle = "#ffff00";
        }
        else {
            context.strokeStyle = "#cccccc";

        }
        context.strokeRect(this.x, this.y, 96, 111);
    }
}

/* Highscore Result */
function Highscore(user, score) {
    this.user = user;
    this.score = score;
}

/* Path Finding Map */
function PathFindingMap() {
    this.cellWidth = 26;
    this.cellHeight = 26;
    this.width = 16;
    this.height = 18;
    this.grid = null;

    this.setup = function() {
        var i;
        this.grid = new Array(this.width);

        for (i = 0; i < this.width; i++) {
            this.grid[i] = new Array(this.height);
        }
    }

    this.get = function(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return new CellContent();
        }

        return this.grid[x][y];
    }

    this.set = function(x, y, cellContent) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }

        if (cellContent.content != null) {
            cellContent.subType = cellContent.content.type + 4;
        }
        else if (x == 1) {
            if (y == 1) {
                cellContent.subType = 3;
            }
            else {
                cellContent.subType = 1;
            }
        }
        else if (y == 1) {
            cellContent.subType = 2;
        }
        else {
            cellContent.subType = 0;
        }

        this.grid[x][y] = cellContent;
    }

    this.setEmpty = function(x, y) {
        var cell = new CellContent();

        cell.type = 0;
        cell.redraw = true;
        this.set(x, y, cell);
    }

    this.setPath = function(x, y) {
        var cell = new CellContent();

        cell.type = 1;
        cell.redraw = true;
        this.set(x, y, cell);
    }

    this.FindPath = function(x, y, targetX, targetY) {
        var openList = new Array();
        var closedList = new Array();
        var temp;
        var current = new CellRef();
        var lowestFCost;
        var result = null;
        var i;

        current.Fill(null, (y * this.width) + x, x, y, 0, 0);

        openList.push(current);

        while (current != null) {
            lowestFCost = 999999;
            current = null;

            for (i = 0; i < openList.length; i++) {
                if (openList[i].FCost() <= lowestFCost) {
                    lowestFCost = openList[i].FCost();
                    current = openList[i];
                }
            }

            if (current == null) {
                break;
            }

            i = this.IndexOfCell(openList, current.Index);
            if (i >= 0) {
                openList.splice(i, 1);
            }
            closedList.push(current);

            if (current.X == targetX && current.Y == targetY) {
                result = current;
                break;
            }

            temp = this.GetCell(current, current.X - 1, current.Y - 1, 14, targetX, targetY, current.X - 0, current.Y - 1, current.X - 1, current.Y - 0);
            if (temp != null && !this.ConstainsCell(closedList, temp.Index)) {
            if (!this.ConstainsCell(openList, temp.Index)) {
            openList.push(temp);
            }
            else {
            this.DetermineBest(this.GetCellAtIndex(openList, temp.Index), temp);
            }
            }

            temp = this.GetCell(current, current.X - 0, current.Y - 1, 10, targetX, targetY, -1, -1, -1, -1);
            if (temp != null && !this.ConstainsCell(closedList, temp.Index)) {
            if (!this.ConstainsCell(openList, temp.Index)) {
            openList.push(temp);
            }
            else {
            this.DetermineBest(this.GetCellAtIndex(openList, temp.Index), temp);
            }
            }

            temp = this.GetCell(current, current.X + 1, current.Y - 1, 14, targetX, targetY, current.X + 0, current.Y - 1, current.X + 1, current.Y - 0);
            if (temp != null && !this.ConstainsCell(closedList, temp.Index)) {
            if (!this.ConstainsCell(openList, temp.Index)) {
            openList.push(temp);
            }
            else {
            this.DetermineBest(this.GetCellAtIndex(openList, temp.Index), temp);
            }
            }

            temp = this.GetCell(current, current.X - 1, current.Y - 0, 10, targetX, targetY, -1, -1, -1, -1);
            if (temp != null && !this.ConstainsCell(closedList, temp.Index)) {
            if (!this.ConstainsCell(openList, temp.Index)) {
            openList.push(temp);
            }
            else {
            this.DetermineBest(this.GetCellAtIndex(openList, temp.Index), temp);
            }
            }

            temp = this.GetCell(current, current.X + 1, current.Y - 0, 10, targetX, targetY, -1, -1, -1, -1);
            if (temp != null && !this.ConstainsCell(closedList, temp.Index)) {
            if (!this.ConstainsCell(openList, temp.Index)) {
            openList.push(temp);
            }
            else {
            this.DetermineBest(this.GetCellAtIndex(openList, temp.Index), temp);
            }
            }

            temp = this.GetCell(current, current.X - 1, current.Y + 1, 14, targetX, targetY, current.X - 1, current.Y + 0, current.X - 0, current.Y + 1);
            if (temp != null && !this.ConstainsCell(closedList, temp.Index)) {
            if (!this.ConstainsCell(openList, temp.Index)) {
            openList.push(temp);
            }
            else {
            this.DetermineBest(this.GetCellAtIndex(openList, temp.Index), temp);
            }
            }

            temp = this.GetCell(current, current.X - 0, current.Y + 1, 10, targetX, targetY, -1, -1, -1, -1);
            if (temp != null && !this.ConstainsCell(closedList, temp.Index)) {
                if (!this.ConstainsCell(openList, temp.Index)) {
                    openList.push(temp);
                }
                else {
                    this.DetermineBest(this.GetCellAtIndex(openList, temp.Index), temp);
                }
            }

            temp = this.GetCell(current, current.X + 1, current.Y + 1, 14, targetX, targetY, current.X + 1, current.Y + 0, current.X + 0, current.Y + 1);
            if (temp != null && !this.ConstainsCell(closedList, temp.Index)) {
                if (!this.ConstainsCell(openList, temp.Index)) {
                    openList.push(temp);
                }
                else {
                    this.DetermineBest(this.GetCellAtIndex(openList, temp.Index), temp);
                }
            }
        }

        return result;
    }

    this.GetCellAtIndex = function(cells, index) {
        var i = this.IndexOfCell(cells, index);

        if (i >= 0)
        {
            return cells[i];
        }
        else
        {
            return null;
        }
    }

    this.ConstainsCell = function(cells, index) {
        return this.IndexOfCell(cells, index) >= 0;
    }

    this.IndexOfCell = function(cells, index) {
        var result = -1;
        var i;

        for (i = 0; i < cells.length; i++)
        {
            if (cells[i].Index == index)
            {
                result = i;
                break;
            }
        }

        return result;
    }
    
    this.DetermineBest = function(existingCell, newCell) {
        if (newCell.GCost < existingCell.GCost)
        {
            existingCell.Parent = newCell.Parent;
            existingCell.GCost = newCell.GCost;
        }
    }

    this.GetCell = function(parent, x, y, gCost, targetX, targetY, dep1x, dep1y, dep2x, dep2y) {
        var canWalk = (x == targetX && y == targetY) || this.IsCellWalkable(x, y);

        if (canWalk) {
            if (dep1x >= 0) {
                if (!this.IsCellWalkable(dep1x, dep1y) || !this.IsCellWalkable(dep2x, dep2y)) {
                    return null;
                }
            }
            var xDiff = targetX - x;
            var yDiff = targetY - y;

            if (xDiff < 0) {
                xDiff = -xDiff;
            }
            if (yDiff < 0) {
                yDiff = -yDiff;
            }

            var newCell = new CellRef();
            newCell.Fill(parent, (y * this.width) + x, x, y, gCost + (parent != null ? parent.GCost : 0), (xDiff + yDiff) * 10);
            
            return newCell;
        }
        else {
            return null;
        }
    }

    this.IsCellWalkable = function(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }

        return this.grid[x][y].type == 1;
    }

    this.invalidate = function(x, y, width, height) {
        var gridX = Math.floor(x / this.cellWidth);
        var gridY = Math.floor(y / this.cellHeight);
        var gridWidth = width / this.cellWidth;
        var gridHeight = height / this.cellHeight;
        var i;
        var a;

        //alert(gridX + "," + gridY + " - " + gridWidth + "," + gridHeight);

        for (i = gridY; i < gridY + gridHeight; i++) {
            for (a = gridX; a < gridX + gridWidth; a++) {
                if (i >= 0 && i < this.height && a >= 0 && a < this.width) {
                    this.grid[a][i].redraw = true;
                }
            }
        }
    }

    this.invalidate1x1 = function(x, y) {
        var gridX = Math.floor(x / this.cellWidth) + 2;
        var gridY = Math.floor(y / this.cellHeight) + 2;

        this.grid[gridX][gridY].redraw = true;
    }

    this.invalidate2x2 = function(x, y) {
        var gridX = Math.floor(x / this.cellWidth) + 2;
        var gridY = Math.floor(y / this.cellHeight) + 2;

        this.grid[gridX][gridY].redraw = true;
        this.grid[gridX + 1][gridY].redraw = true;
        this.grid[gridX][gridY + 1].redraw = true;
        this.grid[gridX + 1][gridY + 1].redraw = true;
    }

    this.invalidate2x2PathOnly = function(x, y) {
        var gridX = Math.floor(x / this.cellWidth) + 2;
        var gridY = Math.floor(y / this.cellHeight) + 2;

        if (this.grid[gridX][gridY].type == 1) {
            this.grid[gridX][gridY].redraw = true;
        }
        if (this.grid[gridX + 1][gridY].type == 1) {
            this.grid[gridX + 1][gridY].redraw = true;
        }
        if (this.grid[gridX][gridY + 1].type == 1) {
            this.grid[gridX][gridY + 1].redraw = true;
        }
        if (this.grid[gridX + 1][gridY + 1].type == 1) {
            this.grid[gridX + 1][gridY + 1].redraw = true;
        }
    }

    this.invalidate4x2 = function(x, y) {
        var gridX = Math.floor(x / this.cellWidth) + 2;
        var gridY = Math.floor(y / this.cellHeight) + 2;

        this.grid[gridX][gridY].redraw = true;
        this.grid[gridX + 1][gridY].redraw = true;
        this.grid[gridX + 2][gridY].redraw = true;
        this.grid[gridX + 3][gridY].redraw = true;
        this.grid[gridX][gridY + 1].redraw = true;
        this.grid[gridX + 1][gridY + 1].redraw = true;
        this.grid[gridX + 2][gridY + 1].redraw = true;
        this.grid[gridX + 3][gridY + 1].redraw = true;
    }

    this.invalidate4x2ByGridY = function(x, gridY) {
        var gridX = Math.floor(x / this.cellWidth) + 2;

        this.grid[gridX][gridY].redraw = true;
        this.grid[gridX + 1][gridY].redraw = true;
        this.grid[gridX + 2][gridY].redraw = true;
        this.grid[gridX + 3][gridY].redraw = true;
        this.grid[gridX][gridY + 1].redraw = true;
        this.grid[gridX + 1][gridY + 1].redraw = true;
        this.grid[gridX + 2][gridY + 1].redraw = true;
        this.grid[gridX + 3][gridY + 1].redraw = true;
    }
}

/* CellRef */
function CellRef() {
    this.Index = 0;
    this.X = 0;
    this.Y = 0;
    this.Parent = null;
    this.GCost = 0;
    this.HCost = 0;

    this.FCost = function() {
        return this.GCost + this.HCost;
    }

    this.Fill = function(parent, index, xValue, yValue, gCost, hCost) {
        this.Parent = parent;
        this.Index = index;
        this.X = xValue;
        this.Y = yValue;
        this.GCost = gCost;
        this.HCost = hCost;
    }

    this.GetPath = function() {
        var results = new Array();
        var current = this;

        while (current != null) {
            results.push(current);
            current = current.Parent;
        }

        results.reverse();

        return results;
    }
}

/* Point2 */
function Point2(xValue, yValue) {
    this.x = xValue;
    this.y = yValue;
}

function Rect() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
}

/* CellContent */
// Types:
// 0 = Empty
// 1 = Path
function CellContent() {
    this.type = 0;
    this.content = null;
    this.subType = 0;
    this.redraw = false;
}

function Wave(t, qty, ticks, defense, speed) {
    this.type = t;
    this.quantity = qty;
    this.ticksBetween = ticks;
    this.defense = defense;
    this.speed = speed;

    this.ticks = 0;

    if (levNo == 4 || levNo == 5) {
        //this.quantity += 10;
        this.ticksBetween -= 1;
        this.speed += 0.5;

        if (this.defense > 1) {
            this.defense -= 0.5;
        }
        else if (this.defense > 0.5) {
            this.defense -= 0.2;
        }
    }

    if (levNo == 2) {
        if (this.defense > 1) {
            this.defense -= 0.4;
            this.speed += 0.5;
        }
        else if (this.defense > 0.5) {
            this.defense -= 0.15;
            this.speed += 1;
        }
    }

    this.update = function() {
        if (this.ticks == 0) {
            this.ticks = this.ticksBetween;
            Wave_Spawn(this);
            this.quantity--;
            if (this.quantity <= 0) {
                Wave_End(this);
            }
        }
        else {
            this.ticks--;
        }
    }
}
