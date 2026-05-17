// Auth screens — Login, Create Account, Forgot Password
const { useState: useStateA, useEffect: useEffectA } = React;

function LoginScreen({ onNav, theme }) {
  const [email, setEmail] = useStateA("muthu@veggietrack.app");
  // Phases: idle → expand (scanning) → success (shrunken pill) → idle
  const [facePhase, setFacePhase] = useStateA("idle");
  const faceActive = facePhase !== "idle";

  const handleFaceId = () => {
    if (faceActive) return;
    setFacePhase("expand");
    setTimeout(() => setFacePhase("success"), 1500);
    setTimeout(() => { setFacePhase("idle"); onNav("home"); }, 2400);
  };

  const islandSize = facePhase === "expand"
    ? { width: 280, height: 76, borderRadius: 38, top: 12 }
    : facePhase === "success"
      ? { width: 190, height: 50, borderRadius: 25, top: 12 }
      : { width: 120, height: 34, borderRadius: 17, top: 12 };

  return (
    <div className="scene" style={{ position: "relative", zIndex: faceActive ? 200 : undefined }}>
      {/* Face ID overlay — morphs out of the Dynamic Island, scans, then shrinks */}
      {faceActive && (
        <div style={{
          position: "absolute", left: "50%",
          transform: "translateX(-50%)", zIndex: 110,
          background: "#000",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
          padding: "0 18px", overflow: "hidden",
          boxShadow: "0 12px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
          transition: "width .5s cubic-bezier(.34,1.56,.64,1), height .5s cubic-bezier(.34,1.56,.64,1), border-radius .5s cubic-bezier(.34,1.56,.64,1), top .5s cubic-bezier(.34,1.56,.64,1)",
          animation: "fidFromIsland .35s ease-out",
          ...islandSize,
        }}>
          {facePhase === "expand" && (
            <React.Fragment>
              <div style={{
                width: 48, height: 48, position: "relative",
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                <div style={{
                  position: "absolute", inset: -4, borderRadius: "50%",
                  border: "2px solid var(--green)",
                  animation: "fidPulse 1.2s ease-out infinite",
                }}/>
                <Icon.Face size={40} stroke="#fff" strokeWidth={1.9}/>
              </div>
              <div style={{ lineHeight: 1.25 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Face ID</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>Scanning…</div>
              </div>
            </React.Fragment>
          )}
          {facePhase === "success" && (
            <React.Fragment>
              <div className="anim-pop" style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "var(--green)",
                display: "grid", placeItems: "center", flexShrink: 0,
                boxShadow: "0 0 0 4px rgba(48,185,100,0.25)",
              }}>
                <Icon.Check size={18} stroke="#fff" strokeWidth={3.5}/>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 0.2 }}>
                Authenticated
              </div>
            </React.Fragment>
          )}
        </div>
      )}

      {/* Decorative blob */}
      <div style={{
        position: "absolute", right: -60, bottom: 80, width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(48,185,100,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div className="page-pad" style={{ paddingTop: 28 }}>
        <div className="brand-mark">VEGGIETRACK</div>

        <div style={{
          marginTop: 24,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}>
          <h1 style={{
            fontSize: 38, fontWeight: 800, lineHeight: 0.95, margin: 0, letterSpacing: -1.5,
            flex: 1,
          }}>
            EAT<br/>
            YOUR<br/>
            <span style={{
              color: "var(--green)",
              display: "inline-block",
              borderBottom: "4px solid var(--green)",
              paddingBottom: 2,
            }}>GREENS.</span>
          </h1>
          <div style={{
            position: "relative",
            width: 148, height: 148, flexShrink: 0,
            perspective: 600,
          }}>
            {/* Soft glow halo */}
            <div style={{
              position: "absolute", inset: -10, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, rgba(61,220,132,0.35) 0%, rgba(61,220,132,0.0) 60%)",
              filter: "blur(8px)", pointerEvents: "none",
              animation: "memojiPulse 4s ease-in-out infinite",
            }}/>
            {/* Memoji disc with 3D depth */}
            <div className="memoji-3d" style={{
              position: "relative",
              width: "100%", height: "100%",
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 25%, #ffffff 0%, #f1f5f0 55%, #d8e3dc 100%)",
              border: "3px solid var(--green)",
              overflow: "hidden",
              boxShadow: [
                "0 18px 40px rgba(0,0,0,0.45)",            // ground shadow
                "0 6px 14px rgba(20,102,66,0.35)",         // green tinted shadow
                "inset 0 6px 14px rgba(255,255,255,0.85)", // top highlight
                "inset 0 -10px 20px rgba(0,0,0,0.18)",     // bottom darken
                "0 0 0 6px rgba(61,220,132,0.14)",         // outer ring
              ].join(", "),
              transform: "rotateX(8deg) rotateY(-6deg)",
              transformStyle: "preserve-3d",
              transition: "transform .4s cubic-bezier(.2,.7,.3,1)",
            }}>
              <img src="assets/memoji.png" alt="" style={{
                width: "108%", height: "108%", marginLeft: "-4%", marginTop: "-4%",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                transform: "translateZ(20px)",
              }}/>
              {/* Glossy top highlight */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "55%",
                background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)",
                borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
                pointerEvents: "none",
              }}/>
            </div>
          </div>
        </div>
        <div style={{
          marginTop: 18, fontSize: 10, letterSpacing: 5, color: "var(--text-2)", fontWeight: 500,
        }}>
          AMAZING · HEALTHY · WONDERFUL · SMART
        </div>

        <div className="card" style={{ marginTop: 32, padding: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            Hey, Muthu! <Icon.Heart size={20} stroke="none" fill="var(--red)"/>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4, paddingBottom: 14, borderBottom: "1px solid var(--border-faint)" }}>
            Track your veggie serves daily
          </div>

          <div onClick={handleFaceId} style={{
            marginTop: 14, display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 16, background: "var(--green-soft)",
              display: "grid", placeItems: "center", color: "var(--green)",
              border: "1px solid rgba(48,185,100,0.18)",
            }}>
              <Icon.Face size={38}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Face ID</div>
              <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>
                {faceActive ? "Authenticating…" : "Tap to authenticate"}
              </div>
              <div style={{ fontSize: 10, color: "var(--teal)", marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }}/>
                {faceActive ? "Scanning…" : "Ready"}
              </div>
            </div>
            <Icon.ArrowRight size={20} stroke="var(--green)"/>
          </div>
        </div>

        <div style={{
          textAlign: "center", color: "var(--text-2)", fontSize: 11, margin: "20px 0 10px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ flex: 1, height: 1, background: "var(--border-faint)" }}/>
          or continue with email
          <div style={{ flex: 1, height: 1, background: "var(--border-faint)" }}/>
        </div>

        <div className="input-wrap">
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email"/>
        </div>

        <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 14 }} onClick={() => onNav("home")}>
          Sign In <Icon.ArrowRight size={18}/>
        </button>

        <div style={{ textAlign: "center", marginTop: 14 }}>
          <span onClick={() => onNav("forgot")} style={{ color: "var(--green)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            Forgot password?
          </span>
        </div>

        <div onClick={() => onNav("create")} style={{ textAlign: "center", marginTop: 18, color: "var(--text-2)", fontSize: 13, cursor: "pointer" }}>
          New here? <span style={{ color: "var(--text)", fontWeight: 600 }}>Create account →</span>
        </div>
      </div>
    </div>
  );
}

function ForgotScreen({ onNav, showToast }) {
  const [email, setEmail] = useStateA("muthu@veggietrack.app");

  return (
    <div className="scene" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", right: -60, top: 200, width: 220, height: 220, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(48,185,100,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div className="page-pad" style={{ paddingTop: 20 }}>
        <div className="page-back" onClick={() => onNav("login")}>
          <Icon.ArrowLeft size={16}/> Back to Login
        </div>

        <h1 style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.05, marginTop: 18, letterSpacing: -1 }}>
          Forgot<br/>Password?
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 16, lineHeight: 1.4 }}>
          No worries! Enter your email and we'll send you a reset link.
        </p>

        <div className="input-wrap" style={{ marginTop: 30 }}>
          <label>Email Address</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email"/>
        </div>

        <button
          className="btn btn-primary btn-full btn-lg"
          style={{ marginTop: 18 }}
          onClick={() => { showToast("Reset link sent to " + email); setTimeout(() => onNav("login"), 1500); }}>
          Send Reset Link <Icon.ArrowRight size={18}/>
        </button>

        <div onClick={() => onNav("login")} style={{ textAlign: "center", marginTop: 18, color: "var(--text-2)", fontSize: 13, cursor: "pointer" }}>
          Remember your password? <span style={{ color: "var(--text)", fontWeight: 600 }}>Sign In →</span>
        </div>
      </div>
    </div>
  );
}

function CreateAccountScreen({ onNav, showToast }) {
  const [name, setName] = useStateA("Muthu Ramasamy");
  const [email, setEmail] = useStateA("muthu@veggietrack.app");
  const [password, setPassword] = useStateA("");
  const ready = name && email && password.length >= 6;

  return (
    <div className="scene" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", right: -80, top: 100, width: 240, height: 240, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(48,185,100,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div className="page-pad" style={{ paddingTop: 20 }}>
        <div className="page-back" onClick={() => onNav("login")}>
          <Icon.ArrowLeft size={16}/> Back to Login
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 16 }}>
          <h1 style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.0, margin: 0, letterSpacing: -1.5, flex: 1 }}>
            Create<br/>Account
          </h1>
          <div style={{
            width: 80, height: 80, borderRadius: 16, background: "var(--green-soft)",
            display: "grid", placeItems: "center", color: "var(--green)",
          }}>
            <Icon.User size={36}/>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 12 }}>
          Join thousands tracking their veggie intake!
        </p>

        <div className="input-wrap" style={{ marginTop: 22 }}>
          <label>Full Name</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="input-wrap" style={{ marginTop: 12 }}>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email"/>
        </div>
        <div className="input-wrap" style={{ marginTop: 12 }}>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="At least 6 characters"/>
        </div>

        <button
          className="btn btn-primary btn-full btn-lg"
          style={{ marginTop: 18, opacity: ready ? 1 : 0.5 }}
          disabled={!ready}
          onClick={() => { showToast("Account created — welcome, " + name.split(" ")[0] + "!"); setTimeout(() => onNav("home"), 1500); }}>
          Create Account <Icon.ArrowRight size={18}/>
        </button>

        <div onClick={() => onNav("login")} style={{ textAlign: "center", marginTop: 16, color: "var(--text-2)", fontSize: 13, cursor: "pointer" }}>
          Already have an account? <span style={{ color: "var(--text)", fontWeight: 600 }}>Sign In →</span>
        </div>
        <div style={{ textAlign: "center", marginTop: 18, color: "var(--text-3)", fontSize: 10, lineHeight: 1.6 }}>
          By creating an account you agree to our<br/>Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}
// ───── Mock iOS Home Screen (iOS 26 Aesthetic) ─────
function IOSHomeScreen({ onNav }) {
  // iOS 26 style: Deep, vibrant, immersive depth wallpaper
  const wallpaper = "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop') center/cover";
  
  const apps = [
    { 
      name: "Mail", 
      bg: "linear-gradient(180deg, #4AA1FF 0%, #0055FF 100%)", 
      icon: <Icon.Mail size={32} stroke="#fff" strokeWidth={1.5}/> 
    },
    { 
      name: "Calendar", 
      bg: "#fff", 
      content: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          <div style={{ color: "#FF3B30", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>Tue</div>
          <div style={{ color: "#000", fontSize: 32, fontWeight: 300, lineHeight: 1, marginTop: -2, letterSpacing: -1 }}>17</div>
        </div>
      )
    },
    { 
      name: "Photos", 
      bg: "#fff", 
      content: (
        <div style={{ position: "relative", width: 34, height: 34 }}>
          <div style={{ position: "absolute", top: 0, left: 17, width: 17, height: 17, background: "#FF2D55", borderTopRightRadius: 17, borderBottomRightRadius: 17, transformOrigin: "0 100%", transform: "rotate(0deg)", opacity: 0.9 }}/>
          <div style={{ position: "absolute", top: 17, left: 17, width: 17, height: 17, background: "#5856D6", borderBottomRightRadius: 17, borderBottomLeftRadius: 17, transformOrigin: "0 0", transform: "rotate(0deg)", opacity: 0.9 }}/>
          <div style={{ position: "absolute", top: 17, left: 0, width: 17, height: 17, background: "#34C759", borderBottomLeftRadius: 17, borderTopLeftRadius: 17, transformOrigin: "100% 0", transform: "rotate(0deg)", opacity: 0.9 }}/>
          <div style={{ position: "absolute", top: 0, left: 0, width: 17, height: 17, background: "#FFCC00", borderTopLeftRadius: 17, borderTopRightRadius: 17, transformOrigin: "100% 100%", transform: "rotate(0deg)", opacity: 0.9 }}/>
        </div>
      )
    },
    { 
      name: "Camera", 
      bg: "linear-gradient(180deg, #D5D6D8 0%, #999A9C 100%)", 
      content: (
        <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
          <div style={{ width: 40, height: 30, background: "#222", borderRadius: 6, display: "grid", placeItems: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: -4, right: 6, width: 8, height: 4, background: "#222", borderTopLeftRadius: 2, borderTopRightRadius: 2 }}/>
            <div style={{ position: "absolute", top: 4, right: 4, width: 4, height: 4, background: "#FFCC00", borderRadius: "50%" }}/>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#444", border: "2px solid #555", display: "grid", placeItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111" }}/>
            </div>
          </div>
        </div>
      )
    },
    { 
      name: "Weather", 
      bg: "linear-gradient(180deg, #4A90E2 0%, #004499 100%)", 
      icon: <Icon.Sun size={32} stroke="#fff" fill="#FFCC00"/> 
    },
    { 
      name: "Clock", 
      bg: "#000", 
      content: (
        <div style={{ width: 48, height: 48, borderRadius: 24, border: "2px solid #fff", position: "relative", display: "grid", placeItems: "center" }}>
          <div style={{ position: "absolute", width: 2, height: 14, background: "#fff", top: 8, borderRadius: 1 }}/>
          <div style={{ position: "absolute", width: 2, height: 14, background: "#fff", right: 12, top: 22, transform: "rotate(90deg)", borderRadius: 1 }}/>
          <div style={{ position: "absolute", width: 2, height: 18, background: "#FF9500", top: 22, left: 16, transform: "rotate(-45deg)", transformOrigin: "bottom center", borderRadius: 1 }}/>
          <div style={{ width: 4, height: 4, background: "#FF9500", borderRadius: 2, zIndex: 2 }}/>
        </div>
      )
    },
    { 
      name: "Maps", 
      bg: "linear-gradient(135deg, #34C759 0%, #A2E4B8 100%)", 
      content: (
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 14 }}>
          <div style={{ position: "absolute", top: -10, right: -10, width: 40, height: 40, background: "#0A84FF", transform: "rotate(45deg)" }}/>
          <div style={{ position: "absolute", bottom: -10, left: -10, width: 40, height: 40, background: "#FFCC00", transform: "rotate(45deg)" }}/>
          <Icon.ArrowRight size={24} stroke="#fff" strokeWidth={3} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-45deg)" }}/>
        </div>
      )
    },
    { 
      name: "Notes", 
      bg: "#fff", 
      content: (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ height: 16, background: "#FFCC00", width: "100%" }}/>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, padding: "8px 10px" }}>
            <div style={{ height: 2, background: "#E5E5EA", width: "100%", borderRadius: 1 }}/>
            <div style={{ height: 2, background: "#E5E5EA", width: "100%", borderRadius: 1 }}/>
            <div style={{ height: 2, background: "#E5E5EA", width: "70%", borderRadius: 1 }}/>
          </div>
        </div>
      )
    },
    { 
      name: "Reminders", 
      bg: "#fff", 
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: 12, width: "100%", height: "100%", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: "#0A84FF" }}/><div style={{ flex: 1, height: 3, background: "#E5E5EA", borderRadius: 2 }}/></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: "#FF3B30" }}/><div style={{ flex: 1, height: 3, background: "#E5E5EA", borderRadius: 2 }}/></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: "#FFCC00" }}/><div style={{ flex: 1, height: 3, background: "#E5E5EA", borderRadius: 2 }}/></div>
        </div>
      )
    },
    { 
      name: "Settings", 
      bg: "linear-gradient(180deg, #8E8E93 0%, #666 100%)", 
      content: (
        <div style={{ width: 44, height: 44, background: "#D1D1D6", borderRadius: 22, display: "grid", placeItems: "center" }}>
          <Icon.Settings size={32} stroke="#333" strokeWidth={1.5}/>
        </div>
      )
    },
    { 
      name: "VeggieTrack", 
      bg: "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)", 
      content: <Icon.Logo size={36} fill="#0F1D15"/>, 
      isTarget: true 
    },
  ];

  return (
    <div className="scene" style={{ background: wallpaper, color: "#fff" }}>
      <div style={{ height: 44 }} />
      
      {/* App Grid */}
      <div style={{
        padding: "36px 20px 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px 16px",
      }}>
        {apps.map((a, i) => (
          <div key={i} onClick={() => a.isTarget && onNav("login")} style={{
            display: "flex", flexDirection: "column", alignItems: "center", cursor: a.isTarget ? "pointer" : "default",
            opacity: a.isTarget ? 1 : 0.9, transition: "all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275)", transform: "scale(1)"
          }} className={a.isTarget ? "anim-pop hover-scale" : ""}>
            <div style={{
              width: 62, height: 62, borderRadius: 16, background: a.bg,
              display: "grid", placeItems: "center", color: "#fff",
              boxShadow: "0 6px 16px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.4)",
              overflow: "hidden", position: "relative",
              animationDelay: a.isTarget ? "400ms" : "0"
            }}>
              {a.content || a.icon}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6, letterSpacing: -0.2, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
              {a.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Dock (iOS 26 Style — floating glassmorphism) */}
      <div style={{
        position: "absolute", bottom: 24, left: 16, right: 16, height: 86,
        background: "rgba(255,255,255,0.25)", backdropFilter: "blur(30px) saturate(150%)",
        WebkitBackdropFilter: "blur(30px) saturate(150%)", borderRadius: 34,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.4)",
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px"
      }}>
        {[
          { 
            bg: "linear-gradient(180deg, #34C759 0%, #28A745 100%)", 
            content: <Icon.User size={32} stroke="#fff" strokeWidth={1.5}/> // Phone Mock
          }, 
          { 
            bg: "linear-gradient(180deg, #4AA1FF 0%, #0055FF 100%)", 
            content: <Icon.Mail size={32} stroke="#fff" strokeWidth={1.5}/> // Mail Mock
          }, 
          { 
            bg: "linear-gradient(180deg, #FF5E3A 0%, #FF2A6D 100%)", 
            content: <Icon.Heart size={32} fill="#fff" stroke="none"/> // Health Mock
          }, 
          { 
            bg: "linear-gradient(180deg, #FFCC00 0%, #FF9500 100%)", 
            content: <Icon.Bolt size={32} fill="#fff" stroke="none"/> // Shortcuts Mock
          }, 
        ].map((d, i) => (
          <div key={i} style={{
            width: 62, height: 62, borderRadius: 16, background: d.bg,
            display: "grid", placeItems: "center", color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3)"
          }}>
            {d.content}
          </div>
        ))}
      </div>
    </div>
  );
}

window.AuthScreens = { LoginScreen, ForgotScreen, CreateAccountScreen, IOSHomeScreen };
