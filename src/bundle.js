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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ \"./src/map.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    Object(_map__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n})//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz81NmQ3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBOEI7O0FBRTlCO0FBQ0EsSUFBSSxvREFBUztBQUNiLENBQUMiLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZW5kZXJNYXAgZnJvbSAnLi9tYXAnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgcmVuZGVyTWFwKCk7XG59KSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst renderMap = () => {\n    const width = 800;\n    const height = 500;\n    let yearDataset;\n    const temp = [];\n\n    usEEG.forEach(el => {\n        if (el.description === 2018) yearDataset = el;\n    })\n\n    const svg = d3.select(\".main-container\")\n        .append(\"svg\")\n        .attr(\"width\", width)\n        .attr(\"height\", height);\n\n    const g = svg.append(\"g\")\n        .attr(\"class\", \"us-map\");\n\n    const projection = d3.geoAlbersUsa()\n        .scale(1000)\n        .translate([width / 2, height / 2]);\n\n    const path = d3.geoPath()\n        .projection(projection); \n\n    const color = d3.scaleThreshold()\n        .domain([50000, 100000, 150000, 200000, 250000, 450000])\n        .range([\"#add8e6\", \"#7da2cf\", \"#4361b3\", \"#283ea3\", \"#0b1291\", \"#000000\"])\n\n    g.selectAll(\"path\")\n        .data(topojson.feature(usStates5mTopo, usStates5mTopo.objects.cb_2018_us_state_5m).features)\n        .enter()\n        .append(\"path\")\n        .attr(\"class\", \"us-states\")\n        .attr(\"d\", path)\n        .attr(\"fill\", d => {\n            temp.push(yearDataset[d.properties.NAME.concat(\" : all fuels (utility-scale)\")]);\n            return color(yearDataset[d.properties.NAME.concat(\" : all fuels (utility-scale)\")]);\n        })\n\n    document.onmousemove = (event) => {\n        document.getElementById(\"hover-tooltip\").style.left = event.pageX + \"px\";\n        document.getElementById(\"hover-tooltip\").style.top = event.pageY - 35 + \"px\";\n    }\n\n    const paths = document.getElementsByClassName(\"us-states\")\n\n    for (let i = 0; i < paths.length; i++) {\n        paths[i].addEventListener(\"mouseover\", e => {\n            const name = e.target.__data__.properties.NAME;\n            const fullMessage = name.concat(\": \", Number(yearDataset[name.concat(\" : all fuels (utility-scale)\")]).toLocaleString(), \" thousand megawatthours\");\n            const domEle = document.getElementById(\"hover-tooltip\");\n            domEle.innerHTML = fullMessage;\n            domEle.style.opacity = 1;\n        });\n        paths[i].addEventListener(\"mouseleave\", e => {\n            document.getElementById(\"hover-tooltip\").innerHTML = \"\";\n            document.getElementById(\"hover-tooltip\").style.opacity = 0;\n        })\n    }\n    console.log(temp);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderMap);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFwLmpzPzE4YmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFZSx3RUFBUyIsImZpbGUiOiIuL3NyYy9tYXAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZW5kZXJNYXAgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSA4MDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gNTAwO1xuICAgIGxldCB5ZWFyRGF0YXNldDtcbiAgICBjb25zdCB0ZW1wID0gW107XG5cbiAgICB1c0VFRy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKGVsLmRlc2NyaXB0aW9uID09PSAyMDE4KSB5ZWFyRGF0YXNldCA9IGVsO1xuICAgIH0pXG5cbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QoXCIubWFpbi1jb250YWluZXJcIilcbiAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgY29uc3QgZyA9IHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ1cy1tYXBcIik7XG5cbiAgICBjb25zdCBwcm9qZWN0aW9uID0gZDMuZ2VvQWxiZXJzVXNhKClcbiAgICAgICAgLnNjYWxlKDEwMDApXG4gICAgICAgIC50cmFuc2xhdGUoW3dpZHRoIC8gMiwgaGVpZ2h0IC8gMl0pO1xuXG4gICAgY29uc3QgcGF0aCA9IGQzLmdlb1BhdGgoKVxuICAgICAgICAucHJvamVjdGlvbihwcm9qZWN0aW9uKTsgXG5cbiAgICBjb25zdCBjb2xvciA9IGQzLnNjYWxlVGhyZXNob2xkKClcbiAgICAgICAgLmRvbWFpbihbNTAwMDAsIDEwMDAwMCwgMTUwMDAwLCAyMDAwMDAsIDI1MDAwMCwgNDUwMDAwXSlcbiAgICAgICAgLnJhbmdlKFtcIiNhZGQ4ZTZcIiwgXCIjN2RhMmNmXCIsIFwiIzQzNjFiM1wiLCBcIiMyODNlYTNcIiwgXCIjMGIxMjkxXCIsIFwiIzAwMDAwMFwiXSlcblxuICAgIGcuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAuZGF0YSh0b3BvanNvbi5mZWF0dXJlKHVzU3RhdGVzNW1Ub3BvLCB1c1N0YXRlczVtVG9wby5vYmplY3RzLmNiXzIwMThfdXNfc3RhdGVfNW0pLmZlYXR1cmVzKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwidXMtc3RhdGVzXCIpXG4gICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKVxuICAgICAgICAuYXR0cihcImZpbGxcIiwgZCA9PiB7XG4gICAgICAgICAgICB0ZW1wLnB1c2goeWVhckRhdGFzZXRbZC5wcm9wZXJ0aWVzLk5BTUUuY29uY2F0KFwiIDogYWxsIGZ1ZWxzICh1dGlsaXR5LXNjYWxlKVwiKV0pO1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yKHllYXJEYXRhc2V0W2QucHJvcGVydGllcy5OQU1FLmNvbmNhdChcIiA6IGFsbCBmdWVscyAodXRpbGl0eS1zY2FsZSlcIildKTtcbiAgICAgICAgfSlcblxuICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG92ZXItdG9vbHRpcFwiKS5zdHlsZS5sZWZ0ID0gZXZlbnQucGFnZVggKyBcInB4XCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG92ZXItdG9vbHRpcFwiKS5zdHlsZS50b3AgPSBldmVudC5wYWdlWSAtIDM1ICsgXCJweFwiO1xuICAgIH1cblxuICAgIGNvbnN0IHBhdGhzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInVzLXN0YXRlc1wiKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXRoc1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0Ll9fZGF0YV9fLnByb3BlcnRpZXMuTkFNRTtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxNZXNzYWdlID0gbmFtZS5jb25jYXQoXCI6IFwiLCBOdW1iZXIoeWVhckRhdGFzZXRbbmFtZS5jb25jYXQoXCIgOiBhbGwgZnVlbHMgKHV0aWxpdHktc2NhbGUpXCIpXSkudG9Mb2NhbGVTdHJpbmcoKSwgXCIgdGhvdXNhbmQgbWVnYXdhdHRob3Vyc1wiKTtcbiAgICAgICAgICAgIGNvbnN0IGRvbUVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG92ZXItdG9vbHRpcFwiKTtcbiAgICAgICAgICAgIGRvbUVsZS5pbm5lckhUTUwgPSBmdWxsTWVzc2FnZTtcbiAgICAgICAgICAgIGRvbUVsZS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBhdGhzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGUgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3Zlci10b29sdGlwXCIpLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdmVyLXRvb2x0aXBcIikuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRlbXApO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJNYXA7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/map.js\n");

/***/ })

/******/ });