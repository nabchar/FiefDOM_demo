/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(callback) {
    this.nodes.forEach(callback);
  }

  html(string) {
    if (typeof string === 'undefined' ) {
      return this.nodes[0].innerHTML;
    } else {
      this.each(node => {
        node.innerHTML = string;
      });
    }
  }

  empty() {
    this.html('');
  }

  append(children) {
    if (this.nodes.length === 0) return;

    if (typeof children === 'object' &&
        !(children instanceof DOMNodeCollection)) {
      children = window.$f(children);
    }

    if (typeof children ==='string'){
      this.each(node => {
        node.innerHTML += children;
      });
    }
    else if (children instanceof DOMNodeCollection){
      this.each(node => {
        children.each(childNode => {
          node.innerHTML += childNode.outerHTML;
        });
      });
    }
  }

  attr(key, value) {
    if (typeof value === "string") {
      this.each( node => node.setAttribute(key, value) );
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(className) {
    this.each(node => {
      node.classList.toggle(className);
    });
  }

  children(){
    let children = [];
    this.each(node => {
      let childNodes = Array.from(node.children);
      children = children.concat(childNodes);
    });
    return new DOMNodeCollection(children);
  }

  parent(){
    let parents = [];
    for(let i = 0; i < this.nodes.length; i++) {
      let parent = this.nodes[i].parentElement;
      if (parents.includes(parent)){
        continue;
      } else {
        parents.push(this.nodes[i].parentElement);
      }
    }
    return new DOMNodeCollection(parents);
  }

  eq(integer) {
    let node = this.nodes[integer];
    return new DOMNodeCollection([node]);
  }

  find(selector) {
    let collection = [];
    this.each(node => {
      let nodeList =  node.querySelectorAll(selector);
      collection = collection.concat(Array.from(nodeList));
    });
    return new DOMNodeCollection(collection);
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  on(eventType, eventCallback) {
    this.each(node => {
      node.addEventListener(eventType, eventCallback);
      const eventKey = `eventCache-${eventType}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(eventCallback);
    });
  }

  off(eventType) {
    this.each(node => {
      const eventKey = `eventCache-${eventType}`;
      if (node[eventKey]) {
        node[eventKey].forEach(eventCallback => {
          node.removeEventListener(eventType, eventCallback);
        });
      }
      node[eventKey] = [];
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__ = __webpack_require__(0);


window.$f = (arg) => {

  switch (typeof(arg)) {
    case 'function':
      return queueDocReadyCallback(arg);
    case 'string':
      let nodes = Array.from(document.querySelectorAll(arg));
      return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */](nodes);
    default:
      return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */]([arg]);
  }
};

window.$f.extend = (...args) => {
  return Object.assign(...args);
};

window.$f.ajax = (options) => {
  // step 1. instantiate a new request
  const request = new XMLHttpRequest();

  // step 1.1 define suitable defaults
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: '',
    data: {},
    success: (response) => console.log(response),
    error: (error) => console.log(error)
  };

  // step 1.2 merge user chosen options with defaults
  options = window.$f.extend(defaults, options);

  // step 1.3 make sure http verb is in all CAPS
  options.method = options.method.toUpperCase();

  // step 2. specify the http verb and path
  request.open(options.method, options.url);

  // step 3 - register a callback
  request.onload = () => {
    let response = JSON.parse(request.response);
    if(request.status === 200) {
      options.success(response);
    } else {
      options.error(response);
    }
  };

  // step 4 - send off the request with optional data
  const optionalData = options.data;
  request.send(JSON.stringify(optionalData));

};

let _docReadyCallbacks = [];
let _docReady = false;

const queueDocReadyCallback = (callback) => {
  if (!_docReady) {
    _docReadyCallbacks.push(callback);
  } else {
    callback();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( callback => callback() );
});


/***/ })
/******/ ]);
