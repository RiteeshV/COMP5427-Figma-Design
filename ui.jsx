// Shared UI components for VeggieTrack

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ───── Status Bar ─────
function StatusBar() {
  return (
    <div className="status-bar">
      <span className="sb-time">5:55</span>
      <div className="sb-right">
        <svg className="sb-icon sb-cell" viewBox="0 0 18 12" width="18" height="11" fill="currentColor">
          <rect x="0"  y="8" width="3" height="4" rx="0.7"/>
          <rect x="5"  y="5.5" width="3" height="6.5" rx="0.7"/>
          <rect x="10" y="3" width="3" height="9" rx="0.7"/>
          <rect x="15" y="0.5" width="3" height="11.5" rx="0.7"/>
        </svg>
        <svg className="sb-icon sb-wifi" viewBox="0 0 16 12" width="19" height="14" fill="currentColor">
          <path d="M8 1.6c2.7 0 5.1 1 7 2.6l-1.4 1.6A8.4 8.4 0 0 0 8 3.8a8.4 8.4 0 0 0-5.6 2L1 4.2a10.6 10.6 0 0 1 7-2.6zM8 5.5c1.8 0 3.4.6 4.6 1.7l-1.4 1.6A4.5 4.5 0 0 0 8 7.6a4.5 4.5 0 0 0-3.2 1.2L3.4 7.2A6.5 6.5 0 0 1 8 5.5zM8 9.3a2.6 2.6 0 0 1 1.7.6L8 11.6 6.3 10A2.6 2.6 0 0 1 8 9.3z"/>
        </svg>
        <div className="sb-battery">
          <span className="sb-battery-shell">
            <span className="sb-battery-fill" style={{ width: "82%" }}/>
            <span className="sb-battery-pct">82</span>
          </span>
          <span className="sb-battery-tip"/>
        </div>
      </div>
    </div>
  );
}

// ───── Dynamic Island ─────
function Island() {
  return <div className="dynamic-island"/>;
}

// ───── Phone Frame ─────
function Phone({ theme, children }) {
  return (
    <div className="phone">
      <div className={"phone-screen " + (theme === "light" ? "light" : "")} data-theme={theme}>
        <Island/>
        <StatusBar/>
        {children}
        <div className="home-indicator"/>
      </div>
    </div>
  );
}

// ───── Bottom Dock ─────
function Dock({ active, onNav }) {
  const items = [
    { key: "home", label: "Home", icon: <Icon.Home/> },
    { key: "log", label: "Log", icon: <Icon.Plus strokeWidth={2.5}/> },
    { key: "progress", label: "Activity", icon: <Icon.Diamond/> },
    { key: "learn", label: "Learn", icon: <Icon.Square/> },
    { key: "quiz", label: "Quiz", icon: <Icon.Target/> },
  ];
  return (
    <div className="dock-stage">
      <nav className="dock dock-floating">
        {items.map(it => {
          const isActive = active === it.key;
          return (
            <button
              key={it.key}
              className={"dock-btn " + (isActive ? "is-active" : "")}
              onClick={() => onNav(it.key)}
              aria-label={it.label}>
              <span className="dock-icon">{it.icon}</span>
              <span className="dock-label">{it.label}</span>
              {/* OLD GLOWING VERSION */}
              {/* {isActive && <span className="dock-limelight" aria-hidden="true"/>} */}

              {/* NEW CLEAN INDICATOR */}
              {isActive && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    //top: 6,
                    bottom: 6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 28,
                    height: 4,
                    borderRadius: 999,
                    background: "var(--green)",
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ───── Back Header ─────
function BackHeader({ to, label, onNav, title, subtitle }) {
  return (
    <div className="page-pad" style={{ marginBottom: 8 }}>
      <div className="page-back" onClick={() => onNav(to)}>
        <Icon.ArrowLeft size={16}/> {label}
      </div>
      {title && <h1 className="page-title">{title}</h1>}
      {subtitle && <p className="page-sub">{subtitle}</p>}
    </div>
  );
}

// ───── Toast ─────
function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [message, onDone]);
  if (!message) return null;
  return (
    <div className="toast">
      <Icon.Check size={16} stroke="var(--green)"/> {message}
    </div>
  );
}

// ───── Ring (circular progress) ─────
function Ring({ value, max = 100, size = 200, stroke = 16, color = "var(--green)", track = "var(--card)", children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  const offset = c * (1 - pct);
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset .6s ease" }}/>
      </svg>
      <div className="ring-label">{children}</div>
    </div>
  );
}

// ───── Toggle ─────
function Toggle({ on, onChange }) {
  return <div className={"toggle " + (on ? "on" : "")} onClick={() => onChange(!on)} role="switch" aria-checked={on}/>;
}

// ───── Empty stat tile ─────
function StatTile({ color, label, value, tone = "dark", onClick }) {
  const isLight = tone === "yellow";
  return (
    <div onClick={onClick}
      style={{
        flex: 1,
        background: color,
        borderRadius: 20,
        padding: 14,
        cursor: onClick ? "pointer" : "default",
      }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: isLight ? "#151A16" : "#fff", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 500, color: isLight ? "rgba(0,0,0,0.6)" : "var(--text-2)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

window.UI = {
  Phone, StatusBar, Island, Dock, BackHeader, Toast, Ring, Toggle, StatTile,
  useState, useEffect, useRef, useMemo, useCallback,
};
