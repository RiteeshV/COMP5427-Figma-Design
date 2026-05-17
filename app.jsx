// VeggieTrack — main app: routing, global state, theme, tweaks integration

const { useState: useStateApp, useEffect: useEffectApp, useReducer } = React;

const ROUTES_WITH_DOCK = ["home", "log", "progress", "learn", "quiz", "settings", "edit-log", "learn-detail", "quiz-question", "quiz-score", "quiz-history", "profile", "goals", "notifications"];
const DOCK_KEY_BY_ROUTE = {
  home: "home", log: "log", "edit-log": "log",
  progress: "progress", calendar: "progress",
  learn: "learn", "learn-detail": "learn",
  quiz: "quiz", "quiz-question": "quiz", "quiz-score": "quiz", "quiz-history": "quiz",
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#3DDC84",
  "accentColor": "#22D3EE",
  "yellowAccent": "#FFD23F",
  "cornerStyle": "rounded",
  "startScreen": "login"
}/*EDITMODE-END*/;

function App() {
  // Theme
  const [theme, setTheme] = useStateApp("light");

  // Routing — { name, params }
  const [route, setRoute] = useStateApp({ name: TWEAK_DEFAULTS.startScreen || "login", params: {} });

  // Toast
  const [toast, setToast] = useStateApp("");
  const showToast = (msg) => setToast(msg);

  // App state — counts, streaks, etc.
  const [appState, setAppState] = useStateApp({
    count: 3,
    target: 5,
    streak: 14,
    foodType: "salad",
    note: "",
    weekDays: [
      { day: "M", hit: true, serves: 5 },
      { day: "T", hit: true, serves: 6 },
      { day: "W", hit: true, serves: 5 },
      { day: "T", hit: false, serves: 2 },
      { day: "F", hit: true, serves: 5 },
      { day: "S", hit: true, serves: 5 },
      { day: "S", hit: false, serves: 0 },
    ],
  });

  // Profile
  const [profile, setProfile] = useStateApp({
    name: "Muthu Krishnan",
    email: "muthu@veggietrack.app",
    age: 24,
    height: 175,
    weight: 68,
    goal: 5,
  });

  // Learn read state
  const [learnState, setLearnState] = useStateApp({
    leafy: true,
    cruciferous: true,
    legumes: true,
    root: false,
    starchy: false,
    other: false,
    "what-counts": false,
  });

  // Quiz
  const [quizScore, setQuizScore] = useStateApp(null);

  // Tweaks
  const [tweaks, setTweaks] = useStateApp(TWEAK_DEFAULTS);

  // Apply tweak colors to CSS variables
  useEffectApp(() => {
    document.documentElement.style.setProperty('--green', tweaks.primaryColor);
    document.documentElement.style.setProperty('--teal', tweaks.accentColor);
    document.documentElement.style.setProperty('--yellow', tweaks.yellowAccent);
    // Derive green-soft and green-3 from primary color
    document.documentElement.style.setProperty('--green-soft', tweaks.primaryColor + '26');
  }, [tweaks]);

  // Tweaks setter — also notifies host to persist
  const setTweak = (k, v) => {
    const edits = typeof k === "object" ? k : { [k]: v };
    setTweaks(prev => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
  };

  // Navigation
  const navigate = (name, params = {}) => {
    setRoute({ name, params });
  };

  // Decide active dock item
  const dockKey = DOCK_KEY_BY_ROUTE[route.name] || null;
  const showDock = ROUTES_WITH_DOCK.includes(route.name) && !["camera", "coach"].includes(route.name);

  const r = route.name;
  const p = route.params;

  return (
    <UI.Phone theme={theme}>
      {toast && <UI.Toast message={toast} onDone={() => setToast("")} />}

      {r === "login" && <AuthScreens.LoginScreen onNav={navigate} theme={theme}/>}
      {r === "forgot" && <AuthScreens.ForgotScreen onNav={navigate} showToast={showToast}/>}
      {r === "create" && <AuthScreens.CreateAccountScreen onNav={navigate} showToast={showToast}/>}

      {r === "home" && <MainScreens.HomeScreen state={appState} setState={setAppState} onNav={navigate}/>}
      {r === "log" && <MainScreens.LogFoodScreen state={appState} setState={setAppState} onNav={navigate} showToast={showToast}/>}
      {r === "edit-log" && <MainScreens.EditLogScreen state={appState} setState={setAppState} onNav={navigate} showToast={showToast} params={p}/>}

      {r === "progress" && <FlowScreens.ProgressScreen state={appState} setState={setAppState} onNav={navigate}/>}
      {r === "calendar" && <FlowScreens.CalendarScreen state={appState} onNav={navigate}/>}
      {r === "camera" && <FlowScreens.CameraScreen state={appState} setState={setAppState} onNav={navigate} showToast={showToast}/>}
      {r === "coach" && <FlowScreens.CoachScreen state={appState} onNav={navigate} showToast={showToast} context={p.context}/>}

      {r === "learn" && <LearnScreens.LearnScreen onNav={navigate} learnState={learnState}/>}
      {r === "learn-detail" && <LearnScreens.LearnDetailScreen topicId={p.topic} onNav={navigate} learnState={learnState} setLearnState={setLearnState}/>}
      {r === "learn-completion" && <LearnScreens.LearnCompletionScreen topicId={p.topic} onNav={navigate}/>}

      {r === "quiz" && <QuizScreens.QuizHubScreen onNav={navigate} quizScore={quizScore}/>}
      {r === "quiz-question" && <QuizScreens.QuizQuestionScreen qIndex={p.qIndex || 0} answers={p.answers || []} onNav={navigate} setQuizScore={setQuizScore}/>}
      {r === "quiz-score" && <QuizScreens.QuizScoreScreen answers={p.answers || []} onNav={navigate} resetQuiz={() => setQuizScore(null)}/>}
      {r === "quiz-history" && <QuizScreens.QuizHistoryScreen onNav={navigate}/>}

      {r === "settings" && <SettingsScreens.SettingsScreen state={appState} setState={setAppState} onNav={navigate} theme={theme} setTheme={setTheme} showToast={showToast}/>}
      {r === "profile" && <SettingsScreens.ProfileScreen profile={profile} setProfile={setProfile} onNav={navigate} showToast={showToast}/>}
      {r === "goals" && <SettingsScreens.GoalsScreen state={appState} setState={setAppState} onNav={navigate} showToast={showToast}/>}
      {r === "notifications" && <SettingsScreens.NotificationsScreen onNav={navigate} showToast={showToast}/>}

      {showDock && dockKey && <UI.Dock active={dockKey} onNav={navigate}/>}

      {/* Tweaks panel — manages its own open state via host protocol */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand Colors">
          <TweakColor
            label="Primary"
            value={tweaks.primaryColor}
            options={["#3DDC84", "#22D3EE", "#A78BFA", "#FF7849", "#FF5C6C", "#F472B6"]}
            onChange={v => setTweak("primaryColor", v)}/>
          <TweakColor
            label="Accent"
            value={tweaks.accentColor}
            options={["#22D3EE", "#3DDC84", "#A78BFA", "#FFD23F", "#F472B6"]}
            onChange={v => setTweak("accentColor", v)}/>
          <TweakColor
            label="Highlight"
            value={tweaks.yellowAccent}
            options={["#FFD23F", "#FF7849", "#A78BFA", "#22D3EE", "#F472B6"]}
            onChange={v => setTweak("yellowAccent", v)}/>
        </TweakSection>
        <TweakSection label="Appearance">
          <TweakRadio
            label="Theme"
            value={theme}
            options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]}
            onChange={setTheme}/>
          <TweakSelect
            label="Jump to screen"
            value={route.name}
            options={[
              { value: "login", label: "Login" },
              { value: "create", label: "Create Account" },
              { value: "forgot", label: "Forgot Password" },
              { value: "home", label: "Home" },
              { value: "log", label: "Log Food" },
              { value: "edit-log", label: "Edit Log" },
              { value: "progress", label: "Activity" },
              { value: "calendar", label: "Calendar" },
              { value: "camera", label: "AI Camera" },
              { value: "coach", label: "AI Coach" },
              { value: "learn", label: "Learn" },
              { value: "quiz", label: "Quiz" },
              { value: "quiz-history", label: "Quiz History" },
              { value: "settings", label: "Settings" },
              { value: "profile", label: "Profile" },
              { value: "goals", label: "Daily Goals" },
              { value: "notifications", label: "Notifications" },
            ]}
            onChange={v => navigate(v)}/>
        </TweakSection>
        <TweakSection label="Demo Data">
          <TweakSlider
            label="Today's count"
            min={0} max={appState.target + 3} step={1}
            value={appState.count}
            onChange={v => setAppState(s => ({ ...s, count: v }))}/>
          <TweakSlider
            label="Daily target"
            min={1} max={12} step={1}
            value={appState.target}
            onChange={v => setAppState(s => ({ ...s, target: v }))}/>
          <TweakSlider
            label="Streak (days)"
            min={0} max={60} step={1}
            value={appState.streak}
            onChange={v => setAppState(s => ({ ...s, streak: v }))}/>
        </TweakSection>
      </TweaksPanel>
    </UI.Phone>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
