import { useEffect, type ElementType, type ReactNode } from "react";
import { Activity, AlertTriangle, BrainCircuit, Cpu, Grid3X3, Radio, ShieldCheck, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProcessMode = "normal" | "warning" | "critical";
export type ProcessLog = { time: string; text: string; level: ProcessMode; action?: string };

export const tone: Record<ProcessMode, string> = { normal: "text-success", warning: "text-warning", critical: "text-destructive" };
export const dot: Record<ProcessMode, string> = { normal: "bg-success", warning: "bg-warning", critical: "bg-destructive" };
export const currentTime = () => new Date().toLocaleTimeString("en-GB", { hour12: false });

export function OperationsHeader({ clock }: { clock: Date | null }) {
  return <header className="topbar"><div className="brand-mark"><div className="brand-icon"><ShieldCheck /></div><div><h1>TRANS-SHIELD <b>AI</b></h1><p>SMART POWER GRID MONITORING &amp; PREDICTIVE PROTECTION</p></div></div><div className="header-status"><StatusPill label="SYSTEM ONLINE"/><StatusPill label="AI ENGINE ACTIVE"/><div className="clock"><span>{clock ? clock.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" }).toUpperCase() : "SYNCING"}</span><strong>{clock ? clock.toLocaleTimeString("en-GB", { hour12:false }) : "--:--:--"}</strong></div><div className="connection"><Wifi/><span>LINK<br/><b>SECURE</b></span></div></div></header>;
}

export function useClock() {
  const React = require("react") as typeof import("react");
  const [clock, setClock] = React.useState<Date | null>(null);
  useEffect(() => { setClock(new Date()); const id = window.setInterval(() => setClock(new Date()), 1000); return () => window.clearInterval(id); }, []);
  return clock;
}

export function Panel({ children, className, title, icon: Icon, action }: { children: ReactNode; className?: string; title?: string; icon?: ElementType; action?: ReactNode }) {
  return <section className={cn("panel", className)}>{title && <div className="panel-heading"><div className="flex items-center gap-2">{Icon && <Icon className="size-4 text-primary"/>}<h2>{title}</h2></div>{action}</div>}{children}</section>;
}
export function StatusPill({ label, level="normal" }: { label:string; level?:ProcessMode }) { return <span className={cn("status-pill", level)}><i className={dot[level]}/>{label}</span>; }
export function Sparkline({ mode, variant=0 }: { mode:ProcessMode; variant?:number }) { const paths=["M0 30 C12 28 18 17 30 23 S49 34 61 20 S82 11 94 23 S113 33 126 18 S146 11 160 21","M0 26 L12 27 L20 21 L28 29 L40 23 L51 25 L62 12 L72 30 L84 22 L96 24 L108 16 L120 27 L132 20 L145 24 L160 14","M0 29 C16 28 20 9 35 23 C49 37 55 12 70 25 C84 38 92 7 108 22 C123 36 139 15 160 20"]; return <svg viewBox="0 0 160 42" className="h-10 w-full" aria-hidden="true"><path d="M0 36H160" className="stroke-border"/><path d={paths[variant%3]} fill="none" className={cn("transition-all duration-700",mode==="normal"?"stroke-cyan":mode==="warning"?"stroke-warning":"stroke-destructive")} strokeWidth="2"/></svg>; }
export function RichSensorCard({ icon:Icon,title,industrial,prototype,value,unit,lines,purpose,threshold,mode,variant=0,gauge }: { icon:ElementType; title:string; industrial:string; prototype:string; value:string; unit:string; lines:string[]; purpose:string; threshold:string; mode:ProcessMode; variant?:number; gauge?:number }) { return <article className={cn("sensor-card rich-sensor",mode!=="normal"&&`sensor-${mode}`)}><div className="flex items-start justify-between gap-2"><div className="sensor-icon"><Icon/></div><StatusPill label={mode==="normal"?"NORMAL":mode.toUpperCase()} level={mode}/></div><h3>{title}</h3><p className="sensor-id">INDUSTRIAL · {industrial}</p><p className="sensor-id">PROTOTYPE · {prototype}</p><div className="sensor-reading"><div><strong className="sensor-value">{value}</strong><span className="sensor-unit">{unit}</span></div>{gauge!==undefined&&<div className="mini-gauge" style={{"--gauge":`${gauge*3.6}deg`} as React.CSSProperties}><span>{Math.round(gauge)}%</span></div>}</div><div className="sensor-detail-lines">{lines.map(line=><span key={line}>{line}</span>)}</div><Sparkline mode={mode} variant={variant}/><p className="sensor-purpose">{purpose}</p><div className="sensor-meta"><span>LIMIT · {threshold}</span><span>UPDATED · NOW</span></div></article>; }
export function Metric({ label,value,unit }: { label:string; value:string; unit:string }) { return <div className="metric"><span>{label}</span><strong>{value}<small>{unit}</small></strong></div>; }
export function HealthGauge({ score,mode,label="HEALTHY" }: { score:number; mode:ProcessMode; label?:string }) { return <div className={cn("health-gauge",mode)} style={{"--score":`${score*3.6}deg`} as React.CSSProperties}><div><strong>{score}</strong><span>/100</span><small>{label}</small></div></div>; }
export function ProcessFlow({ items,mode }: { items:Array<[ElementType,string,string]>; mode:ProcessMode }) { return <div className="flow-grid process-flow">{items.map(([Icon,title,sub],i)=><div className={cn("flow-step",i===items.length-1&&mode)} key={title}><div className="flow-step-icon"><Icon/></div><strong>{title}</strong><span>{sub}</span>{i<items.length-1&&<b aria-hidden="true">›</b>}</div>)}</div>; }
export function Architecture({ items }: { items:Array<[ElementType,string]> }) { return <div className="architecture">{items.map(([Icon,label],i)=><div className="arch-wrap" key={label}><div className="arch-node"><Icon/><span>{label}</span></div>{i<items.length-1&&<div className="arch-link"><i/><span>›</span></div>}</div>)}</div>; }
export function EventList({ logs }: { logs:ProcessLog[] }) { return <div className="event-list">{logs.map((log,i)=><div key={`${log.time}-${i}`}><i className={dot[log.level]}/><span className="mono">{log.time}</span><p>{log.text}</p>{log.action&&<b>{log.action}</b>}</div>)}</div>; }
export const commonIcons = { Activity, AlertTriangle, BrainCircuit, Cpu, Grid3X3, Radio, ShieldCheck };
