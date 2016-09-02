var vlx = null;
var f197 = "front";
var f165;
var f166 = null;
var f172 = "";
var f162 = null;
var f177 = null;
var f178 = null;
var f176 = null;
var f191 = {};
var f190 = 0;
var f171 = 0;
var f155 = null;
var f158 = 0;
var f182 = 100;
var f157 = 0;
var f183 = 200;
var f161 = 0;
var tE = 0;
var tS = 4;
var f194 = 600;
var f177 = null;
var f168 = 0;
var f164 = 0;
var f160 = 0;
var f192 = 0;
var f170 = false;
var f179 = 0;

function f41() {
    vlx = new VectorlightGame();
    vlx.gameInit("stage", 1656, 320, 460, 33);
    f165 = document.getElementById("gameSurface");
    if(navigator.userAgent.match("MSIE"))G_vmlCanvasManager.initElement(f165);
    f166 = f165.getContext('2d');
    if (vlx.useTouch) {
        f165.addEventListener('touchstart', f31, false);
    } else {
        	if(navigator.userAgent.match("MSIE")){
        		// ???
        		f165.attachEvent( 'onmousedown', f28 );
        	}else{
        		f165.addEventListener('mousedown', f28, false);
            }    
    }
    f162 = new f15();
    f162.f118 = f172;
    f162.f113 = f11;
    var f185 = new Object();
    f17(f185, "f0", 1);
    f17(f185, "f1", 1);
    f17(f185, "f2", 1);
    f17(f185, "f3", 1);
    f17(f185, "f4", 1);
    f17(f185, "f5", 1);
    f17(f185, "f6", 1);
    f17(f185, "f7", 1);
    f17(f185, "f8", 1);
    f17(f185, "f9", 1);
    f17(f185, "f1c", 1);
    f17(f185, "road1", 1, "jpg");
    f17(f185, "r", 1);
    f17(f185, "back2", 1, "jpg");
    f17(f185, "back3", 1);
    f17(f185, "back4", 1);
    f17(f185, "back5", 1);
    f17(f185, "back6", 1);
    f17(f185, "back7", 1);
    f17(f185, "back8", 1, "jpg");
    f17(f185, "back9", 1);
    f17(f185, "l1", 1);
    f17(f185, "l2", 1);
    f17(f185, "l3", 1);
    f17(f185, "l4", 1);
    f17(f185, "l5", 1);
    f17(f185, "r1", 1);
    f17(f185, "exp3", 12);
    f17(f185, "cloud1", 1);
    f17(f185, "cloud2", 1);
    f17(f185, "cloud3", 1);
    f17(f185, "cloud4", 1);
    f17(f185, "cloud5", 1);
    f17(f185, "cloud6", 1);
    f17(f185, "m0", 1);
    f17(f185, "m1", 1);
    f17(f185, "m2", 1);
    f17(f185, "m3", 1);
    f17(f185, "m4", 1);
    f17(f185, "m5", 1);
    f17(f185, "plane1", 1);
    f17(f185, "plane2", 1);
    f17(f185, "rocket", 1);
    f17(f185, "s1", 2);
    f17(f185, "s2", 2);
    f17(f185, "g1", 1);
    f17(f185, "fe", 2);
    f17(f185, "star", 1);
    f17(f185, "km", 1);
    f162.f146(f185);
}

function f31(ev) {
    var f184 = ev.touches[0];
    f20(f184.pageX, f184.pageY);
    if (ev != null) {
        ev.stopPropagation();
        ev.preventDefault();
    }
    return false;
}

function f28(ev) {

	if(document.all){
		 var x=ev.x;
		 var y=ev.y;
	}else{
		var x = ev.clientX;
		var y = ev.clientY;
		var f175 = window.pageYOffset * 1;
		var f173 = window.pageXOffset * 1;
		y += f175;
		x += f173;
	}
	f20(x, y);
	
}

function f20(x, y) {
    if (f191.f145 || f191.f138.f136) {
        return;
    }
    var f174 = 0;
    var f180 = 0;
    var f203 = f165;
    if (f203.offsetParent) {
        do {
            f174 += f203.offsetLeft;
            f180 += f203.offsetTop;
        } while (f203 = f203.offsetParent);
    }
    x -= f174;
    y -= f180;
    f191.f138.f120 = x - f191.f138.f97;
    f191.f138.f142 = 2;
}

function f11() {
    f27();
}

function f16(e) {
    if (f197 == "game") {
        return f60(e);
    }
    return true;
}

function f60(e) {
    if (e != null) {
        e.stopPropagation();
        e.preventDefault();
    }
    return false;
}

function f52() { return;
    if (vlx.useTouch) {
        vlx.dg('mainAd').style.top = "354px";
    }
}

function f51() { return;
    if (vlx.useTouch) {
        vlx.dg('mainAd').style.top = "-100px";
    }
}

function f59() {
    f27();
}

function f58() {
    f37();
}

function f42(item) {
    $('.miniPopupItem').hide();
    $('#' + item).show();
    $('#mainPopup').fadeIn();
}

function f40(onClosed) {
    $('#mainPopup').fadeOut();
}

function f5() {
    f197 = "finish";
    var un = vlx.getUsername();
    if (un == null) {
        un = "";
    }
    vlx.dg("usernameInput").value = un;
    //f42("highscore");
    //return false;
    return f8();
}

function f8() {
    vlx.setUsername(vlx.dg("usernameInput").value);
    f40(null);
    f27();
    if (vlx.useTouch) {
        window.scrollTo(0, vlx.loadScrollY);
    }
    vlx.saveAchievement(105, f190);
    return false;
}

function f23() {
    f197 = "finish";
    f42("summary");
    $('#totalTrophy').html('X ' + f191.f138.f141);
    var s = vlx.pad(f191.f148, 7);
    $('#totalDist').html(s);
    var f181 = (f191.f138.f141 * 10000) + (f191.f148);
    s = vlx.pad(f181, 8);
    $('#totalScore').html(s);
    if (f191.f138.f117) {
        $('#timeUp').html('CONGRATULATIONS!');
    } else {
        $('#timeUp').html('YOU CRASHED!');
    }
    f190 = f181;
}

function f6() {
    f42("levSelect");
    return false;
}

function f27() {
    f51();
    f197 = "game";
    vlx.sh("front");
    vlx.sh("gameSurface");
    f32(true);
}

function f22() {
    f40(null);
    f37();
    return false;
}

function f37() {
    //try {
    //    util_f55UnknownAcf188();
    //} catch (e) {}
    f52();
    vlx.recordGamePlay();
    vlx.getBestAchievement(105, "bestBy", "bestLevNo");
    f18();
    f197 = "game";
    vlx.hd("front");
    vlx.sh("gameSurface");
    f32(false);
    return false;
}

function f18() {
    if (vlx.useTouch) {
        window.scrollTo(0, vlx.loadScrollY);
    }
}

function f32(demo) {
    f191 = new f35(3);
    f191.f145 = demo;
    f191.f143 = f165.width;
    f191.f125 = f165.height;
    f191.f139.f153 = 0;
    f191.f139.f154 = 0;
    f191.f139.f110.f143 = f165.width;
    f191.f139.f110.f125 = f165.height;
    f191.f138 = f45(0, "r", 150, 0, 0);
    f191.f138.f120 = 150;
    f191.f138.f103 = f30;
    f191.f138.f80(0, 0, 4);
    f191.f138.f136 = false;
    f191.f138.f117 = false;
    f191.f79 = f2(0, "fe", 150, 0, 2, 2);
    f191.f138.f141 = 0;
    f191.f108 = 0;
    f191.f148 = 0;
    f177 = new f21(0, 0, f191.f143, f191.f125);
    f169 = 320;
    f156 = 1;
    f55();
    f10();
    f14();
    f3();
}

function f30(r) {
    if (!f191.f138.f136) {
        if (r.f120 < r.f153 - 6) {
            r.f101.f153 = -1;
            r.f142 += 0.4;
        } else if (r.f120 > r.f153 + 6) {
            r.f101.f153 = 1;
            r.f142 += 0.4;
        } else {
            r.f101.f153 = 0;
            r.f153 = r.f120;
        }
    } else {
        f191.f138.f127 += f191.f138.f94;
        f191.f138.f94 += 1;
        f191.f138.f142 += 0.1;
        r.f101.f153 *= 0.1;
    }
    f191.f79.f153 = f191.f138.f153 + 6;
    f191.f79.f154 = f191.f138.f154 + 50;
    return true;
}
var f169 = 320;
var f156 = 1;

function f55() {
    var lv = new Array();
    var i;
    var y;
    if (f191.f145) {
        f169 -= 320;
        f45(0, "back2", 0, f169, 0);
        return;
    }
    if (f191.f139.f154 < f169) {
        f169 -= 320;
        y = f169 - 20;
        if (f169 >= -320) {
            f45(0, "back2", 0, f169, 0);
        } else if (f169 >= -1600) {
            if (y < -200) {
                y = f169 + 160;
                for (i = 0; i < 2; i++) {
                    var f201 = ((Math.random() * 5) >> 0) + 1;
                    var f200 = f162.f130["l" + f201 + "_1"].width;
                    var x = (Math.random() * (f191.f143 - f200)) >> 0;
                    var f187 = f45(0, "l" + f201, x, y, 0);
                    var f196 = f162.f130["r1_1"].height;
                    var f186 = false;
                    f187.f103 = f12;
                    if (Math.random() >= 0.5) {
                        x += f200 - f162.f130["r1_1"].width;
                        f186 = true;
                    }
                    f48("r1", x, y - f196, f186);
                    y += 110 + ((Math.random() * 30) >> 0);
                }
            }
            if (f169 == -1600) {
                y = f169;
                var l = f45(0, "l2", 0, y, 0);
                l.f103 = f12;
                l = f45(0, "l2", f191.f143 - 108, y, 0);
                l.f103 = f12;
            }
            f45(0, "back2", 0, f169, 0);
        } else if (f169 >= -1920) {
            f39(y - 100);
            f45(0, "back9", 0, f169, 0);
        } else if (f169 >= -2880) {
            f39(y);
            f36("plane1", y, 0);
            f45(0, "back3", 0, f169, 0);
        } else if (f169 >= -3200) {
            f39(y);
            f36("plane1", y, 0);
            f45(0, "back5", 0, f169, 0);
        } else if (f169 >= -3520) {
            f39(y);
            f36("plane1", y, 1);
            f45(0, "back6", 0, f169, 0);
        } else if (f169 >= -3840) {
            f45(0, "back7", 0, f169, 0);
        } else if (f169 >= -7040) {
            if (Math.random() >= 0.5) {
                f36("s1", y, 2);
            } else {
                for (i = 0; i < 10; i++) {
                    var x = (Math.random() * (f191.f143 - 32)) >> 0;
                    f38(x, y);
                    y += 20 + ((Math.random() * 30) >> 0);
                }
            }
            f45(0, "back4", 0, f169, 0);
        } else if (f169 >= -7360) {
            f45(0, "back8", 0, f169, 0);
        }
    }
}

function f12(l) {
    if (f191.f138.f136) {
        return true;
    }
    if (l.f122(f191.f138.f153 + 12, f191.f138.f154 + 15, 1)) {
        f34();
        return true;
    }
    if (l.f122(f191.f138.f153 + 4, f191.f138.f154 + 25, 1) || l.f122(f191.f138.f153 + 20, f191.f138.f154 + 25, 1)) {
        f34();
        return true;
    }
    if (l.f122(f191.f138.f153, f191.f138.f154 + 40, 1) || l.f122(f191.f138.f153 + 24, f191.f138.f154 + 40, 1)) {
        f34();
        return true;
    }
    if (l.f122(f191.f138.f153, f191.f138.f154 + 50, 1) || l.f122(f191.f138.f153 + 24, f191.f138.f154 + 50, 1)) {
        f34();
        return true;
    }
    return f7(l);
}

function f46(y) {
    var x = (Math.random() * f191.f143 - 16) >> 0;
    var m = f191.f95(1, "star", Math.random() * 360);
    m.f153 = x;
    m.f154 = y;
    m.f80(0, 1, 0.3 + (Math.random() * 2));
    m.f123 = f25;
    m.f135 = 5;
}

function f38(x, y) {
    var f201 = (Math.random() * 4) >> 0;
    var f198 = (Math.random() * 6) >> 0;
    var m = f191.f95(1, "m" + f198, Math.random() * 360);
    m.f153 = x;
    m.f154 = y;
    m.f80(0, 1, 0.3 + (Math.random() * 2));
    m.f123 = f50;
    m.f135 = Math.random() * 5;
}

function f50(m) {
    if (f191.f138.f136) {
        return false;
    }
    var f193 = Math.sqrt(Math.pow(m.f96() - f191.f138.f96(), 2) + Math.pow(m.f93() - f191.f138.f93(), 2));
    if (f193 < f191.f138.f143) {
        f54("exp3", m.f96(), m.f93());
        f34();
        return true;
    }
    m.f127 += m.f135;
}

function f25(m) {
    if (f191.f138.f136) {
        return false;
    }
    var f193 = Math.sqrt(Math.pow(m.f96() - f191.f138.f96(), 2) + Math.pow(m.f93() - f191.f138.f93(), 2));
    if (f193 < f191.f138.f143) {
        f191.f138.f141++;
        f14();
        return true;
    }
    m.f127 += m.f135;
}

function f39(y) {
    for (var i = 0; i < 6; i++) {
        if (y >= -2440) {
            var f201 = ((Math.random() * 6) >> 0) + 1;
            var x = (Math.random() * (f191.f143 * 1.5)) >> 0;
            f44("cloud" + f201, x, y)
            y += 40 + ((Math.random() * 30) >> 0);
        }
    }
    return y;
}

function f36(type, y, add) {
    y += 150;
    var f188 = (Math.random() * add) >> 0;
    var f195 = 1;
    if (Math.random() > 0.5) {
        f195 = -1;
        if (type == "plane1") {
            type = "plane2";
        }
    }
    for (var i = 0; i < 3 + f188; i++) {
        var f201 = ((Math.random() * 6) >> 0) + 1;
        var x = -(Math.random() * 30) >> 0;
        if (f195 < 0) {
            x = f191.f143 + ((Math.random() * 30) >> 0);
        }
        f43(type, x, y, f195)
        y += 20 + ((Math.random() * 40) >> 0);
    }
    return y;
}

function f48(name, x, y, f186) {
    var r = f45(1, name, x, y, 0);
    r.f103 = f26;
    r.f98 = false;
    r.f80(0, 0, 1);
    r.f140 = f186;
}

function f44(name, x, y) {
    var r = f45(1, name, x, y, 0);
    r.f103 = f7;
    r.f80(-1, 0, 0.5);
}

function f43(name, x, y, f195) {
    var r = null;
    if (name == "plane1" || name == "plane2") {
        r = f45(1, name, x, y, 0);
    } else {
        r = f2(1, name, x, y, 2, 8);
    }
    r.f103 = f19;
    var s = 1 + Math.random();
    if (name == "plane1") {
        s = 1.5 + (Math.random() * 2);
    }
    r.f80(f195, 0, s);
    r.f114 = 0;
}

function f19(p) {
    if (f191.f138.f136) {
        return false;
    }
    p.f114--;
    if (p.f114 <= 0) {
        switch (p.f150) {
        case "plane1":
        case "plane2":
            p.f114 = 60 + ((Math.random() * 60) >> 0);
            f49("rocket", p.f153 + 14, p.f154 + 6);
            break;
        case "s1":
            p.f114 = 60 + ((Math.random() * 60) >> 0);
            f49("g1", p.f153 + 10, p.f154);
            break;
        case "s2":
            p.f114 = 60 + ((Math.random() * 60) >> 0);
            f49("g1", p.f153 + 10, p.f154);
            break;
        }
    }
    var d = f0(p.f96(), p.f93(), f191.f138.f96(), f191.f138.f93());
    if (d < p.f143) {
        f34();
        return false;
    }
    return f7(p);
}

function f49(name, x, y) {
    var r = f45(1, name, x, y, 0);
    r.f103 = f24;
    r.f80(0, 1, 2 + (Math.random() * 1));
}

function f24(b) {
    if (f191.f138.f136) {
        return false;
    }
    if (f191.f138.f122(b.f153, b.f154, 1)) {
        f54("exp3", b.f96(), b.f93());
        f34();
        return false;
    }
    return f7(b);
}

function f26(r) {
    if (f191.f138.f136) {
        return true;
    }
    if (r.f98) {
        if (r.f104 > 0) {
            r.f104--;
            if (r.f104 == 0) {
                r.f101.f154 = 1;
                r.f101.f153 *= 0.1;
            }
        } else {
            r.f142 += 0.1;
        }
        r.f127 += (r.f140 ? 5 : -5);
        var d = f0(r.f96(), r.f93(), f191.f138.f96(), f191.f138.f93());
        if (d < r.f143) {
            f34();
            return false;
        }
    } else {
        var rY = f191.f138.f154 - 100;
        var rX = f191.f138.f153;
        if (r.f154 >= rY - 10 && r.f153 >= rX - 50 && r.f153 < rX + 50) {
            r.f98 = true;
            r.f104 = (r.f143 * 0.8) >> 0;
            r.f101.f153 = (r.f140 ? 1 : -1);
            r.f142 = 1;
        }
    }
    return f7(r);
}

function f7(o) {
    return (o.f154 < f191.f138.f154 + 150);
}

function f34() {
    f191.f138.f136 = true;
    f191.f138.f94 = 5;
    f191.f138.f101.f154 = 1;
    f191.f138.f142 = 1;
    f191.f79.f106 = false;
    f47();
}

function f47() {
    var i;
    for (i = 0; i < 16; i++) {
        var e = f54("exp3", f191.f138.f153 + (Math.random() * (f191.f138.f125 - 0)), f191.f138.f154 + (Math.random() * (f191.f138.f143 - 0)));
        e.f105 = (Math.random() * 15) >> 0;
        f161 = 50;
    }
}

function f54(type, x, y) {
    var f202 = f191.f65(2, type, 12, 1);
    f202.f153 = x - f202.f97;
    f202.f154 = y - f202.f87;
    f202.f61 = true;
    return f202;
}

function f0(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function f45(f189, name, x, y, angle) {
    var m = f191.f95(f189, name, angle);
    m.f153 = x;
    m.f154 = y;
    m.f150 = name;
    return m;
}

function f2(f189, name, x, y, frames, delay) {
    var m = f191.f65(f189, name, frames, delay);
    m.f153 = x;
    m.f154 = y;
    m.f126 = true;
    m.f150 = name;
    return m;
}

function f33(p) {
    f170 = false;
}

function f17(f185, baseName, f188, ext) {
    var i;
    var f199;
    if (ext == null) {
        ext = "png";
    }
    for (i = 1; i <= f188; i++) {
        f199 = baseName + "_" + i;
        f185[f199] = f199 + "." + ext;
    }
}

function gameLoop() {
    if (f162.f131 && f191 != null) {
        switch (f197) {
        case "game":
            f13();
            break;
        }
    }
}

function f13() {
    f179 = 0;
    f191.f71(f166);
    if (!f191.f145) {
        f9(f166);
        f4(f166);
    }
    if (f161 == 0) {
        f191.f138.f154 -= 2;
        f55();
        f191.f108--;
        if (f191.f108 <= 0) {
            f46(f169);
            f191.f108 = (90 + (Math.random() * 90)) >> 0;
        }
        f10();
        if (!f170) {
            f191.f148 += 110;
            f3();
        }
    } else {
        if (f191.f138.f117) {
            f191.f138.f154 -= 1.5;
        }
        f161--;
        if (f161 <= 0) {
            f23();
        }
    }
    f192++;
}
var f163 = new Array();

function f14() {
    var s = vlx.pad(f191.f138.f141, 2);
    f163 = new Array();
    f163.push(f162.f130["f" + s.charAt(0) + "_1"]);
    f163.push(f162.f130["f" + s.charAt(1) + "_1"]);
}

function f9(context) {
    var f200 = f162.f130["star_1"];
    var i;
    var x = 24
    var y = 6;
    context.drawImage(f200, x - 20, y - 2);
    for (i = 0; i < f163.length; i++) {
        context.drawImage(f163[i], x, y);
        x += f163[i].width + 2;
    }
}
var f167 = new Array();

function f3() {
    var s = vlx.pad(f191.f148, 7);
    f167 = new Array();
    f167.push(f162.f130["f" + s.charAt(0) + "_1"]);
    f167.push(f162.f130["f" + s.charAt(1) + "_1"]);
    f167.push(f162.f130["f" + s.charAt(2) + "_1"]);
    f167.push(f162.f130["f" + s.charAt(3) + "_1"]);
    f167.push(f162.f130["f" + s.charAt(4) + "_1"]);
    f167.push(f162.f130["f" + s.charAt(5) + "_1"]);
    f167.push(f162.f130["f" + s.charAt(6) + "_1"]);
}

function f4(context) {
    var f200 = f162.f130["km_1"];
    var i;
    var x = (320 - (10 * 7)) - 30;
    var y = 6;
    for (i = 0; i < f167.length; i++) {
        context.drawImage(f167[i], x, y);
        x += f167[i].width + 2;
    }
    context.drawImage(f200, x + 1, y);
}

function f10() {
    if (!f191.f138.f136 && f191.f138.f154 > -7110) {
        f191.f139.f153 = 0;
        if (f191.f145) {
            f191.f139.f154 = f191.f138.f154 - 120;
        } else {
            f191.f139.f154 = f191.f138.f154 - 250;
        }
    } else {
        if (!f191.f145 && !f191.f138.f117) {
            f191.f138.f117 = true;
            f161 = 300;
        }
    }
}

function f15() {
    this.f118 = "";
    this.f130 = {};
    this.f77 = 0;
    this.f83 = 0;
    this.f131 = !false;
    this.f113 = null;
    this.f146 = function (list) {
        var f200;
        for (x in list) {
            this.f77++;
            f200 = new Image();
            f200.onload = this.f70;
            f200.src = this.f118 + list[x];
            f200.f162 = this;
            this.f130[x] = f200;
        }
    }
    this.f70 = function (e) {
        //var f162 = this.f162;
        f162.f83++;
        //if (f162.f83 == f162.f77) {
            f162.f131 = true;
        //    if (f162.f113 != null) {
                f162.f113();
        //    }
        //}
        //this.f162 = null;
    }
}

function f35(layef179) {
    this.f124 = new Array();
    this.f90 = "rgba(255, 255, 255, 0.0)";
    this.f143 = 0;
    this.f125 = 0;
    this.f139 = new f56();
    this.f88 = function (layef179) {
        var i;
        for (i = 0; i < layef179; i++) {
            this.f124.push(new Array());
        }
    }
    this.f88(layef179);
    this.f78 = function (f189) {
        var i;
        for (i = 0; i < this.f124[f189].length; i++) {
            this.f124[f189][i].f89 = false;
        }
    }
    this.f151 = function (f189, baseImage) {
        var f203 = new f29();
        f203.f146(baseImage, 1, 1);
        this.f99(f189, f203);
        return f203;
    }
    this.f65 = function (f189, baseImage, f188, delay) {
        var f203 = new f29();
        f203.f146(baseImage, f188, delay);
        this.f99(f189, f203);
        return f203;
    }
    this.f95 = function (f189, baseImage, rotate) {
        var f203 = new f1();
        f203.f146(baseImage, 1, 1);
        f203.f127 = rotate;
        this.f99(f189, f203);
        return f203;
    }
    this.f99 = function (f189, f203) {
        this.f124[f189].push(f203);
    }
    this.f137 = function (f189, f203) {}
    this.f133 = function (context) {
        var i;
        var a;
        var f159 = context.globalAlpha;
        this.f74(context);
        for (i = 0; i < this.f124.length; i++) {
            var f189 = this.f124[i];
            for (a = f189.length - 1; a >= 0; a--) {
                f189[a].f133(context, this.f139);
            }
        }
        context.globalAlpha = f159;
    }
    this.f132 = function () {
        var i;
        var a;
        for (i = 0; i < this.f124.length; i++) {
            var f189 = this.f124[i];
            for (a = f189.length - 1; a >= 0; a--) {
                if (!f189[a].f132()) {
                    f189.splice(i, 1);
                }
            }
        }
    }
    this.f71 = function (context) {
        var i;
        var a;
        this.f74(context);
        for (i = 0; i < this.f124.length; i++) {
            var f189 = this.f124[i];
            for (a = f189.length - 1; a >= 0; a--) {
                f189[a].f133(context, this.f139);
                if (!f189[a].f132()) {
                    f189.splice(a, 1);
                }
            }
        }
    }
    this.f74 = function (context) {
        if (this.f90 != null) {
            context.clearRect(0, 0, this.f143, this.f125);
        }
    }
}

function f29() {
    this.f152 = 0;
    this.f129 = new Array();
    this.f153 = 0;
    this.f154 = 0;
    this.f143 = 0;
    this.f125 = 0;
    this.f97 = 0;
    this.f87 = 0;
    this.f75 = 0;
    this.f126 = false;
    this.f106 = true;
    this.f101 = new f53();
    this.f142 = 0;
    this.f119 = 1;
    this.f89 = false;
    this.f84 = null;
    this.f86 = 0;
    this.f61 = false;
    this.f105 = 0;
    this.f109 = null;
    this.f102 = null;
    this.f123 = null;
    this.f103 = null;
    this.f92 = function (value) {
        this.f119 = value;
    }
    this.f144 = function (value) {
        this.f153 = value;
    }
    this.f147 = function (value) {
        this.f154 = value;
    }
    this.f96 = function () {
        return this.f153 + this.f97;
    }
    this.f93 = function () {
        return this.f154 + this.f87;
    }
    this.f107 = function () {
        return Math.round(this.f153 / map.f100);
    }
    this.f111 = function (value) {
        this.f144(value * map.f100);
    }
    this.f116 = function () {
        return Math.round((this.f154 + map.f85) / map.f85);
    }
    this.f115 = function (value) {
        this.f154 = (value * map.f85) - map.f85;
    }
    this.f146 = function (baseImage, f188, delay) {
        var i, a;
        var f199;
        for (i = 1; i <= f188; i++) {
            f199 = baseImage + "_" + i;
            this.f143 = f162.f130[f199]?f162.f130[f199].width:0;
            this.f125 = f162.f130[f199]?f162.f130[f199].height:0;
            this.f97 = this.f143 >> 1;
            this.f87 = this.f125 >> 1;
            for (a = 0; a < delay; a++) {
                this.f129.push(f162.f130[f199]);
            }
        }
    }
    this.f133 = function (context, camera) {
        var cx = ((this.f153 - camera.f153) * camera.f149) >> 0;
        var cy = ((this.f154 - camera.f154) * camera.f149) >> 0;
        if (cx >= -this.f143 && cy >= -this.f125 && cx < camera.f110.f143 && cy < camera.f110.f125) {
            if (this.f106 && this.f105 == 0) {
                context.save();
                context.globalAlpha = this.f119;
                context.translate((cx + this.f97) >> 0, (cy + this.f87) >> 0);
                context.scale(camera.f149, camera.f149);
                context.translate(-this.f97, -this.f87);
                context.drawImage(this.f129[this.f75], 0, 0);
                context.restore();
                f179++;
            }
        }
    }
    this.f132 = function () {
        if (this.f105 > 0) {
            this.f105--;
        } else if (this.f106) {
            this.f75++;
            if (this.f75 >= this.f129.length) {
                if (this.f126) {
                    this.f75 = 0;
                } else {
                    this.f75--;
                    this.f62();
                    if (this.f61) {
                        return false;
                    }
                }
            }
            if (this.f89) {
                if (this.f102 != null) {
                    this.f102(this);
                }
                this.f153 += (this.f101.f153 * this.f142);
                this.f154 += (this.f101.f154 * this.f142);
                if (this.f123 != null) {
                    if (this.f123(this)) {
                        return false;
                    }
                }
                if (this.f84 != null) {
                    switch (this.f86) {
                    case 1:
                        if (this.f153 <= this.f84.f153 - this.f143 || this.f153 >= this.f84.f140 || this.f154 <= this.f84.f154 - this.f125 || this.f154 >= this.f84.f128) {
                            this.f137(this);
                            return false;
                        }
                        break;
                    case 2:
                        if (this.f101.f153 < 0 && this.f153 <= this.f84.f153) {
                            this.f101.f153 = -this.f101.f153;
                            this.f153 = this.f84.f153;
                        } else if (this.f101.f153 > 0 && this.f153 >= this.f84.f140 - this.f143) {
                            this.f101.f153 = -this.f101.f153;
                            this.f153 = this.f84.f140 - this.f143;
                        }
                        if (this.f101.f154 < 0 && this.f154 <= this.f84.f154) {
                            this.f101.f154 = -this.f101.f154;
                            this.f154 = this.f84.f154;
                        } else if (this.f101.f154 > 0 && this.f154 >= this.f84.f128 - this.f125) {
                            this.f101.f154 = -this.f101.f154;
                            this.f154 = this.f84.f128 - this.f125;
                        }
                        break;
                    case 3:
                        if (this.f101.f153 < 0 && this.f153 - this.f143 <= this.f84.f153) {
                            this.f153 = this.f84.f140;
                        } else if (this.f101.f153 > 0 && this.f153 >= this.f84.f140) {
                            this.f153 = this.f84.f153 - this.f143;
                        }
                        if (this.f101.f154 < 0 && this.f154 <= this.f84.f154 - this.f125) {
                            this.f154 = this.f84.f128;
                        } else if (this.f101.f154 > 0 && this.f154 >= this.f84.f128) {
                            this.f154 = this.f84.f154 - this.f125;
                        }
                        break;
                    case 4:
                        if (this.f101.f153 < 0 && this.f153 <= this.f84.f153) {
                            this.f153 = this.f84.f153;
                        } else if (this.f101.f153 > 0 && this.f153 >= this.f84.f140 - this.f143) {
                            this.f153 = this.f84.f140 - this.f143;
                        }
                        if (this.f101.f154 < 0 && this.f154 <= this.f84.f154) {
                            this.f154 = this.f84.f154;
                        } else if (this.f101.f154 > 0 && this.f154 >= this.f84.f128 - this.f125) {
                            this.f154 = this.f84.f128 - this.f125;
                        }
                        break;
                    }
                }
            }
        }
        if (this.f103 != null) {
            return this.f103(this);
        }
        return true;
    }
    this.f62 = function () {}
    this.f137 = function () {
        if (this.f109 != null) {
            this.f109(this);
        }
    }
    this.f69 = function () {
        return this.f129[this.f75];
    }
    this.f122 = function (x, y, diff) {
        if (x >= this.f153 - diff && x < this.f153 + this.f143 + diff && y >= this.f154 - diff && y < this.f154 + this.f125 + diff) {
            return true;
        } else {
            return false;
        }
    }
    this.f80 = function (xDir, yDir, speed) {
        this.f89 = true;
        this.f101.f153 = xDir;
        this.f101.f154 = yDir;
        this.f142 = speed;
    }
}

function f1() {
    this.f81 = f29;
    this.f81();
    this.f127 = 0;
    this.f112 = null;
    this.f76 = -1;
    this.f63 = -1;
    this.f66 = 0;
    this.f82 = -1;
    this.f68 = -1;
    this.f73 = 0;
    this.f72 = false;
    this.f64 = null;
    this.f67 = null;
    this.f121 = function (delay, length) {
        this.f63 = delay;
        this.f66 = 1 / length;
        this.f76 = length;
    }
    this.f134 = function (delay, length) {
        this.f68 = delay;
        this.f73 = 1 / length;
        this.f82 = length;
        this.f119 = 0;
    }
    this.f133 = function (context, camera) {
        if (this.f106) {
            var cx = this.f153 - camera.f153;
            var cy = this.f154 - camera.f154;
            if (cx >= -this.f143 && cy >= -this.f125 && cx < camera.f110.f143 && cy < camera.f110.f125) {
                context.save();
                if (this.f112 != null) {
                    context.beginPath();
                    for (var i = 0; i < this.f112.length; i++) {
                        context.rect(this.f112[i].f153, this.f112[i].f154, this.f112[i].f143, this.f112[i].f125);
                    }
                    context.clip();
                }
                context.globalAlpha = this.f119;
                context.translate((cx + this.f97) >> 0, (cy + this.f87) >> 0);
                context.rotate(this.f127 * 0.0174532925199432957);
                context.translate(-this.f97, -this.f87);
                context.drawImage(this.f129[this.f75], 0, 0);
                if (this.f67 != null) {
                    this.f67(this, context);
                }
                context.restore();
                f179++;
            }
        }
    }
    this.f91 = this.f132;
    this.f132 = function () {
        var r = this.f91();
        if (this.f63 <= 0) {
            if (this.f76 > 0) {
                this.f76--;
                this.f119 -= this.f66;
                if (this.f76 <= 0) {
                    if (this.f64 != null) {
                        this.f64(this);
                    }
                    if (this.f72) {
                        return false;
                    }
                }
            }
        } else {
            this.f63--;
        }
        if (this.f68 <= 0) {
            if (this.f82 > 0) {
                this.f82--;
                this.f119 += this.f73;
            }
        } else {
            this.f68--;
        }
        return r;
    }
}

function f53() {
    this.f153 = 0;
    this.f154 = 0;
}

function f57() {
    this.f143 = 0;
    this.f125 = 0;
}

function f21(x, y, width, height) {
    this.f153 = x;
    this.f154 = y;
    this.f143 = width;
    this.f125 = height;
    this.f140 = x + width;
    this.f128 = y + height;
}

function f56() {
    this.f153 = 0;
    this.f154 = 0;
    this.f149 = 1;
    this.f110 = new f57();
}