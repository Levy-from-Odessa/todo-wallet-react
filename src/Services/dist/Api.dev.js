"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Api = function Api() {
  return _axios["default"].create({
    baseURL: "https://api.monobank.ua/personal",
    mode: 'no-cors',
    crossDomain: true,
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9,ru;q=0.8",
      "Content-Type": 'text/plain'
    }
  });
};

var _default = {
  // make req with params
  getPersonalInfo: function getPersonalInfo() {
    return Api().get("client-info", {
      headers: {
        'X-Token': 'uc__xL08Oo1Oe591O1FfsGn1-Hgi2jCAAFU9E4hI8Grg'
      }
    });
  },
  getPersonalHistory: function getPersonalHistory(_ref) {
    var from = _ref.from,
        to = _ref.to;
    return Api().get("statement/0/".concat(from).concat(to ? "/".concat(to) : ''), {
      headers: {
        'X-Token': 'uc__xL08Oo1Oe591O1FfsGn1-Hgi2jCAAFU9E4hI8Grg'
      }
    });
  }
};
exports["default"] = _default;