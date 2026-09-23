"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  Bluetooth,
  Bot,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Droplets,
  Footprints,
  HeartPulse,
  History,
  Info,
  LocateFixed,
  LockKeyhole,
  MapPin,
  Mic,
  MoonStar,
  Navigation,
  Nfc,
  Pause,
  PhoneCall,
  Pill,
  Radio,
  RefreshCw,
  Route,
  Send,
  ShieldCheck,
  Siren,
  Stethoscope,
  UserRoundCheck,
  Volume2,
  Watch,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRafeeq } from "@/components/app-provider";
import { SOSFloatingButton } from "@/components/shells";
import {
  bracelet,
  currentVitals,
  healthAlerts,
  journeyStages,
  pilgrim,
  suggestedPrompts,
  vitalSeries,
} from "@/lib/mock-data";
import { MetricCard, MiniMap, RiskBadge, RiskScore, SectionTitle, Sparkline, StatusDot } from "@/components/ui";

export function PilgrimHome() {
  const { senior, tr, notify } = useRafeeq();
  const [sosOpen, setSosOpen] = useState(false);

  if (senior) return <><SeniorHome onSOS={() => setSosOpen(true)} /><SOSModal open={sosOpen} onClose={() => setSosOpen(false)} /></>;

  return (
    <>
      <section className="page-heading"><div><span className="eyebrow">{tr("الاثنين، 9 ذو الحجة", "Monday, 9 Dhu al-Hijjah")}</span><h1>{tr("مساء الخير، عبدالله", "Good evening, Abdullah")}</h1><p>{tr("كل شيء مستقر. موعد تحرك مجموعتك بعد ساعتين.", "Everything is stable. Your group departs in two hours.")}</p></div><StatusDot>{tr("السوار متصل", "Bracelet connected")}</StatusDot></section>

      <div className="pilgrim-home-grid">
        <section className="health-hero card">
          <div className="health-hero-top"><span className="health-pulse"><HeartPulse/></span><div><small>{tr("حالتك الصحية الآن", "Your health now")}</small><h2>{tr("مستقرة ومطمئنة", "Stable and reassuring")}</h2><p>{tr("آخر تحديث قبل دقيقة واحدة", "Updated one minute ago")}</p></div><span className="stable-mark"><CheckCircle2/>طبيعي</span></div>
          <div className="metrics-row compact">{currentVitals.slice(0, 3).map((metric) => <MetricCard key={metric.key} metric={metric} />)}</div>
          <div className="health-hero-foot"><span><ShieldCheck size={17}/>{tr("لم يتم رصد مؤشرات خطر حاليًا", "No current risk indicators detected")}</span><Link href="/app/health">{tr("عرض التفاصيل", "View details")}<ChevronLeft size={17}/></Link></div>
        </section>

        <section className="journey-next card">
          <div className="card-label"><span><Route size={18}/>{tr("رحلتي اليوم", "Today's journey")}</span><small>2 / 4</small></div>
          <div className="stage-now"><span className="stage-icon"><MoonStar/></span><div><small>{tr("أنت الآن في", "You are now in")}</small><h2>{tr("عرفة", "Arafah")}</h2><p>{tr("الوقوف بعرفة حتى غروب الشمس", "Remain in Arafah until sunset")}</p></div></div>
          <div className="next-route"><div className="route-dots"><i className="done"/><span/><i/></div><div><small>{tr("الوجهة التالية", "Next destination")}</small><b>{tr("مزدلفة", "Muzdalifah")}</b><span><Clock3/>7:15 م · بعد المغرب</span></div></div>
          <Link href="/app/location" className="primary-button"><Navigation size={18}/>{tr("عرض الاتجاهات", "View directions")}</Link>
        </section>

        <section className="quick-actions card">
          <SectionTitle eyebrow={tr("وصول سريع", "Quick access")} title={tr("كيف أساعدك؟", "How can I help?")} />
          <div className="quick-grid"><Link href="/app/assistant"><span className="quick-icon green"><Bot/></span><b>{tr("اسأل رفيق", "Ask Rafeeq")}</b><small>{tr("إجابة مرتبطة برحلتك", "Journey-aware help")}</small><ChevronLeft/></Link><Link href="/app/location"><span className="quick-icon gold"><LocateFixed/></span><b>{tr("موقعي", "My location")}</b><small>{tr("الاتجاه والازدحام", "Directions and crowds")}</small><ChevronLeft/></Link><Link href="/app/bracelet"><span className="quick-icon mint"><Watch/></span><b>{tr("السوار", "Bracelet")}</b><small>{tr("البطارية والحساسات", "Battery and sensors")}</small><ChevronLeft/></Link><Link href="/app/profile"><span className="quick-icon green"><UserRoundCheck/></span><b>{tr("الملف الطبي", "Medical profile")}</b><small>{tr("معلومات الطوارئ", "Emergency information")}</small><ChevronLeft/></Link><button onClick={() => setSosOpen(true)} className="sos-quick"><span className="quick-icon red"><Siren/></span><b>{tr("طلب مساعدة", "Request help")}</b><small>{tr("شارك موقعك وبياناتك", "Share location and vitals")}</small><ChevronLeft/></button></div>
        </section>

        <section className="alert-card card">
          <div className="alert-icon"><Droplets/></div><div><span>{tr("تذكير صحي", "Health reminder")}</span><b>{tr("اشرب الماء وخذ راحة قصيرة", "Hydrate and take a short break")}</b><p>{tr("درجة الحرارة الخارجية 38°م. ننصح بالراحة في مكان مظلل لمدة 10 دقائق.", "It is 38°C outside. Rest in shade for ten minutes.")}</p></div><button onClick={() => notify(tr("تم تسجيل شرب الماء، أحسنت!", "Hydration logged. Well done!"))}>{tr("تم", "Done")}<Check/></button>
        </section>
      </div>
      <SOSFloatingButton onClick={() => setSosOpen(true)} />
      <SOSModal open={sosOpen} onClose={() => setSosOpen(false)} />
    </>
  );
}

function SeniorHome({ onSOS }: { onSOS: () => void }) {
  const { tr, notify } = useRafeeq();
  return <><section className="senior-welcome"><span><CheckCircle2/></span><div><small>{tr("حالتك الآن", "Your status")}</small><h1>{tr("أنت بخير", "You are well")}</h1><p>{tr("السوار متصل ولا توجد تنبيهات", "Bracelet connected, no alerts")}</p></div><button onClick={() => notify(tr("تمت قراءة الحالة: أنت بخير، ولا توجد تنبيهات.", "Status read aloud: you are well, with no alerts."))}><Volume2/>اقرأ لي</button></section><div className="senior-grid"><Link href="/app/journey"><Route/><span><b>{tr("رحلتي", "My journey")}</b><small>{tr("أنت في عرفة", "You are in Arafah")}</small></span><ChevronLeft/></Link><Link href="/app/health"><HeartPulse/><span><b>{tr("صحتي", "My health")}</b><small>{tr("الحالة مستقرة", "Status is stable")}</small></span><ChevronLeft/></Link><Link href="/app/location"><Navigation/><span><b>{tr("وجهتي", "My destination")}</b><small>{tr("مزدلفة بعد المغرب", "Muzdalifah after sunset")}</small></span><ChevronLeft/></Link><button className="senior-help" onClick={onSOS}><Siren/><span><b>{tr("مساعدة", "Help")}</b><small>{tr("اطلب المساعدة الآن", "Request help now")}</small></span><ChevronLeft/></button></div><section className="senior-reminder"><Droplets/><div><b>{tr("تذكر أن تشرب الماء", "Remember to drink water")}</b><p>{tr("استرح في الظل لمدة 10 دقائق", "Rest in shade for ten minutes")}</p></div><button onClick={() => notify("تم تسجيل شرب الماء")}>تم</button></section></>;
}

export function HealthPage() {
  const { tr } = useRafeeq();
  const [range, setRange] = useState("6h");
  const selected = range === "1h" ? vitalSeries.heart.slice(-5) : range === "24h" ? [...vitalSeries.heart, 76, 74, 78, 80] : vitalSeries.heart;
  return <><section className="page-heading"><div><span className="eyebrow">{tr("صحتي", "My health")}</span><h1>{tr("لوحة الصحة الشخصية", "Personal health dashboard")}</h1><p>{tr("قراءاتك الحالية واتجاهاتها الأخيرة من السوار الذكي.", "Your current readings and recent bracelet trends.")}</p></div><RiskBadge level="normal" label={tr("الحالة مستقرة", "Stable")} /></section><section className="health-overview card"><div><span className="health-pulse large"><HeartPulse/></span><div><small>{tr("حالتي الآن", "Status now")}</small><h2>{tr("المؤشرات ضمن النطاق الطبيعي", "Readings within normal range")}</h2><p>{tr("آخر مزامنة قبل دقيقة · جودة الإشارة ممتازة", "Synced a minute ago · Excellent signal")}</p></div></div><RiskScore score={0.18} level="normal"/></section><div className="reading-meta"><span><Clock3/>آخر قراءة: الآن</span><span><Watch/>المصدر: السوار الذكي</span><span><Info/>بيانات تجريبية</span><Link href="/app/profile">الملف الطبي <ChevronLeft/></Link></div><SectionTitle eyebrow={tr("الآن", "Now")} title={tr("المؤشرات الحيوية", "Vital signs")}/><div className="metrics-row health-metrics">{currentVitals.map((metric) => <MetricCard key={metric.key} metric={metric} chart={vitalSeries[metric.key as keyof typeof vitalSeries]}/>)}</div><section className="chart-card card"><div className="chart-header"><div><span className="eyebrow">{tr("آخر الساعات", "Recent hours")}</span><h2>{tr("اتجاه معدل النبض", "Heart rate trend")}</h2></div><div className="segmented">{[["1h","الآن"],["6h","6 ساعات"],["24h","24 ساعة"]].map(([value,label]) => <button key={value} className={range === value ? "active" : ""} onClick={() => setRange(value)}>{label}</button>)}</div></div><div className="chart-value"><b>78</b><span>نبضة/د</span><em>ضمن المعدل المعتاد</em></div><Sparkline values={selected} height={180}/><div className="chart-axis"><span>الآن</span><span>قبل ساعتين</span><span>قبل 4 ساعات</span><span>قبل 6 ساعات</span></div></section><SectionTitle eyebrow={tr("السجل", "History")} title={tr("التنبيهات السابقة", "Previous alerts")}/><div className="alerts-list">{healthAlerts.map((alert) => <article className="card" key={alert.id}><span className={`alert-level ${alert.level}`}><History/></span><div><b>{alert.title}</b><p>{alert.detail}</p></div><time>{alert.time}</time><RiskBadge level={alert.level}/></article>)}</div></>;
}

export function JourneyPage() {
  const { notify, tr } = useRafeeq();
  const [selected, setSelected] = useState("arafah");
  const stage = journeyStages.find((item) => item.id === selected)!;
  return <><section className="page-heading"><div><span className="eyebrow">{tr("رحلتي", "My journey")}</span><h1>{tr("مرافقك خطوة بخطوة", "Your step-by-step companion")}</h1><p>{tr("المناسك، المواعيد، الاتجاهات والإرشادات في مكان واحد.", "Rituals, times, directions and guidance in one place.")}</p></div><span className="date-chip"><MoonStar/>9 ذو الحجة 1448</span></section><div className="journey-layout"><section className="timeline-card card"><div className="timeline-progress"><span style={{ height: "32%" }}/></div>{journeyStages.map((item, index) => <button key={item.id} className={`timeline-item ${item.state} ${selected === item.id ? "selected" : ""}`} onClick={() => setSelected(item.id)}><span className="timeline-node">{item.state === "done" ? <Check/> : index + 1}</span><div><span>{item.subtitle}</span><h3>{item.title}</h3><p>{item.note}</p><time><Clock3/>{item.time}</time></div><ChevronLeft/></button>)}</section><aside className="journey-detail"><section className="stage-detail card"><span className="stage-detail-icon"><MoonStar/></span><span className="eyebrow">تفاصيل المرحلة الحالية</span><h2>{stage.title}</h2><p>{stage.note}. اتبع تعليمات قائد المجموعة، وتحقق من حالة الازدحام قبل التحرك.</p><div className="stage-detail-meta"><span><Clock3/><b>الموعد</b><small>{stage.time}</small></span><span><MapPin/><b>الموقع</b><small>{stage.title} · القطاع B-12</small></span></div>{stage.id === "arafah" || stage.id === "muzdalifah" ? <Link className="primary-button" href="/app/location"><Navigation/>عرض الاتجاهات</Link> : <button className="primary-button" onClick={() => notify("تم حفظ إرشادات المرحلة للرجوع إليها")}>حفظ الإرشادات</button>}</section><section className="journey-map-card card"><div className="card-label"><span><Route/>مخطط رحلة الحج</span><small>خريطة توضيحية</small></div><Image className="journey-map-image" src="/images/hajj-journey-map.png" alt="مخطط توضيحي لمسار الحاج بين المسجد الحرام ومنى ومزدلفة وعرفات" width={1122} height={1400} priority/><p className="journey-map-caption">خريطة توضيحية لرحلة العرض الحالية بين المشاعر.</p></section><section className="dua-card card"><div><span><MoonStar/></span><b>دعاء هذه المرحلة</b></div><p>«لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير»</p><footer><ShieldCheck/>محتوى من مصدر موثوق ومعتمد <button onClick={() => notify("بدء القراءة الصوتية للدعاء")}><Volume2/>استماع</button></footer></section></aside></div></>;
}

export function LocationPage() {
  const { notify, tr } = useRafeeq();
  const [routeStarted, setRouteStarted] = useState(false);
  return <><section className="page-heading"><div><span className="eyebrow">{tr("الموقع والاتجاهات", "Location and directions")}</span><h1>{tr("طريقك إلى مزدلفة", "Your route to Muzdalifah")}</h1><p>{tr("موقع محاكى من GPS الهاتف، وليس من السوار.", "Simulated phone GPS location, not bracelet GPS.")}</p></div><StatusDot>GPS الهاتف متصل</StatusDot></section><div className="location-layout"><section className="map-card card"><MiniMap/><div className="map-controls"><button onClick={() => notify("تم توسيط الخريطة على موقعك الحالي")}><LocateFixed/>موقعي</button><button onClick={() => notify("تم تحديث حالة الازدحام قبل لحظات")}><RefreshCw/>تحديث</button></div>{routeStarted && <div className="navigation-live"><Navigation/><div><b>تابع المسار المحدد</b><small>المسافة التقريبية 8.4 كم</small></div><button onClick={() => setRouteStarted(false)}><Pause/>إيقاف</button></div>}</section><aside className="route-panel"><section className="route-card card"><div className="route-point from"><i/><div><small>موقعك الحالي</small><b>عرفات · القطاع B-12</b><span>آخر تحديث قبل دقيقة</span></div></div><span className="route-connector"/><div className="route-point to"><i/><div><small>وجهتك التالية</small><b>مزدلفة · المدخل M-03</b><span>المسار المخصص للمجموعة 12</span></div></div><div className="route-stats"><span><Clock3/><b>24 دقيقة</b><small>وقت تقريبي</small></span><span><Footprints/><b>8.4 كم</b><small>بالحافلة والمشي</small></span></div><button className="primary-button" onClick={() => { setRouteStarted(true); notify("بدأت المحاكاة الإرشادية إلى مزدلفة"); }}><Navigation/>بدء الاتجاهات</button></section><section className="destination-health card"><div className="card-label"><span><Activity/>حالة الوجهة</span><RiskBadge level="normal" label="مطمئنة"/></div><div className="destination-stats"><span><b>منخفض</b><small>الازدحام الآن</small></span><span><b>0.31</b><small>مؤشر الخطر</small></span><span><b>31°</b><small>الحرارة المتوقعة</small></span></div><p><Info/>أفضل وقت للحركة خلال 25 دقيقة وفق حالة المسار ومجموعتك.</p></section></aside></div></>;
}

export function AssistantPage() {
  const { notify } = useRafeeq();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: "مرحبًا عبدالله، أنا رفيق. أعرف أنك الآن في عرفة، وحالتك الصحية مستقرة، ووجهتك التالية مزدلفة. كيف أساعدك؟", time: "الآن" }]);
  const [listening, setListening] = useState(false);

  function answer(question: string) {
    if (!question.trim()) return;
    setMessages((current) => [...current, { from: "user", text: question, time: "الآن" }]);
    setInput("");
    window.setTimeout(() => {
      const isFatwa = /فتوى|حكم|يجوز/.test(question);
      const isHealth = /صح|نبض|حرار/.test(question);
      const isDua = /دعاء|أدعية|أذكار/.test(question);
      const response = isFatwa
        ? "هذه المسألة تحتاج سؤال مختص. أستطيع توصيلك بقناة دينية رسمية معتمدة، وبيانات الاتصال المعروضة هنا تجريبية."
        : isHealth
          ? "حالتك الآن مستقرة: النبض 78، الأكسجين 98%، والحرارة 36.7°م. هذه قراءة توعوية وليست تشخيصًا طبيًا."
          : isDua
            ? "من أفضل ما يقال يوم عرفة: لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير. المحتوى من مكتبة رفيق الموثوقة."
            : "أنت الآن في عرفة، والمرحلة التالية هي التوجه إلى مزدلفة بعد المغرب مع مجموعتك. أفضل وقت متوقع للتحرك خلال 25 دقيقة، وأقدر أعرض لك الاتجاهات.";
      setMessages((current) => [...current, { from: "bot", text: response, time: "الآن" }]);
    }, 650);
  }

  function submit(event: FormEvent) { event.preventDefault(); answer(input); }

  return <div className="assistant-layout assistant-chat-only"><section className="chat-panel card"><header className="chat-header"><span className="bot-avatar"><Bot/></span><div><h1>اسأل رفيق</h1><span><i/>مساعدك السياقي · متصل</span></div><button onClick={() => notify("تم تفعيل القراءة الصوتية للردود") }><Volume2/></button></header><div className="context-strip"><span><MapPin/><small>موقعك</small><b>عرفة B-12</b></span><span><MoonStar/><small>المرحلة</small><b>الوقوف بعرفة</b></span><span><HeartPulse/><small>الصحة</small><b>مستقرة</b></span></div><div className="messages" aria-live="polite"><div className="conversation-date">اليوم</div>{messages.map((message, index) => <div key={index} className={`message ${message.from}`}><span>{message.from === "bot" ? <Bot/> : "ع"}</span><div><p>{message.text}</p><time>{message.time}</time>{message.from === "bot" && /مختص/.test(message.text) && <button className="authority-button" onClick={() => notify("هذه قناة تجريبية: سيتم ربطك بالجهة الدينية المعتمدة") }><PhoneCall/>تواصل مع جهة معتمدة · تجريبي</button>}</div></div>)}</div><div className="suggested-prompts">{suggestedPrompts.map((prompt) => <button key={prompt} onClick={() => answer(prompt)}>{prompt}</button>)}</div><form className="chat-input" onSubmit={submit}><button type="button" className={listening ? "listening" : ""} onClick={() => { setListening(!listening); notify(!listening ? "جارٍ الاستماع - محاكاة" : "تم إيقاف الاستماع"); }}><Mic/></button><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="اكتب سؤالك هنا..." aria-label="رسالتك إلى رفيق"/><button type="submit" disabled={!input.trim()}><Send/></button></form><footer className="chat-disclaimer"><ShieldCheck/>رفيق يقدم معلومات وإرشادات مساندة، ولا يغني عن طلب المساعدة عند الحاجة.</footer></section></div>;
}

export function ProfilePage() {
  const { notify } = useRafeeq();
  const [emergencyView, setEmergencyView] = useState(false);
  return <>
    <section className="page-heading">
      <div><span className="eyebrow">الملف الطبي</span><h1>معلوماتي الصحية والطوارئ</h1><p>معلومات تساعد الطاقم الطبي المصرح له على الاستجابة بسرعة.</p></div>
      <button className="outline-button" onClick={() => { setEmergencyView(true); notify("تم فتح معاينة الطوارئ"); }}><Stethoscope/>معاينة الطوارئ</button>
    </section>
    <div className="profile-layout">
      <section className="identity-card card"><div className="identity-avatar">ع ح</div><h2>{pilgrim.name}</h2><p>{pilgrim.id}</p><span><MapPin/>{pilgrim.currentLocation}</span><div className="identity-grid"><span><small>العمر</small><b>{pilgrim.age} سنة</b></span><span><small>فصيلة الدم</small><b className="blood-type">{pilgrim.bloodType}</b></span><span><small>الجنسية</small><b>{pilgrim.nationality}</b></span><span><small>المجموعة</small><b>{pilgrim.group}</b></span></div></section>
      <div className="medical-info-grid"><InfoCard icon={HeartPulse} title="الحالات المزمنة" items={pilgrim.chronicConditions}/><InfoCard icon={AlertTriangle} title="الحساسية" items={pilgrim.allergies} alert/><InfoCard icon={Pill} title="الأدوية الحالية" items={pilgrim.medications}/><section className="info-card card emergency-contact"><div className="info-card-head"><span><PhoneCall/></span><h3>جهة اتصال الطوارئ</h3></div><b>{pilgrim.emergencyContact}</b><button onClick={() => notify("تم بدء اتصال تجريبي بجهة الطوارئ") }><PhoneCall/>اتصال تجريبي</button></section></div>
    </div>
    <section className="privacy-card card"><LockKeyhole/><div><b>من يمكنه رؤية هذه البيانات؟</b><p>يمكنك رؤية ملفك كاملًا. لا يصل الطاقم الطبي إلا للمعلومات الضرورية عند وجود حالة مصرح بها، بينما ترى غرفة العمليات بيانات مجمعة مجهولة الهوية فقط.</p></div><button onClick={() => notify("سجل الوصول التجريبي: لم تُفتح البيانات إلا بواسطتك")}>سجل الوصول</button></section>
    {emergencyView && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="معاينة ملف الطوارئ"><section className="emergency-preview card"><button className="modal-close" onClick={() => setEmergencyView(false)} aria-label="إغلاق"><X/></button><header><span><Stethoscope/></span><div><small>عرض توضيحي · للطواقم المصرح لها</small><h2>ملخص معلومات الطوارئ</h2></div></header><div className="emergency-person"><span>ع ح</span><div><h3>{pilgrim.name}</h3><p>{pilgrim.id} · {pilgrim.age} سنة</p></div><b>{pilgrim.bloodType}</b></div><dl><div><dt>الحساسية</dt><dd className="warning-text">{pilgrim.allergies.join("، ")}</dd></div><div><dt>الحالات المزمنة</dt><dd>{pilgrim.chronicConditions.join("، ")}</dd></div><div><dt>الأدوية الحالية</dt><dd>{pilgrim.medications.join("، ")}</dd></div><div><dt>جهة اتصال الطوارئ</dt><dd>{pilgrim.emergencyContact}</dd></div></dl><footer><ShieldCheck/>بيانات تجريبية مختصرة للاستجابة السريعة</footer></section></div>}
  </>;
}

function InfoCard({ icon: Icon, title, items, alert = false }: { icon: typeof HeartPulse; title: string; items: string[]; alert?: boolean }) {
  return <section className={`info-card card ${alert ? "info-alert" : ""}`}><div className="info-card-head"><span><Icon/></span><h3>{title}</h3></div>{items.map((item) => <p key={item}><i/>{item}</p>)}</section>;
}

export function BraceletPage() {
  const { notify } = useRafeeq();
  const [syncing, setSyncing] = useState(false);
  const [led, setLed] = useState<"white" | "orange" | "red">("white");
  function sync() { setSyncing(true); window.setTimeout(() => { setSyncing(false); notify("اكتملت مزامنة قراءات السوار"); }, 900); }
  return <><section className="page-heading"><div><span className="eyebrow">السوار الذكي</span><h1>حالة الاتصال والحساسات</h1><p>السوار يجمع القراءات ويرسلها إلى هاتفك عبر Bluetooth.</p></div><StatusDot>{bracelet.connected ? "متصل الآن" : "غير متصل"}</StatusDot></section><div className="bracelet-layout"><section className="bracelet-hero card"><div className="bracelet-visual"><div className="strap top"/><div className="watch-face"><HeartPulse/><span className={`led ${led}`}/><b>78</b><small>BPM</small></div><div className="strap bottom"/></div><div className="bracelet-summary"><span className="eyebrow">حالة الاتصال</span><h2>Rafeeq Band 01</h2><p><Bluetooth/>متصل بهاتف عبدالله</p><div className="battery-row"><span><BatteryCharging/><b>{bracelet.battery}%</b></span><div><i style={{ width: `${bracelet.battery}%` }}/></div></div><small>آخر مزامنة: {bracelet.lastSync}</small><button className="primary-button" onClick={sync} disabled={syncing}><RefreshCw className={syncing ? "spin" : ""}/>{syncing ? "جارٍ المزامنة..." : "مزامنة الآن"}</button></div></section><section className="connection-card card"><div className="card-label"><span><Radio/>الاتصال والخدمات</span><RiskBadge level="normal" label="ممتاز"/></div><div className="connection-list"><span><Bluetooth/><div><b>Bluetooth</b><small>متصل · إشارة قوية</small></div><CheckCircle2/></span><span><Nfc/><div><b>NFC</b><small>{bracelet.nfc}</small></div><CheckCircle2/></span><span><SmartphoneIcon/><div><b>GPS الموقع</b><small>من هاتف الحاج، وليس من السوار</small></div><Info/></span></div></section></div><SectionTitle eyebrow="الأجهزة" title="حالة الحساسات"/><div className="sensor-grid">{bracelet.sensors.map((sensor) => <article className="card" key={sensor.name}><span><Activity/></span><div><b>{sensor.name}</b><small>الفحص التلقائي مكتمل</small></div><StatusDot>{sensor.state}</StatusDot></article>)}</div><section className="led-section card"><div><span className="eyebrow">مؤشر السوار</span><h2>معنى ألوان LED</h2><p>إشارة مبسطة تساعد الحاج على فهم مستوى التنبيه، ولا تمثل تشخيصًا طبيًا.</p></div><div className="led-options led-guide"><span><i className="white"/><b>أبيض</b><small>طبيعي</small></span><span><i className="orange"/><b>برتقالي</b><small>يحتاج متابعة</small></span><span><i className="red"/><b>أحمر</b><small>تنبيه</small></span></div></section><section className="demo-tools card"><div><span className="demo-label">وضع العرض التجريبي</span><h2>اختبار تنبيهات السوار</h2><p>هذه الأدوات تغيّر حالة النموذج المعروض فقط، ولا تؤثر في قراءة صحية حقيقية.</p></div><div className="demo-state-buttons"><button className={led === "white" ? "active" : ""} onClick={() => setLed("white")}>حالة طبيعية</button><button className={led === "orange" ? "active" : ""} onClick={() => setLed("orange")}>يحتاج متابعة</button><button className={led === "red" ? "active" : ""} onClick={() => setLed("red")}>حالة تنبيه</button></div><button className="outline-button" onClick={() => notify(`تم إرسال اهتزاز تجريبي مع مؤشر ${led === "white" ? "أبيض" : led === "orange" ? "برتقالي" : "أحمر"}`)}><Radio/>اختبار الاهتزاز وLED</button></section></>;
}

function SmartphoneIcon() { return <span className="phone-glyph">▯</span>; }

function SOSModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  useEffect(() => { if (!open) setStep(1); }, [open]);
  useEffect(() => {
    if (step === 2) { const timer = window.setTimeout(() => setStep(3), 1400); return () => window.clearTimeout(timer); }
    if (step === 3) { const timer = window.setTimeout(() => setStep(4), 1700); return () => window.clearTimeout(timer); }
  }, [step]);
  if (!open) return null;
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="طلب المساعدة"><div className="sos-modal"><button className="modal-close" onClick={onClose}><X/></button>{step === 1 && <><span className="sos-modal-icon"><Siren/></span><span className="eyebrow red">طلب مساعدة طارئة</span><h2>هل تحتاج إلى المساعدة الآن؟</h2><p>سنشارك موقعك الأخير وقراءاتك الحيوية وملف الطوارئ مع الفريق الطبي المصرح.</p><div className="shared-info"><span><MapPin/>عرفات · القطاع B-12</span><span><HeartPulse/>النبض 78 · الأكسجين 98%</span><span><UserRoundCheck/>ملف الطوارئ الأساسي</span></div><button className="danger-button" onClick={() => setStep(2)}><Siren/>إرسال طلب المساعدة</button><button className="text-button" onClick={onClose}>إلغاء والعودة</button></>}{step === 2 && <div className="sos-progress"><span className="pulse-rings"><Siren/></span><h2>جاري إرسال طلب المساعدة</h2><p>نشارك بياناتك الآمنة مع مركز الاستجابة...</p><div className="loading-line"><i/></div></div>}{step === 3 && <div className="sos-success"><span><CheckCircle2/></span><h2>تم إرسال طلب المساعدة</h2><p>وصل طلبك إلى مركز الاستجابة. ابق في مكان آمن ومظلل.</p><div className="case-number"><small>رقم الحالة</small><b>EMR-14027</b></div><div className="dispatch-wait"><i/><span>جارٍ تعيين أقرب فريق طبي</span></div></div>}{step === 4 && <div className="sos-success assigned"><span><Stethoscope/></span><h2>تم تعيين فريق طبي للحالة</h2><p>الفريق الطبي 7 في الطريق إليك، والوقت التقديري للوصول 6 دقائق.</p><div className="team-card"><span>ط 7</span><div><b>الفريق الطبي 7</b><small>على بعد 1.2 كم · يتحرك الآن</small></div><StatusDot>في الطريق</StatusDot></div><button className="primary-button" onClick={onClose}>متابعة الحالة في الخلفية</button></div>}</div></div>;
}
