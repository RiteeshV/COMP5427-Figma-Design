// Icons for VeggieTrack — clean stroked icons matching the design language
// Exposes window.Icon[name] for use across files.

const I = {};

const Svg = ({ children, size = 22, stroke = "currentColor", strokeWidth = 2, fill = "none", viewBox = "0 0 24 24", style }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>{children}</svg>
);

I.Home = (p) => <Svg {...p}><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></Svg>;
I.Plus = (p) => <Svg {...p}><path d="M12 5v14M5 12h14"/></Svg>;
I.Minus = (p) => <Svg {...p}><path d="M5 12h14"/></Svg>;
I.Diamond = (p) => <Svg {...p}><path d="M12 2 22 12 12 22 2 12z"/></Svg>;
I.Square = (p) => <Svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/></Svg>;
I.Target = (p) => <Svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></Svg>;
I.ArrowLeft = (p) => <Svg {...p}><path d="M19 12H5M12 5l-7 7 7 7"/></Svg>;
I.ArrowRight = (p) => <Svg {...p}><path d="M5 12h14M12 5l7 7-7 7"/></Svg>;
I.ChevronRight = (p) => <Svg {...p}><path d="M9 6l6 6-6 6"/></Svg>;
I.Check = (p) => <Svg {...p}><path d="M5 13l4 4L19 7"/></Svg>;
I.X = (p) => <Svg {...p}><path d="M6 6l12 12M18 6 6 18"/></Svg>;
I.Flame = (p) => <Svg {...p} fill="currentColor" stroke="none"><path d="M12 2c0 4 4 4 4 8a4 4 0 0 1-1.5 3.1c.1-.4.2-.8.2-1.3 0-2.2-2-3-2-5-1 1-3 3-3 6a4 4 0 1 0 8 0c0-5-5.7-6.5-5.7-10.8z"/></Svg>;
I.Bolt = (p) => <Svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" stroke="none"/></Svg>;
I.Bulb = (p) => <Svg {...p}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.6 1 1.5 1 2.3v1h6v-1c0-.8.4-1.7 1-2.3A7 7 0 0 0 12 2z"/></Svg>;
I.Camera = (p) => <Svg {...p}><path d="M5 7h3l2-2h4l2 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/></Svg>;
I.Bell = (p) => <Svg {...p}><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 7H4c0-1 2-2 2-7zM10 21a2 2 0 0 0 4 0"/></Svg>;
I.User = (p) => <Svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Svg>;
I.Settings = (p) => <Svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Svg>;
I.Sparkles = (p) => <Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></Svg>;
I.Mic = (p) => <Svg {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></Svg>;
I.Send = (p) => <Svg {...p}><path d="M3 11 21 3l-8 18-2-8z" fill="currentColor" stroke="none"/></Svg>;
I.Cal = (p) => <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Svg>;
I.Book = (p) => <Svg {...p}><path d="M4 4a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2zM4 4v18"/></Svg>;
I.Leaf = (p) => <Svg {...p}><path d="M11 20A7 7 0 0 1 4 13V8s5-2 9 0c4 2 8 0 8 0v3a10 10 0 0 1-10 9zM4 13s4-1 8 1 8 1 8 1"/></Svg>;
I.Carrot = (p) => <Svg {...p}><path d="M3 21s2-2 6-6l5-5-4-4-5 5c-4 4-6 6-6 6z" transform="translate(2,0)"/><path d="M14 4l3-3M17 7l3-3M14 10l3-3"/></Svg>;
I.Apple = (p) => <Svg {...p}><path d="M12 6c0-3 3-4 5-4-1 3-3 4-5 4zM12 6c-3-2-7-1-8 2-2 4 1 11 4 13 1 1 2 1 4 0 2 1 3 1 4 0 3-2 6-9 4-13-2-3-5-4-8-2z"/></Svg>;
I.Drop = (p) => <Svg {...p}><path d="M12 3c4 6 7 9 7 13a7 7 0 0 1-14 0c0-4 3-7 7-13z"/></Svg>;
I.Bean = (p) => <Svg {...p}><path d="M16 4c-6 0-12 3-12 9s6 8 11 7c5-1 8-5 8-9s-3-7-7-7z"/></Svg>;
I.Salad = (p) => <Svg {...p}><path d="M4 11h16l-2 9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM4 11c0-4 4-7 8-7s8 3 8 7"/></Svg>;
I.Brain = (p) => <Svg {...p}><path d="M12 4a3 3 0 0 0-3 3 3 3 0 0 0-3 3v4a3 3 0 0 0 3 3 3 3 0 0 0 3 3M12 4a3 3 0 0 1 3 3 3 3 0 0 1 3 3v4a3 3 0 0 1-3 3 3 3 0 0 1-3 3M12 4v16"/></Svg>;
I.Lock = (p) => <Svg {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></Svg>;
I.Mail = (p) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Svg>;
I.Refresh = (p) => <Svg {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></Svg>;
I.Pencil = (p) => <Svg {...p}><path d="M4 20h4l10-10-4-4L4 16zM14 6l4 4"/></Svg>;
I.Triangle = (p) => <Svg {...p} fill="currentColor" stroke="none"><path d="M12 3 22 21H2z"/></Svg>;
I.Sun = (p) => <Svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Svg>;
I.Moon = (p) => <Svg {...p}><path d="M21 13A8 8 0 0 1 11 3a8 8 0 1 0 10 10z"/></Svg>;
I.Face = (p) => <Svg {...p} strokeWidth={1.8}>
  {/* Apple Face ID symbol — rounded square cropped to four corner brackets */}
  <path d="M3 9V6.5A3.5 3.5 0 0 1 6.5 3H9"/>
  <path d="M21 9V6.5A3.5 3.5 0 0 0 17.5 3H15"/>
  <path d="M3 15v2.5A3.5 3.5 0 0 0 6.5 21H9"/>
  <path d="M21 15v2.5a3.5 3.5 0 0 1-3.5 3.5H15"/>
  {/* eyes */}
  <path d="M9 10v1.5"/>
  <path d="M15 10v1.5"/>
  {/* nose */}
  <path d="M12 10v4h-1.5"/>
  {/* mouth */}
  <path d="M9.5 16c.7.7 1.6 1 2.5 1s1.8-.3 2.5-1"/>
</Svg>;
I.Heart = (p) => <Svg {...p}><path d="M12 21s-7-5-9-10c-1-3 1-6 4-6 2 0 4 1 5 3 1-2 3-3 5-3 3 0 5 3 4 6-2 5-9 10-9 10z" fill="currentColor" stroke="none"/></Svg>;
I.Logo = (p) => <Svg {...p} viewBox="0 0 24 24"><path d="M12 3c-5 0-9 4-9 9 0 5 9 9 9 9s9-4 9-9c0-5-4-9-9-9z" fill="currentColor" stroke="none"/><path d="M12 7v10M8 11l4-4 4 4" stroke="#0F1D15" strokeWidth="1.8"/></Svg>;

window.Icon = I;
