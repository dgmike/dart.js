"use strict";

var DEad, DEads, vglAds;

vglAds = [];


// helper
var isHTMLElement = (function () {
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
        size.height = parseInt(size.split("x")[0], 10);
        size.width  = parseInt(size.split("x")[1], 10);
        this.size = size;
        this.pos  = pos;
        this.elm  = elm;
    }
    return DEad;
})();

DEads = (function() {
    function DEads() {
        // constructor
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
            elm.style.height = size.split("x")[0] + "px";
            elm.style.width = size.split("x")[1] + "px";
            script.parentNode.appendChild(elm);
        }
        vglAds.push(new DEad(size, pos, elm));
    }
    return DEads;
})();

function DEShow() {
    DEads.add.apply(window, arguments);
}
