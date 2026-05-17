// Quiz flow — Hub + 3-question quiz + Score + Performance History (Goal 5)
// Designed to match the high-fidelity prototype (violet/indigo theme).

const { useState: useStateQ, useEffect: useEffectQ } = React;

const QUIZ_QUESTIONS = [
  {
    id: 1,
    q: "How many serves is 1 cup raw spinach?",
    topic: "leafy",
    topicLabel: "Leafy Greens",
    topicEmoji: "🥬",
    options: [
      { k: "A", t: "½ serve" },
      { k: "B", t: "1 serve" },
      { k: "C", t: "2 serves" },
    ],
    correct: "B",
    feedback: "1 cup raw leafy greens = 1 serve. Raw greens take more volume than cooked.",
  },
  {
    id: 2,
    q: "How many serves is ½ cup of cooked potato?",
    topic: "starchy",
    topicLabel: "Starchy Vegetables",
    topicEmoji: "🥔",
    options: [
      { k: "A", t: "½ serve" },
      { k: "B", t: "1 serve" },
      { k: "C", t: "2 serves" },
    ],
    correct: "B",
    feedback: "½ cup of cooked starchy vegetables like potato or sweet potato = 1 serve — the same rule as other cooked vegetables.",
  },
  {
    id: 3,
    q: "Does ½ cup cooked broccoli = 1 serve?",
    topic: "cruciferous",
    topicLabel: "Cruciferous Veg",
    topicEmoji: "🥦",
    options: [
      { k: "A", t: "Yes" },
      { k: "B", t: "No, it's ½ serve" },
      { k: "C", t: "No, it's 2 serves" },
    ],
    correct: "A",
    feedback: "Yes — ½ cup of cooked vegetables = 1 serve, including broccoli.",
  },
];

// Topic accuracy aggregated across the past 4 weeks
const TOPIC_ACCURACY = [
  { id: "leafy",       name: "Leafy Greens",       emoji: "🥬", pct: 100, attempts: 12, missed: 0 },
  { id: "legumes",     name: "Legumes & Beans",    emoji: "🫘", pct: 83,  attempts: 12, missed: 2 },
  { id: "root",        name: "Root Vegetables",    emoji: "🥕", pct: 75,  attempts: 8,  missed: 2 },
  { id: "cruciferous", name: "Cruciferous Veg",    emoji: "🥦", pct: 67,  attempts: 9,  missed: 3 },
  { id: "starchy",     name: "Starchy Vegetables", emoji: "🥔", pct: 42,  attempts: 12, missed: 7 },
];

const pctColor = (p) => p >= 85 ? "var(--green)" : p >= 65 ? "var(--yellow-2)" : "var(--red)";

// ───── Quiz Hub ─────
function QuizHubScreen({ onNav, quizScore }) {
  const done = quizScore !== null;
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });

  return (
    <div className="scene has-dock">
      {/* Violet gradient header */}
      <div style={{
        padding: "16px 20px 18px",
        background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
        color: "#fff",
        borderRadius: "0 0 24px 24px",
      }}>
        <div onClick={() => onNav("home")} style={{
          fontSize: 11, opacity: 0.7, fontFamily: "'DM Mono', monospace",
          marginBottom: 6, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          <Icon.ArrowLeft size={12}/> Home
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>Daily Knowledge Check</div>
        <div style={{ fontSize: 11, opacity: 0.6, fontFamily: "'DM Mono', monospace", marginTop: 3 }}>
          {today} · {done ? "Completed ✓" : "Not yet completed"}
        </div>
      </div>

      <div className="page-pad" style={{ paddingTop: 16 }}>
        {/* Today's Check hero — violet gradient with brain glyph */}
        <div className="anim-up" style={{
          padding: "18px 20px", borderRadius: 20,
          background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
          color: "#fff", position: "relative", overflow: "hidden",
          boxShadow: "0 10px 24px rgba(124,58,237,0.32)",
        }}>
          <div style={{
            position: "absolute", right: -40, top: -40, width: 140, height: 140,
            borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none",
          }}/>
          <div style={{ display: "flex", gap: 14, alignItems: "center", position: "relative" }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(255,255,255,0.22)",
              display: "grid", placeItems: "center", fontSize: 28, flexShrink: 0,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
            }}>🧠</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.2 }}>Today's Check</div>
              <div style={{
                fontSize: 11, opacity: 0.75, fontFamily: "'DM Mono', monospace",
                marginTop: 3, lineHeight: 1.5,
              }}>
                3 questions · ~60 seconds<br/>
                Last completed: yesterday (3/3)
              </div>
            </div>
          </div>
          <button onClick={() => onNav("quiz-question", { qIndex: 0, answers: [] })}
            style={{
              marginTop: 14, background: "#fff", color: "#6d28d9",
              border: "none", borderRadius: 12, padding: "10px 20px",
              fontWeight: 700, fontSize: 14, cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8,
              boxShadow: "0 4px 0 rgba(0,0,0,0.12)",
            }}>
            {done ? "Review Quiz" : "Start Quiz"} <Icon.ArrowRight size={16}/>
          </button>
        </div>

        {/* Stats row */}
        <div className="anim-up" style={{ display: "flex", gap: 8, marginTop: 14, animationDelay: "80ms" }}>
          {[
            { val: "6",   label: "week streak" },
            { val: "86%", label: "avg accuracy" },
            { val: "28",  label: "checks done" },
          ].map((s, i) => (
            <div key={i} className="card" style={{ flex: 1, padding: "12px 10px", textAlign: "center" }}>
              <div style={{
                fontSize: 22, fontWeight: 800, color: "#7c3aed",
                lineHeight: 1, letterSpacing: -0.5,
              }}>{s.val}</div>
              <div style={{
                fontSize: 10, color: "var(--text-2)", marginTop: 4,
                fontFamily: "'DM Mono', monospace",
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent accuracy by topic */}
        <div className="anim-up" style={{ marginTop: 14, animationDelay: "160ms" }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>RECENT ACCURACY BY TOPIC</div>
          <div className="card" style={{ padding: "8px 14px" }}>
            {TOPIC_ACCURACY.slice(0, 3).map((t, i) => (
              <div key={t.id} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                borderBottom: i < 2 ? "1px solid var(--border-faint)" : "none",
              }}>
                <span style={{ fontSize: 18, width: 22, textAlign: "center" }}>{t.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{t.name}</span>
                <div style={{
                  width: 60, height: 6, borderRadius: 3, background: "var(--card-2)",
                  overflow: "hidden", border: "1px solid var(--border-faint)",
                }}>
                  <div style={{
                    width: `${t.pct}%`, height: "100%",
                    background: pctColor(t.pct), borderRadius: 3,
                  }}/>
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 700, fontFamily: "'DM Mono', monospace",
                  color: pctColor(t.pct), minWidth: 36, textAlign: "right",
                }}>{t.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* View full history — entry point for Goal 5B */}
        <button onClick={() => onNav("quiz-history")} className="anim-up" style={{
          marginTop: 14, width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px", borderRadius: 14,
          background: "linear-gradient(135deg, #1e1b4b, #3730a3)", color: "#fff",
          border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
          boxShadow: "0 6px 14px rgba(55,48,163,0.32)",
          animationDelay: "240ms",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 10,
              background: "rgba(255,255,255,0.18)",
              display: "grid", placeItems: "center", fontSize: 16,
            }}>📊</span>
            View Knowledge Check History
          </span>
          <Icon.ArrowRight size={18}/>
        </button>
      </div>
    </div>
  );
}

// ───── Quiz Question ─────
function QuizQuestionScreen({ qIndex, answers, onNav, setQuizScore }) {
  const q = QUIZ_QUESTIONS[qIndex];
  const [selected, setSelected] = useStateQ(null);
  // Reset selection when navigating to a new question (component is reused)
  useEffectQ(() => { setSelected(null); }, [qIndex]);
  const isCorrect = selected === q.correct;
  const answered = selected !== null;

  const onSelect = (k) => {
    if (!answered) setSelected(k);
  };

  const next = () => {
    const newAnswers = [...answers, { qIndex, selected, correct: q.correct, isCorrect, topic: q.topic }];
    if (qIndex < QUIZ_QUESTIONS.length - 1) {
      onNav("quiz-question", { qIndex: qIndex + 1, answers: newAnswers });
    } else {
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      setQuizScore({ answers: newAnswers, correct: correctCount, total: QUIZ_QUESTIONS.length });
      onNav("quiz-score", { answers: newAnswers });
    }
  };

  return (
    <div className="scene has-dock">
      {/* Progress dots header */}
      <div style={{
        padding: "16px 20px 14px", borderBottom: "1px solid var(--border-faint)",
        background: "var(--bg)",
      }}>
        <div onClick={() => onNav("quiz")} style={{
          fontSize: 11, opacity: 0.6, fontFamily: "'DM Mono', monospace",
          marginBottom: 12, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          <Icon.ArrowLeft size={12}/> Quiz
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {QUIZ_QUESTIONS.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 5, borderRadius: 5,
              background: i < qIndex ? "#7c3aed"
                : i === qIndex ? "#a78bfa"
                : "var(--card-2)",
              transition: "background .3s ease",
            }}/>
          ))}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.2 }}>
          {q.q}
        </div>
        <div style={{
          fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#7c3aed",
          marginTop: 6, display: "flex", alignItems: "center", gap: 6,
        }}>
          <span>{q.topicEmoji}</span>
          {q.topicLabel} · Question {qIndex + 1} of {QUIZ_QUESTIONS.length}
        </div>
      </div>

      {/* Options */}
      <div className="page-pad" style={{ paddingTop: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map(opt => {
            const isThis = opt.k === selected;
            const isRightAnswer = opt.k === q.correct;
            let bg, border, color, circleBg, circleColor, circleContent, circleBorder;
            if (!answered) {
              bg = "var(--card)";
              border = "var(--border-faint)";
              color = "var(--text)";
              circleBg = "transparent";
              circleColor = "var(--text-2)";
              circleBorder = "var(--border)";
              circleContent = opt.k;
            } else if (isRightAnswer) {
              bg = "rgba(34,197,94,0.12)";
              border = "var(--green)";
              color = "var(--green)";
              circleBg = "var(--green)";
              circleColor = "#fff";
              circleBorder = "var(--green)";
              circleContent = "✓";
            } else if (isThis) {
              bg = "rgba(220,38,38,0.12)";
              border = "var(--red)";
              color = "var(--red)";
              circleBg = "var(--red)";
              circleColor = "#fff";
              circleBorder = "var(--red)";
              circleContent = "✗";
            } else {
              bg = "var(--card)";
              border = "var(--border-faint)";
              color = "var(--text-2)";
              circleBg = "transparent";
              circleColor = "var(--text-2)";
              circleBorder = "var(--border)";
              circleContent = opt.k;
            }
            return (
              <div key={opt.k} onClick={() => onSelect(opt.k)} style={{
                padding: "14px 16px", borderRadius: 16,
                background: bg, border: `2px solid ${border}`,
                display: "flex", alignItems: "center", gap: 12,
                cursor: answered ? "default" : "pointer",
                transition: "all .2s ease",
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: circleBg, color: circleColor,
                  border: `2px solid ${circleBorder}`,
                  display: "grid", placeItems: "center",
                  fontSize: 12, fontWeight: 700, fontFamily: "'DM Mono', monospace",
                  flexShrink: 0,
                }}>{circleContent}</span>
                <span style={{
                  fontSize: 14, fontWeight: answered && (isRightAnswer || isThis) ? 700 : 500,
                  color,
                }}>{opt.t}</span>
              </div>
            );
          })}
        </div>

        {/* Feedback bar */}
        {answered && (
          <div className="anim-fade" style={{
            marginTop: 14, padding: "12px 14px", borderRadius: 14,
            display: "flex", gap: 10, alignItems: "flex-start",
            background: isCorrect ? "rgba(34,197,94,0.1)" : "rgba(220,38,38,0.1)",
            border: `1.5px solid ${isCorrect ? "var(--green)" : "var(--red)"}`,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{isCorrect ? "✅" : "❌"}</span>
            <div style={{
              fontSize: 12, lineHeight: 1.5,
              color: isCorrect ? "var(--green)" : "var(--red)",
            }}>
              <strong style={{ fontWeight: 800 }}>{isCorrect ? "Correct." : "Not quite."}</strong>{" "}{q.feedback}
            </div>
          </div>
        )}

        {answered ? (
          <button onClick={next} className="anim-fade" style={{
            marginTop: 12, width: "100%", height: 48, borderRadius: 14,
            border: "none", background: "#7c3aed", color: "#fff",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 4px 0 #5b21b6",
          }}>
            {qIndex < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "See Score"}
            <Icon.ArrowRight size={16}/>
          </button>
        ) : (
          <div style={{
            textAlign: "center", marginTop: 18, color: "var(--text-2)", fontSize: 12,
            fontFamily: "'DM Mono', monospace",
          }}>
            Tap an answer to select
          </div>
        )}
      </div>
    </div>
  );
}

// ───── Score Screen ─────
function QuizScoreScreen({ answers, onNav, resetQuiz }) {
  const correct = answers.filter(a => a.isCorrect).length;
  const total = QUIZ_QUESTIONS.length;
  const wrong = answers.filter(a => !a.isCorrect);
  const reviewQ = wrong.length > 0 ? QUIZ_QUESTIONS[wrong[0].qIndex] : null;

  return (
    <div className="scene has-dock" style={{
      background: "linear-gradient(160deg, #0c0617 0%, #2a1462 40%, #6d28d9 70%, #c15a70 100%)",
      color: "#fff",
    }}>
      <div className="page-pad" style={{
        paddingTop: 32,
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }}>
        <div className="anim-pop" style={{ fontSize: 62, marginBottom: 10 }}>🎯</div>
        <div style={{
          fontSize: 56, fontWeight: 800, lineHeight: 1, letterSpacing: -2,
        }}>{correct} / {total}</div>
        <div style={{
          fontSize: 13, opacity: 0.7, marginTop: 6, fontFamily: "'DM Mono', monospace",
        }}>
          Today's score{reviewQ ? ` · ${reviewQ.topicLabel}` : ""}
        </div>

        {/* Question breakdown */}
        <div style={{
          marginTop: 22, width: "100%", padding: "12px 16px", borderRadius: 16,
          background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
        }}>
          <div style={{
            fontSize: 10, fontFamily: "'DM Mono', monospace", opacity: 0.65,
            textAlign: "left", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1,
          }}>Question breakdown</div>
          {answers.map((a, i) => {
            const q = QUIZ_QUESTIONS[a.qIndex];
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
                borderBottom: i < answers.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{a.isCorrect ? "✅" : "❌"}</span>
                <span style={{
                  fontSize: 12, opacity: 0.9, flex: 1, textAlign: "left", lineHeight: 1.3,
                }}>{q.q}</span>
                <span style={{
                  fontSize: 10, fontFamily: "'DM Mono', monospace",
                  padding: "2px 8px", borderRadius: 999, flexShrink: 0,
                  background: a.isCorrect ? "rgba(34,197,94,0.25)" : "rgba(220,38,38,0.25)",
                  color: a.isCorrect ? "#86efac" : "#fca5a5",
                }}>{a.isCorrect ? "Correct" : "Wrong"}</span>
              </div>
            );
          })}
        </div>

        {/* Review recommended card */}
        {reviewQ && (
          <div className="anim-fade" style={{
            marginTop: 14, width: "100%", padding: "12px 14px", borderRadius: 14,
            background: "rgba(220,38,38,0.15)", border: "1.5px solid rgba(220,38,38,0.35)",
            textAlign: "left",
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#fca5a5",
              fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
              letterSpacing: 1, marginBottom: 6,
            }}>📚 Review recommended</div>
            <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>
              You missed the {reviewQ.topicLabel.toLowerCase()} question. Tap below to review this topic and improve your next quiz.
            </div>
          </div>
        )}

        {reviewQ ? (
          <button onClick={() => onNav("learn-detail", { topic: reviewQ.topic })} style={{
            marginTop: 16, padding: "12px 24px", background: "#fff", color: "#6d28d9",
            border: "none", borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            Review {reviewQ.topicLabel} <Icon.ArrowRight size={16}/>
          </button>
        ) : (
          <button onClick={() => onNav("home")} style={{
            marginTop: 20, padding: "12px 24px", background: "#fff", color: "#6d28d9",
            border: "none", borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            Back to Home <Icon.ArrowRight size={16}/>
          </button>
        )}

        <div onClick={() => onNav("home")} style={{
          marginTop: 14, fontSize: 12, opacity: 0.6, fontFamily: "'DM Mono', monospace",
          textDecoration: "underline", cursor: "pointer",
        }}>
          Skip review · Back to home
        </div>
      </div>
    </div>
  );
}

// ───── Knowledge Check History (Goal 5B) ─────
function QuizHistoryScreen({ onNav }) {
  const ranked = [...TOPIC_ACCURACY].sort((a, b) => b.pct - a.pct);
  const worst = ranked[ranked.length - 1];
  const totalAttempts = ranked.reduce((s, t) => s + t.attempts, 0);
  const totalMissed = ranked.reduce((s, t) => s + t.missed, 0);
  const overallPct = Math.round(((totalAttempts - totalMissed) / totalAttempts) * 100);

  return (
    <div className="scene has-dock">
      {/* Indigo gradient header */}
      <div style={{
        padding: "16px 20px 18px",
        background: "linear-gradient(135deg, #1e1b4b, #3730a3)",
        color: "#fff", borderRadius: "0 0 24px 24px",
      }}>
        <div onClick={() => onNav("quiz")} style={{
          fontSize: 11, opacity: 0.7, fontFamily: "'DM Mono', monospace",
          marginBottom: 6, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          <Icon.ArrowLeft size={12}/> Quiz
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>Knowledge Check History</div>
        <div style={{ fontSize: 11, opacity: 0.6, fontFamily: "'DM Mono', monospace", marginTop: 3 }}>
          Past 4 weeks · {totalAttempts} questions answered
        </div>
      </div>

      <div className="page-pad" style={{ paddingTop: 16 }}>
        {/* Overall accuracy summary */}
        <div className="anim-up card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(124,58,237,0.12)", color: "#7c3aed",
            display: "grid", placeItems: "center",
            fontWeight: 800, fontSize: 18, letterSpacing: -0.5,
            border: "2px solid rgba(124,58,237,0.22)",
          }}>{overallPct}%</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Overall accuracy</div>
            <div style={{
              fontSize: 11, color: "var(--text-2)", marginTop: 3,
              fontFamily: "'DM Mono', monospace",
            }}>
              {totalAttempts - totalMissed} of {totalAttempts} correct
            </div>
          </div>
        </div>

        {/* Topic accuracy ranked, lowest highlighted */}
        <div className="anim-up" style={{ marginTop: 16, animationDelay: "80ms" }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>ACCURACY BY TOPIC · 4 WEEKS</div>
          <div className="card" style={{ padding: 10 }}>
            {ranked.map((t, i) => {
              const isWorst = t.id === worst.id;
              return (
                <div key={t.id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 8px",
                  borderRadius: isWorst ? 12 : 0,
                  background: isWorst ? "rgba(220,38,38,0.08)" : "transparent",
                  border: isWorst ? "1.5px solid rgba(220,38,38,0.32)" : "none",
                  borderBottom: !isWorst && i < ranked.length - 1
                    ? "1px solid var(--border-faint)"
                    : (isWorst ? "1.5px solid rgba(220,38,38,0.32)" : "none"),
                  margin: isWorst ? "6px 0" : "0",
                }}>
                  <span style={{ fontSize: 22, width: 30, textAlign: "center" }}>{t.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                    <div style={{
                      fontSize: 10, color: "var(--text-2)", marginTop: 2,
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      {t.attempts} attempted · {t.missed} wrong
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, minWidth: 56 }}>
                    {isWorst && (
                      <span style={{
                        fontSize: 9, fontFamily: "'DM Mono', monospace",
                        padding: "2px 8px", borderRadius: 999,
                        background: "rgba(220,38,38,0.12)", color: "var(--red)",
                        border: "1.5px solid rgba(220,38,38,0.32)",
                        fontWeight: 700,
                      }}>⚠ LOWEST</span>
                    )}
                    <span style={{
                      fontSize: 14, fontWeight: 800, fontFamily: "'DM Mono', monospace",
                      color: pctColor(t.pct), lineHeight: 1,
                    }}>{t.pct}%</span>
                    <div style={{
                      width: 54, height: 5, borderRadius: 5, background: "var(--card-2)",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${t.pct}%`, height: "100%",
                        background: pctColor(t.pct), borderRadius: 5,
                      }}/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA — direct to worst topic e-textbook */}
        <button onClick={() => onNav("learn-detail", { topic: worst.id })} className="anim-up" style={{
          marginTop: 18, width: "100%", height: 52, borderRadius: 14,
          background: "linear-gradient(135deg, #1e1b4b, #3730a3)", color: "#fff",
          border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          boxShadow: "0 6px 14px rgba(55,48,163,0.32)",
          animationDelay: "160ms",
        }}>
          <span style={{ fontSize: 18 }}>📚</span>
          Review {worst.name} in e-textbook
          <Icon.ArrowRight size={16}/>
        </button>

        <div style={{
          marginTop: 12, textAlign: "center", fontSize: 10, color: "var(--text-2)",
          fontFamily: "'DM Mono', monospace",
        }}>
          Source: Australian Dietary Guidelines · eatforhealth.gov.au
        </div>
      </div>
    </div>
  );
}

window.QuizScreens = { QuizHubScreen, QuizQuestionScreen, QuizScoreScreen, QuizHistoryScreen };
