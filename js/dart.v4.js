"use strict";

var DEad, DEads, vglAds, loader, isHTMLElement, Tim;

var DEt=new Date(); DEt=DEt.getTime();
var DErand=Math.floor(DEt*1000*Math.random());
var scw=0,sch=0;
if(screen.height){scw=screen.width;sch=screen.height;};

vglAds = [];

// helper
isHTMLElement = (function () {
    if ("HTMLElement" in window) {
        // Voilà. Quick and easy. And reliable.
        return function (el) {return el instanceof HTMLElement;};
    } else if ((document.createElement("a")).constructor) {
        // We can access an element's constructor. So, this is not IE7
        var ElementConstructors = {}, nodeName;
        return function (el) {
            return el && typeof el.nodeName === "string" &&
                 (el instanceof ((nodeName = el.nodeName.toLowerCase()) in ElementConstructors 
                    ? ElementConstructors[nodeName] 
                    : (ElementConstructors[nodeName] = (document.createElement(nodeName)).constructor)))
        }
    } else {
        // Not that reliable, but we don't seem to have another choice. Probably IE7
        return function (el) {
            return typeof el === "object" && el.nodeType === 1 && typeof el.nodeName === "string";
        }
    }
})();

Tim = (function () {
    var start   = "{{",
        end     = "}}",
        path    = "[a-z0-9_][\\.a-z0-9_]*", // e.g. config.person.name
        pattern = new RegExp(start + "\\s*("+ path +")\\s*" + end, "gi"),
        undef;
    
    return function(template, data){
        // Merge data into the template string
        return template.replace(pattern, function(tag, token){
            var path = token.split("."),
                len = path.length,
                lookup = data,
                i = 0;
            for (; i < len; i++){
                lookup = lookup[path[i]];
                // Property not found
                if (lookup === undef){
                    throw "tim: '" + path[i] + "' not found in " + tag;
                }
                // Return the required value
                if (i === len - 1){
                    return ("function" === typeof lookup
                            ? lookup.apply(data, [])
                            : lookup.toString());
                }
            }
        });
    };
})();

DEad = (function() {
    function DEad(size, pos, elm) {
        if (null === size || null === pos) {
            throw "You must set size AND pos on try to add a new advertisement";
        }
        if (!(new RegExp('^\\d+x\\d+$')).test(size)) {
            throw "The advertisement must be in <Int>x<Int> format. "
                  + "Eg: 200x300" + " - passed: " + JSON.stringify(size);
        }
        if (!isHTMLElement(elm)) {
            throw "You must pass an valid HTML Element to create an advertisement";
        }
        elm.setAttribute('data-started', 'yes');
        this.size = {
            width:  parseInt(size.split("x")[0], 10),
            height: parseInt(size.split("x")[1], 10)
        };
        this.size.toString = function() {
            return this.width + 'x' + this.height;
        }
        this.pos  = pos;
        this.elm  = elm;
        this.iframe = null;
    }
    DEad.prototype.refresh = function () {
        var iframe = document.createElement('iframe');
        window.DEt=new Date(); window.DEt=window.DEt.getTime();
        window.DErand=Math.floor(window.DEt*1000*Math.random());
        
        iframe.className = "publicidade-dart-" + this.size;
        iframe.frameBorder = 0;
        iframe.noResize = true;
        iframe.scrolling = 'no';
        iframe.style.display = 'block';
        iframe.style.height  = this.size.height + 'px';
        iframe.style.width   = this.size.width  + 'px';
        iframe.style.border  = 'none';

        this.elm.innerHTML   = "";
        this.elm.appendChild(iframe);
        this.iframe = iframe;
        this.write();
    };
    DEad.prototype.write = function() {
        var doc, tpl, output;
        if (!this.iframe) {
            return;
        }
        doc = this.iframe.contentDocument || this.iframe.contentWindow.document;
        tpl = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>DART</title>\
            \n<style>\
            \n    * {margin:0;padding:0;}\
            \n    html, body {background:transparent;overflow:hidden;}\
            \n</style>\
            \n</head><body>\
            \n<div id="wrapper" style="display:table"><script>\
            \n// UOL - Dart\
            \nvar DEaff   = "{{DEaff}}";\
            \nvar DEchan  = "{{DEchan}}";\
            \nvar DEsubc  = "{{DEsubc}}";\
            \nvar Expble  =  {{Expble}};\
            \nvar DEcmpng =  {{DEcmpng}};\
            \nvar DEGroup =  {{DEGroup}};\
            \n\
            \nvar ad      = "{{ad}}";\
            \nvar pos     = {{pos}};\
            \n\
            \nvar DEt={{DEt}}\
            \nvar DErand={{DErand}};\
            \nvar scw={{scw}},sch={{sch}}\
            \n\
            \nDEconn = document.body;\
            \nDEconn.style.behavior = "url(#default#clientCaps)";\
            \nDEconn = (DEconn.connectionType === "lan") ? 1 : 0;\
            \n\
            \ndocument.write("<sc" +\
            \n       "ript language=\\"JavaScript1.1\\" src=\\"http://bn.uol.com.br/js.ng/site=par" +\
            \n       "&chan="      + DEchan +\
            \n       "&subchan="   + DEsubc +\
            \n       "&affiliate=" + DEaff +\
            \n       "&size="      + ad +\
            \n       "&page="      + pos +\
            \n       "&conntype="  + DEconn +\
            \n       "&expble="    + Expble +\
            \n       "&reso="      + scw + "x" + sch +\
            \n       "&cmpng="     + DEcmpng +\
            \n       "&group="     + DEGroup +\
            \n       "&tile="      + DErand +\
            \n     "?\\">" + "</sc"+"ript>");\
            \n</script></div>\
            \n</body></html>';
        output = Tim(tpl, {
            DErand  : DErand,
            DEt     : DEt,
            scw     : scw,
            sch     : sch,
            DEaff   : DEaff,
            DEchan  : DEchan,
            DEsubc  : DEsubc,
            Expble  : Expble,
            DEcmpng : DEcmpng,
            DEGroup : DEGroup,
            ad      : this.size,
            pos     : this.pos
        });
        doc.write(output);
    };
    return DEad;
})();

DEads = (function() {
    function DEads() {
        // constructor
    }
    DEads._initialized = false;
    // constructor
    DEads.initialize = function() {
        var i, j, elms, elm, regTest, attrs, size, pos;
        // runs only one time
        if (DEads._initialized) {
            return;
        }
        DEads._initialized = true;
        // start
        regTest = new RegExp('\\b(deshow|publicidade|dart)\\b', 'ig');
        regTest.testAll = function() {
            var i, j, args = arguments;
            for (i=0,j=args.length; i<j; i++) {
                if (this.test(args[i])) {
                    return true;
                }
            }
            return false;
        }
        elms = document.getElementsByTagName('*');
        for (i=0,j=elms.length; i<j; i++) {
            elm = elms[i];
            if (!regTest.testAll(elm.className, elm.getAttribute('rel'))) {
                continue;
            }
            if (elm.getAttribute('data-started')) {
                continue;
            }
            if (attrs = elm.getAttribute('data-publicidade')) {
                if (!attrs.match(/^\d+x\d+\s*,\s*\d+$/)) {
                    if (window.console && window.console.warn) {
                        console.warn('The "data-publicidade" attribute must be in "(Int)x(Int),(Int)" format. "' + attrs + '" given');
                    }
                    continue
                }
                attrs = attrs.split(',');
                size  = attrs[0];
                pos   = attrs[1];
            } else if ((size = elm.getAttribute('data-size')) && (pos = elm.getAttribute('data-pos'))) {
                if (!size.match(/^\d+x\d+$/)) {
                    if (window.console && window.console.warn) {
                        window.console.warn('The "data-size" attribute must be in "(Int)x(Int)" format. "' + size + '" given');
                    }
                    continue
                }
                if (!pos.match(/^\d+$/)) {
                    if (window.console && window.console.warn) {
                        window.console.warn('The "data-pos" must be an integer. "' + pos + '" given');
                    }
                    continue
                }
            } else {
                if (window.console && window.console.warn) {
                    window.console.warn('The "data-publicidade" or "data-size" AND "data-pos" must be setted');
                }
            }
            elm.setAttribute('data-started', 'yes');
            elm.className = elm.className + ' publicidade';
            elm.style.display = "block";
            elm.style.width = size.split("x")[0] + "px";
            elm.style.height = size.split("x")[1] + "px";
            DEads.add(size, parseInt(pos, 10), elm);
        }
        DEads.refresh();
        DEads.verifySizes();
    }
    DEads.add = function(size, pos, elm) {
        var vglAds, script, scripts;
        vglAds = window.vglAds;
        if (!isHTMLElement(elm)) {
            elm = document.createElement('div');
            scripts = document.getElementsByTagName('script');
            script = scripts[scripts.length - 1];
            elm.className = "publicidade";
            elm.style.display = "block";
            elm.style.width  = size.split("x")[0] + "px";
            elm.style.height = size.split("x")[1] + "px";
            script.parentNode.appendChild(elm);
        }
        vglAds.push(new DEad(size, pos, elm));
    };
    DEads.each = function(fn) {
        var i, j, output, vglAds = window.vglAds || [];
        output = [];
        for (i=0,j=vglAds.length; i<j; i++) {
            output.push(fn.apply(vglAds[i], [i]));
        }
        return output;
    };
    DEads.refresh = function () {
        DEads.each(function(){
            this.refresh();
        });
    }
    DEads.verifySizes = function() {
        setInterval(function(){
            DEads.each(function(){
                var publ, doc;
                try {
                    publ = this.iframe;
                    doc  = this.iframe.contentDocument || this.iframe.contentWindow.document;
                    var e = doc.getElementById('wrapper'),
                        w = parseInt(e.offsetWidth, 10),
                        h = parseInt(e.offsetHeight, 10),
                        embed, elmName, i,
                        searchElements = ['object', 'embed', 'iframe'];
                    publ.style.height = h + 'px';
                    publ.style.width = w + 'px';
                    if (w == 728 && h == 90) {
                        for (i = 0; i <= searchElements.length; elmName = searchElements[i++]) {
                            try {
                                embed = doc.getElementsByTagName(elmName)[0];
                                if (parseInt(embed.offsetHeight, 10) == 300) {
                                    if (!publ.hasmouseover) {
                                        publ.hasmouseover = true;
                                        this.elm.style.width = "728px";
                                        this.elm.style.height = "90px";
                                        if ('addEventListener' in publ) { // publ.hasOwnProperty('addEventListener')) {
                                            publ.addEventListener('mouseover', function () {
                                                e.style.height = '300px';
                                            }, false);
                                            publ.addEventListener('mouseout', function () {
                                                e.style.height = '90px';
                                            }, false);
                                        } else if (publ.hasOwnProperty('attachEvent')) {
                                            publ.attachEvent('onmouseover', function () {
                                                e.style.height = '300px';
                                            });
                                            publ.attachEvent('onmouseout', function () {
                                                e.style.height = '90px';
                                            });
                                        }
                                    }
                                }
                            } catch (e) {}
                        }
                    } else if (this.size.toString() == "728x90" && w == 990) {
                        this.elm.style.width = "990px";
                        this.elm.style.height = "126px";
                    }
                } catch (e) {}
            });
        }, 1);
    }
    return DEads;
})();

// Old method
function DEShow(ad, pos) {
    if (ad !== "1x1") {
        DEads.add.apply(window, arguments);
    } else {
        var DEconn = document.body ;
        DEconn.style.behavior = 'url(#default#clientCaps)' ;
        DEconn = ( DEconn.connectionType == 'lan' ) ? 1 : 0 ;
        document.write ( '<scr' + 'ipt language="JavaScript1.1" src="http://bn.uol.com.br/js.ng/site=par&chan=' + DEchan + '&subchan=' + DEsubc + '&affiliate=' + DEaff + '&size=' + ad + '&page=' + pos + '&conntype=' + DEconn + '&expble=' + Expble + '&reso=' + scw + 'x' + sch + '&cmpng=' + DEcmpng + '&group=' + DEGroup + '&tile=' + DErand + '?"></scr' + 'ipt>' ) ;
    }
}

// loader
loader = window.onload;
window.onload = function() {
    DEads.initialize();
    if ("function" === typeof loader) {
        loader.call(window);
    }
}