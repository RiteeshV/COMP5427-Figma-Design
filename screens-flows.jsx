// Progress, Calendar, AI Camera, AI Coach screens

const { useState: useStateP, useRef: useRefP, useEffect: useEffectP } = React;

// ───── My Progress ─────
// Progress is a *trends + history* screen. It deliberately does NOT
// duplicate the amount-input flow from Log Serves — that screen owns
// "log a new serve". Progress owns "look back & correct". Today's count
// is shown compactly with the SAME Edit pill pattern from Log Serves,
// so the user has two consistent entry points for corrections.
function ProgressScreen({ state, setState, onNav }) {
  const { count, target, streak, weekDays } = state;
  const pct = Math.round((count / target) * 100);
  const daysHit = weekDays.filter(d => d.hit).length;
  const remaining = Math.max(0, target - count);
  const todayLabel = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });

  // Mount flag drives all the entry animations
  const [mounted, setMounted] = useStateP(false);
  useEffectP(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Synthesize per-day serve counts so the weekly bars are meaningful.
  // The last entry is "today" and reads from live state.
  const dailyServes = [5, 5, 3, 5, 2, 5]; // Mon..Sat mock
  const dayData = weekDays.map((d, i) => {
    const isToday = i === weekDays.length - 1;
    return {
      ...d,
      serves: isToday ? count : (dailyServes[i] ?? (d.hit ? 5 : 2)),
      isToday,
    };
  });
  const total = dayData.reduce((s, d) => s + d.serves, 0);
  const avg = (total / 7).toFixed(1);

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="home" label="Home" title="Activity" />
      <div className="page-pad">

        {/* TODAY CARD — mirrors Log Serves hero pattern, includes Edit pill */}
        <div className="anim-up" style={{
          marginTop: 14, padding: "16px 18px", borderRadius: 20,
          background: "var(--green)", color: "#fff", position: "relative", overflow: "hidden",
          boxShadow: "0 8px 24px rgba(48,185,100,0.22)",
          animationDelay: "0ms",
        }}>
          {/* Decorative blob */}
          <div style={{
            position: "absolute", right: -50, top: -50, width: 160, height: 160, borderRadius: "50%",
            background: "rgba(255,255,255,0.07)", pointerEvents: "none",
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div>
              <div className="eyebrow" style={{ color: "#fff", opacity: 0.85 }}>TODAY · {todayLabel}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, letterSpacing: -1.5 }}>{count}</span>
                <span style={{ fontSize: 18, opacity: 0.7, fontWeight: 500 }}>/ {target} serves</span>
              </div>
            </div>
            <button onClick={() => onNav("edit-log")} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.32)",
              color: "#fff", fontWeight: 600, fontSize: 12,
              padding: "7px 13px", borderRadius: 999, cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}>
              <Icon.Pencil size={13} strokeWidth={2.2} /> Edit
            </button>
          </div>
          {/* Progress bar — animated fill */}
          <div style={{ marginTop: 14, position: "relative" }}>
            <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: mounted ? `${Math.min(100, pct)}%` : "0%",
                background: "#fff", borderRadius: 999,
                transition: "width .9s cubic-bezier(.2,.7,.3,1) .25s",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 11, opacity: 0.9 }}>
              <span style={{ fontWeight: 700 }}>{pct}% of target</span>
              <span>{remaining > 0 ? `${remaining} more before midnight` : "🎉 Goal hit!"}</span>
            </div>
          </div>
        </div>

        {/* THIS WEEK — bar chart with tap-to-edit */}
        <div className="anim-up" style={{ marginTop: 18, animationDelay: "100ms" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <div className="eyebrow">THIS WEEK</div>
            <div style={{ fontSize: 10, color: "var(--text-2)", fontFamily: "'DM Mono', monospace", opacity: 0.7 }}>
              TAP A DAY TO EDIT
            </div>
          </div>
          <div className="card" style={{ padding: "14px 10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {dayData.map((d, i) => {
                const dayPct = Math.min(1, d.serves / target);
                const hit = d.serves >= target;
                return (
                  <div key={i}
                    onClick={() => {
                      const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                      onNav("edit-log", { date: d.isToday ? undefined : (i === dayData.length - 2 ? "Yesterday" : fullDays[i]), serves: d.serves, isToday: d.isToday });
                    }}
                    className={d.isToday ? "today-bar-pulse" : ""}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                      cursor: "pointer",
                      padding: "6px 2px", borderRadius: 10,
                      background: d.isToday ? "var(--green-soft)" : "transparent",
                      border: d.isToday ? "1px solid var(--green)" : "1px solid transparent",
                      transition: "all .15s ease",
                    }}>
                    <div style={{
                      fontSize: 9, fontWeight: 700,
                      color: d.isToday ? "var(--green)" : "var(--text-2)",
                      letterSpacing: 0.5,
                    }}>{d.day}</div>
                    {/* Vertical bar with staggered growth */}
                    <div style={{
                      width: 8, height: 44, borderRadius: 4,
                      background: "var(--card-2)",
                      position: "relative", overflow: "hidden",
                      border: "1px solid var(--border-faint)",
                    }}>
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: mounted ? `${dayPct * 100}%` : "0%",
                        background: hit ? "var(--green)" : "var(--yellow-2)",
                        borderRadius: 4,
                        transition: `height .7s cubic-bezier(.2,.7,.3,1) ${250 + i * 60}ms`,
                      }} />
                    </div>
                    <div style={{
                      fontSize: 12, fontWeight: 800,
                      color: hit ? "var(--green)" : "var(--text)",
                      lineHeight: 1,
                      opacity: mounted ? 1 : 0,
                      transition: `opacity .3s ease ${500 + i * 60}ms`,
                    }}>{d.serves}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="anim-up" style={{ display: "flex", gap: 8, marginTop: 14, animationDelay: "180ms" }}>
          <div className="card" style={{ flex: 1, padding: "12px 10px" }}>
            <Icon.Target size={16} stroke="var(--teal)" />
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6, color: "var(--teal)", lineHeight: 1 }}>{daysHit}/7</div>
            <div style={{ fontSize: 10, color: "var(--text-2)", marginTop: 2 }}>days hit</div>
          </div>
          <div className="card" style={{ flex: 1, padding: "12px 10px" }}>
            <Icon.Diamond size={16} stroke="var(--purple)" />
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6, color: "var(--purple)", lineHeight: 1 }}>{avg}</div>
            <div style={{ fontSize: 10, color: "var(--text-2)", marginTop: 2 }}>daily avg</div>
          </div>
          <div className="card" style={{ flex: 1, padding: "12px 10px" }}>
            <Icon.Flame size={16} stroke="var(--orange)" fill="var(--orange)" />
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6, color: "var(--orange)", lineHeight: 1 }}>{streak}</div>
            <div style={{ fontSize: 10, color: "var(--text-2)", marginTop: 2 }}>day streak</div>
          </div>
        </div>

        {/* AI insight */}
        <div className="card anim-up" style={{ marginTop: 14, padding: 14, display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", animationDelay: "260ms" }}
          onClick={() => onNav("coach")}>
          <span style={{
            width: 36, height: 36, borderRadius: 10, background: "var(--purple-soft)",
            display: "grid", placeItems: "center", color: "var(--purple)", flexShrink: 0,
          }}>
            <Icon.Sparkles size={18} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Ask AI Coach</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 4, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 600, color: "var(--purple)" }}>Pattern Detected:</span> You miss serves on shoot days. Tap to get a personalised pre-log plan.
            </div>
          </div>
          <Icon.ChevronRight size={14} stroke="var(--text-2)" />
        </div>

        {/* Knowledge Check insight — entry point to Goal 5B */}
        <div className="card anim-up" style={{
          marginTop: 10, padding: 14, display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer",
          animationDelay: "300ms",
          border: "1px solid rgba(124,58,237,0.22)",
          background: "linear-gradient(135deg, rgba(124,58,237,0.04), rgba(167,139,250,0.06))",
        }}
          onClick={() => onNav("quiz-history")}>
          <span style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(124,58,237,0.15)",
            display: "grid", placeItems: "center", flexShrink: 0,
            fontSize: 18,
          }}>🧠</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Knowledge Check History</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 4, lineHeight: 1.5 }}>
              Starchy Veg accuracy is your lowest at 42%. Tap to review.
            </div>
          </div>
          <Icon.ChevronRight size={14} stroke="var(--text-2)" />
        </div>

        <button className="btn btn-secondary btn-full btn-lg anim-up" style={{ marginTop: 14, animationDelay: "340ms" }} onClick={() => onNav("calendar")}>
          <Icon.Cal size={18} /> View Full Calendar
        </button>
      </div>
    </div>
  );
}

// ───── Calendar ─────
function CalendarScreen({ state, onNav }) {
  // Generate Apr 2026 (start Wed = day 0 Mon? Actually map to a grid M-S)
  // We'll keep it visually identical to the design: M T W T F S S header
  const daysInMonth = 30;
  const startDayOfWeek = 0; // April 1 is a Wednesday in 2026 but design starts Mon=0. We'll mock.
  const today = 24;
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1;
    if (d === today) return { d, state: "today" };
    if (d > today) return { d, state: "future" };
    // Random pattern matching design: most hit, some miss
    const misses = [4, 7, 11, 14, 16];
    return { d, state: misses.includes(d) ? "miss" : "hit" };
  });
  const hitCount = days.filter(x => x.state === "hit").length;
  const rate = Math.round((hitCount / today) * 100);
  const weekHeader = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="progress" label="Progress" title="April 2026" subtitle={`${hitCount} of ${today} days on target  ·  ${rate}%`} />
      <div className="page-pad">

        <div style={{
          marginTop: 16, padding: "18px 14px", borderRadius: 18, background: "var(--green)",
          textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {rate}% HIT RATE — Excellent! <Icon.Flame size={18} fill="#fff" stroke="none" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginTop: 22 }}>
          {weekHeader.map((d, i) => (
            <div key={i} style={{ fontSize: 10, fontWeight: 600, color: "var(--text-2)", textAlign: "center", marginBottom: 4 }}>{d}</div>
          ))}
          {days.map((d, i) => {
            const bg = d.state === "hit" ? "var(--green)"
              : d.state === "today" ? "var(--yellow)"
                : d.state === "miss" ? "var(--card)"
                  : "transparent";
            const fg = d.state === "today" ? "#151A16"
              : d.state === "future" ? "var(--text-3)"
                : d.state === "hit" ? "#fff"
                  : "var(--text-2)";
            return (
              <div key={i} style={{
                aspectRatio: "1 / 1", borderRadius: 10, background: bg,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                color: fg, fontSize: 13, fontWeight: 700,
                border: d.state === "miss" ? "1px solid var(--border)" : "none",
              }}>
                {d.d}
                {d.state === "hit" && <div style={{ fontSize: 9, color: "var(--yellow)", marginTop: 1 }}>✓</div>}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 18, marginTop: 18, fontSize: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--green)" }} /> Hit</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--card)", border: "1px solid var(--border)" }} /> Miss</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--yellow)" }} /> Today</div>
        </div>

        {/* Pattern detected */}
        <div className="card" style={{ marginTop: 18, display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}
          onClick={() => onNav("coach")}>
          <Icon.Sparkles size={20} stroke="var(--purple)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Pattern Detected</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 4, lineHeight: 1.5 }}>
              You miss Wed + Tue (shoot days). Pre-log meals the night before!
            </div>
          </div>
          <Icon.ChevronRight size={16} stroke="var(--text-2)" />
        </div>

        <button className="btn btn-teal btn-full btn-lg" style={{ marginTop: 14 }} onClick={() => onNav("notifications")}>
          Set Shoot Day Reminder →
        </button>
        <button className="btn btn-secondary btn-full btn-lg" style={{ marginTop: 10 }} onClick={() => onNav("coach")}>
          <Icon.Sparkles size={18} /> Ask AI Coach
        </button>
      </div>
    </div>
  );
}

// ───── AI Camera ─────
function CameraScreen({ state, setState, onNav, showToast }) {
  const [scanning, setScanning] = useStateP(true);
  const [detected, setDetected] = useStateP(null);

  useEffectP(() => {
    const t = setTimeout(() => {
      setDetected({
        name: "Mixed Salad Bowl",
        confidence: 94,
        cal: 180,
        serves: 1.2,
        tags: ["Veg ✓", "Protein ✓", "Fibre ✓"],
      });
      setScanning(false);
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  const logMeal = () => {
    setState(s => ({ ...s, count: Math.min(s.target + 5, s.count + Math.ceil(detected.serves)) }));
    showToast(`+${Math.ceil(detected.serves)} serve logged from AI`);
    setTimeout(() => onNav("home"), 1200);
  };

  const rescan = () => {
    setDetected(null);
    setScanning(true);
    setTimeout(() => {
      const samples = [
        { name: "Stir-fry Bowl", confidence: 89, cal: 220, serves: 1.5, tags: ["Veg ✓", "Protein ✓"] },
        { name: "Garden Salad", confidence: 96, cal: 140, serves: 1, tags: ["Veg ✓", "Fibre ✓"] },
        { name: "Roasted Veg Plate", confidence: 92, cal: 210, serves: 2, tags: ["Veg ✓", "Fibre ✓"] },
      ];
      setDetected(samples[Math.floor(Math.random() * samples.length)]);
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="scene" style={{ background: "#0a0a0a", color: "#fff" }}>
      <div style={{ padding: "16px 24px 14px", background: "#101410", display: "flex", alignItems: "center", gap: 14 }}>
        <div onClick={() => onNav("home")} style={{ color: "var(--green)", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Icon.ArrowLeft size={16} /> Back
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Scan Food</div>
          <div style={{ fontSize: 11, color: "var(--text-2)" }}>AI-powered detection</div>
        </div>
      </div>

      {/* Camera viewfinder */}
      <div style={{
        position: "relative", height: 420, background: "linear-gradient(135deg, #0a0a0a 0%, #1a1f1c 100%)",
        overflow: "hidden",
      }}>
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
          <div style={{ position: "absolute", left: "33.33%", top: 0, bottom: 0, width: 1, background: "var(--green)" }} />
          <div style={{ position: "absolute", left: "66.66%", top: 0, bottom: 0, width: 1, background: "var(--green)" }} />
          <div style={{ position: "absolute", top: "33.33%", left: 0, right: 0, height: 1, background: "var(--green)" }} />
          <div style={{ position: "absolute", top: "66.66%", left: 0, right: 0, height: 1, background: "var(--green)" }} />
        </div>
        {/* Corners */}
        {[
          { top: 30, left: 30, br: "0 0 0 20px" },
          { top: 30, right: 30, br: "0 0 20px 0" },
          { bottom: 30, left: 30, br: "0 20px 0 0" },
          { bottom: 30, right: 30, br: "20px 0 0 0" },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute", width: 44, height: 44,
            top: c.top, left: c.left, right: c.right, bottom: c.bottom,
            borderColor: "var(--green)",
            borderStyle: "solid",
            borderWidth: 0,
            ...(i === 0 && { borderTopWidth: 3, borderLeftWidth: 3, borderRadius: "12px 0 0 0" }),
            ...(i === 1 && { borderTopWidth: 3, borderRightWidth: 3, borderRadius: "0 12px 0 0" }),
            ...(i === 2 && { borderBottomWidth: 3, borderLeftWidth: 3, borderRadius: "0 0 0 12px" }),
            ...(i === 3 && { borderBottomWidth: 3, borderRightWidth: 3, borderRadius: "0 0 12px 0" }),
          }} />
        ))}

        {/* Scan line */}
        {scanning && (
          <div style={{
            position: "absolute", left: 30, right: 30, top: "50%",
            height: 2, background: "var(--green)",
            boxShadow: "0 0 12px var(--green)",
            animation: "scanLine 1.5s ease-in-out infinite",
          }} />
        )}

        <div style={{
          position: "absolute", bottom: 90, left: 0, right: 0,
          textAlign: "center", color: "var(--green)", fontSize: 11, fontWeight: 600, letterSpacing: 3,
        }}>
          {scanning ? "ANALYSING…" : "POINT AT FOOD"}
        </div>

        <style>{`
          @keyframes scanLine {
            0%, 100% { top: 30%; }
            50% { top: 70%; }
          }
        `}</style>
      </div>

      {/* Detection card */}
      {detected && (
        <div className="anim-fade" style={{
          margin: "14px 14px 0", padding: 16, background: "var(--card)", borderRadius: 18,
          border: "1px solid var(--border-faint)",
        }}>
          <div style={{ fontSize: 9, color: "var(--green)", fontWeight: 700, letterSpacing: 3 }}>AI DETECTED:</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon.Salad size={22} stroke="var(--green)" />
            {detected.name}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 6 }}>
            Confidence: {detected.confidence}%  ·  ~{detected.cal} cal  ·  {detected.serves} serves
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {detected.tags.map((t, i) => {
              const colors = ["var(--green)", "var(--teal)", "var(--yellow)"];
              return (
                <span key={i} style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                  background: "transparent", border: "1px solid " + colors[i % 3], color: colors[i % 3],
                }}>{t}</span>
              );
            })}
          </div>
          <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 14 }} onClick={logMeal}>
            Log This Meal <Icon.ArrowRight size={18} />
          </button>
          <div onClick={rescan} style={{ textAlign: "center", marginTop: 12, color: "var(--text-2)", fontSize: 13, cursor: "pointer" }}>
            Scan Again
          </div>
        </div>
      )}
    </div>
  );
}

// ───── AI Coach ─────
function CoachScreen({ state, onNav, showToast, context }) {
  const isStreakWarning = context === "streak-warning";
  const initialMessages = isStreakWarning
    ? [
        { role: "ai", text: "Hey Muthu, I noticed your " + state.streak + "-day streak is at risk tonight! You shoot Wednesdays — your hardest day." },
        { role: "ai", text: "Want a pre-log plan to save your streak before midnight?" }
      ]
    : [
        { role: "ai", text: "Hey Muthu! You're at " + state.count + "/" + state.target + " serves. Great salad at lunch 🥗" },
        { role: "ai", text: "You shoot Wednesdays — your hardest day. Want a pre-log plan?" },
      ];

  const [messages, setMessages] = useStateP(initialMessages);
  const [input, setInput] = useStateP("");
  const [thinking, setThinking] = useStateP(false);
  const scrollRef = useRefP(null);

  useEffectP(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text) return;
    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setThinking(true);

    if (isStreakWarning) {
      setTimeout(() => {
        let reply = "";
        if (text.toLowerCase().includes("plan")) {
          reply = "Here's your plan for tomorrow's shoot:\n• 7am: Spinach smoothie (1 serve)\n• 12pm: Salad bar (2 serves)\n• 3pm: Apple + almonds (1 serve)\n• 7pm: Light dinner with broccoli (1 serve)\n\nShall I set a 7:00 AM reminder?";
        } else if (text.toLowerCase().includes("reminder") || text.toLowerCase().includes("yes")) {
          reply = "Done! I've set a reminder for 7:00 AM tomorrow. Tomorrow — Shoot Day 🎬. You've got this!";
          showToast("7:00 AM Reminder Set");
        } else {
          reply = "You can still save your streak tonight! Grab a quick carrot or some cherry tomatoes.";
        }
        setMessages(m => [...m, { role: "ai", text: reply }]);
        setThinking(false);
      }, 1500);
      return;
    }

    try {
      const systemContext = `You are VeggieTrack AI Coach — a friendly, concise nutrition assistant inside a vegetable-serve tracking app. The user (Muthu) is a film crew member who tracks vegetable serves daily. Today: ${state.count}/${state.target} serves logged, ${state.streak}-day streak. Keep replies under 60 words, warm, practical, action-oriented. Use one emoji max. Suggest concrete foods or habits.`;
      const reply = await window.claude.complete({
        messages: [
          { role: "user", content: systemContext + "\n\nConversation so far:\n" + next.map(m => (m.role === "user" ? "User: " : "Coach: ") + m.text).join("\n") + "\n\nReply as the Coach to the user's last message." },
        ],
      });
      setMessages(m => [...m, { role: "ai", text: reply.trim() }]);
    } catch (e) {
      let reply = "I'm offline right now — but aim for one veggie at each meal! 🥗";
      if (text.toLowerCase().includes("plan")) {
        reply = "Here's your plan for tomorrow's shoot:\n• 7am: Spinach smoothie (1 serve)\n• 12pm: Salad bar (2 serves)\n• 3pm: Apple + almonds (1 serve)\n• 7pm: Light dinner with broccoli (1 serve)\n\nShall I set a 7:00 AM reminder?";
      } else if (text.toLowerCase().includes("reminder") || text.toLowerCase().includes("yes")) {
        reply = "Done! I've set a reminder for 7:00 AM tomorrow. Tomorrow — Shoot Day 🎬. You've got this!";
        showToast("7:00 AM Reminder Set");
      } else if (isStreakWarning) {
        reply = "You can still save your streak tonight! Grab a quick carrot or some cherry tomatoes.";
      }
      setMessages(m => [...m, { role: "ai", text: reply }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="scene" style={{ paddingBottom: 0, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "10px 24px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid var(--border-faint)" }}>
        <div onClick={() => onNav("home")} style={{ cursor: "pointer", padding: 6 }}>
          <Icon.ArrowLeft size={18} stroke="var(--green)" />
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: "var(--teal)", display: "grid", placeItems: "center" }}>
          <Icon.Sparkles size={22} stroke="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>AI Coach</div>
          <div style={{ fontSize: 11, color: "var(--text-2)" }}>Powered by VeggieTrack AI</div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto", padding: "18px 18px 14px", display: "flex", flexDirection: "column", gap: 12,
      }}>
        {messages.map((m, i) => (
          <div key={i} className="anim-fade" style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "78%",
            background: m.role === "user" ? "var(--green)" : "var(--card)",
            color: m.role === "user" ? "#fff" : "var(--text)",
            borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
            padding: "12px 14px",
            fontSize: 14, lineHeight: 1.45, whiteSpace: "pre-wrap",
          }}>
            {m.text}
          </div>
        ))}
        {thinking && (
          <div style={{
            alignSelf: "flex-start",
            background: "var(--card)",
            borderRadius: "18px 18px 18px 4px",
            padding: "14px 16px",
            display: "flex", gap: 4,
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 6, height: 6, borderRadius: "50%", background: "var(--text-2)",
                animation: "bounce 1.2s ease-in-out infinite",
                animationDelay: (i * 0.15) + "s",
              }} />
            ))}
          </div>
        )}
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: .5; }
            40% { transform: translateY(-4px); opacity: 1; }
          }
        `}</style>
      </div>

      {/* Suggestions */}
      {!thinking && messages.length < 4 && (
        <div style={{ padding: "0 18px 10px", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Yes! Shoot day plan please.", "Set a 7am reminder!", "What's a quick veggie snack?"].map((s, i) => (
            <button key={i} onClick={() => send(s)} style={{
              padding: "6px 12px", fontSize: 11, fontWeight: 600,
              background: "var(--green-soft)", color: "var(--green)",
              borderRadius: 999, border: "1px solid var(--border-faint)",
            }}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: "10px 18px 28px", display: "flex", gap: 10, alignItems: "center",
        background: "var(--bg-2)", borderTop: "1px solid var(--border-faint)",
      }}>
        <div style={{ flex: 1, background: "var(--card)", borderRadius: 22, padding: "12px 16px" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") send(); }}
            placeholder="Ask your coach…"
            style={{
              background: "transparent", border: "none", outline: "none", color: "var(--text)",
              fontSize: 14, width: "100%",
            }}
          />
        </div>
        <button onClick={() => send()} style={{
          width: 44, height: 44, borderRadius: 22, background: "var(--green)",
          display: "grid", placeItems: "center", color: "#fff",
        }}>
          <Icon.Send size={18} />
        </button>
      </div>
    </div>
  );
}

window.FlowScreens = { ProgressScreen, CalendarScreen, CameraScreen, CoachScreen };
