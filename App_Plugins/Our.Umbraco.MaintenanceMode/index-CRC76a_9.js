import { UMB_AUTH_CONTEXT as G } from "@umbraco-cms/backoffice/auth";
const Q = [
  {
    type: "dashboard",
    name: "maintenancemanager",
    alias: "maintenancemanager.dashboard",
    elementName: "maintenancemanager-dashboard",
    weight: -10,
    js: () => import("./dashboard.element-rGrxkrNy.js"),
    meta: {
      label: "Maintenance Manager",
      pathname: "maintenancemanager"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], K = [...Q], X = [
  {
    type: "globalContext",
    alias: "maintenance.context",
    name: "maintenance context",
    js: () => import("./context-BeiMUFsU.js")
  }
], Y = [...X], Z = [
  {
    type: "localization",
    alias: "time.lang.enus",
    name: "English (US)",
    weight: 0,
    meta: {
      culture: "en-us"
    },
    js: () => import("./en-us-Cpc0Xqw6.js")
  },
  {
    type: "localization",
    alias: "time.lang.engb",
    name: "English (UK)",
    weight: 0,
    meta: {
      culture: "en-gb"
    },
    js: () => import("./en-us-Cpc0Xqw6.js")
  }
], ee = [...Z], te = [
  {
    type: "modal",
    alias: "settings.modal",
    name: "Settings modal",
    js: () => import("./settings-modal-element-Dix5NiJP.js")
  }
], re = [...te], ae = [
  {
    type: "modal",
    alias: "password.modal",
    name: "Password modal",
    js: () => import("./password-modal-element-BXXh0k1p.js")
  },
  {
    type: "modal",
    alias: "info.modal",
    name: "Info modal",
    js: () => import("./info-modal-element-oBAQVp3w.js")
  }
], se = [...ae], ne = {
  bodySerializer: (r) => JSON.stringify(
    r,
    (t, e) => typeof e == "bigint" ? e.toString() : e
  )
}, oe = ({
  onRequest: r,
  onSseError: t,
  onSseEvent: e,
  responseTransformer: a,
  responseValidator: n,
  sseDefaultRetryDelay: l,
  sseMaxRetryAttempts: o,
  sseMaxRetryDelay: i,
  sseSleepFn: c,
  url: f,
  ...s
}) => {
  let p;
  const z = c ?? ((d) => new Promise((y) => setTimeout(y, d)));
  return { stream: async function* () {
    let d = l ?? 3e3, y = 0;
    const j = s.signal ?? new AbortController().signal;
    for (; !j.aborted; ) {
      y++;
      const C = s.headers instanceof Headers ? s.headers : new Headers(s.headers);
      p !== void 0 && C.set("Last-Event-ID", p);
      try {
        const S = {
          redirect: "follow",
          ...s,
          body: s.serializedBody,
          headers: C,
          signal: j
        };
        let w = new Request(f, S);
        r && (w = await r(f, S));
        const u = await (s.fetch ?? globalThis.fetch)(w);
        if (!u.ok)
          throw new Error(
            `SSE failed: ${u.status} ${u.statusText}`
          );
        if (!u.body) throw new Error("No body in SSE response");
        const m = u.body.pipeThrough(new TextDecoderStream()).getReader();
        let $ = "";
        const k = () => {
          try {
            m.cancel();
          } catch {
          }
        };
        j.addEventListener("abort", k);
        try {
          for (; ; ) {
            const { done: J, value: M } = await m.read();
            if (J) break;
            $ += M, $ = $.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
            const q = $.split(`

`);
            $ = q.pop() ?? "";
            for (const _ of q) {
              const F = _.split(`
`), O = [];
              let I;
              for (const g of F)
                if (g.startsWith("data:"))
                  O.push(g.replace(/^data:\s*/, ""));
                else if (g.startsWith("event:"))
                  I = g.replace(/^event:\s*/, "");
                else if (g.startsWith("id:"))
                  p = g.replace(/^id:\s*/, "");
                else if (g.startsWith("retry:")) {
                  const v = Number.parseInt(
                    g.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(v) || (d = v);
                }
              let x, U = !1;
              if (O.length) {
                const g = O.join(`
`);
                try {
                  x = JSON.parse(g), U = !0;
                } catch {
                  x = g;
                }
              }
              U && (n && await n(x), a && (x = await a(x))), e == null || e({
                data: x,
                event: I,
                id: p,
                retry: d
              }), O.length && (yield x);
            }
          }
        } finally {
          j.removeEventListener("abort", k), m.releaseLock();
        }
        break;
      } catch (S) {
        if (t == null || t(S), o !== void 0 && y >= o)
          break;
        const w = Math.min(
          d * 2 ** (y - 1),
          i ?? 3e4
        );
        await z(w);
      }
    }
  }() };
}, ie = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, ce = (r) => {
  switch (r) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, le = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, D = ({
  allowReserved: r,
  explode: t,
  name: e,
  style: a,
  value: n
}) => {
  if (!t) {
    const i = (r ? n : n.map((c) => encodeURIComponent(c))).join(ce(a));
    switch (a) {
      case "label":
        return `.${i}`;
      case "matrix":
        return `;${e}=${i}`;
      case "simple":
        return i;
      default:
        return `${e}=${i}`;
    }
  }
  const l = ie(a), o = n.map((i) => a === "label" || a === "simple" ? r ? i : encodeURIComponent(i) : A({
    allowReserved: r,
    name: e,
    value: i
  })).join(l);
  return a === "label" || a === "matrix" ? l + o : o;
}, A = ({
  allowReserved: r,
  name: t,
  value: e
}) => {
  if (e == null)
    return "";
  if (typeof e == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${t}=${r ? e : encodeURIComponent(e)}`;
}, H = ({
  allowReserved: r,
  explode: t,
  name: e,
  style: a,
  value: n,
  valueOnly: l
}) => {
  if (n instanceof Date)
    return l ? n.toISOString() : `${e}=${n.toISOString()}`;
  if (a !== "deepObject" && !t) {
    let c = [];
    Object.entries(n).forEach(([s, p]) => {
      c = [
        ...c,
        s,
        r ? p : encodeURIComponent(p)
      ];
    });
    const f = c.join(",");
    switch (a) {
      case "form":
        return `${e}=${f}`;
      case "label":
        return `.${f}`;
      case "matrix":
        return `;${e}=${f}`;
      default:
        return f;
    }
  }
  const o = le(a), i = Object.entries(n).map(
    ([c, f]) => A({
      allowReserved: r,
      name: a === "deepObject" ? `${e}[${c}]` : c,
      value: f
    })
  ).join(o);
  return a === "label" || a === "matrix" ? o + i : i;
}, de = /\{[^{}]+\}/g, fe = ({ path: r, url: t }) => {
  let e = t;
  const a = t.match(de);
  if (a)
    for (const n of a) {
      let l = !1, o = n.substring(1, n.length - 1), i = "simple";
      o.endsWith("*") && (l = !0, o = o.substring(0, o.length - 1)), o.startsWith(".") ? (o = o.substring(1), i = "label") : o.startsWith(";") && (o = o.substring(1), i = "matrix");
      const c = r[o];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        e = e.replace(
          n,
          D({ explode: l, name: o, style: i, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        e = e.replace(
          n,
          H({
            explode: l,
            name: o,
            style: i,
            value: c,
            valueOnly: !0
          })
        );
        continue;
      }
      if (i === "matrix") {
        e = e.replace(
          n,
          `;${A({
            name: o,
            value: c
          })}`
        );
        continue;
      }
      const f = encodeURIComponent(
        i === "label" ? `.${c}` : c
      );
      e = e.replace(n, f);
    }
  return e;
}, ue = ({
  baseUrl: r,
  path: t,
  query: e,
  querySerializer: a,
  url: n
}) => {
  const l = n.startsWith("/") ? n : `/${n}`;
  let o = (r ?? "") + l;
  t && (o = fe({ path: t, url: o }));
  let i = e ? a(e) : "";
  return i.startsWith("?") && (i = i.substring(1)), i && (o += `?${i}`), o;
};
function B(r) {
  const t = r.body !== void 0;
  if (t && r.bodySerializer)
    return "serializedBody" in r ? r.serializedBody !== void 0 && r.serializedBody !== "" ? r.serializedBody : null : r.body !== "" ? r.body : null;
  if (t)
    return r.body;
}
const he = async (r, t) => {
  const e = typeof t == "function" ? await t(r) : t;
  if (e)
    return r.scheme === "bearer" ? `Bearer ${e}` : r.scheme === "basic" ? `Basic ${btoa(e)}` : e;
}, W = ({
  parameters: r = {},
  ...t
} = {}) => (a) => {
  const n = [];
  if (a && typeof a == "object")
    for (const l in a) {
      const o = a[l];
      if (o == null)
        continue;
      const i = r[l] || t;
      if (Array.isArray(o)) {
        const c = D({
          allowReserved: i.allowReserved,
          explode: !0,
          name: l,
          style: "form",
          value: o,
          ...i.array
        });
        c && n.push(c);
      } else if (typeof o == "object") {
        const c = H({
          allowReserved: i.allowReserved,
          explode: !0,
          name: l,
          style: "deepObject",
          value: o,
          ...i.object
        });
        c && n.push(c);
      } else {
        const c = A({
          allowReserved: i.allowReserved,
          name: l,
          value: o
        });
        c && n.push(c);
      }
    }
  return n.join("&");
}, pe = (r) => {
  var e;
  if (!r)
    return "stream";
  const t = (e = r.split(";")[0]) == null ? void 0 : e.trim();
  if (t) {
    if (t.startsWith("application/json") || t.endsWith("+json"))
      return "json";
    if (t === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (a) => t.startsWith(a)
    ))
      return "blob";
    if (t.startsWith("text/"))
      return "text";
  }
}, me = (r, t) => {
  var e, a;
  return t ? !!(r.headers.has(t) || (e = r.query) != null && e[t] || (a = r.headers.get("Cookie")) != null && a.includes(`${t}=`)) : !1;
}, ye = async ({
  security: r,
  ...t
}) => {
  for (const e of r) {
    if (me(t, e.name))
      continue;
    const a = await he(e, t.auth);
    if (!a)
      continue;
    const n = e.name ?? "Authorization";
    switch (e.in) {
      case "query":
        t.query || (t.query = {}), t.query[n] = a;
        break;
      case "cookie":
        t.headers.append("Cookie", `${n}=${a}`);
        break;
      case "header":
      default:
        t.headers.set(n, a);
        break;
    }
  }
}, N = (r) => ue({
  baseUrl: r.baseUrl,
  path: r.path,
  query: r.query,
  querySerializer: typeof r.querySerializer == "function" ? r.querySerializer : W(r.querySerializer),
  url: r.url
}), P = (r, t) => {
  var a;
  const e = { ...r, ...t };
  return (a = e.baseUrl) != null && a.endsWith("/") && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = L(r.headers, t.headers), e;
}, be = (r) => {
  const t = [];
  return r.forEach((e, a) => {
    t.push([a, e]);
  }), t;
}, L = (...r) => {
  const t = new Headers();
  for (const e of r) {
    if (!e)
      continue;
    const a = e instanceof Headers ? be(e) : Object.entries(e);
    for (const [n, l] of a)
      if (l === null)
        t.delete(n);
      else if (Array.isArray(l))
        for (const o of l)
          t.append(n, o);
      else l !== void 0 && t.set(
        n,
        typeof l == "object" ? JSON.stringify(l) : l
      );
  }
  return t;
};
class T {
  constructor() {
    this.fns = [];
  }
  clear() {
    this.fns = [];
  }
  eject(t) {
    const e = this.getInterceptorIndex(t);
    this.fns[e] && (this.fns[e] = null);
  }
  exists(t) {
    const e = this.getInterceptorIndex(t);
    return !!this.fns[e];
  }
  getInterceptorIndex(t) {
    return typeof t == "number" ? this.fns[t] ? t : -1 : this.fns.indexOf(t);
  }
  update(t, e) {
    const a = this.getInterceptorIndex(t);
    return this.fns[a] ? (this.fns[a] = e, t) : !1;
  }
  use(t) {
    return this.fns.push(t), this.fns.length - 1;
  }
}
const ge = () => ({
  error: new T(),
  request: new T(),
  response: new T()
}), we = W({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), je = {
  "Content-Type": "application/json"
}, V = (r = {}) => ({
  ...ne,
  headers: je,
  parseAs: "auto",
  querySerializer: we,
  ...r
}), Se = (r = {}) => {
  let t = P(V(), r);
  const e = () => ({ ...t }), a = (f) => (t = P(t, f), e()), n = ge(), l = async (f) => {
    const s = {
      ...t,
      ...f,
      fetch: f.fetch ?? t.fetch ?? globalThis.fetch,
      headers: L(t.headers, f.headers),
      serializedBody: void 0
    };
    s.security && await ye({
      ...s,
      security: s.security
    }), s.requestValidator && await s.requestValidator(s), s.body !== void 0 && s.bodySerializer && (s.serializedBody = s.bodySerializer(s.body)), (s.body === void 0 || s.serializedBody === "") && s.headers.delete("Content-Type");
    const p = N(s);
    return { opts: s, url: p };
  }, o = async (f) => {
    const { opts: s, url: p } = await l(f), z = {
      redirect: "follow",
      ...s,
      body: B(s)
    };
    let b = new Request(p, z);
    for (const h of n.request.fns)
      h && (b = await h(b, s));
    const E = s.fetch;
    let d;
    try {
      d = await E(b);
    } catch (h) {
      let u = h;
      for (const m of n.error.fns)
        m && (u = await m(
          h,
          void 0,
          b,
          s
        ));
      if (u = u || {}, s.throwOnError)
        throw u;
      return s.responseStyle === "data" ? void 0 : {
        error: u,
        request: b,
        response: void 0
      };
    }
    for (const h of n.response.fns)
      h && (d = await h(d, b, s));
    const y = {
      request: b,
      response: d
    };
    if (d.ok) {
      const h = (s.parseAs === "auto" ? pe(d.headers.get("Content-Type")) : s.parseAs) ?? "json";
      if (d.status === 204 || d.headers.get("Content-Length") === "0") {
        let m;
        switch (h) {
          case "arrayBuffer":
          case "blob":
          case "text":
            m = await d[h]();
            break;
          case "formData":
            m = new FormData();
            break;
          case "stream":
            m = d.body;
            break;
          case "json":
          default:
            m = {};
            break;
        }
        return s.responseStyle === "data" ? m : {
          data: m,
          ...y
        };
      }
      let u;
      switch (h) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "text":
          u = await d[h]();
          break;
        case "json": {
          const m = await d.text();
          u = m ? JSON.parse(m) : {};
          break;
        }
        case "stream":
          return s.responseStyle === "data" ? d.body : {
            data: d.body,
            ...y
          };
      }
      return h === "json" && (s.responseValidator && await s.responseValidator(u), s.responseTransformer && (u = await s.responseTransformer(u))), s.responseStyle === "data" ? u : {
        data: u,
        ...y
      };
    }
    const j = await d.text();
    let C;
    try {
      C = JSON.parse(j);
    } catch {
    }
    const S = C ?? j;
    let w = S;
    for (const h of n.error.fns)
      h && (w = await h(S, d, b, s));
    if (w = w || {}, s.throwOnError)
      throw w;
    return s.responseStyle === "data" ? void 0 : {
      error: w,
      ...y
    };
  }, i = (f) => (s) => o({ ...s, method: f }), c = (f) => async (s) => {
    const { opts: p, url: z } = await l(s);
    return oe({
      ...p,
      body: p.body,
      headers: p.headers,
      method: f,
      onRequest: async (b, E) => {
        let d = new Request(b, E);
        for (const y of n.request.fns)
          y && (d = await y(d, p));
        return d;
      },
      serializedBody: B(p),
      url: z
    });
  };
  return {
    buildUrl: N,
    connect: i("CONNECT"),
    delete: i("DELETE"),
    get: i("GET"),
    getConfig: e,
    head: i("HEAD"),
    interceptors: n,
    options: i("OPTIONS"),
    patch: i("PATCH"),
    post: i("POST"),
    put: i("PUT"),
    request: o,
    setConfig: a,
    sse: {
      connect: c("CONNECT"),
      delete: c("DELETE"),
      get: c("GET"),
      head: c("HEAD"),
      options: c("OPTIONS"),
      patch: c("PATCH"),
      post: c("POST"),
      put: c("PUT"),
      trace: c("TRACE")
    },
    trace: i("TRACE")
  };
}, R = Se(V({ baseUrl: "http://localhost:31222", throwOnError: !0 })), xe = [
  ...K,
  ...Y,
  ...ee,
  ...re,
  ...se
], Ce = (r, t) => {
  t.registerMany(xe), r.consumeContext(G, (e) => {
    if (!e) return;
    const a = e.getOpenApiConfiguration();
    R.setConfig({
      baseUrl: a.base,
      credentials: a.credentials
    }), R.interceptors.request.use(async (n, l) => {
      const o = await e.getLatestToken();
      return n.headers.set("Authorization", `Bearer ${o}`), n;
    });
  });
};
export {
  R as c,
  Ce as o
};
//# sourceMappingURL=index-CRC76a_9.js.map
