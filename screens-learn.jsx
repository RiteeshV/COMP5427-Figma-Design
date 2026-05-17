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
  const readCount = LEARN_TOPICS.filter(t => learnState[t.id]).length;
  const pct = Math.round((readCount / LEARN_TOPICS.length) * 100);

  const iconFor = (icon, color) => {
    const map = { leaf: <Icon.Leaf/>, bean: <Icon.Bean/>, carrot: <Icon.Carrot/>, apple: <Icon.Apple/>, drop: <Icon.Drop/> };
    return <span style={{ width: 40, height: 40, borderRadius: 10, background: color, display: "grid", placeItems: "center", color: "#fff" }}>{map[icon]}</span>;
  };

  return (
    <div className="scene has-dock">
      <BackHeader onNav={onNav} to="home" label="Home" title="Learn" subtitle="Vegetable serving size guide"/>

      <div className="page-pad">
        <div style={{
          marginTop: 14, padding: 18, borderRadius: 18, background: "var(--green)", color: "#fff",
        }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, fontSize: 15, fontWeight: 700 }}>
            {readCount} / {LEARN_TOPICS.length} topics completed
            <span style={{ opacity: 0.7 }}>·</span>
            {pct}%
          </div>
          <div style={{ marginTop: 10, height: 6, background: "rgba(255,255,255,0.25)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: pct + "%", height: "100%", background: "#fff", borderRadius: 3, transition: "width .4s" }}/>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {LEARN_TOPICS.map(t => {
            const isRead = learnState[t.id];
            return (
              <div key={t.id} onClick={() => onNav("learn-detail", { topic: t.id })} className="card-row" style={{ cursor: "pointer" }}>
                {iconFor(t.icon, t.color)}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{t.sub}</div>
                </div>
                {isRead ? (
                  <span style={{
                    padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "var(--green)",
                    background: "var(--green-soft)", display: "inline-flex", alignItems: "center", gap: 4,
                  }}>
                    <Icon.Check size={12}/> Read
                  </span>
                ) : (
                  <span style={{
                    padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                    color: t.unreadFlag ? "var(--orange)" : "var(--text-2)",
                    background: t.unreadFlag ? "rgba(232,98,10,0.15)" : "var(--card-3)",
                  }}>Unread</span>
                )}
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

  useEffect(() => {
    setLearnState(s => ({ ...s, [topic.id]: true }));
  }, [topic.id]);

  // Tonalize 'Did You Know?' card by topic color
  const cardBg = topic.color === "var(--green)" ? "rgba(48,185,100,0.12)"
    : topic.color === "var(--teal)" ? "rgba(34,180,159,0.15)"
    : topic.color === "var(--orange)" ? "rgba(232,98,10,0.12)"
    : topic.color === "var(--yellow)" ? "rgba(249,201,48,0.15)"
    : topic.color === "var(--red)" ? "rgba(244,91,77,0.12)"
    : "var(--card)";

  return (
    <div className="scene has-dock">
      <div style={{ padding: "14px 24px 0" }}>
        <div className="page-back" onClick={() => onNav("learn")}>
          <Icon.ArrowLeft size={16}/> Learn
        </div>
      </div>

      {/* Hero banner */}
      <div style={{
        marginTop: 8, padding: "24px 24px 28px", background: topic.color,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{
            width: 70, height: 70, borderRadius: 16, background: "rgba(255,255,255,0.2)",
            display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
          }}>
            {topic.icon === "leaf" && <Icon.Leaf size={38}/>}
            {topic.icon === "bean" && <Icon.Bean size={38}/>}
            {topic.icon === "carrot" && <Icon.Carrot size={38}/>}
            {topic.icon === "apple" && <Icon.Apple size={38}/>}
          </div>
          <div style={{ flex: 1, paddingTop: 2 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.05 }}>{topic.title}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.92)", marginTop: 6, lineHeight: 1.4 }}>
              {topic.description}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        height: 40, background: `linear-gradient(to bottom, ${topic.color} 0%, transparent 100%)`, opacity: 0.4,
      }}/>

      <div className="page-pad">
        <div className="eyebrow">KEY FACTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          {topic.facts.map((f, i) => (
            <div key={i} className="card" style={{ display: "flex", gap: 12, padding: 14 }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%", background: topic.color, marginTop: 8, flexShrink: 0,
              }}/>
              <div style={{ fontSize: 14, lineHeight: 1.45 }}>{f}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 16, padding: 16, borderRadius: 16,
          background: cardBg, border: `1px solid ${topic.color}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15, color: topic.color }}>
            <Icon.Bulb size={18}/> Did You Know?
          </div>
          <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.5, color: "var(--text)" }}>
            {topic.didYouKnow}
          </div>
        </div>

        <div onClick={() => onNav("quiz")} className="card-row outline-purple" style={{
          marginTop: 14, color: "var(--purple)", cursor: "pointer", background: "rgba(119,83,221,0.08)",
        }}>
          <Icon.Brain size={20} stroke="var(--purple)"/>
          <span style={{ fontSize: 14, fontWeight: 700, flex: 1 }}>Test your knowledge on this topic</span>
          <Icon.ArrowRight size={18} stroke="var(--purple)"/>
        </div>
      </div>
    </div>
  );
}

window.LearnScreens = { LearnScreen, LearnDetailScreen, LEARN_TOPICS };