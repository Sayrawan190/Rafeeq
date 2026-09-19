"use client";

import Link from "next/link";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Wind,
} from "lucide-react";
import type { RiskLevel } from "@/lib/mock-data";

export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link href="/" className={`logo ${light ? "logo-light" : ""}`} aria-label="رفيق - الرئيسية">
      <span className="logo-mark"><HeartPulse size={compact ? 18 : 22} /></span>
      <span className="logo-copy"><b>رفيق</b>{!compact && <small>HEALTH INTELLIGENCE</small>}</span>
    </Link>
  );
}

export function RiskBadge({ level, label }: { level: RiskLevel; label?: string }) {
  const labels: Record<RiskLevel, string> = { critical: "حرج", high: "مرتفع", medium: "مراقبة", normal: "طبيعي" };
  return <span className={`risk-badge risk-${level}`}><i />{label ?? labels[level]}</span>;
}

export function StatusDot({ active = true, children }: { active?: boolean; children: React.ReactNode }) {
  return <span className={`status-dot ${active ? "active" : ""}`}><i />{children}</span>;
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="section-title">
      <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>
      {action}
    </div>
  );
}

export function Sparkline({ values, color = "#0d6049", height = 72 }: { values: number[]; color?: string; height?: number }) {
  const width = 320;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - 8 - ((value - min) / spread) * (height - 18);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id={`fade-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".24"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#fade-${color.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const metricIcons = { heart: HeartPulse, oxygen: Wind, temp: Thermometer, activity: Activity };

export function MetricCard({ metric, chart }: { metric: { key: string; label: string; value: string; unit: string; status: string; color: string }; chart?: number[] }) {
  const Icon = metricIcons[metric.key as keyof typeof metricIcons] ?? Activity;
  return (
    <article className={`metric-card metric-${metric.color}`}>
      <div className="metric-top"><span className="metric-icon"><Icon size={21} /></span><span className="metric-state"><i />{metric.status}</span></div>
      <span className="metric-label">{metric.label}</span>
      <div className="metric-value"><b>{metric.value}</b><small>{metric.unit}</small></div>
      {chart && <Sparkline values={chart} height={44} />}
    </article>
  );
}

export function AISummary({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`ai-summary ${compact ? "compact" : ""}`}>
      <header><span><Sparkles size={18} /></span><div><b>ملخص رفيق الذكي</b><small>دعم القرار بالذكاء الاصطناعي</small></div></header>
      <p>ارتفع معدل النبض تدريجيًا خلال آخر 50 دقيقة بالتزامن مع ارتفاع درجة الحرارة وانخفاض النشاط، وكان المستخدم يتحرك في منطقة مزدحمة.</p>
      <footer><ShieldCheck size={15} /> هذا الملخص لدعم القرار، وليس تشخيصًا طبيًا.</footer>
    </article>
  );
}

export function RiskScore({ score, level = "high" }: { score: number; level?: RiskLevel }) {
  const percentage = Math.round(score * 100);
  return (
    <div className={`risk-score risk-score-${level}`}>
      <div className="score-ring" style={{ "--score": `${percentage * 3.6}deg` } as React.CSSProperties}><span>{score.toFixed(2)}</span></div>
      <div><small>RISK SCORE</small><b>{level === "critical" ? "خطر حرج" : level === "high" ? "مرتفع - تحذير مبكر" : level === "medium" ? "تحت المراقبة" : "مستقر"}</b><p>قراءة تجريبية غير معتمدة سريريًا</p></div>
    </div>
  );
}

export function MiniMap({ active = "arafah", className = "" }: { active?: string; className?: string }) {
  return (
    <div className={`mini-map ${className}`} role="img" aria-label="خريطة محاكاة للمشاعر المقدسة">
      <div className="map-grid" />
      <svg viewBox="0 0 640 340" preserveAspectRatio="none" aria-hidden="true">
        <path className="route-shadow" d="M84 214 C172 106 255 265 342 170 S500 122 572 72" />
        <path className="route-line" d="M84 214 C172 106 255 265 342 170 S500 122 572 72" />
      </svg>
      <MapPinBubble x="12%" y="62%" label="الحرم" active={active === "haram"} />
      <MapPinBubble x="39%" y="54%" label="منى" active={active === "mina"} />
      <MapPinBubble x="59%" y="43%" label="مزدلفة" active={active === "muzdalifah"} />
      <MapPinBubble x="84%" y="19%" label="عرفات" active={active === "arafah"} />
      <span className="map-you"><span /><b>موقعك الآن</b><small>القطاع B-12</small></span>
    </div>
  );
}

function MapPinBubble({ x, y, label, active }: { x: string; y: string; label: string; active: boolean }) {
  return <span className={`map-pin ${active ? "active" : ""}`} style={{ left: x, top: y }}><MapPin size={17} /><b>{label}</b></span>;
}

export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="inline-link" href={href}>{children}<ChevronLeft size={16} /></Link>;
}

export function EmptySafe({ icon: Icon = CheckCircle2, title, text }: { icon?: typeof BrainCircuit; title: string; text: string }) {
  return <div className="empty-safe"><Icon size={28} /><b>{title}</b><p>{text}</p></div>;
}
