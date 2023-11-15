"use client";
import {
  R,
  T,
  a,
  init_dist,
  ne,
  oe,
  p,
  se,
  te,
  y
} from "./chunk-DXYZCUDT.js";
import {
  require_browser
} from "./chunk-GCUBIKOR.js";
import {
  __esm,
  __toESM
} from "./chunk-O3ZY5NC2.js";

// node_modules/@lit/reactive-element/css-tag.js
var t, e, s, n, o, r, i, S, c;
var init_css_tag = __esm({
  "node_modules/@lit/reactive-element/css-tag.js"() {
    t = window;
    e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    s = Symbol();
    n = /* @__PURE__ */ new WeakMap();
    o = class {
      constructor(t5, e8, n7) {
        if (this._$cssResult$ = true, n7 !== s)
          throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t5, this.t = e8;
      }
      get styleSheet() {
        let t5 = this.o;
        const s5 = this.t;
        if (e && void 0 === t5) {
          const e8 = void 0 !== s5 && 1 === s5.length;
          e8 && (t5 = n.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && n.set(s5, t5));
        }
        return t5;
      }
      toString() {
        return this.cssText;
      }
    };
    r = (t5) => new o("string" == typeof t5 ? t5 : t5 + "", void 0, s);
    i = (t5, ...e8) => {
      const n7 = 1 === t5.length ? t5[0] : e8.reduce((e9, s5, n8) => e9 + ((t6) => {
        if (true === t6._$cssResult$)
          return t6.cssText;
        if ("number" == typeof t6)
          return t6;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s5) + t5[n8 + 1], t5[0]);
      return new o(n7, t5, s);
    };
    S = (s5, n7) => {
      e ? s5.adoptedStyleSheets = n7.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet) : n7.forEach((e8) => {
        const n8 = document.createElement("style"), o7 = t.litNonce;
        void 0 !== o7 && n8.setAttribute("nonce", o7), n8.textContent = e8.cssText, s5.appendChild(n8);
      });
    };
    c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
      let e8 = "";
      for (const s5 of t6.cssRules)
        e8 += s5.cssText;
      return r(e8);
    })(t5) : t5;
  }
});

// node_modules/@lit/reactive-element/reactive-element.js
var s2, e2, r2, h, o2, n2, a2, l, d, u;
var init_reactive_element = __esm({
  "node_modules/@lit/reactive-element/reactive-element.js"() {
    init_css_tag();
    init_css_tag();
    e2 = window;
    r2 = e2.trustedTypes;
    h = r2 ? r2.emptyScript : "";
    o2 = e2.reactiveElementPolyfillSupport;
    n2 = { toAttribute(t5, i5) {
      switch (i5) {
        case Boolean:
          t5 = t5 ? h : null;
          break;
        case Object:
        case Array:
          t5 = null == t5 ? t5 : JSON.stringify(t5);
      }
      return t5;
    }, fromAttribute(t5, i5) {
      let s5 = t5;
      switch (i5) {
        case Boolean:
          s5 = null !== t5;
          break;
        case Number:
          s5 = null === t5 ? null : Number(t5);
          break;
        case Object:
        case Array:
          try {
            s5 = JSON.parse(t5);
          } catch (t6) {
            s5 = null;
          }
      }
      return s5;
    } };
    a2 = (t5, i5) => i5 !== t5 && (i5 == i5 || t5 == t5);
    l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a2 };
    d = "finalized";
    u = class extends HTMLElement {
      constructor() {
        super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
      }
      static addInitializer(t5) {
        var i5;
        this.finalize(), (null !== (i5 = this.h) && void 0 !== i5 ? i5 : this.h = []).push(t5);
      }
      static get observedAttributes() {
        this.finalize();
        const t5 = [];
        return this.elementProperties.forEach((i5, s5) => {
          const e8 = this._$Ep(s5, i5);
          void 0 !== e8 && (this._$Ev.set(e8, s5), t5.push(e8));
        }), t5;
      }
      static createProperty(t5, i5 = l) {
        if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t5, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t5)) {
          const s5 = "symbol" == typeof t5 ? Symbol() : "__" + t5, e8 = this.getPropertyDescriptor(t5, s5, i5);
          void 0 !== e8 && Object.defineProperty(this.prototype, t5, e8);
        }
      }
      static getPropertyDescriptor(t5, i5, s5) {
        return { get() {
          return this[i5];
        }, set(e8) {
          const r4 = this[t5];
          this[i5] = e8, this.requestUpdate(t5, r4, s5);
        }, configurable: true, enumerable: true };
      }
      static getPropertyOptions(t5) {
        return this.elementProperties.get(t5) || l;
      }
      static finalize() {
        if (this.hasOwnProperty(d))
          return false;
        this[d] = true;
        const t5 = Object.getPrototypeOf(this);
        if (t5.finalize(), void 0 !== t5.h && (this.h = [...t5.h]), this.elementProperties = new Map(t5.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
          const t6 = this.properties, i5 = [...Object.getOwnPropertyNames(t6), ...Object.getOwnPropertySymbols(t6)];
          for (const s5 of i5)
            this.createProperty(s5, t6[s5]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), true;
      }
      static finalizeStyles(i5) {
        const s5 = [];
        if (Array.isArray(i5)) {
          const e8 = new Set(i5.flat(1 / 0).reverse());
          for (const i6 of e8)
            s5.unshift(c(i6));
        } else
          void 0 !== i5 && s5.push(c(i5));
        return s5;
      }
      static _$Ep(t5, i5) {
        const s5 = i5.attribute;
        return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
      }
      _$Eu() {
        var t5;
        this._$E_ = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t5 = this.constructor.h) || void 0 === t5 || t5.forEach((t6) => t6(this));
      }
      addController(t5) {
        var i5, s5;
        (null !== (i5 = this._$ES) && void 0 !== i5 ? i5 : this._$ES = []).push(t5), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t5.hostConnected) || void 0 === s5 || s5.call(t5));
      }
      removeController(t5) {
        var i5;
        null === (i5 = this._$ES) || void 0 === i5 || i5.splice(this._$ES.indexOf(t5) >>> 0, 1);
      }
      _$Eg() {
        this.constructor.elementProperties.forEach((t5, i5) => {
          this.hasOwnProperty(i5) && (this._$Ei.set(i5, this[i5]), delete this[i5]);
        });
      }
      createRenderRoot() {
        var t5;
        const s5 = null !== (t5 = this.shadowRoot) && void 0 !== t5 ? t5 : this.attachShadow(this.constructor.shadowRootOptions);
        return S(s5, this.constructor.elementStyles), s5;
      }
      connectedCallback() {
        var t5;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
          var i5;
          return null === (i5 = t6.hostConnected) || void 0 === i5 ? void 0 : i5.call(t6);
        });
      }
      enableUpdating(t5) {
      }
      disconnectedCallback() {
        var t5;
        null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
          var i5;
          return null === (i5 = t6.hostDisconnected) || void 0 === i5 ? void 0 : i5.call(t6);
        });
      }
      attributeChangedCallback(t5, i5, s5) {
        this._$AK(t5, s5);
      }
      _$EO(t5, i5, s5 = l) {
        var e8;
        const r4 = this.constructor._$Ep(t5, s5);
        if (void 0 !== r4 && true === s5.reflect) {
          const h4 = (void 0 !== (null === (e8 = s5.converter) || void 0 === e8 ? void 0 : e8.toAttribute) ? s5.converter : n2).toAttribute(i5, s5.type);
          this._$El = t5, null == h4 ? this.removeAttribute(r4) : this.setAttribute(r4, h4), this._$El = null;
        }
      }
      _$AK(t5, i5) {
        var s5;
        const e8 = this.constructor, r4 = e8._$Ev.get(t5);
        if (void 0 !== r4 && this._$El !== r4) {
          const t6 = e8.getPropertyOptions(r4), h4 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== (null === (s5 = t6.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t6.converter : n2;
          this._$El = r4, this[r4] = h4.fromAttribute(i5, t6.type), this._$El = null;
        }
      }
      requestUpdate(t5, i5, s5) {
        let e8 = true;
        void 0 !== t5 && (((s5 = s5 || this.constructor.getPropertyOptions(t5)).hasChanged || a2)(this[t5], i5) ? (this._$AL.has(t5) || this._$AL.set(t5, i5), true === s5.reflect && this._$El !== t5 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t5, s5))) : e8 = false), !this.isUpdatePending && e8 && (this._$E_ = this._$Ej());
      }
      async _$Ej() {
        this.isUpdatePending = true;
        try {
          await this._$E_;
        } catch (t6) {
          Promise.reject(t6);
        }
        const t5 = this.scheduleUpdate();
        return null != t5 && await t5, !this.isUpdatePending;
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        var t5;
        if (!this.isUpdatePending)
          return;
        this.hasUpdated, this._$Ei && (this._$Ei.forEach((t6, i6) => this[i6] = t6), this._$Ei = void 0);
        let i5 = false;
        const s5 = this._$AL;
        try {
          i5 = this.shouldUpdate(s5), i5 ? (this.willUpdate(s5), null === (t5 = this._$ES) || void 0 === t5 || t5.forEach((t6) => {
            var i6;
            return null === (i6 = t6.hostUpdate) || void 0 === i6 ? void 0 : i6.call(t6);
          }), this.update(s5)) : this._$Ek();
        } catch (t6) {
          throw i5 = false, this._$Ek(), t6;
        }
        i5 && this._$AE(s5);
      }
      willUpdate(t5) {
      }
      _$AE(t5) {
        var i5;
        null === (i5 = this._$ES) || void 0 === i5 || i5.forEach((t6) => {
          var i6;
          return null === (i6 = t6.hostUpdated) || void 0 === i6 ? void 0 : i6.call(t6);
        }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
      }
      _$Ek() {
        this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this._$E_;
      }
      shouldUpdate(t5) {
        return true;
      }
      update(t5) {
        void 0 !== this._$EC && (this._$EC.forEach((t6, i5) => this._$EO(i5, this[i5], t6)), this._$EC = void 0), this._$Ek();
      }
      updated(t5) {
      }
      firstUpdated(t5) {
      }
    };
    u[d] = true, u.elementProperties = /* @__PURE__ */ new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: u }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.3");
  }
});

// node_modules/lit-html/lit-html.js
function P(t5, i5) {
  if (!Array.isArray(t5) || !t5.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
function S2(t5, i5, s5 = t5, e8) {
  var o7, n7, l6, h4;
  if (i5 === T2)
    return i5;
  let r4 = void 0 !== e8 ? null === (o7 = s5._$Co) || void 0 === o7 ? void 0 : o7[e8] : s5._$Cl;
  const u3 = d2(i5) ? void 0 : i5._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== u3 && (null === (n7 = null == r4 ? void 0 : r4._$AO) || void 0 === n7 || n7.call(r4, false), void 0 === u3 ? r4 = void 0 : (r4 = new u3(t5), r4._$AT(t5, s5, e8)), void 0 !== e8 ? (null !== (l6 = (h4 = s5)._$Co) && void 0 !== l6 ? l6 : h4._$Co = [])[e8] = r4 : s5._$Cl = r4), void 0 !== r4 && (i5 = S2(t5, r4._$AS(t5, i5.values), r4, e8)), i5;
}
var t2, i2, s3, e3, o3, n3, l2, h2, r3, u2, d2, c2, v, a3, f, _, m, p2, g, $, y2, w, x, b, T2, A, E, C, V, N, M, R2, k, H, I, L, z, Z, B, D;
var init_lit_html = __esm({
  "node_modules/lit-html/lit-html.js"() {
    i2 = window;
    s3 = i2.trustedTypes;
    e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
    o3 = "$lit$";
    n3 = `lit$${(Math.random() + "").slice(9)}$`;
    l2 = "?" + n3;
    h2 = `<${l2}>`;
    r3 = document;
    u2 = () => r3.createComment("");
    d2 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
    c2 = Array.isArray;
    v = (t5) => c2(t5) || "function" == typeof (null == t5 ? void 0 : t5[Symbol.iterator]);
    a3 = "[ 	\n\f\r]";
    f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
    _ = /-->/g;
    m = />/g;
    p2 = RegExp(`>|${a3}(?:([^\\s"'>=/]+)(${a3}*=${a3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
    g = /'/g;
    $ = /"/g;
    y2 = /^(?:script|style|textarea|title)$/i;
    w = (t5) => (i5, ...s5) => ({ _$litType$: t5, strings: i5, values: s5 });
    x = w(1);
    b = w(2);
    T2 = Symbol.for("lit-noChange");
    A = Symbol.for("lit-nothing");
    E = /* @__PURE__ */ new WeakMap();
    C = r3.createTreeWalker(r3, 129, null, false);
    V = (t5, i5) => {
      const s5 = t5.length - 1, e8 = [];
      let l6, r4 = 2 === i5 ? "<svg>" : "", u3 = f;
      for (let i6 = 0; i6 < s5; i6++) {
        const s6 = t5[i6];
        let d3, c4, v3 = -1, a4 = 0;
        for (; a4 < s6.length && (u3.lastIndex = a4, c4 = u3.exec(s6), null !== c4); )
          a4 = u3.lastIndex, u3 === f ? "!--" === c4[1] ? u3 = _ : void 0 !== c4[1] ? u3 = m : void 0 !== c4[2] ? (y2.test(c4[2]) && (l6 = RegExp("</" + c4[2], "g")), u3 = p2) : void 0 !== c4[3] && (u3 = p2) : u3 === p2 ? ">" === c4[0] ? (u3 = null != l6 ? l6 : f, v3 = -1) : void 0 === c4[1] ? v3 = -2 : (v3 = u3.lastIndex - c4[2].length, d3 = c4[1], u3 = void 0 === c4[3] ? p2 : '"' === c4[3] ? $ : g) : u3 === $ || u3 === g ? u3 = p2 : u3 === _ || u3 === m ? u3 = f : (u3 = p2, l6 = void 0);
        const w2 = u3 === p2 && t5[i6 + 1].startsWith("/>") ? " " : "";
        r4 += u3 === f ? s6 + h2 : v3 >= 0 ? (e8.push(d3), s6.slice(0, v3) + o3 + s6.slice(v3) + n3 + w2) : s6 + n3 + (-2 === v3 ? (e8.push(void 0), i6) : w2);
      }
      return [P(t5, r4 + (t5[s5] || "<?>") + (2 === i5 ? "</svg>" : "")), e8];
    };
    N = class {
      constructor({ strings: t5, _$litType$: i5 }, e8) {
        let h4;
        this.parts = [];
        let r4 = 0, d3 = 0;
        const c4 = t5.length - 1, v3 = this.parts, [a4, f2] = V(t5, i5);
        if (this.el = N.createElement(a4, e8), C.currentNode = this.el.content, 2 === i5) {
          const t6 = this.el.content, i6 = t6.firstChild;
          i6.remove(), t6.append(...i6.childNodes);
        }
        for (; null !== (h4 = C.nextNode()) && v3.length < c4; ) {
          if (1 === h4.nodeType) {
            if (h4.hasAttributes()) {
              const t6 = [];
              for (const i6 of h4.getAttributeNames())
                if (i6.endsWith(o3) || i6.startsWith(n3)) {
                  const s5 = f2[d3++];
                  if (t6.push(i6), void 0 !== s5) {
                    const t7 = h4.getAttribute(s5.toLowerCase() + o3).split(n3), i7 = /([.?@])?(.*)/.exec(s5);
                    v3.push({ type: 1, index: r4, name: i7[2], strings: t7, ctor: "." === i7[1] ? H : "?" === i7[1] ? L : "@" === i7[1] ? z : k });
                  } else
                    v3.push({ type: 6, index: r4 });
                }
              for (const i6 of t6)
                h4.removeAttribute(i6);
            }
            if (y2.test(h4.tagName)) {
              const t6 = h4.textContent.split(n3), i6 = t6.length - 1;
              if (i6 > 0) {
                h4.textContent = s3 ? s3.emptyScript : "";
                for (let s5 = 0; s5 < i6; s5++)
                  h4.append(t6[s5], u2()), C.nextNode(), v3.push({ type: 2, index: ++r4 });
                h4.append(t6[i6], u2());
              }
            }
          } else if (8 === h4.nodeType)
            if (h4.data === l2)
              v3.push({ type: 2, index: r4 });
            else {
              let t6 = -1;
              for (; -1 !== (t6 = h4.data.indexOf(n3, t6 + 1)); )
                v3.push({ type: 7, index: r4 }), t6 += n3.length - 1;
            }
          r4++;
        }
      }
      static createElement(t5, i5) {
        const s5 = r3.createElement("template");
        return s5.innerHTML = t5, s5;
      }
    };
    M = class {
      constructor(t5, i5) {
        this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i5;
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      u(t5) {
        var i5;
        const { el: { content: s5 }, parts: e8 } = this._$AD, o7 = (null !== (i5 = null == t5 ? void 0 : t5.creationScope) && void 0 !== i5 ? i5 : r3).importNode(s5, true);
        C.currentNode = o7;
        let n7 = C.nextNode(), l6 = 0, h4 = 0, u3 = e8[0];
        for (; void 0 !== u3; ) {
          if (l6 === u3.index) {
            let i6;
            2 === u3.type ? i6 = new R2(n7, n7.nextSibling, this, t5) : 1 === u3.type ? i6 = new u3.ctor(n7, u3.name, u3.strings, this, t5) : 6 === u3.type && (i6 = new Z(n7, this, t5)), this._$AV.push(i6), u3 = e8[++h4];
          }
          l6 !== (null == u3 ? void 0 : u3.index) && (n7 = C.nextNode(), l6++);
        }
        return C.currentNode = r3, o7;
      }
      v(t5) {
        let i5 = 0;
        for (const s5 of this._$AV)
          void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t5[i5])), i5++;
      }
    };
    R2 = class {
      constructor(t5, i5, s5, e8) {
        var o7;
        this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i5, this._$AM = s5, this.options = e8, this._$Cp = null === (o7 = null == e8 ? void 0 : e8.isConnected) || void 0 === o7 || o7;
      }
      get _$AU() {
        var t5, i5;
        return null !== (i5 = null === (t5 = this._$AM) || void 0 === t5 ? void 0 : t5._$AU) && void 0 !== i5 ? i5 : this._$Cp;
      }
      get parentNode() {
        let t5 = this._$AA.parentNode;
        const i5 = this._$AM;
        return void 0 !== i5 && 11 === (null == t5 ? void 0 : t5.nodeType) && (t5 = i5.parentNode), t5;
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t5, i5 = this) {
        t5 = S2(this, t5, i5), d2(t5) ? t5 === A || null == t5 || "" === t5 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t5 !== this._$AH && t5 !== T2 && this._(t5) : void 0 !== t5._$litType$ ? this.g(t5) : void 0 !== t5.nodeType ? this.$(t5) : v(t5) ? this.T(t5) : this._(t5);
      }
      k(t5) {
        return this._$AA.parentNode.insertBefore(t5, this._$AB);
      }
      $(t5) {
        this._$AH !== t5 && (this._$AR(), this._$AH = this.k(t5));
      }
      _(t5) {
        this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t5 : this.$(r3.createTextNode(t5)), this._$AH = t5;
      }
      g(t5) {
        var i5;
        const { values: s5, _$litType$: e8 } = t5, o7 = "number" == typeof e8 ? this._$AC(t5) : (void 0 === e8.el && (e8.el = N.createElement(P(e8.h, e8.h[0]), this.options)), e8);
        if ((null === (i5 = this._$AH) || void 0 === i5 ? void 0 : i5._$AD) === o7)
          this._$AH.v(s5);
        else {
          const t6 = new M(o7, this), i6 = t6.u(this.options);
          t6.v(s5), this.$(i6), this._$AH = t6;
        }
      }
      _$AC(t5) {
        let i5 = E.get(t5.strings);
        return void 0 === i5 && E.set(t5.strings, i5 = new N(t5)), i5;
      }
      T(t5) {
        c2(this._$AH) || (this._$AH = [], this._$AR());
        const i5 = this._$AH;
        let s5, e8 = 0;
        for (const o7 of t5)
          e8 === i5.length ? i5.push(s5 = new R2(this.k(u2()), this.k(u2()), this, this.options)) : s5 = i5[e8], s5._$AI(o7), e8++;
        e8 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e8), i5.length = e8);
      }
      _$AR(t5 = this._$AA.nextSibling, i5) {
        var s5;
        for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i5); t5 && t5 !== this._$AB; ) {
          const i6 = t5.nextSibling;
          t5.remove(), t5 = i6;
        }
      }
      setConnected(t5) {
        var i5;
        void 0 === this._$AM && (this._$Cp = t5, null === (i5 = this._$AP) || void 0 === i5 || i5.call(this, t5));
      }
    };
    k = class {
      constructor(t5, i5, s5, e8, o7) {
        this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i5, this._$AM = e8, this.options = o7, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
      }
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t5, i5 = this, s5, e8) {
        const o7 = this.strings;
        let n7 = false;
        if (void 0 === o7)
          t5 = S2(this, t5, i5, 0), n7 = !d2(t5) || t5 !== this._$AH && t5 !== T2, n7 && (this._$AH = t5);
        else {
          const e9 = t5;
          let l6, h4;
          for (t5 = o7[0], l6 = 0; l6 < o7.length - 1; l6++)
            h4 = S2(this, e9[s5 + l6], i5, l6), h4 === T2 && (h4 = this._$AH[l6]), n7 || (n7 = !d2(h4) || h4 !== this._$AH[l6]), h4 === A ? t5 = A : t5 !== A && (t5 += (null != h4 ? h4 : "") + o7[l6 + 1]), this._$AH[l6] = h4;
        }
        n7 && !e8 && this.j(t5);
      }
      j(t5) {
        t5 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t5 ? t5 : "");
      }
    };
    H = class extends k {
      constructor() {
        super(...arguments), this.type = 3;
      }
      j(t5) {
        this.element[this.name] = t5 === A ? void 0 : t5;
      }
    };
    I = s3 ? s3.emptyScript : "";
    L = class extends k {
      constructor() {
        super(...arguments), this.type = 4;
      }
      j(t5) {
        t5 && t5 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
      }
    };
    z = class extends k {
      constructor(t5, i5, s5, e8, o7) {
        super(t5, i5, s5, e8, o7), this.type = 5;
      }
      _$AI(t5, i5 = this) {
        var s5;
        if ((t5 = null !== (s5 = S2(this, t5, i5, 0)) && void 0 !== s5 ? s5 : A) === T2)
          return;
        const e8 = this._$AH, o7 = t5 === A && e8 !== A || t5.capture !== e8.capture || t5.once !== e8.once || t5.passive !== e8.passive, n7 = t5 !== A && (e8 === A || o7);
        o7 && this.element.removeEventListener(this.name, this, e8), n7 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
      }
      handleEvent(t5) {
        var i5, s5;
        "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i5 = this.options) || void 0 === i5 ? void 0 : i5.host) && void 0 !== s5 ? s5 : this.element, t5) : this._$AH.handleEvent(t5);
      }
    };
    Z = class {
      constructor(t5, i5, s5) {
        this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t5) {
        S2(this, t5);
      }
    };
    B = i2.litHtmlPolyfillSupport;
    null == B || B(N, R2), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.8.0");
    D = (t5, i5, s5) => {
      var e8, o7;
      const n7 = null !== (e8 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e8 ? e8 : i5;
      let l6 = n7._$litPart$;
      if (void 0 === l6) {
        const t6 = null !== (o7 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o7 ? o7 : null;
        n7._$litPart$ = l6 = new R2(i5.insertBefore(u2(), t6), t6, void 0, null != s5 ? s5 : {});
      }
      return l6._$AI(t5), l6;
    };
  }
});

// node_modules/lit-element/lit-element.js
var l3, o4, s4, n4;
var init_lit_element = __esm({
  "node_modules/lit-element/lit-element.js"() {
    init_reactive_element();
    init_reactive_element();
    init_lit_html();
    init_lit_html();
    s4 = class extends u {
      constructor() {
        super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
      }
      createRenderRoot() {
        var t5, e8;
        const i5 = super.createRenderRoot();
        return null !== (t5 = (e8 = this.renderOptions).renderBefore) && void 0 !== t5 || (e8.renderBefore = i5.firstChild), i5;
      }
      update(t5) {
        const i5 = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = D(i5, this.renderRoot, this.renderOptions);
      }
      connectedCallback() {
        var t5;
        super.connectedCallback(), null === (t5 = this._$Do) || void 0 === t5 || t5.setConnected(true);
      }
      disconnectedCallback() {
        var t5;
        super.disconnectedCallback(), null === (t5 = this._$Do) || void 0 === t5 || t5.setConnected(false);
      }
      render() {
        return T2;
      }
    };
    s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
    n4 = globalThis.litElementPolyfillSupport;
    null == n4 || n4({ LitElement: s4 });
    (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.3");
  }
});

// node_modules/lit-html/is-server.js
var init_is_server = __esm({
  "node_modules/lit-html/is-server.js"() {
  }
});

// node_modules/lit/index.js
var init_lit = __esm({
  "node_modules/lit/index.js"() {
    init_reactive_element();
    init_lit_html();
    init_lit_element();
    init_is_server();
  }
});

// node_modules/@lit/reactive-element/decorators/custom-element.js
var e4;
var init_custom_element = __esm({
  "node_modules/@lit/reactive-element/decorators/custom-element.js"() {
    e4 = (e8) => (n7) => "function" == typeof n7 ? ((e9, n8) => (customElements.define(e9, n8), n8))(e8, n7) : ((e9, n8) => {
      const { kind: t5, elements: s5 } = n8;
      return { kind: t5, elements: s5, finisher(n9) {
        customElements.define(e9, n9);
      } };
    })(e8, n7);
  }
});

// node_modules/@lit/reactive-element/decorators/property.js
function n5(n7) {
  return (t5, o7) => void 0 !== o7 ? e5(n7, t5, o7) : i3(n7, t5);
}
var i3, e5;
var init_property = __esm({
  "node_modules/@lit/reactive-element/decorators/property.js"() {
    i3 = (i5, e8) => "method" === e8.kind && e8.descriptor && !("value" in e8.descriptor) ? { ...e8, finisher(n7) {
      n7.createProperty(e8.key, i5);
    } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e8.key, initializer() {
      "function" == typeof e8.initializer && (this[e8.key] = e8.initializer.call(this));
    }, finisher(n7) {
      n7.createProperty(e8.key, i5);
    } };
    e5 = (i5, e8, n7) => {
      e8.constructor.createProperty(n7, i5);
    };
  }
});

// node_modules/@lit/reactive-element/decorators/state.js
function t3(t5) {
  return n5({ ...t5, state: true });
}
var init_state = __esm({
  "node_modules/@lit/reactive-element/decorators/state.js"() {
    init_property();
  }
});

// node_modules/@lit/reactive-element/decorators/base.js
var init_base = __esm({
  "node_modules/@lit/reactive-element/decorators/base.js"() {
  }
});

// node_modules/@lit/reactive-element/decorators/event-options.js
var init_event_options = __esm({
  "node_modules/@lit/reactive-element/decorators/event-options.js"() {
    init_base();
  }
});

// node_modules/@lit/reactive-element/decorators/query.js
var init_query = __esm({
  "node_modules/@lit/reactive-element/decorators/query.js"() {
    init_base();
  }
});

// node_modules/@lit/reactive-element/decorators/query-all.js
var init_query_all = __esm({
  "node_modules/@lit/reactive-element/decorators/query-all.js"() {
    init_base();
  }
});

// node_modules/@lit/reactive-element/decorators/query-async.js
var init_query_async = __esm({
  "node_modules/@lit/reactive-element/decorators/query-async.js"() {
    init_base();
  }
});

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n6, e6;
var init_query_assigned_elements = __esm({
  "node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"() {
    init_base();
    e6 = null != (null === (n6 = window.HTMLSlotElement) || void 0 === n6 ? void 0 : n6.prototype.assignedElements) ? (o7, n7) => o7.assignedElements(n7) : (o7, n7) => o7.assignedNodes(n7).filter((o8) => o8.nodeType === Node.ELEMENT_NODE);
  }
});

// node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var init_query_assigned_nodes = __esm({
  "node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"() {
    init_base();
    init_query_assigned_elements();
  }
});

// node_modules/lit/decorators.js
var init_decorators = __esm({
  "node_modules/lit/decorators.js"() {
    init_custom_element();
    init_property();
    init_state();
    init_event_options();
    init_query();
    init_query_all();
    init_query_async();
    init_query_assigned_elements();
    init_query_assigned_nodes();
  }
});

// node_modules/lit-html/directive.js
var t4, e7, i4;
var init_directive = __esm({
  "node_modules/lit-html/directive.js"() {
    t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
    e7 = (t5) => (...e8) => ({ _$litDirective$: t5, values: e8 });
    i4 = class {
      constructor(t5) {
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AT(t5, e8, i5) {
        this._$Ct = t5, this._$AM = e8, this._$Ci = i5;
      }
      _$AS(t5, e8) {
        return this.update(t5, e8);
      }
      update(t5, e8) {
        return this.render(...e8);
      }
    };
  }
});

// node_modules/lit-html/directives/class-map.js
var o6;
var init_class_map = __esm({
  "node_modules/lit-html/directives/class-map.js"() {
    init_lit_html();
    init_directive();
    o6 = e7(class extends i4 {
      constructor(t5) {
        var i5;
        if (super(t5), t5.type !== t4.ATTRIBUTE || "class" !== t5.name || (null === (i5 = t5.strings) || void 0 === i5 ? void 0 : i5.length) > 2)
          throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
      }
      render(t5) {
        return " " + Object.keys(t5).filter((i5) => t5[i5]).join(" ") + " ";
      }
      update(i5, [s5]) {
        var r4, o7;
        if (void 0 === this.it) {
          this.it = /* @__PURE__ */ new Set(), void 0 !== i5.strings && (this.nt = new Set(i5.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
          for (const t5 in s5)
            s5[t5] && !(null === (r4 = this.nt) || void 0 === r4 ? void 0 : r4.has(t5)) && this.it.add(t5);
          return this.render(s5);
        }
        const e8 = i5.element.classList;
        this.it.forEach((t5) => {
          t5 in s5 || (e8.remove(t5), this.it.delete(t5));
        });
        for (const t5 in s5) {
          const i6 = !!s5[t5];
          i6 === this.it.has(t5) || (null === (o7 = this.nt) || void 0 === o7 ? void 0 : o7.has(t5)) || (i6 ? (e8.add(t5), this.it.add(t5)) : (e8.remove(t5), this.it.delete(t5)));
        }
        return T2;
      }
    });
  }
});

// node_modules/lit/directives/class-map.js
var init_class_map2 = __esm({
  "node_modules/lit/directives/class-map.js"() {
    init_class_map();
  }
});

// node_modules/@motionone/utils/dist/array.es.js
function addUniqueItem(array, item) {
  array.indexOf(item) === -1 && array.push(item);
}
var init_array_es = __esm({
  "node_modules/@motionone/utils/dist/array.es.js"() {
  }
});

// node_modules/@motionone/utils/dist/clamp.es.js
var clamp;
var init_clamp_es = __esm({
  "node_modules/@motionone/utils/dist/clamp.es.js"() {
    clamp = (min, max, v3) => Math.min(Math.max(v3, min), max);
  }
});

// node_modules/@motionone/utils/dist/defaults.es.js
var defaults;
var init_defaults_es = __esm({
  "node_modules/@motionone/utils/dist/defaults.es.js"() {
    defaults = {
      duration: 0.3,
      delay: 0,
      endDelay: 0,
      repeat: 0,
      easing: "ease"
    };
  }
});

// node_modules/@motionone/utils/dist/is-number.es.js
var isNumber;
var init_is_number_es = __esm({
  "node_modules/@motionone/utils/dist/is-number.es.js"() {
    isNumber = (value) => typeof value === "number";
  }
});

// node_modules/@motionone/utils/dist/is-easing-list.es.js
var isEasingList;
var init_is_easing_list_es = __esm({
  "node_modules/@motionone/utils/dist/is-easing-list.es.js"() {
    init_is_number_es();
    isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);
  }
});

// node_modules/@motionone/utils/dist/wrap.es.js
var wrap;
var init_wrap_es = __esm({
  "node_modules/@motionone/utils/dist/wrap.es.js"() {
    wrap = (min, max, v3) => {
      const rangeSize = max - min;
      return ((v3 - min) % rangeSize + rangeSize) % rangeSize + min;
    };
  }
});

// node_modules/@motionone/utils/dist/easing.es.js
function getEasingForSegment(easing, i5) {
  return isEasingList(easing) ? easing[wrap(0, easing.length, i5)] : easing;
}
var init_easing_es = __esm({
  "node_modules/@motionone/utils/dist/easing.es.js"() {
    init_is_easing_list_es();
    init_wrap_es();
  }
});

// node_modules/@motionone/utils/dist/mix.es.js
var mix;
var init_mix_es = __esm({
  "node_modules/@motionone/utils/dist/mix.es.js"() {
    mix = (min, max, progress2) => -progress2 * min + progress2 * max + min;
  }
});

// node_modules/@motionone/utils/dist/noop.es.js
var noop, noopReturn;
var init_noop_es = __esm({
  "node_modules/@motionone/utils/dist/noop.es.js"() {
    noop = () => {
    };
    noopReturn = (v3) => v3;
  }
});

// node_modules/@motionone/utils/dist/progress.es.js
var progress;
var init_progress_es = __esm({
  "node_modules/@motionone/utils/dist/progress.es.js"() {
    progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);
  }
});

// node_modules/@motionone/utils/dist/offset.es.js
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i5 = 1; i5 <= remaining; i5++) {
    const offsetProgress = progress(0, remaining, i5);
    offset.push(mix(min, 1, offsetProgress));
  }
}
function defaultOffset(length) {
  const offset = [0];
  fillOffset(offset, length - 1);
  return offset;
}
var init_offset_es = __esm({
  "node_modules/@motionone/utils/dist/offset.es.js"() {
    init_mix_es();
    init_progress_es();
  }
});

// node_modules/@motionone/utils/dist/interpolate.es.js
function interpolate(output, input = defaultOffset(output.length), easing = noopReturn) {
  const length = output.length;
  const remainder = length - input.length;
  remainder > 0 && fillOffset(input, remainder);
  return (t5) => {
    let i5 = 0;
    for (; i5 < length - 2; i5++) {
      if (t5 < input[i5 + 1])
        break;
    }
    let progressInRange = clamp(0, 1, progress(input[i5], input[i5 + 1], t5));
    const segmentEasing = getEasingForSegment(easing, i5);
    progressInRange = segmentEasing(progressInRange);
    return mix(output[i5], output[i5 + 1], progressInRange);
  };
}
var init_interpolate_es = __esm({
  "node_modules/@motionone/utils/dist/interpolate.es.js"() {
    init_mix_es();
    init_noop_es();
    init_offset_es();
    init_progress_es();
    init_easing_es();
    init_clamp_es();
  }
});

// node_modules/@motionone/utils/dist/is-cubic-bezier.es.js
var isCubicBezier;
var init_is_cubic_bezier_es = __esm({
  "node_modules/@motionone/utils/dist/is-cubic-bezier.es.js"() {
    init_is_number_es();
    isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);
  }
});

// node_modules/@motionone/utils/dist/is-easing-generator.es.js
var isEasingGenerator;
var init_is_easing_generator_es = __esm({
  "node_modules/@motionone/utils/dist/is-easing-generator.es.js"() {
    isEasingGenerator = (easing) => typeof easing === "object" && Boolean(easing.createAnimation);
  }
});

// node_modules/@motionone/utils/dist/is-function.es.js
var isFunction;
var init_is_function_es = __esm({
  "node_modules/@motionone/utils/dist/is-function.es.js"() {
    isFunction = (value) => typeof value === "function";
  }
});

// node_modules/@motionone/utils/dist/is-string.es.js
var isString;
var init_is_string_es = __esm({
  "node_modules/@motionone/utils/dist/is-string.es.js"() {
    isString = (value) => typeof value === "string";
  }
});

// node_modules/@motionone/utils/dist/time.es.js
var time;
var init_time_es = __esm({
  "node_modules/@motionone/utils/dist/time.es.js"() {
    time = {
      ms: (seconds) => seconds * 1e3,
      s: (milliseconds) => milliseconds / 1e3
    };
  }
});

// node_modules/@motionone/utils/dist/index.es.js
var init_index_es = __esm({
  "node_modules/@motionone/utils/dist/index.es.js"() {
    init_array_es();
    init_clamp_es();
    init_defaults_es();
    init_interpolate_es();
    init_is_cubic_bezier_es();
    init_is_easing_generator_es();
    init_is_easing_list_es();
    init_is_function_es();
    init_is_number_es();
    init_is_string_es();
    init_noop_es();
    init_progress_es();
    init_time_es();
  }
});

// node_modules/@motionone/easing/dist/cubic-bezier.es.js
function binarySubdivide(x2, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i5 = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x2;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i5 < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noopReturn;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t5) => t5 === 0 || t5 === 1 ? t5 : calcBezier(getTForX(t5), mY1, mY2);
}
var calcBezier, subdivisionPrecision, subdivisionMaxIterations;
var init_cubic_bezier_es = __esm({
  "node_modules/@motionone/easing/dist/cubic-bezier.es.js"() {
    init_index_es();
    calcBezier = (t5, a1, a22) => (((1 - 3 * a22 + 3 * a1) * t5 + (3 * a22 - 6 * a1)) * t5 + 3 * a1) * t5;
    subdivisionPrecision = 1e-7;
    subdivisionMaxIterations = 12;
  }
});

// node_modules/@motionone/easing/dist/steps.es.js
var steps;
var init_steps_es = __esm({
  "node_modules/@motionone/easing/dist/steps.es.js"() {
    init_index_es();
    steps = (steps2, direction = "end") => (progress2) => {
      progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
      const expanded = progress2 * steps2;
      const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
      return clamp(0, 1, rounded / steps2);
    };
  }
});

// node_modules/@motionone/easing/dist/index.es.js
var init_index_es2 = __esm({
  "node_modules/@motionone/easing/dist/index.es.js"() {
    init_cubic_bezier_es();
    init_steps_es();
  }
});

// node_modules/@motionone/animation/dist/utils/easing.es.js
function getEasingFunction(definition) {
  if (isFunction(definition))
    return definition;
  if (isCubicBezier(definition))
    return cubicBezier(...definition);
  if (namedEasings[definition])
    return namedEasings[definition];
  if (definition.startsWith("steps")) {
    const args = functionArgsRegex.exec(definition);
    if (args) {
      const argsArray = args[1].split(",");
      return steps(parseFloat(argsArray[0]), argsArray[1].trim());
    }
  }
  return noopReturn;
}
var namedEasings, functionArgsRegex;
var init_easing_es2 = __esm({
  "node_modules/@motionone/animation/dist/utils/easing.es.js"() {
    init_index_es2();
    init_index_es();
    namedEasings = {
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
      "ease-in": cubicBezier(0.42, 0, 1, 1),
      "ease-in-out": cubicBezier(0.42, 0, 0.58, 1),
      "ease-out": cubicBezier(0, 0, 0.58, 1)
    };
    functionArgsRegex = /\((.*?)\)/;
  }
});

// node_modules/@motionone/animation/dist/Animation.es.js
var Animation;
var init_Animation_es = __esm({
  "node_modules/@motionone/animation/dist/Animation.es.js"() {
    init_index_es();
    init_easing_es2();
    Animation = class {
      constructor(output, keyframes = [0, 1], { easing, duration: initialDuration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, offset, direction = "normal" } = {}) {
        this.startTime = null;
        this.rate = 1;
        this.t = 0;
        this.cancelTimestamp = null;
        this.easing = noopReturn;
        this.duration = 0;
        this.totalDuration = 0;
        this.repeat = 0;
        this.playState = "idle";
        this.finished = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        easing = easing || defaults.easing;
        if (isEasingGenerator(easing)) {
          const custom = easing.createAnimation(keyframes);
          easing = custom.easing;
          keyframes = custom.keyframes || keyframes;
          initialDuration = custom.duration || initialDuration;
        }
        this.repeat = repeat;
        this.easing = isEasingList(easing) ? noopReturn : getEasingFunction(easing);
        this.updateDuration(initialDuration);
        const interpolate$1 = interpolate(keyframes, offset, isEasingList(easing) ? easing.map(getEasingFunction) : noopReturn);
        this.tick = (timestamp) => {
          var _a;
          delay = delay;
          let t5 = 0;
          if (this.pauseTime !== void 0) {
            t5 = this.pauseTime;
          } else {
            t5 = (timestamp - this.startTime) * this.rate;
          }
          this.t = t5;
          t5 /= 1e3;
          t5 = Math.max(t5 - delay, 0);
          if (this.playState === "finished" && this.pauseTime === void 0) {
            t5 = this.totalDuration;
          }
          const progress2 = t5 / this.duration;
          let currentIteration = Math.floor(progress2);
          let iterationProgress = progress2 % 1;
          if (!iterationProgress && progress2 >= 1) {
            iterationProgress = 1;
          }
          iterationProgress === 1 && currentIteration--;
          const iterationIsOdd = currentIteration % 2;
          if (direction === "reverse" || direction === "alternate" && iterationIsOdd || direction === "alternate-reverse" && !iterationIsOdd) {
            iterationProgress = 1 - iterationProgress;
          }
          const p3 = t5 >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
          const latest = interpolate$1(this.easing(p3));
          output(latest);
          const isAnimationFinished = this.pauseTime === void 0 && (this.playState === "finished" || t5 >= this.totalDuration + endDelay);
          if (isAnimationFinished) {
            this.playState = "finished";
            (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
          } else if (this.playState !== "idle") {
            this.frameRequestId = requestAnimationFrame(this.tick);
          }
        };
        this.play();
      }
      play() {
        const now = performance.now();
        this.playState = "running";
        if (this.pauseTime !== void 0) {
          this.startTime = now - this.pauseTime;
        } else if (!this.startTime) {
          this.startTime = now;
        }
        this.cancelTimestamp = this.startTime;
        this.pauseTime = void 0;
        this.frameRequestId = requestAnimationFrame(this.tick);
      }
      pause() {
        this.playState = "paused";
        this.pauseTime = this.t;
      }
      finish() {
        this.playState = "finished";
        this.tick(0);
      }
      stop() {
        var _a;
        this.playState = "idle";
        if (this.frameRequestId !== void 0) {
          cancelAnimationFrame(this.frameRequestId);
        }
        (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
      }
      cancel() {
        this.stop();
        this.tick(this.cancelTimestamp);
      }
      reverse() {
        this.rate *= -1;
      }
      commitStyles() {
      }
      updateDuration(duration) {
        this.duration = duration;
        this.totalDuration = duration * (this.repeat + 1);
      }
      get currentTime() {
        return this.t;
      }
      set currentTime(t5) {
        if (this.pauseTime !== void 0 || this.rate === 0) {
          this.pauseTime = t5;
        } else {
          this.startTime = performance.now() - t5 / this.rate;
        }
      }
      get playbackRate() {
        return this.rate;
      }
      set playbackRate(rate) {
        this.rate = rate;
      }
    };
  }
});

// node_modules/@motionone/animation/dist/index.es.js
var init_index_es3 = __esm({
  "node_modules/@motionone/animation/dist/index.es.js"() {
    init_Animation_es();
  }
});

// node_modules/hey-listen/dist/hey-listen.es.js
var warning, invariant;
var init_hey_listen_es = __esm({
  "node_modules/hey-listen/dist/hey-listen.es.js"() {
    warning = function() {
    };
    invariant = function() {
    };
    if (true) {
      warning = function(check, message) {
        if (!check && typeof console !== "undefined") {
          console.warn(message);
        }
      };
      invariant = function(check, message) {
        if (!check) {
          throw new Error(message);
        }
      };
    }
  }
});

// node_modules/@motionone/types/dist/MotionValue.es.js
var MotionValue;
var init_MotionValue_es = __esm({
  "node_modules/@motionone/types/dist/MotionValue.es.js"() {
    MotionValue = class {
      setAnimation(animation) {
        this.animation = animation;
        animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => {
        });
      }
      clearAnimation() {
        this.animation = this.generator = void 0;
      }
    };
  }
});

// node_modules/@motionone/types/dist/index.es.js
var init_index_es4 = __esm({
  "node_modules/@motionone/types/dist/index.es.js"() {
    init_MotionValue_es();
  }
});

// node_modules/@motionone/dom/dist/animate/data.es.js
function getAnimationData(element) {
  if (!data.has(element)) {
    data.set(element, {
      transforms: [],
      values: /* @__PURE__ */ new Map()
    });
  }
  return data.get(element);
}
function getMotionValue(motionValues, name) {
  if (!motionValues.has(name)) {
    motionValues.set(name, new MotionValue());
  }
  return motionValues.get(name);
}
var data;
var init_data_es = __esm({
  "node_modules/@motionone/dom/dist/animate/data.es.js"() {
    init_index_es4();
    data = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/@motionone/dom/dist/animate/utils/transforms.es.js
var axes, order, transformAlias, rotation, baseTransformProperties, transformDefinitions, asTransformCssVar, transforms, compareTransformOrder, transformLookup, isTransform, addTransformToElement, buildTransformTemplate, transformListToString;
var init_transforms_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/transforms.es.js"() {
    init_index_es();
    init_data_es();
    axes = ["", "X", "Y", "Z"];
    order = ["translate", "scale", "rotate", "skew"];
    transformAlias = {
      x: "translateX",
      y: "translateY",
      z: "translateZ"
    };
    rotation = {
      syntax: "<angle>",
      initialValue: "0deg",
      toDefaultUnit: (v3) => v3 + "deg"
    };
    baseTransformProperties = {
      translate: {
        syntax: "<length-percentage>",
        initialValue: "0px",
        toDefaultUnit: (v3) => v3 + "px"
      },
      rotate: rotation,
      scale: {
        syntax: "<number>",
        initialValue: 1,
        toDefaultUnit: noopReturn
      },
      skew: rotation
    };
    transformDefinitions = /* @__PURE__ */ new Map();
    asTransformCssVar = (name) => `--motion-${name}`;
    transforms = ["x", "y", "z"];
    order.forEach((name) => {
      axes.forEach((axis) => {
        transforms.push(name + axis);
        transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
      });
    });
    compareTransformOrder = (a4, b2) => transforms.indexOf(a4) - transforms.indexOf(b2);
    transformLookup = new Set(transforms);
    isTransform = (name) => transformLookup.has(name);
    addTransformToElement = (element, name) => {
      if (transformAlias[name])
        name = transformAlias[name];
      const { transforms: transforms2 } = getAnimationData(element);
      addUniqueItem(transforms2, name);
      element.style.transform = buildTransformTemplate(transforms2);
    };
    buildTransformTemplate = (transforms2) => transforms2.sort(compareTransformOrder).reduce(transformListToString, "").trim();
    transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;
  }
});

// node_modules/@motionone/dom/dist/animate/utils/css-var.es.js
function registerCssVariable(name) {
  if (registeredProperties.has(name))
    return;
  registeredProperties.add(name);
  try {
    const { syntax, initialValue } = transformDefinitions.has(name) ? transformDefinitions.get(name) : {};
    CSS.registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue
    });
  } catch (e8) {
  }
}
var isCssVar, registeredProperties;
var init_css_var_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/css-var.es.js"() {
    init_transforms_es();
    isCssVar = (name) => name.startsWith("--");
    registeredProperties = /* @__PURE__ */ new Set();
  }
});

// node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js
var testAnimation, featureTests, results, supports;
var init_feature_detection_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js"() {
    testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
    featureTests = {
      cssRegisterProperty: () => typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty"),
      waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
      partialKeyframes: () => {
        try {
          testAnimation({ opacity: [1] });
        } catch (e8) {
          return false;
        }
        return true;
      },
      finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 1e-3 }).finished),
      linearEasing: () => {
        try {
          testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
        } catch (e8) {
          return false;
        }
        return true;
      }
    };
    results = {};
    supports = {};
    for (const key in featureTests) {
      supports[key] = () => {
        if (results[key] === void 0)
          results[key] = featureTests[key]();
        return results[key];
      };
    }
  }
});

// node_modules/@motionone/dom/dist/animate/utils/easing.es.js
var resolution, generateLinearEasingPoints, convertEasing, cubicBezierAsString;
var init_easing_es3 = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/easing.es.js"() {
    init_index_es();
    init_feature_detection_es();
    resolution = 0.015;
    generateLinearEasingPoints = (easing, duration) => {
      let points = "";
      const numPoints = Math.round(duration / resolution);
      for (let i5 = 0; i5 < numPoints; i5++) {
        points += easing(progress(0, numPoints - 1, i5)) + ", ";
      }
      return points.substring(0, points.length - 2);
    };
    convertEasing = (easing, duration) => {
      if (isFunction(easing)) {
        return supports.linearEasing() ? `linear(${generateLinearEasingPoints(easing, duration)})` : defaults.easing;
      } else {
        return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
      }
    };
    cubicBezierAsString = ([a4, b2, c4, d3]) => `cubic-bezier(${a4}, ${b2}, ${c4}, ${d3})`;
  }
});

// node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js
function hydrateKeyframes(keyframes, readInitialValue) {
  for (let i5 = 0; i5 < keyframes.length; i5++) {
    if (keyframes[i5] === null) {
      keyframes[i5] = i5 ? keyframes[i5 - 1] : readInitialValue();
    }
  }
  return keyframes;
}
var keyframesList;
var init_keyframes_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js"() {
    keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];
  }
});

// node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js
function getStyleName(key) {
  if (transformAlias[key])
    key = transformAlias[key];
  return isTransform(key) ? asTransformCssVar(key) : key;
}
var init_get_style_name_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js"() {
    init_transforms_es();
  }
});

// node_modules/@motionone/dom/dist/animate/style.es.js
var style;
var init_style_es = __esm({
  "node_modules/@motionone/dom/dist/animate/style.es.js"() {
    init_css_var_es();
    init_get_style_name_es();
    init_transforms_es();
    style = {
      get: (element, name) => {
        name = getStyleName(name);
        let value = isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
        if (!value && value !== 0) {
          const definition = transformDefinitions.get(name);
          if (definition)
            value = definition.initialValue;
        }
        return value;
      },
      set: (element, name, value) => {
        name = getStyleName(name);
        if (isCssVar(name)) {
          element.style.setProperty(name, value);
        } else {
          element.style[name] = value;
        }
      }
    };
  }
});

// node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js
function stopAnimation(animation, needsCommit = true) {
  if (!animation || animation.playState === "finished")
    return;
  try {
    if (animation.stop) {
      animation.stop();
    } else {
      needsCommit && animation.commitStyles();
      animation.cancel();
    }
  } catch (e8) {
  }
}
var init_stop_animation_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js"() {
  }
});

// node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js
function getUnitConverter(keyframes, definition) {
  var _a;
  let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || noopReturn;
  const finalKeyframe = keyframes[keyframes.length - 1];
  if (isString(finalKeyframe)) {
    const unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
    if (unit)
      toUnit = (value) => value + unit;
  }
  return toUnit;
}
var init_get_unit_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js"() {
    init_index_es();
  }
});

// node_modules/@motionone/dom/dist/animate/animate-style.es.js
function getDevToolsRecord() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
  const record = getDevToolsRecord();
  const isRecording = options.record !== false && record;
  let animation;
  let { duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, easing = defaults.easing, persist = false, direction, offset, allowWebkitAcceleration = false } = options;
  const data2 = getAnimationData(element);
  const valueIsTransform = isTransform(key);
  let canAnimateNatively = supports.waapi();
  valueIsTransform && addTransformToElement(element, key);
  const name = getStyleName(key);
  const motionValue = getMotionValue(data2.values, name);
  const definition = transformDefinitions.get(name);
  stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) && options.record !== false);
  return () => {
    const readInitialValue = () => {
      var _a, _b;
      return (_b = (_a = style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0;
    };
    let keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
    const toUnit = getUnitConverter(keyframes, definition);
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      duration = custom.duration || duration;
    }
    if (isCssVar(name)) {
      if (supports.cssRegisterProperty()) {
        registerCssVariable(name);
      } else {
        canAnimateNatively = false;
      }
    }
    if (valueIsTransform && !supports.linearEasing() && (isFunction(easing) || isEasingList(easing) && easing.some(isFunction))) {
      canAnimateNatively = false;
    }
    if (canAnimateNatively) {
      if (definition) {
        keyframes = keyframes.map((value) => isNumber(value) ? definition.toDefaultUnit(value) : value);
      }
      if (keyframes.length === 1 && (!supports.partialKeyframes() || isRecording)) {
        keyframes.unshift(readInitialValue());
      }
      const animationOptions = {
        delay: time.ms(delay),
        duration: time.ms(duration),
        endDelay: time.ms(endDelay),
        easing: !isEasingList(easing) ? convertEasing(easing, duration) : void 0,
        direction,
        iterations: repeat + 1,
        fill: "both"
      };
      animation = element.animate({
        [name]: keyframes,
        offset,
        easing: isEasingList(easing) ? easing.map((thisEasing) => convertEasing(thisEasing, duration)) : void 0
      }, animationOptions);
      if (!animation.finished) {
        animation.finished = new Promise((resolve, reject) => {
          animation.onfinish = resolve;
          animation.oncancel = reject;
        });
      }
      const target = keyframes[keyframes.length - 1];
      animation.finished.then(() => {
        if (persist)
          return;
        style.set(element, name, target);
        animation.cancel();
      }).catch(noop);
      if (!allowWebkitAcceleration)
        animation.playbackRate = 1.000001;
    } else if (AnimationPolyfill && valueIsTransform) {
      keyframes = keyframes.map((value) => typeof value === "string" ? parseFloat(value) : value);
      if (keyframes.length === 1) {
        keyframes.unshift(parseFloat(readInitialValue()));
      }
      animation = new AnimationPolyfill((latest) => {
        style.set(element, name, toUnit ? toUnit(latest) : latest);
      }, keyframes, Object.assign(Object.assign({}, options), {
        duration,
        easing
      }));
    } else {
      const target = keyframes[keyframes.length - 1];
      style.set(element, name, definition && isNumber(target) ? definition.toDefaultUnit(target) : target);
    }
    if (isRecording) {
      record(element, key, keyframes, {
        duration,
        delay,
        easing,
        repeat,
        offset
      }, "motion-one");
    }
    motionValue.setAnimation(animation);
    return animation;
  };
}
var init_animate_style_es = __esm({
  "node_modules/@motionone/dom/dist/animate/animate-style.es.js"() {
    init_data_es();
    init_css_var_es();
    init_index_es();
    init_transforms_es();
    init_easing_es3();
    init_feature_detection_es();
    init_keyframes_es();
    init_style_es();
    init_get_style_name_es();
    init_stop_animation_es();
    init_get_unit_es();
  }
});

// node_modules/@motionone/dom/dist/animate/utils/options.es.js
var getOptions;
var init_options_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/options.es.js"() {
    getOptions = (options, key) => options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options);
  }
});

// node_modules/@motionone/dom/dist/utils/resolve-elements.es.js
function resolveElements(elements, selectorCache) {
  var _a;
  if (typeof elements === "string") {
    if (selectorCache) {
      (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : selectorCache[elements] = document.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = document.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  return Array.from(elements || []);
}
var init_resolve_elements_es = __esm({
  "node_modules/@motionone/dom/dist/utils/resolve-elements.es.js"() {
  }
});

// node_modules/@motionone/dom/dist/animate/utils/controls.es.js
var createAnimation, withControls, getActiveAnimation, controls, selectFinished;
var init_controls_es = __esm({
  "node_modules/@motionone/dom/dist/animate/utils/controls.es.js"() {
    init_index_es();
    init_stop_animation_es();
    createAnimation = (factory) => factory();
    withControls = (animationFactory, options, duration = defaults.duration) => {
      return new Proxy({
        animations: animationFactory.map(createAnimation).filter(Boolean),
        duration,
        options
      }, controls);
    };
    getActiveAnimation = (state) => state.animations[0];
    controls = {
      get: (target, key) => {
        const activeAnimation = getActiveAnimation(target);
        switch (key) {
          case "duration":
            return target.duration;
          case "currentTime":
            return time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
          case "playbackRate":
          case "playState":
            return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
          case "finished":
            if (!target.finished) {
              target.finished = Promise.all(target.animations.map(selectFinished)).catch(noop);
            }
            return target.finished;
          case "stop":
            return () => {
              target.animations.forEach((animation) => stopAnimation(animation));
            };
          case "forEachNative":
            return (callback) => {
              target.animations.forEach((animation) => callback(animation, target));
            };
          default:
            return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined" ? void 0 : () => target.animations.forEach((animation) => animation[key]());
        }
      },
      set: (target, key, value) => {
        switch (key) {
          case "currentTime":
            value = time.ms(value);
          case "playbackRate":
            for (let i5 = 0; i5 < target.animations.length; i5++) {
              target.animations[i5][key] = value;
            }
            return true;
        }
        return false;
      }
    };
    selectFinished = (animation) => animation.finished;
  }
});

// node_modules/@motionone/dom/dist/utils/stagger.es.js
function resolveOption(option, i5, total) {
  return isFunction(option) ? option(i5, total) : option;
}
var init_stagger_es = __esm({
  "node_modules/@motionone/dom/dist/utils/stagger.es.js"() {
    init_index_es();
  }
});

// node_modules/@motionone/dom/dist/animate/create-animate.es.js
function createAnimate(AnimatePolyfill) {
  return function animate3(elements, keyframes, options = {}) {
    elements = resolveElements(elements);
    const numElements = elements.length;
    invariant(Boolean(numElements), "No valid element provided.");
    invariant(Boolean(keyframes), "No keyframes defined.");
    const animationFactories = [];
    for (let i5 = 0; i5 < numElements; i5++) {
      const element = elements[i5];
      for (const key in keyframes) {
        const valueOptions = getOptions(options, key);
        valueOptions.delay = resolveOption(valueOptions.delay, i5, numElements);
        const animation = animateStyle(element, key, keyframes[key], valueOptions, AnimatePolyfill);
        animationFactories.push(animation);
      }
    }
    return withControls(
      animationFactories,
      options,
      options.duration
    );
  };
}
var init_create_animate_es = __esm({
  "node_modules/@motionone/dom/dist/animate/create-animate.es.js"() {
    init_hey_listen_es();
    init_animate_style_es();
    init_options_es();
    init_resolve_elements_es();
    init_controls_es();
    init_stagger_es();
  }
});

// node_modules/@motionone/dom/dist/animate/index.es.js
var animate;
var init_index_es5 = __esm({
  "node_modules/@motionone/dom/dist/animate/index.es.js"() {
    init_index_es3();
    init_create_animate_es();
    animate = createAnimate(Animation);
  }
});

// node_modules/@motionone/dom/dist/index.es.js
var init_index_es6 = __esm({
  "node_modules/@motionone/dom/dist/index.es.js"() {
    init_index_es5();
    init_controls_es();
  }
});

// node_modules/motion/dist/animate.es.js
function animateProgress(target, options = {}) {
  return withControls([
    () => {
      const animation = new Animation(target, [0, 1], options);
      animation.finished.catch(() => {
      });
      return animation;
    }
  ], options, options.duration);
}
function animate2(target, keyframesOrOptions, options) {
  const factory = isFunction(target) ? animateProgress : animate;
  return factory(target, keyframesOrOptions, options);
}
var init_animate_es = __esm({
  "node_modules/motion/dist/animate.es.js"() {
    init_index_es6();
    init_index_es();
    init_index_es3();
  }
});

// node_modules/motion/dist/main.es.js
var init_main_es = __esm({
  "node_modules/motion/dist/main.es.js"() {
    init_index_es6();
    init_index_es4();
    init_animate_es();
  }
});

// node_modules/lit-html/directives/if-defined.js
var l5;
var init_if_defined = __esm({
  "node_modules/lit-html/directives/if-defined.js"() {
    init_lit_html();
    l5 = (l6) => null != l6 ? l6 : A;
  }
});

// node_modules/lit/directives/if-defined.js
var init_if_defined2 = __esm({
  "node_modules/lit/directives/if-defined.js"() {
    init_if_defined();
  }
});

// node_modules/@walletconnect/modal-ui/dist/index.js
function rt() {
  var e8;
  const o7 = (e8 = ne.state.themeMode) != null ? e8 : "dark", r4 = { light: { foreground: { 1: "rgb(20,20,20)", 2: "rgb(121,134,134)", 3: "rgb(158,169,169)" }, background: { 1: "rgb(255,255,255)", 2: "rgb(241,243,243)", 3: "rgb(228,231,231)" }, overlay: "rgba(0,0,0,0.1)" }, dark: { foreground: { 1: "rgb(228,231,231)", 2: "rgb(148,158,158)", 3: "rgb(110,119,119)" }, background: { 1: "rgb(20,20,20)", 2: "rgb(39,42,42)", 3: "rgb(59,64,64)" }, overlay: "rgba(255,255,255,0.1)" } }[o7];
  return { "--wcm-color-fg-1": r4.foreground[1], "--wcm-color-fg-2": r4.foreground[2], "--wcm-color-fg-3": r4.foreground[3], "--wcm-color-bg-1": r4.background[1], "--wcm-color-bg-2": r4.background[2], "--wcm-color-bg-3": r4.background[3], "--wcm-color-overlay": r4.overlay };
}
function He() {
  return { "--wcm-accent-color": "#3396FF", "--wcm-accent-fill-color": "#FFFFFF", "--wcm-z-index": "89", "--wcm-background-color": "#3396FF", "--wcm-background-border-radius": "8px", "--wcm-container-border-radius": "30px", "--wcm-wallet-icon-border-radius": "15px", "--wcm-wallet-icon-large-border-radius": "30px", "--wcm-wallet-icon-small-border-radius": "7px", "--wcm-input-border-radius": "28px", "--wcm-button-border-radius": "10px", "--wcm-notification-border-radius": "36px", "--wcm-secondary-button-border-radius": "28px", "--wcm-icon-button-border-radius": "50%", "--wcm-button-hover-highlight-border-radius": "10px", "--wcm-text-big-bold-size": "20px", "--wcm-text-big-bold-weight": "600", "--wcm-text-big-bold-line-height": "24px", "--wcm-text-big-bold-letter-spacing": "-0.03em", "--wcm-text-big-bold-text-transform": "none", "--wcm-text-xsmall-bold-size": "10px", "--wcm-text-xsmall-bold-weight": "700", "--wcm-text-xsmall-bold-line-height": "12px", "--wcm-text-xsmall-bold-letter-spacing": "0.02em", "--wcm-text-xsmall-bold-text-transform": "uppercase", "--wcm-text-xsmall-regular-size": "12px", "--wcm-text-xsmall-regular-weight": "600", "--wcm-text-xsmall-regular-line-height": "14px", "--wcm-text-xsmall-regular-letter-spacing": "-0.03em", "--wcm-text-xsmall-regular-text-transform": "none", "--wcm-text-small-thin-size": "14px", "--wcm-text-small-thin-weight": "500", "--wcm-text-small-thin-line-height": "16px", "--wcm-text-small-thin-letter-spacing": "-0.03em", "--wcm-text-small-thin-text-transform": "none", "--wcm-text-small-regular-size": "14px", "--wcm-text-small-regular-weight": "600", "--wcm-text-small-regular-line-height": "16px", "--wcm-text-small-regular-letter-spacing": "-0.03em", "--wcm-text-small-regular-text-transform": "none", "--wcm-text-medium-regular-size": "16px", "--wcm-text-medium-regular-weight": "600", "--wcm-text-medium-regular-line-height": "20px", "--wcm-text-medium-regular-letter-spacing": "-0.03em", "--wcm-text-medium-regular-text-transform": "none", "--wcm-font-family": "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif", "--wcm-font-feature-settings": "'tnum' on, 'lnum' on, 'case' on", "--wcm-success-color": "rgb(38,181,98)", "--wcm-error-color": "rgb(242, 90, 103)", "--wcm-overlay-background-color": "rgba(0, 0, 0, 0.3)", "--wcm-overlay-backdrop-filter": "none" };
}
function Ce(e8, o7, r4) {
  return e8 === o7 ? false : (e8 - o7 < 0 ? o7 - e8 : e8 - o7) <= r4 + jt;
}
function _t(e8, o7) {
  const r4 = Array.prototype.slice.call(import_qrcode.default.create(e8, { errorCorrectionLevel: o7 }).modules.data, 0), a4 = Math.sqrt(r4.length);
  return r4.reduce((t5, l6, i5) => (i5 % a4 === 0 ? t5.push([l6]) : t5[t5.length - 1].push(l6)) && t5, []);
}
var import_qrcode, et, Be, tt, ot, Ue, ve, h3, at, lt, it, F, T3, nt, ct, st, ue, ee, dt, mt, ht, wt, be, v2, pt, gt, vt, ut, fe, bt, ft, xt, yt, xe, $t, Ct, kt, Ot, ye, Wt, It, Et, te2, S3, c3, Mt, Lt, Rt, $e, oe2, At, Pt, Tt, ze, ne2, jt, Ve, A2, Dt, Nt, Zt, St, q, j, Bt, Ut, Ht, Fe, ce, zt, Vt, Ft, qt, ke, Qt, Kt, Yt, Oe, re, Gt, Xt, Jt, _2, L2, eo, to, oo, se2, Q, ro, ao, qe, We, lo, io, no, Qe, co, so, mo, ho, Ie, wo, po, go, K, D2, G, Z2, vo, uo, bo, fo, Ee, xo, yo, $o, Co, Me, ko, Oo, Wo, Io, Le, Eo, Mo, Lo, Re, ae, Ro, Ao, Po, le, B2, To, jo, _o, Do, Ae, No, Zo, So, de, Y, Bo, Uo, Ho, Pe, zo, Vo, Fo, Ke, me, qo, Qo, Ko, Yo, Te, Go, Xo, Jo, Ye, he, er, tr, or, rr, je, ar, lr, ir, _e, nr, cr, sr, ie, De, U, dr, mr, hr, Ge, we;
var init_dist2 = __esm({
  "node_modules/@walletconnect/modal-ui/dist/index.js"() {
    init_lit();
    init_decorators();
    init_class_map2();
    init_dist();
    init_lit_html();
    init_main_es();
    init_if_defined2();
    import_qrcode = __toESM(require_browser(), 1);
    et = Object.defineProperty;
    Be = Object.getOwnPropertySymbols;
    tt = Object.prototype.hasOwnProperty;
    ot = Object.prototype.propertyIsEnumerable;
    Ue = (e8, o7, r4) => o7 in e8 ? et(e8, o7, { enumerable: true, configurable: true, writable: true, value: r4 }) : e8[o7] = r4;
    ve = (e8, o7) => {
      for (var r4 in o7 || (o7 = {}))
        tt.call(o7, r4) && Ue(e8, r4, o7[r4]);
      if (Be)
        for (var r4 of Be(o7))
          ot.call(o7, r4) && Ue(e8, r4, o7[r4]);
      return e8;
    };
    h3 = { getPreset(e8) {
      return He()[e8];
    }, setTheme() {
      const e8 = document.querySelector(":root"), { themeVariables: o7 } = ne.state;
      if (e8) {
        const r4 = ve(ve(ve({}, rt()), He()), o7);
        Object.entries(r4).forEach(([a4, t5]) => e8.style.setProperty(a4, t5));
      }
    }, globalCss: i`*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-style:normal;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent;backface-visibility:hidden}button{cursor:pointer;display:flex;justify-content:center;align-items:center;position:relative;border:none;background-color:transparent;transition:all .2s ease}@media (hover:hover) and (pointer:fine){button:active{transition:all .1s ease;transform:scale(.93)}}button::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;transition:background-color,.2s ease}button:disabled{cursor:not-allowed}button svg,button wcm-text{position:relative;z-index:1}input{border:none;outline:0;appearance:none}img{display:block}::selection{color:var(--wcm-accent-fill-color);background:var(--wcm-accent-color)}` };
    at = i`button{border-radius:var(--wcm-secondary-button-border-radius);height:28px;padding:0 10px;background-color:var(--wcm-accent-color)}button path{fill:var(--wcm-accent-fill-color)}button::after{border-radius:inherit;border:1px solid var(--wcm-color-overlay)}button:disabled::after{background-color:transparent}.wcm-icon-left svg{margin-right:5px}.wcm-icon-right svg{margin-left:5px}button:active::after{background-color:var(--wcm-color-overlay)}.wcm-ghost,.wcm-ghost:active::after,.wcm-outline{background-color:transparent}.wcm-ghost:active{opacity:.5}@media(hover:hover){button:hover::after{background-color:var(--wcm-color-overlay)}.wcm-ghost:hover::after{background-color:transparent}.wcm-ghost:hover{opacity:.5}}button:disabled{background-color:var(--wcm-color-bg-3);pointer-events:none}.wcm-ghost::after{border-color:transparent}.wcm-ghost path{fill:var(--wcm-color-fg-2)}.wcm-outline path{fill:var(--wcm-accent-color)}.wcm-outline:disabled{background-color:transparent;opacity:.5}`;
    lt = Object.defineProperty;
    it = Object.getOwnPropertyDescriptor;
    F = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? it(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && lt(o7, r4, t5), t5;
    };
    T3 = class extends s4 {
      constructor() {
        super(...arguments), this.disabled = false, this.iconLeft = void 0, this.iconRight = void 0, this.onClick = () => null, this.variant = "default";
      }
      render() {
        const e8 = { "wcm-icon-left": this.iconLeft !== void 0, "wcm-icon-right": this.iconRight !== void 0, "wcm-ghost": this.variant === "ghost", "wcm-outline": this.variant === "outline" };
        let o7 = "inverse";
        return this.variant === "ghost" && (o7 = "secondary"), this.variant === "outline" && (o7 = "accent"), x`<button class="${o6(e8)}" ?disabled="${this.disabled}" @click="${this.onClick}">${this.iconLeft}<wcm-text variant="small-regular" color="${o7}"><slot></slot></wcm-text>${this.iconRight}</button>`;
      }
    };
    T3.styles = [h3.globalCss, at], F([n5({ type: Boolean })], T3.prototype, "disabled", 2), F([n5()], T3.prototype, "iconLeft", 2), F([n5()], T3.prototype, "iconRight", 2), F([n5()], T3.prototype, "onClick", 2), F([n5()], T3.prototype, "variant", 2), T3 = F([e4("wcm-button")], T3);
    nt = i`:host{display:inline-block}button{padding:0 15px 1px;height:40px;border-radius:var(--wcm-button-border-radius);color:var(--wcm-accent-fill-color);background-color:var(--wcm-accent-color)}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--wcm-color-overlay)}button:active::after{background-color:var(--wcm-color-overlay)}button:disabled{padding-bottom:0;background-color:var(--wcm-color-bg-3);color:var(--wcm-color-fg-3)}.wcm-secondary{color:var(--wcm-accent-color);background-color:transparent}.wcm-secondary::after{display:none}@media(hover:hover){button:hover::after{background-color:var(--wcm-color-overlay)}}`;
    ct = Object.defineProperty;
    st = Object.getOwnPropertyDescriptor;
    ue = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? st(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && ct(o7, r4, t5), t5;
    };
    ee = class extends s4 {
      constructor() {
        super(...arguments), this.disabled = false, this.variant = "primary";
      }
      render() {
        const e8 = { "wcm-secondary": this.variant === "secondary" };
        return x`<button ?disabled="${this.disabled}" class="${o6(e8)}"><slot></slot></button>`;
      }
    };
    ee.styles = [h3.globalCss, nt], ue([n5({ type: Boolean })], ee.prototype, "disabled", 2), ue([n5()], ee.prototype, "variant", 2), ee = ue([e4("wcm-button-big")], ee);
    dt = i`:host{background-color:var(--wcm-color-bg-2);border-top:1px solid var(--wcm-color-bg-3)}div{padding:10px 20px;display:inherit;flex-direction:inherit;align-items:inherit;width:inherit;justify-content:inherit}`;
    mt = Object.defineProperty;
    ht = Object.getOwnPropertyDescriptor;
    wt = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? ht(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && mt(o7, r4, t5), t5;
    };
    be = class extends s4 {
      render() {
        return x`<div><slot></slot></div>`;
      }
    };
    be.styles = [h3.globalCss, dt], be = wt([e4("wcm-info-footer")], be);
    v2 = { CROSS_ICON: b`<svg width="12" height="12" viewBox="0 0 12 12"><path d="M9.94 11A.75.75 0 1 0 11 9.94L7.414 6.353a.5.5 0 0 1 0-.708L11 2.061A.75.75 0 1 0 9.94 1L6.353 4.586a.5.5 0 0 1-.708 0L2.061 1A.75.75 0 0 0 1 2.06l3.586 3.586a.5.5 0 0 1 0 .708L1 9.939A.75.75 0 1 0 2.06 11l3.586-3.586a.5.5 0 0 1 .708 0L9.939 11Z" fill="#fff"/></svg>`, WALLET_CONNECT_LOGO: b`<svg width="178" height="29" viewBox="0 0 178 29" id="wcm-wc-logo"><path d="M10.683 7.926c5.284-5.17 13.85-5.17 19.134 0l.636.623a.652.652 0 0 1 0 .936l-2.176 2.129a.343.343 0 0 1-.478 0l-.875-.857c-3.686-3.607-9.662-3.607-13.348 0l-.937.918a.343.343 0 0 1-.479 0l-2.175-2.13a.652.652 0 0 1 0-.936l.698-.683Zm23.633 4.403 1.935 1.895a.652.652 0 0 1 0 .936l-8.73 8.543a.687.687 0 0 1-.956 0L20.37 17.64a.172.172 0 0 0-.239 0l-6.195 6.063a.687.687 0 0 1-.957 0l-8.73-8.543a.652.652 0 0 1 0-.936l1.936-1.895a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .239 0l6.195-6.064a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .24 0l6.195-6.064a.687.687 0 0 1 .956 0ZM48.093 20.948l2.338-9.355c.139-.515.258-1.07.416-1.942.12.872.258 1.427.357 1.942l2.022 9.355h4.181l3.528-13.874h-3.21l-1.943 8.523a24.825 24.825 0 0 0-.456 2.457c-.158-.931-.317-1.625-.495-2.438l-1.883-8.542h-4.201l-2.042 8.542a41.204 41.204 0 0 0-.475 2.438 41.208 41.208 0 0 0-.476-2.438l-1.903-8.542h-3.349l3.508 13.874h4.083ZM63.33 21.304c1.585 0 2.596-.654 3.11-1.605-.059.297-.078.595-.078.892v.357h2.655V15.22c0-2.735-1.248-4.32-4.3-4.32-2.636 0-4.36 1.466-4.52 3.487h2.914c.1-.891.734-1.426 1.705-1.426.911 0 1.407.515 1.407 1.11 0 .435-.258.693-1.03.792l-1.388.159c-2.061.257-3.825 1.01-3.825 3.19 0 1.982 1.645 3.092 3.35 3.092Zm.891-2.041c-.773 0-1.348-.436-1.348-1.19 0-.733.655-1.09 1.645-1.268l.674-.119c.575-.118.892-.218 1.09-.396v.912c0 1.228-.892 2.06-2.06 2.06ZM70.398 7.074v13.874h2.874V7.074h-2.874ZM74.934 7.074v13.874h2.874V7.074h-2.874ZM84.08 21.304c2.735 0 4.5-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922H81.92ZM94.92 21.146c.633 0 1.248-.1 1.525-.179v-2.18c-.218.04-.475.06-.693.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.338v-2.24h-2.338V7.788H91.47v3.448H89.37v2.24h2.1v4.201c0 2.3 1.15 3.469 3.45 3.469ZM104.62 21.304c3.924 0 6.302-2.299 6.599-5.608h-3.111c-.238 1.803-1.506 3.032-3.369 3.032-2.2 0-3.746-1.784-3.746-4.796 0-2.953 1.605-4.638 3.805-4.638 1.883 0 2.953 1.15 3.171 2.834h3.191c-.317-3.448-2.854-5.41-6.342-5.41-3.984 0-7.036 2.695-7.036 7.214 0 4.677 2.676 7.372 6.838 7.372ZM117.449 21.304c2.993 0 5.114-1.882 5.114-5.172 0-3.23-2.121-5.233-5.114-5.233-2.972 0-5.093 2.002-5.093 5.233 0 3.29 2.101 5.172 5.093 5.172Zm0-2.22c-1.327 0-2.18-1.09-2.18-2.952 0-1.903.892-2.973 2.18-2.973 1.308 0 2.2 1.07 2.2 2.973 0 1.862-.872 2.953-2.2 2.953ZM126.569 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.229-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM137.464 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.228-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM149.949 21.304c2.735 0 4.499-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922h-3.984ZM160.876 21.304c3.013 0 4.658-1.645 4.975-4.201h-2.874c-.099 1.07-.713 1.982-2.001 1.982-1.309 0-2.2-1.21-2.2-2.993 0-1.942 1.03-2.933 2.259-2.933 1.209 0 1.803.872 1.883 1.882h2.873c-.218-2.358-1.823-4.142-4.776-4.142-2.874 0-5.153 1.903-5.153 5.193 0 3.25 1.923 5.212 5.014 5.212ZM172.067 21.146c.634 0 1.248-.1 1.526-.179v-2.18c-.218.04-.476.06-.694.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.339v-2.24h-2.339V7.788h-2.854v3.448h-2.1v2.24h2.1v4.201c0 2.3 1.15 3.469 3.449 3.469Z" fill="#fff"/></svg>`, WALLET_CONNECT_ICON: b`<svg width="28" height="20" viewBox="0 0 28 20"><g clip-path="url(#a)"><path d="M7.386 6.482c3.653-3.576 9.575-3.576 13.228 0l.44.43a.451.451 0 0 1 0 .648L19.55 9.033a.237.237 0 0 1-.33 0l-.606-.592c-2.548-2.496-6.68-2.496-9.228 0l-.648.634a.237.237 0 0 1-.33 0L6.902 7.602a.451.451 0 0 1 0-.647l.483-.473Zm16.338 3.046 1.339 1.31a.451.451 0 0 1 0 .648l-6.035 5.909a.475.475 0 0 1-.662 0L14.083 13.2a.119.119 0 0 0-.166 0l-4.283 4.194a.475.475 0 0 1-.662 0l-6.035-5.91a.451.451 0 0 1 0-.647l1.338-1.31a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0Z" fill="#000000"/></g><defs><clipPath id="a"><path fill="#ffffff" d="M0 0h28v20H0z"/></clipPath></defs></svg>`, WALLET_CONNECT_ICON_COLORED: b`<svg width="96" height="96" fill="none"><path fill="#fff" d="M25.322 33.597c12.525-12.263 32.83-12.263 45.355 0l1.507 1.476a1.547 1.547 0 0 1 0 2.22l-5.156 5.048a.814.814 0 0 1-1.134 0l-2.074-2.03c-8.737-8.555-22.903-8.555-31.64 0l-2.222 2.175a.814.814 0 0 1-1.134 0l-5.156-5.049a1.547 1.547 0 0 1 0-2.22l1.654-1.62Zm56.019 10.44 4.589 4.494a1.547 1.547 0 0 1 0 2.22l-20.693 20.26a1.628 1.628 0 0 1-2.267 0L48.283 56.632a.407.407 0 0 0-.567 0L33.03 71.012a1.628 1.628 0 0 1-2.268 0L10.07 50.75a1.547 1.547 0 0 1 0-2.22l4.59-4.494a1.628 1.628 0 0 1 2.267 0l14.687 14.38c.156.153.41.153.567 0l14.685-14.38a1.628 1.628 0 0 1 2.268 0l14.687 14.38c.156.153.41.153.567 0l14.686-14.38a1.628 1.628 0 0 1 2.268 0Z"/><path stroke="#000" d="M25.672 33.954c12.33-12.072 32.325-12.072 44.655 0l1.508 1.476a1.047 1.047 0 0 1 0 1.506l-5.157 5.048a.314.314 0 0 1-.434 0l-2.074-2.03c-8.932-8.746-23.409-8.746-32.34 0l-2.222 2.174a.314.314 0 0 1-.434 0l-5.157-5.048a1.047 1.047 0 0 1 0-1.506l1.655-1.62Zm55.319 10.44 4.59 4.494a1.047 1.047 0 0 1 0 1.506l-20.694 20.26a1.128 1.128 0 0 1-1.568 0l-14.686-14.38a.907.907 0 0 0-1.267 0L32.68 70.655a1.128 1.128 0 0 1-1.568 0L10.42 50.394a1.047 1.047 0 0 1 0-1.506l4.59-4.493a1.128 1.128 0 0 1 1.567 0l14.687 14.379a.907.907 0 0 0 1.266 0l-.35-.357.35.357 14.686-14.38a1.128 1.128 0 0 1 1.568 0l14.687 14.38a.907.907 0 0 0 1.267 0l14.686-14.38a1.128 1.128 0 0 1 1.568 0Z"/></svg>`, BACK_ICON: b`<svg width="10" height="18" viewBox="0 0 10 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.735.179a.75.75 0 0 1 .087 1.057L2.92 8.192a1.25 1.25 0 0 0 0 1.617l5.902 6.956a.75.75 0 1 1-1.144.97L1.776 10.78a2.75 2.75 0 0 1 0-3.559L7.678.265A.75.75 0 0 1 8.735.18Z" fill="#fff"/></svg>`, COPY_ICON: b`<svg width="24" height="24" fill="none"><path fill="#fff" fill-rule="evenodd" d="M7.01 7.01c.03-1.545.138-2.5.535-3.28A5 5 0 0 1 9.73 1.545C10.8 1 12.2 1 15 1c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C23 4.8 23 6.2 23 9c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185c-.78.397-1.735.505-3.28.534l-.001.01c-.03 1.54-.138 2.493-.534 3.27a5 5 0 0 1-2.185 2.186C13.2 23 11.8 23 9 23c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C1 19.2 1 17.8 1 15c0-2.8 0-4.2.545-5.27A5 5 0 0 1 3.73 7.545C4.508 7.149 5.46 7.04 7 7.01h.01ZM15 15.5c-1.425 0-2.403-.001-3.162-.063-.74-.06-1.139-.172-1.427-.319a3.5 3.5 0 0 1-1.53-1.529c-.146-.288-.257-.686-.318-1.427C8.501 11.403 8.5 10.425 8.5 9c0-1.425.001-2.403.063-3.162.06-.74.172-1.139.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.146.686-.257 1.427-.318.759-.062 1.737-.063 3.162-.063 1.425 0 2.403.001 3.162.063.74.06 1.139.172 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.759.063 1.737.063 3.162 0 1.425-.001 2.403-.063 3.162-.06.74-.172 1.139-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.146-.686.257-1.427.318-.759.062-1.737.063-3.162.063ZM7 8.511c-.444.009-.825.025-1.162.052-.74.06-1.139.172-1.427.318a3.5 3.5 0 0 0-1.53 1.53c-.146.288-.257.686-.318 1.427-.062.759-.063 1.737-.063 3.162 0 1.425.001 2.403.063 3.162.06.74.172 1.139.318 1.427a3.5 3.5 0 0 0 1.53 1.53c.288.146.686.257 1.427.318.759.062 1.737.063 3.162.063 1.425 0 2.403-.001 3.162-.063.74-.06 1.139-.172 1.427-.319a3.5 3.5 0 0 0 1.53-1.53c.146-.287.257-.685.318-1.426.027-.337.043-.718.052-1.162H15c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C7 13.2 7 11.8 7 9v-.489Z" clip-rule="evenodd"/></svg>`, RETRY_ICON: b`<svg width="15" height="16" viewBox="0 0 15 16"><path d="M6.464 2.03A.75.75 0 0 0 5.403.97L2.08 4.293a1 1 0 0 0 0 1.414L5.403 9.03a.75.75 0 0 0 1.06-1.06L4.672 6.177a.25.25 0 0 1 .177-.427h2.085a4 4 0 1 1-3.93 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.7.748a5.501 5.501 0 1 0 5.45-6.248H4.848a.25.25 0 0 1-.177-.427L6.464 2.03Z" fill="#fff"/></svg>`, DESKTOP_ICON: b`<svg width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C2.204 1 3.13 1 4.98 1h6.04c1.85 0 2.775 0 3.466.394a3 3 0 0 1 1.12 1.12C16 3.204 16 4.13 16 5.98v1.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C13.796 12 12.87 12 11.02 12H4.98c-1.85 0-2.775 0-3.466-.394a3 3 0 0 1-1.12-1.12C0 9.796 0 8.87 0 7.02V5.98ZM4.98 2.5h6.04c.953 0 1.568.001 2.034.043.446.04.608.108.69.154a1.5 1.5 0 0 1 .559.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033v1.04c0 .952-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.046-.243.114-.69.154-.466.042-1.08.043-2.033.043H4.98c-.952 0-1.568-.001-2.034-.043-.446-.04-.608-.108-.69-.154a1.5 1.5 0 0 1-.559-.56c-.046-.08-.114-.243-.154-.69-.042-.465-.043-1.08-.043-2.033V5.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.046.243-.114.69-.154.465-.042 1.08-.043 2.033-.043Z" fill="#fff"/><path d="M4 14.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`, MOBILE_ICON: b`<svg width="16" height="16" viewBox="0 0 16 16"><path d="M6.75 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C5.204 0 6.136 0 8 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C13 2.204 13 3.13 13 4.98v6.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C10.796 16 9.864 16 8 16s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C3 13.796 3 12.87 3 11.02V4.98Zm8.5 0v6.04c0 .953-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.046-.08-.114-.243-.154-.69-.042-.466-.043-1.08-.043-2.033V4.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.045.243-.113.693-.154C6.42 1.501 7.041 1.5 8 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033Z" fill="#fff"/></svg>`, ARROW_DOWN_ICON: b`<svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.28 7.47a.75.75 0 0 0-1.06 1.06l5.25 5.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-3.544 3.543a.25.25 0 0 1-.426-.177V.75a.75.75 0 0 0-1.5 0v10.086a.25.25 0 0 1-.427.176L2.28 7.47Z" fill="#fff"/></svg>`, ARROW_UP_RIGHT_ICON: b`<svg width="15" height="14" fill="none"><path d="M4.5 1.75A.75.75 0 0 1 5.25 1H12a1.5 1.5 0 0 1 1.5 1.5v6.75a.75.75 0 0 1-1.5 0V4.164a.25.25 0 0 0-.427-.176L4.061 11.5A.75.75 0 0 1 3 10.44l7.513-7.513a.25.25 0 0 0-.177-.427H5.25a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`, ARROW_RIGHT_ICON: b`<svg width="6" height="14" viewBox="0 0 6 14"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.181 1.099a.75.75 0 0 1 1.024.279l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.257a.75.75 0 1 1-1.303-.744L4.335 7.62a1.25 1.25 0 0 0 0-1.24L1.902 2.122a.75.75 0 0 1 .28-1.023Z" fill="#fff"/></svg>`, QRCODE_ICON: b`<svg width="25" height="24" viewBox="0 0 25 24"><path d="M23.748 9a.748.748 0 0 0 .748-.752c-.018-2.596-.128-4.07-.784-5.22a6 6 0 0 0-2.24-2.24c-1.15-.656-2.624-.766-5.22-.784a.748.748 0 0 0-.752.748c0 .414.335.749.748.752 1.015.007 1.82.028 2.494.088.995.09 1.561.256 1.988.5.7.398 1.28.978 1.679 1.678.243.427.41.993.498 1.988.061.675.082 1.479.09 2.493a.753.753 0 0 0 .75.749ZM3.527.788C4.677.132 6.152.022 8.747.004A.748.748 0 0 1 9.5.752a.753.753 0 0 1-.749.752c-1.014.007-1.818.028-2.493.088-.995.09-1.561.256-1.988.5-.7.398-1.28.978-1.679 1.678-.243.427-.41.993-.499 1.988-.06.675-.081 1.479-.088 2.493A.753.753 0 0 1 1.252 9a.748.748 0 0 1-.748-.752c.018-2.596.128-4.07.784-5.22a6 6 0 0 1 2.24-2.24ZM1.252 15a.748.748 0 0 0-.748.752c.018 2.596.128 4.07.784 5.22a6 6 0 0 0 2.24 2.24c1.15.656 2.624.766 5.22.784a.748.748 0 0 0 .752-.748.753.753 0 0 0-.749-.752c-1.014-.007-1.818-.028-2.493-.089-.995-.089-1.561-.255-1.988-.498a4.5 4.5 0 0 1-1.679-1.68c-.243-.426-.41-.992-.499-1.987-.06-.675-.081-1.479-.088-2.493A.753.753 0 0 0 1.252 15ZM22.996 15.749a.753.753 0 0 1 .752-.749c.415 0 .751.338.748.752-.018 2.596-.128 4.07-.784 5.22a6 6 0 0 1-2.24 2.24c-1.15.656-2.624.766-5.22.784a.748.748 0 0 1-.752-.748c0-.414.335-.749.748-.752 1.015-.007 1.82-.028 2.494-.089.995-.089 1.561-.255 1.988-.498a4.5 4.5 0 0 0 1.679-1.68c.243-.426.41-.992.498-1.987.061-.675.082-1.479.09-2.493Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 4a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 11h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 4H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1ZM13.5 6.5A2.5 2.5 0 0 1 16 4h2a2.5 2.5 0 0 1 2.5 2.5v2A2.5 2.5 0 0 1 18 11h-2a2.5 2.5 0 0 1-2.5-2.5v-2Zm2.5-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1ZM7 13a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 20h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 13H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" fill="#fff"/><path d="M13.5 15.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C15.303 13 15.535 13 16 13v2.5h-2.5ZM18 13c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89H18V13ZM18 17.5h2.5c0 .465 0 .697-.038.89a2 2 0 0 1-1.572 1.572C18.697 20 18.465 20 18 20v-2.5ZM13.5 17.5H16V20c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572c-.038-.193-.038-.425-.038-.89Z" fill="#fff"/></svg>`, SCAN_ICON: b`<svg width="16" height="16" fill="none"><path fill="#fff" d="M10 15.216c0 .422.347.763.768.74 1.202-.064 2.025-.222 2.71-.613a5.001 5.001 0 0 0 1.865-1.866c.39-.684.549-1.507.613-2.709a.735.735 0 0 0-.74-.768.768.768 0 0 0-.76.732c-.009.157-.02.306-.032.447-.073.812-.206 1.244-.384 1.555-.31.545-.761.996-1.306 1.306-.311.178-.743.311-1.555.384-.141.013-.29.023-.447.032a.768.768 0 0 0-.732.76ZM10 .784c0 .407.325.737.732.76.157.009.306.02.447.032.812.073 1.244.206 1.555.384a3.5 3.5 0 0 1 1.306 1.306c.178.311.311.743.384 1.555.013.142.023.29.032.447a.768.768 0 0 0 .76.732.734.734 0 0 0 .74-.768c-.064-1.202-.222-2.025-.613-2.71A5 5 0 0 0 13.477.658c-.684-.39-1.507-.549-2.709-.613a.735.735 0 0 0-.768.74ZM5.232.044A.735.735 0 0 1 6 .784a.768.768 0 0 1-.732.76c-.157.009-.305.02-.447.032-.812.073-1.244.206-1.555.384A3.5 3.5 0 0 0 1.96 3.266c-.178.311-.311.743-.384 1.555-.013.142-.023.29-.032.447A.768.768 0 0 1 .784 6a.735.735 0 0 1-.74-.768c.064-1.202.222-2.025.613-2.71A5 5 0 0 1 2.523.658C3.207.267 4.03.108 5.233.044ZM5.268 14.456a.768.768 0 0 1 .732.76.734.734 0 0 1-.768.74c-1.202-.064-2.025-.222-2.71-.613a5 5 0 0 1-1.865-1.866c-.39-.684-.549-1.507-.613-2.709A.735.735 0 0 1 .784 10c.407 0 .737.325.76.732.009.157.02.306.032.447.073.812.206 1.244.384 1.555a3.5 3.5 0 0 0 1.306 1.306c.311.178.743.311 1.555.384.142.013.29.023.447.032Z"/></svg>`, CHECKMARK_ICON: b`<svg width="13" height="12" viewBox="0 0 13 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.155.132a.75.75 0 0 1 .232 1.035L5.821 11.535a1 1 0 0 1-1.626.09L.665 7.21a.75.75 0 1 1 1.17-.937L4.71 9.867a.25.25 0 0 0 .406-.023L11.12.364a.75.75 0 0 1 1.035-.232Z" fill="#fff"/></svg>`, SEARCH_ICON: b`<svg width="20" height="21"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.432 13.992c-.354-.353-.91-.382-1.35-.146a5.5 5.5 0 1 1 2.265-2.265c-.237.441-.208.997.145 1.35l3.296 3.296a.75.75 0 1 1-1.06 1.061l-3.296-3.296Zm.06-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#949E9E"/></svg>`, WALLET_PLACEHOLDER: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#q)"><path id="wallet-placeholder-fill" fill="#fff" d="M0 24.9c0-9.251 0-13.877 1.97-17.332a15 15 0 0 1 5.598-5.597C11.023 0 15.648 0 24.9 0h10.2c9.252 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.023 60 15.648 60 24.9v10.2c0 9.252 0 13.877-1.97 17.332a15.001 15.001 0 0 1-5.598 5.597C48.977 60 44.352 60 35.1 60H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.352 0 35.1V24.9Z"/><path id="wallet-placeholder-dash" stroke="#000" stroke-dasharray="4 4" stroke-width="1.5" d="M.04 41.708a231.598 231.598 0 0 1-.039-4.403l.75-.001L.75 35.1v-2.55H0v-5.1h.75V24.9l.001-2.204h-.75c.003-1.617.011-3.077.039-4.404l.75.016c.034-1.65.099-3.08.218-4.343l-.746-.07c.158-1.678.412-3.083.82-4.316l.713.236c.224-.679.497-1.296.827-1.875a14.25 14.25 0 0 1 1.05-1.585L3.076 5.9A15 15 0 0 1 5.9 3.076l.455.596a14.25 14.25 0 0 1 1.585-1.05c.579-.33 1.196-.603 1.875-.827l-.236-.712C10.812.674 12.217.42 13.895.262l.07.746C15.23.89 16.66.824 18.308.79l-.016-.75C19.62.012 21.08.004 22.695.001l.001.75L24.9.75h2.55V0h5.1v.75h2.55l2.204.001v-.75c1.617.003 3.077.011 4.404.039l-.016.75c1.65.034 3.08.099 4.343.218l.07-.746c1.678.158 3.083.412 4.316.82l-.236.713c.679.224 1.296.497 1.875.827a14.24 14.24 0 0 1 1.585 1.05l.455-.596A14.999 14.999 0 0 1 56.924 5.9l-.596.455c.384.502.735 1.032 1.05 1.585.33.579.602 1.196.827 1.875l.712-.236c.409 1.233.663 2.638.822 4.316l-.747.07c.119 1.264.184 2.694.218 4.343l.75-.016c.028 1.327.036 2.787.039 4.403l-.75.001.001 2.204v2.55H60v5.1h-.75v2.55l-.001 2.204h.75a231.431 231.431 0 0 1-.039 4.404l-.75-.016c-.034 1.65-.099 3.08-.218 4.343l.747.07c-.159 1.678-.413 3.083-.822 4.316l-.712-.236a10.255 10.255 0 0 1-.827 1.875 14.242 14.242 0 0 1-1.05 1.585l.596.455a14.997 14.997 0 0 1-2.824 2.824l-.455-.596c-.502.384-1.032.735-1.585 1.05-.579.33-1.196.602-1.875.827l.236.712c-1.233.409-2.638.663-4.316.822l-.07-.747c-1.264.119-2.694.184-4.343.218l.016.75c-1.327.028-2.787.036-4.403.039l-.001-.75-2.204.001h-2.55V60h-5.1v-.75H24.9l-2.204-.001v.75a231.431 231.431 0 0 1-4.404-.039l.016-.75c-1.65-.034-3.08-.099-4.343-.218l-.07.747c-1.678-.159-3.083-.413-4.316-.822l.236-.712a10.258 10.258 0 0 1-1.875-.827 14.252 14.252 0 0 1-1.585-1.05l-.455.596A14.999 14.999 0 0 1 3.076 54.1l.596-.455a14.24 14.24 0 0 1-1.05-1.585 10.259 10.259 0 0 1-.827-1.875l-.712.236C.674 49.188.42 47.783.262 46.105l.746-.07C.89 44.77.824 43.34.79 41.692l-.75.016Z"/><path fill="#fff" fill-rule="evenodd" d="M35.643 32.145c-.297-.743-.445-1.114-.401-1.275a.42.42 0 0 1 .182-.27c.134-.1.463-.1 1.123-.1.742 0 1.499.046 2.236-.05a6 6 0 0 0 5.166-5.166c.051-.39.051-.855.051-1.784 0-.928 0-1.393-.051-1.783a6 6 0 0 0-5.166-5.165c-.39-.052-.854-.052-1.783-.052h-7.72c-4.934 0-7.401 0-9.244 1.051a8 8 0 0 0-2.985 2.986C16.057 22.28 16.003 24.58 16 29 15.998 31.075 16 33.15 16 35.224A7.778 7.778 0 0 0 23.778 43H28.5c1.394 0 2.09 0 2.67-.116a6 6 0 0 0 4.715-4.714c.115-.58.115-1.301.115-2.744 0-1.31 0-1.964-.114-2.49a4.998 4.998 0 0 0-.243-.792Z" clip-rule="evenodd"/><path fill="#9EA9A9" fill-rule="evenodd" d="M37 18h-7.72c-2.494 0-4.266.002-5.647.126-1.361.122-2.197.354-2.854.728a6.5 6.5 0 0 0-2.425 2.426c-.375.657-.607 1.492-.729 2.853-.11 1.233-.123 2.777-.125 4.867 0 .7 0 1.05.097 1.181.096.13.182.181.343.2.163.02.518-.18 1.229-.581a6.195 6.195 0 0 1 3.053-.8H37c.977 0 1.32-.003 1.587-.038a4.5 4.5 0 0 0 3.874-3.874c.036-.268.039-.611.039-1.588 0-.976-.003-1.319-.038-1.587a4.5 4.5 0 0 0-3.875-3.874C38.32 18.004 37.977 18 37 18Zm-7.364 12.5h-7.414a4.722 4.722 0 0 0-4.722 4.723 6.278 6.278 0 0 0 6.278 6.278H28.5c1.466 0 1.98-.008 2.378-.087a4.5 4.5 0 0 0 3.535-3.536c.08-.397.087-.933.087-2.451 0-1.391-.009-1.843-.08-2.17a3.5 3.5 0 0 0-2.676-2.676c-.328-.072-.762-.08-2.108-.08Z" clip-rule="evenodd"/></g><defs><clipPath id="q"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, GLOBE_ICON: b`<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-2.113.75c.301 0 .535.264.47.558a6.01 6.01 0 0 1-2.867 3.896c-.203.116-.42-.103-.334-.32.409-1.018.691-2.274.797-3.657a.512.512 0 0 1 .507-.477h1.427Zm.47-2.058c.065.294-.169.558-.47.558H11.96a.512.512 0 0 1-.507-.477c-.106-1.383-.389-2.638-.797-3.656-.087-.217.13-.437.333-.32a6.01 6.01 0 0 1 2.868 3.895Zm-4.402.558c.286 0 .515-.24.49-.525-.121-1.361-.429-2.534-.83-3.393-.279-.6-.549-.93-.753-1.112a.535.535 0 0 0-.724 0c-.204.182-.474.513-.754 1.112-.4.859-.708 2.032-.828 3.393a.486.486 0 0 0 .49.525h2.909Zm-5.415 0c.267 0 .486-.21.507-.477.106-1.383.389-2.638.797-3.656.087-.217-.13-.437-.333-.32a6.01 6.01 0 0 0-2.868 3.895c-.065.294.169.558.47.558H4.04ZM2.143 9.308c-.065-.294.169-.558.47-.558H4.04c.267 0 .486.21.507.477.106 1.383.389 2.639.797 3.657.087.217-.13.436-.333.32a6.01 6.01 0 0 1-2.868-3.896Zm3.913-.033a.486.486 0 0 1 .49-.525h2.909c.286 0 .515.24.49.525-.121 1.361-.428 2.535-.83 3.394-.279.6-.549.93-.753 1.112a.535.535 0 0 1-.724 0c-.204-.182-.474-.513-.754-1.112-.4-.859-.708-2.033-.828-3.394Z" clip-rule="evenodd"/></svg>` };
    pt = i`.wcm-toolbar-placeholder{top:0;bottom:0;left:0;right:0;width:100%;position:absolute;display:block;pointer-events:none;height:100px;border-radius:calc(var(--wcm-background-border-radius) * .9);background-color:var(--wcm-background-color);background-position:center;background-size:cover}.wcm-toolbar{height:38px;display:flex;position:relative;margin:5px 15px 5px 5px;justify-content:space-between;align-items:center}.wcm-toolbar img,.wcm-toolbar svg{height:28px;object-position:left center;object-fit:contain}#wcm-wc-logo path{fill:var(--wcm-accent-fill-color)}button{width:28px;height:28px;border-radius:var(--wcm-icon-button-border-radius);border:0;display:flex;justify-content:center;align-items:center;cursor:pointer;background-color:var(--wcm-color-bg-1);box-shadow:0 0 0 1px var(--wcm-color-overlay)}button:active{background-color:var(--wcm-color-bg-2)}button svg{display:block;object-position:center}button path{fill:var(--wcm-color-fg-1)}.wcm-toolbar div{display:flex}@media(hover:hover){button:hover{background-color:var(--wcm-color-bg-2)}}`;
    gt = Object.defineProperty;
    vt = Object.getOwnPropertyDescriptor;
    ut = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? vt(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && gt(o7, r4, t5), t5;
    };
    fe = class extends s4 {
      render() {
        return x`<div class="wcm-toolbar-placeholder"></div><div class="wcm-toolbar">${v2.WALLET_CONNECT_LOGO} <button @click="${se.close}">${v2.CROSS_ICON}</button></div>`;
      }
    };
    fe.styles = [h3.globalCss, pt], fe = ut([e4("wcm-modal-backcard")], fe);
    bt = i`main{padding:20px;padding-top:0;width:100%}`;
    ft = Object.defineProperty;
    xt = Object.getOwnPropertyDescriptor;
    yt = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? xt(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && ft(o7, r4, t5), t5;
    };
    xe = class extends s4 {
      render() {
        return x`<main><slot></slot></main>`;
      }
    };
    xe.styles = [h3.globalCss, bt], xe = yt([e4("wcm-modal-content")], xe);
    $t = i`footer{padding:10px;display:flex;flex-direction:column;align-items:inherit;justify-content:inherit;border-top:1px solid var(--wcm-color-bg-2)}`;
    Ct = Object.defineProperty;
    kt = Object.getOwnPropertyDescriptor;
    Ot = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? kt(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Ct(o7, r4, t5), t5;
    };
    ye = class extends s4 {
      render() {
        return x`<footer><slot></slot></footer>`;
      }
    };
    ye.styles = [h3.globalCss, $t], ye = Ot([e4("wcm-modal-footer")], ye);
    Wt = i`header{display:flex;justify-content:center;align-items:center;padding:20px;position:relative}.wcm-border{border-bottom:1px solid var(--wcm-color-bg-2);margin-bottom:20px}header button{padding:15px 20px}header button:active{opacity:.5}@media(hover:hover){header button:hover{opacity:.5}}.wcm-back-btn{position:absolute;left:0}.wcm-action-btn{position:absolute;right:0}path{fill:var(--wcm-accent-color)}`;
    It = Object.defineProperty;
    Et = Object.getOwnPropertyDescriptor;
    te2 = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Et(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && It(o7, r4, t5), t5;
    };
    S3 = class extends s4 {
      constructor() {
        super(...arguments), this.title = "", this.onAction = void 0, this.actionIcon = void 0, this.border = false;
      }
      backBtnTemplate() {
        return x`<button class="wcm-back-btn" @click="${T.goBack}">${v2.BACK_ICON}</button>`;
      }
      actionBtnTemplate() {
        return x`<button class="wcm-action-btn" @click="${this.onAction}">${this.actionIcon}</button>`;
      }
      render() {
        const e8 = { "wcm-border": this.border }, o7 = T.state.history.length > 1, r4 = this.title ? x`<wcm-text variant="big-bold">${this.title}</wcm-text>` : x`<slot></slot>`;
        return x`<header class="${o6(e8)}">${o7 ? this.backBtnTemplate() : null} ${r4} ${this.onAction ? this.actionBtnTemplate() : null}</header>`;
      }
    };
    S3.styles = [h3.globalCss, Wt], te2([n5()], S3.prototype, "title", 2), te2([n5()], S3.prototype, "onAction", 2), te2([n5()], S3.prototype, "actionIcon", 2), te2([n5({ type: Boolean })], S3.prototype, "border", 2), S3 = te2([e4("wcm-modal-header")], S3);
    c3 = { MOBILE_BREAKPOINT: 600, WCM_RECENT_WALLET_DATA: "WCM_RECENT_WALLET_DATA", EXPLORER_WALLET_URL: "https://explorer.walletconnect.com/?type=wallet", getShadowRootElement(e8, o7) {
      const r4 = e8.renderRoot.querySelector(o7);
      if (!r4)
        throw new Error(`${o7} not found`);
      return r4;
    }, getWalletIcon({ id: e8, image_id: o7 }) {
      const { walletImages: r4 } = y.state;
      return r4 != null && r4[e8] ? r4[e8] : o7 ? te.getWalletImageUrl(o7) : "";
    }, getWalletName(e8, o7 = false) {
      return o7 && e8.length > 8 ? `${e8.substring(0, 8)}..` : e8;
    }, isMobileAnimation() {
      return window.innerWidth <= c3.MOBILE_BREAKPOINT;
    }, async preloadImage(e8) {
      const o7 = new Promise((r4, a4) => {
        const t5 = new Image();
        t5.onload = r4, t5.onerror = a4, t5.crossOrigin = "anonymous", t5.src = e8;
      });
      return Promise.race([o7, a.wait(3e3)]);
    }, getErrorMessage(e8) {
      return e8 instanceof Error ? e8.message : "Unknown Error";
    }, debounce(e8, o7 = 500) {
      let r4;
      return (...a4) => {
        function t5() {
          e8(...a4);
        }
        r4 && clearTimeout(r4), r4 = setTimeout(t5, o7);
      };
    }, handleMobileLinking(e8) {
      const { walletConnectUri: o7 } = p.state, { mobile: r4, name: a4 } = e8, t5 = r4?.native, l6 = r4?.universal;
      c3.setRecentWallet(e8);
      function i5(s5) {
        let $2 = "";
        t5 ? $2 = a.formatUniversalUrl(t5, s5, a4) : l6 && ($2 = a.formatNativeUrl(l6, s5, a4)), a.openHref($2, "_self");
      }
      o7 && i5(o7);
    }, handleAndroidLinking() {
      const { walletConnectUri: e8 } = p.state;
      e8 && (a.setWalletConnectAndroidDeepLink(e8), a.openHref(e8, "_self"));
    }, async handleUriCopy() {
      const { walletConnectUri: e8 } = p.state;
      if (e8)
        try {
          await navigator.clipboard.writeText(e8), oe.openToast("Link copied", "success");
        } catch {
          oe.openToast("Failed to copy", "error");
        }
    }, getCustomImageUrls() {
      const { walletImages: e8 } = y.state, o7 = Object.values(e8 ?? {});
      return Object.values(o7);
    }, truncate(e8, o7 = 8) {
      return e8.length <= o7 ? e8 : `${e8.substring(0, 4)}...${e8.substring(e8.length - 4)}`;
    }, setRecentWallet(e8) {
      try {
        localStorage.setItem(c3.WCM_RECENT_WALLET_DATA, JSON.stringify(e8));
      } catch {
        console.info("Unable to set recent wallet");
      }
    }, getRecentWallet() {
      try {
        const e8 = localStorage.getItem(c3.WCM_RECENT_WALLET_DATA);
        return e8 ? JSON.parse(e8) : void 0;
      } catch {
        console.info("Unable to get recent wallet");
      }
    }, caseSafeIncludes(e8, o7) {
      return e8.toUpperCase().includes(o7.toUpperCase());
    }, openWalletExplorerUrl() {
      a.openHref(c3.EXPLORER_WALLET_URL, "_blank");
    }, getCachedRouterWalletPlatforms() {
      const { desktop: e8, mobile: o7 } = a.getWalletRouterData(), r4 = Boolean(e8?.native), a4 = Boolean(e8?.universal), t5 = Boolean(o7?.native) || Boolean(o7?.universal);
      return { isDesktop: r4, isMobile: t5, isWeb: a4 };
    }, goToConnectingView(e8) {
      T.setData({ Wallet: e8 });
      const o7 = a.isMobile(), { isDesktop: r4, isWeb: a4, isMobile: t5 } = c3.getCachedRouterWalletPlatforms();
      o7 ? t5 ? T.push("MobileConnecting") : a4 ? T.push("WebConnecting") : T.push("InstallWallet") : r4 ? T.push("DesktopConnecting") : a4 ? T.push("WebConnecting") : t5 ? T.push("MobileQrcodeConnecting") : T.push("InstallWallet");
    } };
    Mt = i`.wcm-router{overflow:hidden;will-change:transform}.wcm-content{display:flex;flex-direction:column}`;
    Lt = Object.defineProperty;
    Rt = Object.getOwnPropertyDescriptor;
    $e = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Rt(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Lt(o7, r4, t5), t5;
    };
    oe2 = class extends s4 {
      constructor() {
        super(), this.view = T.state.view, this.prevView = T.state.view, this.unsubscribe = void 0, this.oldHeight = "0px", this.resizeObserver = void 0, this.unsubscribe = T.subscribe((e8) => {
          this.view !== e8.view && this.onChangeRoute();
        });
      }
      firstUpdated() {
        this.resizeObserver = new ResizeObserver(([e8]) => {
          const o7 = `${e8.contentRect.height}px`;
          this.oldHeight !== "0px" && animate2(this.routerEl, { height: [this.oldHeight, o7] }, { duration: 0.2 }), this.oldHeight = o7;
        }), this.resizeObserver.observe(this.contentEl);
      }
      disconnectedCallback() {
        var e8, o7;
        (e8 = this.unsubscribe) == null || e8.call(this), (o7 = this.resizeObserver) == null || o7.disconnect();
      }
      get routerEl() {
        return c3.getShadowRootElement(this, ".wcm-router");
      }
      get contentEl() {
        return c3.getShadowRootElement(this, ".wcm-content");
      }
      viewTemplate() {
        switch (this.view) {
          case "ConnectWallet":
            return x`<wcm-connect-wallet-view></wcm-connect-wallet-view>`;
          case "DesktopConnecting":
            return x`<wcm-desktop-connecting-view></wcm-desktop-connecting-view>`;
          case "MobileConnecting":
            return x`<wcm-mobile-connecting-view></wcm-mobile-connecting-view>`;
          case "WebConnecting":
            return x`<wcm-web-connecting-view></wcm-web-connecting-view>`;
          case "MobileQrcodeConnecting":
            return x`<wcm-mobile-qr-connecting-view></wcm-mobile-qr-connecting-view>`;
          case "WalletExplorer":
            return x`<wcm-wallet-explorer-view></wcm-wallet-explorer-view>`;
          case "Qrcode":
            return x`<wcm-qrcode-view></wcm-qrcode-view>`;
          case "InstallWallet":
            return x`<wcm-install-wallet-view></wcm-install-wallet-view>`;
          default:
            return x`<div>Not Found</div>`;
        }
      }
      async onChangeRoute() {
        await animate2(this.routerEl, { opacity: [1, 0], scale: [1, 1.02] }, { duration: 0.15, delay: 0.1 }).finished, this.view = T.state.view, animate2(this.routerEl, { opacity: [0, 1], scale: [0.99, 1] }, { duration: 0.37, delay: 0.05 });
      }
      render() {
        return x`<div class="wcm-router"><div class="wcm-content">${this.viewTemplate()}</div></div>`;
      }
    };
    oe2.styles = [h3.globalCss, Mt], $e([t3()], oe2.prototype, "view", 2), $e([t3()], oe2.prototype, "prevView", 2), oe2 = $e([e4("wcm-modal-router")], oe2);
    At = i`div{height:36px;width:max-content;display:flex;justify-content:center;align-items:center;padding:9px 15px 11px;position:absolute;top:12px;box-shadow:0 6px 14px -6px rgba(10,16,31,.3),0 10px 32px -4px rgba(10,16,31,.15);z-index:2;left:50%;transform:translateX(-50%);pointer-events:none;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);border-radius:var(--wcm-notification-border-radius);border:1px solid var(--wcm-color-overlay);background-color:var(--wcm-color-overlay)}svg{margin-right:5px}@-moz-document url-prefix(){div{background-color:var(--wcm-color-bg-3)}}.wcm-success path{fill:var(--wcm-accent-color)}.wcm-error path{fill:var(--wcm-error-color)}`;
    Pt = Object.defineProperty;
    Tt = Object.getOwnPropertyDescriptor;
    ze = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Tt(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Pt(o7, r4, t5), t5;
    };
    ne2 = class extends s4 {
      constructor() {
        super(), this.open = false, this.unsubscribe = void 0, this.timeout = void 0, this.unsubscribe = oe.subscribe((e8) => {
          e8.open ? (this.open = true, this.timeout = setTimeout(() => oe.closeToast(), 2200)) : (this.open = false, clearTimeout(this.timeout));
        });
      }
      disconnectedCallback() {
        var e8;
        (e8 = this.unsubscribe) == null || e8.call(this), clearTimeout(this.timeout), oe.closeToast();
      }
      render() {
        const { message: e8, variant: o7 } = oe.state, r4 = { "wcm-success": o7 === "success", "wcm-error": o7 === "error" };
        return this.open ? x`<div class="${o6(r4)}">${o7 === "success" ? v2.CHECKMARK_ICON : null} ${o7 === "error" ? v2.CROSS_ICON : null}<wcm-text variant="small-regular">${e8}</wcm-text></div>` : null;
      }
    };
    ne2.styles = [h3.globalCss, At], ze([t3()], ne2.prototype, "open", 2), ne2 = ze([e4("wcm-modal-toast")], ne2);
    jt = 0.1;
    Ve = 2.5;
    A2 = 7;
    Dt = { generate(e8, o7, r4) {
      const a4 = "#141414", t5 = "#ffffff", l6 = [], i5 = _t(e8, "Q"), s5 = o7 / i5.length, $2 = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
      $2.forEach(({ x: y3, y: u3 }) => {
        const O = (i5.length - A2) * s5 * y3, b2 = (i5.length - A2) * s5 * u3, E2 = 0.45;
        for (let M2 = 0; M2 < $2.length; M2 += 1) {
          const V2 = s5 * (A2 - M2 * 2);
          l6.push(b`<rect fill="${M2 % 2 === 0 ? a4 : t5}" height="${V2}" rx="${V2 * E2}" ry="${V2 * E2}" width="${V2}" x="${O + s5 * M2}" y="${b2 + s5 * M2}">`);
        }
      });
      const f2 = Math.floor((r4 + 25) / s5), Ne = i5.length / 2 - f2 / 2, Ze = i5.length / 2 + f2 / 2 - 1, Se = [];
      i5.forEach((y3, u3) => {
        y3.forEach((O, b2) => {
          if (i5[u3][b2] && !(u3 < A2 && b2 < A2 || u3 > i5.length - (A2 + 1) && b2 < A2 || u3 < A2 && b2 > i5.length - (A2 + 1)) && !(u3 > Ne && u3 < Ze && b2 > Ne && b2 < Ze)) {
            const E2 = u3 * s5 + s5 / 2, M2 = b2 * s5 + s5 / 2;
            Se.push([E2, M2]);
          }
        });
      });
      const J = {};
      return Se.forEach(([y3, u3]) => {
        J[y3] ? J[y3].push(u3) : J[y3] = [u3];
      }), Object.entries(J).map(([y3, u3]) => {
        const O = u3.filter((b2) => u3.every((E2) => !Ce(b2, E2, s5)));
        return [Number(y3), O];
      }).forEach(([y3, u3]) => {
        u3.forEach((O) => {
          l6.push(b`<circle cx="${y3}" cy="${O}" fill="${a4}" r="${s5 / Ve}">`);
        });
      }), Object.entries(J).filter(([y3, u3]) => u3.length > 1).map(([y3, u3]) => {
        const O = u3.filter((b2) => u3.some((E2) => Ce(b2, E2, s5)));
        return [Number(y3), O];
      }).map(([y3, u3]) => {
        u3.sort((b2, E2) => b2 < E2 ? -1 : 1);
        const O = [];
        for (const b2 of u3) {
          const E2 = O.find((M2) => M2.some((V2) => Ce(b2, V2, s5)));
          E2 ? E2.push(b2) : O.push([b2]);
        }
        return [y3, O.map((b2) => [b2[0], b2[b2.length - 1]])];
      }).forEach(([y3, u3]) => {
        u3.forEach(([O, b2]) => {
          l6.push(b`<line x1="${y3}" x2="${y3}" y1="${O}" y2="${b2}" stroke="${a4}" stroke-width="${s5 / (Ve / 2)}" stroke-linecap="round">`);
        });
      }), l6;
    } };
    Nt = i`@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}div{position:relative;user-select:none;display:block;overflow:hidden;aspect-ratio:1/1;animation:fadeIn ease .2s}.wcm-dark{background-color:#fff;border-radius:var(--wcm-container-border-radius);padding:18px;box-shadow:0 2px 5px #000}svg:first-child,wcm-wallet-image{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%)}wcm-wallet-image{transform:translateY(-50%) translateX(-50%)}wcm-wallet-image{width:25%;height:25%;border-radius:var(--wcm-wallet-icon-border-radius)}svg:first-child{transform:translateY(-50%) translateX(-50%) scale(.9)}svg:first-child path:first-child{fill:var(--wcm-accent-color)}svg:first-child path:last-child{stroke:var(--wcm-color-overlay)}`;
    Zt = Object.defineProperty;
    St = Object.getOwnPropertyDescriptor;
    q = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? St(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Zt(o7, r4, t5), t5;
    };
    j = class extends s4 {
      constructor() {
        super(...arguments), this.uri = "", this.size = 0, this.imageId = void 0, this.walletId = void 0, this.imageUrl = void 0;
      }
      svgTemplate() {
        const e8 = ne.state.themeMode === "light" ? this.size : this.size - 36;
        return b`<svg height="${e8}" width="${e8}">${Dt.generate(this.uri, e8, e8 / 4)}</svg>`;
      }
      render() {
        const e8 = { "wcm-dark": ne.state.themeMode === "dark" };
        return x`<div style="${`width: ${this.size}px`}" class="${o6(e8)}">${this.walletId || this.imageUrl ? x`<wcm-wallet-image walletId="${l5(this.walletId)}" imageId="${l5(this.imageId)}" imageUrl="${l5(this.imageUrl)}"></wcm-wallet-image>` : v2.WALLET_CONNECT_ICON_COLORED} ${this.svgTemplate()}</div>`;
      }
    };
    j.styles = [h3.globalCss, Nt], q([n5()], j.prototype, "uri", 2), q([n5({ type: Number })], j.prototype, "size", 2), q([n5()], j.prototype, "imageId", 2), q([n5()], j.prototype, "walletId", 2), q([n5()], j.prototype, "imageUrl", 2), j = q([e4("wcm-qrcode")], j);
    Bt = i`:host{position:relative;height:28px;width:80%}input{width:100%;height:100%;line-height:28px!important;border-radius:var(--wcm-input-border-radius);font-style:normal;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',sans-serif;font-feature-settings:'case' on;font-weight:500;font-size:16px;letter-spacing:-.03em;padding:0 10px 0 34px;transition:.2s all ease;color:var(--wcm-color-fg-1);background-color:var(--wcm-color-bg-3);box-shadow:inset 0 0 0 1px var(--wcm-color-overlay);caret-color:var(--wcm-accent-color)}input::placeholder{color:var(--wcm-color-fg-2)}svg{left:10px;top:4px;pointer-events:none;position:absolute;width:20px;height:20px}input:focus-within{box-shadow:inset 0 0 0 1px var(--wcm-accent-color)}path{fill:var(--wcm-color-fg-2)}`;
    Ut = Object.defineProperty;
    Ht = Object.getOwnPropertyDescriptor;
    Fe = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Ht(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Ut(o7, r4, t5), t5;
    };
    ce = class extends s4 {
      constructor() {
        super(...arguments), this.onChange = () => null;
      }
      render() {
        return x`<input type="text" @input="${this.onChange}" placeholder="Search wallets"> ${v2.SEARCH_ICON}`;
      }
    };
    ce.styles = [h3.globalCss, Bt], Fe([n5()], ce.prototype, "onChange", 2), ce = Fe([e4("wcm-search-input")], ce);
    zt = i`@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}svg{animation:rotate 2s linear infinite;display:flex;justify-content:center;align-items:center}svg circle{stroke-linecap:round;animation:dash 1.5s ease infinite;stroke:var(--wcm-accent-color)}`;
    Vt = Object.defineProperty;
    Ft = Object.getOwnPropertyDescriptor;
    qt = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Ft(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Vt(o7, r4, t5), t5;
    };
    ke = class extends s4 {
      render() {
        return x`<svg viewBox="0 0 50 50" width="24" height="24"><circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#fff"/></svg>`;
      }
    };
    ke.styles = [h3.globalCss, zt], ke = qt([e4("wcm-spinner")], ke);
    Qt = i`span{font-style:normal;font-family:var(--wcm-font-family);font-feature-settings:var(--wcm-font-feature-settings)}.wcm-xsmall-bold{font-family:var(--wcm-text-xsmall-bold-font-family);font-weight:var(--wcm-text-xsmall-bold-weight);font-size:var(--wcm-text-xsmall-bold-size);line-height:var(--wcm-text-xsmall-bold-line-height);letter-spacing:var(--wcm-text-xsmall-bold-letter-spacing);text-transform:var(--wcm-text-xsmall-bold-text-transform)}.wcm-xsmall-regular{font-family:var(--wcm-text-xsmall-regular-font-family);font-weight:var(--wcm-text-xsmall-regular-weight);font-size:var(--wcm-text-xsmall-regular-size);line-height:var(--wcm-text-xsmall-regular-line-height);letter-spacing:var(--wcm-text-xsmall-regular-letter-spacing);text-transform:var(--wcm-text-xsmall-regular-text-transform)}.wcm-small-thin{font-family:var(--wcm-text-small-thin-font-family);font-weight:var(--wcm-text-small-thin-weight);font-size:var(--wcm-text-small-thin-size);line-height:var(--wcm-text-small-thin-line-height);letter-spacing:var(--wcm-text-small-thin-letter-spacing);text-transform:var(--wcm-text-small-thin-text-transform)}.wcm-small-regular{font-family:var(--wcm-text-small-regular-font-family);font-weight:var(--wcm-text-small-regular-weight);font-size:var(--wcm-text-small-regular-size);line-height:var(--wcm-text-small-regular-line-height);letter-spacing:var(--wcm-text-small-regular-letter-spacing);text-transform:var(--wcm-text-small-regular-text-transform)}.wcm-medium-regular{font-family:var(--wcm-text-medium-regular-font-family);font-weight:var(--wcm-text-medium-regular-weight);font-size:var(--wcm-text-medium-regular-size);line-height:var(--wcm-text-medium-regular-line-height);letter-spacing:var(--wcm-text-medium-regular-letter-spacing);text-transform:var(--wcm-text-medium-regular-text-transform)}.wcm-big-bold{font-family:var(--wcm-text-big-bold-font-family);font-weight:var(--wcm-text-big-bold-weight);font-size:var(--wcm-text-big-bold-size);line-height:var(--wcm-text-big-bold-line-height);letter-spacing:var(--wcm-text-big-bold-letter-spacing);text-transform:var(--wcm-text-big-bold-text-transform)}:host(*){color:var(--wcm-color-fg-1)}.wcm-color-primary{color:var(--wcm-color-fg-1)}.wcm-color-secondary{color:var(--wcm-color-fg-2)}.wcm-color-tertiary{color:var(--wcm-color-fg-3)}.wcm-color-inverse{color:var(--wcm-accent-fill-color)}.wcm-color-accnt{color:var(--wcm-accent-color)}.wcm-color-error{color:var(--wcm-error-color)}`;
    Kt = Object.defineProperty;
    Yt = Object.getOwnPropertyDescriptor;
    Oe = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Yt(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Kt(o7, r4, t5), t5;
    };
    re = class extends s4 {
      constructor() {
        super(...arguments), this.variant = "medium-regular", this.color = "primary";
      }
      render() {
        const e8 = { "wcm-big-bold": this.variant === "big-bold", "wcm-medium-regular": this.variant === "medium-regular", "wcm-small-regular": this.variant === "small-regular", "wcm-small-thin": this.variant === "small-thin", "wcm-xsmall-regular": this.variant === "xsmall-regular", "wcm-xsmall-bold": this.variant === "xsmall-bold", "wcm-color-primary": this.color === "primary", "wcm-color-secondary": this.color === "secondary", "wcm-color-tertiary": this.color === "tertiary", "wcm-color-inverse": this.color === "inverse", "wcm-color-accnt": this.color === "accent", "wcm-color-error": this.color === "error" };
        return x`<span><slot class="${o6(e8)}"></slot></span>`;
      }
    };
    re.styles = [h3.globalCss, Qt], Oe([n5()], re.prototype, "variant", 2), Oe([n5()], re.prototype, "color", 2), re = Oe([e4("wcm-text")], re);
    Gt = i`button{width:100%;height:100%;border-radius:var(--wcm-button-hover-highlight-border-radius);display:flex;align-items:flex-start}button:active{background-color:var(--wcm-color-overlay)}@media(hover:hover){button:hover{background-color:var(--wcm-color-overlay)}}button>div{width:80px;padding:5px 0;display:flex;flex-direction:column;align-items:center}wcm-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}wcm-wallet-image{height:60px;width:60px;transition:all .2s ease;border-radius:var(--wcm-wallet-icon-border-radius);margin-bottom:5px}.wcm-sublabel{margin-top:2px}`;
    Xt = Object.defineProperty;
    Jt = Object.getOwnPropertyDescriptor;
    _2 = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Jt(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Xt(o7, r4, t5), t5;
    };
    L2 = class extends s4 {
      constructor() {
        super(...arguments), this.onClick = () => null, this.name = "", this.walletId = "", this.label = void 0, this.imageId = void 0, this.installed = false, this.recent = false;
      }
      sublabelTemplate() {
        return this.recent ? x`<wcm-text class="wcm-sublabel" variant="xsmall-bold" color="tertiary">RECENT</wcm-text>` : this.installed ? x`<wcm-text class="wcm-sublabel" variant="xsmall-bold" color="tertiary">INSTALLED</wcm-text>` : null;
      }
      handleClick() {
        R.click({ name: "WALLET_BUTTON", walletId: this.walletId }), this.onClick();
      }
      render() {
        var e8;
        return x`<button @click="${this.handleClick.bind(this)}"><div><wcm-wallet-image walletId="${this.walletId}" imageId="${l5(this.imageId)}"></wcm-wallet-image><wcm-text variant="xsmall-regular">${(e8 = this.label) != null ? e8 : c3.getWalletName(this.name, true)}</wcm-text>${this.sublabelTemplate()}</div></button>`;
      }
    };
    L2.styles = [h3.globalCss, Gt], _2([n5()], L2.prototype, "onClick", 2), _2([n5()], L2.prototype, "name", 2), _2([n5()], L2.prototype, "walletId", 2), _2([n5()], L2.prototype, "label", 2), _2([n5()], L2.prototype, "imageId", 2), _2([n5({ type: Boolean })], L2.prototype, "installed", 2), _2([n5({ type: Boolean })], L2.prototype, "recent", 2), L2 = _2([e4("wcm-wallet-button")], L2);
    eo = i`:host{display:block}div{overflow:hidden;position:relative;border-radius:inherit;width:100%;height:100%;background-color:var(--wcm-color-overlay)}svg{position:relative;width:100%;height:100%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:inherit;border:1px solid var(--wcm-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
    to = Object.defineProperty;
    oo = Object.getOwnPropertyDescriptor;
    se2 = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? oo(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && to(o7, r4, t5), t5;
    };
    Q = class extends s4 {
      constructor() {
        super(...arguments), this.walletId = "", this.imageId = void 0, this.imageUrl = void 0;
      }
      render() {
        var e8;
        const o7 = (e8 = this.imageUrl) != null && e8.length ? this.imageUrl : c3.getWalletIcon({ id: this.walletId, image_id: this.imageId });
        return x`${o7.length ? x`<div><img crossorigin="anonymous" src="${o7}" alt="${this.id}"></div>` : v2.WALLET_PLACEHOLDER}`;
      }
    };
    Q.styles = [h3.globalCss, eo], se2([n5()], Q.prototype, "walletId", 2), se2([n5()], Q.prototype, "imageId", 2), se2([n5()], Q.prototype, "imageUrl", 2), Q = se2([e4("wcm-wallet-image")], Q);
    ro = Object.defineProperty;
    ao = Object.getOwnPropertyDescriptor;
    qe = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? ao(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && ro(o7, r4, t5), t5;
    };
    We = class extends s4 {
      constructor() {
        super(), this.preload = true, this.preloadData();
      }
      async loadImages(e8) {
        try {
          e8 != null && e8.length && await Promise.all(e8.map(async (o7) => c3.preloadImage(o7)));
        } catch {
          console.info("Unsuccessful attempt at preloading some images", e8);
        }
      }
      async preloadListings() {
        if (y.state.enableExplorer) {
          await te.getRecomendedWallets(), p.setIsDataLoaded(true);
          const { recomendedWallets: e8 } = te.state, o7 = e8.map((r4) => c3.getWalletIcon(r4));
          await this.loadImages(o7);
        } else
          p.setIsDataLoaded(true);
      }
      async preloadCustomImages() {
        const e8 = c3.getCustomImageUrls();
        await this.loadImages(e8);
      }
      async preloadData() {
        try {
          this.preload && (this.preload = false, await Promise.all([this.preloadListings(), this.preloadCustomImages()]));
        } catch (e8) {
          console.error(e8), oe.openToast("Failed preloading", "error");
        }
      }
    };
    qe([t3()], We.prototype, "preload", 2), We = qe([e4("wcm-explorer-context")], We);
    lo = Object.defineProperty;
    io = Object.getOwnPropertyDescriptor;
    no = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? io(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && lo(o7, r4, t5), t5;
    };
    Qe = class extends s4 {
      constructor() {
        super(), this.unsubscribeTheme = void 0, h3.setTheme(), this.unsubscribeTheme = ne.subscribe(h3.setTheme);
      }
      disconnectedCallback() {
        var e8;
        (e8 = this.unsubscribeTheme) == null || e8.call(this);
      }
    };
    Qe = no([e4("wcm-theme-context")], Qe);
    co = i`@keyframes scroll{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(calc(-70px * 9),0,0)}}.wcm-slider{position:relative;overflow-x:hidden;padding:10px 0;margin:0 -20px;width:calc(100% + 40px)}.wcm-track{display:flex;width:calc(70px * 18);animation:scroll 20s linear infinite;opacity:.7}.wcm-track svg{margin:0 5px}wcm-wallet-image{width:60px;height:60px;margin:0 5px;border-radius:var(--wcm-wallet-icon-border-radius)}.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.wcm-title{display:flex;align-items:center;margin-bottom:10px}.wcm-title svg{margin-right:6px}.wcm-title path{fill:var(--wcm-accent-color)}wcm-modal-footer .wcm-title{padding:0 10px}wcm-button-big{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);filter:drop-shadow(0 0 17px var(--wcm-color-bg-1))}wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-info-footer wcm-text{text-align:center;margin-bottom:15px}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
    so = Object.defineProperty;
    mo = Object.getOwnPropertyDescriptor;
    ho = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? mo(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && so(o7, r4, t5), t5;
    };
    Ie = class extends s4 {
      onGoToQrcode() {
        T.push("Qrcode");
      }
      render() {
        const { recomendedWallets: e8 } = te.state, o7 = [...e8, ...e8], r4 = a.RECOMMENDED_WALLET_AMOUNT * 2;
        return x`<wcm-modal-header title="Connect your wallet" .onAction="${this.onGoToQrcode}" .actionIcon="${v2.QRCODE_ICON}"></wcm-modal-header><wcm-modal-content><div class="wcm-title">${v2.MOBILE_ICON}<wcm-text variant="small-regular" color="accent">WalletConnect</wcm-text></div><div class="wcm-slider"><div class="wcm-track">${[...Array(r4)].map((a4, t5) => {
          const l6 = o7[t5 % o7.length];
          return l6 ? x`<wcm-wallet-image walletId="${l6.id}" imageId="${l6.image_id}"></wcm-wallet-image>` : v2.WALLET_PLACEHOLDER;
        })}</div><wcm-button-big @click="${c3.handleAndroidLinking}"><wcm-text variant="medium-regular" color="inverse">Select Wallet</wcm-text></wcm-button-big></div></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">Choose WalletConnect to see supported apps on your device</wcm-text></wcm-info-footer>`;
      }
    };
    Ie.styles = [h3.globalCss, co], Ie = ho([e4("wcm-android-wallet-selection")], Ie);
    wo = i`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:2px;top:0;left:0}use{stroke:var(--wcm-accent-color);animation:loading 1s linear infinite}wcm-wallet-image{border-radius:var(--wcm-wallet-icon-large-border-radius);width:90px;height:90px}wcm-text{margin-bottom:40px}.wcm-error svg{stroke:var(--wcm-error-color)}.wcm-error use{display:none}.wcm-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}.wcm-stale svg,.wcm-stale use{display:none}`;
    po = Object.defineProperty;
    go = Object.getOwnPropertyDescriptor;
    K = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? go(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && po(o7, r4, t5), t5;
    };
    D2 = class extends s4 {
      constructor() {
        super(...arguments), this.walletId = void 0, this.imageId = void 0, this.isError = false, this.isStale = false, this.label = "";
      }
      svgLoaderTemplate() {
        var e8, o7;
        const r4 = (o7 = (e8 = ne.state.themeVariables) == null ? void 0 : e8["--wcm-wallet-icon-large-border-radius"]) != null ? o7 : h3.getPreset("--wcm-wallet-icon-large-border-radius");
        let a4 = 0;
        r4.includes("%") ? a4 = 88 / 100 * parseInt(r4, 10) : a4 = parseInt(r4, 10), a4 *= 1.17;
        const t5 = 317 - a4 * 1.57, l6 = 425 - a4 * 1.8;
        return x`<svg viewBox="0 0 110 110" width="110" height="110"><rect id="wcm-loader" x="2" y="2" width="106" height="106" rx="${a4}"/><use xlink:href="#wcm-loader" stroke-dasharray="106 ${t5}" stroke-dashoffset="${l6}"></use></svg>`;
      }
      render() {
        const e8 = { "wcm-error": this.isError, "wcm-stale": this.isStale };
        return x`<div class="${o6(e8)}">${this.svgLoaderTemplate()}<wcm-wallet-image walletId="${l5(this.walletId)}" imageId="${l5(this.imageId)}"></wcm-wallet-image></div><wcm-text variant="medium-regular" color="${this.isError ? "error" : "primary"}">${this.isError ? "Connection declined" : this.label}</wcm-text>`;
      }
    };
    D2.styles = [h3.globalCss, wo], K([n5()], D2.prototype, "walletId", 2), K([n5()], D2.prototype, "imageId", 2), K([n5({ type: Boolean })], D2.prototype, "isError", 2), K([n5({ type: Boolean })], D2.prototype, "isStale", 2), K([n5()], D2.prototype, "label", 2), D2 = K([e4("wcm-connector-waiting")], D2);
    G = { manualWallets() {
      var e8, o7;
      const { mobileWallets: r4, desktopWallets: a4 } = y.state, t5 = (e8 = G.recentWallet()) == null ? void 0 : e8.id, l6 = a.isMobile() ? r4 : a4, i5 = l6?.filter((s5) => t5 !== s5.id);
      return (o7 = a.isMobile() ? i5?.map(({ id: s5, name: $2, links: f2 }) => ({ id: s5, name: $2, mobile: f2, links: f2 })) : i5?.map(({ id: s5, name: $2, links: f2 }) => ({ id: s5, name: $2, desktop: f2, links: f2 }))) != null ? o7 : [];
    }, recentWallet() {
      return c3.getRecentWallet();
    }, recomendedWallets(e8 = false) {
      var o7;
      const r4 = e8 || (o7 = G.recentWallet()) == null ? void 0 : o7.id, { recomendedWallets: a4 } = te.state;
      return a4.filter((t5) => r4 !== t5.id);
    } };
    Z2 = { onConnecting(e8) {
      c3.goToConnectingView(e8);
    }, manualWalletsTemplate() {
      return G.manualWallets().map((e8) => x`<wcm-wallet-button walletId="${e8.id}" name="${e8.name}" .onClick="${() => this.onConnecting(e8)}"></wcm-wallet-button>`);
    }, recomendedWalletsTemplate(e8 = false) {
      return G.recomendedWallets(e8).map((o7) => x`<wcm-wallet-button name="${o7.name}" walletId="${o7.id}" imageId="${o7.image_id}" .onClick="${() => this.onConnecting(o7)}"></wcm-wallet-button>`);
    }, recentWalletTemplate() {
      const e8 = G.recentWallet();
      if (e8)
        return x`<wcm-wallet-button name="${e8.name}" walletId="${e8.id}" imageId="${l5(e8.image_id)}" .recent="${true}" .onClick="${() => this.onConnecting(e8)}"></wcm-wallet-button>`;
    } };
    vo = i`.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.wcm-desktop-title,.wcm-mobile-title{display:flex;align-items:center}.wcm-mobile-title{justify-content:space-between;margin-bottom:20px;margin-top:-10px}.wcm-desktop-title{margin-bottom:10px;padding:0 10px}.wcm-subtitle{display:flex;align-items:center}.wcm-subtitle:last-child path{fill:var(--wcm-color-fg-3)}.wcm-desktop-title svg,.wcm-mobile-title svg{margin-right:6px}.wcm-desktop-title path,.wcm-mobile-title path{fill:var(--wcm-accent-color)}`;
    uo = Object.defineProperty;
    bo = Object.getOwnPropertyDescriptor;
    fo = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? bo(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && uo(o7, r4, t5), t5;
    };
    Ee = class extends s4 {
      render() {
        const { explorerExcludedWalletIds: e8, enableExplorer: o7 } = y.state, r4 = e8 !== "ALL" && o7, a4 = Z2.manualWalletsTemplate(), t5 = Z2.recomendedWalletsTemplate();
        let l6 = [Z2.recentWalletTemplate(), ...a4, ...t5];
        l6 = l6.filter(Boolean);
        const i5 = l6.length > 4 || r4;
        let s5 = [];
        i5 ? s5 = l6.slice(0, 3) : s5 = l6;
        const $2 = Boolean(s5.length);
        return x`<wcm-modal-header .border="${true}" title="Connect your wallet" .onAction="${c3.handleUriCopy}" .actionIcon="${v2.COPY_ICON}"></wcm-modal-header><wcm-modal-content><div class="wcm-mobile-title"><div class="wcm-subtitle">${v2.MOBILE_ICON}<wcm-text variant="small-regular" color="accent">Mobile</wcm-text></div><div class="wcm-subtitle">${v2.SCAN_ICON}<wcm-text variant="small-regular" color="secondary">Scan with your wallet</wcm-text></div></div><wcm-walletconnect-qr></wcm-walletconnect-qr></wcm-modal-content>${$2 ? x`<wcm-modal-footer><div class="wcm-desktop-title">${v2.DESKTOP_ICON}<wcm-text variant="small-regular" color="accent">Desktop</wcm-text></div><div class="wcm-grid">${s5} ${i5 ? x`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>` : null}</div></wcm-modal-footer>` : null}`;
      }
    };
    Ee.styles = [h3.globalCss, vo], Ee = fo([e4("wcm-desktop-wallet-selection")], Ee);
    xo = i`div{background-color:var(--wcm-color-bg-2);padding:10px 20px 15px 20px;border-top:1px solid var(--wcm-color-bg-3);text-align:center}a{color:var(--wcm-accent-color);text-decoration:none;transition:opacity .2s ease-in-out;display:inline}a:active{opacity:.8}@media(hover:hover){a:hover{opacity:.8}}`;
    yo = Object.defineProperty;
    $o = Object.getOwnPropertyDescriptor;
    Co = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? $o(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && yo(o7, r4, t5), t5;
    };
    Me = class extends s4 {
      render() {
        const { termsOfServiceUrl: e8, privacyPolicyUrl: o7 } = y.state;
        return e8 ?? o7 ? x`<div><wcm-text variant="small-regular" color="secondary">By connecting your wallet to this app, you agree to the app's ${e8 ? x`<a href="${e8}" target="_blank" rel="noopener noreferrer">Terms of Service</a>` : null} ${e8 && o7 ? "and" : null} ${o7 ? x`<a href="${o7}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>` : null}</wcm-text></div>` : null;
      }
    };
    Me.styles = [h3.globalCss, xo], Me = Co([e4("wcm-legal-notice")], Me);
    ko = i`div{display:grid;grid-template-columns:repeat(4,80px);margin:0 -10px;justify-content:space-between;row-gap:10px}`;
    Oo = Object.defineProperty;
    Wo = Object.getOwnPropertyDescriptor;
    Io = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Wo(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Oo(o7, r4, t5), t5;
    };
    Le = class extends s4 {
      onQrcode() {
        T.push("Qrcode");
      }
      render() {
        const { explorerExcludedWalletIds: e8, enableExplorer: o7 } = y.state, r4 = e8 !== "ALL" && o7, a4 = Z2.manualWalletsTemplate(), t5 = Z2.recomendedWalletsTemplate();
        let l6 = [Z2.recentWalletTemplate(), ...a4, ...t5];
        l6 = l6.filter(Boolean);
        const i5 = l6.length > 8 || r4;
        let s5 = [];
        i5 ? s5 = l6.slice(0, 7) : s5 = l6;
        const $2 = Boolean(s5.length);
        return x`<wcm-modal-header title="Connect your wallet" .onAction="${this.onQrcode}" .actionIcon="${v2.QRCODE_ICON}"></wcm-modal-header>${$2 ? x`<wcm-modal-content><div>${s5} ${i5 ? x`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>` : null}</div></wcm-modal-content>` : null}`;
      }
    };
    Le.styles = [h3.globalCss, ko], Le = Io([e4("wcm-mobile-wallet-selection")], Le);
    Eo = i`:host{all:initial}.wcm-overlay{top:0;bottom:0;left:0;right:0;position:fixed;z-index:var(--wcm-z-index);overflow:hidden;display:flex;justify-content:center;align-items:center;opacity:0;pointer-events:none;background-color:var(--wcm-overlay-background-color);backdrop-filter:var(--wcm-overlay-backdrop-filter)}@media(max-height:720px) and (orientation:landscape){.wcm-overlay{overflow:scroll;align-items:flex-start;padding:20px 0}}.wcm-active{pointer-events:auto}.wcm-container{position:relative;max-width:360px;width:100%;outline:0;border-radius:var(--wcm-background-border-radius) var(--wcm-background-border-radius) var(--wcm-container-border-radius) var(--wcm-container-border-radius);border:1px solid var(--wcm-color-overlay);overflow:hidden}.wcm-card{width:100%;position:relative;border-radius:var(--wcm-container-border-radius);overflow:hidden;box-shadow:0 6px 14px -6px rgba(10,16,31,.12),0 10px 32px -4px rgba(10,16,31,.1),0 0 0 1px var(--wcm-color-overlay);background-color:var(--wcm-color-bg-1);color:var(--wcm-color-fg-1)}@media(max-width:600px){.wcm-container{max-width:440px;border-radius:var(--wcm-background-border-radius) var(--wcm-background-border-radius) 0 0}.wcm-card{border-radius:var(--wcm-container-border-radius) var(--wcm-container-border-radius) 0 0}.wcm-overlay{align-items:flex-end}}@media(max-width:440px){.wcm-container{border:0}}`;
    Mo = Object.defineProperty;
    Lo = Object.getOwnPropertyDescriptor;
    Re = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Lo(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Mo(o7, r4, t5), t5;
    };
    ae = class extends s4 {
      constructor() {
        super(), this.open = false, this.active = false, this.unsubscribeModal = void 0, this.abortController = void 0, this.unsubscribeModal = se.subscribe((e8) => {
          e8.open ? this.onOpenModalEvent() : this.onCloseModalEvent();
        });
      }
      disconnectedCallback() {
        var e8;
        (e8 = this.unsubscribeModal) == null || e8.call(this);
      }
      get overlayEl() {
        return c3.getShadowRootElement(this, ".wcm-overlay");
      }
      get containerEl() {
        return c3.getShadowRootElement(this, ".wcm-container");
      }
      toggleBodyScroll(e8) {
        if (document.querySelector("body"))
          if (e8) {
            const o7 = document.getElementById("wcm-styles");
            o7?.remove();
          } else
            document.head.insertAdjacentHTML("beforeend", '<style id="wcm-styles">html,body{touch-action:none;overflow:hidden;overscroll-behavior:contain;}</style>');
      }
      onCloseModal(e8) {
        e8.target === e8.currentTarget && se.close();
      }
      onOpenModalEvent() {
        this.toggleBodyScroll(false), this.addKeyboardEvents(), this.open = true, setTimeout(async () => {
          const e8 = c3.isMobileAnimation() ? { y: ["50vh", "0vh"] } : { scale: [0.98, 1] }, o7 = 0.1, r4 = 0.2;
          await Promise.all([animate2(this.overlayEl, { opacity: [0, 1] }, { delay: o7, duration: r4 }).finished, animate2(this.containerEl, e8, { delay: o7, duration: r4 }).finished]), this.active = true;
        }, 0);
      }
      async onCloseModalEvent() {
        this.toggleBodyScroll(true), this.removeKeyboardEvents();
        const e8 = c3.isMobileAnimation() ? { y: ["0vh", "50vh"] } : { scale: [1, 0.98] }, o7 = 0.2;
        await Promise.all([animate2(this.overlayEl, { opacity: [1, 0] }, { duration: o7 }).finished, animate2(this.containerEl, e8, { duration: o7 }).finished]), this.containerEl.removeAttribute("style"), this.active = false, this.open = false;
      }
      addKeyboardEvents() {
        this.abortController = new AbortController(), window.addEventListener("keydown", (e8) => {
          var o7;
          e8.key === "Escape" ? se.close() : e8.key === "Tab" && ((o7 = e8.target) != null && o7.tagName.includes("wcm-") || this.containerEl.focus());
        }, this.abortController), this.containerEl.focus();
      }
      removeKeyboardEvents() {
        var e8;
        (e8 = this.abortController) == null || e8.abort(), this.abortController = void 0;
      }
      render() {
        const e8 = { "wcm-overlay": true, "wcm-active": this.active };
        return x`<wcm-explorer-context></wcm-explorer-context><wcm-theme-context></wcm-theme-context><div id="wcm-modal" class="${o6(e8)}" @click="${this.onCloseModal}" role="alertdialog" aria-modal="true"><div class="wcm-container" tabindex="0">${this.open ? x`<wcm-modal-backcard></wcm-modal-backcard><div class="wcm-card"><wcm-modal-router></wcm-modal-router><wcm-modal-toast></wcm-modal-toast></div>` : null}</div></div>`;
      }
    };
    ae.styles = [h3.globalCss, Eo], Re([t3()], ae.prototype, "open", 2), Re([t3()], ae.prototype, "active", 2), ae = Re([e4("wcm-modal")], ae);
    Ro = i`div{display:flex;margin-top:15px}slot{display:inline-block;margin:0 5px}wcm-button{margin:0 5px}`;
    Ao = Object.defineProperty;
    Po = Object.getOwnPropertyDescriptor;
    le = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Po(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Ao(o7, r4, t5), t5;
    };
    B2 = class extends s4 {
      constructor() {
        super(...arguments), this.isMobile = false, this.isDesktop = false, this.isWeb = false, this.isRetry = false;
      }
      onMobile() {
        a.isMobile() ? T.replace("MobileConnecting") : T.replace("MobileQrcodeConnecting");
      }
      onDesktop() {
        T.replace("DesktopConnecting");
      }
      onWeb() {
        T.replace("WebConnecting");
      }
      render() {
        return x`<div>${this.isRetry ? x`<slot></slot>` : null} ${this.isMobile ? x`<wcm-button .onClick="${this.onMobile}" .iconLeft="${v2.MOBILE_ICON}" variant="outline">Mobile</wcm-button>` : null} ${this.isDesktop ? x`<wcm-button .onClick="${this.onDesktop}" .iconLeft="${v2.DESKTOP_ICON}" variant="outline">Desktop</wcm-button>` : null} ${this.isWeb ? x`<wcm-button .onClick="${this.onWeb}" .iconLeft="${v2.GLOBE_ICON}" variant="outline">Web</wcm-button>` : null}</div>`;
      }
    };
    B2.styles = [h3.globalCss, Ro], le([n5({ type: Boolean })], B2.prototype, "isMobile", 2), le([n5({ type: Boolean })], B2.prototype, "isDesktop", 2), le([n5({ type: Boolean })], B2.prototype, "isWeb", 2), le([n5({ type: Boolean })], B2.prototype, "isRetry", 2), B2 = le([e4("wcm-platform-selection")], B2);
    To = i`button{display:flex;flex-direction:column;padding:5px 10px;border-radius:var(--wcm-button-hover-highlight-border-radius);height:100%;justify-content:flex-start}.wcm-icons{width:60px;height:60px;display:flex;flex-wrap:wrap;padding:7px;border-radius:var(--wcm-wallet-icon-border-radius);justify-content:space-between;align-items:center;margin-bottom:5px;background-color:var(--wcm-color-bg-2);box-shadow:inset 0 0 0 1px var(--wcm-color-overlay)}button:active{background-color:var(--wcm-color-overlay)}@media(hover:hover){button:hover{background-color:var(--wcm-color-overlay)}}.wcm-icons img{width:21px;height:21px;object-fit:cover;object-position:center;border-radius:calc(var(--wcm-wallet-icon-border-radius)/ 2);border:1px solid var(--wcm-color-overlay)}.wcm-icons svg{width:21px;height:21px}.wcm-icons img:nth-child(1),.wcm-icons img:nth-child(2),.wcm-icons svg:nth-child(1),.wcm-icons svg:nth-child(2){margin-bottom:4px}wcm-text{width:100%;text-align:center}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
    jo = Object.defineProperty;
    _o = Object.getOwnPropertyDescriptor;
    Do = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? _o(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && jo(o7, r4, t5), t5;
    };
    Ae = class extends s4 {
      onClick() {
        T.push("WalletExplorer");
      }
      render() {
        const { recomendedWallets: e8 } = te.state, o7 = G.manualWallets(), r4 = [...e8, ...o7].reverse().slice(0, 4);
        return x`<button @click="${this.onClick}"><div class="wcm-icons">${r4.map((a4) => {
          const t5 = c3.getWalletIcon(a4);
          if (t5)
            return x`<img crossorigin="anonymous" src="${t5}">`;
          const l6 = c3.getWalletIcon({ id: a4.id });
          return l6 ? x`<img crossorigin="anonymous" src="${l6}">` : v2.WALLET_PLACEHOLDER;
        })} ${[...Array(4 - r4.length)].map(() => v2.WALLET_PLACEHOLDER)}</div><wcm-text variant="xsmall-regular">View All</wcm-text></button>`;
      }
    };
    Ae.styles = [h3.globalCss, To], Ae = Do([e4("wcm-view-all-wallets-button")], Ae);
    No = i`.wcm-qr-container{width:100%;display:flex;justify-content:center;align-items:center;aspect-ratio:1/1}`;
    Zo = Object.defineProperty;
    So = Object.getOwnPropertyDescriptor;
    de = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? So(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Zo(o7, r4, t5), t5;
    };
    Y = class extends s4 {
      constructor() {
        super(), this.walletId = "", this.imageId = "", this.uri = "", setTimeout(() => {
          const { walletConnectUri: e8 } = p.state;
          this.uri = e8;
        }, 0);
      }
      get overlayEl() {
        return c3.getShadowRootElement(this, ".wcm-qr-container");
      }
      render() {
        return x`<div class="wcm-qr-container">${this.uri ? x`<wcm-qrcode size="${this.overlayEl.offsetWidth}" uri="${this.uri}" walletId="${l5(this.walletId)}" imageId="${l5(this.imageId)}"></wcm-qrcode>` : x`<wcm-spinner></wcm-spinner>`}</div>`;
      }
    };
    Y.styles = [h3.globalCss, No], de([n5()], Y.prototype, "walletId", 2), de([n5()], Y.prototype, "imageId", 2), de([t3()], Y.prototype, "uri", 2), Y = de([e4("wcm-walletconnect-qr")], Y);
    Bo = Object.defineProperty;
    Uo = Object.getOwnPropertyDescriptor;
    Ho = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Uo(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Bo(o7, r4, t5), t5;
    };
    Pe = class extends s4 {
      viewTemplate() {
        return a.isAndroid() ? x`<wcm-android-wallet-selection></wcm-android-wallet-selection>` : a.isMobile() ? x`<wcm-mobile-wallet-selection></wcm-mobile-wallet-selection>` : x`<wcm-desktop-wallet-selection></wcm-desktop-wallet-selection>`;
      }
      render() {
        return x`${this.viewTemplate()}<wcm-legal-notice></wcm-legal-notice>`;
      }
    };
    Pe.styles = [h3.globalCss], Pe = Ho([e4("wcm-connect-wallet-view")], Pe);
    zo = i`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
    Vo = Object.defineProperty;
    Fo = Object.getOwnPropertyDescriptor;
    Ke = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Fo(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Vo(o7, r4, t5), t5;
    };
    me = class extends s4 {
      constructor() {
        super(), this.isError = false, this.openDesktopApp();
      }
      onFormatAndRedirect(e8) {
        const { desktop: o7, name: r4 } = a.getWalletRouterData(), a4 = o7?.native;
        if (a4) {
          const t5 = a.formatNativeUrl(a4, e8, r4);
          a.openHref(t5, "_self");
        }
      }
      openDesktopApp() {
        const { walletConnectUri: e8 } = p.state, o7 = a.getWalletRouterData();
        c3.setRecentWallet(o7), e8 && this.onFormatAndRedirect(e8);
      }
      render() {
        const { name: e8, id: o7, image_id: r4 } = a.getWalletRouterData(), { isMobile: a4, isWeb: t5 } = c3.getCachedRouterWalletPlatforms();
        return x`<wcm-modal-header title="${e8}" .onAction="${c3.handleUriCopy}" .actionIcon="${v2.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${o7}" imageId="${l5(r4)}" label="${`Continue in ${e8}...`}" .isError="${this.isError}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Connection can continue loading if ${e8} is not installed on your device`}</wcm-text><wcm-platform-selection .isMobile="${a4}" .isWeb="${t5}" .isRetry="${true}"><wcm-button .onClick="${this.openDesktopApp.bind(this)}" .iconRight="${v2.RETRY_ICON}">Retry</wcm-button></wcm-platform-selection></wcm-info-footer>`;
      }
    };
    me.styles = [h3.globalCss, zo], Ke([t3()], me.prototype, "isError", 2), me = Ke([e4("wcm-desktop-connecting-view")], me);
    qo = i`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}wcm-button{margin-top:15px}`;
    Qo = Object.defineProperty;
    Ko = Object.getOwnPropertyDescriptor;
    Yo = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Ko(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Qo(o7, r4, t5), t5;
    };
    Te = class extends s4 {
      onInstall(e8) {
        e8 && a.openHref(e8, "_blank");
      }
      render() {
        const { name: e8, id: o7, image_id: r4, homepage: a4 } = a.getWalletRouterData();
        return x`<wcm-modal-header title="${e8}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${o7}" imageId="${l5(r4)}" label="Not Detected" .isStale="${true}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Download ${e8} to continue. If multiple browser extensions are installed, disable non ${e8} ones and try again`}</wcm-text><wcm-button .onClick="${() => this.onInstall(a4)}" .iconLeft="${v2.ARROW_DOWN_ICON}">Download</wcm-button></wcm-info-footer>`;
      }
    };
    Te.styles = [h3.globalCss, qo], Te = Yo([e4("wcm-install-wallet-view")], Te);
    Go = i`wcm-wallet-image{border-radius:var(--wcm-wallet-icon-large-border-radius);width:96px;height:96px;margin-bottom:20px}wcm-info-footer{display:flex;width:100%}.wcm-app-store{justify-content:space-between}.wcm-app-store wcm-wallet-image{margin-right:10px;margin-bottom:0;width:28px;height:28px;border-radius:var(--wcm-wallet-icon-small-border-radius)}.wcm-app-store div{display:flex;align-items:center}.wcm-app-store wcm-button{margin-right:-10px}.wcm-note{flex-direction:column;align-items:center;padding:5px 0}.wcm-note wcm-text{text-align:center}wcm-platform-selection{margin-top:-15px}.wcm-note wcm-text{margin-top:15px}.wcm-note wcm-text span{color:var(--wcm-accent-color)}`;
    Xo = Object.defineProperty;
    Jo = Object.getOwnPropertyDescriptor;
    Ye = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? Jo(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && Xo(o7, r4, t5), t5;
    };
    he = class extends s4 {
      constructor() {
        super(), this.isError = false, this.openMobileApp();
      }
      onFormatAndRedirect(e8, o7 = false) {
        const { mobile: r4, name: a4 } = a.getWalletRouterData(), t5 = r4?.native, l6 = r4?.universal;
        if (t5 && !o7) {
          const i5 = a.formatNativeUrl(t5, e8, a4);
          a.openHref(i5, "_self");
        } else if (l6) {
          const i5 = a.formatUniversalUrl(l6, e8, a4);
          a.openHref(i5, "_self");
        }
      }
      openMobileApp(e8 = false) {
        const { walletConnectUri: o7 } = p.state, r4 = a.getWalletRouterData();
        c3.setRecentWallet(r4), o7 && this.onFormatAndRedirect(o7, e8);
      }
      onGoToAppStore(e8) {
        e8 && a.openHref(e8, "_blank");
      }
      render() {
        const { name: e8, id: o7, image_id: r4, app: a4, mobile: t5 } = a.getWalletRouterData(), { isWeb: l6 } = c3.getCachedRouterWalletPlatforms(), i5 = a4?.ios, s5 = t5?.universal;
        return x`<wcm-modal-header title="${e8}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${o7}" imageId="${l5(r4)}" label="Tap 'Open' to continue…" .isError="${this.isError}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer class="wcm-note"><wcm-platform-selection .isWeb="${l6}" .isRetry="${true}"><wcm-button .onClick="${() => this.openMobileApp(false)}" .iconRight="${v2.RETRY_ICON}">Retry</wcm-button></wcm-platform-selection>${s5 ? x`<wcm-text color="secondary" variant="small-thin">Still doesn't work? <span tabindex="0" @click="${() => this.openMobileApp(true)}">Try this alternate link</span></wcm-text>` : null}</wcm-info-footer><wcm-info-footer class="wcm-app-store"><div><wcm-wallet-image walletId="${o7}" imageId="${l5(r4)}"></wcm-wallet-image><wcm-text>${`Get ${e8}`}</wcm-text></div><wcm-button .iconRight="${v2.ARROW_RIGHT_ICON}" .onClick="${() => this.onGoToAppStore(i5)}" variant="ghost">App Store</wcm-button></wcm-info-footer>`;
      }
    };
    he.styles = [h3.globalCss, Go], Ye([t3()], he.prototype, "isError", 2), he = Ye([e4("wcm-mobile-connecting-view")], he);
    er = i`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
    tr = Object.defineProperty;
    or = Object.getOwnPropertyDescriptor;
    rr = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? or(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && tr(o7, r4, t5), t5;
    };
    je = class extends s4 {
      render() {
        const { name: e8, id: o7, image_id: r4 } = a.getWalletRouterData(), { isDesktop: a4, isWeb: t5 } = c3.getCachedRouterWalletPlatforms();
        return x`<wcm-modal-header title="${e8}" .onAction="${c3.handleUriCopy}" .actionIcon="${v2.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-walletconnect-qr walletId="${o7}" imageId="${l5(r4)}"></wcm-walletconnect-qr></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Scan this QR Code with your phone's camera or inside ${e8} app`}</wcm-text><wcm-platform-selection .isDesktop="${a4}" .isWeb="${t5}"></wcm-platform-selection></wcm-info-footer>`;
      }
    };
    je.styles = [h3.globalCss, er], je = rr([e4("wcm-mobile-qr-connecting-view")], je);
    ar = Object.defineProperty;
    lr = Object.getOwnPropertyDescriptor;
    ir = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? lr(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && ar(o7, r4, t5), t5;
    };
    _e = class extends s4 {
      render() {
        return x`<wcm-modal-header title="Scan the code" .onAction="${c3.handleUriCopy}" .actionIcon="${v2.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-walletconnect-qr></wcm-walletconnect-qr></wcm-modal-content>`;
      }
    };
    _e.styles = [h3.globalCss], _e = ir([e4("wcm-qrcode-view")], _e);
    nr = i`wcm-modal-content{height:clamp(200px,60vh,600px);display:block;overflow:scroll;scrollbar-width:none;position:relative;margin-top:1px}.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between;margin:-15px -10px;padding-top:20px}wcm-modal-content::after,wcm-modal-content::before{content:'';position:fixed;pointer-events:none;z-index:1;width:100%;height:20px;opacity:1}wcm-modal-content::before{box-shadow:0 -1px 0 0 var(--wcm-color-bg-1);background:linear-gradient(var(--wcm-color-bg-1),rgba(255,255,255,0))}wcm-modal-content::after{box-shadow:0 1px 0 0 var(--wcm-color-bg-1);background:linear-gradient(rgba(255,255,255,0),var(--wcm-color-bg-1));top:calc(100% - 20px)}wcm-modal-content::-webkit-scrollbar{display:none}.wcm-placeholder-block{display:flex;justify-content:center;align-items:center;height:100px;overflow:hidden}.wcm-empty,.wcm-loading{display:flex}.wcm-loading .wcm-placeholder-block{height:100%}.wcm-end-reached .wcm-placeholder-block{height:0;opacity:0}.wcm-empty .wcm-placeholder-block{opacity:1;height:100%}wcm-wallet-button{margin:calc((100% - 60px)/ 3) 0}`;
    cr = Object.defineProperty;
    sr = Object.getOwnPropertyDescriptor;
    ie = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? sr(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && cr(o7, r4, t5), t5;
    };
    De = 40;
    U = class extends s4 {
      constructor() {
        super(...arguments), this.loading = !te.state.wallets.listings.length, this.firstFetch = !te.state.wallets.listings.length, this.search = "", this.endReached = false, this.intersectionObserver = void 0, this.searchDebounce = c3.debounce((e8) => {
          e8.length >= 1 ? (this.firstFetch = true, this.endReached = false, this.search = e8, te.resetSearch(), this.fetchWallets()) : this.search && (this.search = "", this.endReached = this.isLastPage(), te.resetSearch());
        });
      }
      firstUpdated() {
        this.createPaginationObserver();
      }
      disconnectedCallback() {
        var e8;
        (e8 = this.intersectionObserver) == null || e8.disconnect();
      }
      get placeholderEl() {
        return c3.getShadowRootElement(this, ".wcm-placeholder-block");
      }
      createPaginationObserver() {
        this.intersectionObserver = new IntersectionObserver(([e8]) => {
          e8.isIntersecting && !(this.search && this.firstFetch) && this.fetchWallets();
        }), this.intersectionObserver.observe(this.placeholderEl);
      }
      isLastPage() {
        const { wallets: e8, search: o7 } = te.state, { listings: r4, total: a4 } = this.search ? o7 : e8;
        return a4 <= De || r4.length >= a4;
      }
      async fetchWallets() {
        var e8;
        const { wallets: o7, search: r4 } = te.state, { listings: a4, total: t5, page: l6 } = this.search ? r4 : o7;
        if (!this.endReached && (this.firstFetch || t5 > De && a4.length < t5))
          try {
            this.loading = true;
            const i5 = (e8 = p.state.chains) == null ? void 0 : e8.join(","), { listings: s5 } = await te.getWallets({ page: this.firstFetch ? 1 : l6 + 1, entries: De, search: this.search, version: 2, chains: i5 }), $2 = s5.map((f2) => c3.getWalletIcon(f2));
            await Promise.all([...$2.map(async (f2) => c3.preloadImage(f2)), a.wait(300)]), this.endReached = this.isLastPage();
          } catch (i5) {
            console.error(i5), oe.openToast(c3.getErrorMessage(i5), "error");
          } finally {
            this.loading = false, this.firstFetch = false;
          }
      }
      onConnect(e8) {
        a.isAndroid() ? c3.handleMobileLinking(e8) : c3.goToConnectingView(e8);
      }
      onSearchChange(e8) {
        const { value: o7 } = e8.target;
        this.searchDebounce(o7);
      }
      render() {
        const { wallets: e8, search: o7 } = te.state, { listings: r4 } = this.search ? o7 : e8, a4 = this.loading && !r4.length, t5 = this.search.length >= 3;
        let l6 = Z2.manualWalletsTemplate(), i5 = Z2.recomendedWalletsTemplate(true);
        t5 && (l6 = l6.filter(({ values: f2 }) => c3.caseSafeIncludes(f2[0], this.search)), i5 = i5.filter(({ values: f2 }) => c3.caseSafeIncludes(f2[0], this.search)));
        const s5 = !this.loading && !r4.length && !i5.length, $2 = { "wcm-loading": a4, "wcm-end-reached": this.endReached || !this.loading, "wcm-empty": s5 };
        return x`<wcm-modal-header><wcm-search-input .onChange="${this.onSearchChange.bind(this)}"></wcm-search-input></wcm-modal-header><wcm-modal-content class="${o6($2)}"><div class="wcm-grid">${a4 ? null : l6} ${a4 ? null : i5} ${a4 ? null : r4.map((f2) => x`${f2 ? x`<wcm-wallet-button imageId="${f2.image_id}" name="${f2.name}" walletId="${f2.id}" .onClick="${() => this.onConnect(f2)}"></wcm-wallet-button>` : null}`)}</div><div class="wcm-placeholder-block">${s5 ? x`<wcm-text variant="big-bold" color="secondary">No results found</wcm-text>` : null} ${!s5 && this.loading ? x`<wcm-spinner></wcm-spinner>` : null}</div></wcm-modal-content>`;
      }
    };
    U.styles = [h3.globalCss, nr], ie([t3()], U.prototype, "loading", 2), ie([t3()], U.prototype, "firstFetch", 2), ie([t3()], U.prototype, "search", 2), ie([t3()], U.prototype, "endReached", 2), U = ie([e4("wcm-wallet-explorer-view")], U);
    dr = i`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
    mr = Object.defineProperty;
    hr = Object.getOwnPropertyDescriptor;
    Ge = (e8, o7, r4, a4) => {
      for (var t5 = a4 > 1 ? void 0 : a4 ? hr(o7, r4) : o7, l6 = e8.length - 1, i5; l6 >= 0; l6--)
        (i5 = e8[l6]) && (t5 = (a4 ? i5(o7, r4, t5) : i5(t5)) || t5);
      return a4 && t5 && mr(o7, r4, t5), t5;
    };
    we = class extends s4 {
      constructor() {
        super(), this.isError = false, this.openWebWallet();
      }
      onFormatAndRedirect(e8) {
        const { desktop: o7, name: r4 } = a.getWalletRouterData(), a4 = o7?.universal;
        if (a4) {
          const t5 = a.formatUniversalUrl(a4, e8, r4);
          a.openHref(t5, "_blank");
        }
      }
      openWebWallet() {
        const { walletConnectUri: e8 } = p.state, o7 = a.getWalletRouterData();
        c3.setRecentWallet(o7), e8 && this.onFormatAndRedirect(e8);
      }
      render() {
        const { name: e8, id: o7, image_id: r4 } = a.getWalletRouterData(), { isMobile: a4, isDesktop: t5 } = c3.getCachedRouterWalletPlatforms(), l6 = a.isMobile();
        return x`<wcm-modal-header title="${e8}" .onAction="${c3.handleUriCopy}" .actionIcon="${v2.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${o7}" imageId="${l5(r4)}" label="${`Continue in ${e8}...`}" .isError="${this.isError}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`${e8} web app has opened in a new tab. Go there, accept the connection, and come back`}</wcm-text><wcm-platform-selection .isMobile="${a4}" .isDesktop="${l6 ? false : t5}" .isRetry="${true}"><wcm-button .onClick="${this.openWebWallet.bind(this)}" .iconRight="${v2.RETRY_ICON}">Retry</wcm-button></wcm-platform-selection></wcm-info-footer>`;
      }
    };
    we.styles = [h3.globalCss, dr], Ge([t3()], we.prototype, "isError", 2), we = Ge([e4("wcm-web-connecting-view")], we);
  }
});
init_dist2();
export {
  ae as WcmModal,
  j as WcmQrCode
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
