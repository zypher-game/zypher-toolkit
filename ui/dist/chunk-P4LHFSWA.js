"use client";
import {
  __commonJS
} from "./chunk-O3ZY5NC2.js";

// node_modules/clsx/dist/clsx.js
var require_clsx = __commonJS({
  "node_modules/clsx/dist/clsx.js"(exports, module) {
    function e(r2) {
      var o, t, f = "";
      if ("string" == typeof r2 || "number" == typeof r2)
        f += r2;
      else if ("object" == typeof r2)
        if (Array.isArray(r2))
          for (o = 0; o < r2.length; o++)
            r2[o] && (t = e(r2[o])) && (f && (f += " "), f += t);
        else
          for (o in r2)
            r2[o] && (f && (f += " "), f += o);
      return f;
    }
    function r() {
      for (var r2, o, t = 0, f = ""; t < arguments.length; )
        (r2 = arguments[t++]) && (o = e(r2)) && (f && (f += " "), f += o);
      return f;
    }
    module.exports = r, module.exports.clsx = r;
  }
});

export {
  require_clsx
};
