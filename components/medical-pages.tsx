"use client";

import Link from "next/link";
import {
  Activity, AlertTriangle, ArrowLeft, CheckCircle2, ChevronLeft, Clock3,
  Filter, HeartPulse, ListFilter, MapPin, Pill, Search, ShieldAlert,
  Thermometer, UserRoundCheck, Wind, X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRafeeq } from "@/components/app-provider";
import { medicalCases, type RiskLevel } from "@/lib/mock-data";
import { AISummary, MetricCard, MiniMap, RiskBadge, RiskScore, SectionTitle, Sparkline } from "@/components/ui";

type Patient = (typeof medicalCases)[number];
type CaseFilter = "all" | RiskLevel | "assigned" | "closed";

const levelCounts = [
  { level: "critical" as RiskLevel, label: "حرجة", value: 3, note: "تحتاج استجابة فورية", icon: ShieldAlert },
  { level: "high" as RiskLevel, label: "مرتفعة", value: 8, note: "استجابة ذات أولوية", icon: AlertTriangle },
  { level: "medium" as RiskLevel, label: "قيد المتابعة", value: 15, note: "تحت المراقبة", icon: Activity },
  { level: "normal" as RiskLevel, label: "مستقرة", value: 126, note: "مراقبة روتينية", icon: CheckCircle2 },
];

const severityRank: Record<RiskLevel, number> = { critical: 4, high: 3, medium: 2, normal: 1 };

export function MedicalDashboard() {
  const { notify } = useRafeeq();
  const [selected, setSelected] = useState<Patient | null>(null);
  const urgentCases = [...medicalCases].sort((a, b) => severityRank[b.level] - severityRank[a.level] || a.alertMinutes - b.alertMinutes).slice(0, 4);

  return <>
    <section className="dashboard-heading">
      <div><span className="eyebrow">الاثنين · 9 ذو الحجة</span><h1>نظرة عامة على الحالات</h1><p>الحالات مرتبة حسب مستوى الخطورة، ثم وقت التنبيه الأحدث.</p></div>
      <button className="outline-button" onClick={() => notify("تم تحديث قائمة الحالات الآن")}>تحديث البيانات</button>
    </section>
    <div className="overview-cards">{levelCounts.map(({ level, label, value, note, icon: Icon }) => <article className={`overview-card level-${level}`} key={level}><span><Icon/></span><div><small>{label}</small><b>{value}</b><p>{note}</p></div><em>{level === "critical" ? "+1" : level === "high" ? "+2" : "الآن"}</em></article>)}</div>
    <div className="medical-dashboard-grid">
      <section className="case-list-section card">
        <div className="panel-heading"><div><span className="eyebrow">الأولوية الآن</span><h2>الحالات التي تحتاج استجابة الآن</h2></div><Link href="/medical/cases">عرض كل الحالات <ChevronLeft/></Link></div>
        <div className="case-list">{urgentCases.map((patient) => <PatientRow key={patient.id} patient={patient} onSelect={() => setSelected(patient)}/>)}</div>
      </section>
      <aside className="medical-side">
        <section className="response-stats card"><span className="eyebrow">أداء الاستجابة</span><h2>متوسط زمن الوصول</h2><div className="big-stat"><b>7:42</b><small>دقيقة</small><em>-18%</em></div><Sparkline values={[12, 11, 10, 11, 9.5, 9, 8.4, 8.1, 7.9, 7.7]} height={90}/><footer><span>الهدف: أقل من 10 دقائق</span><b>جيد</b></footer></section>
        <section className="teams-card card"><div className="panel-heading"><div><span className="eyebrow">الفرق الميدانية</span><h2>حالة الفرق</h2></div></div><div><span><i className="green"/><b>متاحة</b><em>12</em></span><span><i className="orange"/><b>في مهمة</b><em>7</em></span><span><i className="gray"/><b>غير متاحة</b><em>2</em></span></div><button onClick={() => notify("تم فتح معاينة توزيع الفرق - عرض تجريبي")}>عرض توزيع الفرق</button></section>
      </aside>
    </div>
    <section className="medical-map-section card"><div className="panel-heading"><div><span className="eyebrow">خريطة توضيحية</span><h2>التوزيع الميداني للحالات</h2></div><span className="demo-label">بيانات تجريبية</span></div><MiniMap active="arafah"/></section>
    <CaseDrawer key={selected?.id ?? "none"} patient={selected} onClose={() => setSelected(null)}/>
  </>;
}

function PatientRow({ patient, onSelect }: { patient: Patient; onSelect: () => void }) {
  return <button type="button" onClick={onSelect} className="patient-row"><RiskBadge level={patient.level}/><div className="patient-name"><span>{patient.name.split(" ").slice(0,2).map((part) => part[0]).join("")}</span><div><b>{patient.name}</b><small>{patient.id} · {patient.age} سنة</small></div></div><span className="patient-location"><MapPin/>{patient.location}</span><span className="patient-vital"><HeartPulse/>{patient.heart}</span><span className="patient-vital"><Thermometer/>{patient.temp}°</span><div className="patient-reason"><b>{patient.reason}</b><small>{patient.alertTime}</small></div><WorkflowChip status={patient.status}/><ChevronLeft/></button>;
}

export function MedicalCasesPage() {
  const [filter, setFilter] = useState<CaseFilter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);
  const filtered = useMemo(() => [...medicalCases]
    .sort((a, b) => severityRank[b.level] - severityRank[a.level] || a.alertMinutes - b.alertMinutes)
    .filter((item) => {
      const matchesFilter = filter === "all" || item.level === filter || (filter === "assigned" && item.status === "تم التعيين") || (filter === "closed" && item.status === "مغلقة");
      return matchesFilter && (item.name.includes(query) || item.id.toLowerCase().includes(query.toLowerCase()) || item.location.includes(query));
    }), [filter, query]);
  const filters: Array<[CaseFilter, string]> = [["all","الكل"],["critical","حرجة"],["high","مرتفعة"],["medium","مراقبة"],["normal","مستقرة"],["assigned","تم التعيين"],["closed","مغلقة"]];

  return <>
    <section className="dashboard-heading"><div><span className="eyebrow">إدارة الحالات</span><h1>الحالات الطبية</h1><p>افتح تفاصيل الحالة في الدرج الجانبي مع البقاء في القائمة.</p></div><span className="record-count">{filtered.length} حالات معروضة</span></section>
    <section className="case-toolbar card"><label className="search-box"><Search/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالاسم أو رقم الحالة أو الموقع..."/></label><div className="filter-tabs"><ListFilter/>{filters.map(([value,label]) => <button key={value} onClick={() => setFilter(value)} className={filter === value ? "active" : ""}>{label}</button>)}</div><button className="filter-button"><Filter/>فلاتر إضافية</button></section>
    <section className="cases-table card">
      <header><span>المستوى الطبي</span><span>الحاج</span><span>الموقع</span><span>المؤشرات</span><span>سبب التنبيه</span><span>الخطر · الوقت</span><span>سير العمل</span></header>
      {filtered.map((patient) => <button type="button" onClick={() => setSelected(patient)} className="case-table-row" key={patient.id}><span><RiskBadge level={patient.level}/></span><span className="patient-name"><i>{patient.name.slice(0,1)}</i><span className="patient-details-text"><b>{patient.name}</b><small>{patient.id} · {patient.age} سنة</small></span></span><span><MapPin/>{patient.location}</span><span className="vitals-compact"><b><HeartPulse/>{patient.heart}</b><b><Thermometer/>{patient.temp}°</b><b><Wind/>{patient.spo2}%</b></span><span>{patient.reason}</span><span className="case-score-time"><b className={`score-text ${patient.level}`}>{patient.score.toFixed(2)}</b><small>{patient.alertTime}</small></span><span><WorkflowChip status={patient.status}/></span></button>)}
      {filtered.length === 0 && <div className="no-results"><Search/><b>لا توجد حالات مطابقة</b><p>جرّب تغيير عبارة البحث أو مستوى الخطورة.</p></div>}
    </section>
    <CaseDrawer key={selected?.id ?? "none"} patient={selected} onClose={() => setSelected(null)}/>
  </>;
}

function WorkflowChip({ status }: { status: string }) {
  const tone = status === "مغلقة" || status === "مستقرة" ? "done" : status === "جديدة" ? "new" : "progress";
  return <span className={`workflow-chip ${tone}`}>{status}</span>;
}

function CaseDrawer({ patient, onClose }: { patient: Patient | null; onClose: () => void }) {
  const { notify } = useRafeeq();
  const [status, setStatus] = useState("");
  if (!patient) return null;
  const currentStatus = status || patient.status;
  const act = (next: string) => { setStatus(next); notify(`تم تحديث سير العمل إلى: ${next}`); };

  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><aside className="case-drawer" role="dialog" aria-modal="true" aria-label={`تفاصيل حالة ${patient.name}`}>
    <header className="drawer-header"><div><span className="eyebrow">تفاصيل الحالة · عرض توضيحي</span><h2>{patient.name}</h2><p>{patient.id} · <MapPin/>{patient.location}</p></div><button onClick={onClose} aria-label="إغلاق"><X/></button></header>
    <div className="drawer-summary"><RiskBadge level={patient.level}/><span><small>وقت التنبيه</small><b>{patient.alertTime}</b></span><span><small>مؤشر الخطر</small><b>{patient.score.toFixed(2)}</b></span><WorkflowChip status={currentStatus}/></div>
    <section className="drawer-section"><h3>المؤشرات الحيوية</h3><div className="drawer-vitals"><span><HeartPulse/><small>النبض</small><b>{patient.heart} <em>نبضة/د</em></b></span><span><Thermometer/><small>الحرارة</small><b>{patient.temp}°م</b></span><span><Wind/><small>الأكسجين</small><b>{patient.spo2}%</b></span></div><p className="drawer-indicator"><AlertTriangle/>سبب التنبيه: {patient.reason}</p></section>
    <section className="drawer-section"><h3>المعلومات الطبية ذات الصلة</h3><dl className="drawer-medical"><div><dt><AlertTriangle/>الحساسية</dt><dd className="warning-text">البنسلين</dd></div><div><dt><UserRoundCheck/>الحالات المزمنة</dt><dd>ضغط الدم، السكري</dd></div><div><dt><Pill/>الأدوية</dt><dd>ميتفورمين، أملوديبين</dd></div></dl></section>
    <section className="drawer-section"><h3>سجل الإجراء</h3><div className="drawer-timeline"><span className="done"><i/><div><b>تم إنشاء التنبيه</b><small>14:28</small></div></span><span className={currentStatus !== "جديدة" ? "done" : "active"}><i/><div><b>تم استلام الحالة</b><small>14:31</small></div></span><span className={["تم التعيين","الفريق في الطريق","قيد العلاج","مغلقة"].includes(currentStatus) ? "done" : ""}><i/><div><b>تم تعيين الفريق</b><small>14:34</small></div></span><span className={["الفريق في الطريق","قيد العلاج","مغلقة"].includes(currentStatus) ? "done" : ""}><i/><div><b>وصل الفريق / بدأ التنفيذ</b><small>—</small></div></span><span className={currentStatus === "مغلقة" ? "done" : ""}><i/><div><b>تمت المعالجة الأولية وإغلاق الحالة</b><small>—</small></div></span></div></section>
    <footer className="drawer-actions"><button className="outline-button" onClick={() => act("قيد المراجعة")}>استلام الحالة</button><button className="outline-button" onClick={() => act("تم التعيين")}>تعيين فريق</button><button className="primary-button" onClick={() => act("قيد العلاج")}>تحديث الحالة</button><button className="soft-button" onClick={() => act("مغلقة")}>إغلاق الحالة</button></footer>
  </aside></div>;
}

// مسار متوافق مع الروابط القديمة؛ التفاعل الأساسي الجديد يتم داخل الدرج الجانبي.
export function PatientCasePage({ id }: { id: string }) {
  const patient = medicalCases.find((item) => item.id === id) ?? medicalCases[0];
  const metrics = [
    { key: "heart", label: "معدل النبض", value: String(patient.heart), unit: "نبضة/د", status: "مرتفع", color: "green" },
    { key: "temp", label: "درجة الحرارة", value: String(patient.temp), unit: "°م", status: "مرتفعة", color: "gold" },
    { key: "oxygen", label: "تشبع الأكسجين", value: String(patient.spo2), unit: "%", status: patient.spo2 < 94 ? "منخفض" : "مراقبة", color: "teal" },
  ];
  return <><div className="case-back"><Link href="/medical/cases"><ArrowLeft/>العودة إلى الحالات</Link><span>رابط مباشر متوافق · بيانات تجريبية</span></div><section className="case-hero card"><div className="case-person"><span>{patient.name.slice(0,1)}</span><div><div><RiskBadge level={patient.level}/><em>{patient.id}</em></div><h1>{patient.name}</h1><p>{patient.age} سنة · فصيلة الدم O+ · <MapPin/>{patient.location}</p></div></div><WorkflowChip status={patient.status}/></section><div className="case-detail-grid"><main><div className="case-metrics">{metrics.map((metric) => <MetricCard key={metric.key} metric={metric}/>)}</div><AISummary/><section className="case-history card"><SectionTitle eyebrow="الخط الزمني" title="أحداث الحالة"/><div><span><i className="red"/><div><b>رُصد خطر مرتفع</b><p>تجاوزت المؤشرات عتبة التنبيه التجريبية.</p></div><time>14:32</time></span><span><i className="gold"/><div><b>أُرسل تنبيه مبكر</b><p>ارتفع مؤشر الخطر خلال آخر ساعة.</p></div><time>14:28</time></span><span><i className="green"/><div><b>موقع الهاتف محدّث</b><p>{patient.location}.</p></div><time>14:25</time></span></div></section></main><aside className="case-aside"><RiskScore score={patient.score} level={patient.level}/><section className="medical-profile-card card"><div className="panel-heading"><div><span className="eyebrow">الملف الطبي</span><h2>معلومات الطوارئ</h2></div><UserRoundCheck/></div><dl><div><dt>الحالات المزمنة</dt><dd>ضغط الدم، السكري</dd></div><div><dt>الحساسية</dt><dd className="warning-text">حساسية من البنسلين</dd></div><div><dt>الأدوية</dt><dd>ميتفورمين، أملوديبين</dd></div></dl></section><section className="assigned-team card"><span className="eyebrow">الفريق المعيّن</span><div><span>ط 7</span><div><b>الفريق الطبي 7</b><small>د. سالم + مسعفان</small></div></div><p><Clock3/>وقت الوصول المتوقع: 6 دقائق</p></section></aside></div></>;
}
