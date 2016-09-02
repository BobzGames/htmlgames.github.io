var Key;

function Key(keycode) {
	this.keycode = keycode;
	Key.state[keycode] = false;
}

Key.prototype.pressed = function() {
	return Key.state[this.keycode];
};

Key.prototype.toString = function() {
	return "[" + this.keycode + "]";
};

Key.state = new Array();

Key._processDown = function(e,bT) {
	if(bT){
		Key.state[e] = true;
	}else{
		Key.state[e.keyCode] = true;
	}
};

Key._processUp = function(e,bT) {
	if(bT){
		Key.state[e] = false;
	}else{
		Key.state[e.keyCode] = false;
	}
};

Key.init = function() {
	try {
		document.addEventListener("keydown", Key._processDown, false);
		document.addEventListener("keyup", Key._processUp, false);
	} catch (e) {
		document.onkeydown = function() {
			Key._processDown(window.event)
		};
		document.onkeyup = function() {
			Key._processUp(window.event)
		};
	}
	window.focus();
};

function Controller(n, s, e, w, a, b) {
	this.n = new Key(n);
	this.s = new Key(s);
	this.e = new Key(e);
	this.w = new Key(w);
	this.a = new Key(a);
	this.b = new Key(b);
}

Controller.DEFAULT = new Controller(38, 40, 37, 39, 32, 13);

Controller.prototype.getX = function() {
	var x = 0;
	if (this.e.pressed()) x -= 1;
	if (this.w.pressed()) x += 1;
	return x;
};

Controller.prototype.getY = function() {
	var y = 0;
	if (this.n.pressed()) y -= 1;
	if (this.s.pressed()) y += 1;
	return y;
};

function Joystick(element, controller) {
	this._element = element;
	this._controller = controller;
	
	try {
		this.useKeys = !this._element.setDevice(0);
	} catch (e) {
		this.useKeys = true;
	}
	
	this.x = 0;
	this.y = 0;
	this.a = false;
	this.b = false;
}

Joystick.prototype.poll = function() {
	this.readKeys();
	if (!this.useKeys) {
		this.readKeys(); // dunno why this is here - can't test ATM
		this.x |= Math.round((this._element.x - 32768) / 32768);
		this.y |= Math.round((this._element.y - 32768) / 32768);
		this.a |= this._element.a;
	}
	//window.status = "x: " + this.x + ", y: " + this.y;
};

Joystick.prototype.readKeys = function() {
	this.x = this._controller.getX();
	this.y = this._controller.getY();
	this.a = this._controller.a.pressed();
	this.b = this._controller.b.pressed();
};