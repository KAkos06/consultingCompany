import { html as f, css as T, state as y, customElement as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as M } from "@umbraco-cms/backoffice/modal";
import { MAINTENANCE_CONTEXT_TOKEN as x } from "./context-BeiMUFsU.js";
var C = Object.defineProperty, W = Object.getOwnPropertyDescriptor, _ = (t) => {
  throw TypeError(t);
}, h = (t, e, i, a) => {
  for (var l = a > 1 ? void 0 : a ? W(e, i) : e, s = t.length - 1, u; s >= 0; s--)
    (u = t[s]) && (l = (a ? u(e, i, l) : u(l)) || l);
  return a && l && C(e, i, l), l;
}, w = (t, e, i) => e.has(t) || _("Cannot " + i), S = (t, e, i) => e.has(t) ? _("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), o = (t, e, i) => (w(t, e, "access private method"), i), n, g, $, p, d;
let c = class extends M {
  constructor() {
    super(), S(this, n), this.content = "", this.consumeContext(x, (t) => {
      t && (this._context = t, t.getSettings(), this.observe(t.settings, (e) => {
        this.settings = e;
      }));
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  //  "allowBackOfficeUsersThrough": true,
  //  "templateName": "MaintenancePage",
  //  "unfrozenUsers": "",
  //  "viewModel": {
  //  "pageTitle": "Site Maintenance",
  //  "title": "Under Maintenance",
  //  "text": "The Website is currently undergoing maintenance and will be back shortly."
  render() {
    var t, e, i, a, l, s, u, m, b, v;
    return f`
      <umb-body-layout headline="Maintenance Mode Settings">
        <uui-box>
          <umb-property-layout
            alias="templateName"
            label=${this.localize.term("maintenance_labelTemplate")}
            description=${this.localize.term("maintenance_labelTemplateDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="Template"
                .value=${((t = this.settings) == null ? void 0 : t.templateName) ?? ""}
                @input=${(r) => o(this, n, p).call(this, "templateName", r)}
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="unfrozenUsers"
            label=${this.localize.term("maintenance_labelUnfreeze")}
            description=${this.localize.term("maintenance_labelUnfreezeDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="Unfrozen users"
                .value=${((e = this.settings) == null ? void 0 : e.unfrozenUsers) ?? ""}
                @input=${(r) => o(this, n, p).call(this, "unfrozenUsers", r)}
                placeholder="Enter User IDs Here..."
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="PageTitle"
            label=${this.localize.term("maintenance_labelPageTitle")}
            description=${this.localize.term("maintenance_labelPageTitleDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                id="pageTitle"
                label="Page Title"
                .value=${((a = (i = this.settings) == null ? void 0 : i.viewModel) == null ? void 0 : a.pageTitle) ?? "Site Maintenance"}
                @input=${o(this, n, d)}
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="title"
            label=${this.localize.term("maintenance_labelTitle")}
            description=${this.localize.term("maintenance_labelTitleDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="Title"
                id="title"
                .value=${((s = (l = this.settings) == null ? void 0 : l.viewModel) == null ? void 0 : s.title) ?? "Under Maintenance"}
                @input=${o(this, n, d)}
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="text"
            label=${this.localize.term("maintenance_labelText")}
            description=${this.localize.term("maintenance_labelTextDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-textarea
                label="Text"
                id="text"
                rows="5"
                .value=${((m = (u = this.settings) == null ? void 0 : u.viewModel) == null ? void 0 : m.text) ?? "The Website is currently undergoing maintenance and will be back shortly."}
                @input=${o(this, n, d)}
              ></uui-textarea>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="UrlWhitelist"
            label=${this.localize.term("maintenance_labelUrlWhitelist")}
            description=${this.localize.term(
      "maintenance_labelUrlWhitelistDesc"
    )}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="Url Whitelist"
                .value=${((b = this.settings) == null ? void 0 : b.urlWhitelist) ?? ""}
                @input=${(r) => o(this, n, p).call(this, "urlWhitelist", r)}
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="IpWhitelist"
            label=${this.localize.term("maintenance_labelIpWhitelist")}
            description=${this.localize.term(
      "maintenance_labelIpWhitelistDesc"
    )}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="IP Whitelist"
                .value=${((v = this.settings) == null ? void 0 : v.ipWhitelist) ?? ""}
                @input=${(r) => o(this, n, p).call(this, "ipWhitelist", r)}
              ></uui-input>
            </div>
          </umb-property-layout>
        </uui-box>
        <div slot="actions">
          <uui-button id="cancel" label="Cancel" @click="${o(this, n, $)}"
            >Cancel</uui-button
          >
          <uui-button
            id="submit"
            color="positive"
            look="primary"
            label="Submit"
            @click=${o(this, n, g)}
          ></uui-button>
        </div>
      </umb-body-layout>
    `;
  }
};
n = /* @__PURE__ */ new WeakSet();
g = function() {
  var t, e;
  (t = this.modalContext) == null || t.submit(), (e = this._context) == null || e.saveSettings();
};
$ = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
p = function(t, e) {
  var l;
  const i = e.target.value, a = {};
  a[t] = i, (l = this._context) == null || l.updateSettings(a);
};
d = function(t) {
  var s;
  const e = t.target;
  if (!e || !this.settings) return;
  const i = e.id, a = e.checked !== void 0 ? e.checked : e.value, l = {
    ...this.settings.viewModel,
    [i]: a
  };
  (s = this._context) == null || s.updateSettings({ viewModel: l });
};
c.styles = T`
    uui-input {
      width: 100%;
    }
  `;
h([
  y()
], c.prototype, "settings", 2);
h([
  y()
], c.prototype, "content", 2);
c = h([
  z("settings-modal")
], c);
const P = c;
export {
  c as SettingsModalElement,
  P as default
};
//# sourceMappingURL=settings-modal-element-Dix5NiJP.js.map
