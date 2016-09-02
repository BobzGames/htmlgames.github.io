var bUrl = "";

/* AJAX Callback XML Handling */

function isAJAXSuccess(xml) {
    var result = $(xml).find("res").text();
    var user = $(xml).find("user").text();

    if (result == "SUCCESS") {
        if (user == "") {
            window.localStorage["isloggedin"] = "0";
        }
        else {
            window.localStorage["username"] = user;
            window.localStorage["isloggedin"] = "1";
        }

        //updateLogin();
        return true;
    }
    else if (result == "TIMEOUT") {
        //window.location = $(xml).find("loginurl").text();
    }

    return false;
}

/* Even handling */
function stopBubbling(e) {
    var event = e || window.event;

    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

function urlEncode(s) {
    return encodeURIComponent(s);
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function makeSafeForPost(value) {
    return urlEncode(htmlEncode(value));
}

function setXY(obj, x, y) {
    var xy = x + "px," + y + "px";

    obj.css('-webkitTransform', "translate3d(" + xy + ",0)");
    obj.css('-MozTransform', "translate(" + xy + ")");
    obj.css('-msTransform', "translate(" + xy + ")");
}

function getRating(rating) {
    if (rating == 0) {
        return "<span class='noRating'>No Rating</span>";
    }

    var result = "";
    rating *= 5;
    var fullStars = Math.floor(rating);
    var remainder = rating - fullStars;
    var starCount = 0;
    var i;

    for (i = 0; i < fullStars; i++, starCount++)
    {
        result += "<span class='starW'><img src='documents/images/star.png' class='thumb' /></span>";
    }

    if (remainder >= 0.25)
    {
        result += "<span class='starW'><img src='documents/images/starhalf.png' class='thumb' /></span>";
        starCount++;
    }

    for (i = starCount; i < 5; i++)
    {
        result += "<span class='starW'><img src='documents/images/starshadow.png' class='thumb' /></span>";
    }

    return result;
}

function getDevice() {
    var deviceName = "Web";

    if (navigator.userAgent.match(/iPad/i) != null) {
        deviceName = "iPad";
    }
    else if (navigator.userAgent.match(/iPod/i) != null) {
        deviceName = "iPod";
    }
    else if (navigator.userAgent.match(/iPhone/i) != null) {
        deviceName = "iPhone";
    }
    else if (navigator.userAgent.match(/Android/i) != null) {
        deviceName = "Android";
    }
    else if (navigator.userAgent.match(/IEMobile/i) != null) {
        deviceName = "IEMobile";
    }

    return deviceName;
}

function validateEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
}

function makeSafe(thisText, allowSpace) {
    var w = "!@#$%^&*()+=[]\\\';,./{}|\":<>?";
    var s = 'abcdefghijklmnopqrstuvwxyz0123456789-_';
    var x = new Array('??????', '?', '????', '????', '?', '???????', '????', '??');
    var r = new Array('a', 'c', 'e', 'i', 'n', 'o', 'u', 'y');

    if (allowSpace) {
        s = s + ' ';
    }

    thisText = thisText.toLowerCase();
    var newText = new Array();

    for (i = 0; i < thisText.length; i++) {
        thisChar = thisText.charAt(i);
        if (w.indexOf(thisChar) == -1) {
            if (s.match('' + thisChar + '')) {
                if (thisChar == ' ') {
                    newText[i] = '_';
                }
                else {
                    newText[i] = thisChar;
                }
            } else {
                for (j = 0; j < x.length; j++) {
                    if (x[j].match(thisChar)) {
                        newText[i] = r[j];
                    }
                }
            }
        }
    }

    return newText.join('');
}

function buildLoading() {
    var html = "<table class='loading'><tr><td style='text-align:center;'><span>Loading...</span><img src='documents/images/loading.gif' alt='Loading, please wait' /></td></tr></table>";

    return html;
}

function makeUnfave(id) {
    
}

function checkLoggedIn() {
    if (window.localStorage["mas-t"] != null) {
        if (window.localStorage["mas-t"] != 1) {
            $('#fb_profile_pic').hide();
            $('#userLoggedOut').show();
        }
        else {
            $('#userLoggedOut').hide();
            $('#fb_profile_pic').attr('src', window.localStorage["mas-up"]);
            $('#fb_profile_pic').show();
        }
        $('#headLogin').html("Welcome <strong>" + window.localStorage["mas-un"] + "</strong>");
        return;
    }
}

function util_createUnknownAccount() {
    
}

function util_setUserToken(uid, id, t, un, up) {
    window.localStorage["mas-uid"] = uid;
    window.localStorage["mas-id"] = id;
    window.localStorage["mas-t"] = t;
    window.localStorage["mas-un"] = un;
    window.localStorage["mas-up"] = up;
}

function logout() {
    FB.logout(function (response) {
        window.localStorage["mas-t"] = 2;
    });

    $('#userLoggedIn').hide();
    $('#userLoggedOut').show();

    return false;
}
