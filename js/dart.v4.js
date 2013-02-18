"use strict";

var DEads;
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


DEads = (function() {
    function DEads() {
        // constructor
    }
    DEads.add = function() {
    }
    return DEads;
})();

function DEShow() {

}