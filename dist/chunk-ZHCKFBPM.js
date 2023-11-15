"use client";
import {
  __esm,
  __export
} from "./chunk-O3ZY5NC2.js";

// node_modules/preact/dist/preact.module.js
var preact_module_exports = {};
__export(preact_module_exports, {
  Component: () => b,
  Fragment: () => g,
  cloneElement: () => E,
  createContext: () => F,
  createElement: () => y,
  createRef: () => _,
  h: () => y,
  hydrate: () => B,
  isValidElement: () => t,
  options: () => l,
  render: () => q,
  toChildArray: () => $
});
function v(n2, l3) {
  for (var u3 in l3)
    n2[u3] = l3[u3];
  return n2;
}
function p(n2) {
  var l3 = n2.parentNode;
  l3 && l3.removeChild(n2);
}
function y(l3, u3, t3) {
  var i3, o3, r3, f3 = {};
  for (r3 in u3)
    "key" == r3 ? i3 = u3[r3] : "ref" == r3 ? o3 = u3[r3] : f3[r3] = u3[r3];
  if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps)
    for (r3 in l3.defaultProps)
      void 0 === f3[r3] && (f3[r3] = l3.defaultProps[r3]);
  return d(l3, f3, i3, o3, null);
}
function d(n2, t3, i3, o3, r3) {
  var f3 = { type: n2, props: t3, key: i3, ref: o3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r3 ? ++u : r3, __i: -1, __u: 0 };
  return null == r3 && null != l.vnode && l.vnode(f3), f3;
}
function _() {
  return { current: null };
}
function g(n2) {
  return n2.children;
}
function b(n2, l3) {
  this.props = n2, this.context = l3;
}
function m(n2, l3) {
  if (null == l3)
    return n2.__ ? m(n2.__, n2.__i + 1) : null;
  for (var u3; l3 < n2.__k.length; l3++)
    if (null != (u3 = n2.__k[l3]) && null != u3.__e)
      return u3.__e;
  return "function" == typeof n2.type ? m(n2) : null;
}
function k(n2) {
  var l3, u3;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
      if (null != (u3 = n2.__k[l3]) && null != u3.__e) {
        n2.__e = n2.__c.base = u3.__e;
        break;
      }
    return k(n2);
  }
}
function w(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
}
function x() {
  var n2, l3, u3, t3, o3, r3, e3, c3, s3;
  for (i.sort(f); n2 = i.shift(); )
    n2.__d && (l3 = i.length, t3 = void 0, r3 = (o3 = (u3 = n2).__v).__e, c3 = [], s3 = [], (e3 = u3.__P) && ((t3 = v({}, o3)).__v = o3.__v + 1, L(e3, t3, o3, u3.__n, void 0 !== e3.ownerSVGElement, 32 & o3.__u ? [r3] : null, c3, null == r3 ? m(o3) : r3, !!(32 & o3.__u), s3), t3.__.__k[t3.__i] = t3, M(c3, t3, s3), t3.__e != r3 && k(t3)), i.length > l3 && i.sort(f));
  x.__r = 0;
}
function C(n2, l3, u3, t3, i3, o3, r3, f3, e3, a3, h3) {
  var v3, p3, y3, d3, _3, g3 = t3 && t3.__k || s, b3 = l3.length;
  for (u3.__d = e3, P(u3, l3, g3), e3 = u3.__d, v3 = 0; v3 < b3; v3++)
    null != (y3 = u3.__k[v3]) && "boolean" != typeof y3 && "function" != typeof y3 && (p3 = -1 === y3.__i ? c : g3[y3.__i] || c, y3.__i = v3, L(n2, y3, p3, i3, o3, r3, f3, e3, a3, h3), d3 = y3.__e, y3.ref && p3.ref != y3.ref && (p3.ref && z(p3.ref, null, y3), h3.push(y3.ref, y3.__c || d3, y3)), null == _3 && null != d3 && (_3 = d3), 65536 & y3.__u || p3.__k === y3.__k ? e3 = S(y3, e3, n2) : "function" == typeof y3.type && void 0 !== y3.__d ? e3 = y3.__d : d3 && (e3 = d3.nextSibling), y3.__d = void 0, y3.__u &= -196609);
  u3.__d = e3, u3.__e = _3;
}
function P(n2, l3, u3) {
  var t3, i3, o3, r3, f3, e3 = l3.length, c3 = u3.length, s3 = c3, a3 = 0;
  for (n2.__k = [], t3 = 0; t3 < e3; t3++)
    null != (i3 = n2.__k[t3] = null == (i3 = l3[t3]) || "boolean" == typeof i3 || "function" == typeof i3 ? null : "string" == typeof i3 || "number" == typeof i3 || "bigint" == typeof i3 || i3.constructor == String ? d(null, i3, null, null, i3) : h(i3) ? d(g, { children: i3 }, null, null, null) : i3.__b > 0 ? d(i3.type, i3.props, i3.key, i3.ref ? i3.ref : null, i3.__v) : i3) ? (i3.__ = n2, i3.__b = n2.__b + 1, f3 = H(i3, u3, r3 = t3 + a3, s3), i3.__i = f3, o3 = null, -1 !== f3 && (s3--, (o3 = u3[f3]) && (o3.__u |= 131072)), null == o3 || null === o3.__v ? (-1 == f3 && a3--, "function" != typeof i3.type && (i3.__u |= 65536)) : f3 !== r3 && (f3 === r3 + 1 ? a3++ : f3 > r3 ? s3 > e3 - r3 ? a3 += f3 - r3 : a3-- : a3 = f3 < r3 && f3 == r3 - 1 ? f3 - r3 : 0, f3 !== t3 + a3 && (i3.__u |= 65536))) : (o3 = u3[t3]) && null == o3.key && o3.__e && (o3.__e == n2.__d && (n2.__d = m(o3)), N(o3, o3, false), u3[t3] = null, s3--);
  if (s3)
    for (t3 = 0; t3 < c3; t3++)
      null != (o3 = u3[t3]) && 0 == (131072 & o3.__u) && (o3.__e == n2.__d && (n2.__d = m(o3)), N(o3, o3));
}
function S(n2, l3, u3) {
  var t3, i3;
  if ("function" == typeof n2.type) {
    for (t3 = n2.__k, i3 = 0; t3 && i3 < t3.length; i3++)
      t3[i3] && (t3[i3].__ = n2, l3 = S(t3[i3], l3, u3));
    return l3;
  }
  return n2.__e != l3 && (u3.insertBefore(n2.__e, l3 || null), l3 = n2.__e), l3 && l3.nextSibling;
}
function $(n2, l3) {
  return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (h(n2) ? n2.some(function(n3) {
    $(n3, l3);
  }) : l3.push(n2)), l3;
}
function H(n2, l3, u3, t3) {
  var i3 = n2.key, o3 = n2.type, r3 = u3 - 1, f3 = u3 + 1, e3 = l3[u3];
  if (null === e3 || e3 && i3 == e3.key && o3 === e3.type)
    return u3;
  if (t3 > (null != e3 && 0 == (131072 & e3.__u) ? 1 : 0))
    for (; r3 >= 0 || f3 < l3.length; ) {
      if (r3 >= 0) {
        if ((e3 = l3[r3]) && 0 == (131072 & e3.__u) && i3 == e3.key && o3 === e3.type)
          return r3;
        r3--;
      }
      if (f3 < l3.length) {
        if ((e3 = l3[f3]) && 0 == (131072 & e3.__u) && i3 == e3.key && o3 === e3.type)
          return f3;
        f3++;
      }
    }
  return -1;
}
function I(n2, l3, u3) {
  "-" === l3[0] ? n2.setProperty(l3, null == u3 ? "" : u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || a.test(l3) ? u3 : u3 + "px";
}
function T(n2, l3, u3, t3, i3) {
  var o3;
  n:
    if ("style" === l3)
      if ("string" == typeof u3)
        n2.style.cssText = u3;
      else {
        if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3)
          for (l3 in t3)
            u3 && l3 in u3 || I(n2.style, l3, "");
        if (u3)
          for (l3 in u3)
            t3 && u3[l3] === t3[l3] || I(n2.style, l3, u3[l3]);
      }
    else if ("o" === l3[0] && "n" === l3[1])
      o3 = l3 !== (l3 = l3.replace(/(PointerCapture)$|Capture$/, "$1")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u3, u3 ? t3 ? u3.u = t3.u : (u3.u = Date.now(), n2.addEventListener(l3, o3 ? D : A, o3)) : n2.removeEventListener(l3, o3 ? D : A, o3);
    else {
      if (i3)
        l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" !== l3 && "height" !== l3 && "href" !== l3 && "list" !== l3 && "form" !== l3 && "tabIndex" !== l3 && "download" !== l3 && "rowSpan" !== l3 && "colSpan" !== l3 && "role" !== l3 && l3 in n2)
        try {
          n2[l3] = null == u3 ? "" : u3;
          break n;
        } catch (n3) {
        }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" !== l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, u3));
    }
}
function A(n2) {
  var u3 = this.l[n2.type + false];
  if (n2.t) {
    if (n2.t <= u3.u)
      return;
  } else
    n2.t = Date.now();
  return u3(l.event ? l.event(n2) : n2);
}
function D(n2) {
  return this.l[n2.type + true](l.event ? l.event(n2) : n2);
}
function L(n2, u3, t3, i3, o3, r3, f3, e3, c3, s3) {
  var a3, p3, y3, d3, _3, m3, k3, w3, x3, P3, S2, $2, H2, I2, T3, A3 = u3.type;
  if (void 0 !== u3.constructor)
    return null;
  128 & t3.__u && (c3 = !!(32 & t3.__u), r3 = [e3 = u3.__e = t3.__e]), (a3 = l.__b) && a3(u3);
  n:
    if ("function" == typeof A3)
      try {
        if (w3 = u3.props, x3 = (a3 = A3.contextType) && i3[a3.__c], P3 = a3 ? x3 ? x3.props.value : a3.__ : i3, t3.__c ? k3 = (p3 = u3.__c = t3.__c).__ = p3.__E : ("prototype" in A3 && A3.prototype.render ? u3.__c = p3 = new A3(w3, P3) : (u3.__c = p3 = new b(w3, P3), p3.constructor = A3, p3.render = O), x3 && x3.sub(p3), p3.props = w3, p3.state || (p3.state = {}), p3.context = P3, p3.__n = i3, y3 = p3.__d = true, p3.__h = [], p3._sb = []), null == p3.__s && (p3.__s = p3.state), null != A3.getDerivedStateFromProps && (p3.__s == p3.state && (p3.__s = v({}, p3.__s)), v(p3.__s, A3.getDerivedStateFromProps(w3, p3.__s))), d3 = p3.props, _3 = p3.state, p3.__v = u3, y3)
          null == A3.getDerivedStateFromProps && null != p3.componentWillMount && p3.componentWillMount(), null != p3.componentDidMount && p3.__h.push(p3.componentDidMount);
        else {
          if (null == A3.getDerivedStateFromProps && w3 !== d3 && null != p3.componentWillReceiveProps && p3.componentWillReceiveProps(w3, P3), !p3.__e && (null != p3.shouldComponentUpdate && false === p3.shouldComponentUpdate(w3, p3.__s, P3) || u3.__v === t3.__v)) {
            for (u3.__v !== t3.__v && (p3.props = w3, p3.state = p3.__s, p3.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.forEach(function(n3) {
              n3 && (n3.__ = u3);
            }), S2 = 0; S2 < p3._sb.length; S2++)
              p3.__h.push(p3._sb[S2]);
            p3._sb = [], p3.__h.length && f3.push(p3);
            break n;
          }
          null != p3.componentWillUpdate && p3.componentWillUpdate(w3, p3.__s, P3), null != p3.componentDidUpdate && p3.__h.push(function() {
            p3.componentDidUpdate(d3, _3, m3);
          });
        }
        if (p3.context = P3, p3.props = w3, p3.__P = n2, p3.__e = false, $2 = l.__r, H2 = 0, "prototype" in A3 && A3.prototype.render) {
          for (p3.state = p3.__s, p3.__d = false, $2 && $2(u3), a3 = p3.render(p3.props, p3.state, p3.context), I2 = 0; I2 < p3._sb.length; I2++)
            p3.__h.push(p3._sb[I2]);
          p3._sb = [];
        } else
          do {
            p3.__d = false, $2 && $2(u3), a3 = p3.render(p3.props, p3.state, p3.context), p3.state = p3.__s;
          } while (p3.__d && ++H2 < 25);
        p3.state = p3.__s, null != p3.getChildContext && (i3 = v(v({}, i3), p3.getChildContext())), y3 || null == p3.getSnapshotBeforeUpdate || (m3 = p3.getSnapshotBeforeUpdate(d3, _3)), C(n2, h(T3 = null != a3 && a3.type === g && null == a3.key ? a3.props.children : a3) ? T3 : [T3], u3, t3, i3, o3, r3, f3, e3, c3, s3), p3.base = u3.__e, u3.__u &= -161, p3.__h.length && f3.push(p3), k3 && (p3.__E = p3.__ = null);
      } catch (n3) {
        u3.__v = null, c3 || null != r3 ? (u3.__e = e3, u3.__u |= c3 ? 160 : 32, r3[r3.indexOf(e3)] = null) : (u3.__e = t3.__e, u3.__k = t3.__k), l.__e(n3, u3, t3);
      }
    else
      null == r3 && u3.__v === t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : u3.__e = j(t3.__e, u3, t3, i3, o3, r3, f3, c3, s3);
  (a3 = l.diffed) && a3(u3);
}
function M(n2, u3, t3) {
  u3.__d = void 0;
  for (var i3 = 0; i3 < t3.length; i3++)
    z(t3[i3], t3[++i3], t3[++i3]);
  l.__c && l.__c(u3, n2), n2.some(function(u4) {
    try {
      n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
        n3.call(u4);
      });
    } catch (n3) {
      l.__e(n3, u4.__v);
    }
  });
}
function j(l3, u3, t3, i3, o3, r3, f3, e3, s3) {
  var a3, v3, y3, d3, _3, g3, b3, k3 = t3.props, w3 = u3.props, x3 = u3.type;
  if ("svg" === x3 && (o3 = true), null != r3) {
    for (a3 = 0; a3 < r3.length; a3++)
      if ((_3 = r3[a3]) && "setAttribute" in _3 == !!x3 && (x3 ? _3.localName === x3 : 3 === _3.nodeType)) {
        l3 = _3, r3[a3] = null;
        break;
      }
  }
  if (null == l3) {
    if (null === x3)
      return document.createTextNode(w3);
    l3 = o3 ? document.createElementNS("http://www.w3.org/2000/svg", x3) : document.createElement(x3, w3.is && w3), r3 = null, e3 = false;
  }
  if (null === x3)
    k3 === w3 || e3 && l3.data === w3 || (l3.data = w3);
  else {
    if (r3 = r3 && n.call(l3.childNodes), k3 = t3.props || c, !e3 && null != r3)
      for (k3 = {}, a3 = 0; a3 < l3.attributes.length; a3++)
        k3[(_3 = l3.attributes[a3]).name] = _3.value;
    for (a3 in k3)
      _3 = k3[a3], "children" == a3 || ("dangerouslySetInnerHTML" == a3 ? y3 = _3 : "key" === a3 || a3 in w3 || T(l3, a3, null, _3, o3));
    for (a3 in w3)
      _3 = w3[a3], "children" == a3 ? d3 = _3 : "dangerouslySetInnerHTML" == a3 ? v3 = _3 : "value" == a3 ? g3 = _3 : "checked" == a3 ? b3 = _3 : "key" === a3 || e3 && "function" != typeof _3 || k3[a3] === _3 || T(l3, a3, _3, k3[a3], o3);
    if (v3)
      e3 || y3 && (v3.__html === y3.__html || v3.__html === l3.innerHTML) || (l3.innerHTML = v3.__html), u3.__k = [];
    else if (y3 && (l3.innerHTML = ""), C(l3, h(d3) ? d3 : [d3], u3, t3, i3, o3 && "foreignObject" !== x3, r3, f3, r3 ? r3[0] : t3.__k && m(t3, 0), e3, s3), null != r3)
      for (a3 = r3.length; a3--; )
        null != r3[a3] && p(r3[a3]);
    e3 || (a3 = "value", void 0 !== g3 && (g3 !== l3[a3] || "progress" === x3 && !g3 || "option" === x3 && g3 !== k3[a3]) && T(l3, a3, g3, k3[a3], false), a3 = "checked", void 0 !== b3 && b3 !== l3[a3] && T(l3, a3, b3, k3[a3], false));
  }
  return l3;
}
function z(n2, u3, t3) {
  try {
    "function" == typeof n2 ? n2(u3) : n2.current = u3;
  } catch (n3) {
    l.__e(n3, t3);
  }
}
function N(n2, u3, t3) {
  var i3, o3;
  if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current !== n2.__e || z(i3, null, u3)), null != (i3 = n2.__c)) {
    if (i3.componentWillUnmount)
      try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
    i3.base = i3.__P = null, n2.__c = void 0;
  }
  if (i3 = n2.__k)
    for (o3 = 0; o3 < i3.length; o3++)
      i3[o3] && N(i3[o3], u3, t3 || "function" != typeof n2.type);
  t3 || null == n2.__e || p(n2.__e), n2.__ = n2.__e = n2.__d = void 0;
}
function O(n2, l3, u3) {
  return this.constructor(n2, u3);
}
function q(u3, t3, i3) {
  var o3, r3, f3, e3;
  l.__ && l.__(u3, t3), r3 = (o3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, f3 = [], e3 = [], L(t3, u3 = (!o3 && i3 || t3).__k = y(g, null, [u3]), r3 || c, c, void 0 !== t3.ownerSVGElement, !o3 && i3 ? [i3] : r3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, f3, !o3 && i3 ? i3 : r3 ? r3.__e : t3.firstChild, o3, e3), M(f3, u3, e3);
}
function B(n2, l3) {
  q(n2, l3, B);
}
function E(l3, u3, t3) {
  var i3, o3, r3, f3, e3 = v({}, l3.props);
  for (r3 in l3.type && l3.type.defaultProps && (f3 = l3.type.defaultProps), u3)
    "key" == r3 ? i3 = u3[r3] : "ref" == r3 ? o3 = u3[r3] : e3[r3] = void 0 === u3[r3] && void 0 !== f3 ? f3[r3] : u3[r3];
  return arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), d(l3.type, e3, i3 || l3.key, o3 || l3.ref, null);
}
function F(n2, l3) {
  var u3 = { __c: l3 = "__cC" + e++, __: n2, Consumer: function(n3, l4) {
    return n3.children(l4);
  }, Provider: function(n3) {
    var u4, t3;
    return this.getChildContext || (u4 = [], (t3 = {})[l3] = this, this.getChildContext = function() {
      return t3;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value !== n4.value && u4.some(function(n5) {
        n5.__e = true, w(n5);
      });
    }, this.sub = function(n4) {
      u4.push(n4);
      var l4 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u4.splice(u4.indexOf(n4), 1), l4 && l4.call(n4);
      };
    }), n3.children;
  } };
  return u3.Provider.__ = u3.Consumer.contextType = u3;
}
var n, l, u, t, i, o, r, f, e, c, s, a, h;
var init_preact_module = __esm({
  "node_modules/preact/dist/preact.module.js"() {
    c = {};
    s = [];
    a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    h = Array.isArray;
    n = s.slice, l = { __e: function(n2, l3, u3, t3) {
      for (var i3, o3, r3; l3 = l3.__; )
        if ((i3 = l3.__c) && !i3.__)
          try {
            if ((o3 = i3.constructor) && null != o3.getDerivedStateFromError && (i3.setState(o3.getDerivedStateFromError(n2)), r3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), r3 = i3.__d), r3)
              return i3.__E = i3;
          } catch (l4) {
            n2 = l4;
          }
      throw n2;
    } }, u = 0, t = function(n2) {
      return null != n2 && null == n2.constructor;
    }, b.prototype.setState = function(n2, l3) {
      var u3;
      u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = v({}, this.state), "function" == typeof n2 && (n2 = n2(v({}, u3), this.props)), n2 && v(u3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), w(this));
    }, b.prototype.forceUpdate = function(n2) {
      this.__v && (this.__e = true, n2 && this.__h.push(n2), w(this));
    }, b.prototype.render = g, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l3) {
      return n2.__v.__b - l3.__v.__b;
    }, x.__r = 0, e = 0;
  }
});

// node_modules/preact/hooks/dist/hooks.module.js
var hooks_module_exports = {};
__export(hooks_module_exports, {
  useCallback: () => T2,
  useContext: () => q2,
  useDebugValue: () => x2,
  useEffect: () => p2,
  useErrorBoundary: () => P2,
  useId: () => V,
  useImperativeHandle: () => A2,
  useLayoutEffect: () => y2,
  useMemo: () => F2,
  useReducer: () => s2,
  useRef: () => _2,
  useState: () => h2
});
function d2(t3, u3) {
  l.__h && l.__h(r2, t3, o2 || u3), o2 = 0;
  var i3 = r2.__H || (r2.__H = { __: [], __h: [] });
  return t3 >= i3.__.length && i3.__.push({ __V: c2 }), i3.__[t3];
}
function h2(n2) {
  return o2 = 1, s2(B2, n2);
}
function s2(n2, u3, i3) {
  var o3 = d2(t2++, 2);
  if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u3) : B2(void 0, u3), function(n3) {
    var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
    t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
  }], o3.__c = r2, !r2.u)) {
    var f3 = function(n3, t3, r3) {
      if (!o3.__c.__H)
        return true;
      var u4 = o3.__c.__H.__.filter(function(n4) {
        return n4.__c;
      });
      if (u4.every(function(n4) {
        return !n4.__N;
      }))
        return !c3 || c3.call(this, n3, t3, r3);
      var i4 = false;
      return u4.forEach(function(n4) {
        if (n4.__N) {
          var t4 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
        }
      }), !(!i4 && o3.__c.props === n3) && (!c3 || c3.call(this, n3, t3, r3));
    };
    r2.u = true;
    var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
    r2.componentWillUpdate = function(n3, t3, r3) {
      if (this.__e) {
        var u4 = c3;
        c3 = void 0, f3(n3, t3, r3), c3 = u4;
      }
      e3 && e3.call(this, n3, t3, r3);
    }, r2.shouldComponentUpdate = f3;
  }
  return o3.__N || o3.__;
}
function p2(u3, i3) {
  var o3 = d2(t2++, 3);
  !l.__s && z2(o3.__H, i3) && (o3.__ = u3, o3.i = i3, r2.__H.__h.push(o3));
}
function y2(u3, i3) {
  var o3 = d2(t2++, 4);
  !l.__s && z2(o3.__H, i3) && (o3.__ = u3, o3.i = i3, r2.__h.push(o3));
}
function _2(n2) {
  return o2 = 5, F2(function() {
    return { current: n2 };
  }, []);
}
function A2(n2, t3, r3) {
  o2 = 6, y2(function() {
    return "function" == typeof n2 ? (n2(t3()), function() {
      return n2(null);
    }) : n2 ? (n2.current = t3(), function() {
      return n2.current = null;
    }) : void 0;
  }, null == r3 ? r3 : r3.concat(n2));
}
function F2(n2, r3) {
  var u3 = d2(t2++, 7);
  return z2(u3.__H, r3) ? (u3.__V = n2(), u3.i = r3, u3.__h = n2, u3.__V) : u3.__;
}
function T2(n2, t3) {
  return o2 = 8, F2(function() {
    return n2;
  }, t3);
}
function q2(n2) {
  var u3 = r2.context[n2.__c], i3 = d2(t2++, 9);
  return i3.c = n2, u3 ? (null == i3.__ && (i3.__ = true, u3.sub(r2)), u3.props.value) : n2.__;
}
function x2(t3, r3) {
  l.useDebugValue && l.useDebugValue(r3 ? r3(t3) : t3);
}
function P2(n2) {
  var u3 = d2(t2++, 10), i3 = h2();
  return u3.__ = n2, r2.componentDidCatch || (r2.componentDidCatch = function(n3, t3) {
    u3.__ && u3.__(n3, t3), i3[1](n3);
  }), [i3[0], function() {
    i3[1](void 0);
  }];
}
function V() {
  var n2 = d2(t2++, 11);
  if (!n2.__) {
    for (var u3 = r2.__v; null !== u3 && !u3.__m && null !== u3.__; )
      u3 = u3.__;
    var i3 = u3.__m || (u3.__m = [0, 0]);
    n2.__ = "P" + i3[0] + "-" + i3[1]++;
  }
  return n2.__;
}
function b2() {
  for (var t3; t3 = f2.shift(); )
    if (t3.__P && t3.__H)
      try {
        t3.__H.__h.forEach(k2), t3.__H.__h.forEach(w2), t3.__H.__h = [];
      } catch (r3) {
        t3.__H.__h = [], l.__e(r3, t3.__v);
      }
}
function j2(n2) {
  var t3, r3 = function() {
    clearTimeout(u3), g2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u3 = setTimeout(r3, 100);
  g2 && (t3 = requestAnimationFrame(r3));
}
function k2(n2) {
  var t3 = r2, u3 = n2.__c;
  "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
}
function w2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function z2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n2[r3];
  });
}
function B2(n2, t3) {
  return "function" == typeof t3 ? t3(n2) : t3;
}
var t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, g2;
var init_hooks_module = __esm({
  "node_modules/preact/hooks/dist/hooks.module.js"() {
    init_preact_module();
    o2 = 0;
    f2 = [];
    c2 = [];
    e2 = l.__b;
    a2 = l.__r;
    v2 = l.diffed;
    l2 = l.__c;
    m2 = l.unmount;
    l.__b = function(n2) {
      r2 = null, e2 && e2(n2);
    }, l.__r = function(n2) {
      a2 && a2(n2), t2 = 0;
      var i3 = (r2 = n2.__c).__H;
      i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
        n3.__N && (n3.__ = n3.__N), n3.__V = c2, n3.__N = n3.i = void 0;
      })) : (i3.__h.forEach(k2), i3.__h.forEach(w2), i3.__h = [], t2 = 0)), u2 = r2;
    }, l.diffed = function(t3) {
      v2 && v2(t3);
      var o3 = t3.__c;
      o3 && o3.__H && (o3.__H.__h.length && (1 !== f2.push(o3) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || j2)(b2)), o3.__H.__.forEach(function(n2) {
        n2.i && (n2.__H = n2.i), n2.__V !== c2 && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c2;
      })), u2 = r2 = null;
    }, l.__c = function(t3, r3) {
      r3.some(function(t4) {
        try {
          t4.__h.forEach(k2), t4.__h = t4.__h.filter(function(n2) {
            return !n2.__ || w2(n2);
          });
        } catch (u3) {
          r3.some(function(n2) {
            n2.__h && (n2.__h = []);
          }), r3 = [], l.__e(u3, t4.__v);
        }
      }), l2 && l2(t3, r3);
    }, l.unmount = function(t3) {
      m2 && m2(t3);
      var r3, u3 = t3.__c;
      u3 && u3.__H && (u3.__H.__.forEach(function(n2) {
        try {
          k2(n2);
        } catch (n3) {
          r3 = n3;
        }
      }), u3.__H = void 0, r3 && l.__e(r3, u3.__v));
    };
    g2 = "function" == typeof requestAnimationFrame;
  }
});

export {
  l,
  y,
  _,
  g,
  b,
  $,
  q,
  B,
  E,
  F,
  preact_module_exports,
  init_preact_module,
  h2 as h,
  s2 as s,
  p2 as p,
  y2,
  _2,
  A2 as A,
  F2,
  T2 as T,
  q2,
  x2 as x,
  P2 as P,
  V,
  hooks_module_exports,
  init_hooks_module
};
