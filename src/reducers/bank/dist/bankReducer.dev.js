"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// !STATE
var initialState = {
  personalInfo: {},
  personalHistoty: [],
  loading: true,
  error: '',
  statisticsHistory: []
}; // !MUTATIONS

var todoReducer = function todoReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case 'FETCH_PERSONAL_INFO_SUCCESS':
      return _objectSpread({}, state, {
        personalInfo: payload,
        loading: false
      });

    case 'FETCH_PERSONAL_HISTORY_SUCCESS':
      return _objectSpread({}, state, {
        personalHistoty: payload,
        loading: false
      });

    case 'FETCH_STATISTICS_HISTORY_SUCCESS':
      return _objectSpread({}, state, {
        statisticsHistory: [].concat(_toConsumableArray(state.statisticsHistory), _toConsumableArray(payload)),
        loading: false
      });

    case 'FETCH_DELETE_STATISTICS_HISTORY':
      return _objectSpread({}, state, {
        statisticsHistory: [],
        loading: true
      });

    case 'LOADING':
      return _objectSpread({}, state, {
        loading: true
      });

    default:
      return state;
  }
};

var _default = todoReducer;
exports["default"] = _default;