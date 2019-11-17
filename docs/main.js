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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/cursor.js":
/*!************************!*\
  !*** ./demo/cursor.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(config) {\n    let {\n        color = 'red',\n        top = 0,\n        bottom = 200,\n        position = 0,\n        vertical = false\n    } = config\n\n    let n1, n2, m1, m2\n\n    if (vertical) {\n        n1 = 'x1'\n        n2 = 'x2'\n\n        m1 = 'y1'\n        m2 = 'y2'\n    } else {\n        n1 = 'y1'\n        n2 = 'y2'\n\n        m1 = 'x1'\n        m2 = 'x2'\n    }\n    \n    let line = null\n\n    function chart(selection) {\n        line = selection.append('line')\n            .attr(n1, position)\n            .attr(m1, top)\n            .attr(n2, position)\n            .attr(m2, bottom)\n            .attr('stroke', color)\n    }\n\n    chart.color = function(value) {\n        if (!arguments.length) return color\n\n        color = value\n        line.attr('stroke', color)\n\n        return chart\n    }\n\n    chart.position = function(value) {\n        if (!arguments.length) return position\n\n        position = value\n\n        line\n            .attr(n1, position)\n            .attr(n2, position)\n\n        return chart\n    }\n\n    return chart\n});\n\n//# sourceURL=webpack:///./demo/cursor.js?");

/***/ }),

/***/ "./demo/graph.js":
/*!***********************!*\
  !*** ./demo/graph.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _root_population__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/population */ \"./demo/population.js\");\n\n\nasync function drawGraph() {\n    let margin = {top: 5, bottom: 30, left: 120, right: 5}\n    let width = 800 - margin.left - margin.right\n    let height = 300 - margin.top - margin.bottom\n    let fullWidth = width + margin.left + margin.right\n    let fullHeight = height + margin.top + margin.bottom\n\n    let svg = d3.select('svg#graph')\n                  .attr('width', fullWidth)\n                  .attr('height', fullHeight)\n\n    let background = svg.append(\"rect\")\n                        .attr(\"width\", fullWidth)\n                        .attr(\"height\", fullHeight)\n                        .attr(\"fill\", \"#fff\");\n\n    let graph = svg.append('g')\n                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')\n                  .attr('width', width)\n                  .attr('height', height)\n\n    let data = await d3.csv('./us-population-1990-to-2016.csv', \n                            ({year, population}) => ({date:new Date(year,0,1), population: +population}))\n    \n    graph.datum(data)\n        .call(Object(_root_population__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            width,\n            height\n        }))\n}\n\ndrawGraph()\n\n//# sourceURL=webpack:///./demo/graph.js?");

/***/ }),

/***/ "./demo/legend.js":
/*!************************!*\
  !*** ./demo/legend.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n    let format = d3.format(\",d\")\n    let population, year\n    let textPop = null\n    let textYear = null\n\n    function chart(selection) {\n        let box = selection.append('text')\n                    .style('font-family', 'Verdana')\n                    .style('text-anchor', 'end')\n\n        box.append('tspan')\n            .text('Population:')\n\n        textPop = box.append('tspan')\n            .attr('x', '7em')\n            .style('font-family', 'Courier New')\n\n        box.append('tspan')\n            .attr('dy', '1.2em')\n            .attr('x', 0)\n            .text('Year:')\n\n        textYear = box.append('tspan')\n            .attr('x', '7em')\n            .style('font-family', 'Courier New')\n    }\n\n    chart.population = function(value) {\n        if (!arguments.length) return text\n        if (!textPop) return\n\n        textPop\n            .transition()\n            .duration(700)\n            .tween(\"text\", function() {\n                var that = d3.select(this),\n                    i = d3.interpolateNumber([that.text().replace(/,/g, \"\")], value);\n                return t => that.text(format(i(t)))\n            })\n\n        return chart\n    }\n\n    chart.year = function(value) {\n        if (!arguments.length) return text\n        if (!textYear) return\n\n        textYear\n            .transition()\n            .duration(700)\n            .tween(\"text\", function() {\n                var that = d3.select(this),\n                    i = d3.interpolateNumber([that.text().replace(/,/g, \"\")], value.getFullYear());\n                return t => that.text(Math.floor(i(t)))\n            })\n        return chart\n    }\n\n    return chart\n});\n\n//# sourceURL=webpack:///./demo/legend.js?");

/***/ }),

/***/ "./demo/population.js":
/*!****************************!*\
  !*** ./demo/population.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _root_legend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/legend.js */ \"./demo/legend.js\");\n/* harmony import */ var _root_cursor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/cursor.js */ \"./demo/cursor.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (config => selection => {\n    let {\n        width,\n        height,\n\n    } = config\n\n    let graph = selection\n\n    let data = selection.data()[0]\n\n    let xScale = d3.scaleTime()\n                    .domain([d3.min(data.map(d => d.date)), d3.max(data.map(d => d.date))])\n                    .range([0, width])\n\n    let yScale = d3.scaleLinear()\n                    .domain([\n                        0,\n                        d3.max(data.map(d => d.population))\n                    ])\n                    .range([height, 0])\n\n    graph\n        .selectAll('rect')\n        .data(data)\n        .enter()\n        .append('rect')\n        .attr('x', d => xScale(d.date))\n        .attr('y', d => yScale(d.population))\n        .attr('width', 3)\n        .attr('height', d => height-yScale(d.population)-30)\n        .attr('fill', '#ccc')\n        .on('mouseover', d => {\n            //console.log(d)\n            legendChart\n                .year(d.date)\n                .population(d.population)\n\n            let x = xScale(d.date)\n            let y = yScale(d.population)\n            drawVerticalCursor.position(x)\n            drawHorizontalCursor.position(y)\n        })\n\n        let ax = d3.axisBottom()\n                    .scale(xScale)\n                    .tickFormat(d3.timeFormat('%Y'))\n\n        let ay = d3.axisLeft()\n                    .scale(yScale)\n\n        graph.append('g')\n            .attr('transform', `translate(0,${height-25})`)\n            .call(ax)\n\n        graph.append('g')\n            .attr('transform', `translate(-5,0)`)\n            .call(ay)\n\n        let legendChart = Object(_root_legend_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n\n        let l = graph.append('g')\n                .attr('transform', `translate(100,100)`)\n                .call(legendChart)\n\n        legendChart\n            .year(d3.min(data.map(d => d.date)))\n            .population(d3.min(data.map(d => d.population)))\n\n        let drawVerticalCursor = Object(_root_cursor_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            top: 0,\n            bottom: height-10,\n            color: 'green',\n            vertical: true\n        })\n\n        graph.append('g')\n            .call(drawVerticalCursor)\n\n\n        let drawHorizontalCursor = Object(_root_cursor_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            top: -20,\n            bottom: width,\n            color: 'red',\n        })\n\n        graph.append('g')\n            .call(drawHorizontalCursor)\n    \n});\n\n//# sourceURL=webpack:///./demo/population.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./demo/graph.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./demo/graph.js */\"./demo/graph.js\");\n\n\n//# sourceURL=webpack:///multi_./demo/graph.js?");

/***/ })

/******/ });