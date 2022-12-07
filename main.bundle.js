"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["main"],{

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//import Project\n//import Task\n//import format from date-fns\n\n//DOM elements\n//event listeners\n\nconst dom = (() => {\n\n    const header = (() => {\n            const header = document.createElement('header');\n            header.classList.add('header');\n            const todoIcon = document.createElement('i');\n            todoIcon.classList.add('fa-regular');\n            todoIcon.classList.add('fa-list-check');\n            const title = document.createElement('h1');\n            title.textContent = 'To-Do';\n            title.classList.add('title');\n            title.appendChild(todoIcon)\n            header.appendChild(title);\n        \n            // return header;\n        \n    })();\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n//# sourceURL=webpack:///./src/UI.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI.js */ \"./src/UI.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', _UI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n//event fires when the HTML document has been completely parsed, and all deferred scripts (<script defer src=\"…\"> and <script type=\"module\">) have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading.\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);