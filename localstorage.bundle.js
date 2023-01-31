"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["localstorage"],{

/***/ "./src/localstorage.js":
/*!*****************************!*\
  !*** ./src/localstorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* \nlocalStorage.setItem() to create a new key-value pair\nlocalStorage.getItem() to retrieve the value of a key\nlocalStorage.removeItem() to remove a specific pair\nlocalStorage.clear() deletes ALL saved pairs for that domain \n*/\n\nconst localStorage = (() => {\n    function addToStorage(obj){\n        this.obj = obj; //should have title, details, dueDate, priority (low, medium, high), data-task-index\n        window.localStorage.setItem('projects', JSON.stringify(obj));\n        console.log(`projects added to storage: ${(getFromStorage('projects'))}`); \n        console.table(getFromStorage('projects'))/* Task: ${this.obj.title} has been added to storage with key: ${this.obj.index} */\n    }\n    function getFromStorage(key){\n        return window.localStorage.getItem(key);\n    }\n    function deleteFromStorage(key){\n        window.localStorage.removeItem(key);\n    }\n    function clearStorage(){\n        window.localStorage.clear();\n    }\n    return {\n        addToStorage,\n        getFromStorage,\n        deleteFromStorage,\n        clearStorage\n    };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localStorage);\n\n//# sourceURL=webpack:///./src/localstorage.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/localstorage.js"));
/******/ }
]);