import { UmbElementMixin as Tt } from "@umbraco-cms/backoffice/element-api";
import { state as J, property as Ot, customElement as Ut } from "@umbraco-cms/backoffice/external/lit";
import { MAINTENANCE_CONTEXT_TOKEN as Nt } from "./context-BeiMUFsU.js";
import { UmbModalToken as Ht, UMB_MODAL_MANAGER_CONTEXT as zt } from "@umbraco-cms/backoffice/modal";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, X = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), nt = /* @__PURE__ */ new WeakMap();
let _t = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (s) => new _t(typeof s == "string" ? s : s + "", void 0, Z), Lt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new _t(e, s, Z);
}, Dt = (s, t) => {
  if (X) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = I.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, ot = X ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Rt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Bt, defineProperty: It, getOwnPropertyDescriptor: jt, getOwnPropertyNames: Wt, getOwnPropertySymbols: Ft, getPrototypeOf: Vt } = Object, A = globalThis, rt = A.trustedTypes, qt = rt ? rt.emptyScript : "", F = A.reactiveElementPolyfillSupport, O = (s, t) => s, K = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? qt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, ft = (s, t) => !Bt(s, t), at = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && It(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = jt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const h = n == null ? void 0 : n.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, i = [...Wt(e), ...Ft(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(ot(n));
    } else t !== void 0 && e.push(ot(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : K).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const h = i.getPropertyOptions(n), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((r = h.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? h.converter : K;
      this._$Em = n;
      const c = a.fromAttribute(e, h.type);
      this[n] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    var n;
    if (t !== void 0) {
      const r = this.constructor, o = this[t];
      if (i ?? (i = r.getPropertyOptions(t)), !((i.hasChanged ?? ft)(o, e) || i.useDefault && i.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, o] of n) {
        const { wrapped: h } = o, a = this[r];
        h !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((n) => {
        var r;
        return (r = n.hostUpdate) == null ? void 0 : r.call(n);
      }), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[O("elementProperties")] = /* @__PURE__ */ new Map(), k[O("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: k }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, j = U.trustedTypes, ht = j ? j.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, gt = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + m, Gt = `<${mt}>`, M = document, H = () => M.createComment(""), z = (s) => s === null || typeof s != "object" && typeof s != "function", Q = Array.isArray, Kt = (s) => Q(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, ct = />/g, b = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, ut = /"/g, vt = /^(?:script|style|textarea|title)$/i, Jt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = Jt(1), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), S = M.createTreeWalker(M, 129);
function At(s, t) {
  if (!Q(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Xt = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
  for (let h = 0; h < e; h++) {
    const a = s[h];
    let c, u, l = -1, $ = 0;
    for (; $ < a.length && (o.lastIndex = $, u = o.exec(a), u !== null); ) $ = o.lastIndex, o === T ? u[1] === "!--" ? o = lt : u[1] !== void 0 ? o = ct : u[2] !== void 0 ? (vt.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = b) : u[3] !== void 0 && (o = b) : o === b ? u[0] === ">" ? (o = n ?? T, l = -1) : u[1] === void 0 ? l = -2 : (l = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? b : u[3] === '"' ? ut : dt) : o === ut || o === dt ? o = b : o === lt || o === ct ? o = T : (o = b, n = void 0);
    const g = o === b && s[h + 1].startsWith("/>") ? " " : "";
    r += o === T ? a + Gt : l >= 0 ? (i.push(c), a.slice(0, l) + gt + a.slice(l) + m + g) : a + m + (l === -2 ? h : g);
  }
  return [At(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class R {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, u] = Xt(t, e);
    if (this.el = R.createElement(c, i), S.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (n = S.nextNode()) !== null && a.length < h; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const l of n.getAttributeNames()) if (l.endsWith(gt)) {
          const $ = u[o++], g = n.getAttribute(l).split(m), B = /([.?@])?(.*)/.exec($);
          a.push({ type: 1, index: r, name: B[2], strings: g, ctor: B[1] === "." ? Qt : B[1] === "?" ? Yt : B[1] === "@" ? te : W }), n.removeAttribute(l);
        } else l.startsWith(m) && (a.push({ type: 6, index: r }), n.removeAttribute(l));
        if (vt.test(n.tagName)) {
          const l = n.textContent.split(m), $ = l.length - 1;
          if ($ > 0) {
            n.textContent = j ? j.emptyScript : "";
            for (let g = 0; g < $; g++) n.append(l[g], H()), S.nextNode(), a.push({ type: 2, index: ++r });
            n.append(l[$], H());
          }
        }
      } else if (n.nodeType === 8) if (n.data === mt) a.push({ type: 2, index: r });
      else {
        let l = -1;
        for (; (l = n.data.indexOf(m, l + 1)) !== -1; ) a.push({ type: 7, index: r }), l += m.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = M.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(s, t, e = s, i) {
  var o, h;
  if (t === x) return t;
  let n = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = z(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== r && ((h = n == null ? void 0 : n._$AO) == null || h.call(n, !1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = P(s, n._$AS(s, t.values), n, i)), t;
}
class Zt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? M).importNode(e, !0);
    S.currentNode = n;
    let r = S.nextNode(), o = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new L(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new ee(r, this, t)), this._$AV.push(c), a = i[++h];
      }
      o !== (a == null ? void 0 : a.index) && (r = S.nextNode(), o++);
    }
    return S.currentNode = M, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = P(this, t, e), z(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(M.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = R.createElement(At(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === n) this._$AH.p(e);
    else {
      const o = new Zt(n, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t) n === e.length ? e.push(i = new L(this.O(H()), this.O(H()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = P(this, t, e, 0), o = !z(t) || t !== this._$AH && t !== x, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++) c = P(this, h[i + a], e, a), c === x && (c = this._$AH[a]), o || (o = !z(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Qt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Yt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class te extends W {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? d) === x) return;
    const i = this._$AH, n = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== d && (i === d || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ee {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const q = U.litHtmlPolyfillSupport;
q == null || q(R, L), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.1");
const ie = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = n = new L(t.insertBefore(H(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class N extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ie(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return x;
  }
}
var $t;
N._$litElement$ = !0, N.finalized = !0, ($t = w.litElementHydrateSupport) == null || $t.call(w, { LitElement: N });
const G = w.litElementPolyfillSupport;
G == null || G({ LitElement: N });
(w.litElementVersions ?? (w.litElementVersions = [])).push("4.2.1");
const se = new Ht(
  "settings.modal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
var ne = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, yt = (s) => {
  throw TypeError(s);
}, D = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? oe(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && ne(t, e, n), n;
}, Y = (s, t, e) => t.has(s) || yt("Cannot " + e), v = (s, t, e) => (Y(s, t, "read from private field"), t.get(s)), C = (s, t, e) => t.has(s) ? yt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), re = (s, t, e, i) => (Y(s, t, "write to private field"), t.set(s, e), e), _ = (s, t, e) => (Y(s, t, "access private method"), e), E, tt, et, it, st, p, bt, Et, St, wt, Mt, Ct, kt, xt, Pt;
let y = class extends Tt(N) {
  constructor() {
    super(), C(this, p), C(this, E), this._loaded = !0, this._status = {
      isInMaintenanceMode: !0,
      isContentFrozen: !0,
      isSiteLocked: !0,
      hasLockPassword: !1,
      settings: {
        allowBackOfficeUsersThrough: !0
      }
    }, this.title = "MaintenanceManager dashboard", C(this, tt, () => {
      var s;
      (s = v(this, E)) == null || s.toggleMaintenance();
    }), C(this, et, () => {
      var s;
      (s = v(this, E)) == null || s.toggleFrozen();
    }), C(this, it, () => {
      var s;
      (s = v(this, E)) == null || s.toggleSiteLock();
    }), C(this, st, () => {
      var s;
      (s = v(this, E)) == null || s.toggleBackofficeAccess();
    }), this.consumeContext(zt, (s) => {
      this._modalContext = s;
    }), this.consumeContext(Nt, (s) => {
      s && (re(this, E, s), s.getStatus(), this.observe(s.status, (t) => {
        this.status = t;
      }));
    });
  }
  render() {
    return f` <uui-box
      >${this._loaded ? _(this, p, St).call(this) : _(this, p, Et).call(this)}</uui-box
    >`;
  }
};
E = /* @__PURE__ */ new WeakMap();
tt = /* @__PURE__ */ new WeakMap();
et = /* @__PURE__ */ new WeakMap();
it = /* @__PURE__ */ new WeakMap();
st = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
bt = async function() {
  var e;
  const s = (e = this._modalContext) == null ? void 0 : e.open(this, se), t = await (s == null ? void 0 : s.onSubmit());
  t && console.log("data", t);
};
Et = function() {
  return f`
      <uui-loader-bar
        animationDuration="1.5"
        style="color: black"
      ></uui-loader-bar>
    `;
};
St = function() {
  return f`
      <div>${_(this, p, wt).call(this)}</div>
      <div>${_(this, p, Mt).call(this)}</div>
      <div>${_(this, p, Ct).call(this)}</div>
      <div>${_(this, p, kt).call(this)}</div>
      <div>${_(this, p, xt).call(this)}</div>
      <div>${_(this, p, Pt).call(this)}</div>
    `;
};
wt = function() {
  return f`
      <div class="buttons">
        <uui-button
          label="Toggle Maintenance"
          id="clickMaintenance"
          look="primary"
          color="positive"
          @click=${v(this, tt)}
        ></uui-button>
        <uui-button
          label="Toggle Frozen"
          id="clickFrozen"
          look="primary"
          color="warning"
          @click=${v(this, et)}
        ></uui-button>
        <uui-button
          label="Lock Site"
          id="clickSiteLock"
          look="primary"
          color="danger"
          @click=${v(this, it)}
        ></uui-button>
      </div>
    `;
};
Mt = function() {
  var s;
  return (s = this.status) != null && s.isInMaintenanceMode ? f`
        <div class="alert alert-danger maintenanceMode-alert">
          <uui-icon name="icon-block"></uui-icon>
          <div>
            <umb-localize key="maintenance_onMsg"></umb-localize>
          </div>
        </div>
      ` : d;
};
Ct = function() {
  var s;
  return (s = this.status) != null && s.isContentFrozen ? f`
        <div class="alert alert-info maintenanceMode-alert">
          <uui-icon name="icon-snow"></uui-icon>
          <div>
            <umb-localize key="maintenance_frozenMsg"></umb-localize>
          </div>
        </div>
      ` : d;
};
kt = function() {
  var s;
  return (s = this.status) != null && s.isSiteLocked ? f`
        <div class="alert alert-info maintenanceMode-alert">
          <uui-icon name="icon-lock"></uui-icon>
          <div>
            <umb-localize key="maintenance_siteLockedMsg"></umb-localize>
          </div>
        </div>
      ` : d;
};
xt = function() {
  var s, t;
  return f`
      <div class="switch">
        <umb-input-toggle
          .checked=${((t = (s = this.status) == null ? void 0 : s.settings) == null ? void 0 : t.allowBackOfficeUsersThrough) ?? !1}
          .showLabels=${!0}
          labelOn="Allow backoffice users to view site"
          labelOff="Don't allow backoffice users to view site"
          @click=${v(this, st)}
        >
        </umb-input-toggle>
      </div>
    `;
};
Pt = function() {
  return f`
      <div class="settings">
        <uui-button
          label="Settings"
          look="primary"
          color="default"
          @click=${_(this, p, bt)}
        ></uui-button>
      </div>
    `;
};
y.styles = Lt`
    :host {
      display: block;
      padding: 20px;
    }

    .buttons {
      display: flex;
      justify-content: center;
    }

    .buttons > uui-button {
      margin: 10px;
    }

    .switch {
      display: flex;
      justify-content: center;
    }

    .settings {
      display: flex;
      justify-content: end;
    }

    .alert-danger {
      background-color: var(--uui-color-danger);
      color: var(--uui-color-danger-contrast);
    }

    .alert-info {
      background-color: var(--uui-palette-malibu);
      color: var(--uui-color-danger-contrast);
    }

    .maintenanceMode-alert {
      padding: 2em;
      margin: 2em;
      font-size: 125%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .maintenanceMode-alert > div {
      text-align: center;
    }

    .maintenanceMode-alert > uui-icon {
      font-size: 50px;
      padding: 10px;
      display: block;
    }
  `;
D([
  J()
], y.prototype, "status", 2);
D([
  J()
], y.prototype, "_loaded", 2);
D([
  J()
], y.prototype, "_status", 2);
D([
  Ot()
], y.prototype, "title", 2);
y = D([
  Ut("maintenancemanager-dashboard")
], y);
const pe = y;
export {
  y as MaintenanceManagerDashboard,
  pe as default
};
//# sourceMappingURL=dashboard.element-rGrxkrNy.js.map
