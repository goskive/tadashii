/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nvar _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; })();\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.validate = validate;\nexports.isValid = isValid;\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/*\n * Named validators. All validators gets the attribute, value & full model passed to them.\n */\nvar validators = {\n  minLength: function minLength(attribute, value, model, _minLength) {\n    return value.length >= _minLength;\n  },\n  isRequired: function isRequired(attribute, value, model) {\n    return typeof value !== \"undefined\" && value !== null;\n  },\n  isNotEmpty: function isNotEmpty(attribute, value, model) {\n    return value.length > 0;\n  },\n  isEmail: function isEmail(attribute, value, model) {\n    return true;\n  },\n  matchesAttribute: function matchesAttribute(attribute, value, model, other_attribute) {\n    return model[attribute] === model[other_attribute];\n  }\n};\n\nfunction extractFunctionAndArguments(options) {\n  var isCustom = typeof options[0] === \"function\";\n  var func = isCustom ? options[0] : validators[options[0]];\n  /*\n   * [validatorFunction, argumentsToValidator, errorMessage]\n   */\n  var args = options.slice(1, options.length - 2); // get middle arguments\n  var validatorArguments = [attribute, modelValue, model].concat(_toConsumableArray(args));\n\n  return [func, validatorArguments];\n}\n\n/*\n * Map over each validator and return error messages for those that fail.\n */\nfunction validate(schema, model) {\n  return Object.keys(schema).reduce(function (result, attribute) {\n    var validations = schema[attribute];\n    var modelValue = model[attribute];\n\n    result[attribute] = validations.filter(function (options) {\n      var _extractFunctionAndAr = extractFunctionAndArguments(options);\n\n      var _extractFunctionAndAr2 = _slicedToArray(_extractFunctionAndAr, 2);\n\n      var func = _extractFunctionAndAr2[0];\n      var validatorArguments = _extractFunctionAndAr2[1];\n\n      return func.apply(null, validatorArguments);\n    }).map(function (options) {\n      var errorMessage = options[options.length - 1];\n\n      return typeof errorMessage === \"function\" ? errorMessage(modelValue) : errorMessage;\n    });\n\n    return result;\n  }, {});\n}\n\n/*\n * Determine whether a model is valid according to its schema\n */\nfunction isValid(schema, model) {\n  var validators = Object.keys(schema).map(function (attribute) {\n    return schema[attribute];\n  }).reduce(function (result, item) {\n    return result.concat(item);\n  }, []);\n\n  return validators.find(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2);\n\n    var func = _ref2[0];\n    var args = _ref2[1];\n    return func(args) === false;\n  });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/index.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/index.js?");

/***/ }
/******/ ]);