!(function(n) {
  var e = {};
  function r(t) {
    if (e[t]) return e[t].exports;
    var o = (e[t] = { i: t, l: !1, exports: {} });
    return n[t].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = n),
    (r.c = e),
    (r.d = function(n, e, t) {
      r.o(n, e) ||
        Object.defineProperty(n, e, {
          configurable: !1,
          enumerable: !0,
          get: t
        });
    }),
    (r.r = function(n) {
      Object.defineProperty(n, "__esModule", { value: !0 });
    }),
    (r.n = function(n) {
      var e =
        n && n.__esModule
          ? function() {
              return n.default;
            }
          : function() {
              return n;
            };
      return r.d(e, "a", e), e;
    }),
    (r.o = function(n, e) {
      return Object.prototype.hasOwnProperty.call(n, e);
    }),
    (r.p = ""),
    r((r.s = "./index.js"));
})({
  "./index.js":
    /*!******************!*\
  !*** ./index.js ***!
  \******************/
    /*! no static exports found */ function(module, exports) {
      eval(
        "const add = (x = 0, y = 0) => {\r\n  x + y;\r\n};\r\n\r\nconst result = add(5, 5);\r\n\r\nconsole.log(result);\r\n\n\n//# sourceURL=webpack:///./index.js?"
      );
    }
});
