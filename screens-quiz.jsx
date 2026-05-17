// Quiz flow — hub + Q1→Q2→Q3 with real state + Score screen

const { useState: useStateQ, useMemo: useMemoQ } = React;

const QUIZ_QUESTIONS = [
  {
    id: 1,
    q: "Which vegetable group contains the highest concentration of glucosinolates?",
    options: [
      { k: "A", t: "Leafy Greens" },
      { k: "B", t: "Cruciferous Vegetables" },
      { k: "C", t: "Root Vegetables" },
      { k: "D", t: "Legumes" },
    ],
    correct: "B",
    label: "Glucosinolates source?",
    correctLabel: "Cruciferous Veg",
  },
  {
    id: 2,
    q: "How many vegetable serves does the Australian Dietary Guideline recommend per day for adults?",
    options: [
      { k: "A", t: "3 serves" },
      { k: "B", t: "4 serves" },
      { k: "C", t: "5 serves" },
      { k: "D", t: "7 serves" },
    ],
    correct: "C",
    label: "Daily recommended serves?",
    correctLabel: "5 serves",
  },
  {
    id: 3,
    q: "Which of the following is classified as a legume?",
    options: [
      { k: "A", t: "Cucumber" },
      { k: "B", t: "Carrot" },
      { k: "C", t: "Chickpea" },
      { k: "D", t: "Capsicum" },
    ],
    correct: "C",
    label: "Which is a legume?",
    correctLabel: "Chickpea",
  },
];

// ───── Quiz Hub ─────
function QuizHubScreen({ onNav, quizScore }) {
  const topics = [
    { name: "Leafy Greens", pct: 100, color: "var(--green)" },
    { name: "Legumes & Beans", pct: 83, color: "var(--green)" },
    { name: "Cruciferous Veg", pct: 67, color: "var(--yellow)" },
    { name: "Root Vegetables", pct: 67, color: "var(--yellow)" },
    { name: "Starchy Vegetables", pct: 42, color: "var(--red)" },
  ];
  const done = quizScore !== null;

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="home" label="Home" title="Daily Knowledge Check" subtitle={`Sunday, 18 April  ·  ${done ? "Completed" : "Not yet completed"}`}/>

      <div className="page-pad">
        {/* Stats */}
        <div className="card" style={{ marginTop: 12, display: "flex", padding: 16, cursor: "pointer" }}
          onClick={() => onNav("progress")}>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--green)" }}>6</div>
            <div style={{ fontSize: 11, color: "var(--text-2)" }}>Week streak</div>
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--teal)" }}>86%</div>
            <div style={{ fontSize: 11, color: "var(--text-2)" }}>Avg accuracy</div>
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--orange)" }}>28</div>
            <div style={{ fontSize: 11, color: "var(--text-2)" }}>Checks done</div>
          </div>
        </div>

        <div className="eyebrow" style={{ marginTop: 20 }}>TODAY'S CHECK</div>

        <div style={{
          marginTop: 12, padding: 20, borderRadius: 22, background: "var(--green)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>Today's Check</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>
                3 questions  ·  ~60 seconds
              </div>
            </div>
            <Icon.Target size={48} stroke="rgba(255,255,255,0.4)"/>
          </div>
          <button
            onClick={() => onNav("quiz-question", { qIndex: 0, answers: [] })}
            style={{
              marginTop: 16, padding: "12px 22px", borderRadius: 999, background: "#fff", color: "var(--green)",
              fontWeight: 700, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6,
            }}>
            {done ? "Review Quiz →" : "Start Quiz →"}
          </button>
        </div>

        <div className="eyebrow" style={{ marginTop: 22 }}>ACCURACY BY TOPIC</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
          {topics.map((t, i) => {
            const topicMap = {
              "Leafy Greens": "leafy",
              "Legumes & Beans": "legumes",
              "Cruciferous Veg": "cruciferous",
              "Root Vegetables": "root",
              "Starchy Vegetables": "starchy",
            };
            return (
              <div key={i} className="card" style={{ padding: 14, cursor: "pointer" }}
                onClick={() => onNav("learn-detail", { topic: topicMap[t.name] })}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: t.color, display: "flex", alignItems: "center", gap: 4 }}>
                    {t.pct < 50 && <Icon.Triangle size={12} fill="var(--red)" stroke="none"/>}
                    {t.pct}%
                  </span>
                </div>
                <div style={{ marginTop: 8, height: 6, background: "var(--card-3)", borderRadius: 3 }}>
                  <div style={{ width: t.pct + "%", height: "100%", background: t.color, borderRadius: 3 }}/>
                </div>
              </div>
            );
          })}
        </div>

        <div onClick={() => onNav("learn-detail", { topic: "starchy" })} className="card-row outline-purple" style={{
          marginTop: 16, cursor: "pointer", background: "rgba(119,83,221,0.08)", color: "var(--purple)",
        }}>
          <Icon.Book size={20} stroke="var(--purple)"/>
          <span style={{ fontSize: 14, fontWeight: 700, flex: 1 }}>Go to Starchy Vegetables in e-textbook</span>
          <Icon.ArrowRight size={18} stroke="var(--purple)"/>
        </div>
      </div>
    </div>
  );
}

// ───── Question screen ─────
function QuizQuestionScreen({ qIndex, answers, onNav, setQuizScore }) {
  const q = QUIZ_QUESTIONS[qIndex];
  const [selected, setSelected] = useStateQ(null);
  const isCorrect = selected === q.correct;

  const onSelect = (k) => {
    if (selected !== null) return; // lock after select
    setSelected(k);
  };

  const next = () => {
    const newAnswers = [...answers, { qIndex, selected, correct: q.correct, isCorrect }];
    if (qIndex < QUIZ_QUESTIONS.length - 1) {
      onNav("quiz-question", { qIndex: qIndex + 1, answers: newAnswers });
    } else {
      // calculate score and go to score screen
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      setQuizScore({ answers: newAnswers, correct: correctCount, total: QUIZ_QUESTIONS.length });
      onNav("quiz-score", { answers: newAnswers });
    }
  };

  const pct = Math.round(((qIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="scene has-dock">
      <div style={{ padding: "14px 24px 0" }}>
        <div className="page-back" onClick={() => onNav("quiz")}>
          <Icon.ArrowLeft size={16}/> Quiz
        </div>
        <h1 className="page-title">Daily Knowledge Check</h1>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span style={{ fontSize: 12, color: "var(--text-2)" }}>Question {qIndex + 1} of {QUIZ_QUESTIONS.length}</span>
          <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 700 }}>{qIndex + 1}/{QUIZ_QUESTIONS.length}</span>
        </div>
        <div className="progress-bar" style={{ marginTop: 6 }}>
          <i style={{ width: pct + "%" }}/>
        </div>
      </div>

      <div className="page-pad" style={{ marginTop: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ color: "var(--green)", fontSize: 12, fontWeight: 700 }}>Q{q.id}</div>
          <div style={{ fontSize: 17, fontWeight: 700, marginTop: 8, lineHeight: 1.35 }}>{q.q}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {q.options.map(opt => {
            const isThis = opt.k === selected;
            const isRight = selected !== null && opt.k === q.correct;
            const isWrong = isThis && !isCorrect;
            let bg = "var(--card)";
            let border = "transparent";
            let txt = "var(--text)";
            if (selected !== null) {
              if (isRight) { bg = "rgba(48,185,100,0.18)"; border = "var(--green)"; }
              else if (isWrong) { bg = "rgba(244,91,77,0.18)"; border = "var(--red)"; }
            } else if (isThis) {
              bg = "rgba(48,185,100,0.18)"; border = "var(--green)";
            }
            return (
              <div key={opt.k} onClick={() => onSelect(opt.k)} className="card-row" style={{
                background: bg, borderColor: border, cursor: selected === null ? "pointer" : "default",
                transition: "background .2s ease, border-color .2s ease",
              }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 8, background: isRight ? "var(--green)" : isWrong ? "var(--red)" : "var(--green-soft)",
                  color: isRight || isWrong ? "#fff" : "var(--green)", display: "grid", placeItems: "center",
                  fontWeight: 700, fontSize: 13,
                }}>
                  {selected !== null && isRight ? <Icon.Check size={16}/>
                    : isWrong ? <Icon.X size={16}/>
                    : opt.k}
                </span>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: txt }}>{opt.t}</span>
              </div>
            );
          })}
        </div>

        {selected !== null ? (
          <>
            <div style={{
              marginTop: 16, padding: 14, borderRadius: 14,
              background: isCorrect ? "rgba(48,185,100,0.15)" : "rgba(244,91,77,0.12)",
              border: "1px solid " + (isCorrect ? "var(--green)" : "var(--red)"),
              display: "flex", alignItems: "center", gap: 10,
              color: isCorrect ? "var(--green)" : "var(--red)",
            }}>
              {isCorrect ? <Icon.Check size={18}/> : <Icon.X size={18}/>}
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {isCorrect ? "Correct! Great job." : `Not quite. Answer: ${q.options.find(o => o.k === q.correct).t}`}
              </span>
            </div>
            <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 14 }} onClick={next}>
              {qIndex < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "See Score"} <Icon.ArrowRight size={18}/>
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: 18, color: "var(--text-2)", fontSize: 13 }}>
            Tap an answer to select
          </div>
        )}
      </div>
    </div>
  );
}

// ───── Score screen ─────
function QuizScoreScreen({ answers, onNav, resetQuiz }) {
  const correct = answers.filter(a => a.isCorrect).length;
  const total = QUIZ_QUESTIONS.length;
  const pct = Math.round((correct / total) * 100);
  const isPerfect = correct === total;

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="quiz" label="Quiz" title="Daily Knowledge Check" subtitle="Sunday, 18 April"/>

      <div className="page-pad" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          marginTop: 22,
          width: 200, height: 200, borderRadius: "50%",
          border: "8px solid var(--green)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "var(--card)",
        }} className="anim-pop">
          <div style={{ fontSize: 56, fontWeight: 700, color: "var(--green)", lineHeight: 1 }}>
            {correct}/{total}
          </div>
          <div style={{ fontSize: 18, color: "var(--text-2)", marginTop: 6, fontWeight: 600 }}>
            {isPerfect ? "Perfect!" : "Correct"}
          </div>
          <div style={{ fontSize: 14, color: isPerfect ? "var(--green)" : "var(--yellow)", marginTop: 4, fontWeight: 700 }}>
            {pct}% accuracy
          </div>
        </div>

        <div style={{
          marginTop: 22, width: "100%", padding: 16, borderRadius: 16,
          background: "var(--card)", border: "1px solid var(--green)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15, color: "var(--green)" }}>
            {isPerfect ? <Icon.Sparkles size={18}/> : <Icon.Check size={18}/>}
            {isPerfect ? "Perfect Score! You nailed it!" : `Good effort! You got ${correct} out of ${total}.`}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 8, lineHeight: 1.5 }}>
            {isPerfect ? "Come back tomorrow for the next check." : "Review the questions you missed below."}
          </div>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          {answers.map((a, i) => {
            const q = QUIZ_QUESTIONS[a.qIndex];
            const ok = a.isCorrect;
            return (
              <div key={i} className="card-row" style={{
                borderColor: ok ? "var(--green)" : "var(--red)",
                background: ok ? "var(--card)" : "rgba(244,91,77,0.08)",
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: "50%",
                  display: "grid", placeItems: "center", color: ok ? "var(--green)" : "var(--red)",
                  background: ok ? "rgba(48,185,100,0.2)" : "rgba(244,91,77,0.2)",
                }}>
                  {ok ? <Icon.Check size={14}/> : <Icon.X size={14}/>}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Q{q.id}: {q.label}</div>
                  <div style={{ fontSize: 11, color: ok ? "var(--green)" : "var(--red)", marginTop: 2 }}>
                    {ok ? (<>✓ {q.correctLabel}</>) : (<>
                      You: {q.options.find(o => o.k === a.selected)?.t}<br/>
                      Correct: {q.correctLabel}
                    </>)}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: ok ? "var(--green)" : "var(--red)" }}>
                  {ok ? "100%" : "0%"}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 18, width: "100%" }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { resetQuiz(); onNav("quiz-question", { qIndex: 0, answers: [] }); }}>
            <Icon.Refresh size={16}/> Retry
          </button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onNav("home")}>
            <Icon.Home size={16}/> Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

window.QuizScreens = { QuizHubScreen, QuizQuestionScreen, QuizScoreScreen };
