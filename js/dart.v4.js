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

        vglAds.push(new DEad(size, pos, elm));
    }
    return DEads;
})();

function DEShow() {
    DEads.add.apply(window, arguments);
}