var v = (s) => {
  throw TypeError(s);
};
var f = (s, e, t) => e.has(s) || v("Cannot " + t);
var a = (s, e, t) => (f(s, e, "read from private field"), t ? t.call(s) : e.get(s)), w = (s, e, t) => e.has(s) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t), S = (s, e, t, r) => (f(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t), b = (s, e, t) => (f(s, e, "access private method"), t);
import { UmbControllerBase as L } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as U } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as M } from "@umbraco-cms/backoffice/observable-api";
import { UmbModalToken as T, UMB_MODAL_MANAGER_CONTEXT as O } from "@umbraco-cms/backoffice/modal";
import { c as l } from "./index-CRC76a_9.js?v=17.1.4.4";
import { tryExecute as g } from "@umbraco-cms/backoffice/resources";
class u {
  static getSettings(e) {
    return ((e == null ? void 0 : e.client) ?? l).get({ url: "/umbraco/maintenance/api/v1/GetSettings", ...e });
  }
  static getStatus(e) {
    return ((e == null ? void 0 : e.client) ?? l).get({ url: "/umbraco/maintenance/api/v1/GetStatus", ...e });
  }
  static hasLockPassword(e) {
    return ((e == null ? void 0 : e.client) ?? l).get({ url: "/umbraco/maintenance/api/v1/HasLockPassword", ...e });
  }
  static toggleSiteLock(e) {
    return ((e == null ? void 0 : e.client) ?? l).get({ url: "/umbraco/maintenance/api/v1/ToggleSiteLock", ...e });
  }
  static unlockSite(e) {
    return ((e == null ? void 0 : e.client) ?? l).post({
      url: "/umbraco/maintenance/api/v1/UnlockSite",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static saveSettings(e) {
    return ((e == null ? void 0 : e.client) ?? l).post({
      url: "/umbraco/maintenance/api/v1/SaveSettings",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static toggleAccess(e) {
    return ((e == null ? void 0 : e.client) ?? l).get({ url: "/umbraco/maintenance/api/v1/ToggleAccess", ...e });
  }
  static toggleFrozen(e) {
    return ((e == null ? void 0 : e.client) ?? l).get({ url: "/umbraco/maintenance/api/v1/ToggleFrozen", ...e });
  }
  static toggleMode(e) {
    return ((e == null ? void 0 : e.client) ?? l).get({ url: "/umbraco/maintenance/api/v1/ToggleMode", ...e });
  }
}
const A = new T("password.modal", {
  modal: {
    type: "dialog"
  }
}), F = new T(
  "info.modal",
  {
    modal: {
      type: "dialog"
    }
  }
);
var n, o, i, k, h, y;
class V extends L {
  constructor(t) {
    super(t);
    w(this, h);
    w(this, n);
    w(this, o);
    w(this, i);
    w(this, k);
    S(this, n, new M(void 0)), this.status = a(this, n).asObservable(), S(this, o, new M(
      void 0
    )), this.settings = a(this, o).asObservable(), S(this, i, t), this.provideContext(C, this), this.consumeContext(O, (r) => {
      S(this, k, r);
    });
  }
  async getStatus() {
    let t = await g(
      a(this, i),
      u.getStatus()
    );
    t.data != null && a(this, n).setValue(t.data);
  }
  async getSettings() {
    let t = await g(
      a(this, i),
      u.getSettings()
    );
    t.data != null && a(this, o).setValue(t.data);
  }
  async toggleMaintenance() {
    var t;
    console.log("Value:", a(this, n).getValue()), await g(
      a(this, i),
      u.toggleMode({
        query: {
          maintenanceMode: !((t = a(this, n).getValue()) != null && t.isInMaintenanceMode)
        }
      })
    ), await this.getStatus(), console.log("eeby");
  }
  async toggleFrozen() {
    var t;
    await g(
      a(this, i),
      u.toggleFrozen({
        query: {
          maintenanceMode: !((t = a(this, n).getValue()) != null && t.isContentFrozen)
        }
      })
    ), await this.getStatus(), console.log("deeby");
  }
  async toggleSiteLock() {
    var r;
    const t = a(this, n).getValue();
    if (t != null && t.isSiteLocked)
      if (t != null && t.hasLockPassword) {
        const c = (r = a(this, k)) == null ? void 0 : r.open(
          a(this, i),
          A,
          {
            data: {
              headline: "Unlock site",
              message: "Enter password to unlock the site:"
            }
          }
        );
        let d;
        try {
          const m = await (c == null ? void 0 : c.onSubmit());
          d = m == null ? void 0 : m.password;
        } catch {
          return;
        }
        if (!d)
          return;
        try {
          if ((await g(
            a(this, i),
            u.unlockSite({
              body: { password: d }
            })
          )).error) {
            await b(this, h, y).call(this, "Unable to unlock", "Failed to unlock site. Please check the password and try again.");
            return;
          }
          await this.getStatus();
        } catch (m) {
          await b(this, h, y).call(this, "Unable to unlock", "Failed to unlock site. Please check the password and try again."), console.error("Unlock error:", m);
        }
      } else
        try {
          if ((await g(
            a(this, i),
            u.unlockSite({
              body: { password: "" }
            })
          )).error) {
            await b(this, h, y).call(this, "Unable to unlock", "Failed to unlock site.");
            return;
          }
          await this.getStatus();
        } catch (c) {
          await b(this, h, y).call(this, "Unable to unlock", "Failed to unlock site."), console.error("Unlock error:", c);
        }
    else
      await g(
        a(this, i),
        u.toggleSiteLock({
          query: {
            siteLocked: !(t != null && t.isSiteLocked)
          }
        })
      ), await this.getStatus();
  }
  async toggleBackofficeAccess() {
    var t, r, c;
    console.log(a(this, n).getValue()), await g(
      a(this, i),
      u.toggleAccess({
        query: {
          maintenanceMode: !((c = (r = (t = a(this, n)) == null ? void 0 : t.getValue()) == null ? void 0 : r.settings) != null && c.allowBackOfficeUsersThrough)
        }
      })
    ), await this.getStatus();
  }
  //////////////
  updateSettings(t) {
    a(this, o).update(t);
  }
  async saveSettings() {
    const t = a(this, o).getValue();
    console.log(t), t != null && await g(
      a(this, i),
      u.saveSettings({
        body: t
      })
    );
  }
}
n = new WeakMap(), o = new WeakMap(), i = new WeakMap(), k = new WeakMap(), h = new WeakSet(), y = async function(t, r) {
  var d;
  const c = (d = a(this, k)) == null ? void 0 : d.open(a(this, i), F, {
    data: {
      headline: t,
      message: r,
      color: "danger",
      confirmLabel: "OK"
    }
  });
  await (c == null ? void 0 : c.onSubmit());
};
const C = new U(V.name);
export {
  C as MAINTENANCE_CONTEXT_TOKEN,
  V as MaintenanceContext,
  V as default
};
//# sourceMappingURL=context-BeiMUFsU.js.map
