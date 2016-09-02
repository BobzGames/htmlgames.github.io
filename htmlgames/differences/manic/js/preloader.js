/**
 *	Handles the preloading of images in a way that is designed to be more
 *	effective than just creating an Image object for each graphic. The URI's
 *	are queued until the page has completed, then, on demand, each is loaded
 *	one after the other.
 */
function Preloader() {
	this.queue = new Array();
	this.cache = new Array();
	this.callback = null;
}

/**
 *	Adds the given source URI to the queue.
 *	@return an index to the image source
 */
Preloader.prototype.add = function(src) {
	if (src != null) {
		var index = this.queue.length;
		this.queue[index] = src;
	}
};

Preloader.prototype.get = function(index) {
	return this.cache[index].src;
};

/**
 *	Starts the preloader fetching the images, then calls the supplied function
 *	when the queue has been emptied.
 */
Preloader.prototype.start = function(callback) {
	this.cache.length = 0;
	this.callback = callback;
	this._fetch();
};

/**
 *	Once invoked this will fetch the queued images. This task in done in the
 *	background with the completion of one download triggering the next.
 */
Preloader.prototype._fetch = function() {
	var _this = this;
	var index = this.cache.length;
	this.cache[index] = new Image();
	this.cache[index].onerror = Preloader.error;
	if (index < this.queue.length - 1) {
		this.cache[index].onload = function () {
			_this._fetch();
		};
	} else {
		this.cache[index].onload = this.callback;
	}
	this.cache[index].src = this.queue[index];
};

Preloader.error = function() {
	alert("An image failed to load!");
};
