var __FlickrCallbacks = {};

var Flickr = (function() {

	var iCallCount = 0;

	var strAPIKey = "";

	function sendRequest(strMethod, oContent, fncCallback) {
		iCallCount++;
		// pf changed http to https!
		var strURL = "https://www.flickr.com/services/rest/"
			+ "?method=" + strMethod
			+ "&format=json"
			+ "&api_key=" + strAPIKey
			+ "&jsoncallback=__FlickrCallbacks.fn_" + iCallCount
			+ "&time=" + new Date().getTime();

		if (oContent) {
			for (var a in oContent) {
				if (oContent.hasOwnProperty(a)) {
					strURL += "&" + a + "=" + encodeURIComponent(oContent[a]);
				}
			}
		}

		var oScript = document.createElement("script");

		var fncFlickr = function(oResponse) {
			try{document.body.removeChild(oScript);}catch(e){}
			if (fncCallback)
				fncCallback(oResponse);
		}

		__FlickrCallbacks["fn_" + iCallCount] = fncFlickr;

		oScript.setAttribute("type", "text/javascript");
		document.body.appendChild(oScript);
		oScript.src = strURL;
	}

	return {

		setAPIKey : function(strKey) {
			strAPIKey = strKey;
		},

		callMethod : function(strMethod, oContent, fncCallback) {
			sendRequest(strMethod, oContent, fncCallback);
		}

	}


})();