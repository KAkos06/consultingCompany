import { html as d, css as h, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as f } from "@umbraco-cms/backoffice/modal";
var p = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, u = (t) => {
  throw TypeError(t);
}, v = (t, e, a, o) => {
  for (var s = o > 1 ? void 0 : o ? _(e, a) : e, n = t.length - 1, i; n >= 0; n--)
    (i = t[n]) && (s = (o ? i(e, a, s) : i(s)) || s);
  return o && s && p(e, a, s), s;
}, y = (t, e, a) => e.has(t) || u("Cannot " + a), E = (t, e, a) => e.has(t) ? u("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), C = (t, e, a) => (y(t, e, "access private method"), a), l, c;
let r = class extends f {
  constructor() {
    super(...arguments), E(this, l);
  }
  render() {
    var t, e, a, o;
    return d`
      <uui-dialog-layout class="uui-text" .headline=${(t = this.data) == null ? void 0 : t.headline}>
        ${(e = this.data) == null ? void 0 : e.message}

        <uui-button
          slot="actions"
          id="confirm"
          color=${((a = this.data) == null ? void 0 : a.color) ?? "positive"}
          look="primary"
          label=${((o = this.data) == null ? void 0 : o.confirmLabel) ?? "OK"}
          @click=${C(this, l, c)}
        ></uui-button>
      </uui-dialog-layout>
    `;
  }
};
l = /* @__PURE__ */ new WeakSet();
c = function() {
  var t;
  (t = this.modalContext) == null || t.submit();
};
r.styles = h`
    uui-dialog-layout {
      max-inline-size: 60ch;
    }
  `;
r = v([
  m("info-modal")
], r);
const x = r;
export {
  r as InfoModalElement,
  x as default
};
//# sourceMappingURL=info-modal-element-oBAQVp3w.js.map
