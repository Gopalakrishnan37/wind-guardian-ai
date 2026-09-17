import { useEffect, useMemo, useState } from "react";
import {
  Activity, AlertTriangle, BrainCircuit, ChevronDown, CircleGauge, Cloud,
  Cpu, Gauge, Grid3X3, Radio, RotateCcw, ShieldCheck, Thermometer,
  TowerControl, TriangleAlert, Waves, Wifi, Wind, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Mode = "normal" | "warning" | "critical";
type LogItem = { time: string; text: string; level: Mode; action?: "AUTO" | "MANUAL" };

type Reading = {
  vibration: number; tilt: number; temp: number; wind: number; direction: number;
  voltage: number; current: number; rpm: number; power: number; pf: number;
};

const targetReadings: Record<Mode, Reading> = {
  normal: { vibration: 2.4, tilt: 0.3, temp: 64, wind: 12.8, direction: 248, voltage: 690, current: 612, rpm: 14.6, power: 418, pf: 0.97 },
  warning: { vibration: 7.1, tilt: 0.8, temp: 86, wind: 18.5, direction: 263, voltage: 684, current: 735, rpm: 17.8, power: 486, pf: 0.91 },
  critical: { vibration: 12.8, tilt: 1.7, temp: 104, wind: 25.9, direction: 281, voltage: 641, current: 892, rpm: 22.4, power: 0, pf: 0.73 },
};

const statusTone: Record<Mode, string> = {
  normal: "text-success", warning: "text-warning", critical: "text-destructive",
};
const statusBg: Record<Mode, string> = {
  normal: "bg-success", warning: "bg-warning", critical: "bg-destructive",
};

function nowTime() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

function Sparkline({ mode, variant = 0 }: { mode: Mode; variant?: number }) {
  const paths = [
    "M0 30 C12 28 18 17 30 23 S49 34 61 20 S82 11 94 23 S113 33 126 18 S146 11 160 21",
    "M0 26 L12 27 L20 21 L28 29 L40 23 L51 25 L62 12 L72 30 L84 22 L96 24 L108 16 L120 27 L132 20 L145 24 L160 14",
    "M0 29 C16 28 20 9 35 23 C49 37 55 12 70 25 C84 38 92 7 108 22 C123 36 139 15 160 20",
  ];
  return (
    <svg viewBox="0 0 160 42" className="h-10 w-full" aria-hidden="true">
      <path d="M0 36H160" className="stroke-border" strokeWidth="1" />
      <path d={paths[variant % paths.length]} fill="none" className={cn("transition-all duration-700", mode === "normal" ? "stroke-cyan" : mode === "warning" ? "stroke-warning" : "stroke-destructive")} strokeWidth="2" />
    </svg>
  );
}

function Panel({ children, className, title, icon: Icon, action }: { children: React.ReactNode; className?: string; title?: string; icon?: React.ElementType; action?: React.ReactNode }) {
  return <section className={cn("panel", className)}>{title && <div className="panel-heading"><div className="flex items-center gap-2">{Icon && <Icon className="size-4 text-primary" />}<h2>{title}</h2></div>{action}</div>}{children}</section>;
}

function StatusPill({ label, level = "normal" }: { label: string; level?: Mode }) {
  return <span className={cn("status-pill", level)}><i className={statusBg[level]} />{label}</span>;
}

function WindTurbine({ mode, relayOn }: { mode: Mode; relayOn: boolean }) {
  return (
    <div className={cn("turbine-scene", mode)}>
      <div className="wind-lines" aria-hidden="true">{[...Array(7)].map((_, i) => <i key={i} style={{ top: `${14 + i * 10}%`, animationDelay: `${i * -.45}s` }} />)}</div>
      <svg viewBox="0 0 620 390" role="img" aria-label={`WPS-01 turbine operating in ${mode} mode`}>
        <defs>
          <linearGradient id="tower" x1="0" x2="1"><stop stopColor="var(--tower-light)"/><stop offset="1" stopColor="var(--tower-dark)"/></linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M0 335 Q180 306 330 330 T620 320 V390 H0Z" className="fill-ground" />
        <path d="M265 327 L290 112 L314 112 L344 327Z" fill="url(#tower)" className="stroke-tower" strokeWidth="2" />
        <rect x="284" y="97" width="55" height="28" rx="9" className="fill-nacelle stroke-tower" strokeWidth="2" />
        <g className="rotor" style={{ transformOrigin: "288px 111px" }}>
          <path d="M288 111 C235 91 194 56 169 17 C219 31 267 65 294 101Z" className="fill-blade stroke-tower" />
          <path d="M288 111 C235 91 194 56 169 17 C219 31 267 65 294 101Z" className="fill-blade stroke-tower" transform="rotate(120 288 111)" />
          <path d="M288 111 C235 91 194 56 169 17 C219 31 267 65 294 101Z" className="fill-blade stroke-tower" transform="rotate(240 288 111)" />
          <circle cx="288" cy="111" r="12" className="fill-primary stroke-surface" strokeWidth="4" />
        </g>
        <g transform="translate(370 118)">
          {[[0,"TURBINE"],[78,"GENERATOR"],[176,"RELAY"],[260,"GRID"]].map(([x,label], i) => <g key={String(label)} transform={`translate(${x} 0)`}><rect width={i===1?82:68} height="36" rx="4" className={cn("flow-node", i === 2 && !relayOn && "flow-node-off")} /><text x={i===1?41:34} y="22" textAnchor="middle" className="flow-label">{label}</text></g>)}
          <path d="M68 18H78 M160 18H176 M244 18H260" className={cn("energy-path", !relayOn && "broken")} pathLength="1" />
        </g>
        <g transform="translate(490 245)" className={relayOn ? "opacity-100" : "opacity-30"}>
          <path d="M0 70L32 0L65 70M11 45H53M5 58H59M32 0V102M12 102H52" fill="none" className="stroke-grid" strokeWidth="3" />
        </g>
      </svg>
      <div className="scene-readout"><span>LIVE OUTPUT</span><strong>{relayOn ? (mode === "warning" ? "486" : "418") : "0"} <small>kW</small></strong></div>
    </div>
  );
}

function SensorCard({ icon: Icon, title, sensor, value, unit, sub, mode, variant, gauge }: { icon: React.ElementType; title: string; sensor: string; value: string; unit: string; sub: string; mode: Mode; variant: number; gauge?: number }) {
  return <article className={cn("sensor-card", mode !== "normal" && `sensor-${mode}`)}>
    <div className="flex items-start justify-between gap-2"><div className="sensor-icon"><Icon /></div><StatusPill label={mode === "normal" ? "NORMAL" : mode.toUpperCase()} level={mode} /></div>
    <h3>{title}</h3><p className="sensor-id">{sensor}</p>
    <div className="mt-3 flex items-end justify-between gap-3"><div><strong className="sensor-value">{value}</strong><span className="sensor-unit">{unit}</span></div>{gauge !== undefined && <div className="mini-gauge" style={{ "--gauge": `${gauge * 3.6}deg` } as React.CSSProperties}><span>{gauge}%</span></div>}</div>
    <p className="sensor-sub">{sub}</p><Sparkline mode={mode} variant={variant} />
  </article>;
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}<small>{unit}</small></strong></div>;
}

function HealthGauge({ score, mode }: { score: number; mode: Mode }) {
  return <div className={cn("health-gauge", mode)} style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><div><strong>{score}</strong><span>/100</span><small>HEALTHY</small></div></div>;
}

function FlowDiagram({ mode }: { mode: Mode }) {
  const steps = [
    [Waves, "Sensor inputs", "8 channels"], [Cpu, "Data acquisition", "ESP32 edge"],
    [BrainCircuit, "AI analysis", "Live inference"], [Activity, "Anomaly detect", "Pattern scan"],
    [TriangleAlert, "Risk prediction", mode === "normal" ? "2.8% / 24h" : mode === "warning" ? "31% / 24h" : "89% / 24h"],
    [ShieldCheck, "Protection", mode === "critical" ? "TRIPPED" : mode === "warning" ? "WARNING" : "NORMAL"],
  ] as const;
  return <div className="flow-grid">{steps.map(([Icon,title,sub], i) => <div className={cn("flow-step", i === steps.length-1 && mode)} key={title}><div className="flow-step-icon"><Icon /></div><strong>{title}</strong><span>{sub}</span>{i < steps.length - 1 && <b aria-hidden="true">›</b>}</div>)}</div>;
}

function Architecture() {
  const items = [[Waves,"Sensors"],[Cpu,"ESP32 Edge"],[Radio,"Wi-Fi / LoRa"],[Cloud,"Cloud / API"],[BrainCircuit,"AI Engine"],[Grid3X3,"Dashboard"],[ShieldCheck,"Protective Relay"]] as const;
  return <div className="architecture">{items.map(([Icon,label], i) => <div className="arch-wrap" key={label}><div className="arch-node"><Icon/><span>{label}</span></div>{i < items.length-1 && <div className="arch-link"><i/><span>›</span></div>}</div>)}</div>;
}

const thresholds = [
  ["Vibration", "0–5 mm/s", "5–10 mm/s", ">10 mm/s"], ["Gearbox temperature", "<75°C", "75–95°C", ">95°C"],
  ["Tower tilt", "<0.5°", "0.5–1.2°", ">1.2°"], ["Rotor speed", "8–17 RPM", "17–20 RPM", ">20 RPM"],
  ["Grid voltage", "655–725 V", "620–654 V", "<620 V"],
];

export function WindStationDashboard() {
  const [mode, setMode] = useState<Mode>("normal");
  const [readings, setReadings] = useState(targetReadings.normal);
  const [automatic, setAutomatic] = useState(true);
  const [relayOn, setRelayOn] = useState(true);
  const [safeToReset, setSafeToReset] = useState(false);
  const [thresholdsOpen, setThresholdsOpen] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [logs, setLogs] = useState<LogItem[]>([
    { time: "10:14:32", text: "AI health assessment complete — no anomaly", level: "normal" },
    { time: "10:12:08", text: "Grid synchronization verified at 50.0 Hz", level: "normal" },
    { time: "10:08:47", text: "Protection relay self-test passed", level: "normal", action: "AUTO" },
  ]);

  useEffect(() => { const id = window.setInterval(() => setClock(new Date()), 1000); return () => window.clearInterval(id); }, []);
  useEffect(() => {
    const id = window.setInterval(() => setReadings(prev => {
      const target = targetReadings[mode]; const next = { ...prev };
      (Object.keys(target) as (keyof Reading)[]).forEach(key => { next[key] = prev[key] + (target[key] - prev[key]) * .22 + (Math.random() - .5) * (key === "voltage" ? 1.4 : .12); });
      return next;
    }), 850); return () => window.clearInterval(id);
  }, [mode]);

  const health = mode === "normal" ? 94 : mode === "warning" ? 72 : 38;
  const risk = mode === "normal" ? 2.8 : mode === "warning" ? 31 : 89;
  const sensorMode = (critical: boolean) => critical ? mode : "normal";
  const addLog = (text: string, level: Mode, action?: "AUTO" | "MANUAL") => setLogs(old => [{ time: nowTime(), text, level, action }, ...old].slice(0, 8));

  const selectMode = (next: Mode) => {
    setMode(next); setSafeToReset(false);
    if (next === "critical" && automatic) { setRelayOn(false); addLog("Automatic trip — critical threshold exceeded", "critical", "AUTO"); }
    else if (next === "warning") addLog("Elevated gearbox temperature and vibration", "warning", "AUTO");
    else addLog("Simulation returned to nominal conditions", "normal");
  };
  const resetSimulation = () => { setMode("normal"); setSafeToReset(true); addLog("Sensor inputs restored to safe range", "normal"); };
  const resetProtection = () => { if (!safeToReset) return; setRelayOn(true); setSafeToReset(false); addLog("Protection relay reset after safety validation", "normal", "MANUAL"); };
  const toggleRelay = () => {
    if (automatic || (!relayOn && mode === "critical")) return;
    const next = !relayOn;
    setRelayOn(next);
    addLog(`Operator switched relay ${next ? "ON" : "OFF"}`, next ? "normal" : "warning", "MANUAL");
  };
  const anomalies = useMemo(() => mode === "critical" ? [
    ["10:15:04", "CRITICAL", "Gearbox temperature above trip threshold"], ["10:15:03", "CRITICAL", "Rotor overspeed signature detected"], ["10:14:58", "WARNING", "Tower vibration rising rapidly"],
  ] : mode === "warning" ? [["10:15:02", "WARNING", "Gearbox thermal gradient elevated"], ["10:14:56", "WARNING", "Vibration spectrum outside baseline"], ["10:12:08", "NORMAL", "Grid synchronization verified"]] : [["10:14:32", "NORMAL", "No abnormal vibration patterns"], ["10:12:08", "NORMAL", "Electrical harmonics within limits"], ["10:08:47", "NORMAL", "Structural model confidence 98.2%"]], [mode]);

  return <main className={cn("min-h-screen bg-background text-foreground", `mode-${mode}`)}>
    <header className="topbar">
      <div className="brand-mark"><div className="brand-icon"><ShieldCheck /></div><div><h1>TRANS-SHIELD <b>AI</b></h1><p>SMART POWER GRID MONITORING &amp; PREDICTIVE PROTECTION</p></div></div>
      <div className="header-status"><StatusPill label="SYSTEM ONLINE"/><StatusPill label="AI ENGINE ACTIVE"/><div className="clock"><span>{clock.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" }).toUpperCase()}</span><strong>{clock.toLocaleTimeString("en-GB", { hour12:false })}</strong></div><div className="connection"><Wifi/><span>LINK<br/><b>SECURE</b></span></div></div>
    </header>
    <div className="breadcrumb"><span>POWER GRID</span><b>/</b><span>GENERATION</span><b>/</b><strong>WIND POWER STATION · WPS-01</strong></div>

    <div className="dashboard-shell">
      {mode === "critical" && <div className="trip-banner"><TriangleAlert/><strong>CRITICAL PROTECTION TRIP</strong><span>Relay opened automatically · Grid isolated · Operator acknowledgement required</span></div>}
      <section className="hero-grid">
        <div className="station-intro"><span className="eyebrow">WIND POWER STATION</span><div className="flex items-start justify-between gap-4"><div><h2>WPS-01</h2><p>North Ridge · Turbine 01</p></div><span className={cn("station-state", mode)}>{mode === "normal" ? "RUNNING" : mode.toUpperCase()}</span></div><div className="station-flags"><StatusPill label="GRID CONNECTED" level={relayOn ? "normal" : "critical"}/><StatusPill label={relayOn ? "PROTECTION ARMED" : "RELAY TRIPPED"} level={relayOn ? "normal" : "critical"}/></div><div className="weather"><Wind/><div><strong>{readings.wind.toFixed(1)} m/s</strong><span>WSW · {Math.round(readings.direction)}°</span></div><div><strong>18.4°C</strong><span>AMBIENT</span></div></div></div>
        <WindTurbine mode={mode} relayOn={relayOn}/>
        <Panel className="status-panel" title="Turbine Status" icon={TowerControl}><div className="status-list">{[["Rotor", mode],["Generator", mode === "critical" ? "warning": "normal"],["Gearbox", mode],["Grid", relayOn ? "normal":"critical"],["Protection", relayOn ? "normal":"critical"]].map(([name,level]) => <div key={name}><span><i className={statusBg[level as Mode]}/>{name}</span><strong className={statusTone[level as Mode]}>{level === "normal" ? "NORMAL" : String(level).toUpperCase()}</strong></div>)}</div><div className="uptime"><span>OPERATING TIME</span><strong>6,428 h</strong><small>97.8% availability</small></div></Panel>
      </section>

      <section className="simulation-bar"><div><span className="eyebrow">SIMULATION MODE</span><p>Inject operating conditions to validate protection logic</p></div><div className="simulation-buttons"><Button onClick={() => selectMode("normal")} variant={mode === "normal" ? "default" : "outline"}><ShieldCheck/>Normal</Button><Button onClick={() => selectMode("warning")} variant="outline" className={cn(mode === "warning" && "active-warning")}><AlertTriangle/>Warning Simulation</Button><Button onClick={() => selectMode("critical")} variant="outline" className={cn(mode === "critical" && "active-critical")}><TriangleAlert/>Critical Simulation</Button><Button onClick={resetSimulation} variant="ghost"><RotateCcw/>Reset</Button></div></section>

      <div className="section-title"><div><span className="eyebrow">LIVE TELEMETRY</span><h2>Sensor Network</h2></div><span className="sample-rate"><i/>Sampling at 10 Hz</span></div>
      <section className="sensor-grid">
        <SensorCard icon={Waves} title="Vibration & Tower Tilt" sensor="ADXL345 / IEPE · X/Y/Z" value={readings.vibration.toFixed(1)} unit="mm/s" sub={`Tilt ${readings.tilt.toFixed(2)}° · X 2.1 · Y 1.8 · Z 2.4`} mode={sensorMode(mode !== "normal")} variant={1}/>
        <SensorCard icon={Thermometer} title="Generator & Gearbox Temp" sensor="DS18B20 / PT100" value={readings.temp.toFixed(1)} unit="°C" sub={`Generator ${(readings.temp-7.2).toFixed(1)}° · Gearbox ${readings.temp.toFixed(1)}°`} mode={sensorMode(mode !== "normal")} variant={0} gauge={Math.min(100, readings.temp)}/>
        <SensorCard icon={Wind} title="Wind Speed & Direction" sensor="CUP ANEMOMETER / VANE" value={readings.wind.toFixed(1)} unit="m/s" sub={`Direction ${Math.round(readings.direction)}° · WSW · Gust ${(readings.wind+2.7).toFixed(1)}`} mode={sensorMode(mode === "critical")} variant={2}/>
        <SensorCard icon={Zap} title="Electrical Voltage" sensor="ZMPT101B / PT · 3-PHASE" value={readings.voltage.toFixed(0)} unit="V AC" sub={`L1 230 · L2 231 · L3 229 · 50.0 Hz`} mode={sensorMode(mode === "critical")} variant={2}/>
        <SensorCard icon={Activity} title="Electrical Current" sensor="ACS712 / CT" value={relayOn ? readings.current.toFixed(0) : "0"} unit="A" sub={`Load ${relayOn ? Math.min(100, readings.current/8.1).toFixed(0) : 0}% · Balanced phases`} mode={sensorMode(mode === "critical")} variant={0} gauge={relayOn ? Math.min(100, readings.current/8.1):0}/>
        <SensorCard icon={CircleGauge} title="Rotor Speed" sensor="LM393 / OPTICAL ENCODER" value={relayOn ? readings.rpm.toFixed(1):"0.0"} unit="RPM" sub={`Tip speed ${relayOn ? (readings.rpm*8.2).toFixed(0):0} m/s · Pitch 4.2°`} mode={sensorMode(mode !== "normal")} variant={1} gauge={relayOn ? Math.min(100,readings.rpm*4.2):0}/>
      </section>

      <section className="analytics-grid">
        <Panel title="Power Generation" icon={Zap} className="power-panel" action={<span className="live-tag"><i/>LIVE</span>}><div className="metric-grid"><Metric label="ACTIVE POWER" value={relayOn ? readings.power.toFixed(0):"0"} unit="kW"/><Metric label="GRID VOLTAGE" value={readings.voltage.toFixed(0)} unit="V"/><Metric label="CURRENT" value={relayOn ? readings.current.toFixed(0):"0"} unit="A"/><Metric label="POWER FACTOR" value={relayOn ? readings.pf.toFixed(2):"—"} unit="PF"/><Metric label="ROTOR" value={relayOn ? readings.rpm.toFixed(1):"0"} unit="RPM"/><Metric label="WIND" value={readings.wind.toFixed(1)} unit="m/s"/></div><div className="big-chart"><div className="chart-y"><span>500</span><span>250</span><span>0 kW</span></div><svg viewBox="0 0 700 150" preserveAspectRatio="none"><path d="M0 130H700M0 75H700M0 20H700" className="chart-grid-line"/><path d={relayOn ? "M0 104 C45 92 72 98 110 77 S180 69 220 60 S300 75 355 48 S430 39 480 45 S560 31 610 35 S665 22 700 26":"M0 130H700"} className="power-area"/><path d={relayOn ? "M0 104 C45 92 72 98 110 77 S180 69 220 60 S300 75 355 48 S430 39 480 45 S560 31 610 35 S665 22 700 26":"M0 130H700"} className="power-line"/></svg><div className="chart-x"><span>-60 min</span><span>-45</span><span>-30</span><span>-15</span><span>NOW</span></div></div></Panel>
        <Panel title="AI Turbine Health Index" icon={BrainCircuit} className="health-panel"><div className="health-main"><HealthGauge score={health} mode={mode}/><div className="health-breakdown">{[["Mechanical",health-2],["Electrical",Math.min(99,health+3)],["Thermal",mode === "normal" ? 91 : mode === "warning" ? 61 : 24],["Structural",Math.min(98,health+4)]].map(([label,value]) => <div key={label}><span>{label}<b>{value}%</b></span><div><i style={{width:`${value}%`}} className={cn(mode !== "normal" && label === "Thermal" ? statusBg[mode]:"bg-primary")}/></div></div>)}</div></div><div className={cn("ai-note", mode)}><BrainCircuit/><p><strong>AI DIAGNOSTIC</strong>{mode === "normal" ? "All monitored systems are within learned operating baseline. No maintenance action predicted." : mode === "warning" ? "Thermal and vibration signatures indicate gearbox bearing degradation. Inspection advised within 24 hours." : "High-confidence compound anomaly. Turbine isolated to prevent mechanical and electrical damage."}</p></div></Panel>
      </section>

      <section className="protection-grid">
        <Panel title="AI Predictive Protection" icon={ShieldCheck}><div className="risk-row"><div><span>RISK LEVEL</span><strong className={statusTone[mode]}>{mode === "normal" ? "LOW" : mode.toUpperCase()}</strong></div><div><span>24H FAILURE PROBABILITY</span><strong className={statusTone[mode]}>{risk}%</strong></div><StatusPill label={relayOn ? "ARMED" : "TRIPPED"} level={relayOn ? "normal":"critical"}/></div><div className="prediction-chart"><span>100</span><svg viewBox="0 0 500 95" preserveAspectRatio="none"><path d="M0 80H500M0 45H500M0 10H500" className="chart-grid-line"/><path d={mode === "normal" ? "M0 17 C100 19 200 22 300 21 S420 25 500 27":"M0 22 C120 24 210 35 290 47 S410 69 500 82"} className={cn("prediction-line", mode)}/></svg><div><span>NOW</span><span>+6H</span><span>+12H</span><span>+18H</span><span>+24H</span></div></div></Panel>
        <Panel title="AI Anomaly Detection" icon={Activity}><div className="anomaly-list">{anomalies.map(([time,level,text]) => <div key={time+text}><span className="mono">{time}</span><i className={statusBg[level.toLowerCase() as Mode]}/><div><b className={statusTone[level.toLowerCase() as Mode]}>{level}</b><p>{text}</p></div></div>)}</div></Panel>
      </section>

      <Panel title="Predictive Protection Flow" icon={BrainCircuit} className="wide-panel"><FlowDiagram mode={mode}/></Panel>

      <section className="control-grid">
        <Panel title="Protection Relay Control" icon={ShieldCheck} className={cn("relay-panel", !relayOn && "relay-tripped")}><div className="relay-top"><div className={cn("relay-state", relayOn ? "on":"off")}><Zap/><div><span>CURRENT STATE</span><strong>RELAY {relayOn ? "ON":"OFF"}</strong><small>{relayOn ? "GRID CONNECTED":"GRID ISOLATED"}</small></div></div><div className="mode-toggle"><span className={automatic ? "active":""}>AUTO</span><Switch checked={!automatic} onCheckedChange={checked => {setAutomatic(!checked); addLog(`Control mode changed to ${checked ? "MANUAL":"AUTO"}`, "normal", "MANUAL");}}/><span className={!automatic ? "active":""}>MANUAL</span></div></div><div className="single-line"><div><Wind/><span>TURBINE</span></div><i className={relayOn?"energized":""}/><div><Cpu/><span>GENERATOR</span></div><i className={relayOn?"energized":""}/><div className={!relayOn?"tripped":""}><ShieldCheck/><span>RELAY</span></div><i className={relayOn?"energized":"broken"}/><div><Grid3X3/><span>GRID</span></div></div><div className="relay-actions"><Button disabled={automatic || (!relayOn && mode === "critical")} onClick={toggleRelay} variant="outline"><Zap/>{relayOn ? "Open Relay":"Close Relay"}</Button><Button disabled={!safeToReset || relayOn} onClick={resetProtection} variant="destructive"><RotateCcw/>Reset Protection</Button></div>{!relayOn && <div className="safety-note"><TriangleAlert/><span>{safeToReset ? "Sensors are safe. Protection reset is now available." : "Reset locked until sensor readings return to a safe range."}</span></div>}</Panel>
        <Panel title="Active Alerts & Event Log" icon={AlertTriangle}><div className="event-list">{logs.map((log,i) => <div key={`${log.time}-${i}`}><i className={statusBg[log.level]}/><span className="mono">{log.time}</span><p>{log.text}</p>{log.action && <b>{log.action}</b>}</div>)}</div></Panel>
      </section>

      <Panel className="threshold-panel"><button className="threshold-toggle" onClick={() => setThresholdsOpen(!thresholdsOpen)} aria-expanded={thresholdsOpen}><div><AlertTriangle/><span><strong>PROTOTYPE SAFETY THRESHOLDS – NOT FOR DIRECT INDUSTRIAL DEPLOYMENT</strong><small>Reference limits used by this simulation only</small></span></div><ChevronDown className={thresholdsOpen ? "rotate-180":""}/></button>{thresholdsOpen && <div className="threshold-content"><table><thead><tr><th>PARAMETER</th><th>NORMAL</th><th>WARNING</th><th>CRITICAL / TRIP</th></tr></thead><tbody>{thresholds.map(row => <tr key={row[0]}>{row.map((cell,i)=><td key={cell} className={i===1?"text-success":i===2?"text-warning":i===3?"text-destructive":""}>{cell}</td>)}</tr>)}</tbody></table></div>}</Panel>

      <Panel title="Wind Station Data Flow Architecture" icon={Cpu} className="wide-panel"><Architecture/></Panel>
      <footer><span>TRANS-SHIELD AI · WPS-01</span><span>Prototype monitoring environment · IEC 61400 inspired</span><span>DATA LATENCY 82 ms · <b>SECURE LINK</b></span></footer>
    </div>
  </main>;
}
