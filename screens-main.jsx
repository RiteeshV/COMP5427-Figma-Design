// Home + Log Food + Edit Log screens — real interactive state

const { useState: useStateH } = React;

// ───── Home ─────
function HomeScreen({ state, setState, onNav }) {
  const { count, target, streak, weekDays } = state;
  const pct = Math.round((count / target) * 100);
  const remaining = Math.max(0, target - count);

  return (
    <div className="scene has-dock">
      <div className="page-pad" style={{ paddingTop: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="eyebrow">GOOD EVENING</div>
            <div style={{ fontSize: 26, fontWeight: 700, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              Muthu <Icon.Bolt size={22} fill="var(--yellow)" stroke="none"/>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div onClick={() => onNav("settings")} style={{
              width: 48, height: 48, borderRadius: 24, background: "#fff",
              display: "grid", placeItems: "center", fontWeight: 700, color: "#fff",
              cursor: "pointer", overflow: "hidden",
              border: "2px solid var(--green)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3), 0 0 0 3px rgba(61,220,132,0.15)",
            }}>
              <img src="assets/memoji.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}/>
            </div>
            <div style={{
              position: "absolute", right: -10, top: 50, background: "var(--orange)",
              padding: "4px 10px", borderRadius: 12, fontSize: 9, fontWeight: 700, color: "#fff",
              display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap", cursor: "pointer",
            }} onClick={(e) => { e.stopPropagation(); onNav("calendar"); }}>
              <Icon.Flame size={10}/> {streak} days
            </div>
          </div>
        </div>

        {/* 8 PM Streak Warning Banner */}
        {count < target && streak > 0 && (
          <div className="card-row outline-orange anim-up"
            style={{ marginTop: 24, cursor: "pointer", background: "rgba(232,98,10,0.1)", border: "1px solid var(--orange)" }}
            onClick={() => onNav("coach", { context: "streak-warning" })}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: "var(--orange)", display: "grid", placeItems: "center", color: "#fff"
            }}>
              <Icon.Flame size={20}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "var(--orange)" }}>Your {streak}-day streak is at risk</div>
              <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>You are {target - count} serve{target - count > 1 ? "s" : ""} short.</div>
            </div>
            <Icon.ChevronRight size={18} stroke="var(--orange)"/>
          </div>
        )}

        {/* Hero card */}
        <div onClick={() => onNav("log")} style={{
          marginTop: 28, borderRadius: 24, background: "var(--green)",
          padding: 20, position: "relative", overflow: "hidden", cursor: "pointer",
        }}>
          <div style={{ position: "absolute", right: 0, top: 0, width: 130, height: "100%", background: "rgba(0,0,0,0.12)" }}/>
          <div className="eyebrow" style={{ color: "#fff", opacity: 0.85 }}>TODAY'S VEGETABLE SERVES</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 12 }}>
            <div style={{ fontSize: 64, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{count}</div>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>/ {target}</div>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 8 }}>
            {remaining === 0 ? "🎉 Goal hit — amazing!" : `${remaining} more to reach your daily goal`}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {Array.from({ length: target }).map((_, i) => (
              <span key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i < count ? "#fff" : "rgba(255,255,255,0.3)",
              }}/>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <div style={{
            flex: 1, background: "var(--yellow)", borderRadius: 20, padding: 14, cursor: "pointer",
          }} onClick={() => onNav("progress")}>
            <Icon.Flame size={20} fill="#151A16" stroke="none"/>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#151A16", marginTop: 8 }}>{streak}</div>
            <div style={{ fontSize: 11, color: "rgba(0,0,0,0.6)", fontWeight: 500 }}>day streak</div>
          </div>
          <div style={{
            flex: 1, background: "var(--card)", borderRadius: 20, padding: 14, cursor: "pointer",
          }} onClick={() => onNav("progress")}>
            <Icon.Target size={20} stroke="var(--teal)"/>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--teal)", marginTop: 8 }}>{pct}%</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", fontWeight: 500 }}>of target</div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onNav("log")}>Log Serves +</button>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => onNav("progress")}>My Activity →</button>
        </div>

        <button className="btn btn-teal btn-full" style={{ marginTop: 12 }} onClick={() => onNav("camera")}>
          <Icon.Camera size={18}/> Scan Food with AI
        </button>

        {/* Week ring */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
          <span className="eyebrow">THIS WEEK</span>
          <span style={{ fontSize: 11, color: "var(--text-2)" }}>
            {weekDays.filter(d => d.hit).length} / 7 on target
          </span>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          {weekDays.map((d, i) => (
            <div key={i} onClick={() => onNav("calendar")} style={{
              flex: 1, height: 44, borderRadius: 12,
              background: d.hit ? "var(--green)" : "var(--card)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
              cursor: "pointer",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: d.hit ? "#fff" : "var(--text-2)" }}>{d.day}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: d.hit ? "var(--yellow)" : "var(--text-2)" }}>
                {d.hit ? "✓" : "·"}
              </div>
            </div>
          ))}
        </div>

        {/* Quiz banner */}
        <div className="card-row outline-orange" style={{ marginTop: 18, cursor: "pointer" }} onClick={() => onNav("quiz")}>
          <Icon.Target size={22} stroke="var(--orange)"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Daily knowledge check due</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>3 questions · ~60 seconds</div>
          </div>
          <Icon.ArrowRight size={18} stroke="var(--orange)"/>
        </div>

        {/* Tip card */}
        <div className="card" style={{ marginTop: 12, padding: 14, display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}
          onClick={() => onNav("coach")}>
          <Icon.Bulb size={18} stroke="var(--yellow)"/>
          <div style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.5, flex: 1 }}>
            On set today? Try the salad bar!<br/>
            Drink water between every take.
          </div>
          <Icon.ChevronRight size={14} stroke="var(--text-2)"/>
        </div>
      </div>
    </div>
  );
}

// ───── Log Food ─────
function LogFoodScreen({ state, setState, onNav, showToast }) {
  const { count, target, foodType, note } = state;
  const [localCount, setLocalCount] = useStateH(count);
  const [localType, setLocalType] = useStateH(foodType);
  const [localNote, setLocalNote] = useStateH(note);
  const [showNote, setShowNote] = useStateH(!!note);

  // Sync count back if state.count changed externally
  useEffect(() => { setLocalCount(count); }, [count]);

  const foodTypes = [
    { id: "salad", label: "Salad", icon: <Icon.Salad/> },
    { id: "fruit", label: "Fruit", icon: <Icon.Apple/> },
    { id: "veg", label: "Vegetable", icon: <Icon.Leaf/> },
    { id: "legume", label: "Legume", icon: <Icon.Bean/> },
    { id: "carrot", label: "Carrot", icon: <Icon.Carrot/> },
    { id: "water", label: "Water", icon: <Icon.Drop/> },
  ];

  const inc = () => setLocalCount(c => Math.min(target + 5, c + 1));
  const dec = () => setLocalCount(c => Math.max(0, c - 1));

  // Commit — used by both the slider and AI scan flows
  // Stays on screen so user can keep adding; hero count updates live.
  const commit = (addAmt, typeId) => {
    const finalCount = Math.min(target + 5, count + addAmt);
    const finalType = typeId || localType;
    const finalLabel = foodTypes.find(f => f.id === finalType)?.label || "veggies";
    setState(s => ({ ...s, count: finalCount, foodType: finalType, note: localNote }));
    showToast(`+${addAmt} ${finalLabel.toLowerCase()} — ${finalCount}/${target} today`);
  };

  // ring math
  const ringSize = 108, ringStroke = 8;
  const ringR = (ringSize - ringStroke) / 2;
  const ringC = 2 * Math.PI * ringR;
  const ringPct = Math.min(1, count / target);
  const goalHit = count >= target;

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="home" label="Home" title="Log Serves"/>
      <div className="page-pad">

        {/* HERO: Today's count card with ring + edit pill */}
        <div style={{
          background: "var(--green)", borderRadius: 24, padding: "18px 18px 20px", marginTop: 14,
          position: "relative", overflow: "hidden",
          boxShadow: "0 8px 24px rgba(48,185,100,0.22)",
        }}>
          {/* Decorative blob */}
          <div style={{
            position: "absolute", right: -60, top: -60, width: 180, height: 180, borderRadius: "50%",
            background: "rgba(255,255,255,0.07)", pointerEvents: "none",
          }}/>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div>
              <div className="eyebrow" style={{ color: "#fff", opacity: 0.85 }}>TODAY'S COUNT</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 4, fontWeight: 500 }}>
                {goalHit ? "🎉 Goal hit — amazing!" : `${target - count} to reach today's goal`}
              </div>
            </div>
            <button onClick={() => onNav("edit-log")} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.32)",
              color: "#fff", fontWeight: 600, fontSize: 12,
              padding: "7px 13px", borderRadius: 999, cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}>
              <Icon.Pencil size={13} strokeWidth={2.2}/> Edit
            </button>
          </div>

          {/* Ring + count */}
          <div style={{ display: "grid", placeItems: "center", marginTop: 14, position: "relative" }}>
            <svg width={ringSize} height={ringSize} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={ringSize/2} cy={ringSize/2} r={ringR}
                stroke="rgba(255,255,255,0.22)" strokeWidth={ringStroke} fill="none"/>
              <circle cx={ringSize/2} cy={ringSize/2} r={ringR}
                stroke="#fff" strokeWidth={ringStroke} fill="none"
                strokeLinecap="round" strokeDasharray={ringC} strokeDashoffset={ringC * (1 - ringPct)}
                style={{ transition: "stroke-dashoffset .6s cubic-bezier(.2,.7,.3,1)" }}/>
            </svg>
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span className="anim-pop" key={count} style={{
                fontSize: 38, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: -1.2,
              }}>{count}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", marginTop: 2, fontWeight: 500 }}>
                of {target} serves
              </span>
            </div>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12 }}>
            {Array.from({ length: target }).map((_, i) => (
              <span key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i < count ? "#fff" : "rgba(255,255,255,0.3)",
                transition: "background .25s ease",
              }}/>
            ))}
          </div>
        </div>

        {/* Quick add slider — primary input */}
        <QuickAddSlider
          foodTypes={foodTypes}
          localType={localType}
          setLocalType={setLocalType}
          onAdd={(amt) => commit(amt)}
        />

        <div onClick={() => onNav("learn-detail", { topic: "what-counts" })} style={{
          textAlign: "center", marginTop: 14, color: "var(--green)", fontSize: 13,
          cursor: "pointer", textDecoration: "underline", fontWeight: 600,
        }}>
          What counts as a serve?
        </div>

        {/* Scan with AI — alternative entry point, 3D pill */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          <button className="scan-ai-btn" onClick={() => onNav("camera")} style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, #4F46E5 0%, #6D28D9 45%, #7E22CE 75%, #9D4EDD 100%)",
            border: "none", color: "#fff", fontWeight: 700, fontSize: 14,
            borderRadius: 999, padding: "10px 18px 10px 12px", cursor: "pointer",
            transform: "translateY(0)", transition: "all .12s ease",
          }}>
            <span style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "rgba(255,255,255,0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
              display: "grid", placeItems: "center",
            }}>
              <Icon.Camera size={18} strokeWidth={2.2}/>
            </span>
            Scan with AI
            <Icon.Sparkles size={14} strokeWidth={2.4} style={{ marginLeft: -2, opacity: 0.9 }}/>
          </button>
        </div>

        {/* Notes — always visible, compact */}
        <div className="input-wrap" style={{ marginTop: 12, padding: "8px 14px" }}>
          <label style={{ fontSize: 10 }}>Note (optional)</label>
          <textarea
            rows={1}
            value={localNote}
            onChange={e => setLocalNote(e.target.value)}
            placeholder="e.g. Lunch at set canteen…"
            style={{ minHeight: 20, lineHeight: 1.3, fontSize: 13 }}/>
        </div>

        {/* Done — explicit exit back to dashboard */}
        <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 14 }}
          onClick={() => onNav("home")}>
          Done <Icon.ArrowRight size={18}/>
        </button>
      </div>
    </div>
  );
}

// ───── Edit Log ─────
function EditLogScreen({ state, setState, onNav, showToast, params = {} }) {
  const { target, streak } = state;
  const [initialCount] = useStateH(params.serves !== undefined ? params.serves : state.count);
  const [newCount, setNewCount] = useStateH(Math.max(0, initialCount - 1));
  const [reason, setReason] = useStateH("over");
  const [confirmed, setConfirmed] = useStateH(false);

  const reasons = [
    { id: "over",   label: "Over-estimated portion",      icon: "⬇️" },
    { id: "under",  label: "Under-estimated portion",     icon: "⬆️" },
    { id: "forgot", label: "Forgot I'd already counted",  icon: "📝" },
    { id: "missed", label: "Forgot to log a meal",        icon: "🍽️" },
    { id: "wrong",  label: "Entered wrong number",        icon: "❌" },
  ];

  const inc = () => setNewCount(c => Math.min(target + 5, c + 1));
  const dec = () => setNewCount(c => Math.max(0, c - 1));
  const reasonLabel = reasons.find(r => r.id === reason)?.label;
  // direction of correction — lets us style and copy contextually
  const correctedUp   = newCount > initialCount;
  const correctedDown = newCount < initialCount;
  const correctedSame = newCount === initialCount;

  const save = () => {
    if (!params.date) {
      setState(s => ({ ...s, count: newCount }));
    }
    setConfirmed(true);
  };

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  const remaining = Math.max(0, target - newCount);

  // ─── Confirmation overlay ───
  if (confirmed) {
    return (
      <div className="scene has-dock anim-fade">
        <div className="page-pad" style={{
          paddingTop: 40, flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
        }}>
          {/* Success icon */}
          <div className="anim-pop" style={{
            width: 88, height: 88, borderRadius: "50%",
            background: "var(--green-soft)",
            display: "grid", placeItems: "center", marginBottom: 18,
            boxShadow: "0 0 0 8px rgba(48,185,100,0.08)",
          }}>
            <Icon.Check size={48} stroke="var(--green)" strokeWidth={3}/>
          </div>

          <h1 style={{
            fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.5,
          }}>Log Corrected</h1>
          <p style={{
            fontSize: 14, color: "var(--text-2)", marginTop: 10, lineHeight: 1.5, maxWidth: 280,
          }}>
            {params.date ? `${params.date}'s` : "Today's"} record has been updated.<br/>Your weekly average has been recalculated.
          </p>

          {/* Change pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            background: "var(--card)", border: "1px solid var(--border-faint)",
            borderRadius: 16, padding: "14px 22px", marginTop: 22,
          }}>
            <span style={{
              fontSize: 32, fontWeight: 800, color: "var(--red)",
              textDecoration: "line-through", lineHeight: 1, letterSpacing: -1,
            }}>{initialCount}</span>
            <Icon.ArrowRight size={20} stroke="var(--text-2)"/>
            <span className="anim-pop" style={{
              fontSize: 32, fontWeight: 800, color: "var(--green)",
              lineHeight: 1, letterSpacing: -1,
            }}>{newCount}</span>
          </div>

          <div style={{
            fontSize: 11, color: "var(--text-2)", marginTop: 12,
            fontFamily: "'DM Mono', monospace",
          }}>
            Reason: {reasonLabel}
          </div>

          {/* Today status + streak */}
          <div style={{
            background: "var(--green-soft)", border: "1px solid var(--border-faint)",
            borderRadius: 16, padding: "14px 18px", marginTop: 22,
            width: "100%", maxWidth: 320,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>
              {newCount}/{target} serves today — {remaining > 0 ? `${remaining} to go` : "goal hit 🎉"}
            </div>
            <div style={{
              fontSize: 11, color: "var(--green)", opacity: 0.8, marginTop: 4,
              fontFamily: "'DM Mono', monospace",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            }}>
              <Icon.Flame size={12} fill="var(--orange)" stroke="none"/>
              {streak}-day streak still active
            </div>
          </div>

          <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 24, maxWidth: 320 }}
            onClick={() => onNav("home")}>
            Back to Dashboard <Icon.ArrowRight size={18}/>
          </button>
          <div onClick={() => onNav("log")} style={{
            marginTop: 14, fontSize: 13, fontWeight: 600, color: "var(--green)", cursor: "pointer",
          }}>
            + Add more serves now
          </div>
        </div>
      </div>
    );
  }

  // ─── Edit form ───
  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to={params.date ? "progress" : "log"} label={params.date ? "Activity" : "Today's Log"} title={params.date ? `Edit ${params.date}` : "Edit Today's Record"} subtitle={params.date ? undefined : today}/>

      <div className="page-pad">
        {/* Original count card */}
        <div className="card" style={{ marginTop: 14, padding: 16 }}>
          <div className="eyebrow" style={{ color: "var(--text-2)" }}>ORIGINAL COUNT</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
            <span style={{
              fontSize: 44, fontWeight: 800, color: "var(--red)", lineHeight: 1,
              textDecoration: "line-through", letterSpacing: -1.5,
            }}>{initialCount}</span>
            <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.4, fontFamily: "'DM Mono', monospace" }}>
              serves<br/>(before correction)
            </div>
          </div>
        </div>

        {/* Correction panel — neutral, adapts to direction */}
        <div style={{
          marginTop: 12, padding: 16, borderRadius: 18,
          background: "var(--card)", border: "1.5px solid var(--border-faint)",
        }}>
          <div style={{
            fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 12,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Icon.Pencil size={14}/> Correct to:
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={dec} disabled={newCount === 0} style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "var(--card-2)", border: "2px solid var(--red)", color: "var(--red)",
              display: "grid", placeItems: "center", cursor: newCount === 0 ? "not-allowed" : "pointer",
              opacity: newCount === 0 ? 0.4 : 1,
            }}>
              <Icon.Minus size={24} strokeWidth={3}/>
            </button>
            <div style={{ textAlign: "center" }}>
              <span className="anim-pop" key={newCount} style={{
                fontSize: 48, fontWeight: 800, lineHeight: 1, letterSpacing: -1.5,
                color: correctedDown ? "var(--red)" : correctedUp ? "var(--green)" : "var(--text)",
              }}>{newCount}</span>
              <div style={{
                fontSize: 10, marginTop: 4, fontFamily: "'DM Mono', monospace",
                color: "var(--text-2)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                new count
                {!correctedSame && (
                  <div className="anim-up" style={{
                    fontSize: 12, fontWeight: 700, color: correctedUp ? "var(--green)" : "var(--orange)",
                    background: correctedUp ? "rgba(48,185,100,0.15)" : "rgba(232,98,10,0.15)",
                    padding: "2px 8px", borderRadius: 999, marginLeft: "auto", display: "inline-block"
                  }}>
                    {correctedUp ? `+${newCount - initialCount}` : `${newCount - initialCount}`}
                  </div>
                )}
              </div>
            </div>
            <button onClick={inc} disabled={newCount >= target + 5} style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "var(--card-2)", border: "2px solid var(--green)", color: "var(--green)",
              display: "grid", placeItems: "center", cursor: newCount >= target + 5 ? "not-allowed" : "pointer",
              opacity: newCount >= target + 5 ? 0.35 : 1,
            }}>
              <Icon.Plus size={24} strokeWidth={3}/>
            </button>
          </div>

          <div style={{ marginTop: 18, fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
            Why are you correcting?
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
            {reasons.map(r => {
              const active = r.id === reason;
              return (
                <div key={r.id} onClick={() => setReason(r.id)} style={{
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 12,
                  background: active ? "var(--green-soft)" : "transparent",
                  border: "1.5px solid " + (active ? "var(--green)" : "var(--border-faint)"),
                  color: active ? "var(--green)" : "var(--text)",
                  fontWeight: active ? 700 : 500, fontSize: 13,
                  transition: "all .15s ease",
                }}>
                  <span style={{ fontSize: 15 }}>{r.icon}</span>
                  <span>{r.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className={`btn btn-full btn-lg ${correctedSame ? "btn-secondary" : "btn-primary"}`}
          style={{ marginTop: 24, transition: "background .3s, color .3s" }}
          disabled={!reason}
          onClick={save}>
          {correctedSame ? "No changes" : correctedUp ? `Add ${newCount - initialCount} more → ${newCount} serves` : `Reduce to ${newCount} serve${newCount !== 1 ? "s" : ""}`} <Icon.Check size={18}/>
        </button>
        <div onClick={() => onNav("home")} style={{
          textAlign: "center", marginTop: 14, color: "var(--text-2)", fontSize: 14,
          cursor: "pointer", textDecoration: "underline", fontFamily: "'DM Mono', monospace",
        }}>
          Cancel
        </div>
      </div>
    </div>
  );
}

window.MainScreens = { HomeScreen, LogFoodScreen, EditLogScreen };

// ───── Quick Add Slider ─────
// Top-tier drag slider — 1–5 serves with snap-to-tick, big draggable thumb,
// food-type chips below, and a contextual Add button.
function QuickAddSlider({ foodTypes, localType, setLocalType, onAdd }) {
  const MAX = 5;
  const [amt, setAmt] = useStateH(1);
  const [dragging, setDragging] = useStateH(false);
  const trackRef = React.useRef(null);

  const activeFood = foodTypes.find(f => f.id === localType) || foodTypes[0];

  const updateFromPointer = (clientX) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    const raw = pct * (MAX - 1) + 1; // 1..MAX
    setAmt(Math.round(raw));
  };

  const onPointerDown = (e) => {
    setDragging(true);
    updateFromPointer(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => { if (dragging) updateFromPointer(e.clientX); };
  const onPointerUp = (e) => {
    setDragging(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
  };

  const pctPos = ((amt - 1) / (MAX - 1)) * 100;

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12,
      }}>
        <div className="eyebrow">QUICK ADD</div>
        <div style={{ fontSize: 10, color: "var(--text-2)", fontFamily: "'DM Mono', monospace" }}>
          DRAG · TAP TICKS
        </div>
      </div>

      <div className="card" style={{ padding: "16px 18px 18px" }}>
        {/* Live value + label + serve definition tip */}
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginBottom: 4,
        }}>
          <span key={amt} className="anim-pop" style={{
            fontSize: 40, fontWeight: 800, color: "var(--green)", lineHeight: 1, letterSpacing: -1.5,
          }}>+{amt}</span>
          <span style={{ fontSize: 13, color: "var(--text-2)", fontWeight: 500 }}>
            serve{amt !== 1 ? "s" : ""} of {activeFood.label.toLowerCase()}
          </span>
        </div>
        <div style={{
          fontSize: 10, color: "var(--text-2)", textAlign: "center", marginBottom: 14,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
          fontFamily: "'DM Mono', monospace", opacity: 0.7,
        }}>
          <Icon.Bulb size={11} stroke="var(--yellow-2)"/>
          1 serve ≈ ½ cup cooked / 1 cup raw
        </div>

        {/* Slider track */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            position: "relative", height: 48, marginInline: 14, cursor: "pointer",
            touchAction: "none", userSelect: "none",
          }}>
          {/* Track background */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            transform: "translateY(-50%)", height: 10, borderRadius: 999,
            background: "var(--card-2)", border: "1px solid var(--border-faint)",
          }}/>
          {/* Filled portion */}
          <div style={{
            position: "absolute", top: "50%", left: 0,
            transform: "translateY(-50%)", height: 10, borderRadius: 999,
            width: `${pctPos}%`,
            background: "linear-gradient(90deg, var(--green-2) 0%, var(--green) 100%)",
            transition: dragging ? "none" : "width .18s cubic-bezier(.2,.7,.3,1)",
          }}/>
          {/* Ticks (clickable) */}
          {Array.from({ length: MAX }).map((_, i) => {
            const v = i + 1;
            const left = (i / (MAX - 1)) * 100;
            const passed = v <= amt;
            return (
              <div key={v}
                onClick={(e) => { e.stopPropagation(); setAmt(v); }}
                style={{
                  position: "absolute", top: "50%", left: `${left}%`,
                  transform: "translate(-50%, -50%)",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  cursor: "pointer", padding: "6px 4px",
                }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: passed ? "#fff" : "var(--border)",
                  boxShadow: passed ? "0 0 0 1.5px var(--green)" : "none",
                }}/>
                <div style={{
                  fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono', monospace",
                  color: v === amt ? "var(--green)" : "var(--text-2)",
                  marginTop: 10,
                }}>{v}</div>
              </div>
            );
          })}
          {/* Thumb */}
          <div style={{
            position: "absolute", top: "50%", left: `${pctPos}%`,
            transform: `translate(-50%, -50%) scale(${dragging ? 1.1 : 1})`,
            width: 34, height: 34, borderRadius: "50%",
            background: "#fff", border: "3px solid var(--green)",
            display: "grid", placeItems: "center",
            color: "var(--green)", fontWeight: 800, fontSize: 14,
            boxShadow: dragging
              ? "0 8px 20px rgba(48,185,100,0.35)"
              : "0 4px 12px rgba(0,0,0,0.12)",
            pointerEvents: "none",
            transition: dragging ? "none" : "left .18s cubic-bezier(.2,.7,.3,1), transform .15s ease",
          }}>
            {amt}
          </div>
        </div>

        {/* Food-type chips — single row, horizontal scroll */}
        <div style={{
          display: "flex", gap: 6, marginTop: 18, overflowX: "auto", paddingBottom: 4,
          scrollbarWidth: "none",
        }}>
          {foodTypes.map(ft => {
            const active = ft.id === localType;
            return (
              <button key={ft.id} onClick={() => setLocalType(ft.id)} style={{
                flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
                background: active ? "var(--green)" : "transparent",
                border: "1px solid " + (active ? "var(--green)" : "var(--border-faint)"),
                color: active ? "#fff" : "var(--text-2)",
                borderRadius: 999, padding: "6px 12px", cursor: "pointer",
                fontWeight: 600, fontSize: 12,
                transition: "all .15s ease",
              }}>
                {React.cloneElement(ft.icon, { size: 13 })}
                {ft.label}
              </button>
            );
          })}
        </div>

        {/* Commit button */}
        <button onClick={() => onAdd(amt)} style={{
          width: "100%", marginTop: 14,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          background: "var(--green)", border: "none", color: "#fff",
          borderRadius: 12, padding: "12px 16px", cursor: "pointer",
          fontWeight: 700, fontSize: 14,
          boxShadow: "0 4px 0 var(--green-3)",
        }}>
          <Icon.Plus size={16} strokeWidth={3}/>
          Add {amt} {activeFood.label.toLowerCase()}
        </button>
      </div>
    </div>
  );
}
