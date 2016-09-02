
// Based on Dave Whipp's Pool
// the main interaction with the web page

var ua = navigator.userAgent;
var isIE = ua.match("MSIE");
var bTouch = (ua.indexOf("(iP")==-1 && ua.indexOf("Android")==-1 && ua.indexOf("BlackBerry")==-1 && ua.indexOf("HTC")==-1 && ua.indexOf("PlayBook")==-1 && ua.indexOf("webOS")==-1 && ua.indexOf("IEMobile")==-1 && ua.indexOf("Silk")==-1)?false:true;

var white = "#ffffff";
var red = "#ff0000";
var yellow = "#ffff00";
var green = "#00ff00";
var black = "#000000";
var gray = "#808080";

var blue = "#0000ff";
var cyan = "#00ffff";

var purple = "#ff00ff";
var gold = "#ffff80";
var orange = "#ffa000";
var darkgreen = "#008000";
var brown = "#808040";

var show_targetting_line = 1;
var game = "8 Ball";

var table_scale = 0.7
var ball_scale = table_scale/20;
var pocket_scale = 1.5;
var rack_ball_spacing = 0.01;

var skimming_friction = 1/400;
var rolling_threshold = skimming_friction * 30;
var rolling_friction = skimming_friction / 20;
var static_threshold = rolling_friction * 10;

var strength_scaling = 2.5;
var masse_scaling = 1;

var classes = new Array(
        "ball",
        "cushion",
        "game",
        "pocket",
        "polygon",
        "shot",
        "table",
        "vector"
);

var i;
for (i=0; i<classes.length; ++i) {
  document.write( "<script type='text/javascript' src='js/" + classes[i] + ".js'></script>" );
}

function status_message( prefix, msg) {
    var elem = document.getElementById("msg");
    var txt = prefix;
    if (msg != null) {
        txt += ": " + msg;
    }
    elem.innerHTML = txt;

}

function append_status_message( prefix, msg) {
    var elem = document.getElementById("msg");
    elem.innerHTML += "<br>" + prefix + ": " + msg;
}


var draw_id = null;

addEventListener = function(o, e, f, s){
    var r = o[r = "_" + (e = "on" + e)] = o[r] || (o[e] ? [[o[e], o]] : []), a, c, d;
    r[r.length] = [f, s || o], o[e] = function(e){
        try{
            (e = e || event).preventDefault || (e.preventDefault = function(){e.returnValue = false;});
            e.stopPropagation || (e.stopPropagation = function(){e.cancelBubble = true;});
            e.target || (e.target = e.srcElement || null);
            e.key = (e.which + 1 || e.keyCode + 1) - 1 || 0;
        }catch(f){}
        for(d = 1, f = r.length; f; r[--f] && (a = r[f][0], o = r[f][1], a.call ? c = a.call(o, e) : (o._ = a, c = o._(e), o._ = null), d &= c !== false));
        return e = null, !!d;
    }
};

function init_pool_table(name) {

    if (draw_id) {
        clearInterval( draw_id );
    }

    var game_rb = document.getElementsByName( name + "_game" );
    var i;
    for (i=0; i<game_rb.length; ++i) {
        if (game_rb[i].checked) game = game_rb[i].value;
    }

    var div = document.getElementById(name);

    var table;
    var canvas_name = name + "_canvas";

    function set_drawing_context() {
        var width = (isIE)?document.body.clientHeight:window.innerWidth - 16;
        if (width > 1000) width = 1000;
        if (width < 300) width = 300;
        var height = width / 2;

        var canvas_html = "<canvas";
        canvas_html += " id=" + canvas_name;
        canvas_html += " width=" + width;
        canvas_html += " height=" + height;
        canvas_html += ">Sorry, your browser doesn't appear to support the HTML-5 Canvas</canvas>";
        div.innerHTML = canvas_html;

        var canvas = document.getElementById(canvas_name);
        if (!canvas) return;
        
	    // new
	    if(isIE){ // ie IE
            G_vmlCanvasManager.initElement(canvas);
	    }        
	    //

       	var ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (!table) {
            table = new Table();
            table.initialize( game );
        }

        // table center is (0,0);
        // length is -1 .. +1;
        // width is -.5 .. +.5
        ctx.translate( width/2, height/2 );
        ctx.scale( height*table_scale, height*table_scale );

        table.ctx = ctx;

        var canvas_offset = new Vector(
                canvas.offsetLeft + width/2,
                canvas.offsetTop + height/2
                );

        function mouse_vec(evt,bState) {
        	if(bState && bTouch){
        		var vec = new Vector( evt.touches[0].clientX + window.scrollX, evt.touches[0].clientY + window.scrollY );
        	}else{
            	var vec = (isIE)?new Vector( evt.clientX + document.body.scrollLeft, evt.clientY + document.body.scrollTop ):new Vector( evt.clientX + window.scrollX, evt.clientY + window.scrollY );
            }
            vec.subtract( canvas_offset );
            vec.scale_down( height * table_scale );
            return vec;
        }

        function mouse_down(evt) {
            if (!table.ball_in_hand) {
                table.begin_shot( mouse_vec(evt) );
            }
        }

        function mouse_up(evt) {
            var vec = mouse_vec(evt,true);
            if (table.ball_in_hand) {
                var cue_ball = table.cue_ball;
                cue_ball.position = vec;
                if ( cue_ball.is_valid_location(table) ) {
                    table.ball_in_hand = 0;
                }
            }
            else {
                table.commit_shot( vec );
            }
        }

        function mouse_move(evt) {
            var vec = mouse_vec(evt,true);
            if (table.ball_in_hand) {
                table.cue_ball.position = vec;
            }
            else {
                table.adjust_shot( vec );
            }
        }

		if(isIE){
			canvas.attachEvent( 'onmousedown', mouse_down );
	        canvas.attachEvent( 'onmouseup', mouse_up );
	        canvas.attachEvent( 'onmousemove', mouse_move );
		}else{
		
	        canvas.addEventListener( 'mousedown', mouse_down, false );
	        canvas.addEventListener( 'mouseup', mouse_up, false );
	        canvas.addEventListener( 'mousemove', mouse_move, false );
	        
	        //canvas.addEventListener( 'touchstart', mouse_down, false );
	        canvas.addEventListener( 'touchstart', mouse_up, false );
	        //canvas.addEventListener( 'touchend', mouse_up, false );
	        canvas.addEventListener( 'touchmove', mouse_move, false );
	        
	        // preventDefault() // here...???
	       	// prevent elastic scrolling
			document.body.addEventListener('touchmove',function(event){event.preventDefault();});
			//document.body.addEventListener('touchstart',function(event){event.preventDefault();});
			if(bTouch)setTimeout(function(){window.scrollTo(0, 1);}, 1);

    
	    }

    }

    set_drawing_context();

    if (table) {
        window.onresize = set_drawing_context;

        function key_down_fn(evt) {
        	if(isIE)return;
            if (evt.keyCode == 48) { // '0'
                for (i in table.balls) {
                    table.balls[i].velocity.zero();
                    table.balls[i].spin.zero();
                }
            }
            if (evt.keyCode == 57) { // '9'
                table.ball_in_hand = 1;
            }
            if (evt.keyCode >= 49 && evt.keyCode <= 55) { // 1..7
                strength_scaling = ((evt.keyCode - 48) / 4) * 2.5;
            }
            if (evt.keyCode == 56) { // '8'
                masse_scaling = 4;
            }
        }

        function key_up_fn(evt) {
        	if(isIE)return;
            if (evt.keyCode >= 49 && evt.keyCode <= 55) { // 1..7
                strength_scaling = 2.5;
            }
            if (evt.keyCode == 56) { // '8'
                masse_scaling = 1;
            }
        }

        document.onkeydown = key_down_fn;
        document.onkeyup = key_up_fn;

        function draw_fn() {
            table.draw();
            if (table.is_stable() && table.update_id != null) {
                clearInterval( table.update_id );
                table.update_id = null;
                table.game.shot_complete();
            }
        }

        draw_id = setInterval( draw_fn, 50 );
    }
}
