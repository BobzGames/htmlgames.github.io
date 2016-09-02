window.onload = function() {

	Crafty.init(550, 440);

	Crafty.sprite(64, "images/fruit.png", {
		banana: [0,0],
		apple: [1,0],
		watermelon: [2,0],
		orange: [3,0],
		coconut: [4,0],
		lemon: [5,0]
	});

	Crafty.background("url('images/bg.jpg') no-repeat");

	var scoreEnt = Crafty.e("2D, DOM, Text").attr({x: 5, y: 5, w: Crafty.viewport.width, h: 50}).text("Score: 0"),
		score = 0;

	Crafty.c("Fruit", {
		_choice: ["banana", "apple", "watermelon", "orange", "coconut", "lemon"],
		_xspeed: 0,
		_yspeed: 0,

		init: function() {
			var index = randomInt(0, 5),
				fruit = this._choice[index],
				rotation = randomInt(8, 12),
				direction = randomInt(0, 1);

			this.addComponent(fruit).origin("center");
			this.y = Crafty.viewport.height;
			this._yspeed = randomInt(15, 18);
			this.z = 1;

			if(direction) {
				this.x = 0;
				this._xspeed = randomInt(3, 5);
			} else {
				this.x = Crafty.viewport.width;
				this._xspeed = -1 * randomInt(3, 5);
			}

			this.bind("EnterFrame", function() {
				this.rotation += rotation;
				this.y -= this._yspeed;
				this.x += this._xspeed;

				if(this._y > Crafty.viewport.height) {
					this.destroy();
					if(!this.hit) {
						score -= (index+1) * 10;
						scoreEnt.text("Score: "+score);
					}
				}
			});

			this.bind("MouseOver", function() {
				this.sprite(index, 1);
				this.hit = true;
				score += (index+1) * 10;
				scoreEnt.text("Score: "+score);

				Crafty.e("2D, DOM, "+fruit).attr({z:0, x: this._x, y: this._y, alpha: 0.2}).sprite(index, 2);

				this.unbind("MouseOver");
			});
			
			if(navigator.userAgent.match('MSIE') || navigator.userAgent.match('Opera') || navigator.userAgent.match('Android')){
				Crafty.addEvent(this,"mouseover", function() {
					this.sprite(index, 1);
					this.hit = true;
					score += (index+1) * 10;
					scoreEnt.text('Score: '+score);
					Crafty.e('2D, DOM, '+fruit).attr({z:0, x: this._x, y: this._y, alpha: 0.2}).sprite(index, 2);
					
					Crafty.removeEvent(this,'mouseover', function() {
					this.sprite(index, 1);
					this.hit = true;
					score += (index+1) * 10;
					scoreEnt.text('Score: '+score);
					Crafty.e('2D, DOM, '+fruit).attr({z:0, x: this._x, y: this._y, alpha: 0.2}).sprite(index, 2);
					});
				});
			}

		}
	});

	Crafty.e().bind("EnterFrame", function(e) {
		var sparsity = randomInt(10, 50);
		if(e.frame % sparsity == 0) {
			Crafty.e("2D, DOM, Fruit, Gravity, Mouse").gravity("floor");
		}
	});
};

function randomInt(from, to)
{
		return Math.floor(Math.random() * (to - from + 1) + from);
}
