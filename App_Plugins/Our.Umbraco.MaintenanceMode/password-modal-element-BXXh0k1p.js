import { html as v, css as w, state as f, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as y } from "@umbraco-cms/backoffice/modal";
var C = Object.defineProperty, E = Object.getOwnPropertyDescriptor, p = (t) => {
  throw TypeError(t);
}, c = (t, e, s, r) => {
  for (var a = r > 1 ? void 0 : r ? E(e, s) : e, u = t.length - 1, l; u >= 0; u--)
    (l = t[u]) && (a = (r ? l(e, s, a) : l(a)) || a);
  return r && a && C(e, s, a), a;
}, P = (t, e, s) => e.has(t) || p("Cannot " + s), $ = (t, e, s) => e.has(t) ? p("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), n = (t, e, s) => (P(t, e, "access private method"), s), o, h, d, _, m;
let i = class extends y {
  constructor() {
    super(...arguments), $(this, o), this._password = "";
  }
  render() {
    var t, e;
    return v`
      <umb-body-layout
        headline=${((t = this.data) == null ? void 0 : t.headline) ?? "Enter password"}
      >
        <uui-box>
          <p>${((e = this.data) == null ? void 0 : e.message) ?? "Enter password to unlock the site:"}</p>
          <uui-input
            type="password"
            label="Password"
            .value=${this._password}
            @input=${n(this, o, h)}
            @keydown=${n(this, o, m)}
            autofocus
          ></uui-input>
        </uui-box>
        <div slot="actions">
          <uui-button
            id="cancel"
            look="outline"
            label="Cancel"
            @click=${n(this, o, _)}
            >Cancel</uui-button
          >
          <uui-button
            id="submit"
            color="positive"
            look="primary"
            label="Submit"
            @click=${n(this, o, d)}
            >Submit</uui-button
          >
        </div>
      </umb-body-layout>
    `;
  }
};
o = /* @__PURE__ */ new WeakSet();
h = function(t) {
  this._password = t.target.value;
};
d = function() {
  var t;
  this.value = { password: this._password }, (t = this.modalContext) == null || t.submit();
};
_ = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
m = function(t) {
  t.key === "Enter" && n(this, o, d).call(this);
};
i.styles = w`
    uui-input {
      width: 100%;
    }
  `;
c([
  f()
], i.prototype, "_password", 2);
i = c([
  b("password-modal")
], i);
const M = i;
export {
  i as PasswordModalElement,
  M as default
};
//# sourceMappingURL=password-modal-element-BXXh0k1p.js.map
