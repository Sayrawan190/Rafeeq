"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Filter,
  HeartPulse,
  ListFilter,
  MapPin,
  Search,
  ShieldAlert,
  Thermometer,
  UserRoundCheck,
  Wind,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRafeeq } from "@/components/app-provider";
import { medicalCases, type RiskLevel } from "@/lib/mock-data";
import { AISummary, MetricCard, MiniMap, RiskBadge, RiskScore, SectionTitle, Sparkline } from "@/components/ui";

const levelCounts = [
  { level: "critical" as RiskLevel, label: "حرجة", value: 3, note: "تحتاج استجابة فورية", icon: ShieldAlert },
  { level: "high" as RiskLevel, label: "مرتفعة", value: 8, note: "استجابة ذات أولوية", icon: AlertTriangle },
  { level: "medium" as RiskLevel, label: "متوسطة", value: 15, note: "قيد المتابعة", icon: Activity },
  { level: "normal" as RiskLevel, label: "مستقرة", value: 126, note: "مراقبة روتينية", icon: CheckCircle2 },
];

export function MedicalDashboard() {
  const { notify } = useRafeeq();
  return <><section className="dashboard-heading"><div><span className="eyebrow">الاثنين · 9 ذو الحجة</span><h1>نظرة عامة على الحالات</h1><p>الحالات مرتبة تلقائيًا حسب مستوى الخطورة ووقت التنبيه.</p></div><button className="outline-button" onClick={() => notify("تم تحديث قائمة الحالات الآن")}>تحديث البيانات</button></section><div className="overview-cards">{levelCounts.map(({ level, label, value, note, icon: Icon }) => <article className={`overview-card level-${level}`} key={level}><span><Icon/></span><div><small>{label}</small><b>{value}</b><p>{note}</p></div><em>{level === "critical" ? "+1" : level === "high" ? "+2" : "الآن"}</em></article>)}</div><div className="medical-dashboard-grid"><section className="case-list-section card"><div className="panel-heading"><div><span className="eyebrow">الأولوية الآن</span><h2>الحالات التي تحتاج استجابة</h2></div><Link href="/medical/cases">عرض كل الحالات <ChevronLeft/></Link></div><div className="case-list">{medicalCases.slice(0, 4).map((patient) => <PatientRow key={patient.id} patient={patient}/>)}</div></section><aside className="medical-side"><section className="response-stats card"><span className="eyebrow">أداء الاستجابة</span><h2>متوسط زمن الوصول</h2><div className="big-stat"><b>7:42</b><small>دقيقة</small><em>-18%</em></div><Sparkline values={[12, 11, 10, 11, 9.5, 9, 8.4, 8.1, 7.9, 7.7]} height={90}/><footer><span>الهدف: أقل من 10 دقائق</span><b>جيد</b></footer></section><section className="teams-card card"><div className="panel-heading"><div><span className="eyebrow">الفرق الميدانية</span><h2>حالة الفرق</h2></div></div><div><span><i className="green"/><b>متاحة</b><em>12</em></span><span><i className="orange"/><b>في مهمة</b><em>7</em></span><span><i className="gray"/><b>غير متاحة</b><em>2</em></span></div><button onClick={() => notify("تم فتح معاينة توزيع الفرق - عرض تجريبي")}>عرض توزيع الفرق</button></section></aside></div><section className="medical-map-section card"><div className="panel-heading"><div><span className="eyebrow">خريطة الحالات</span><h2>التوزيع الميداني المباشر</h2></div><span className="live-pill"><i/>LIVE</span></div><MiniMap active="arafah"/></section></>;
}

function PatientRow({ patient }: { patient: (typeof medicalCases)[number] }) {
  return <Link href={`/medical/cases/${patient.id}`} className="patient-row"><RiskBadge level={patient.level}/><div className="patient-name"><span>{patient.name.split(" ").slice(0,2).map((part) => part[0]).join("")}</span><div><b>{patient.name}</b><small>{patient.id} · {patient.age} سنة</small></div></div><span className="patient-location"><MapPin/>{patient.location}</span><span className="patient-vital"><HeartPulse/>{patient.heart}</span><span className="patient-vital"><Thermometer/>{patient.temp}°</span><div className="patient-reason"><b>{patient.reason}</b><small>{patient.status}</small></div><ChevronLeft/></Link>;
}

export function MedicalCasesPage() {
  const [filter, setFilter] = useState<"all" | RiskLevel>("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => medicalCases.filter((item) => (filter === "all" || item.level === filter) && (item.name.includes(query) || item.id.toLowerCase().includes(query.toLowerCase()) || item.location.includes(query))), [filter, query]);
  return <><section className="dashboard-heading"><div><span className="eyebrow">إدارة الحالات</span><h1>الحالات الطبية</h1><p>ابحث وصفِّ الحالات وافتح الملف الكامل دون التنقل بين شاشات متعددة.</p></div><span className="record-count">{filtered.length} حالات معروضة</span></section><section className="case-toolbar card"><label className="search-box"><Search/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالاسم أو رقم الحالة أو الموقع..."/></label><div className="filter-tabs"><ListFilter/>{[["all","الكل"],["critical","حرجة"],["high","مرتفعة"],["medium","متوسطة"],["normal","مستقرة"]].map(([value,label]) => <button key={value} onClick={() => setFilter(value as typeof filter)} className={filter === value ? "active" : ""}>{label}</button>)}</div><button className="filter-button"><Filter/>فلاتر إضافية</button></section><section className="cases-table card"><header><span>الأولوية</span><span>الحاج</span><span>الموقع</span><span>المؤشرات</span><span>Risk Score</span><span>سبب التنبيه</span><span>الحالة</span><span/></header>{filtered.map((patient) => <Link href={`/medical/cases/${patient.id}`} className="case-table-row" key={patient.id}><span><RiskBadge level={patient.level}/></span><span className="patient-name"><i>{patient.name.slice(0,1)}</i><div className="patient-details"><b>{patient.name}</b><small>{patient.id} · {patient.age} سنة</small></div></span><span><MapPin/>{patient.location}</span><span className="vitals-compact"><b><HeartPulse/>{patient.heart}</b><b><Thermometer/>{patient.temp}°</b><b><Wind/>{patient.spo2}%</b></span><span className={`score-text ${patient.level}`}>{patient.score.toFixed(2)}</span><span>{patient.reason}</span><span>{patient.status}</span><span><ChevronLeft/></span></Link>)}{filtered.length === 0 && <div className="no-results"><Search/><b>لا توجد حالات مطابقة</b><p>جرّب تغيير عبارة البحث أو مستوى الخطورة.</p></div>}</section></>;
}

export function PatientCasePage({ id }: { id: string }) {
  const { notify } = useRafeeq();
  const patient = medicalCases.find((item) => item.id === id) ?? medicalCases[0];
  const statuses = ["جديدة", "تم التعيين", "الفريق في الطريق", "قيد العلاج", "مغلقة"];
  const initialIndex = Math.max(0, statuses.indexOf(patient.status));
  const [statusIndex, setStatusIndex] = useState(initialIndex);
  const metrics = [
    { key: "heart", label: "معدل النبض", value: String(patient.heart), unit: "نبضة/د", status: "مرتفع", color: "green" },
    { key: "temp", label: "درجة الحرارة", value: String(patient.temp), unit: "°م", status: "مرتفعة", color: "gold" },
    { key: "oxygen", label: "تشبع الأكسجين", value: String(patient.spo2), unit: "%", status: patient.spo2 < 94 ? "منخفض" : "مراقبة", color: "teal" },
  ];
  function advance() { if (statusIndex < statuses.length - 1) { setStatusIndex(statusIndex + 1); notify(`تم تحديث الحالة إلى: ${statuses[statusIndex + 1]}`); } }
  return <><div className="case-back"><Link href="/medical/cases"><ArrowLeft/>العودة إلى الحالات</Link><span>آخر تحديث قبل 40 ثانية</span></div><section className="case-hero card"><div className="case-person"><span>{patient.name.slice(0,1)}</span><div><div><RiskBadge level={patient.level}/><em>{patient.id}</em></div><h1>{patient.name}</h1><p>{patient.age} سنة · فصيلة الدم O+ · <MapPin/>{patient.location}</p></div></div><div className="case-action"><span><small>حالة الاستجابة</small><b>{statuses[statusIndex]}</b></span><button onClick={advance} disabled={statusIndex === statuses.length - 1}>{statusIndex === statuses.length - 1 ? "أُغلقت الحالة" : "تحديث للمرحلة التالية"}<ChevronLeft/></button></div></section><div className="response-timeline card">{statuses.map((status, index) => <span key={status} className={index < statusIndex ? "done" : index === statusIndex ? "active" : ""}><i>{index < statusIndex ? <CheckCircle2/> : index + 1}</i><b>{status}</b></span>)}</div><div className="case-detail-grid"><main><div className="case-metrics">{metrics.map((metric) => <MetricCard key={metric.key} metric={metric}/>)}</div><section className="vital-chart-panel card"><div className="panel-heading"><div><span className="eyebrow">آخر 60 دقيقة</span><h2>اتجاه المؤشرات الحيوية</h2></div><div className="chart-legend"><span><i className="heart"/>النبض</span><span><i className="temp"/>الحرارة</span></div></div><div className="dual-charts"><div><span>142<small>نبضة/د</small></span><Sparkline values={[86, 90, 94, 98, 105, 112, 121, 128, 136, 142]} height={150}/></div><div className="temp-chart"><span>39.2<small>°م</small></span><Sparkline values={[37.1,37.2,37.3,37.5,37.7,38,38.2,38.6,39,39.2]} color="#c8872e" height={150}/></div></div></section><AISummary/><section className="case-history card"><SectionTitle eyebrow="الخط الزمني" title="أحداث الحالة"/><div><span><i className="red"/><div><b>رُصد خطر مرتفع</b><p>تجاوزت المؤشرات عتبة التنبيه التجريبية.</p></div><time>14:32</time></span><span><i className="gold"/><div><b>أُرسل تنبيه مبكر</b><p>ارتفع Risk Score من 0.71 إلى 0.92.</p></div><time>14:28</time></span><span><i className="green"/><div><b>موقع الهاتف محدّث</b><p>عرفات · القطاع A-14 · دقة 12م.</p></div><time>14:25</time></span></div></section></main><aside className="case-aside"><RiskScore score={patient.score} level={patient.level}/><section className="medical-profile-card card"><div className="panel-heading"><div><span className="eyebrow">الملف الطبي</span><h2>معلومات الطوارئ</h2></div><UserRoundCheck/></div><dl><div><dt>الحالات المزمنة</dt><dd>ضغط الدم، السكري</dd></div><div><dt>الحساسية</dt><dd className="warning-text">حساسية من البنسلين</dd></div><div><dt>الأدوية</dt><dd>ميتفورمين، أملوديبين</dd></div><div><dt>جهة الطوارئ</dt><dd>محمد الغامدي · قريب</dd></div></dl><button onClick={() => notify("تم فتح سجل طبي تجريبي كامل")}>عرض الملف الكامل</button></section><section className="assigned-team card"><span className="eyebrow">الفريق المعيّن</span><div><span>ط 7</span><div><b>الفريق الطبي 7</b><small>د. سالم + مسعفان</small></div></div><p><Clock3/>وقت الوصول المتوقع: 6 دقائق</p><button onClick={() => notify("تم إرسال تحديث إلى الفريق الطبي 7")}>إرسال تحديث للفريق</button></section></aside></div></>;
}
