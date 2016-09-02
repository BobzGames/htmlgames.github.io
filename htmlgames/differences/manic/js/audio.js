// cross browser audio by Paul - http://goo.gl/zI6A

var A_PATH = "audio/";

var A_MUSIC = "music.wav"; // background music
var A_RIGHT = "right.wav";
var A_WRONG = "wrong.wav";
var A_HINTS = "hints.wav";
var A_LEVEL = "level.wav";
var A_BONUS = "bonus.wav";

var AUDIO_EXT = ".wav"; // or .mp3 etc

var bHasAudioTag;
var audio_music;
var audio_right;
var audio_wrong;
var audio_hints;
var audio_level;
var audio_bonus;

var bPaused = false;

var soundOn = true;

function audio_ext(){return AUDIO_EXT;}

function pause()
{
	if(bPaused){
		if(bSound)audio_music.play();
		fade(100);
		bPaused = false;
	}else{
		reset_bg_music();
		fade(25);
		bPaused = true;
	}
}

function sound(bState)
{
	bSound = bState;

	if(bHasAudioTag == undefined){ // init sounds
		try{
			AUDIO_EXT = audio_ext(); // global override
			bHasAudioTag = Audio;
			audio_music = new Audio(A_PATH + A_MUSIC.split(".")[0] + AUDIO_EXT);
			audio_right = new Audio(A_PATH + A_RIGHT.split(".")[0] + AUDIO_EXT);
			audio_wrong = new Audio(A_PATH + A_WRONG.split(".")[0] + AUDIO_EXT);
			audio_hints = new Audio(A_PATH + A_HINTS.split(".")[0] + AUDIO_EXT);	
			audio_level = new Audio(A_PATH + A_LEVEL.split(".")[0] + AUDIO_EXT);
			audio_bonus = new Audio(A_PATH + A_BONUS.split(".")[0] + AUDIO_EXT);

		}catch(e){
			// use IE sound
			bHasAudioTag = false;
			audio_music = new audio(A_PATH + A_MUSIC);
			audio_right = new audio(A_PATH + A_RIGHT);
			audio_wrong = new audio(A_PATH + A_WRONG);
			audio_hints = new audio(A_PATH + A_HINTS);	
			audio_level = new audio(A_PATH + A_LEVEL);
			audio_bonus = new audio(A_PATH + A_BONUS);
		}
	}

	if(bSound){
		audio_music.play();
	}else{
		reset_bg_music(true);
	}
}

function reset_bg_music(reset)
{
	if(bSound || reset){
		try{
			if(bHasAudioTag){
				audio_music.pause();
			}else{
				audio_music.stop();
			}
		}catch(e){}
	}
}

function _play()
{
	this.Audio.src=this.wav;
}

function _stop()
{
	this.Audio.src='';
}

function _volume(x)
{
	if(x<0) x=0;
	else if(x>100) x=100;
	this.Audio.volume=-((100-x)*100);
}

function _currentTime(x){}

function _load(){}

function audio(wav, lp)
{
	this.wav=wav;
	if(!lp)lp=0;
	if(document.all){
		var b=document.getElementsByTagName('BODY');
		this.Audio=document.createElement('bgsound');
		if(this.Audio){
			this.Audio.loop=lp;
			this.Audio.autostart=true;
			b[0].appendChild(this.Audio);
			this.play=_play;
			this.stop=_stop;
			this.volume=_volume;
			this.currentTime=_currentTime;
			this.load=_load;
			return this;
		}
	}
	this.play=nullFunc;
	this.stop=nullFunc;
	return this;
}

function nullFunc(){return}

function shuffle(bUseWrong,r,bAuto)
{
	if(bUseWrong && typeof temp_audio_wrong == "undefined")temp_audio_wrong = audio_wrong;
	if(typeof temp_audio_right == "undefined")temp_audio_right = audio_right;
	if(typeof temp_audio_bonus == "undefined")temp_audio_bonus = audio_bonus;
	if(typeof temp_audio_hints == "undefined")temp_audio_hints = audio_hints;
	if(typeof r != "number")r = Math.random();

	if(r > 0.34){
		if(bUseWrong){audio_wrong = temp_audio_bonus}else{audio_right = temp_audio_bonus;}	// 0.5
		if(r > 0.67){
			if(bUseWrong){audio_wrong = temp_audio_hints}else{audio_right = temp_audio_hints;}  // 1
		}
	}else{
		if(bUseWrong){audio_wrong = temp_audio_wrong}else{audio_right = temp_audio_right;}  // 0
	}
	if(bAuto)(S == 1)?S = 0:(S == 0.5)?S = 1:(S == 0)?S = 0.5:0;
}

function fade(o,obj)
{
	if(!obj) return //obj = document.getElementsByTagName("body")[0].style;
	obj.opacity = (o / 100);
	obj.filter = "alpha(opacity=" + o + ")";
}

function playBonus(){try{if(bSound){audio_bonus.load();audio_bonus.play();}}catch(e){}}
function playLevel(){try{if(bSound){audio_level.load();audio_level.play();}}catch(e){}}
function playWrong(){try{if(bSound){audio_wrong.load();audio_wrong.play();}}catch(e){}}
function playRight(){try{if(bSound){audio_right.load();audio_right.play();}}catch(e){}}
function playMusic(){try{if(bSound){audio_music.load();audio_music.play();}}catch(e){}}
function playHints(){try{if(bSound){audio_hints.load();audio_hints.play();}}catch(e){}}

