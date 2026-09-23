"use client";

import Link from "next/link";
import {
  Activity, AlertTriangle, ArrowLeft, BellRing, CheckCircle2, ChevronLeft,
  CircleHelp, Clock3, Droplets, Route, Send, ShieldCheck, Snowflake,
  Stethoscope, ThermometerSun, TrendingDown, TrendingUp, UsersRound, X,
} from "lucide-react";
import { useState } from "react";
import { useRafeeq } from "@/components/app-provider";
import { operationalActions, regions } from "@/lib/mock-data";
import { RiskBadge, RiskScore, SectionTitle, Sparkline } from "@/components/ui";

const operationalEvents = [
  { text: "تم رفع تنبيه من عرفات", meta: "القطاع A-14 · الآن", state: "جديد", tone: "new" },
  { text: "تتم مراجعة تغير مؤشرات قطاع منى", meta: "القطاع C-08 · منذ دقيقة", state: "قيد المراجعة", tone: "review" },
  { text: "تم تعيين فريق للحالة RFQ-9812", meta: "الفريق الطبي 7 · منذ دقيقتين", state: "تم التوجيه", tone: "directed" },
  { text: "تم خفض مستوى الخطر في مزدلفة", meta: "من 0.38 إلى 0.31 · منذ 6 دقائق", state: "قيد التنفيذ", tone: "progress" },
  { text: "تم إغلاق 3 حالات بعد المعالجة", meta: "منى · منذ 11 دقيقة", state: "مغلق", tone: "closed" },
];

export function OperationsDashboard() {
  const { notify } = useRafeeq();
  const [selectedId, setSelectedId] = useState("arafah");
  const [action, setAction] = useState("");
  const selected = regions.find((region) => region.id === selectedId)!;

  return <>
    <section className="dashboard-heading"><div><span className="eyebrow">المشاعر المقدسة · عرض توضيحي</span><h1>الصورة الصحية التشغيلية</h1><p>مؤشرات مجمعة ومحاكاة لدعم التنسيق واتخاذ القرار.</p></div><div className="time-selector"><button className="active">الآن</button><button onClick={() => notify("تم عرض ملخص آخر 6 ساعات")}>6 ساعات</button><button onClick={() => notify("تم عرض ملخص آخر 24 ساعة")}>24 ساعة</button></div></section>
    <div className="operations-kpis"><article><span><UsersRound/></span><div><small>الحجاج المرصودون</small><b>1.34<em>مليون</em></b><p><TrendingUp/>+8% خلال ساعة</p></div></article><article><span><Stethoscope/></span><div><small>الحالات الطبية النشطة</small><b>83</b><p>6 حالات حرجة</p></div></article><article><span><BellRing/></span><div><small>التنبيهات النشطة</small><b>43</b><p><TrendingDown/>-4 منذ آخر تحديث</p></div></article><article><span><Activity/></span><div><small>مؤشر الخطر العام</small><b>0.62</b><p className="caution"><TrendingUp/>تحت المراقبة</p></div></article></div>
    <div className="operations-main-grid">
      <section className="operations-map card"><div className="panel-heading"><div><span className="eyebrow">خريطة توضيحية</span><h2>قطاعات المشاعر وإشاراتها التشغيلية</h2></div><div className="map-legend"><span><i className="normal"/>منخفض</span><span><i className="medium"/>متوسط</span><span><i className="high"/>مرتفع</span></div></div><OperationsSchematicMap active={selectedId} onSelect={setSelectedId}/></section>
      <aside className="region-live-panel card"><div className="region-live-head"><div><span className="eyebrow">المنطقة المحددة</span><h2>{selected.name}</h2><p>{selected.sector} · بيانات محاكاة</p></div><RiskBadge level={selected.level}/></div><RiskScore score={selected.score} level={selected.level}/><RiskScoreHelp compact/><div className="region-live-stats"><span><small>عدد الحجاج</small><b>{selected.population}</b></span><span><small>حالات نشطة</small><b>{selected.active}</b></span><span><small>حالات حرجة</small><b>{selected.critical}</b></span><span><small>تنبيهات</small><b>{selected.alerts}</b></span></div><div className="population-alert"><AlertTriangle/><div><b>تنبيه صحي جماعي</b><p>{selected.note}.</p><span><Clock3/>آخر 30 دقيقة · بيانات مجمعة</span></div></div><Link href={`/operations/regions/${selected.id}`} className="primary-button">فتح تفاصيل المنطقة <ChevronLeft/></Link></aside>
    </div>
    <div className="operations-bottom-grid">
      <section className="regional-status card"><SectionTitle eyebrow="الذكاء التشغيلي" title="حالة القطاعات" action={<Link href="/operations/regions">كل المناطق <ChevronLeft/></Link>}/><div>{regions.slice(0,3).map((region) => <button key={region.id} onClick={() => setSelectedId(region.id)}><span className={`region-letter ${region.level}`}>{region.name.slice(0,1)}</span><div><b>{region.name} · {region.sector}</b><p>{region.note}</p></div><RiskBadge level={region.level}/><em className={region.trend.startsWith("-") ? "down" : "up"}>{region.trend}</em></button>)}</div></section>
      <section className="actions-panel card"><SectionTitle eyebrow="إجراءات فورية" title="إجراء تشغيلي"/><div>{operationalActions.slice(0,4).map((item, index) => <button key={item} onClick={() => setAction(item)}><span>{index === 0 ? <Droplets/> : index === 1 ? <Snowflake/> : index === 2 ? <Stethoscope/> : <Route/>}</span>{item}<ChevronLeft/></button>)}</div></section>
    </div>
    <ActivityFeed/>
    <ActionModal action={action} region={selected.name} onClose={() => setAction("")} onConfirm={() => { notify(`تم تسجيل إجراء «${action}» في ${selected.name}`); setAction(""); }}/>
  </>;
}

function OperationsSchematicMap({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return <div className="sector-map" role="img" aria-label="مخطط توضيحي لقطاعات المشاعر المقدسة"><svg className="sector-connections" viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true"><path className="sector-connection" d="M 793 154 C 730 176, 654 205, 587 238"/><path className="sector-connection" d="M 533 238 C 490 208, 454 177, 420 152"/><path className="sector-connection" d="M 335 160 C 288 195, 246 227, 205 258"/></svg>{regions.map((region, index) => <button key={region.id} className={`sector-block sector-${index + 1} level-${region.level} ${active === region.id ? "active" : ""}`} onClick={() => onSelect(region.id)}><span className="sector-signal"><i/><em>{region.score.toFixed(2)}</em></span><b>{region.name}</b><small>القطاع {region.sector}</small><span className="sector-metrics"><em>{region.active} حالة</em><em>{region.crowd} الكثافة</em></span></button>)}<span className="sector-map-note"><ShieldCheck/>مخطط تشغيلي غير ملاحي · بيانات تجريبية</span></div>;
}

function RiskScoreHelp({ compact = false }: { compact?: boolean }) {
  return <details className={`risk-help ${compact ? "compact" : ""}`}><summary><CircleHelp/>كيف يُحسب مؤشر الخطر؟</summary><p>قيمة تجريبية مركبة مبنية على عدد الحالات النشطة، وشدتها، وكثافة الحشود، وعدد التنبيهات خلال الفترة الحالية.</p><div><span><i className="normal"/>منخفض 0.00–0.39</span><span><i className="medium"/>متوسط 0.40–0.69</span><span><i className="high"/>مرتفع 0.70–1.00</span></div></details>;
}

function ActivityFeed() {
  return <section className="activity-feed card"><SectionTitle eyebrow="سجل الحركة" title="آخر التنبيهات والإجراءات"/><div>{operationalEvents.map((event) => <article key={event.text}><i className={event.tone}/><div><b>{event.text}</b><small>{event.meta}</small></div><span className={`alert-state ${event.tone}`}>{event.state}</span></article>)}</div></section>;
}

export function RegionsPage() {
  const { notify } = useRafeeq();
  return <>
    <section className="dashboard-heading"><div><span className="eyebrow">المشاعر المقدسة</span><h1>مقارنة المناطق</h1><p>مؤشرات صحية مجمعة بلا بيانات تعريف شخصية.</p></div><button className="outline-button" onClick={() => notify("تم تصدير ملخص تجريبي للمناطق")}>تصدير الملخص</button></section>
    <RiskScoreHelp/>
    <section className="region-comparison card"><header><span>المنطقة</span><span>السكان المرصودون</span><span>الحالات النشطة</span><span>الحرجة</span><span>التنبيهات</span><span>مؤشر الخطر</span><span>الاتجاه</span><span/></header>{regions.map((region) => <Link href={`/operations/regions/${region.id}`} key={region.id}><span className="region-name"><i className={region.level}>{region.name.slice(0,1)}</i><span><b>{region.name}</b><small>القطاع {region.sector}</small></span></span><span>{region.population}</span><span>{region.active}</span><span>{region.critical}</span><span>{region.alerts}</span><span><RiskBadge level={region.level} label={region.score.toFixed(2)}/></span><span className={region.trend.startsWith("-") ? "trend-down" : "trend-up"}>{region.trend.startsWith("-") ? <TrendingDown/> : <TrendingUp/>}{region.trend}</span><span><ChevronLeft/></span></Link>)}</section>
    <div className="region-cards-mobile">{regions.map((region) => <Link href={`/operations/regions/${region.id}`} className="card" key={region.id}><div><span className={`region-letter ${region.level}`}>{region.name.slice(0,1)}</span><div><h2>{region.name}</h2><p>{region.sector}</p></div><RiskBadge level={region.level}/></div><div><span><small>السكان</small><b>{region.population}</b></span><span><small>الحالات</small><b>{region.active}</b></span><span><small>مؤشر الخطر</small><b>{region.score.toFixed(2)}</b></span></div><p>{region.note}</p></Link>)}</div>
    <section className="privacy-note card"><ShieldCheck/><div><b>خصوصية على مستوى العمليات</b><p>تعرض هذه الواجهة بيانات إحصائية مجمعة ومجهولة الهوية. لا تظهر الملفات الطبية الفردية أو مسارات الأشخاص.</p></div></section>
  </>;
}

export function RegionDetailPage({ id }: { id: string }) {
  const { notify } = useRafeeq();
  const region = regions.find((item) => item.id === id) ?? regions[0];
  const [action, setAction] = useState("");
  const trendValues = region.level === "high" ? [42,44,47,49,52,55,59,64,71,78] : [35,36,34,38,37,40,42,44,48,51];
  return <>
    <div className="case-back"><Link href="/operations/regions"><ArrowLeft/>العودة إلى المناطق</Link><span>بيانات مجمعة · محاكاة</span></div>
    <section className="region-detail-hero card"><div><span className="region-detail-letter">{region.name.slice(0,1)}</span><div><div><RiskBadge level={region.level}/><em>القطاع {region.sector}</em></div><h1>{region.name}</h1><p>{region.note}</p></div></div><RiskScore score={region.score} level={region.level}/></section>
    <div className="region-detail-kpis"><article><UsersRound/><span><small>الحجاج المرصودون</small><b>{region.population}</b></span></article><article><Stethoscope/><span><small>الحالات النشطة</small><b>{region.active}</b></span></article><article><AlertTriangle/><span><small>الحرجة</small><b>{region.critical}</b></span></article><article><BellRing/><span><small>التنبيهات</small><b>{region.alerts}</b></span></article></div>
    <div className="region-detail-grid"><main><section className="heatmap-panel card"><div className="panel-heading"><div><span className="eyebrow">مخطط القطاعات</span><h2>توزيع الإشارات التشغيلية</h2></div><div className="map-legend"><span><i className="normal"/>منخفض</span><span><i className="medium"/>متوسط</span><span><i className="high"/>مرتفع</span></div></div><OperationsSchematicMap active={region.id} onSelect={() => undefined}/></section><section className="population-trend card"><div className="panel-heading"><div><span className="eyebrow">آخر 60 دقيقة</span><h2>اتجاه مؤشر الخطر السكاني</h2></div><span className="trend-summary"><TrendingUp/>+{Math.round(region.score * 16)}%</span></div><div className="trend-value"><b>{region.score.toFixed(2)}</b><small>Population Risk Score</small></div><Sparkline values={trendValues} height={180} color={region.level === "high" ? "#c05b42" : "#c8872e"}/><RiskScoreHelp compact/></section><section className="aggregated-insights card"><SectionTitle eyebrow="تحليل مجمع" title="المؤشرات المؤثرة"/><div><span><ThermometerSun/><div><b>الإجهاد الحراري</b><p>أعلى مساهم في تغير المؤشر خلال آخر 30 دقيقة.</p></div><em>+38%</em></span><span><UsersRound/><div><b>كثافة الحشود</b><p>تزايد تدريجي قرب المسار الشرقي.</p></div><em>+14%</em></span><span><Activity/><div><b>انخفاض النشاط</b><p>نمط متزامن في بعض القطاعات الفرعية.</p></div><em>+9%</em></span></div></section></main><aside><section className="actions-panel card sticky-actions"><SectionTitle eyebrow="الاستجابة" title="إجراءات مقترحة"/><p>اقتراحات محاكاة مبنية على المؤشرات الحالية.</p><div>{operationalActions.slice(0,5).map((item, index) => <button key={item} onClick={() => setAction(item)}><span>{index === 0 ? <Droplets/> : index === 1 ? <Snowflake/> : index === 2 ? <Stethoscope/> : index === 4 ? <Route/> : <Send/>}</span>{item}<ChevronLeft/></button>)}</div></section><section className="decision-note card"><ShieldCheck/><div><b>دعم قرار غير سريري</b><p>النتائج تجريبية لتوضيح تجربة الاستخدام، ولا تمثل نموذجًا متحققًا سريريًا.</p></div></section></aside></div>
    <ActionModal action={action} region={region.name} onClose={() => setAction("")} onConfirm={() => { notify(`تم اعتماد «${action}» للقطاع ${region.sector}`); setAction(""); }}/>
  </>;
}

function ActionModal({ action, region, onClose, onConfirm }: { action: string; region: string; onClose: () => void; onConfirm: () => void }) {
  if (!action) return null;
  return <div className="modal-backdrop"><div className="action-modal card"><button className="modal-close" onClick={onClose}><X/></button><span><CheckCircle2/></span><h2>تأكيد الإجراء التشغيلي</h2><p>سيتم تسجيل الإجراء التالي في سجل غرفة العمليات:</p><div><b>{action}</b><small>المنطقة: {region}</small></div><footer><button className="text-button" onClick={onClose}>إلغاء</button><button className="primary-button" onClick={onConfirm}>تأكيد وتسجيل الإجراء</button></footer></div></div>;
}
