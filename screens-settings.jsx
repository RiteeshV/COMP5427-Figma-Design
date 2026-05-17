// Settings, Profile, Daily Goals, Notifications

const { useState: useStateS } = React;

function SettingsScreen({ state, setState, onNav, theme, setTheme, showToast }) {
  const items = [
    { id: "goals", icon: <Icon.Target/>, label: "Daily Target", sub: state.target + " serves" },
    { id: "notifications", icon: <Icon.Bell/>, label: "Reminders", sub: "7am · 12pm · 7pm" },
    { id: "calendar", icon: <Icon.Cal/>, label: "Heatmap View", sub: "Weekly" },
    { id: "coach", icon: <Icon.Sparkles/>, label: "AI Coach", sub: "Enabled ✓" },
    { id: "camera", icon: <Icon.Camera/>, label: "Food Camera", sub: "Camera + AI" },
    { id: "learn", icon: <Icon.Book/>, label: "E-Textbook", sub: "Linked ✓" },
  ];

  return (
    <div className="scene has-dock">
      <div style={{ padding: "10px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 className="page-title" style={{ marginTop: 16 }}>Settings</h1>
        <div onClick={() => onNav("home")} style={{ padding: 8, cursor: "pointer" }}>
          <Icon.X size={22} stroke="var(--text-2)"/>
        </div>
      </div>

      <div className="page-pad">
        {/* Profile card */}
        <div onClick={() => onNav("profile")} style={{
          marginTop: 18, padding: 18, borderRadius: 18, background: "var(--green)",
          display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "#fff",
            display: "grid", placeItems: "center", color: "var(--green)", fontSize: 26, fontWeight: 700,
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.5)",
          }}>
            <img src="assets/memoji.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
          </div>
          <div style={{ flex: 1, color: "#fff" }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Muthu</div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>muthu@veggietrack.app</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
              ✎ edit
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="eyebrow" style={{ marginTop: 22 }}>APPEARANCE</div>
        <div style={{
          marginTop: 8, padding: 6, borderRadius: 16, background: "var(--card)",
          display: "flex", gap: 6,
        }}>
          {[
            { id: "dark", label: "Dark", icon: <Icon.Moon size={16}/> },
            { id: "light", label: "Light", icon: <Icon.Sun size={16}/> },
          ].map(opt => {
            const active = theme === opt.id;
            return (
              <button key={opt.id} onClick={() => setTheme(opt.id)} style={{
                flex: 1, padding: "10px 12px", borderRadius: 12,
                background: active ? "var(--green-soft)" : "transparent",
                color: active ? "var(--green)" : "var(--text-2)",
                border: active ? "1px solid var(--green)" : "1px solid transparent",
                fontWeight: 700, fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                {opt.icon} {opt.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {items.map((it, i) => (
            <div key={i} onClick={() => it.id && onNav(it.id)} className="card-row" style={{
              cursor: it.id ? "pointer" : "default", opacity: it.id ? 1 : 0.9,
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10, background: "var(--green-soft)",
                color: "var(--green)", display: "grid", placeItems: "center",
              }}>{it.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{it.label}</div>
                <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>{it.sub}</div>
              </div>
              <Icon.ChevronRight size={18} stroke="var(--text-2)"/>
            </div>
          ))}
        </div>

        <button
          className="btn btn-full btn-lg"
          style={{ marginTop: 18, background: "transparent", color: "var(--red)", border: "1.5px solid var(--red)" }}
          onClick={() => { showToast("Signed out"); setTimeout(() => onNav("login"), 1200); }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

function ProfileScreen({ profile, setProfile, onNav, showToast }) {
  const [local, setLocal] = useStateS(profile);
  const fields = [
    { id: "name", label: "Full Name", val: local.name },
    { id: "email", label: "Email", val: local.email },
    { id: "age", label: "Age", val: local.age, suffix: "" },
    { id: "height", label: "Height", val: local.height, suffix: "cm" },
    { id: "weight", label: "Weight", val: local.weight, suffix: "kg" },
    { id: "goal", label: "Daily Goal", val: local.goal, suffix: "serves" },
  ];

  const save = () => {
    setProfile(local);
    showToast("Profile saved");
    setTimeout(() => onNav("settings"), 1000);
  };

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="settings" label="Settings" title="Profile"/>

      <div className="page-pad" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          marginTop: 14, width: 130, height: 130, borderRadius: "50%",
          background: "#fff", display: "grid", placeItems: "center", overflow: "hidden",
          border: "4px solid var(--green)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35), 0 0 0 8px rgba(61,220,132,0.12)",
        }}>
          <img src="assets/memoji.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 12 }}>{local.name.split(" ")[0]}</div>
        <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>{local.email}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22, width: "100%" }}>
          {fields.map(f => (
            <div key={f.id} className="input-wrap">
              <label>{f.label}</label>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <input
                  value={f.val}
                  onChange={e => setLocal(p => ({ ...p, [f.id]: e.target.value }))}
                  style={{ fontSize: 18, fontWeight: 700 }}
                />
                {f.suffix && <span style={{ color: "var(--text-2)", fontSize: 14, fontWeight: 500 }}>{f.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 18 }} onClick={save}>
          Save Profile <Icon.Check size={18}/>
        </button>
      </div>
    </div>
  );
}

function GoalsScreen({ state, setState, onNav, showToast }) {
  const [target, setTarget] = useStateS(state.target);
  const [variety, setVariety] = useStateS(true);
  const [water, setWater] = useStateS(false);

  const save = () => {
    setState(s => ({ ...s, target }));
    showToast("Goals updated to " + target + " serves/day");
    setTimeout(() => onNav("settings"), 1200);
  };

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="settings" label="Settings" title="Daily Goals" subtitle="Personalise your vegetable targets"/>

      <div className="page-pad">
        <div className="card" style={{ marginTop: 14 }}>
          <div className="eyebrow">DAILY VEGETABLE SERVES TARGET</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
            <button onClick={() => setTarget(t => Math.max(1, t - 1))} style={{
              width: 56, height: 56, borderRadius: 14, background: "var(--red)", color: "#fff",
              display: "grid", placeItems: "center",
            }}>
              <Icon.Minus size={24} strokeWidth={3}/>
            </button>
            <div style={{ fontSize: 42, fontWeight: 700 }} className="anim-pop" key={target}>{target}</div>
            <button onClick={() => setTarget(t => Math.min(15, t + 1))} style={{
              width: 56, height: 56, borderRadius: 14, background: "var(--green)", color: "#fff",
              display: "grid", placeItems: "center",
            }}>
              <Icon.Plus size={24} strokeWidth={3}/>
            </button>
          </div>
        </div>

        <div className="card-row" style={{ marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <div className="eyebrow">VARIETY TARGET</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>3+ different types per day</div>
          </div>
          <UI.Toggle on={variety} onChange={setVariety}/>
        </div>

        <div className="card-row" style={{ marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <div className="eyebrow">INCLUDE WATER TRACKING</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Count water servings separately</div>
          </div>
          <UI.Toggle on={water} onChange={setWater}/>
        </div>

        <div className="card-row" style={{ marginTop: 12, cursor: "pointer" }}>
          <div style={{ flex: 1 }}>
            <div className="eyebrow">WEEKLY CHECK-IN</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Review goals every Sunday</div>
          </div>
          <Icon.ChevronRight size={18} stroke="var(--text-2)"/>
        </div>

        <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 22 }} onClick={save}>
          Save Goals
        </button>
      </div>
    </div>
  );
}

function NotificationsScreen({ onNav, showToast }) {
  const [prefs, setPrefs] = useStateS({
    daily: true,
    goal: true,
    weekly: false,
    quiz: true,
    tips: false,
  });
  const toggle = (k) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const items = [
    { k: "daily", title: "Daily Reminder", sub: "Log your serves every day" },
    { k: "goal", title: "Goal Reached 🎉", sub: "When you hit 5 serves" },
    { k: "weekly", title: "Weekly Summary", sub: "Every Sunday morning" },
    { k: "quiz", title: "Quiz Available", sub: "New quiz ready to take" },
    { k: "tips", title: "Tips & Tricks", sub: "Weekly vegetable tips" },
  ];

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="settings" label="Settings" title="Notifications" subtitle="Control how VeggieTrack reminds you"/>

      <div className="page-pad" style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
        {items.map(it => (
          <div key={it.k} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{it.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 4 }}>{it.sub}</div>
            </div>
            <UI.Toggle on={prefs[it.k]} onChange={() => toggle(it.k)}/>
          </div>
        ))}

        <div className="card" style={{ display: "flex", alignItems: "center", cursor: "pointer", marginTop: 4 }}>
          <div style={{ flex: 1 }}>
            <div className="eyebrow">REMINDER TIME</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>7:00 PM</div>
          </div>
          <Icon.ChevronRight size={18} stroke="var(--text-2)"/>
        </div>

        <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 14 }} onClick={() => { showToast("Preferences saved"); setTimeout(() => onNav("settings"), 900); }}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}

window.SettingsScreens = { SettingsScreen, ProfileScreen, GoalsScreen, NotificationsScreen };
