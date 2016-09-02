/*********************************************
 * TULULOO GAME MAKER
 * BY ZOLTAN PERCSICH
 * (C) SILENTWORKS 2011
 * ALL RIGHTS RESERVED.
 * WWW.TULULOO.COM
 * 
 * CONTRIBUTORS:
 * CSABA HERBUT
 * 
 * PAUL FINNERTY
 ********************************************/

// orginal from http://tululooshoot.260mb.com/ written by mike

cheat = document.location.href.match(/cheat/i);

var ua = navigator.userAgent;
var isIE = ua.match("MSIE");
var bTouch = (ua.indexOf("(iP")==-1 && ua.indexOf("Android")==-1 && ua.indexOf("BlackBerry")==-1 && ua.indexOf("HTC")==-1 && ua.indexOf("PlayBook")==-1 && ua.indexOf("webOS")==-1 && ua.indexOf("IEMobile")==-1 && ua.indexOf("Silk")==-1)?false:true;

var mouse_x;
var mouse_y;
var touch_x;
var touch_y;
var room_current = null;
var room_speed = 30;
var room_background = null;
var room_width = 0;
var room_height = 0;
var room_background_color_red = 0;
var room_background_color_green = 0;
var room_background_color_blue = 0;
var room_viewport_width = 0;
var room_viewport_height = 0;
var room_viewport_object = null;
var room_viewport_hborder = 0;
var room_viewport_vborder = 0;
var room_viewport_x = 0;
var room_viewport_y = 0;

function keyboard_check ( _key ) {
	return __keystatus__[_key] == 1 ? true : false;
}

function keyboard_check_pressed ( _key ) {
	var _val = __keypressed__[_key];
	if ( _val == 1 ) __keys_pressed__.push( _key );
	return _val == 1 ? true : false;
}

function keyboard_check_released ( _key ) {
	var _val = __keyreleased__[_key];
	if ( _val == 1) __keys_released__.push( _key );
	return _val == 1 ? true : false;
}

function mouse_check ( _key ) {
	return __mousestatus__ == 1 ? true : false;
}

function mouse_check_pressed ( ) {
	var _val = __mousepressed__;
	return _val == 1 ? true : false;
}

function mouse_check_released ( ) {
	var _val = __mousereleased__;
	return _val == 1 ? true : false;
}

function mouse_get_x() {
	return mouse_x;
}

function mouse_get_y() {
	return mouse_y;
}

function touch_check ( ) {
	return __touch__ == 1 ? true : false;
}

function touch_get_x() {
	return touch_x;
}

function touch_get_y() {
	return touch_y;
}

function lengthdir_x ( _length, _direction ) {
	return _length * Math.cos( _direction * __pi_div_180__ );
}

function lengthdir_y ( _length, _direction ) {
	return -_length * Math.sin( _direction * __pi_div_180__ );
}

function degtorad( _degree ) {
	return _degree * __pi_div_180__;
}

function radtodeg( _radian ) {
	return _radian * 180 / Math.PI;
}

function sound_play( _sound ) {
	if(isIE || bTouch)return
	if ( _sound.audio.networkState != _sound.audio.NETWORK_NO_SOURCE ) {
		switch ( _sound.type ) {
			case "wav":
				if ( __wav_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
					_sound.audio.play();
				}
			break;
			case "ogg":
				if ( __ogg_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
					_sound.audio.play();
				}
			break;
			case "mp3":
				if ( __mp3_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
					_sound.audio.play();
				}
			break;
		}
	}
}

function sound_loop( _sound ) {
	if(isIE || bTouch)return
	if ( _sound.audio.networkState != _sound.audio.NETWORK_NO_SOURCE ) {
		switch ( _sound.type ) {
			case "wav":
				if ( __wav_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
					_sound.audio.loop = true;
					_sound.audio.play();
				}
			break;
			case "ogg":
				if ( __ogg_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
					_sound.audio.loop = true;
					_sound.audio.play();
				}
			break;
			case "mp3":
				if ( __mp3_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
					_sound.audio.loop = true;
					_sound.audio.play();
				}
			break;
		}
	}
}

function sound_stop( _sound ) {
	if(isIE || bTouch)return
	if ( _sound.audio.networkState != _sound.audio.NETWORK_NO_SOURCE ) {
		switch ( _sound.type ) {
			case "wav":
				if ( __wav_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
				}
			break;
			case "ogg":
				if ( __ogg_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
				}
			break;
			case "mp3":
				if ( __mp3_is_supported__ ) {
					_sound.audio.pause();
					_sound.audio.currentTime = 0;
				}
			break;
		}
	}
}

function sound_stop_all() {
	if(isIE || bTouch)return
	for ( var _s = 0; _s < __sounds__.length; _s++ ) sound_stop( __sounds__[_s] );
}

function sound_volume( _sound, _volume ) {
	if(isIE || bTouch)return
	if ( _sound.audio.networkState != _sound.audio.NETWORK_NO_SOURCE ) {
		_sound.audio.volume = _volume;
	}
}

function draw_sprite ( _sprite_index, _sub_image, _x, _y ) {
	if ( _sprite_index != null ) {
		if ( _sub_image > _sprite_index.frames.length - 1 ) _sub_image = 0;
		ctx.save();
		ctx.translate( _x - room_viewport_x, _y - room_viewport_y );
		ctx.globalAlpha = __draw_set_alpha__;
		ctx.drawImage( _sprite_index.frames[_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset );
		ctx.restore();
	}
}

function draw_sprite_ext ( _sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha ) {
	if ( _sprite_index != null ) {
		if ( _sub_image > _sprite_index.frames.length - 1 ) _sub_image = 0;
		ctx.save();
		ctx.translate( _x - room_viewport_x, _y - room_viewport_y );
		ctx.rotate( degtorad( 360 - _rotation ) );
		ctx.globalAlpha = _alpha;
		ctx.drawImage( _sprite_index.frames[_sub_image], _xscale * -_sprite_index.xoffset , _yscale * -_sprite_index.yoffset, _xscale * _sprite_index.width, _yscale * _sprite_index.height );
		ctx.restore();
	}
}

function draw_set_alpha ( _alpha ) {
	__draw_set_alpha__ = _alpha;
}

function draw_set_color( _r, _g, _b ) {
	__draw_set_color_red__ = _r;
	__draw_set_color_green__ = _g;
	__draw_set_color_blue__ = _b;
	__draw_set_color__ = __draw_set_color_red__ + "," + __draw_set_color_green__ + "," + __draw_set_color_blue__;
	ctx.fillStyle = "rgba(" + __draw_set_color__ + ", " + __draw_set_alpha__ + ")";
	ctx.strokeStyle = "rgb(" + __draw_set_color__ + ")";
	
}

function draw_set_font ( _font ) {
	__draw_set_font__ = ( _font.bold == 1 ? "bold" : "" ) + " " + ( _font.italic == 1 ? "italic" : "" ) + " " + _font.size + "px " + _font.family;
	ctx.font = __draw_set_font__;
	ctx.textAlign = __font_halign__;
	ctx.textBaseLine = __font_valign__;
}

function draw_set_halign( _halign ) {
	__font_halign__ = _halign;
}

function draw_set_valign( _valign ) {
	__font_valign__ = _valign;
}

function draw_set_linewidth( _width ) {
	ctx.lineWidth = _width;
}

function draw_text ( _x, _y, _text ) {
	ctx.font = __draw_set_font__;
	ctx.fillStyle = "rgba(" + __draw_set_color__ + ", " + __draw_set_alpha__ + ")";
	ctx.strokeStyle = "rgba(" + __draw_set_color__ + ", " + __draw_set_alpha__ + ")";
	ctx.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}

function draw_rectangle ( _x1, _y1, _x2, _y2, _outline ) {
	ctx.fillStyle = "rgba(" + __draw_set_color__ + ", " + __draw_set_alpha__ + ")";
	ctx.strokeStyle = "rgba(" + __draw_set_color__ + ", " + __draw_set_alpha__ + ")";
	ctx.beginPath();
	if ( _outline == 0 ) {
		ctx.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	} else {
		ctx.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	}
	ctx.closePath();
}

function draw_circle ( _x, _y, _r, _outline ) {
	ctx.fillStyle = "rgba(" + __draw_set_color__ + ", " + __draw_set_alpha__ + ")";
	ctx.strokeStyle = "rgba(" + __draw_set_color__ + ", " + __draw_set_alpha__ + ")";
	ctx.beginPath();
	ctx.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, 2 * Math.PI, true );
	ctx.closePath();
	_outline == 0 ? ctx.fill() : ctx.stroke();
}

function draw_line ( _x1, _y1, _x2, _y2 ) {
	ctx.strokeStyle = "rgba(" + __draw_set_color__ + ", " + __draw_set_alpha__ + ")";
	ctx.beginPath();
	ctx.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	ctx.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	ctx.closePath();
	ctx.stroke();	
}

function room_goto( _scene ) {
	__viewport_instance__ = null;
	__room_to_go__ = _scene;
}

function room_goto_next( ) {
	var _ri = 0;
	for ( var _r = 0; _r < __scenes__.length; _r++ ) {
		if ( __scenes__[_r] == room_current ) {
			_ri = _r;
		}
	}
	if (typeof __scenes__[(_ri + 1)] == "object") {
		__viewport_instance__ = null;
		__room_to_go__ = __scenes__[(_ri + 1)];
	}
}

function room_goto_previous( ) {
	var _ri = 0;
	for ( var _r = 0; _r < __scenes__.length; _r++ ) {
		if ( __scenes__[_r] == room_current ) {
			_ri = _r;
		}
	}
	if (typeof __scenes__[(_ri - 1)] == "object") {
		__viewport_instance__ = null;
		__room_to_go__ = __scenes__[(_ri - 1)];
	}
}

function room_goto_first( ) {
	__viewport_instance__ = null;
	__room_to_go__ = __scenes__[0];
}

function room_goto_last( ) {
	__viewport_instance__ = null;
	__room_to_go__ = __scenes__[(__scenes__.length - 1)];
}

function room_restart() {
	__viewport_instance__ = null;
	__room_to_go__ = room_current;
}

function irandom( _max_value ) {
	return Math.floor( Math.random() * _max_value + 1 );
}

function viewport_scroll ( _x, _y ) {
	room_viewport_x += _x;
	room_viewport_y += _y;
}

function instance_create( _x, _y, _object ) {
	__depth_dirty__ = true;
	__obj__ = new _object.constructor;
	__obj__.object_index = _object;
	__obj__.x = _x;
	__obj__.y = _y;
	__obj__.xstart = _x;
	__obj__.ystart = _y;
	__objects__.push( __obj__ );
	__obj__.parent != null && __obj__.creation_overwritten == 0 ? __obj__.parent.__creation__.call(__obj__) : __obj__.__creation__();
	if ( room_viewport_object == _object ) __viewport_instance__ = null;
	return __obj__;
}

function position_meeting ( _x, _y, _object ) {

	for ( var _i = 0, _il = __objects__.length; _i < _il; _i++ ) {
	
		var obj = __objects__[_i];
		var spr = obj.sprite_index;
		
		if ( ( obj.object_index == _object || obj.parent == _object ) && obj.collision_checking == 1 ) {
		
			var checktype = spr.collision_shape;
			
			switch ( checktype ) {
			
				case "Box":
				
					var left = obj.x - obj.image_xscale * spr.xoffset + obj.image_xscale * spr.collision_left;
					var right = obj.x - obj.image_xscale * spr.xoffset + obj.image_xscale * spr.collision_right;
					var top = obj.y - obj.image_yscale * spr.yoffset + obj.image_yscale * spr.collision_top;
					var bottom = obj.y - obj.image_yscale * spr.yoffset + obj.image_yscale * spr.collision_bottom;
					if ( _x >= left && _x <= right && _y >= top && _y <= bottom ) return obj;
					
				break;
				
				case "Circle":
				
					var radius = spr.collision_radius * Math.max( obj.image_xscale, obj.image_yscale );
					var centerx = obj.x - obj.image_xscale * spr.xoffset + obj.image_xscale * spr.width / 2;
					var centery = obj.y - obj.image_yscale * spr.yoffset + obj.image_yscale * spr.height / 2;
					if ( radius >= Math.sqrt( Math.pow( _x - centerx, 2 ) + Math.pow( _y - centery, 2 ) ) ) return obj;
					
				break;
			
			}
			
		}
	
	}
		
	/* No object found */
	return null;
}

/* <FUNCTIONS BY CSABA HERBUT> */
function choose() {
	return arguments[Math.floor( Math.random() * arguments.length )];
}

function point_direction( _x1, _y1, _x2, _y2 ) {
	return Math.atan2( _y2 - _y1, _x1 - _x2 ) * ( 180 / Math.PI );
}

function point_distance( _x1, _y1, _x2, _y2 ) {
	return Math.sqrt( Math.pow( ( _x1 - _x2 ), 2 ) + Math.pow( ( _y1 - _y2 ), 2 ) );
}

function instance_number( _object ) {
	var __ins_num__ = 0;
	for ( var _i = 0, _il = __objects__.length; _i < _il; _i++ ) {
		var obj = __objects__[_i];
		if ( obj.object_index == _object || obj.parent == _object ) __ins_num__++;
	}
	return __ins_num__;
}

function instance_position( _x, _y, _object ) {

	for ( var _i = 0, _il = __objects__.length; _i < _il; _i++ ) {

		var obj = __objects__[_i];
		var spr = obj.sprite_index;
		
		if ( (obj.object_index == _object || obj.parent == _object ) && obj != this && obj.collision_checking == 1 ) {
		
			var checktype = obj.sprite_index.collision_shape;
			
			switch ( checktype ) {
			
				case "Box":

					var left = obj.x - obj.image_xscale * spr.xoffset + obj.image_xscale * spr.collision_left;
					var right = obj.x - obj.image_xscale * spr.xoffset + obj.image_xscale * spr.collision_right;			
					var top = obj.y - obj.image_yscale * spr.yoffset + obj.image_yscale * spr.collision_top;
					var bottom = obj.y - obj.image_yscale * spr.yoffset + obj.image_yscale * spr.collision_bottom;
					if ( _x >= left && _x <= right && _y >= top && _y <= bottom ) return obj;
					
				break;
				
				case "Circle":
				
					var radius = spr.collision_radius * Math.max( obj.image_xscale, obj.image_yscale );
					var centerx = obj.x - obj.image_xscale * spr.xoffset + obj.image_xscale * spr.width / 2;
					var centery = obj.y - obj.image_yscale * spr.yoffset + obj.image_yscale * spr.height / 2;

					var _c = 0;
					if ( _x - centerx >= radius ) _c++;
					if ( centerx - _x >= radius ) _c++;
					if ( _y - centery >= radius ) _c++;
					if ( centery - _y >= radius ) _c++;
					if ( _c == 0 ) return obj;
					
				break;

			}
			
		}
	
	}

	/* No collision found */
	return null;
}
/* </FUNCTIONS BY CSABA HERBUT> */

function save_web_data( _name, _value ) {
	window.localStorage.setItem( _name, _value );
}

function save_web_integer( _name, _value ) {
	window.localStorage.setItem( "int_" + _name, _value );
}

function save_web_float( _name, _value ) {
	window.localStorage.setItem( "float_" + _name, _value );
}

function save_web_string( _name, _value ) {
	window.localStorage.setItem( "string_" + _name, _value );
}

function load_web_data( _name ) {
	return window.localStorage.getItem( _name );
}

function load_web_integer( _name ) {
	return parseInt( window.localStorage.getItem( "int_" + _name ) );
}

function load_web_float( _name ) {
	return parseFloat( window.localStorage.getItem( "float_" + _name ) );
}

function load_web_string( _name ) {
	return window.localStorage.getItem( "string_" + _name );
}

function delete_web_data( _name ) {
	window.localStorage.removeItem( _name );
}

function delete_web_integer( _name ) {
	window.localStorage.removeItem( "int_" + _name );
}

function delete_web_string( _name ) {
	window.localStorage.removeItem( "float_" + _name );
}

function delete_web_string( _name ) {
	window.localStorage.removeItem( "string_" + _name );
}

function clear_web_data() {
	window.localStorage.clear();
}

function web_data_number() {
	return window.localStorage.length;
}

function pause_game( _key ) {
	__gamepaused__ = true;
	__gameunpausekey__ = _key;
}

function show_mouse() {
	canvas.style.cursor = "default";
}

function hide_mouse() {
	canvas.style.cursor = "none";
}

/***********************************************************************
 * ENGINE
 ***********************************************************************/
var __uid__ = 0;
var __sprites__ = [];
var __audios__ = [];
var __backgrounds__ = [];
var __fonts__ = [];
var __objects__ = [];
var __scenes__ = [];
var __keystatus__ = [];
var __keypressed__ = [];
var __keyreleased__ = [];
var __mousestatus__ = 0;
var __mousepressed__ = 0;
var __mousereleased__ = 0;
var __touch__ = 0;
var __wav_is_supported__ = false;
var __ogg_is_supported__ = false;
var __mp3_is_supported__ = false;
var canvas = null;
var ctx = null;
var __frame_time__ = 0;
var __frame_step__ = 0;
var __prev_frame_time__ = 0;
var __depth_dirty__ = true;
var __draw_set_alpha__ = 1;
var __draw_set_font__ = "Arial 12px";
var __draw_set_color_red__ = 0;
var __draw_set_color_green__ = 0;
var __draw_set_color_blue__ = 0;
var __draw_set_color__ = "rgb(" + __draw_set_color_red__ + "," + __draw_set_color_green__ + "," + __draw_set_color_blue__ + ")";
var __font__ = null;
var __loading__ = 0;
var __keys_pressed__ = [];
var __keys_released__ = [];
var __viewport_instance__ = null;
var __room_to_go__ = null;
var __font_halign__ = "left";
var __font_valign__ = "top";
var	__gamepaused__ = false;
var	__gameunpausekey__ = 27;
var __pi_div_180__ = Math.PI / 180;

var vk_0 = 48;
var vk_1 = 49;
var vk_2 = 50;
var vk_3 = 51;
var vk_4 = 52;
var vk_5 = 53;
var vk_6 = 54;
var vk_7 = 55;
var vk_8 = 56;
var vk_9 = 57;
var vk_a = (isIE)?97:65;
var vk_add = 107;
var vk_alt = 18;
var vk_b = 66;
var vk_backspace = 8;
var vk_c = 67;
var vk_ctrl = 17;
var vk_d = 68;
var vk_decimal = 110;
var vk_delete = 46;
var vk_divide = 111;
var vk_down = 40;
var vk_e = 69;
var vk_end = 35;
var vk_enter = 13;
var vk_escape = 27;
var vk_f = 70;
var vk_f1 = 112;
var vk_f10 = 121;
var vk_f11 = 122;
var vk_f12 = 123;
var vk_f2 = 113;
var vk_f3 = 114;
var vk_f4 = 115;
var vk_f5 = 116;
var vk_f6 = 117;
var vk_f7 = 118;
var vk_f8 = 119;
var vk_f9 = 120;
var vk_g = 71;
var vk_h = 72;
var vk_home = 36;
var vk_i = 73;
var vk_insert = 45;
var vk_j = 74;
var vk_k = 75;
var vk_l = 76;
var vk_left = 37;
var vk_m = 77;
var vk_multiply = 106;
var vk_n = 78;
var vk_num0 = 96;
var vk_num1 = 97;
var vk_num2 = 98;
var vk_num3 = 99;
var vk_num4 = 100;
var vk_num5 = 101;
var vk_num6 = 102;
var vk_num7 = 103;
var vk_num8 = 104;
var vk_num9 = 105;
var vk_o = (isIE)?113:79;
var vk_p = (isIE)?112:80;
var vk_pagedown = 34;
var vk_pageup = 33;
var vk_pause = 19;
var vk_q = (isIE)?113:81;
var vk_r = 82;
var vk_right = 39;
var vk_s = 83;
var vk_shift = 16;
var vk_space = 32;
var vk_subtract = 109;
var vk_t = 84;
var vk_tab = 9;
var vk_u = 85;
var vk_up = 38;
var vk_v = 86;
var vk_w = 87;
var vk_x = 88;
var vk_y = 89;
var vk_z = (isIE)?122:90;

var fa_left = "left";
var fa_center = "center";
var fa_right = "right";
var fa_top = "top";
var fa_middle = "middle";
var fa_bottom = "bottom";
 
function __global__ () {
}
global = new __global__();
 
function __detect_audio_wav__ () {
	var _a = document.createElement('audio');
	return !!(_a.canPlayType && _a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''));	
};
	
function __detect_audio_ogg__ () {
	var _a = document.createElement('audio');
	return !!(_a.canPlayType && _a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
};
	
function __detect_audio_mp3__ () {
	var _a = document.createElement('audio');
	return !!(_a.canPlayType && _a.canPlayType('audio/mpeg;').replace(/no/, ''));	
};
	
function __newuid__ () {
	__uid__++;
	return __uid__;
};

var g_keyCode = 0;
function __keypresslistener__ ( _e ) { // PF
	try{event.preventDefault();}catch(e){}
	var g_keyCode = keyCode = _e.keyCode;//alert(keyCode);
	if ( __keystatus__[keyCode] == 0 ) __keypressed__[keyCode] = 1;
	__keystatus__[keyCode] = 1;
};
	
function __keydownlistener__ ( _e ) {
	try{event.preventDefault();}catch(e){}
	var keyCode = ( window.event ) ? _e.which : _e.keyCode;
	if ( __keystatus__[keyCode] == 0 ) __keypressed__[keyCode] = 1;
	__keystatus__[keyCode] = 1;
};
	
function __keyuplistener__ ( _e ) {;
	try{event.preventDefault();}catch(e){}
	var keyCode = ( window.event ) ? _e.which : _e.keyCode;
	if ( __keystatus__[keyCode] == 1 ) __keyreleased__[keyCode] = 1;
	__keystatus__[keyCode] = 0;
	if(isIE)__keystatus__ = [];
};
	
function __mousemovelistener__ ( _e ) {
	
	if ( _e.pageX != undefined && _e.pageY != undefined ) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	
	if ( room_current != null ) {
		mouse_x -= canvas.offsetLeft;
		mouse_y -= canvas.offsetTop;			
	}
		
};
	
function __mousedownlistener__ ( _e ) {
	if ( __mousestatus__ == 0 ) __mousepressed__ = 1;
	__mousestatus__ = 1;
};
	
function __mouseuplistener__ ( _e ) {
	if ( __mousestatus__ == 1 ) __mousereleased__ = 1;
	__mousestatus__ = 0;
};

function __touchstartlistener__ ( _e ) {
	__touch__ = 1;
	_e.preventDefault();
	var __tch__ = _e.targetTouches[0];
	touch_x = __tch__.pageX;
	touch_y = __tch__.pageY;
};

function __touchendlistener__ ( _e ) {
	__touch__ = 0;
	_e.preventDefault();
	var __tch__ = _e.targetTouches[0];
	touch_x = __tch__.pageX;
	touch_y = __tch__.pageY;
};

function __touchmovelistener__ ( _e ) {
	_e.preventDefault();
	var __tch__ = _e.targetTouches[0];
	touch_x = __tch__.pageX;
	touch_y = __tch__.pageY;
};
	
function __mouseuplistener__ ( _e ) {
	if ( __mousestatus__ == 1 ) __mousereleased__ = 1;
	__mousestatus__ = 0;
};

function __place_meeting__ ( _x, _y, _object ) {

	this.other = null;

	// Is collision checking available?
	if ( this.collision_checking == 1 ) {

		var spr1 = this.sprite_index;
		if ( spr1 != null ) {
			var left1 = _x - this.image_xscale * spr1.xoffset + this.image_xscale * spr1.collision_left;
			var right1 = _x - this.image_xscale * spr1.xoffset + this.image_xscale * spr1.collision_right;
			var top1 = _y - this.image_yscale * spr1.yoffset + this.image_yscale * spr1.collision_top;
			var bottom1 = _y - this.image_yscale * spr1.yoffset + this.image_yscale * spr1.collision_bottom;
			var center1x = _x - this.image_xscale * spr1.xoffset + this.image_xscale * spr1.width / 2;
			var center1y = _y - this.image_yscale * spr1.yoffset + this.image_yscale * spr1.height / 2;
			var radius1 = spr1.collision_radius * Math.max( this.image_xscale, this.image_yscale );
		}
	
		for ( var _i = 0, _il = __objects__.length; _i < _il; _i++ ) {
		
			var obj = __objects__[_i];
			var spr2 = obj.sprite_index;
			
			if ( obj.collision_checking == 1 && spr1 != null && spr2 != null && ( obj.object_index == _object || obj.parent == _object ) && obj != this  ) {
		
				var checktype = spr1.collision_shape + spr2.collision_shape;
				
				switch ( checktype ) {
				
					case "BoxBox":
					
						var left2 = obj.x - obj.image_xscale * spr2.xoffset + obj.image_xscale * spr2.collision_left;
						var right2 = obj.x - obj.image_xscale * spr2.xoffset + obj.image_xscale * spr2.collision_right;
						var top2 = obj.y - obj.image_yscale * spr2.yoffset + obj.image_yscale * spr2.collision_top;
						var bottom2 = obj.y - obj.image_yscale * spr2.yoffset + obj.image_yscale * spr2.collision_bottom;
						
						var _c = 0;
						if ( bottom1 <= top2 ) _c++;
						if ( top1 >= bottom2 ) _c++;
						if ( right1 <= left2 ) _c++;
						if ( left1 >= right2 ) _c++;
						if ( _c == 0 ) {
							this.other = obj;
							obj.other = this;
							return obj;
						}
						
					break;
					
					case "BoxCircle":
					
						var radius2 = spr2.collision_radius * Math.max( obj.image_xscale, obj.image_yscale );
						var center2x = obj.x - obj.image_xscale * spr2.xoffset + obj.image_xscale * spr2.width / 2;
						var center2y = obj.y - obj.image_yscale * spr2.yoffset + obj.image_yscale * spr2.height / 2;

						var _c = 0;
						if ( left1 - center2x >= radius2 ) _c++;
						if ( center2x - right1 >= radius2 ) _c++;
						if ( top1 - center2y >= radius2 ) _c++;
						if ( center2y - bottom1 >= radius2 ) _c++;
						if ( _c == 0 ) {
							this.other = obj;
							obj.other = this;
							return obj;
						}
						
					break;
					
					case "CircleBox":

						var left2 = obj.x - obj.image_xscale * spr2.xoffset + obj.image_xscale * spr2.collision_left;
						var right2 = obj.x - obj.image_xscale * spr2.xoffset + obj.image_xscale * spr2.collision_right;			
						var top2 = obj.y - obj.image_yscale * spr2.yoffset + obj.image_yscale * spr2.collision_top;
						var bottom2 = obj.y - obj.image_yscale * spr2.yoffset + obj.image_yscale * spr2.collision_bottom;
						
						var _c = 0;
						if ( left2 - center1x >= radius1 ) _c++;
						if ( center1x - right2 >= radius1 ) _c++;
						if ( top2 - center1y >= radius1 ) _c++;
						if ( center1y - bottom2 >= radius1 ) _c++;
						if ( _c == 0 ) {
							this.other = obj;
							obj.other = this;
							return obj;
						}
						
					break;
					
					case "CircleCircle":
					
						var center2x = obj.x - obj.image_xscale * spr2.xoffset + obj.image_xscale * spr2.width / 2;
						var center2y = obj.y - obj.image_yscale * spr2.yoffset + obj.image_yscale * spr2.height / 2;
						var radius2 = spr2.collision_radius * Math.max( obj.image_xscale, obj.image_yscale );
						
						if ( radius1 + radius2 >= Math.sqrt( Math.pow( center1x - center2x, 2 ) + Math.pow( center1y - center2y, 2 ) ) ) {
							this.other = obj;
							obj.other = this;
							return obj;
						}
					
					break;
				
				}
				
			}
		
		}
		
	}
	
	/* No collision found */
	return null;
}

function __move_towards_point__( _x, _y, _speed ) {

	if ( _speed != 0 ) {
	
		var _dir = Math.atan2( _y - this.y, this.x - _x ) * ( 180 / Math.PI );
		var _dist = Math.sqrt( Math.pow( ( this.x - _x ), 2 ) + Math.pow( ( this.y - _y ), 2 ) );
		
		if ( _speed > _dist ) _speed = _dist;
		if ( _dist > 0 ) {
			this.x += _speed * Math.cos( ( _dir - 180 ) * __pi_div_180__ );
			this.y += -_speed * Math.sin( ( _dir - 180 ) * __pi_div_180__ );
		}
	}
}

function __instance_destroy__() {
	_trash_.push( this );
}

function __init__ () {
	
	if ( document.addEventListener ) {
		document.addEventListener( "keydown", __keydownlistener__, false );
		document.addEventListener( "keyup", __keyuplistener__, false );
		document.addEventListener( "mousemove", __mousemovelistener__, false );
		document.addEventListener( "mousedown", __mousedownlistener__, false );
		document.addEventListener( "mouseup", __mouseuplistener__, false );
		document.addEventListener( "touchstart", __touchstartlistener__, false );
		document.addEventListener( "touchend", __touchendlistener__, false );
		document.addEventListener( "touchmove", __touchmovelistener__, true );
	} else {
		if(isIE)document.attachEvent( "onkeypress", __keypresslistener__ );
		document.attachEvent( "onkeydown", __keydownlistener__ );
		document.attachEvent( "onkeyup", __keyuplistener__ );
		document.attachEvent( "onmousemove", __mousemovelistener__ );
		document.attachEvent( "onmousedown", __mousedownlistener__ );
		document.attachEvent( "onmouseup", __mouseuplistener__ );
		
	}
	
	/* initialize keycodes */
	for ( var _k = 0; _k < 255; _k++ ) {
		__keystatus__[_k] = 0;
		__keypressed__[_k] = 0;
		__keyreleased__[_k] = 0;
	}
	
	/* detect supported audio formats */
	__wav_is_supported__ = __detect_audio_wav__();
	__ogg_is_supported__ = __detect_audio_ogg__();
	__mp3_is_supported__ = __detect_audio_mp3__();
	
}

function _$_( _id_ ) {
	return document.getElementById( _id_ );
}

function __handle_sprite__( _object_ ) {

	if ( _object_.sprite_index != null ) {
		_object_.sprite_width = _object_.sprite_index.width;
		_object_.sprite_height = _object_.sprite_index.height;
		_object_.sprite_xoffset = _object_.sprite_index.xoffset;
		_object_.sprite_yoffset = _object_.sprite_index.yoffset;
		_object_.image_number = _object_.sprite_index.frames.length;
		
		if ( _object_.image_single < 0 ) {
			_object_.image_index += _object_.image_speed;
			if ( _object_.image_index > _object_.image_number - 1 ) _object_.image_index = 0;
		} else {
			if ( _object_.image_single > _object_.image_number - 1 ) _object_.image_single = _object_.image_number - 1;
			_object_.image_index = _object_.image_single;
		}
	}
	
}

function __render__() {

	ctx.save();

	__frame_step__ = 0;

	/* array to store the objects to be destroyed */
	_trash_ = [];
	
	/* validate object depth order */
	if ( __depth_dirty__ ) {
		if ( __objects__.length > 0 ) {
			__objects__.sort( function( a, b ) {
				return b.depth - a.depth;
			});
			__depth_dirty__ = false;
		}
	}
	
	/* clear the canvas */
	canvas.width = canvas.width;
	canvas.height = canvas.height;
	
	/* set background color */
	canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	
	/* draw background image ( tiled ) */
	if ( room_background != null ) {

		/* No background tile */
		if ( room_background_tile_stretch == 0 && room_background_tile_x == 0 && room_background_tile_y == 0 ) ctx.drawImage( room_background, 0 - room_viewport_x, 0 - room_viewport_y );
	
		/* stretched */
		if ( room_background_tile_stretch == 1 ) {
			ctx.drawImage( room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height );
		} else {
		
			/* Tile horizontally */
			if ( room_background_tile_x == 1 && room_background_tile_y == 0 ) {
				for ( var _ht = 0; _ht < room_width; _ht += room_background.width ) ctx.drawImage( room_background, _ht - room_viewport_x, 0 - room_viewport_y );
			}
			
			/* Tile vertically */
			if ( room_background_tile_x == 0 && room_background_tile_y == 1 ) {
				for ( var _vt = 0; _vt < room_height; _vt += room_background.height ) ctx.drawImage( room_background, 0 - room_viewport_x, _vt - room_viewport_y );
			}				

			/* Tile horizontally and vertically */
			if ( room_background_tile_x == 1 && room_background_tile_y == 1 ) {
				for ( var _ht = 0; _ht < room_width; _ht += room_background.width ) {
					for ( var _vt = 0; _vt < room_height; _vt += room_background.height ) {
						ctx.drawImage( room_background, _ht - room_viewport_x, _vt - room_viewport_y );
					}
				}
			}
		
		}
	}
	
	/* call object events */
	for ( var _r = 0, _rl = __objects__.length; _r < _rl; _r++ ) {
	
		var _obj_ = __objects__[_r];
	
		/* find first instance of viewport object */
		if ( room_viewport_object != null && __viewport_instance__ == null ) {
			if ( _obj_.object_index == room_viewport_object || (_obj_.parent != "" && _obj_.parent == room_viewport_object) ) {
				__viewport_instance__ = _obj_;
				room_viewport_x = Math.min( _obj_.x - room_viewport_x - room_viewport_width + room_viewport_hborder, room_width - room_viewport_width );
				room_viewport_y = Math.min( _obj_.y - room_viewport_y - room_viewport_height + room_viewport_vborder, room_height - room_viewport_height );
				if ( room_viewport_x < 0 ) room_viewport_x = 0;
				if ( room_viewport_y < 0 ) room_viewport_y = 0;
			}
		}
	
		/* pre process:  move object according to its speed and direction */
		var _temp_ = _obj_.direction * __pi_div_180__;
		_obj_._degtorad_ = !isNaN(_temp_) ? _temp_ : 0;
		_obj_.x += _obj_.speed * Math.cos( _obj_._degtorad_ );
		_obj_.y += -_obj_.speed * Math.sin( _obj_._degtorad_ );

		/* main events */
		_obj_.parent != null && _obj_.step_overwritten == 0 ? _obj_.parent.__step__.call(_obj_) : _obj_.__step__();
		_obj_.parent != null && _obj_.collision_overwritten == 0 ? _obj_.parent.__collision__.call(_obj_) : _obj_.__collision__();
		_obj_.parent != null && _obj_.draw_overwritten == 0 ? _obj_.parent.__draw__.call(_obj_) : _obj_.__draw__();
		_obj_.parent != null && _obj_.animation_end_overwritten == 0 ? _obj_.parent.__animationend__.call(_obj_) : _obj_.__animationend__();
		
		/* post process */
		_obj_.xspeed = _obj_.x - _obj_.xprevious;
		_obj_.yspeed = _obj_.y - _obj_.yprevious;
		_obj_.xprevious = _obj_.x;
		_obj_.yprevious = _obj_.y;
		
	}

	/* clear mouse states and keypressed / keyrelesed statuses */
	__mousepressed__ = 0;
	__mousereleased__ = 0;
	for ( var _k = 0; _k < __keys_pressed__.length; _k++ ) __keypressed__[__keys_pressed__[_k]] = 0;
	for ( var _k = 0; _k < __keys_released__.length; _k++ ) __keyreleased__[__keys_released__[_k]] = 0;
	__keys_pressed__ = [];
	__keys_released__ = [];
	
	/* remove objects from destroy stack */
	for ( var _r = 0; _r < _trash_.length; _r++ ) {
		var rem_obj = _trash_[_r];
		for ( var _a = 0, _al = __objects__.length; _a < _al; _a++ ) {
			var obj = __objects__[_a];
			if ( obj == rem_obj ) {
				obj.parent != null && obj.destroy_overwritten == 0 ? obj.parent.__destroy__.call(obj) : obj.__destroy__();
				__objects__.splice( _a, 1 );
			}
		}
	}
	
	/* follow object */
	if ( __viewport_instance__ != null ) {
	
		/* viewport border points */
		var _v1x = room_viewport_x + room_viewport_hborder;
		var _v1y = room_viewport_y + room_viewport_vborder;
		var _v3x = room_viewport_x + room_viewport_width - room_viewport_hborder;
		var _v3y = room_viewport_y + room_viewport_height - room_viewport_vborder;
	
		if ( _v3x < __viewport_instance__.x && room_viewport_x < room_width - room_viewport_width ) room_viewport_x += __viewport_instance__.xspeed;
		if ( _v1x > __viewport_instance__.x && room_viewport_x > 0 ) room_viewport_x += __viewport_instance__.xspeed;
		if ( _v3y < __viewport_instance__.y && room_viewport_y < room_height - room_viewport_height) room_viewport_y += __viewport_instance__.yspeed;
		if ( _v1y > __viewport_instance__.y && room_viewport_y > 0) room_viewport_y += __viewport_instance__.yspeed;
	}
	
	ctx.restore();

	
}

function __loop__() {

	/* calculate render time */
	__frame_time__ = (new Date()).getTime();
	__frame_step__ += ( __frame_time__ - __prev_frame_time__ );
	
	// start the specified room
	if ( __room_to_go__ != null ) {
		room_current = __room_to_go__;
		__room_to_go__ = null;
		room_current.start();
	}
	
	// continue game with the UN-Pause key
	if ( __gamepaused__ && keyboard_check_pressed( __gameunpausekey__ ) ) __gamepaused__ = false;
	
	/* render game */
	if ( __frame_step__ >= 1000 / room_speed && __loading__ == 0 && canvas != null && !__gamepaused__ ) {
		__render__();
	}
	
	/* repeat loop */
	__prev_frame_time__ = __frame_time__;
	setTimeout(__gameloop__, 5);
}
__init__();

/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __s_player() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_player_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_player_1.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_player_2.png';
this.frames.push(__frame__);
this.width = 34;
this.height = 12;
this.xoffset = 17;
this.yoffset = 6;
this.collision_shape = 'Box';
this.collision_radius = 24;
this.collision_left = 5;
this.collision_right = 25;
this.collision_top = 4;
this.collision_bottom = 8;
};
var s_player = new __s_player();
__sprites__.push(s_player);
function __s_shoot() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_shoot_0.png';
this.frames.push(__frame__);
this.width = 7;
this.height = 3;
this.xoffset = 3;
this.yoffset = 1;
this.collision_shape = 'Box';
this.collision_radius = 5;
this.collision_left = 0;
this.collision_right = 11;
this.collision_top = 0;
this.collision_bottom = 5;
};
var s_shoot = new __s_shoot();
__sprites__.push(s_shoot);
function __s_playershadow() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_playershadow_0.png';
this.frames.push(__frame__);
this.width = 7;
this.height = 7;
this.xoffset = 3;
this.yoffset = 3;
this.collision_shape = 'Box';
this.collision_radius = 8;
this.collision_left = 0;
this.collision_right = 16;
this.collision_top = 0;
this.collision_bottom = 16;
};
var s_playershadow = new __s_playershadow();
__sprites__.push(s_playershadow);
function __s_text() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_text_0.png';
this.frames.push(__frame__);
this.width = 14;
this.height = 14;
this.xoffset = 7;
this.yoffset = 7;
this.collision_shape = 'Box';
this.collision_radius = 12;
this.collision_left = 0;
this.collision_right = 24;
this.collision_top = 0;
this.collision_bottom = 24;
};
var s_text = new __s_text();
__sprites__.push(s_text);
function __s_stars() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_stars_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_stars_1.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_stars_2.png';
this.frames.push(__frame__);
this.width = 9;
this.height = 9;
this.xoffset = 4;
this.yoffset = 4;
this.collision_shape = 'Box';
this.collision_radius = 7;
this.collision_left = 0;
this.collision_right = 15;
this.collision_top = 0;
this.collision_bottom = 15;
};
var s_stars = new __s_stars();
__sprites__.push(s_stars);
function __s_littleplayer() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_littleplayer_0.png';
this.frames.push(__frame__);
this.width = 8;
this.height = 8;
this.xoffset = 4;
this.yoffset = 4;
this.collision_shape = 'Box';
this.collision_radius = 8;
this.collision_left = 0;
this.collision_right = 16;
this.collision_top = 0;
this.collision_bottom = 6;
};
var s_littleplayer = new __s_littleplayer();
__sprites__.push(s_littleplayer);
function __s_background() {
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_background_0.png';
this.frames.push(__frame__);
this.width = 160;
this.height = 160;
this.xoffset = 0;
this.yoffset = 0;
this.collision_shape = 'Box';
this.collision_radius = 80;
this.collision_left = 0;
this.collision_right = 160;
this.collision_top = 0;
this.collision_bottom = 160;
};
var s_background = new __s_background();
__sprites__.push(s_background);
function __s_tululoo1() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_tululoo1_0.png';
this.frames.push(__frame__);
this.width = 304;
this.height = 50;
this.xoffset = 152;
this.yoffset = 25;
this.collision_shape = 'Box';
this.collision_radius = 152;
this.collision_left = 0;
this.collision_right = 304;
this.collision_top = 0;
this.collision_bottom = 50;
};
var s_tululoo1 = new __s_tululoo1();
__sprites__.push(s_tululoo1);
function __s_tululoo2() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_tululoo2_0.png';
this.frames.push(__frame__);
this.width = 244;
this.height = 51;
this.xoffset = 122;
this.yoffset = 25;
this.collision_shape = 'Box';
this.collision_radius = 122;
this.collision_left = 0;
this.collision_right = 244;
this.collision_top = 0;
this.collision_bottom = 51;
};
var s_tululoo2 = new __s_tululoo2();
__sprites__.push(s_tululoo2);
function __s_enemyshoot1() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_enemyshoot1_0.png';
this.frames.push(__frame__);
this.width = 7;
this.height = 7;
this.xoffset = 3;
this.yoffset = 3;
this.collision_shape = 'Box';
this.collision_radius = 3;
this.collision_left = 2;
this.collision_right = 5;
this.collision_top = 2;
this.collision_bottom = 5;
};
var s_enemyshoot1 = new __s_enemyshoot1();
__sprites__.push(s_enemyshoot1);
function __s_boss1() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_boss1_0.png';
this.frames.push(__frame__);
this.width = 96;
this.height = 90;
this.xoffset = 48;
this.yoffset = 45;
this.collision_shape = 'Box';
this.collision_radius = 48;
this.collision_left = 30;
this.collision_right = 80;
this.collision_top = 15;
this.collision_bottom = 75;
};
var s_boss1 = new __s_boss1();
__sprites__.push(s_boss1);
function __s_enemylaser() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_enemylaser_0.png';
this.frames.push(__frame__);
this.width = 100;
this.height = 5;
this.xoffset = 100;
this.yoffset = 3;
this.collision_shape = 'Box';
this.collision_radius = 50;
this.collision_left = 0;
this.collision_right = 100;
this.collision_top = 0;
this.collision_bottom = 5;
};
var s_enemylaser = new __s_enemylaser();
__sprites__.push(s_enemylaser);
function __s_boss2() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_boss2_0.png';
this.frames.push(__frame__);
this.width = 66;
this.height = 66;
this.xoffset = 33;
this.yoffset = 33;
this.collision_shape = 'Box';
this.collision_radius = 33;
this.collision_left = 0;
this.collision_right = 66;
this.collision_top = 0;
this.collision_bottom = 66;
};
var s_boss2 = new __s_boss2();
__sprites__.push(s_boss2);
function __s_enemyguide1() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_enemyguide1_0.png';
this.frames.push(__frame__);
this.width = 12;
this.height = 4;
this.xoffset = 6;
this.yoffset = 2;
this.collision_shape = 'Box';
this.collision_radius = 6;
this.collision_left = 4;
this.collision_right = 8;
this.collision_top = 0;
this.collision_bottom = 4;
};
var s_enemyguide1 = new __s_enemyguide1();
__sprites__.push(s_enemyguide1);
function __s_boss3() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_boss3_0.png';
this.frames.push(__frame__);
this.width = 220;
this.height = 156;
this.xoffset = 110;
this.yoffset = 78;
this.collision_shape = 'Box';
this.collision_radius = 110;
this.collision_left = 100;
this.collision_right = 180;
this.collision_top = 50;
this.collision_bottom = 106;
};
var s_boss3 = new __s_boss3();
__sprites__.push(s_boss3);
function __s_wormhead() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_wormhead_0.png';
this.frames.push(__frame__);
this.width = 31;
this.height = 26;
this.xoffset = 15;
this.yoffset = 13;
this.collision_shape = 'Box';
this.collision_radius = 15;
this.collision_left = 0;
this.collision_right = 31;
this.collision_top = 0;
this.collision_bottom = 26;
};
var s_wormhead = new __s_wormhead();
__sprites__.push(s_wormhead);
function __s_wormbody() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_wormbody_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_wormbody_1.png';
this.frames.push(__frame__);
this.width = 27;
this.height = 22;
this.xoffset = 13;
this.yoffset = 11;
this.collision_shape = 'Box';
this.collision_radius = 13;
this.collision_left = 0;
this.collision_right = 27;
this.collision_top = 0;
this.collision_bottom = 22;
};
var s_wormbody = new __s_wormbody();
__sprites__.push(s_wormbody);
function __s_boss5() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_boss5_0.png';
this.frames.push(__frame__);
this.width = 61;
this.height = 62;
this.xoffset = 30;
this.yoffset = 31;
this.collision_shape = 'Circle';
this.collision_radius = 20;
this.collision_left = 0;
this.collision_right = 61;
this.collision_top = 0;
this.collision_bottom = 62;
};
var s_boss5 = new __s_boss5();
__sprites__.push(s_boss5);
function __s_finalboss() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_finalboss_0.png';
this.frames.push(__frame__);
this.width = 253;
this.height = 254;
this.xoffset = 60;
this.yoffset = 127;
this.collision_shape = 'Box';
this.collision_radius = 126;
this.collision_left = 40;
this.collision_right = 90;
this.collision_top = 110;
this.collision_bottom = 150;
};
var s_finalboss = new __s_finalboss();
__sprites__.push(s_finalboss);
function __s_e1() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e1_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e1_1.png';
this.frames.push(__frame__);
this.width = 20;
this.height = 20;
this.xoffset = 10;
this.yoffset = 10;
this.collision_shape = 'Box';
this.collision_radius = 10;
this.collision_left = 4;
this.collision_right = 16;
this.collision_top = 4;
this.collision_bottom = 16;
};
var s_e1 = new __s_e1();
__sprites__.push(s_e1);
function __s_e2() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e2_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e2_1.png';
this.frames.push(__frame__);
this.width = 32;
this.height = 32;
this.xoffset = 16;
this.yoffset = 16;
this.collision_shape = 'Box';
this.collision_radius = 16;
this.collision_left = 8;
this.collision_right = 24;
this.collision_top = 8;
this.collision_bottom = 24;
};
var s_e2 = new __s_e2();
__sprites__.push(s_e2);
function __s_e5() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e5_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e5_1.png';
this.frames.push(__frame__);
this.width = 40;
this.height = 20;
this.xoffset = 20;
this.yoffset = 10;
this.collision_shape = 'Box';
this.collision_radius = 15;
this.collision_left = 4;
this.collision_right = 46;
this.collision_top = 5;
this.collision_bottom = 16;
};
var s_e5 = new __s_e5();
__sprites__.push(s_e5);
function __s_e6() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e6_0.png';
this.frames.push(__frame__);
this.width = 35;
this.height = 33;
this.xoffset = 17;
this.yoffset = 16;
this.collision_shape = 'Box';
this.collision_radius = 17;
this.collision_left = 5;
this.collision_right = 30;
this.collision_top = 5;
this.collision_bottom = 28;
};
var s_e6 = new __s_e6();
__sprites__.push(s_e6);
function __s_e8() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e8_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e8_1.png';
this.frames.push(__frame__);
this.width = 25;
this.height = 25;
this.xoffset = 12;
this.yoffset = 12;
this.collision_shape = 'Box';
this.collision_radius = 12;
this.collision_left = 4;
this.collision_right = 21;
this.collision_top = 4;
this.collision_bottom = 21;
};
var s_e8 = new __s_e8();
__sprites__.push(s_e8);
function __s_e3() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e3_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e3_1.png';
this.frames.push(__frame__);
this.width = 25;
this.height = 24;
this.xoffset = 12;
this.yoffset = 12;
this.collision_shape = 'Box';
this.collision_radius = 12;
this.collision_left = 5;
this.collision_right = 20;
this.collision_top = 5;
this.collision_bottom = 19;
};
var s_e3 = new __s_e3();
__sprites__.push(s_e3);
function __s_e10() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e10_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e10_1.png';
this.frames.push(__frame__);
this.width = 22;
this.height = 22;
this.xoffset = 11;
this.yoffset = 11;
this.collision_shape = 'Box';
this.collision_radius = 11;
this.collision_left = 4;
this.collision_right = 18;
this.collision_top = 4;
this.collision_bottom = 18;
};
var s_e10 = new __s_e10();
__sprites__.push(s_e10);
function __s_e9() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e9_0.png';
this.frames.push(__frame__);
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_e9_1.png';
this.frames.push(__frame__);
this.width = 40;
this.height = 22;
this.xoffset = 20;
this.yoffset = 11;
this.collision_shape = 'Box';
this.collision_radius = 20;
this.collision_left = 0;
this.collision_right = 40;
this.collision_top = 0;
this.collision_bottom = 22;
};
var s_e9 = new __s_e9();
__sprites__.push(s_e9);
function __s_explosion() { 
this.frames = [];
var __frame__ = new Image();
__loading__++;
__frame__.onload = function() {__loading__--;};
__frame__.onerror = function() {__loading__--;};
__frame__.src = 'images/s_explosion_0.png';
this.frames.push(__frame__);
this.width = 25;
this.height = 25;
this.xoffset = 12;
this.yoffset = 12;
this.collision_shape = 'Box';
this.collision_radius = 12;
this.collision_left = 0;
this.collision_right = 25;
this.collision_top = 0;
this.collision_bottom = 25;
};
var s_explosion = new __s_explosion();
__sprites__.push(s_explosion);


/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __m_playershoot() { 
this.type = 'wav';
this.audio = document.createElement('audio');
this.audio.setAttribute('src', 'audio/playershoot.wav');
};
var m_playershoot = new __m_playershoot();
__audios__.push(m_playershoot);
function __m_coin() { 
this.type = 'wav';
this.audio = document.createElement('audio');
this.audio.setAttribute('src', 'audio/coin.wav');
};
var m_coin = new __m_coin();
__audios__.push(m_coin);
function __m_laser() { 
this.type = 'wav';
this.audio = document.createElement('audio');
this.audio.setAttribute('src', 'audio/laser.wav');
};
var m_laser = new __m_laser();
__audios__.push(m_laser);
function __m_bigexplosion() { 
this.type = 'wav';
this.audio = document.createElement('audio');
this.audio.setAttribute('src', 'audio/bigexplosion.wav');
};
var m_bigexplosion = new __m_bigexplosion();
__audios__.push(m_bigexplosion);
function __m_explosion() { 
this.type = 'wav';
this.audio = document.createElement('audio');
this.audio.setAttribute('src', 'audio/explosion.wav');
};
var m_explosion = new __m_explosion();
__audios__.push(m_explosion);
function __m_guide() { 
this.type = 'wav';
this.audio = document.createElement('audio');
this.audio.setAttribute('src', 'audio/guide.wav');
};
var m_guide = new __m_guide();
__audios__.push(m_guide);
function __m_littleexplosion() { 
this.type = 'wav';
this.audio = document.createElement('audio');
this.audio.setAttribute('src', 'audio/littleexplosion.wav');
};
var m_littleexplosion = new __m_littleexplosion();
__audios__.push(m_littleexplosion);


/***********************************************************************
 * MUSICS
 ***********************************************************************/
function __m_maintheme() { 
this.type = 'mp3';
this.audio = document.createElement('audio');
this.audio.setAttribute('src', 'bgm01_22so.mp3');
};
var m_maintheme = new __m_maintheme();
__audios__.push(m_maintheme);


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/


/***********************************************************************
 * FONTS
 ***********************************************************************/
function __f_bigFont() { 
this.family = 'Arial';
this.size = 20;
this.bold = 1;
this.italic = 0;
};
var f_bigFont = new __f_bigFont();
__fonts__.push(f_bigFont);
function __f_littleFont() { 
this.family = 'Arial';
this.size = 12;
this.bold = 1;
this.italic = 0;
};
var f_littleFont = new __f_littleFont();
__fonts__.push(f_littleFont);
function __f_middleFont() { 
this.family = 'Arial';
this.size = 14;
this.bold = 1;
this.italic = 0;
};
var f_middleFont = new __f_middleFont();
__fonts__.push(f_middleFont);


/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __o_player() {
this.id = this;
this.visible = 1;
this.object_index = o_player;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_gameobject;
this.sprite_index = s_player;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.player=id;

this.playerspeed=4;
this.playershoottime=3;
this.playerdefaultshoot=3;

this.playershootcounter=0;
this.playermaxshoots=this.playerdefaultshoot;

this.stage=0;


}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage++;
if(this.stage<100)
{
	image_alpha=0.5;
}
else
{
	image_alpha=1;
}

this.playershootcounter++;
this.playerframespeed=this.playerspeed;

if(keyboard_check(vk_i))global.gameplayer++;

if(keyboard_check(vk_z))
{
	this.playerframespeed/=3;
	if(this.playershootcounter>this.playershoottime&&instance_number(o_playershoot)<this.playermaxshoots)
	{
		sound_play(m_playershoot);
		instance_create(x,y+3,o_playershoot);
		if(global.playershadow!=0)
		{
			l=instance_create(global.playershadow.x,global.playershadow.y,o_playershoot);
			l.direction=-global.playershadow.image_angle*180/3.14159;
			l.image_angle=-global.playershadow.image_angle*180/3.14159;
		}
		this.playershootcounter=0;
	}
}

image_single=0;

if (keyboard_check(vk_left) || keyboard_check(vk_o))x-=this.playerframespeed;
if (keyboard_check(vk_right) || keyboard_check(vk_p))x+=this.playerframespeed;
if (keyboard_check(vk_up) || keyboard_check(vk_q)){y-=this.playerframespeed;image_single=1;}
if (keyboard_check(vk_down) || keyboard_check(vk_a)){y+=this.playerframespeed;image_single=2;}

if(x<s_player.width/2)x=s_player.width/2;
if(y<40+s_player.height/2)y=40+s_player.height/2;
if(x>room_width-s_player.width/2)x=room_width-s_player.width/2;
if(y>room_height-12-s_player.height/2)y=room_height-12-s_player.height/2;


}
};
this.collision_overwritten = 1;
this.__collision__ = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, o_enemyshoot);
if(this.other != null) {
if(this.stage>100)destroyplayer();

}
this.other = this.place_meeting(this.x, this.y, o_enemy);
if(this.other != null) {
if(this.stage>100)destroyplayer();

}
this.other = this.place_meeting(this.x, this.y, o_playershadowget);
if(this.other != null) {
if(this.stage>100)
{
	this.playermaxshoots=this.playerdefaultshoot*2;
	instance_create(x,y,o_playershadow);
	with(other)instance_destroy();
	sound_play(m_coin);
}

}
}
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_player = new __o_player();
function __o_playershoot() {
this.id = this;
this.visible = 1;
this.object_index = o_playershoot;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 40;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_gameobject;
this.sprite_index = s_shoot;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
speed=10;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if((x>room_width)||(x<0)||(y>room_height)||(y<0))instance_destroy();

}
};
this.collision_overwritten = 1;
this.__collision__ = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, o_enemy);
if(this.other != null) {
//Chequeamos el otro objeto aqui...
with(other)
{
	energy-=1;
	if(energy==0)
	{
		if(objecttype==0)
		{
			sound_play(m_littleexplosion);
			createlittleexplosion(x,y);
			addscore(500);
			instance_destroy();
		}
		if(objecttype==1)
		{
			sound_play(m_explosion);
			createexplosion(x,y);
			addscore(1000);
			instance_destroy();
		}
		if(objecttype==2)
		{
			sound_play(m_bigexplosion);
			createbigexplosion(x,y);
			addscore(5000);
			global.bossnumber--;
			if(global.bossnumber==0)
			{
				destroyenemys();
				if(global.stagecontroller==0)instance_destroy(global.stagecontroller);
				instance_create(0,0,o_stagecontroller);
			}
			instance_destroy();
		}
		if(objecttype==3)
		{
			sound_play(m_bigexplosion);
			addscore(10000);
			var b=instance_create(x,y,o_megaexplosion);
			b.bosstarget=id;
			stage=10;
		}

	}
}

//Aqui terminamos con el disparo...
instance_create(x,y,o_explosion);
sound_play(m_playershoot);
global.gamescore+=10;
instance_destroy();

}
}
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_playershoot = new __o_playershoot();
function __o_gamecounts() {
this.id = this;
this.visible = 1;
this.object_index = o_gamecounts;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.gamecounter=id;
}
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 1;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_halign(fa_left);
draw_set_valign(fa_top);


printtext(26,36,"score");
printnumber(66,36,global.gamescore);

if(global.gameplayer>0)
{
	for(a=0;a<global.gameplayer;a++)
	{
		draw_sprite(s_littleplayer,0,480-(a*10),32);
	}
}

}
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_gamecounts = new __o_gamecounts();
function __o_playershadow() {
this.id = this;
this.visible = 1;
this.object_index = o_playershadow;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = s_playershadow;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.playershadow=id;
shadowdistance=26;
targetangle=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if (keyboard_check(vk_z))
{
}
else
{
targetangle=Math.atan2(y-global.player.y,x-global.player.x);
}
x=global.player.x+shadowdistance*Math.cos(targetangle);
y=global.player.y+shadowdistance*Math.sin(targetangle);
image_angle=targetangle;




}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_playershadow = new __o_playershadow();
function __o_starfield() {
this.id = this;
this.visible = 1;
this.object_index = o_starfield;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 101;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = null;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
numstars=(isIE)?1:10;
x=0;
y=0;
speed=0.2;
direction=180;

for(a=0;a<numstars;a+=1)
{
	instance_create(irandom(room_width),30+irandom(room_height-30-12),o_star);
}

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(x<-s_background.width)x=0;
if(x>0)x-=s_background.width;
if(y<-s_background.height)y=0;
if(y>0)y-=s_background.height;

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 1;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if(!isIE && !bTouch)for(a=0;a<5;a++)for(b=0;b<3;b++)draw_sprite(s_background,0,x+(a*s_background.width),y+(b*160)); // PF
}
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_starfield = new __o_starfield();
function __o_star() {
this.id = this;
this.visible = 1;
this.object_index = o_star;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 100;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = null;
this.sprite_index = s_stars;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
l=irandom(3);
image_single=l;
speed=l*2;
direction=180;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(x<0){x+=room_width;y=30+irandom(room_height-30);}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_star = new __o_star();
function __o_stagecontroller() {
this.id = this;
this.visible = 0;
this.object_index = o_stagecontroller;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.gamestage++;
global.stagecontroller=id;

global.bossnumber=0;

instance_create(0,0,o_stageindicator);

if(global.gamestage==1)instance_create(0,0,o_stage1);
if(global.gamestage==2)instance_create(0,0,o_stage3);
if(global.gamestage==3)instance_create(0,0,o_stage4);
if(global.gamestage==4)instance_create(0,0,o_stage2);
if(global.gamestage==5)instance_create(0,0,o_stage5);
if(global.gamestage==6)instance_create(0,0,o_stage6);
global.stagecontroller=0;
instance_destroy();







}
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_stagecontroller = new __o_stagecontroller();
function __o_stageindicator() {
this.id = this;
this.visible = 1;
this.object_index = o_stageindicator;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.counter=0;
}
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 1;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
this.counter+=1;
if(this.counter==250)instance_destroy();
if(this.counter>125)
{
	draw_set_halign(fa_center);
	printbigtext(room_width/2,room_height/2,"STAGE "+global.gamestage);
}


}
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_stageindicator = new __o_stageindicator();
function __o_gamecontroller() {
this.id = this;
this.visible = 0;
this.object_index = o_gamecontroller;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.gamestage=0;
global.gamescore=0;
global.gameplayer=10;
global.playershadow=0;
global.player=0;
global.gameextras=1;

instance_create(0,0,o_stagecontroller);
instance_create(0,0,o_playerstart);
instance_create(0,0,o_gamecounts);

sound_loop2(m_maintheme);

global.gamecontroller=id;

this.stage=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(keyboard_check(vk_escape))
{
	switchtotitle();
}

this.stage++;
if(this.stage>1200)
{
	if(global.playershadow==0)instance_create(room_width+20,60+Math.random()*240,o_playershadowget);
	this.stage=0;
}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_gamecontroller = new __o_gamecontroller();
function __o_titlecontroller() {
this.id = this;
this.visible = 0;
this.object_index = o_titlecontroller;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_titleobject;
this.sprite_index = s_text;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
replaceaudios();

this.timeelapsed=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.timeelapsed++;
if(this.timeelapsed==50)instance_create(0,0,o_tululootitle1);





}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_titlecontroller = new __o_titlecontroller();
function __o_gameobject() {
this.id = this;
this.visible = 0;
this.object_index = o_gameobject;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = null;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 0;
this.__creation__ = function() {
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_gameobject = new __o_gameobject();
function __o_titleobject() {
this.id = this;
this.visible = 0;
this.object_index = o_titleobject;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = null;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 0;
this.__creation__ = function() {
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_titleobject = new __o_titleobject();
function __o_tululootitle1() {
this.id = this;
this.visible = 1;
this.object_index = o_tululootitle1;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_titleobject;
this.sprite_index = s_tululoo1;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=-200;
y=60;
sound_play(m_laser);
//switchtogame();
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(x>room_width/2)
{
	instance_create(0,0,o_tululootitle2);
	x=room_width/2;
}
else if (x<room_width/2)
{
	x+=20;
}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_tululootitle1 = new __o_tululootitle1();
function __o_tululootitle2() {
this.id = this;
this.visible = 1;
this.object_index = o_tululootitle2;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_titleobject;
this.sprite_index = s_tululoo2;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=600;
y=120;
sound_play(m_laser);
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(x<room_width/2)
{
	instance_create(0,0,o_tululootitle3);
	x=room_width/2;
}
else if (x>room_width/2)
{
	x-=20;
}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_tululootitle2 = new __o_tululootitle2();
function __o_tululootitle3() {
this.id = this;
this.visible = 1;
this.object_index = o_tululootitle3;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_titleobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
sound_play(m_bigexplosion);
instance_create(0,0,o_flash);
this.timercount=0;


}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(keyboard_check(vk_z))
{
	switchtogame();
}


}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 1;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_halign(fa_center);
draw_set_valign(fa_middle);
if(this.timercount>100)this.timercount=0;else this.timercount++;
if(this.timercount<50)printnumber(room_width/2,210,"PRESS Z KEY TO CONTINUE");
printtext(room_width/2,260,"Arrow keys (or QAOP) to move, Z to fire")
printtext(room_width/2,280,"Six stages and extras every 20.000 points")
printtext(room_width/2,300,"excanvas additions by Paul - goo.gl/zI6A")

}
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_tululootitle3 = new __o_tululootitle3();
function __o_flash() {
this.id = this;
this.visible = 1;
this.object_index = o_flash;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = null;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.alphatarget=1;

}
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 1;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
this.alphatarget-=0.02;
draw_set_alpha(this.alphatarget);
draw_set_color(255,255,255);
draw_rectangle(0,0,room_width,room_height,0);
draw_set_alpha(1);

if(this.alphatarget<0.1)instance_destroy();

}
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_flash = new __o_flash();
function __o_playerstart() {
this.id = this;
this.visible = 1;
this.object_index = o_playerstart;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_gameobject;
this.sprite_index = s_player;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=-200;
y=room_height/2;
image_single=0;
image_alpha=0.5;


}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
x+=3;
if(x>=150)
{
	instance_create(x,y,o_player);
	instance_destroy();
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_playerstart = new __o_playerstart();
function __o_enemyshoot1() {
this.id = this;
this.visible = 1;
this.object_index = o_enemyshoot1;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 60;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemyshoot;
this.sprite_index = s_enemyshoot1;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 0;
this.__creation__ = function() {
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(x<0)instance_destroy();
if(x>room_width)instance_destroy();
if(y<0)instance_destroy();
if(y>room_height)instance_destroy();

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_enemyshoot1 = new __o_enemyshoot1();
function __o_enemyshoot() {
this.id = this;
this.visible = 1;
this.object_index = o_enemyshoot;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 0;
this.__creation__ = function() {
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_enemyshoot = new __o_enemyshoot();
function __o_boss1() {
this.id = this;
this.visible = 1;
this.object_index = o_boss1;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_boss1;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.bossnumber=1;
this.stage=0;
x=room_width+100;
y=room_height/2;
this.objecttype=2;
this.energy=global.bossinitenergy;


}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(stage==0)
{
	x--;
	if(x<=room_width-75)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		stage=1;
	}
}
if(stage==1)
{
	this.timeelapsedb++;
	this.timeelapsed++;
	if(this.timeelapsed>10)
	{
		this.timeelapsed=0;
		createorientedshoot(x-40,y-40,180);
		createorientedshoot(x-40,y+40,180);
	}
	y=(room_height/2)+Math.sin(this.timeelapsedb*3.14159/180)*120;	
	if(timeelapsedb==720)stage=2;
}
if(stage==2)
{
	this.timeelapsedb++;
	if(timeelapsedb==900)stage=3;
}
if(stage==3)
{
	this.timeelapsedb++;
	if(this.timeelapsedb==1600)stage=4;
	
	this.timeelapsed++;
	if(this.timeelapsed>50)
	{
		this.timeelapsed=0;
		createlaser(x-30,y);
		createorientedtrishoot(x-40,y-40,20);
		createorientedtrishoot(x-40,y+40,20);
	}
	
	if(global.player!=0)
	{
		if(y<global.player.y-2)y+=2;
		if(y>global.player.y+2)y-=2;
	}
}
if(stage==4)
{
		if(y<room_height/2)y+=2;
		if(y>room_height/2)y-=2;
		if(Math.abs(y-room_height/2)<2)stage=5;
}
if(stage==5)
{
	this.timeelapsedb++;
	if(this.timeelapsedb==1750)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		stage=1;
	}
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_boss1 = new __o_boss1();
function __o_enemy() {
this.id = this;
this.visible = 1;
this.object_index = o_enemy;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 0;
this.__creation__ = function() {
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_enemy = new __o_enemy();
function __o_gameover() {
this.id = this;
this.visible = 1;
this.object_index = o_gameover;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
sound_stop(m_maintheme);
this.counter=0;

}
};
this.step_overwritten = 0;
this.__step__ = function() {
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 1;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
this.counter+=1;
if(this.counter==300)switchtotitle();
if(this.counter>100)
{
	draw_set_halign(fa_center);
	printbigtext(room_width/2,room_height/2,"GAME OVER ");
	if(global.gamestage==33)
	{
		printtext(room_width/2,45+room_height/2,"You have finished the game. Well Done!");		
	}
	else
	{
		printtext(room_width/2,45+room_height/2,"You have reached to Stage "+global.gamestage+". Please try again!");	
	}
}


}
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_gameover = new __o_gameover();
function __o_enemylaser1() {
this.id = this;
this.visible = 1;
this.object_index = o_enemylaser1;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 60;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemyshoot;
this.sprite_index = s_enemylaser;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
speed=20;
direction=180;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(x<-100)instance_destroy();
if(x>room_width+100)instance_destroy();
if(y<-100)instance_destroy();
if(y>room_height+100)instance_destroy();

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_enemylaser1 = new __o_enemylaser1();
function __o_boss2() {
this.id = this;
this.visible = 1;
this.object_index = o_boss2;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_boss2;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.bossnumber=1;
this.stage=0;
x=room_width+100;
y=room_height/2;
this.objecttype=2;
this.energy=global.bossinitenergy;
image_angle=180;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(stage==0)
{
	x-=2;
	if(x<=room_width/2)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		stage=1;
	}
}

if(stage==1)
{
	this.timeelapsedb++;
	this.timeelapsed++;
	image_angle=Math.cos(timeelapsedb*3.14159/360)*180;

	if(this.timeelapsed>5)
	{
		this.timeelapsed=0;
		createshoot(x,y,image_angle+45);
		createshoot(x,y,image_angle+135);
		createshoot(x,y,image_angle+225);
		createshoot(x,y,image_angle+315);
	}
	
	if(timeelapsedb==180)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		this.fromx=x;
		this.fromy=y;
		do
		{
			this.tox=(60+irandom(room_width-120)-x)/2;
		}while(Math.abs(this.tox)<50);
		do
		{
			this.toy=(40+irandom(room_height-80)-y)/2;
		}while(Math.abs(this.toy)<30);
		stage=2;
	}
}

if(stage==2)
{
	x=this.fromx+(this.tox*(1-Math.cos(timeelapsedb*3.14159/90)));
	y=this.fromy+(this.toy*(1-Math.cos(timeelapsedb*3.14159/90)));
	
	this.timeelapsedb++;
	if(timeelapsedb==90)
	{
		timeelapsedb=0;
		this.timeelapsed=0;
		stage=3;
	}
}

if(stage==3)
{
	createguidedshoot(x+40,y,0);
	createguidedshoot(x-40,y,180);
	createguidedshoot(x,y+40,270);
	createguidedshoot(x,y-40,90);
	stage=4;
}

if(stage==4)
{
	timeelapsedb++;
	
	if(timeelapsedb==90)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		this.fromx=x;
		this.fromy=y;
		do
		{
			this.tox=(60+irandom(room_width-120)-x)/2;
		}while(Math.abs(this.tox)<50);
		do
		{
			this.toy=(40+irandom(room_height-80)-y)/2;
		}while(Math.abs(this.toy)<30);
		stage=5;
	}
}

if(stage==5)
{
	x=this.fromx+(this.tox*(1-Math.cos(timeelapsedb*3.14159/90)));
	y=this.fromy+(this.toy*(1-Math.cos(timeelapsedb*3.14159/90)));
	
	this.timeelapsedb++;
	if(timeelapsedb==90)
	{
		this.timeelapsedb=0;
		this.timeelapsed=0;
		stage=6;
	}
}

if(stage==6)
{
	this.timeelapsedb++;
	this.timeelapsed++;
	image_angle=-Math.cos(timeelapsedb*3.14159/360)*180;

	if(this.timeelapsed>5)
	{
		this.timeelapsed=0;
		createshoot(x,y,image_angle+45);
		createshoot(x,y,image_angle+135);
		createshoot(x,y,image_angle+225);
		createshoot(x,y,image_angle+315);
	}

	if(timeelapsedb==180)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		this.timeelapsedc=0;
		this.fromx=x;
		this.fromy=y;
		do
		{
			this.tox=(60+irandom(room_width-120)-x)/2;
		}while(Math.abs(this.tox)<50);
		do
		{
			this.toy=(40+irandom(room_height-80)-y)/2;
		}while(Math.abs(this.toy)<30);
		stage=7;
	}
}

if(stage==7)
{
	x=this.fromx+(this.tox*(1-Math.cos(timeelapsedb*3.14159/90)));
	y=this.fromy+(this.toy*(1-Math.cos(timeelapsedb*3.14159/90)));
	
	this.timeelapsedb++;
	if(timeelapsedb==90)
	{
		this.timeelapsedb=0;
		this.timeelapsed=0;
		stage=1;
	}
}


}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_boss2 = new __o_boss2();
function __o_enemyguide1() {
this.id = this;
this.visible = 1;
this.object_index = o_enemyguide1;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 60;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemyshoot;
this.sprite_index = s_enemyguide1;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.speed=3;
this.direction=0;
this.stage=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
stage++;
if(stage<550)
{
	if(global.player!=0)
	{
		var d=((global.player.y-y)*Math.cos(direction*3.14159/180))+((global.player.x-x)*Math.sin(direction*3.14159/180));
		if(d<0)this.direction+=3;
		if(d>0)this.direction-=3;
	}
	else stage=550;
}
else if(stage>750)instance_destroy();

this.image_angle=this.direction;



}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_enemyguide1 = new __o_enemyguide1();
function __o_boss3() {
this.id = this;
this.visible = 1;
this.object_index = o_boss3;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_boss3;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.bossnumber=1;
this.stage=0;
x=room_width+150;
y=room_height/2;
this.objecttype=2;
this.energy=global.bossinitenergy;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(stage==0)
{
	x--;
	if(x<=room_width-140)
	{
		this.timeelapsedc=0;
		this.timeelapsedb=0;		
		this.timeelapsed=0;
		stage=1;
	}
}

if(stage==1)
{
	if(this.timeelapsed==0)
	{
		createorientedtrishoot(x-25,y-28,20);
		createorientedtrishoot(x-25,y+28,20);
		createsloworientedtrishoot(x-52,y-28,30);
		createsloworientedtrishoot(x-52,y+28,30);
		createorientedtrishoot(x-25,y-28,40);
		createorientedtrishoot(x-25,y+28,40);
		createsloworientedtrishoot(x-52,y-28,50);
		createsloworientedtrishoot(x-52,y+28,50);		
	}
	this.timeelapsed++;
	if(this.timeelapsed>50)
	{
		if(global.player!=0)
		{
			if(global.player.y>y)this.moving=2;
			if(global.player.y<y)this.moving=-2;
			if(global.player.y==y)this.moving=0;
			stage=2;
			this.timeelapsedb=0;
			this.timeelapsed=0;
		}
	}
}

if(stage==2)
{
	this.timeelapsed++;
	this.timeelapsedb++;
	if(this.timeelapsedb>10){this.timeelapsedb=0;createlaser(x-80,y-45);createlaser(x-80,y+45);}
	y+=this.moving;
	if(this.timeelapsed>32)
	{
		this.timeelapsedc++;
		if(this.timeelapsedc>=8)
		{
			this.timeelapsedc=0;
			this.timeelapsedb=0;			
			this.timeelapsed=0;
			stage=3;
		}
		else
		{
			this.timeelapsed=0;stage=1;
		}
	}
}

if(stage==3)
{
	this.timeelapsed++;
	if(this.timeelapsed>50)
	{
		this.moving=x;
		stage=4;
		this.timeelapsed=0;
	}
}

if(stage==4)
{
	this.timeelapsed++;
	this.x=this.moving+((110-this.moving)*Math.sin(this.timeelapsed*3.14159/180));

	if(this.timeelapsed>=90)
	{
		this.timeelapsed=0;
		this.x=110;
		stage=5;
		createguidedshoot(x+25,y,0);
		createguidedshoot(x+25,y,45);
		createguidedshoot(x+25,y,-45);		
	}
}

if(stage==5)
{
	this.timeelapsed++;
	if(this.timeelapsed>50)
	{
		stage=6;
		this.timeelapsed=0;
	}
}


if(stage==6)
{
	if(this.timeelapsed==0)
	{
		createorientedtrishoot(x+110,y+55,20);
		createorientedtrishoot(x+110,y-55,20);
		createsloworientedtrishoot(x+110,y+55,40);
		createsloworientedtrishoot(x+110,y-55,40);
	}
	this.timeelapsed++;
	if(this.timeelapsed>50)
	{
		if(global.player!=0)
		{
			if(global.player.y>y)this.moving=2;
			if(global.player.y<y)this.moving=-2;
			if(global.player.y==y)this.moving=0;
			stage=7;
			this.timeelapsedb=0;
			this.timeelapsed=0;
		}
	}
}

if(stage==7)
{
	this.timeelapsed++;
	this.timeelapsedb++;
	if(this.timeelapsedb>10){this.timeelapsedb=0;createinvertedlaser(x+25,y);}
	y+=this.moving;
	if(this.timeelapsed>32)
	{
		this.timeelapsedc++;
		if(this.timeelapsedc>=8)
		{
			this.timeelapsedc=0;
			this.timeelapsedb=0;
			this.timeelapsed=0;
			stage=8;
		}
		else
		{
			this.timeelapsed=0;stage=6;
		}
	}
}

if(stage==8)
{
	this.timeelapsed++;
	if(this.timeelapsed>50)
	{
		this.moving=x;
		stage=9;
		this.timeelapsed=0;
	}
}

if(stage==9)
{
	this.timeelapsed++;
	this.x=this.moving+((room_width-140-this.moving)*Math.sin(this.timeelapsed*3.14159/180));

	if(this.timeelapsed>=90)
	{
		this.timeelapsed=0;
		this.x=room_width-140;
		stage=1;
	}
}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_boss3 = new __o_boss3();
function __o_boss4() {
this.id = this;
this.visible = 1;
this.object_index = o_boss4;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_wormhead;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {


global.bossnumber=1;
x=room_width+50;
y=room_height-50;
direction=180;
this.objecttype=2;
this.energy=global.bossinitenergy;


this.lastx=new Array(320);
this.lasty=new Array(320);
this.lastangle=new Array(320);

for(var a=0;a<320;a++)
{
	this.lastx[a]=room_width+50+a*2;
	this.lasty[a]=room_height-50;
	this.lastangle[a]=180;
}
this.lastindex=0;

for(a=0;a<16;a++)
{
	b=instance_create(0,0,o_boss4body);
	b.head=id;
	b.headindex=12+(a*12);	
	b.image_single=0;
}
b.image_single=1;

this.counter=0;
this.counterb=0;
this.counterc=0;

this.tox=room_width/2;
this.toy=room_height/2;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
var d=((this.toy-y)*Math.cos(direction*3.14159/180))+((this.tox-x)*Math.sin(direction*3.14159/180));
if(d<0)direction+=2;
if(d>0)direction-=2;
image_angle=direction;
x+=Math.cos(direction*3.14159/180)*2;
y-=Math.sin(direction*3.14159/180)*2;
lastindex--;
if(lastindex<0)lastindex+=320;
lastx[lastindex]=x;
lasty[lastindex]=y;
lastangle[lastindex]=direction;

this.counter++;
if(this.counter==200)
{
	if(global.player!=0)
	{
		this.tox=global.player.x;
		this.toy=global.player.y;
	}
	else
	{
		this.tox=irandom(room_width);
		this.toy=irandom(room_height);
	}
	this.counter=0;
}

this.counterb++;
if(this.counterb==50)
{
	this.counterb=0;
	var a=lastindex+12+(irandom(15)*12);
	if(a>=320)a-=320;
	createslowtrishoot(lastx[a],lasty[a],0,30);
	createslowtrishoot(lastx[a],lasty[a],90,30);
	createslowtrishoot(lastx[a],lasty[a],180,30);
	createslowtrishoot(lastx[a],lasty[a],270,30);
}

this.counterc++;
if(this.counterc==500)
{
	this.counterc=0;
	var a=lastindex+(16*12);
	if(a>=320)a-=320;
	createguidedshoot(lastx[a],lasty[a],lastangle[a]-180);
}






}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_boss4 = new __o_boss4();
function __o_boss4body() {
this.id = this;
this.visible = 1;
this.object_index = o_boss4body;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_wormbody;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.objecttype=1;
this.energy=50000;
this.head=0;
this.headindex=0;


}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
var h=head.lastindex+headindex;
if(h>=320)h-=320;

x=head.lastx[h];
y=head.lasty[h];
direction=head.lastangle[h];
image_angle=head.lastangle[h];


}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_boss4body = new __o_boss4body();
function __o_boss5() {
this.id = this;
this.visible = 1;
this.object_index = o_boss5;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_boss5;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.bossnumber++;

this.stage=0;
this.customangle=global.bossnumber*120*3.14159/180;
this.customdistance=300;
this.objecttype=2;
this.energy=global.bossinitenergy/2;

if(global.bossnumber<3)instance_create(0,0,o_boss5);
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(stage==0)
{
	this.angle=this.customangle;
	customdistance-=1;
	if(customdistance<=150)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		stage=1;
	}
}

if(stage==1)
{
	this.timeelapsedb++;
	if(this.timeelapsedb==25)
	{
		this.timeelapsedb=0;
		createsloworientedshoot(x,y);
	}
	this.timeelapsed+=0.33333333333;
	this.angle=this.customangle+Math.cos(this.timeelapsed*3.14159/180)*3.14159*2;
	if(this.timeelapsed>=180)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		stage=2;
	}
}

if(stage==2)
{
	this.timeelapsed++;
	if(this.timeelapsed==50)
	{
		this.timeelapsed=0;
		stage=3;
	}
}

if(stage==3)
{
	createguidedshoot(x,y,120);
	createguidedshoot(x,y,240);
	createguidedshoot(x,y,0);
	stage=4;
}

if(stage==4)
{
	this.timeelapsed++;
	if(this.timeelapsed==50)
	{
		this.timeelapsed=0;
		stage=5;
	}
}

if(stage==5)
{
	this.timeelapsed+=0.33333333333;
	this.angle=this.customangle-Math.cos(this.timeelapsed*3.14159/180)*3.14159*2;
	if(this.timeelapsed>=180)
	{
		this.timeelapsed=0;
		this.timeelapsedb=0;
		stage=1;
	}
}

x=(Math.cos(this.angle+1.0472)*this.customdistance)+room_width/2;
y=(Math.sin(this.angle+1.0472)*this.customdistance)+room_height/2;
image_angle=-60+(-this.angle*180/3.14159);

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_boss5 = new __o_boss5();
function __o_fboss() {
this.id = this;
this.visible = 1;
this.object_index = o_fboss;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 70;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_finalboss;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
global.bossnumber=1;
this.stage=0;
x=room_width+100;
y=room_height/2;
this.objecttype=3;
this.energy=global.bossinitenergy*2;
this.alphacounter=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(stage==0)
{
	x--;
	if(x<=room_width-200)
	{
		this.timeelapsed=0;
		stage=1;
		this.timeelapsedc=0;
		this.timeelapsedb=0;
	}
}
else
{
	this.timeelapsed++;
	this.x=room_width-200+Math.sin(this.timeelapsed/30)*10;
	this.y=(room_height/2)-10+Math.cos(this.timeelapsed/30)*10;
}

if(stage==1)
{
	this.timeelapsedc++;
	if(this.timeelapsedc>=100)
	{
		this.timeelapsedc=0;
		this.timeelapsedb=0;				
		stage=2;
	}
}


if(stage==2)
{
	this.timeelapsedc++;
	if(this.timeelapsedc>=720)
	{
		this.timeelapsedc=0;
		this.timeelapsedb=0;		
		stage=3;
	}
	
	this.timeelapsedb++;
	if(this.timeelapsedb>=3)
	{
		this.timeelapsedb=0;
		createtrishoot(x,y,Math.cos(timeelapsedc*3.14159/360)*360,60);
		createtrishoot(x,y,180+Math.cos(timeelapsedc*3.14159/360)*360,60);
	}
}

if(stage==3)
{
	this.timeelapsedc++;
	if(this.timeelapsedc>=100)
	{
		this.timeelapsedc=0;
		this.timeelapsedb=0;		
		stage=4;
	}
}

if(stage==4)
{
	this.timeelapsedc++;
	if(this.timeelapsedc>=720)
	{
		this.timeelapsedc=0;
		this.timeelapsedb=0;		
		stage=5;
	}
	this.timeelapsedb++;
	if(this.timeelapsedb>=10)
	{
		this.timeelapsedb=0;
		createguidedshoot(x,y,irandom(360));
	}
}

if(stage==5)
{
	for(var i=__objects__.length-1; i>=0; i-- )
	{
		var obj=__objects__[i];
		if (obj.object_index==o_enemyguide1)with(obj)
		{
			createlittleexplosion(x,y);
			instance_destroy();
		}
		sound_play(m_littleexplosion);
	}
	stage=6;
}

if(stage==6)
{
	this.timeelapsedc++;
	if(this.timeelapsedc>=100)
	{
		this.timeelapsedc=0;
		stage=7;
	}
}

if(stage==7)
{
	this.timeelapsedc++;
	if(this.timeelapsedc>=720)
	{
		this.timeelapsedc=0;
		this.timeelapsedb=0;		
		stage=8;
	}
	this.timeelapsedb++;
	if(this.timeelapsedb>=3)
	{
		this.timeelapsedb==0;
		createtrishoot(x,y,irandom(360),45+irandom(90));
	}
}

if(stage==8)
{
	this.timeelapsedc++;
	if(this.timeelapsedc>=100)
	{
		this.timeelapsedc=0;
		stage=9;
	}
}

if(stage==9)
{
	this.timeelapsedc++;
	if(this.timeelapsedc>=720)
	{
		this.timeelapsedc=0;
		this.timeelapsedb=0;		
		stage=1;
	}
	this.timeelapsedb++;
	if(this.timeelapsedb>=5)
	{
		this.timeelapsedb=0;
		createlaser(room_width,irandom(room_height));
	}
}

if(stage==10)
{
	this.image_alpha*=0.995;
	this.image_xscale*=0.998;
	this.image_yscale*=0.998;
}
else
{
	this.alphacounter++;
	this.image_xscale=0.5+((2*global.bossinitenergy-this.energy)*0.3/global.bossinitenergy)+(Math.cos(this.alphacounter/10)/20);
	this.image_yscale=0.5+((2*global.bossinitenergy-this.energy)*0.3/global.bossinitenergy)+(Math.sin(this.alphacounter/10)/20);
	this.image_alpha=0.7+Math.sin(this.alphacounter/30)/3;
}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_fboss = new __o_fboss();
function __o_megaexplosion() {
this.id = this;
this.visible = 1;
this.object_index = o_megaexplosion;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.bosstarget=0;
this.timeelapsed=0;
this.timeelapsedb=0;
sound_stop(m_maintheme);
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.timeelapsed++;
if(this.timeelapsed>3)
{
	this.timeelapsed=0;
	this.timeelapsedb++;
	if(this.timeelapsedb<75)
	{
		createexplosion(bosstarget.x+irandom(150)-75,bosstarget.y+irandom(150)-75);
		createexplosion(bosstarget.x+irandom(150)-75,bosstarget.y+irandom(150)-75);
	}
	if(this.timeelapsedb==50)instance_create(0,0,o_preflash);
	if(this.timeelapsedb==100)
	{
		with(bosstarget)instance_destroy();
		instance_destroy();
	}
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_megaexplosion = new __o_megaexplosion();
function __o_preflash() {
this.id = this;
this.visible = 1;
this.object_index = o_preflash;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = null;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
with(global.gamecounter)instance_destroy();
this.alphatarget=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.alphatarget+=0.02;
draw_set_alpha(this.alphatarget);
draw_set_color(255,255,255);
draw_rectangle(0,0,room_width,room_height,0);
draw_set_alpha(1);

if(this.alphatarget>=1)
{
	for(var i=__objects__.length-1; i>=0; i-- )
	{
		var obj=__objects__[i];
		if(obj.object_index==o_explosion)with(obj)instance_destroy();
		if (obj.parent==o_enemy)with(obj)instance_destroy();
		if (obj.parent==o_enemyshoot)with(obj)instance_destroy();
	}
	with(global.player)instance_destroy();
	with(global.playershadow)instance_destroy();
	with(global.stagecontroller)instance_destroy();
	instance_create(0,0,o_ending);	
	instance_destroy();
}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_preflash = new __o_preflash();
function __o_ending() {
this.id = this;
this.visible = 1;
this.object_index = o_ending;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
	instance_create(0,0,o_flash);
	this.timeelapsed=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.timeelapsed++;
if(this.timeelapsed==100)
{
	global.gamestage=33;
	instance_create(0,0,o_gameover);
	instance_destroy();
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_ending = new __o_ending();
function __o_e1() {
this.id = this;
this.visible = 1;
this.object_index = o_e1;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e1;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;



}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
image_angle=this.stage*5;
this.stage+=3;

x=this.stage;
y=110+(50*Math.cos(this.stage/25));

processinvert(this);
if(stage==402)createorientedshoot(x,y);
if(stage>550)instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e1 = new __o_e1();
function __o_stage1() {
this.id = this;
this.visible = 0;
this.object_index = o_stage1;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
stage=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
stage++;
switch(stage)
{
	case 300:
		createspawner(600,o_e1creator,-1,0);
	break;
	case 1000:
		createspawner(400,o_e2,-1,0);
		//createspawner(400,o_e2,-1,0);
	break;
	case 1500:
		createspawner(100,o_e1creator,1,1);
		createspawner(100,o_e1creator,1,-1);
	break;
	case 1800:
		createspawner(100,o_e1creator,-1,1);
		createspawner(100,o_e1creator,-1,-1);		
	break;
	case 2100:
		createspawner(300,o_e2,1,0);
		createspawner(300,o_e2,-1,0);
	break;
	case 2500:
		createspawner(130,o_e4creator,1,1);
		createspawner(240,o_e2,1,0);
	break;
	case 2900:
		createspawner(130,o_e4creator,-1,-1);
		createspawner(240,o_e2,-1,0);
	break;
	case 3300:
		createspawner(100,o_e1creator,1,1);
		createspawner(100,o_e1creator,-1,-1);
	break;
	case 3500:	
		createspawner(100,o_e1creator,-1,1);
		createspawner(100,o_e1creator,1,-1);
	break;
	case 3900:
		instance_create(0,0,o_boss1);	
		instance_destroy();
	break;
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_stage1 = new __o_stage1();
function __o_enemyspawner() {
this.id = this;
this.visible = 0;
this.object_index = o_enemyspawner;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_enemy;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.nextstage=0;
this.stagelength=0;
this.enemyset=0;

this.invertedx=0;
this.invertedy=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage++;
if(this.stage>=this.stagelength)instance_destroy();
if(this.nextstage<this.stage)
{
	var b=instance_create(0,0,this.enemyset);
	if(this.invertedx==0)b.invertedx=(irandom(2)*2)-3; else b.invertedx=this.invertedx;
	if(this.invertedy==0)b.invertedy=(irandom(2)*2)-3; else b.invertedy=this.invertedy;
	
	this.nextstage=this.stage+b.stagelength;
}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_enemyspawner = new __o_enemyspawner();
function __o_e1creator() {
this.id = this;
this.visible = 0;
this.object_index = o_e1creator;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_enemy;
this.sprite_index = s_e1;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.stageb=0;
this.stagelength=120;
this.invertedx=0;
this.invertedy=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage++;
if(this.stage>=5)
{
	var b=instance_create(0,0,o_e1);
	b.invertedx=this.invertedx;
	b.invertedy=this.invertedy;
	this.stage=0;
	if(this.stageb==8)instance_destroy();
	this.stageb++;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e1creator = new __o_e1creator();
function __o_e2() {
this.id = this;
this.visible = 1;
this.object_index = o_e2;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e2;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stagelength=50;
this.iniy=60+irandom(100);



}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=1.5;

y=this.iniy;

x=120*Math.sin(this.stage*3.14159/180);
processinvert(this);

if(stage==90)createorientedtrishoot(x,y,30);
//if(stage==90)createorientedguidedshoot(x,y);
if(stage>180)instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e2 = new __o_e2();
function __o_e3() {
this.id = this;
this.visible = 1;
this.object_index = o_e3;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e3;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stagelength=60;
this.iniy=40+irandom(40);



}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=2;

y=this.iniy+this.stage*0.5;

x=150*Math.sin(this.stage*3.14159/180);
processinvert(this);

if(stage==30)createorientedshoot(x,y,30);
//if(stage==60)createorientedshoot(x,y,30);
if(stage==90)createorientedshoot(x,y,30);
//if(stage==120)createorientedshoot(x,y,30);
if(stage==150)createorientedshoot(x,y,30);
if(stage>180)instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e3 = new __o_e3();
function __o_stage2() {
this.id = this;
this.visible = 0;
this.object_index = o_stage2;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
stage=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
stage++;
switch(stage)
{
	case 300:
		createspawner(550,o_e5,-1,1);
	break;
	case 950:
		createspawner(550,o_e5,1,1);
	break;
	case 1600:
		createspawner(400,o_e12,-1,0);
	break;
	case 2100:
		createspawner(700,o_e4creator,-1,1);
		createspawner(10,o_e7,-1,1);
	break;
	case 3100:
		createspawner(400,o_e12,1,0);
	break;
	case 3600:
		createspawner(400,o_e5,1,1);
		createspawner(400,o_e5,1,1);
	break;
	case 3610:
		createspawner(400,o_e5,-1,1);
		createspawner(400,o_e5,-1,1);		
	break;
	case 4100:
		createspawner(400,o_e12,-1,0);
		createspawner(400,o_e12,1,0);
	break;
	case 4700:
		instance_create(0,0,o_boss3);
		instance_destroy();
	break;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_stage2 = new __o_stage2();
function __o_e4() {
this.id = this;
this.visible = 1;
this.object_index = o_e4;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e1;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stageb=0;
this.stagec=0;



}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
image_angle=this.stage*4;
this.stage+=5;

if(this.stageb==0)
{
	if(this.stage==360)
		{
			this.stageb=1;
			this.stage=0;
		}
	x=this.stage;
	y=60;
	processinvert(this);
}
if(this.stageb==1)
{
	x=360+120*Math.sin(this.stage*3.14159/360);
	y=180-120*Math.cos(this.stage*3.14159/360);
	processinvert(this);
	if(this.stage==0)if(Math.random()>0.7)createorientedshoot(x,y);
	
	if(this.stage==360)
	{
		this.stageb=2;
		this.stage=0;
	}
}

if(this.stageb==2)
{
	if(this.stage==360)instance_destroy();
	x=360-this.stage;
	y=300;
	processinvert(this);
	if(this.stage==0)if(Math.random()>0.7)createorientedshoot(x,y);	
}



}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e4 = new __o_e4();
function __o_e4creator() {
this.id = this;
this.visible = 0;
this.object_index = o_e4creator;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_enemy;
this.sprite_index = s_e1;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.stageb=0;
this.stagelength=120;
this.invertedx=0;
this.invertedy=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage++;
if(this.stage>=6)
{
	var b=instance_create(0,0,o_e4);
	b.invertedx=this.invertedx;
	b.invertedy=this.invertedy;
	this.stage=0;
	if(this.stageb==12)instance_destroy();
	this.stageb++;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e4creator = new __o_e4creator();
function __o_e5() {
this.id = this;
this.visible = 1;
this.object_index = o_e5;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e5;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stagelength=6;
do
{
	this.iniy=40+irandom(260);
}while(Math.abs(this.iniy-global.player.y)<20);

image_xscale=0.7;
image_yscale=0.7;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=5;
x=this.stage;
y=this.iniy;
if(x>room_width)instance_destroy();
processinvert(this);
if((stage==150)||(stage==250)||(stage==350))
{
	if(this.invertedx==-1)createlaser(x,y);
	if(this.invertedx==1)createinvertedlaser(x,y);
}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e5 = new __o_e5();
function __o_e7() {
this.id = this;
this.visible = 1;
this.object_index = o_e7;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e5;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.stageb=0;
this.energy=100;
this.objecttype=1;
this.invertedx=0;
this.invertedy=0;
this.stagelength=1200;





}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(this.stage==0)
{
	this.stageb+=2;
	x=this.stageb-30;
	if(x>=50)
	{
		this.stage=1;
		this.stageb=0;
		this.stagec=0;
	}
	y=room_height/2;
	processinvert(this);	
}

if(this.stage==1)
{
	this.stageb++;
	if(this.stageb==800)
	{
		this.stage=2;
		this.stageb=0;
	}
	x=50;
	if(global.player!=0)
	{
		if(global.player.y<y)y--;
		if(global.player.y>y)y++;
	}
	processinvert(this);
	this.stagec++;
	if(this.stagec>=50)
	{
		this.stagec=0;
		createlaser(x,y);
		//createsloworientedtrishoot(x,y,30);
	}
}
if(this.stage==2)
{
	this.stageb+=2;
	x=50-this.stageb;
	if(x<=-30)instance_destroy();
	processinvert(this);	
}



//if((stage==150)||(stage==250)||(stage==350))
//{
//	if(this.invertedx==-1)createlaser(x,y);
//	if(this.invertedx==1)createinvertedlaser(x,y);
//}

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e7 = new __o_e7();
function __o_stage3() {
this.id = this;
this.visible = 0;
this.object_index = o_stage3;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
stage=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
stage++;
switch(stage)
{
	case 300:
		createspawner(1000,o_e6,1,0);
	break;
	case 1600:
		createspawner(1000,o_e8,-1,0);		
	break;
	case 1700:
		createspawner(10,o_e6creator,1,0);	
	break;
	case 3000:
		createspawner(1000,o_e8,1,0);
	break;
	case 3100:
		createspawner(10,o_e6creator,-1,0);	
	break;
	case 4300:
		createspawner(600,o_e8,-1,0);
	break;
	case 4325:
		createspawner(600,o_e8,-1,0);
	break;
	case 5000:
		instance_create(0,0,o_boss4);
		instance_destroy();
	break;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_stage3 = new __o_stage3();
function __o_e6() {
this.id = this;
this.visible = 1;
this.object_index = o_e6;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 51;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e6;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;

this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stagelength=3;

this.iniy=40+irandom(140);
this.image_angle=Math.random()*360;
this.velr=(Math.random()*10)-5;

this.image_xscale=0.5+Math.random();
this.image_yscale=image_xscale;

this.velx=-image_xscale+(Math.random()+1)*1.5;
this.vely=(Math.random()*1.5)-0.75;

this.energy=Math.floor(this.image_xscale*5);

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=3;
image_angle+=this.velr;
x=room_width+100-(this.velx*this.stage);
if(x<-100)instance_destroy();
y=this.iniy+(this.vely*this.stage);
processinvert(this);

}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e6 = new __o_e6();
function __o_e6creator() {
this.id = this;
this.visible = 0;
this.object_index = o_e6creator;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_enemy;
this.sprite_index = s_e6;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.stageb=0;
this.stagelength=2000;
this.invertedx=0;
this.invertedy=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage++;
if(this.stage>=18)
{
	var b=instance_create(0,0,o_e6);
	b.velx/=2;
	b.vely/=2;
	b.invertedx=this.invertedx;
	b.invertedy=this.invertedy;
	this.stage=0;
	if(this.stageb==50)instance_destroy();
	this.stageb++;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e6creator = new __o_e6creator();
function __o_e8() {
this.id = this;
this.visible = 1;
this.object_index = o_e8;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e8;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.stageb=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.iniy=60+irandom(220);
this.stagelength=50;
this.inir=irandom(360)



}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=5;
this.stageb++;

x=this.stage;
y=this.iniy+(25*Math.cos(this.inir+this.stage/50));

processinvert(this);
if(stageb==25)
{
	createorientedshoot(x,y);
	stageb=0;
}
if(x>room_width+50)instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e8 = new __o_e8();
function __o_stage4() {
this.id = this;
this.visible = 0;
this.object_index = o_stage4;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
stage=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
stage++;
switch(stage)
{
	case 300:
		instance_create(room_width+10,60,o_e10creator);
	break;
	case 900:
		createspawner(10,o_e9,1,1);
		createspawner(10,o_e9,1,-1);
		createspawner(10,o_e9,-1,1);
		createspawner(10,o_e9,-1,-1);
	break;
	case 1000:
		instance_create(room_width+10,60,o_e10creator);
	break;
	case 1600:
		createspawner(10,o_e1creator,-1,-1);
		createspawner(10,o_e1creator,1,1);
	break;
	case 2000:
		createspawner(10,o_e9,1,1);
		createspawner(10,o_e9,1,-1);
		createspawner(10,o_e9,-1,1);
		createspawner(10,o_e9,-1,-1);
	break;
	case 2200:
		createspawner(10,o_e1creator,-1,-1);
		createspawner(10,o_e1creator,1,1);
	break;
	case 2700:
		instance_create(room_width+10,60,o_e10creatorb);		
	break;
	case 3500:
		createspawner(400,o_e11,-1,0);	
		createspawner(400,o_e11,1,0);	
	break;
	case 4100:
		instance_create(0,0,o_boss2);
		instance_destroy();
	break;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_stage4 = new __o_stage4();
function __o_playershadowget() {
this.id = this;
this.visible = 1;
this.object_index = o_playershadowget;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_gameobject;
this.sprite_index = s_playershadow;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
x--;
if(x<-10)instance_destroy();
this.stage++;
image_xscale=1.5+Math.sin(this.stage*3.14159/45);
image_yscale=image_xscale;
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_playershadowget = new __o_playershadowget();
function __o_e10() {
this.id = this;
this.visible = 1;
this.object_index = o_e10;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e10;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.speed=1.5;


}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
if(global.player!=0)this.direction=-Math.atan2(global.player.y-y,global.player.x-x)*180/3.14159;


}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 1;
this.__destroy__ = function() {
with(this) {
if(global.player!=0)createorientedtrishoot(x,y,30);
}
};
};
var o_e10 = new __o_e10();
function __o_e10creator() {
this.id = this;
this.visible = 0;
this.object_index = o_e10creator;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_enemy;
this.sprite_index = s_e10;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.stageb=0;
this.stagelength=120;
this.invertedx=0;
this.invertedy=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage++;
if(this.stage>=20)
{
	var b=instance_create(room_width+10,60+Math.random()*220,o_e10);
	this.stage=0;
	if(this.stageb==12)instance_destroy();
	this.stageb++;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e10creator = new __o_e10creator();
function __o_e9() {
this.id = this;
this.visible = 1;
this.object_index = o_e9;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e9;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stagelength=400;
this.iniy=60;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=1.5;

y=this.iniy;

x=80*Math.sin(this.stage*3.14159/180);
processinvert(this);

if(stage==90)createorientedguidedshoot(x,y,30);
if(stage>180)instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e9 = new __o_e9();
function __o_e10creatorb() {
this.id = this;
this.visible = 0;
this.object_index = o_e10creatorb;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_enemy;
this.sprite_index = s_e10;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
this.stage=0;
this.stageb=0;
this.stagelength=120;
this.invertedx=0;
this.invertedy=0;

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage++;
if(this.stage>=30)
{
	instance_create(-10,60+Math.random()*220,o_e10);
	instance_create(room_width+10,60+Math.random()*220,o_e10);
	this.stage=0;
	if(this.stageb==8)instance_destroy();
	this.stageb++;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e10creatorb = new __o_e10creatorb();
function __o_stage5() {
this.id = this;
this.visible = 0;
this.object_index = o_stage5;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
stage=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
stage++;
switch(stage)
{
	case 300:
		createspawner(200,o_e1creator,-1,1);
		createspawner(200,o_e1creator,1,-1);
		createspawner(200,o_e1creator,1,1);
		createspawner(200,o_e1creator,-1,-1);		
	break;
	//case 700:
	//	createspawner(3000,o_e9,1,0);
	//break;
	//case 900:
	//	createspawner(3000,o_e9,-1,0);
	//break;
	case 800:
		createspawner(400,o_e13,-1,0);
		createspawner(400,o_e13,1,0);
	break;
	case 1300:
		createspawner(200,o_e1creator,-1,1);
		createspawner(200,o_e1creator,-1,-1);
	break;
	case 1700:
		createspawner(400,o_e13,-1,0);
		createspawner(400,o_e13,1,0);
	break;
	case 2200:
		createspawner(500,o_e8,-1,0);
		createspawner(500,o_e8,1,0);		
	break;
	case 3000:
		instance_create(0,0,o_boss5);
		instance_destroy();
	break;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_stage5 = new __o_stage5();
function __o_stage6() {
this.id = this;
this.visible = 0;
this.object_index = o_stage6;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 0;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = null;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
stage=0;
}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
stage++;
switch(stage)
{
	case 300:
		instance_create(0,0,o_fboss);
		instance_destroy();
	break;	
}
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_stage6 = new __o_stage6();
function __o_explosion() {
this.id = this;
this.visible = 1;
this.object_index = o_explosion;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 10;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 0;
this.parent = o_gameobject;
this.sprite_index = s_explosion;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {

}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
image_xscale-=0.1;
image_yscale-=0.1;
if((image_xscale<=0.2)||(image_yscale<=0.2))instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_explosion = new __o_explosion();
function __o_e11() {
this.id = this;
this.visible = 1;
this.object_index = o_e11;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e3;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stagelength=60;
this.iniy=40+irandom(40);



}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=2;

y=this.iniy+this.stage*0.5;

x=150*Math.sin(this.stage*3.14159/180);
processinvert(this);

if(stage==30)createsloworientedtrishoot(x,y,30);
//if(stage==60)createsloworientedtrishoot(x,y,30);
if(stage==90)createsloworientedtrishoot(x,y,30);
//if(stage==120)createsloworientedtrishoot(x,y,30);
if(stage==150)createsloworientedtrishoot(x,y,30);
if(stage>180)instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e11 = new __o_e11();
function __o_e12() {
this.id = this;
this.visible = 1;
this.object_index = o_e12;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e3;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stagelength=60;
this.iniy=40+irandom(40);



}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=2;

y=this.iniy+this.stage*0.5;

x=150*Math.sin(this.stage*3.14159/180);
processinvert(this);

if(stage==30)createorientedtrishoot(x,y,30);
if(stage==90)createorientedtrishoot(x,y,30);
if(stage==150)createorientedtrishoot(x,y,30);
if(stage>180)instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e12 = new __o_e12();
function __o_e13() {
this.id = this;
this.visible = 1;
this.object_index = o_e13;
this.x = 0;
this.y = 0;
this.xprevious = 0;
this.yprevious = 0;
this.xstart = 0;
this.ystart = 0;
this.depth = 50;
this.direction = 0;
this.image_xscale = 1;
this.image_yscale = 1;
this.image_angle = 0;
this.image_alpha = 1;
this.image_index = 0;
this.image_speed = 1;
this.image_single = -1;
this.speed = 0;
this.other = null;
this.collision_checking = 1;
this.parent = o_enemy;
this.sprite_index = s_e3;
this.place_meeting = __place_meeting__;
this.move_towards_point = __move_towards_point__;
this.instance_destroy = __instance_destroy__;
this.creation_overwritten = 1;
this.__creation__ = function() {
with(this) {
x=0;
y=0;
this.stage=0;
this.energy=1;
this.objecttype=0;
this.invertedx=0;
this.invertedy=0;
this.stagelength=60;
this.iniy=40+irandom(40);



}
};
this.step_overwritten = 1;
this.__step__ = function() {
with(this) {
this.stage+=2;

y=this.iniy+this.stage*0.5;

x=150*Math.sin(this.stage*3.14159/180);
processinvert(this);

if(stage==30)createorientedshoot(x,y,30);
if(stage==60)createsloworientedtrishoot(x,y,30);
if(stage==90)createorientedshoot(x,y,30);
if(stage==120)createsloworientedtrishoot(x,y,30);
if(stage==150)createorientedshoot(x,y,30);
if(stage>180)instance_destroy();
}
};
this.collision_overwritten = 0;
this.__collision__ = function() {
};
this.draw_overwritten = 0;
this.__draw__ = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
};
this.animation_end_overwritten = 0;
this.__animationend__ = function() {
};
this.destroy_overwritten = 0;
this.__destroy__ = function() {
};
};
var o_e13 = new __o_e13();


/***********************************************************************
 * SCENES
 ***********************************************************************/
function __playscene() { 
this.objects = [
[o_starfield,340,360],
[o_titlecontroller,240,140],
[o_starfield,300,140],
];
this.start = function() {
_$_('tululoogame').innerHTML = "<canvas id='playscene_canvas' width='512' height='320' style='background-color:rgb(200,200,200);border-style:solid;border-width:1px;border-color:rgb(200,200,200);'></canvas>";// PF
canvas = _$_('playscene_canvas');

// PF
if(isIE){ // ie IE
	G_vmlCanvasManager.initElement(canvas);
}        
//

ctx = canvas.getContext('2d');
canvas = _$_('playscene_canvas');
room_current = playscene;
room_speed = 60;
room_background = null
room_width = 512;
room_height = 320;
room_background_color_red = 0;
room_background_color_green = 0;
room_background_color_blue = 0;
room_background_tile_x = 0;
room_background_tile_y = 0;
room_background_tile_stretch = 0;
room_viewport_width = 512;
room_viewport_height = 320;
room_viewport_x = 0;
room_viewport_y = 0;
room_viewport_object = null;
room_viewport_hborder = 50;
room_viewport_vborder = 50;
__objects__ = [];
for (var _i = 0, _il = this.objects.length; _i < _il; _i++) {
if(isIE && !this.objects[_i])break;
__obj__ = new this.objects[_i][0].constructor;
__obj__.object_index = this.objects[_i][0];
__obj__.x = this.objects[_i][1];
__obj__.y = this.objects[_i][2];
__obj__.xprevious = this.objects[_i][1];
__obj__.yprevious = this.objects[_i][2];
__obj__.xstart = this.objects[_i][1];
__obj__.ystart = this.objects[_i][2];
__objects__.push(__obj__);
__obj__.parent != null && __obj__.creation_overwritten == 0 ? __obj__.parent.__creation__.call(__obj__) : __obj__.__creation__();
}
};
}
var playscene = new __playscene();
__scenes__.push(playscene);
__room_to_go__ = playscene;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/
global.bossinitenergy=200;
global.player=0;
global.playershadow=0;
global.gamescore=0;
global.gameextras=0;
global.gamestage=0;
global.gameplayer=0;
global.stagecontroller=0;
global.gamecontroller=0;
global.bossnumber=0;
global.enemyshootspeed=3.5;
global.gamecounter=0;


/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/
function replaceaudios()
{
	if(isIE || bTouch)return
	for(var a=0;a<__audios__.length;a++)
	{
		var b=__audios__[a];
		if(b.type=='wav')
		{
			if(__wav_is_supported__==false)
			{
				if(__mp3_is_supported__==true)
				{
					b.type='mp3';
					var c=b.audio.getAttribute('src');
					b.audio.setAttribute('src', c.replace('.wav','.mp3'));
					b.audio.load() 
				}
				if(__ogg_is_supported__==true)
				{
					b.type='ogg';
					var c=b.audio.getAttribute('src');
					b.audio.setAttribute('src', c.replace('.wav','.ogg'));
					b.audio.load() 
				}
			}
		}
		if(b.type=='mp3')
		{
			if(__mp3_is_supported__==false)
			{
				if(__ogg_is_supported__==true)
				{
					b.type='wav';
					var c=b.audio.getAttribute('src');
					b.audio.setAttribute('src', c.replace('.mp3','.ogg'));
					b.audio.load() 
				}
			}
		}
		if(b.type=='ogg')
		{
			if(__ogg_is_supported__==false)
			{
				if(__mp3_is_supported__==true)
				{
					b.type='mp3';
					var c=b.audio.getAttribute('src');
					b.audio.setAttribute('src', c.replace('.ogg','.mp3'));
					b.audio.load() 
				}
			}
		}
	}
}

function sound_loop2(a)
{
	if(isIE || bTouch)return
	myAudio = a.audio
	if (typeof myAudio.loop == 'boolean')
	{
		myAudio.loop = true;
	}
	else
	{
		myAudio.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
	myAudio.play();
}


function processinvert(i)
{
	if(i.invertedx==-1){i.x=room_width-i.x;i.image_single=1;}else{i.image_single=0;}
	if(i.invertedy==-1){i.y=room_height+40-i.y;}
}

function createspawner(t,l,mx,my)
{
	var b=instance_create(0,0,o_enemyspawner);
	b.stagelength=t;
	b.enemyset=l;
	b.invertedx=mx;
	b.invertedy=my;
}
		
function addscore(sc)
{
	global.gamescore+=sc;
	if(global.gamescore>global.gameextras*20000)
	{
		global.gameextras++;
		global.gameplayer++;
		sound_play(m_coin);
	}
}

function printtext(x,y,text)
 {
	draw_set_font(f_littleFont);
	draw_set_color(80,80,128);
	draw_text(x+1,y+1,text);
	draw_set_color(255,220,20);
	draw_text(x,y,text);
}

function printnumber(x,y,text)
{
	draw_set_font(f_middleFont);
	draw_set_color(80,80,128);
	draw_text(x+1,y+1,text);
	draw_set_color(255,255,255);
	draw_text(x,y,text);
}

function printbigtext(x,y,text)
{
	draw_set_font(f_bigFont);
	draw_set_color(80,80,128);
	draw_text(x+1,y+1,text);
	draw_set_color(240,240,255);
	draw_text(x,y,text);
}

function deletegameobjects()
{
	global.player=0;
	for(var i=__objects__.length-1; i>=0; i-- )
	{
		var obj=__objects__[i];
		if (obj.parent==o_gameobject)with(obj)instance_destroy();
		if (obj.parent==o_enemy)with(obj)instance_destroy();
		if (obj.parent==o_enemyshoot)with(obj)instance_destroy();
	}
}

function switchtotitle()
{
	deletegameobjects();

	sound_stop(m_maintheme);
	instance_create(0,0,o_titlecontroller);	
	
	global.gamecontroller=0;
	global.stagecontroller=0;
}

function switchtogame()
{
	for(var i=__objects__.length-1; i>=0; i-- )
	{
		var obj=__objects__[i];
		if (obj.parent==o_titleobject)with(obj)instance_destroy();
	}
	instance_create(0,0,o_gamecontroller);	
}


function destroyenemys(me)
{
	for(var i=__objects__.length-1; i>=0; i-- )
	{
		var obj=__objects__[i];
		if(obj!=me)
		if (obj.parent==o_enemy)
		with(obj)
		{
			if(objecttype=0)createlittleexplosion(x,y);
			if(objecttype=1)createexplosion(x,y);
			instance_destroy();
		}
		if (obj.parent==o_enemyshoot)with(obj)instance_destroy();		
	}
}

function createlittleexplosion(x,y)
{
	for(var a=0;a<3;a++)
	{
		b=instance_create(x,y,o_explosion);
		b.direction=irandom(360);
		b.speed=2+(Math.random()*2);
		b.image_xscale=0.5+(Math.random()*2);
		b.image_yscale=b.image_xscale;
	}
}

function createexplosion(x,y)
{
	for(var a=0;a<5;a++)
	{
		b=instance_create(x,y,o_explosion);
		b.direction=irandom(360);
		b.speed=2+(Math.random()*3);
		b.image_xscale=0.5+(Math.random()*3);
		b.image_yscale=b.image_xscale;
	}
}

function createbigexplosion(x,y)
{
	for(var a=0;a<20;a++)
	{
		b=instance_create(x,y,o_explosion);
		b.direction=irandom(360);
		b.speed=1+(Math.random()*3);
		b.image_xscale=2+Math.random()*4;
		b.image_yscale=b.image_xscale;
	}
}

function createorientedshoot(x,y)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed;
		b.direction=-Math.atan2(global.player.y-y,global.player.x-x)*180/3.14159;
	}
}

function createorientedguidedshoot(x,y)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemyguide1);
		b.direction=-Math.atan2(global.player.y-y,global.player.x-x)*180/3.14159;
		sound_play(m_guide);
	}
}

function createorientedtrishoot(x,y,e)
{
	if(global.player!=0)
	{
		c=-Math.atan2(global.player.y-y,global.player.x-x)*180/3.14159;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed;
		b.direction=c;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed;
		b.direction=c-e;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed;
		b.direction=c+e;
	}
}

function createsloworientedtrishoot(x,y,e)
{
	if(global.player!=0)
	{
		c=-Math.atan2(global.player.y-y,global.player.x-x)*180/3.14159;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed/2;
		b.direction=c;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed/2;
		b.direction=c-e;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed/2;
		b.direction=c+e;
	}
}

function createsloworientedshoot(x,y)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed/2;
		b.direction=-Math.atan2(global.player.y-y,global.player.x-x)*180/3.14159;
	}
}

function createshoot(x,y,d)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed;
		b.direction=d;
	}
}

function createtrishoot(x,y,d,e)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed;
		b.direction=d;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed;
		b.direction=d+e;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed;
		b.direction=d-e;
	}
}

function createslowtrishoot(x,y,d,e)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed/2;
		b.direction=d;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed/2;
		b.direction=d+e;
		var b=instance_create(x,y,o_enemyshoot1);
		b.speed=global.enemyshootspeed/2;
		b.direction=d-e;
	}
}

function createlaser(x,y)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemylaser1);
		sound_play(m_laser);
	}
}

function createinvertedlaser(x,y)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemylaser1);
		b.x+=s_enemylaser.width;
		b.direction=0;
		sound_play(m_laser);
	}
}

function createguidedshoot(x,y,d)
{
	if(global.player!=0)
	{
		var b=instance_create(x,y,o_enemyguide1);
		b.direction=d;
		sound_play(m_guide);
	}
}

function destroyplayer()
{	if(cheat)return; // PF
	sound_play(m_explosion);
	createexplosion(global.player.x,global.player.y);

	if(global.playershadow!=0)with(global.playershadow)instance_destroy();
	global.playershadow=0;
	
	if(global.player!=0)with(global.player)instance_destroy();
	global.player=0;
	
	if(global.gameplayer==0)
	{
		instance_create(0,0,o_gameover);
	}
	else
	{
		global.gameplayer--;
		instance_create(0,0,o_playerstart);
	}
}

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/




var __gameloop__ = __loop__;
__loop__();


