// Learn screens — list + topic detail pages

const { useState: useStateL } = React;

const LEARN_TOPICS = [
  {
    id: "leafy",
    title: "Leafy Greens",
    sub: "1 cup raw = 1 serve",
    description: "Nutrient-dense powerhouses for daily health",
    color: "var(--green)",
    badgeColor: "var(--green)",
    icon: "leaf",
    facts: [
      "Rich in vitamins K, A, C, and folate for immune & bone health",
      "High in dietary fibre — supports gut microbiome diversity",
      "Low calorie density: 1 serve = 1 cup raw or ½ cup cooked",
    ],
    didYouKnow: "Spinach has more potassium per 100g than a banana — without the sugar spike.",
    read: true,
  },
  {
    id: "cruciferous",
    title: "Cruciferous Veg",
    sub: "½ cup cooked = 1 serve",
    description: "Cancer-fighting glucosinolates and antioxidants",
    color: "var(--teal)",
    badgeColor: "var(--teal)",
    icon: "leaf",
    facts: [
      "Rich in glucosinolates — converted to sulforaphane in the body",
      "Broccoli, cauliflower, kale, cabbage, and Brussels sprouts",
      "Lightly steaming retains 80% more nutrients than boiling",
    ],
    didYouKnow: "Sulforaphane in broccoli sprouts is being studied for its potential to slow certain cancer cells.",
    read: true,
  },
  {
    id: "legumes",
    title: "Legumes & Beans",
    sub: "½ cup cooked = 1 serve",
    description: "Plant protein and slow-release carbohydrates",
    color: "var(--orange)",
    badgeColor: "var(--orange)",
    icon: "bean",
    facts: [
      "Excellent source of plant protein — 8g per ½ cup",
      "High soluble fibre helps lower cholesterol",
      "Lentils, chickpeas, black beans, kidney beans, edamame",
    ],
    didYouKnow: "Soaking dried beans overnight cuts cooking time by 60% and reduces gas-causing compounds.",
    read: true,
  },
  {
    id: "root",
    title: "Root Vegetables",
    sub: "½ cup cooked = 1 serve",
    description: "Earthy sweetness, packed with beta-carotene",
    color: "var(--orange)",
    badgeColor: "var(--orange)",
    icon: "carrot",
    facts: [
      "Carrots, beets, turnips, parsnips, sweet potato",
      "High in beta-carotene — converts to vitamin A",
      "Roasting caramelises natural sugars without adding any",
    ],
    didYouKnow: "Eating carrots with a little fat (like olive oil) increases beta-carotene absorption by up to 6x.",
    read: false,
  },
  {
    id: "starchy",
    title: "Starchy Vegetables",
    sub: "½ cup cooked = 1 serve",
    description: "Energy-rich carbohydrates — quality over quantity",
    color: "var(--yellow)",
    badgeColor: "var(--yellow)",
    icon: "carrot",
    facts: [
      "Provide complex carbohydrates for sustained energy release",
      "Include potato, sweet potato, corn, pumpkin, and parsnip",
      "Cooling cooked starchy veg increases resistant starch",
    ],
    didYouKnow: "Eating cold cooked potato actually boosts the gut-friendly resistant starch by up to 3x.",
    read: false,
    unreadFlag: true,
  },
  {
    id: "other",
    title: "Other Vegetables",
    sub: "Various serving sizes",
    description: "Tomatoes, capsicum, zucchini, mushrooms & more",
    color: "var(--red)",
    badgeColor: "var(--red)",
    icon: "apple",
    facts: [
      "Tomatoes are technically a fruit — but count as veggies nutritionally",
      "Capsicum has more vitamin C than oranges, gram for gram",
      "Mushrooms exposed to sunlight develop vitamin D",
    ],
    didYouKnow: "Cooked tomatoes contain 4x more bioavailable lycopene than raw — pasta sauce, anyone?",
    read: false,
  },
  {
    id: "what-counts",
    title: "What counts as a serve?",
    sub: "A quick visual guide",
    description: "Confused about serving sizes? Here is what 1 serve actually looks like.",
    color: "var(--purple)",
    badgeColor: "var(--purple)",
    icon: "apple",
    facts: [
      "1 cup of raw salad vegetables (e.g., lettuce, spinach) = 1 serve",
      "½ cup of cooked vegetables (e.g., broccoli, carrots) = 1 serve",
      "½ cup of sweet corn, or 1 medium potato = 1 serve",
    ],
    didYouKnow: "Most adults need at least 5 serves of vegetables each day for good health and disease prevention.",
    read: false,
  },
];

function LearnScreen({ onNav, learnState }) {
  const curriculumTopics = LEARN_TOPICS.filter(t => t.id !== "what-counts");
  const guideTopic = LEARN_TOPICS.find(t => t.id === "what-counts");
  
  const readCount = curriculumTopics.filter(t => learnState[t.id]).length;
  const pct = Math.round((readCount / curriculumTopics.length) * 100);
  const totalXP = readCount * 50;
  
  // Find the first unread topic to recommend
  const recommendedTopic = curriculumTopics.find(t => !learnState[t.id]) || curriculumTopics[0];

  const iconFor = (icon, color, size = 40, iconSize = 20) => {
    const map = { leaf: <Icon.Leaf size={iconSize}/>, bean: <Icon.Bean size={iconSize}/>, carrot: <Icon.Carrot size={iconSize}/>, apple: <Icon.Apple size={iconSize}/>, drop: <Icon.Drop size={iconSize}/> };
    return <span style={{ width: size, height: size, borderRadius: size/4, background: color, display: "grid", placeItems: "center", color: "#fff" }}>{map[icon]}</span>;
  };

  return (
    <div className="scene has-dock" style={{ background: "var(--bg-2)" }}>
      <div style={{ padding: "14px 24px 0" }}>
        <h1 className="page-title">Learn</h1>
        <p className="page-sub">Level up your nutrition</p>
      </div>

      <div className="page-pad">
        {/* Bento Dashboard */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
          {/* Recommended Card (Full width) */}
          <div className="card anim-up" onClick={() => onNav("learn-detail", { topic: recommendedTopic.id })} style={{
            gridColumn: "1 / -1", cursor: "pointer", background: "var(--card)", padding: 16,
            display: "flex", gap: 14, alignItems: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)", border: `1.5px solid ${recommendedTopic.color}`,
          }}>
            {iconFor(recommendedTopic.icon, recommendedTopic.color, 48, 24)}
            <div style={{ flex: 1 }}>
              <div className="eyebrow" style={{ color: recommendedTopic.color }}>RECOMMENDED</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{recommendedTopic.title}</div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: recommendedTopic.color, display: "grid", placeItems: "center", color: "#fff" }}>
              <Icon.ArrowRight size={18} />
            </div>
          </div>

          {/* XP Card */}
          <div className="card anim-up" style={{ padding: 14, animationDelay: "50ms", background: "var(--card)" }}>
            <Icon.Sparkles size={18} stroke="var(--yellow)"/>
            <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", marginTop: 6, lineHeight: 1 }}>{totalXP}</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>Total XP</div>
          </div>

          {/* Progress Card */}
          <div className="card anim-up" style={{ padding: 14, animationDelay: "100ms", background: "var(--card)" }}>
            <Icon.Target size={18} stroke="var(--teal)"/>
            <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", marginTop: 6, lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>Course complete</div>
          </div>
        </div>

        {/* Quick Reference Guide */}
        {guideTopic && (
          <div className="card anim-up" onClick={() => onNav("learn-detail", { topic: guideTopic.id })} style={{
            marginTop: 20, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
            background: "linear-gradient(135deg, rgba(119,83,221,0.1), rgba(119,83,221,0.02))",
            border: "1.5px solid var(--purple-soft)", cursor: "pointer", animationDelay: "150ms"
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--purple)", display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
              <Icon.Book size={22}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--purple)" }}>{guideTopic.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{guideTopic.sub}</div>
            </div>
            <Icon.ChevronRight size={18} stroke="var(--purple)"/>
          </div>
        )}

        {/* Gamified Path */}
        <div className="eyebrow" style={{ marginTop: 28, marginBottom: 16 }}>YOUR JOURNEY</div>
        
        <div style={{ position: "relative", paddingBottom: 60, display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Background Path Line */}
          <div style={{
            position: "absolute", top: 30, bottom: 50, left: "50%", width: 6, marginLeft: -3,
            background: "var(--card-3)", borderRadius: 3, zIndex: 0
          }}/>

          {curriculumTopics.map((t, i) => {
            const isRead = learnState[t.id];
            const isNext = !isRead && (i === 0 || learnState[curriculumTopics[i-1].id]);
            const side = i % 2 === 0 ? "left" : "right";
            const locked = !isRead && !isNext;
            
            return (
              <div key={t.id} style={{
                position: "relative", zIndex: 1, display: "flex", justifyContent: side === "left" ? "flex-start" : "flex-end",
                marginBottom: -10,
                padding: "0 20px"
              }}>
                <div onClick={() => onNav("learn-detail", { topic: t.id })} className="anim-pop" style={{
                  cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center",
                  width: 130, animationDelay: `${150 + i * 50}ms`, opacity: locked ? 0.6 : 1
                }}>
                  {/* Topic Node */}
                  <div style={{
                    width: 74, height: 74, borderRadius: 37,
                    background: isRead ? t.color : isNext ? t.color : "var(--card-2)",
                    border: `5px solid ${isRead || isNext ? "var(--bg-2)" : "var(--card-3)"}`,
                    boxShadow: isNext ? `0 0 0 4px ${t.color}40, 0 8px 24px ${t.color}60` : "0 4px 12px rgba(0,0,0,0.1)",
                    display: "grid", placeItems: "center", color: isRead || isNext ? "#fff" : "var(--text-3)",
                    transition: "transform .2s",
                    transform: isNext ? "scale(1.15)" : "scale(1)",
                    position: "relative"
                  }}>
                    {isRead ? <Icon.Check size={36} strokeWidth={3}/> : locked ? <Icon.Lock size={28}/> : <Icon.Brain size={32}/>}
                  </div>
                  {/* Label */}
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: isRead || isNext ? "var(--text)" : "var(--text-3)",
                    textAlign: "center", marginTop: isNext ? 12 : 8, lineHeight: 1.2
                  }}>
                    {t.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LearnDetailScreen({ topicId, onNav, learnState, setLearnState }) {
  const topic = LEARN_TOPICS.find(t => t.id === topicId) || LEARN_TOPICS[0];
  const [step, setStep] = useStateL(0);
  const factsAndTip = [...topic.facts, topic.didYouKnow];
  
  const next = () => {
    if (step < factsAndTip.length - 1) {
      setStep(s => s + 1);
    } else {
      setLearnState(s => ({ ...s, [topic.id]: true }));
      onNav("learn-completion", { topic: topic.id });
    }
  };
  
  const prev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  return (
    <div className="scene" style={{ background: topic.color, color: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Segmented Progress */}
      <div style={{ display: "flex", gap: 4, padding: "14px 20px 0", paddingTop: 60, zIndex: 10 }}>
        {factsAndTip.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= step ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.2)",
            transition: "background .3s"
          }}/>
        ))}
      </div>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", zIndex: 10 }}>
        <div onClick={() => onNav("learn")} style={{ cursor: "pointer", background: "rgba(0,0,0,0.2)", width: 32, height: 32, borderRadius: 16, display: "grid", placeItems: "center" }}>
          <Icon.X size={16} stroke="#fff"/>
        </div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{topic.title}</div>
      </div>

      {/* Tap Zones */}
      <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: 5 }}>
        <div style={{ flex: 1 }} onClick={prev}/>
        <div style={{ flex: 2 }} onClick={next}/>
      </div>

      {/* Content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px",
        zIndex: 2, pointerEvents: "none"
      }}>
        {step < topic.facts.length ? (
          <div className="anim-up" key={step}>
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.8, letterSpacing: 1.5, marginBottom: 12 }}>FACT {step + 1}</div>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, textWrap: "balance" }}>
              {factsAndTip[step]}
            </div>
          </div>
        ) : (
          <div className="anim-up" key="tip">
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, color: "var(--yellow)", marginBottom: 16 }}>
              <Icon.Bulb size={24}/> DID YOU KNOW?
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, textWrap: "balance" }}>
              {factsAndTip[step]}
            </div>
          </div>
        )}
      </div>
      
      <div style={{ padding: "0 20px 40px", textAlign: "center", fontSize: 13, opacity: 0.6, zIndex: 2 }}>
        Tap right to continue
      </div>
    </div>
  );
}

function LearnCompletionScreen({ topicId, onNav }) {
  const topic = LEARN_TOPICS.find(t => t.id === topicId) || LEARN_TOPICS[0];

  return (
    <div className="scene" style={{ background: "var(--bg-2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      {/* Confetti / Celebration effect */}
      <div className="anim-pop" style={{
        width: 120, height: 120, borderRadius: 60, background: topic.color,
        display: "grid", placeItems: "center", color: "#fff",
        boxShadow: `0 0 0 20px ${topic.color}20, 0 20px 40px ${topic.color}60`,
        marginBottom: 40
      }}>
        <Icon.Check size={64} strokeWidth={3}/>
      </div>
      
      <div className="anim-up" style={{ animationDelay: "100ms" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>Topic<br/>Completed!</h1>
        <p style={{ fontSize: 16, color: "var(--text-2)", marginTop: 12 }}>
          You've mastered <b>{topic.title}</b>.
        </p>
        
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--yellow-soft)", color: "var(--yellow)", padding: "10px 20px", borderRadius: 999, fontWeight: 800, fontSize: 18, marginTop: 24 }}>
          <Icon.Sparkles size={20} fill="var(--yellow)"/> +50 XP
        </div>
      </div>
      
      <div className="anim-up" style={{ width: "100%", marginTop: 40, animationDelay: "200ms", display: "flex", flexDirection: "column", gap: 12 }}>
        <button className="btn btn-primary btn-full btn-lg" onClick={() => onNav("learn")}>
          Return to Path <Icon.ArrowRight size={18}/>
        </button>
        <button className="btn btn-secondary btn-full btn-lg" onClick={() => onNav("quiz")}>
          Test your knowledge <Icon.Brain size={18}/>
        </button>
      </div>
    </div>
  );
}

window.LearnScreens = { LearnScreen, LearnDetailScreen, LearnCompletionScreen, LEARN_TOPICS };
