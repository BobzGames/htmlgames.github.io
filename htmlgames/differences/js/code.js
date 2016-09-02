//
// DAPI(c) 3.7
// -----------
// goo.gl/zI6A
//

var HINTS_LEFT = 1; // num hints per level. Also hides ids with same name + hints_left value
var CORRECT = 50; // +score clicked
var WRONG = 10; // -score clicked
var HINT = 50; // -score clicked
var COMPLETED = 100; // +score levelup
var BONUS = 500; // +score (bonus)
var BONUS_MSG = "<b>Bonus!</b>";
var WRONG_MSG = (not2player()) ? "<span class='wrong1'>-" + WRONG.toString() + "</span>" : "<span class='wrong2'>-1</span>";
var DRAW_MSG = "Both Players";
var WAIT_MSG = "Click to Continue";
var WIN_MSG = "Level Completed";
var WIN2_MSG = "Level Completed ^ Winning"; // use ^ for player name
var WIN_HTML = "<h2><i><b><span class='completed' id='w'>WIN_MSG</span></b><span id='s'></span></i></h2>";

var GAP = "<br />Score: "; // gap separator for 2 player name/score display
var TIMER = 79; // level timer: suggest make length of music (in secs)
var TIME = (TIMER + 1) * 32; // timeout for next level to load...
var TIMEUP = "timeup.html"; // page to goto when times up. Within page, set to "#" to do nothing or "" to reload level
var TIMEPLUS = 10; // time found!
var ZEROPOINTS = ""; // page loaded when score < 0
var A_PATH = "audio/";
var A_MUSIC = "music.wav"; // background music
var A_CORRECT = "correct.wav";
var A_WRONG = "wrong.wav";
var A_HINT = "hint.wav"
var A_COMPLETED = "completed.wav";
var A_BONUS = "bonus.wav";

var AUDIO_EXT = ".wav"; // or .mp3 etc
var LOUPE_EXT = ".gif"; // or .png etc
var MAXCLICKS = -1; // num clicks before MAX_CLICK() called (-1 = disable)
var CHEATING = 0; // -score if cclick = 0 (cheating)
var WAIT = false; // automatically move onto next level
var KEYHINT = true; // allow keyhint via keypress H
var FLASH_HINT = 100; // time to flash hint for.
// (level select game CONSTS)
var WIN_TIMEOUT = 0; // set > 0 to use setTimeout rather than callback
var FINISH_HTML = "win.html"; // all select levels finished page
var SELECT_HTML = "select.html"; // points to level select page
var CalcCompleted = false; // calcs levels completed or levels left
var MESSAGE_LEVEL = "level";
var MESSAGE_START = "You have ";
var MESSAGE_END = (CalcCompleted) ? " " + MESSAGE_LEVEL + "s completed" : " levels left";
var MESSAGE_START1 = "Only ";
var MESSAGE_END1 = (CalcCompleted) ? " " + MESSAGE_LEVEL + " completed" : " level left";

var I_PATH = "images/";
var BLANK_GIF = I_PATH + "1x1.gif"; // path to 1x1 transparent gif (for ie6 fixes)
var LEVEL_ID = "L";
var FRAME_ID = "F";
var L_PATH = "";
var L_UP = "../";
var FOUND_ID = FRAME_ID.toLowerCase(); // e.g "f"
var FOUND_ID2 = FOUND_ID + FOUND_ID; // e.g "ff"
var FOUND_IMG_ID = LEVEL_ID.toLowerCase(); // e.g "l"
var FOUND_IMG_ID2 = FOUND_IMG_ID + FOUND_IMG_ID; // e.g "ll"
var FOUND_RISE = true;
var levels = "";
var win_id = false;
var bMultiLevel = false; // game has multiple 'levels' (next '#?' to init)
var cclick = MAXCLICKS;

var bSound = true; // default on
var bClickedImage = false;
var time;
var fnt1;
var fnt2;
var fnt3; // stores end level settimeout
var fn; // and its function
var hex = 0;
var b2 = 0;
var ms;

var user;
var num = "";
var score = 0;
var hintdiv;
var bhint = true;
var points = 0;
var nextLevel = "index.html"; // default
var bfound = false;
var isBonus;
var indx;
var p1_points = 0;
var p2_points = 0;
var player1 = "Player 1";
var player2 = "Player 2";

var bHasAudioTag;
var audio_music;
var audio_correct;
var audio_wrong;
var audio_hint;
var audio_level;
var audio_bonus;

var bPaused = false;
var T = this; // ref for timer screen
var D = document;
var DLS = document.location.search;

var STEP = 10;
var USE_FADE; // set to 1 to trigger on load fades
var S = 0; // used for auto shuffle
var ORDER = true; // flag to show order

var TALK = "123456";

var DATA;        // STOP MOTION STUFF BELOW
var NEXT = "";
var SPLIT = "i"; // text to split data array on
var TICK = 250;  // motion speed (ms)
var LOOP = 0;	 // loop delay (ms)

var FRAME = false;//-1;
var FRAME_DIR = 1; // forward / -1 = backward
var LAST_FRAME = 0;
var FRAME_START = FRAME;
var CLICK_DELAY = 1000 / TICK;
var bClickDelay = 0;

var oType = new Array();
var data = [];	// holds sounds / images e.g: ["0i1.jpg","1i2.jpg"]

var ua = navigator.userAgent;
var bTouch = (ua.indexOf("(iP") == -1 && ua.indexOf("Android") == -1 && ua.indexOf("BlackBerry") == -1 && ua.indexOf("HTC") == -1 && ua.indexOf("PlayBook") == -1 && ua.indexOf("webOS") == -1 && ua.indexOf("IEMobile") == -1 && ua.indexOf("Silk") == -1) ? false : true;

try {
    if (parent.document.location.search) DLS = parent.document.location.search;
} catch (e) {} // for iframes
function $$(id) {
    return document.getElementById(id);
}

function INIT(bNumWavs){ 	//OVERRIDE for your own setup

    if (bNumWavs) {
	// override wav's
	A_MUSIC = "1.wav";
	A_CORRECT = "2.wav";
	A_WRONG = "3.wav";
	A_HINT = "4.wav"
	A_COMPLETED = "5.wav";
	A_BONUS = "6.wav";
    }

    sound(true, true);  // use talk
	
    getData();		// init data
    swapImage();	// stop motion

}

function init(next, b) {
    NEW_LEVEL(); //OVERRIDE
    loaded(next, b);
}

function loaded(next, b) {
    if (!next && !b) INIT(); // for no styling
    if (!next) next = " # ";
    if (!b) b = '';
    if (typeof USE_FADE == "undefined" || USE_FADE == 1) if ($$("content")) $$("content").style.display = "block";
    if (USE_FADE) {
        if ($$("normal")) {
            fade(USE_FADE += STEP, document.images.normal.style);
        } else {
            if ($$("il")) fade(USE_FADE += STEP, document.images.il.style);
            if ($$("ir")) fade(USE_FADE += STEP, document.images.ir.style);
        }
        if (USE_FADE <= 101) {
            setTimeout("loaded('" + next.toString() + "','" + b.toString() + "')", STEP * 2); // ???
        } else {
            USE_FADE = false;
            initLoaded(next, b);
        }
    } else initLoaded(next, b)
}

function initLoaded(next, b) {
    cclick = MAXCLICKS;
    isBonus = b;
    num = "";
    var lastID = "";
    var cnt = 1;
    var dto = $$("timerborder");
    var dti = $$("timer");
    if (dto) dto.style.width = TIMER + 1 + "px";
    if (dti) dti.style.width = TIMER + "px";

    var o_a = D.getElementsByTagName("area");
    var o = $$("remaining");
    var l = o_a.length;
    isMultiLevel = (next.match(/^#/) && next.length > 1) ? true : false;

    for (lp = 0; lp < l; lp++) {
        if (o_a[lp].id != lastID) {
            num = num + "#" + cnt.toString();
            lastID = o_a[lp].id;
            cnt++;
        }
        var o1 = $$(FOUND_ID2 + o_a[lp].id.replace(/[^\d]/g, ''));
        if (o1 && (isMultiLevel || next.match(/#$/))) o1.style.display = "block"; // # shows overlay 'unfound' gfx
    }
    cnt--;
    if (o) o.innerHTML = cnt.toString();

    score = parseInt(num.split("#").length - 1, 10);
    nextLevel = (isMultiLevel) ? "javascript:levelCLEARED(" + next.substr(1) + ",points)//" : next + "?";
    user = unescape(DLS).replace("?", "").split("&")[0].replace("undefined", "");
    points = unescape(DLS).replace("?", "").split("&")[1];
    if (isNaN(points)) points = 0;
    if (unescape(user).indexOf("^") != -1) { // two player mode
        player1 = unescape(user.split("^")[0]);
        player2 = unescape(user.split("^")[1]);
        points = points.toString();

        if (points.indexOf(".") != -1) {
            p1_points = parseInt(points.split(".")[0], 10);
            p2_points = parseInt(points.split(".")[1], 10);
        } else {
            points = 0; // stops crazy points
        }
        if (isNaN(p1_points) || parent.p1_points) p1_points = parent.p1_points; // just incase in iframe		
        if (isNaN(p2_points) || parent.p2_points) p2_points = parent.p2_points; // just incase in iframe		
        update2player();
        if ($$("twoPlayerContent")) $$("twoPlayerContent").className = ".twoPlayerDisplay";
    } else {
        points = parseInt(points, 10);
        if (isNaN(points) || parent.points) points = (isNaN(parent.points)) ? 0 : parent.points; // just incase in iframe
        update1player();
        if ($$("onePlayerContent")) $$("onePlayerContent").className = ".onePlayerDisplay";
    }

    var soundOn = (unescape(DLS).replace("?", "").split("&")[2] == "true") ? true : false;
    sound(soundOn);
    time = (A_MUSIC.match("~")) ? TIMER = isNaN(parseInt(A_MUSIC.split("~")[1], 10)) ? TIMER : parseInt(A_MUSIC.split("~")[1], 10) : TIMER; // use ~ in filename = len in seconds
    fnt1 = setTimeout("_t()", 1000);

    try { // disable image drag
        var o_il = $$("il");
        if (o_il && !D.all) o_il.addEventListener("mousedown", FFpreventDrag, false);
        var o_ir = $$("ir");
        if (o_ir && !D.all) o_ir.addEventListener("mousedown", FFpreventDrag, false);
    } catch (e) {}

    //webkit cursor bug
    if (ua.match(/webkit/i)) {
        if ($$("il")) $$("il").style.cursor = "default";
        if ($$("ir")) $$("ir").style.cursor = "default";
    }
}

function FFpreventDrag(event) {
    if (event.preventDefault) event.preventDefault();
}

function sound(bState, bDisableMusic) {
    bSound = bState;

    if (bHasAudioTag == undefined) { // init sounds
        try {
            AUDIO_EXT = audio_ext(); // global override
            bHasAudioTag = Audio;
            audio_music = new Audio(A_PATH + A_MUSIC.split(".")[0] + AUDIO_EXT);
            audio_correct = new Audio(A_PATH + A_CORRECT.split(".")[0] + AUDIO_EXT);
            audio_wrong = new Audio(A_PATH + A_WRONG.split(".")[0] + AUDIO_EXT);
            audio_hint = new Audio(A_PATH + A_HINT.split(".")[0] + AUDIO_EXT);
            audio_level = new Audio(A_PATH + A_COMPLETED.split(".")[0] + AUDIO_EXT);
            audio_bonus = new Audio(A_PATH + A_BONUS.split(".")[0] + AUDIO_EXT);

        } catch (e) {
            // use IE sound
            bHasAudioTag = false;
            audio_music = new audio(A_PATH + A_MUSIC);
            audio_correct = new audio(A_PATH + A_CORRECT);
            audio_wrong = new audio(A_PATH + A_WRONG);
            audio_hint = new audio(A_PATH + A_HINT);
            audio_level = new audio(A_PATH + A_COMPLETED);
            audio_bonus = new audio(A_PATH + A_BONUS);
        }
    }
    
	if (bDisableMusic) return
    
    if (bSound) {
        audio_music.play();
    } else {
        reset_bg_music(true);
    }
}

function reset_bg_music(reset) {
    if (bSound || reset) {
        try {
            if (bHasAudioTag) {
                audio_music.pause();
            } else {
                audio_music.stop();
            }
        } catch (e) {}
    }
}

function pause() {
    if (bPaused) {
        bPaused = false;
    	if (FRAME !== false) {
            swapImage();
    	} else {
            if (bSound) audio_music.play();
            fnt1 = setTimeout("_t()", 1000);
            fade(100);
        }
    } else {
        bPaused = true;
    	if (FRAME === false) {
	    reset_bg_music();
	    clearTimeout(fnt1);
	    fade(25);
	} else {
	    if (FRAME > -1){ // MUTE
		talk(-1);
	    }
	}
    }
}

function _t() {
    clearTimeout(fnt1);
    time--;
    if (time > 0) {
        if ($$("timer")) $$("timer").style.width = time + "px";
        fnt1 = setTimeout("_t()", 1000);
    } else {
        clearTimeout(fnt2);
        if (not2player()) {
            T.D.location.href = (TIMEUP == "#") ? TIMEUP : TIMEUP + "?" + user + "&" + points + "&" + bSound;
        } else {
            T.D.location.href = (TIMEUP == "#") ? TIMEUP : TIMEUP + "?" + user + "&" + p1_points + "." + p2_points + "&" + bSound;
        }
    }
}


function _s(b2) {
    FOUND(b2);
}

function _l() {
    clearTimeout(fnt1);
    var ot = $$("timer");

    if (ot) {
        var b1 = parseInt(ot.style.width.replace("px", ""), 10);
        if (bHasAudioTag) {
            audio_music.volume = (b1 / 100);
        }
        b1--;
        if (not2player()) {
            points = points + b1;
            update1player();
        }
        ot.style.width = b1 + "px";
        if (b1 > 0) {
            fnt1 = setTimeout("_l()", 25);
        } // else other setTimeout loads next level
    }
}

function removeDiv() {
    var o = $$("sd");
    if (o) {
        D.body.removeChild(o);
    }

    hex = 0;
}

function point(e) {
    if (bPaused) return;

    if (!bClickedImage || (D.images && D.images.magnifyborder && D.images.magnifyborder.className == "magnifyOFF")) {
        bClickedImage = false;
        return;
    }

    bClickedImage = false;

    if (D.all) {
        x = event.x;
        y = event.y;
    } else {
        x = e.touches ? e.touches[0].pageX : e.pageX; // Android?
        y = e.touches ? e.touches[0].pageY : e.pageY;
    }

    var pt = y;
    var pl = x;
    var pw = 30;
    var ph = 10;

    ms = pt;

    if (bfound) {
        // audio_correct sound handled by chkscore
        if (isBonus || isBonus == "") {
            got_bonus(indx); // mod
            if ($$(FOUND_ID + indx)) $$(FOUND_ID + indx).className = "gotbonus"; // remove found item from list
            if ($$(FOUND_ID2 + indx)) {
                if (isMultiLevel) {
                    $$(FOUND_ID2 + indx).style.display = "none"; // bugfix - force
                } else {
                    $$(FOUND_ID2 + indx).className = "imgbonus"; // remove found item from image
                }
            }
            removeDiv();
            newdiv(pt, pl, pw, ph, "fade", "<div class='sdb'>" + BONUS_MSG + "<div>", "sd");
            _s(100);
        }
        cclick = MAXCLICKS;
    } else {
        if (not2player()) {
            points = points - WRONG;
            update1player();
            if (points < 0) zeroPoints("p");
        } else {
            update2player(false, pl); // #2
        }
        time = time - (WRONG / 2);

        WRONG_GUESS();
        // play no good sound
        try {
            if (bSound) {
                audio_wrong.load();
                audio_wrong.play();
            }
        } catch (e) {}

        removeDiv();
        newdiv(pt, pl, pw, ph, "fade", "", "sd");
        _s(100);
        cclick--;
        if (cclick == 0) isCheating();
    }

    bfound = false;
}

function WRONG_GUESS() {} //OVERRIDE
function createLoupe(shape, borderStyle, borderUrl) {
    if ($$("normal")) {
        var src = $$("normal").src;
        var srcshape = shape;
        var shtml = "";
        var borderStyle = (!borderStyle) ? "" : borderStyle; // eg "display:none" to turn off border img (if didn't exist)
        if (src.indexOf("/") != -1) {
            var arr_src = src.split("/");
            arr_src[arr_src.length - 1] = shape;
            srcshape = arr_src.join("/");
        }
        var borderSrc = (borderUrl) ? borderUrl : srcshape + LOUPE_EXT;
        var _e = 'ondragstart="return false" onselectstart="return false"';
        for (lp = 0; lp < 9; lp++) {
            shtml += '<img shape="' + shape + '" name="magnify' + lp + '" id="magnify" src="' + src + '" ismap usemap="#zoom"' + _e + '>';
        }

        // border img
        shtml += '<img name="magnifyborder" id="magnifyborder" src="' + borderSrc + '" style="' + borderStyle + '"' + _e + '>';

        // middle of loupe (9)
        shtml += '<img shape="' + shape + '" name="magnify' + lp + '" id="magnify" src="' + src + '" ismap usemap="#zoom"' + _e + '>';

        D.write(shtml);

        if (D.all) {
            document.onmousemove = mtrack;
        } else {
            D.addEventListener('mousemove', mtrack, false);
            D.addEventListener('touchmove', mtrack, false);
        }
    }
}

function Loupe(shape, borderStyle, borderUrl) {
    var n = $$("normal");
    var m = $$("magnify");
    var b = $$("magnifyborder");
    if (n && m && b) {
        var src = n.src;
        var srcshape = shape;

        if (src.indexOf("/") != -1) {
            var arr_src = src.split("/");
            arr_src[arr_src.length - 1] = shape;
            srcshape = arr_src.join("/");
        }

        m.setAttribute('shape', shape);
        b.src = (borderUrl) ? borderUrl : srcshape + LOUPE_EXT;
        b.style.cssText = borderStyle; // ie
        b.setAttribute('style', borderStyle); // ff etc..
    }
}

function mtrack(e, bpD) {
    try {
        e.preventDefault();
    } catch (e) {}

    if (bPaused) return;

    bClickedImage = true;

    var x, y, x1, x2, y1, y2, dx = 0,
        dy = 0;
    var sl, st;
    var opp = 32; // size of lens
    var off = (bTouch) ? opp - 10 : (D.all) ? opp - 2 : opp - 1;
    var obj_m = $$("magnify");
    var obj_n = $$("normal");

    if (obj_m && obj_n) {
        var fact = parseInt(obj_m.width, 10) / parseInt(obj_n.width, 10); // image orginal w / resized w
        var shape = obj_m.getAttribute("shape").toLowerCase(); // eg. rect
        if (D.all) {
            x = event.x;
            y = event.y;
            dx = window.document.body.scrollLeft;
            dy = window.document.body.scrollTop;
        } else {
            x = e.touches ? e.touches[0].pageX : e.pageX;
            y = e.touches ? e.touches[0].pageY : e.pageY;
        }

        x1 = -opp + (x + dx) * fact; //left
        y1 = -opp + (y + dy) * fact; //top
        x2 = +opp + (x + dx) * fact; //right
        y2 = +opp + (y + dy) * fact; //bottom
        if (isNaN(x1)) x1 = 0;
        if (isNaN(y1)) y1 = 0;
        if (isNaN(x2)) x2 = 0;
        if (isNaN(y2)) y2 = 0;

        sl = (x + dx) * (1 - fact);
        st = (y + dy) * (1 - fact);

        var di = D.images;

        di.magnifyborder.style.left = -opp + (x + dx);
        di.magnifyborder.style.top = -opp + (y + dy);
        di.magnifyborder.className = (x > obj_n.width || y > obj_n.height) ? "magnifyOFF" : "magnifyON";

        if (di.magnifyborder.className == "magnifyOFF") st = sl = -999999;

        var l0 = di.magnify0.style;
        var l1 = di.magnify1.style;
        var l2 = di.magnify2.style;
        var l3 = di.magnify3.style;
        var l4 = di.magnify4.style;
        var l5 = di.magnify5.style;
        var l6 = di.magnify6.style;
        var l7 = di.magnify7.style;
        var l8 = di.magnify8.style;
        var l9 = di.magnify9.style;

        switch (shape) {

        case "circle":

            l0.left = sl;
            l0.top = st;
            l0.clip = "rect(" + (y1 - 2) + "px," + (x2 - 2) + "px," + (y2 + 2) + "px," + (x1 + 2) + "px)";

            l1.left = sl;
            l1.top = st;
            l1.clip = "rect(" + (y1 + 2) + "px," + (x2 + 2) + "px," + (y2 - 2) + "px," + (x1 - 2) + "px)";

            l2.left = sl;
            l2.top = st;
            l2.clip = "rect(" + (y1 - 4) + "px," + (x2 - 7) + "px," + (y2 + 4) + "px," + (x1 + 7) + "px)";

            l3.left = sl;
            l3.top = st;
            l3.clip = "rect(" + (y1 + 7) + "px," + (x2 + 5) + "px," + (y2 - 7) + "px," + (x1 - 5) + "px)";

            l4.left = sl;
            l4.top = st;
            l4.clip = "rect(" + (y1 - 6) + "px," + (x2 - 12) + "px," + (y2 + 6) + "px," + (x1 + 12) + "px)";

            l5.left = sl;
            l5.top = st;
            l5.clip = "rect(" + (y1 + 12) + "px," + (x2 + 8) + "px," + (y2 - 12) + "px," + (x1 - 8) + "px)";

            l6.left = sl;
            l6.top = st;
            l6.clip = "rect(" + (y1 - 8) + "px," + (x2 - 18) + "px," + (y2 + 8) + "px," + (x1 + 18) + "px)";

            l7.left = sl;
            l7.top = st;
            l7.clip = "rect(" + (y1 + 18) + "px," + (x2 + 10) + "px," + (y2 - 18) + "px," + (x1 - 10) + "px)";

            l8.left = sl;
            l8.top = st;
            l8.clip = "rect(" + (y1 - 10) + "px," + (x2 - 24) + "px," + (y2 + 10) + "px," + (x1 + 24) + "px)";

            l9.left = sl;
            l9.top = st;
            l9.clip = "rect(" + (y1 + 24) + "px," + (x2 + 10) + "px," + (y2 - 24) + "px," + (x1 - 10) + "px)";

            break;

        case "star":

            l0.left = sl;
            l0.top = st;
            l0.clip = "rect(" + (y1 + 11) + "px," + (x2 - 11) + "px," + (y2 - 11) + "px," + (x1 + 11) + "px)";

            l1.left = sl;
            l1.top = st;
            l1.clip = "rect(" + (y1 + 15) + "px," + (x2 + 0) + "px," + (y2 - 30) + "px," + (x1 - 0) + "px)";

            l2.left = sl;
            l2.top = st;
            l2.clip = "rect(" + (y1 - 10) + "px," + (x2 - 25) + "px," + (y2 - 20) + "px," + (x1 + 25) + "px)";

            l3.left = sl;
            l3.top = st;
            l3.clip = "rect(" + (y1 - 0) + "px," + (x2 - 20) + "px," + (y2 - 20) + "px," + (x1 + 20) + "px)";

            l4.left = sl;
            l4.top = st;
            l4.clip = "rect(" + (y1 + 55) + "px," + (x2 - 50) + "px," + (y2 + 5) + "px," + (x1 - 0) + "px)";

            l5.left = sl;
            l5.top = st;
            l5.clip = "rect(" + (y1 + 55) + "px," + (x2 + 0) + "px," + (y2 + 5) + "px," + (x1 + 50) + "px)";

            l6.left = sl;
            l6.top = st;
            l6.clip = "rect(" + (y1 + 40) + "px," + (x2 - 40) + "px," + (y2 - 5) + "px," + (x1 + 5) + "px)";

            l7.left = sl;
            l7.top = st;
            l7.clip = "rect(" + (y1 + 40) + "px," + (x2 - 5) + "px," + (y2 - 5) + "px," + (x1 + 40) + "px)";

            l8.left = sl;
            l8.top = st;
            l8.clip = "rect(" + (y1 + 15) + "px," + (x2 + 10) + "px," + (y2 - 35) + "px," + (x1 - 10) + "px)";

            l9.left = sl;
            l9.top = st;
            l9.clip = "rect(" + (y1 + 20) + "px," + (x2 - 20) + "px," + (y2 - 20) + "px," + (x1 + 20) + "px)";

            break;

        case "rect":

            l0.left = l1.left = l2.left = l3.left = l4.left = l5.left = l6.left = l7.left = l8.left = l9.left = sl;
            l0.top = l1.top = l2.top = l3.top = l4.top = l5.top = l6.top = l7.top = l8.top = l9.top = st;
            l0.clip = l1.clip = l2.clip = l3.clip = l4.clip = l5.clip = l6.clip = l7.clip = l8.clip = l9.clip = "rect(" + y1 + "px," + x2 + "px," + y2 + "px," + x1 + "px)";

            break;

        default:

            try {
                l0.left = l1.left = l2.left = l3.left = l4.left = l5.left = l6.left = l7.left = l8.left = l9.left = sl;
                l0.top = l1.top = l2.top = l3.top = l4.top = l5.top = l6.top = l7.top = l8.top = l9.top = st;
                l0.clip = l1.clip = l2.clip = l3.clip = l4.clip = l5.clip = l6.clip = l7.clip = l8.clip = l9.clip = "rect(" + (y1 + off) + "px," + (x2 - off) + "px," + (y2 - off) + "px," + (x1 + off) + "px)";
            } catch (e) {}
        }
    }
}

function keyhint(e, bH, bT, bB) {
    var key;

    if (e) key = (e.keyCode) ? e.keyCode : e.charCode;

    if (bPaused && key == 27) pause(); // esc cancels pause
    if (bPaused) return;

    if (bhint && HINTS_LEFT != 0 && (bH || (key == 72 || key == 104) && KEYHINT)) {
        try {
            if (bSound) {
                audio_hint.load();
                audio_hint.play();
            }
        } catch (e) {}
        if ($$("hints_left" + HINTS_LEFT.toString())) {
            $$("hints_left" + HINTS_LEFT.toString()).className = "usedhint";
        }
        HINTS_LEFT--;
        if (HINTS_LEFT == 0) bhint = false;
        arr_num = num.split("#");
        var obj;
        var img;
        var o;
        var c;

        img = $$("il");
        var i = arr_num[1];

        o = "m" + i; //arr_num[i];
        obj = $$(o);
        if (img && obj) {
            c = obj.coords.split(",");
            var pw = c[2];
            var ph = pw;
            var pl = (parseInt(c[0], 10) + img.offsetLeft) - (pw / 2);
            var pt = (parseInt(c[1], 10) + img.offsetTop) - (pw / 2);

            newdiv(pt, pl, pw, ph, "hint", ""); // normal
            if (bT) {
                setTimeout("document.body.removeChild(hintdiv);", FLASH_HINT);
            } else {
                num = num.replace("#" + i.toString(), "");
                score--;
            }
            if (not2player()) {
                points = points - HINT;
                update1player();
            }
            if ($$("remaining")) $$("remaining").innerHTML = score.toString();
            winmsg();
        }

        if (bB && $$(FOUND_ID2 + i)) {
            $$(FOUND_ID2 + i).className = "hint"; // bonus
            setTimeout("$$('" + FOUND_ID2 + i + "').className = 'reset'", FLASH_HINT);
        }
    }
    if (bhint && HINTS_LEFT == 0 && (bH || (key == 72 || key == 104) && KEYHINT)) {
        ZEROHINTS();
    }
}

function ZEROHINTS() {} //OVERRIDE
function chkscore(s, t, e, b, o) {
    if (bPaused) return;

    // msg
    if (b && $$(FOUND_ID + s)) BONUS_MSG = '<b class="rise">' + $$(FOUND_ID + s).innerHTML + '</b>';

    var temp = num;
    var s2s = s.toString();
    if ((temp + "#").match("#" + s2s + "#") && order(temp.substr(0, s2s.length + 1) == "#" + s2s)) num = num.replace("#" + s2s, "");

    if (o || (num != temp)) {

        try {
            if (bSound) {
                audio_correct.load();
                audio_correct.play();
            }
        } catch (e) {} // (for differences & bonus level)
        indx = s2s;
        if (D.all || $$("normal")) bfound = true; // is ie or bonus level
        score--;
        if ($$("remaining")) $$("remaining").innerHTML = score.toString();

        var c = t.coords;
        var m = e;
        var mY = e.touches ? e.touches[0].pageY : e.pageY; // Android ?
        var mX = e.touches ? e.touches[0].pageX : e.pageX;
        var pw = parseInt(c.split(",")[2], 10); // if coords is circle!
        var ph = pw;

        if (m.pageY) {
            var pt = e.touches ? mY - (pw / 2) : m.pageY - (pw / 2);
        } else {
            var pt = m.clientY - (pw / 2); // ie
        }
        if (m.pageX) {
            var pl = e.touches ? mX - (pw / 2) : m.pageX - (pw / 2);
        } else {
            var pl = m.clientX - (pw / 2); // ie
        }
        newdiv(pt, pl, pw, ph, "found", "");

        cclick = MAXCLICKS;

        if (not2player()) {
            points = points + CORRECT;
            update1player();
        } else {
            update2player(true, pl);
        }

        winmsg();
    }
}

function order(bNext) {
    if (bNext) {
        return CORRECT_ORDER();
    } else {
        ORDER = false;
        return INCORRECT_ORDER();
    }
}

function CORRECT_ORDER() {
    return true;
} //OVERRIDE
function INCORRECT_ORDER() {
    return true;
} //OVERRIDE
function singleshot() {
    // only allow 1 click per level
    var hHTML = $$("header") ? $$("header").innerHTML : "";
    checklast("", "", hHTML);
    keyhint();
}

function add2Time(s, t, e, b, o) {
    if (bPaused) return;
    //if(o)t.onclick=null;
    chkscore(s, t, e, b, o);
    time += TIMEPLUS;
    if (time > TIMER) time = TIMER - 1;

}

function add2Hint(s, t, e, b) {
    if (bPaused || this.value) return;

    chkscore(s, t, e, b);

    HINTS_LEFT++;
    bhint = true;
    var o = D.getElementsByName("hints_left");
    if (o) {
        var max = o.length;
        if (D.all) {
            for (max = 9; max > 0; max--) if ($$("hints_left" + max)) break;
        }
        if (HINTS_LEFT > max) HINTS_LEFT = max;
        if ($$("hints_left" + HINTS_LEFT.toString())) {
            $$("hints_left" + HINTS_LEFT.toString()).className = "hintleft";
        }
    }
    this.value = true;
}

function update2player(bAdd, pageOffsetLeft) {
    // who scored?
    if ($$("il") && bAdd) {
        if (pageOffsetLeft < $$("il").offsetLeft + $$("il").width) {
            p1_points++;
        } else {
            p2_points++;
        }
    }

    if ($$("il") && (bAdd === false)) {
        if (pageOffsetLeft < $$("il").offsetLeft + $$("il").width) {
            p1_points--;
            if (p1_points < 0) zeroPoints("p1");
        } else {
            p2_points--;
            if (p2_points < 0) zeroPoints("p2");
        }
    }

    if ($$("P1")) $$("P1").innerHTML = player1 + GAP + p1_points.toString();
    if ($$("P2")) $$("P2").innerHTML = player2 + GAP + p2_points.toString();
}

function update1player() {
    if ($$("P")) $$("P").innerHTML = user + GAP + points.toString();
}

function checklast(num, t, h) {
    if (num.length == 2) {
        if ($$("s")) $$("s").style.display = "none"; // update diffs left to find
    }
    if (num == "") {
        try {
            if (bSound) {
                audio_level.load();
                audio_level.play();
            }
        } catch (e) {}
        if (not2player()) {
            points = points + COMPLETED;
            update1player();
        }
        if (isBonus) {
            bfound = true;
            //playBonus(); // needed? (as correct plays)
            if (not2player()) {
                points = points + BONUS;
                update1player();
            }
            if (isBonus != "") {
                h = isBonus; // override end msg with bonus msg
                //TIME = 2000; // exit quicker with no timer bonus
                if ($$("footer")) $$("footer").innerHTML = "";
            }
        }
        if ($$("header") && h) $$("header").innerHTML = h;
        _msg(t);
        _l();
        var _fn = "bPaused = false;clearTimeout(fnt1);clearTimeout(fnt2);document.location.href=";
        if (not2player()) {
            fn = _fn + "nextLevel + user + '&' + points.toString() + '&' + bSound";
        } else {
            fn = _fn + "nextLevel + user + '&' + p1_points.toString() + '.' + p2_points.toString() + '&' + bSound"
        }

        if ($$("timerborder")) $$("timerborder").onclick = ""; // disable pause click (as Level Completed)
        fnt3 = (WAIT) ? setTimeout("wait()", TIME) : setTimeout(fn, TIME);
        bhint = false;
        if ($$("quit")) $$("quit").style.display = "none";

        END_LEVEL(); // do any other fancy stuff here.
    }
}

function wait() {
    if ($$("w")) {
        $$("w").innerHTML = "<a href='#' onclick='eval(fn)' class='wait'>" + WAIT_MSG + "</a>";
        bPaused = true;
    } else {
        eval(fn); // default behaviour
    }
}

function not2player() {
    return (unescape(DLS).indexOf("^") == -1);
}

function newdiv(pt, pl, pw, ph, cl, ih, ii) {
    var newdiv = D.createElement('div');
    newdiv.className = cl;
    newdiv.style.top = pt + "px";
    newdiv.style.left = pl + "px";
    newdiv.style.width = pw + "px";
    newdiv.style.height = ph + "px";
    newdiv.innerHTML = ih;
    if (ii) newdiv.id = ii;
    D.body.appendChild(newdiv);
    if (cl == "hint") hintdiv = newdiv;

}

function winmsg() {
    if (not2player()) {
        checklast(num, WIN_MSG, WIN_HTML.replace("WIN_MSG", WIN_MSG));
    } else {
        var win_msg;
        var playername = (p1_points > p2_points) ? player1 : player2;
        if (p1_points == p2_points) playername = DRAW_MSG;
        win_msg = WIN2_MSG.replace("^", playername);
        checklast(num, win_msg, WIN_HTML.replace("WIN_MSG", win_msg));
    }
}

function _msg(text) {
    //alert(text);
}

function go(url, extra) {
    extra = (!extra) ? "" : "&" + extra;
    var g = url + unescape(DLS) + extra;
    try {
        if (parent.points) {
            var a_s = unescape(DLS).split("&");
            a_s[1] = parent.points;
            g = url + a_s.join("&") + extra;
        }
    } catch (e) {}
    document.location.href = g;
}

function zeroPoints(player) {
    if (ZEROPOINTS != "") {
        switch (player) {
        case "p":
            go(ZEROPOINTS, user);
            break;

        case "p1":
            go(ZEROPOINTS, player1);
            break;

        case "p2":
            go(ZEROPOINTS, player2);
            break;

        default:
            go(ZEROPOINTS, player);
        }
    }
}

function isCheating() {
    if (not2player()) {
        c = D.body.className;
        D.body.className = "cheating";
        cclick = MAXCLICKS;
        points = points - CHEATING;
        setTimeout("document.body.className = '" + c + "'", 666);
        CHEAT();
    }
}

function CHEAT() {} //OVERRIDE
function got_bonus(idx) {}

function audio_ext() {
    return AUDIO_EXT;
}

function FOUND(b2) //OVERRIDE point to your own 'found' effect
{
    clearTimeout(fnt2);
    b2--;
    hex = hex + 5;
    hexfade = 120;
    var o = $$("sd");

    if (o) {
        if (o.innerHTML == "") o.innerHTML = WRONG_MSG;
        if (FOUND_RISE) o.style.top = (ms - 100) + b2 + "px";
        if (o.innerHTML.toLowerCase().indexOf('<img src') == -1) { // meh!
            o.style.color = "rgb(" + hex + "," + hex + "," + hexfade + ")";
        } else {
            fade(b2, o.style);
        }
    }

    if (b2 > 0) {
        fnt2 = setTimeout("_s(" + b2 + ")", 10);
    } else {
        removeDiv();
    }
}

function NEW_LEVEL() {} //OVERRIDE
function END_LEVEL() {} //OVERRIDE (note: clearTimeout(fnt3) in here to stop autoload of next level)
// (level select game functions)
function msg_level(s) {
    MESSAGE_END = MESSAGE_END.replace(MESSAGE_LEVEL, s);
    MESSAGE_END1 = MESSAGE_END1.replace(MESSAGE_LEVEL, s);
    MESSAGE_LEVEL = s;
}

function inits(init_msg) {
    NEW_LEVEL(); //OVERRIDE
    loaded();
    var o_a = D.getElementsByTagName("area");
    var l = o_a.length;
    for (lp = 0; lp < l; lp++) {
        var o1 = $$(FOUND_IMG_ID2 + o_a[lp].id.replace(/[^\d]/g, ''));
        if (o1) o1.style.display = "inline";
    }

    if (parent.points == 0 && $$("s")) $$("s").innerHTML = parent.document.location.search.split("&")[1] | 0;

    if (!parent.D.value) {
        init("", "");
        parent.levels = num;
        if (init_msg.match(" # ")) init_msg = init_msg.replace(" # ", " " + score + " ");
        parent.D.value = score; //inits init!
        if ($$("msg")) $$("msg").innerHTML = init_msg;

        parent.user = unescape(parent.D.location.search).replace("?", "").split("&")[0];
        parent.points = unescape(parent.D.location.search).replace("?", "").split("&")[1];
        parent.bSound = unescape(parent.D.location.search).replace("?", "").split("&")[2];
        parent.bSound = (typeof parent.bSound != "undefined" && parent.bSound.match(/true/i)) ? true : false; // convert type
        parent.points = parseInt(parent.points, 10);
        if (isNaN(parent.points)) parent.points = 0;
    }

    sound(parent.bSound);

    a_l = parent.levels.split("#");
    for (i in a_l) {
        id = a_l[i];
        if ($$(LEVEL_ID + id)) {
            $$(LEVEL_ID + id).href = L_PATH + LEVEL_ID + id + ".html" + "?" + parent.user + '&' + parent.points.toString() + '&' + parent.bSound;
        }
        if ($$(FOUND_IMG_ID + id)) { // remove gfx to show level not yet complete
            $$(FOUND_IMG_ID + id).style.display = "none";
            if ($$(FOUND_IMG_ID2 + id)) $$(FOUND_IMG_ID2 + id).src = BLANK_GIF; //ie6 bugfix! // !!!
        }
    }

    if (parent.bSound) {
        wt = (WIN_TIMEOUT == 0) ? 555 : WIN_TIMEOUT;
        if (parent.levels == "") {
            setTimeout("try{audio_level.load();audio_level.play();}catch(e){}", wt); // (level completed)
        } else {
            setTimeout("try{audio_correct.load();audio_correct.play();}catch(e){}", wt); // (level loaded)
        }
    }
}

function check(id) {
    if (WIN_TIMEOUT) {
        setTimeout("win(" + id + ")", WIN_TIMEOUT);
    } else {
        try {
            parent.win_id = id;
        } catch (e) {}
    }
}

function win(id) {
    var o = frames[FRAME_ID];
    if (o && id !== false) {
        if (levels == "") {
            if (WAIT && o.$$("msg")) {
                clearTimeout(fnt1);
                o.$$("msg").innerHTML = WAIT_MSG;
                o.D.body.onclick = function () {
                    o.D.location.href = FINISH_HTML + "?" + user + '&' + points.toString() + '&' + bSound
                }
            } else {
                o.D.location.href = FINISH_HTML + "?" + user + '&' + points.toString() + '&' + bSound;
            }
        } else {
            if (o.$$("msg")) {
                var r = (CalcCompleted) ? parent.D.value - (levels.split("#").length - 1) : (levels.split("#").length - 1);
                o.$$("msg").innerHTML = (r == 1) ? MESSAGE_START1 + r + MESSAGE_END1 : MESSAGE_START + r + MESSAGE_END; // FF doesn't support innerText (textContent)
            } else {
                setTimeout("win(" + id + ")", 100);
            }
        }
        if (o.$$("s")) {
            o.$$("s").innerHTML = points;
        }
        win_id = false;
    }
}

function showLevels(s) {
    if ($$("info")) $$("info").style.display = "none";
    if ($$(FRAME_ID)) $$(FRAME_ID).style.display = "block";
    time = (s) ? s : TIMER; // start timeup
    fnt1 = setTimeout("_t()", 1000);
}

function levelUP(l, p, bQUIT) {
    parent.SELECT_HTML = L_UP + SELECT_HTML;
    if (bQUIT) {
        parent.parent.points += p;
        parent.parent.frames[FRAME_ID].levelQUIT(l);
    } else {
        parent.parent.points += parent.points;
        parent.parent.frames[FRAME_ID].levelCLEARED(l, p);
    }
}

function levelCLEARED(l, p) {
    CLEARED(l, p);
    parent.levels = parent.levels.replace('#' + l, '');
    parent.check(l);
    D.location.href = SELECT_HTML;
    parent.points += (p) ? p : -parent.points;
}

function CLEARED(l, p) {} //OVERRIDE
function levelQUIT(l) {
    QUIT(l);
    parent.check();
    D.location.href = SELECT_HTML;
}

function QUIT(l) {} //OVERRIDE
// Emulate audio tag in IE
function _play() {
    this.Audio.src = this.wav;
}

function _stop() {
    this.Audio.src = '';
}

function _volume(x) {
    if (x < 0) x = 0;
    else if (x > 100) x = 100;
    this.Audio.volume = -((100 - x) * 100);
}

function _currentTime(x) {}

function _load() {}

function audio(wav, lp) {
    this.wav = wav;
    if (!lp) lp = 0;
    if (D.all) {
        var b = D.getElementsByTagName('BODY');
        this.Audio = D.createElement('bgsound');
        if (this.Audio) {
            this.Audio.loop = lp;
            this.Audio.autostart = true;
            b[0].appendChild(this.Audio);
            this.play = _play;
            this.stop = _stop;
            this.volume = _volume;
            this.currentTime = _currentTime;
            this.load = _load;
            return this;
        }
    }
    this.play = nullFunc;
    this.stop = nullFunc;
    return this;
}

function nullFunc() {
    return
}

// Optional fn
function shuffle(bUseWrong, r, bAuto) {
    if (bUseWrong && typeof temp_audio_wrong == "undefined") temp_audio_wrong = audio_wrong;
    if (typeof temp_audio_correct == "undefined") temp_audio_correct = audio_correct;
    if (typeof temp_audio_bonus == "undefined") temp_audio_bonus = audio_bonus;
    if (typeof temp_audio_hint == "undefined") temp_audio_hint = audio_hint;
    if (typeof r != "number") r = Math.random();

    if (r > 0.34) {
        if (bUseWrong) {
            audio_wrong = temp_audio_bonus
        } else {
            audio_correct = temp_audio_bonus;
        } // 0.5
        if (r > 0.67) {
            if (bUseWrong) {
                audio_wrong = temp_audio_hint
            } else {
                audio_correct = temp_audio_hint;
            } // 1
        }
    } else {
        if (bUseWrong) {
            audio_wrong = temp_audio_wrong
        } else {
            audio_correct = temp_audio_correct;
        } // 0
    }
    if (bAuto)(S == 1) ? S = 0 : (S == 0.5) ? S = 1 : (S == 0) ? S = 0.5 : 0;
}

function playBonus() {
    try {
        if (bSound) {
            audio_bonus.load();
            audio_bonus.play();
        }
    } catch (e) {}
}

function fade(o, obj) {
    if (!obj) obj = D.getElementsByTagName("body")[0].style;
    obj.opacity = (o / 100);
    obj.filter = "alpha(opacity=" + o + ")";
}

function typer(rate, s, b) {
    if (b) {
        A_BONUS = b; // holds 'typer' sound
        sound(true);
    }
    if ($$("typer")) {
        if (s) TYPER = s; // holds text/html to 'type out'
        if (typeof TYPER != "undefined" && TYPER) {
            setTimeout('if(TYPER.length > 0)$$("typer").innerHTML = TYPER.substr(0,(!' + rate + ')?currentChar = TYPER.length:(typeof currentChar != "undefined")?currentChar++:currentChar = 1);if(currentChar > TYPER.length)TYPER = "";typer(' + rate + ',TYPER' + ')', rate);
            playBonus();
        }
    }
}

function talk(sNum,dLen) {

    TALK_START();

    if (sNum == 1) {
        try{audio_music.load();audio_music.play();}catch(e){}
        if (bHasAudioTag) {
            try{audio_correct.pause();}catch(e){}
            try{audio_wrong.pause();}catch(e){}
            try{audio_hint.pause();}catch(e){}
            try{audio_level.pause();}catch(e){}
            try{audio_bonus.pause();}catch(e){}
        } else {
            try{audio_correct.stop();}catch(e){}
            try{audio_wrong.stop();}catch(e){}
            try{audio_hint.stop();}catch(e){}
            try{audio_level.stop();}catch(e){}
            try{audio_bonus.stop();}catch(e){}
        }
    }

    if (sNum == 2) {
        try{audio_correct.load();audio_correct.play();}catch(e){}
        if (bHasAudioTag) {
            try{audio_music.pause();}catch(e){}
            try{audio_wrong.pause();}catch(e){}
            try{audio_hint.pause();}catch(e){}
            try{audio_level.pause();}catch(e){}
            try{audio_bonus.pause();}catch(e){}
        } else {
            try{audio_music.stop();}catch(e){}
            try{audio_wrong.stop();}catch(e){}
            try{audio_hint.stop();}catch(e){}
            try{audio_level.stop();}catch(e){}
            try{audio_bonus.stop();}catch(e){}
        }
    }

    if (sNum == 3) {
        try{audio_wrong.load();audio_wrong.play();}catch(e){}
        if (bHasAudioTag) {
            try{audio_music.pause();}catch(e){}
            try{audio_correct.pause();}catch(e){}
            try{audio_hint.pause();}catch(e){}
            try{audio_level.pause();}catch(e){}
            try{audio_bonus.pause();}catch(e){}
        } else {
            try{audio_music.stop();}catch(e){}
            try{audio_correct.stop();}catch(e){}
            try{audio_hint.stop();}catch(e){}
            try{audio_level.stop();}catch(e){}
            try{audio_bonus.stop();}catch(e){}
        }
    }

    if (sNum == 4) {
        try{audio_hint.load();audio_hint.play();}catch(e){}
        if (bHasAudioTag) {
            try{audio_music.pause();}catch(e){}
            try{audio_correct.pause();}catch(e){}
            try{audio_wrong.pause();}catch(e){}
            try{audio_level.pause();}catch(e){}
            try{audio_bonus.pause();}catch(e){}
        } else {
            try{audio_music.stop();}catch(e){}
            try{audio_correct.stop();}catch(e){}
            try{audio_wrong.stop();}catch(e){}
            try{audio_level.stop();}catch(e){}
            try{audio_bonus.stop();}catch(e){}
        }
    }

    if (sNum == 5) {
        try{audio_level.load();audio_level.play();}catch(e){}
        if (bHasAudioTag) {
            try{audio_music.pause();}catch(e){}
            try{audio_correct.pause();}catch(e){}
            try{audio_wrong.pause();}catch(e){}
            try{audio_hint.pause();}catch(e){}
            try{audio_bonus.pause();}catch(e){}
        } else {
            try{audio_music.stop();}catch(e){}
            try{audio_correct.stop();}catch(e){}
            try{audio_wrong.stop();}catch(e){}
            try{audio_hint.stop();}catch(e){}
            try{audio_bonus.stop();}catch(e){}
        }
    }

    if (sNum == 6) {
        try{audio_bonus.load();audio_bonus.play();}catch(e){}
        if (bHasAudioTag) {
            try{audio_music.pause();}catch(e){}
            try{audio_correct.pause();}catch(e){}
            try{audio_wrong.pause();}catch(e){}
            try{audio_hint.pause();}catch(e){}
            try{audio_level.pause();}catch(e){}
        } else {
            try{audio_music.stop();}catch(e){}
            try{audio_correct.stop();}catch(e){}
            try{audio_wrong.stop();}catch(e){}
            try{audio_hint.stop();}catch(e){}
            try{audio_level.stop();}catch(e){}
        }
    }

    if (sNum == -1) { // MUTE ALL!
        if (bHasAudioTag) {
            try{audio_music.pause();}catch(e){}
            try{audio_correct.pause();}catch(e){}
            try{audio_wrong.pause();}catch(e){}
            try{audio_hint.pause();}catch(e){}
            try{audio_level.pause();}catch(e){}
            try{audio_bonus.pause();}catch(e){}
        } else {
            try{audio_music.stop();}catch(e){}
            try{audio_correct.stop();}catch(e){}
            try{audio_wrong.stop();}catch(e){}
            try{audio_hint.stop();}catch(e){}
            try{audio_level.stop();}catch(e){}
            try{audio_bonus.stop();}catch(e){}
        }
    }

    if (dLen) setTimeout("TALK_ENDED()",dLen); // do something after duration dLen(gth)
}

function TALK_START(){} //OVERRIDE
function TALK_ENDED(){} //OVERRIDE

// image preloader and fn's for stop motion stuff

function getData(){
    for(i = 0; i < data.length; i++)
    {
        oType[i] = new Image();
        oType[i].src = I_PATH + data[i].split(SPLIT)[1];
    }
    LAST_FRAME = oType ? oType.length : 0;
}

function swapImage() {
    if (!bPaused) {
	if (FRAME === false) FRAME = -1;
        if ((FRAME_DIR > 0) ? (++FRAME < LAST_FRAME) : (--FRAME > -1))
        {
	    var fData = data[FRAME].split(SPLIT)[0];
            if (TALK.match(fData)) {
        	    talk(fData); // play sound num
        	    NEXT = "";
            } else {
		    if ( isNaN(Math.abs(fData)) ) {
			    NEXT = fData;
		    } else {
			    NEXT = Math.abs(fData);
			    $$("normal").className = "";
			    if (fData < 0) $$("normal").className = "flash";
			    if (FRAME && isNaN(Math.abs(data[FRAME - 1].split(SPLIT)[0]))) FRAME_START = FRAME - 1;
		    }
            }
            $$("normal").src = oType[FRAME].src;
            setTimeout(swapImage, TICK);
            grab(NEXT);
        } else {
            FRAME = (FRAME_DIR > 0) ? -1 : LAST_FRAME;
            if (LOOP) {
                setTimeout(swapImage, LOOP);
            } else {
                END(); // has finished
            }
        }
    }
}

function grab(NEXT){
	if (isNaN(NEXT)) { // "" = 0
		FRAME = NEXT.replace( /[^0-9]+/ ,'').replace("e",''); // load end frame
	} else {
		if (bClickedImage){
			bClickedImage = false;
			if (NEXT) { // frame != 0
				if (!bClickDelay) FRAME = NEXT; // load next if no click delay
			} else {
				bClickDelay = CLICK_DELAY; // click to soon
			}
		}
		if (bClickDelay) bClickDelay--;
	}
	AT(isNaN(NEXT)); // passes true if in 'looping' frame
}

function END(){} //OVERRIDE
function AT(b){} //OVERRIDE

