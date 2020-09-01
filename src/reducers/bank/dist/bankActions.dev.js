"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loading = exports.fetchFailure = exports.fetchDeleteStatisticsHistory = exports.fetchStatisticsHistorySuccess = exports.fetchStatisticsHistory = exports.fetchPersonalHistorySuccess = exports.fetchPersonalHistory = exports.fetchPersonalInfoSuccess = exports.fetchPersonalInfo = void 0;

var _Api = _interopRequireDefault(require("../../Services/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// !ACTIONS
// send get req to get all res from db and set it in store
// with that was set in store
var fetchPersonalInfo = function fetchPersonalInfo() {
  return function _callee(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(loading());
            _context.next = 4;
            return regeneratorRuntime.awrap(_Api["default"].getPersonalInfo());

          case 4:
            response = _context.sent.data;
            dispatch(fetchPersonalInfoSuccess(response));
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            dispatch(fetchFailure(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
}; // if a get(get all) req was succeed it would set a res data in store 


exports.fetchPersonalInfo = fetchPersonalInfo;

var fetchPersonalInfoSuccess = function fetchPersonalInfoSuccess(personalInfo) {
  return {
    type: 'FETCH_PERSONAL_INFO_SUCCESS',
    payload: personalInfo
  };
};

exports.fetchPersonalInfoSuccess = fetchPersonalInfoSuccess;

var fetchPersonalHistory = function fetchPersonalHistory(_ref) {
  var from = _ref.from;
  return function _callee2(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch(loading);
            _context2.next = 4;
            return regeneratorRuntime.awrap(_Api["default"].getPersonalHistory({
              from: from
            }));

          case 4:
            response = _context2.sent.data;
            dispatch(fetchPersonalHistorySuccess(response));
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            dispatch(fetchFailure(_context2.t0));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.fetchPersonalHistory = fetchPersonalHistory;

var fetchPersonalHistorySuccess = function fetchPersonalHistorySuccess(personalHistoty) {
  return {
    type: 'FETCH_PERSONAL_HISTORY_SUCCESS',
    payload: personalHistoty
  };
};

exports.fetchPersonalHistorySuccess = fetchPersonalHistorySuccess;

var sleep = function sleep(m) {
  return new Promise(function (r) {
    return setTimeout(r, m);
  });
};

var today = new Date();

var fetchStatisticsHistory = function fetchStatisticsHistory(_ref2) {
  var conutOfStatistics = _ref2.conutOfStatistics;
  return function _callee3(dispatch) {
    var statisticsHistory, to, i, from, response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            dispatch(loading);
            statisticsHistory = [];
            to = 0;
            i = 0;

          case 5:
            if (!(i < conutOfStatistics)) {
              _context3.next = 18;
              break;
            }

            //intersting thing setMonth = that prev Month 
            // and if month<0 = 11  
            from = today.setMonth(today.getMonth(), 0);
            console.log(today.getMonth());
            _context3.next = 10;
            return regeneratorRuntime.awrap(_Api["default"].getPersonalHistory({
              from: from,
              to: to
            }));

          case 10:
            response = _context3.sent.data;
            // currect month - day
            to = from - 86400;
            statisticsHistory.push.apply(statisticsHistory, _toConsumableArray(response));
            _context3.next = 15;
            return regeneratorRuntime.awrap(sleep(100));

          case 15:
            i++;
            _context3.next = 5;
            break;

          case 18:
            console.log(statisticsHistory);
            dispatch(fetchStatisticsHistorySuccess(statisticsHistory));
            _context3.next = 25;
            break;

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](0);
            dispatch(fetchFailure(_context3.t0));

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 22]]);
  };
};

exports.fetchStatisticsHistory = fetchStatisticsHistory;

var fetchStatisticsHistorySuccess = function fetchStatisticsHistorySuccess(itemStatisticsHistoty) {
  return {
    type: 'FETCH_STATISTICS_HISTORY_SUCCESS',
    payload: itemStatisticsHistoty
  };
};

exports.fetchStatisticsHistorySuccess = fetchStatisticsHistorySuccess;

var fetchDeleteStatisticsHistory = function fetchDeleteStatisticsHistory() {
  return {
    type: 'FETCH_DELETE_STATISTICS_HISTORY'
  };
}; // if a ANY of req wasnt succed it would recive a res error and sent in a store


exports.fetchDeleteStatisticsHistory = fetchDeleteStatisticsHistory;

var fetchFailure = function fetchFailure(error) {
  return {
    type: 'FETCH_FAILURE',
    payload: error
  };
}; // call action to set loading 


exports.fetchFailure = fetchFailure;

var loading = function loading() {
  return {
    type: 'LOADING'
  };
};

exports.loading = loading;