/**
* vkBeautifyXML - javascript plugin
*  
* Version - 1.0.beta 
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautifyxml/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*	.vkbeautifyxml(xml [,collapseWS ]) 
*
* PARAMETERS:
*
*	@xml  			- xml to beautify;
* 	@collapseWS		- bool (optional);
*					  flag, which instruct application to remove white spaces 
*					  between open and close tags if no other characters are found; 
*	
* USAGE:
*	
*	vkbeautifyxml(xml); 
*	vkbeautifyxml(xml,true);
*
*/

(function() {

window.vkbeautifyxml = function(xml, collapseWS) {

	var shift = ['\n'], // array of shifts
	    deep = 0,
		str = [],
		_str = '',
		step = '    ', //4 spaces
		inComment = false,
		maxdeep = 50, // nesting level
		ix = 0,
		/* preserves white spaces, doubles "/n"  */
		//ar = xml.replace(/</g,"~#~<").split('~#~'), 
		/* eats white spaces between > <, so that <a>   </a> becomes <a></a> */
		//ar = xml.replace(/>\s{0,}</g,"><").replace(/</g,"~#~<").split('~#~'),
		
		ar = collapseWS ? ar = xml.replace(/>\s{0,}</g,"><").replace(/</g,"~#~<").split('~#~')
					: xml.replace(/</g,"~#~<").split('~#~'),
		len = ar.length;

	/* initialize array with shifts */
	for(ix=0;ix<maxdeep;ix++){
		shift.push(shift[ix]+step); 
	}	

	for(ix=0;ix<len;ix++) {
		/* start comment or <![CDATA[...]]> or <!DOCTYPE*/
		if(ar[ix].search(/<!/) > -1) { 
			str.push(shift[deep]+ar[ix]);
			inComment = true; 
			/* end comment  or <![CDATA[...]]> */
			if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) { 
				inComment = false; 
			}
		} else 
		/* end comment  or <![CDATA[...]]> */
		if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) { 
			str.push(ar[ix]);
			inComment = false; 
		} else 
		/* <elm></elm> */
		if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
	        /^<\w+/.exec(ar[ix-1]) == /^<\/\w+/.exec(ar[ix])[0].replace('/','')) { 
			str.push(ar[ix]);
			if(!inComment) deep--;
		} else
		 /* <elm> */
		if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
			_str = !inComment ? str.push(shift[deep++]+ar[ix]) : str.push(ar[ix]);
		} else 
		 /* <elm>...</elm> */
		if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
			_str = !inComment ? str.push(shift[deep]+ar[ix]) : str.push(ar[ix]);
		} else 
		/* </elm> */
		if(ar[ix].search(/<\//) > -1) { 
			_str = !inComment ? str.push(shift[--deep]+ar[ix]) : str.push(ar[ix]);
		} else 
		/* <elm/> */
		if(ar[ix].search(/\/>/) > -1 ) { 
			_str = !inComment ? str.push(shift[deep]+ar[ix]) : str.push(ar[ix]);
		} else 
		/* <? xml ... ?> */
		if(ar[ix].search(/<\?/) > -1) { 
			str.push(shift[deep]+ar[ix]);
		} else {
			str.push(ar[ix]);
		}
	}
	
	str=str.join("");
	
	return (str[0] == '\n' || str.charCodeAt(0) == 10) ? str.slice(1) : str;
}

})();

