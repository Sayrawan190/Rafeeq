"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Bluetooth,
  Bot,
  BrainCircuit,
  BriefcaseMedical,
  CheckCircle2,
  ChevronLeft,
  HeartPulse,
  Languages,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Watch,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui";
import { useRafeeq } from "@/components/app-provider";

export function LandingPage() {
  const { language, setLanguage, tr } = useRafeeq();
  const [dbState, setDbState] = useState<"checking" | "connected" | "demo">("checking");

  useEffect(() => {
    fetch("/api/system/database").then((response) => setDbState(response.ok ? "connected" : "demo")).catch(() => setDbState("demo"));
  }, []);

  return (
    <div className="landing">
      <header className="landing-nav">
        <Logo />
        <nav><a href="#ecosystem">{tr("المنظومة", "Ecosystem")}</a><Link href="/demo">{tr("تجربة المنصة", "Platform demo")}</Link><a href="#principles">{tr("الموثوقية", "Trust")}</a></nav>
        <button className="language-button" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}><Languages size={18}/>{language === "ar" ? "English" : "العربية"}</button>
      </header>

      <main>
        <section className="landing-hero">
          <div className="hero-pattern" />
          <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
          <div className="hero-content">
            <span className="hero-kicker"><Sparkles size={16}/>{tr("منظومة ذكاء صحي لخدمة ضيوف الرحمن", "Health intelligence for the Guests of Allah")}</span>
            <h1>{tr("رفيق الصحي في رحلة", "A health companion through")}<br/><em>{tr("ضيوف الرحمن", "the pilgrimage journey")}</em></h1>
            <p>{tr("منظومة ذكية تربط السوار الصحي والتطبيق والطواقم الطبية وغرفة العمليات لتحويل القراءات الصغيرة إلى استجابة مبكرة وقرار تشغيلي أوضح.", "A connected health ecosystem linking the smart band, app, medical teams and operations for earlier response and clearer decisions.")}</p>
            <div className="hero-actions"><Link className="primary-cta" href="/demo">{tr("ابدأ التجربة", "Start the demo")}<ArrowLeft size={19}/></Link><a className="secondary-cta" href="#ecosystem">{tr("استعرض المنظومة", "Explore the ecosystem")}</a></div>
            <div className="hero-trust"><span><ShieldCheck/>بيانات تجريبية آمنة</span><span><CheckCircle2/>لا يقدم تشخيصًا طبيًا</span><span><Activity/>{dbState === "connected" ? "قاعدة البيانات متصلة" : dbState === "checking" ? "جارٍ فحص النظام" : "وضع العرض التجريبي"}</span></div>
          </div>
          <div className="hero-visual" aria-label="معاينة تطبيق رفيق">
            <div className="phone-frame">
              <div className="phone-top"><span>9:41</span><i/></div>
              <div className="phone-brand"><span className="mini-logo"><HeartPulse/></span><b>مساء الخير، عبدالله</b><small>عرفات · القطاع B-12</small></div>
              <div className="phone-status"><span><i/><small>حالتك الصحية</small><b>مستقرة</b></span><CheckCircle2/></div>
              <div className="phone-metrics"><span><HeartPulse/><b>78</b><small>نبضة/د</small></span><span><Activity/><b>98%</b><small>SpO₂</small></span><span><span className="degree">°</span><b>36.7</b><small>الحرارة</small></span></div>
              <div className="phone-next"><small>المرحلة التالية</small><b>التوجه إلى مزدلفة</b><span>بعد المغرب · 7:15 م</span><button>عرض الاتجاهات <ChevronLeft/></button></div>
            </div>
            <span className="floating-chip chip-health"><HeartPulse/><span><b>قراءات فورية</b><small>السوار متصل</small></span></span>
            <span className="floating-chip chip-ai"><BrainCircuit/><span><b>تنبؤ مبكر</b><small>Risk Score</small></span></span>
          </div>
        </section>

        <section className="ecosystem-section" id="ecosystem">
          <div className="section-intro"><span>RAFIQ ECOSYSTEM</span><h2>{tr("من الحاج إلى غرفة العمليات", "From pilgrim to operations")}</h2><p>{tr("ست طبقات مترابطة تعرض المعلومة المناسبة للشخص المناسب، في الوقت المناسب.", "Six connected layers deliver the right context to the right role at the right time.")}</p></div>
          <div className="ecosystem-flow">
            <FlowCard icon={Watch} number="01" title="السوار الذكي" detail="حساسات حيوية + SOS"/>
            <i/><FlowCard icon={Bluetooth} number="02" title="هاتف الحاج" detail="Bluetooth + GPS الجوال"/>
            <i/><FlowCard icon={Smartphone} number="03" title="تطبيق رفيق" detail="صحة + رحلة + إرشاد"/>
            <i/><FlowCard icon={BrainCircuit} number="04" title="ذكاء مبكر" detail="أنماط + Risk Score"/>
            <i/><FlowCard icon={BriefcaseMedical} number="05" title="الطواقم الطبية" detail="حالات مرتبة بالأولوية"/>
            <i/><FlowCard icon={LayoutDashboard} number="06" title="غرفة العمليات" detail="صورة صحية مجمعة"/>
          </div>
        </section>

        <section className="principles-section" id="principles">
          <div><span className="eyebrow">مسؤولية واضحة</span><h2>ذكاء مساعد، لا تشخيص طبي</h2><p>يعرض النموذج قراءات ومحاكاة توضح تجربة النظام المقترحة. مؤشرات الخطر تجريبية وغير معتمدة سريريًا، والمحتوى الديني من مصادر موثوقة مع إحالة المسائل الشرعية المتخصصة.</p></div>
          <div className="principle-grid"><span><ShieldCheck/><b>خصوصية حسب الدور</b><small>لا تظهر بيانات الأفراد في واجهة العمليات.</small></span><span><MapPin/><b>الموقع من الهاتف</b><small>السوار لا يحتوي على GPS.</small></span><span><Bot/><b>مساعد سياقي</b><small>يتعامل مع رحلة الحاج وحالته بأمان.</small></span></div>
        </section>
      </main>
      <footer className="landing-footer"><Logo light/><p>رفيق · نموذج أولي لعرض المنظومة الصحية الذكية</p><span>1448 هـ</span></footer>
    </div>
  );
}

export function DemoSelectionPage() {
  const { language, setLanguage, tr } = useRafeeq();
  return (
    <div className="demo-selection">
      <header className="landing-nav demo-nav">
        <Logo />
        <Link className="demo-back" href="/"><ArrowLeft size={17}/>{tr("العودة للرئيسية", "Back to home")}</Link>
        <button className="language-button" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}><Languages size={18}/>{language === "ar" ? "English" : "العربية"}</button>
      </header>
      <main className="demo-selection-main">
        <div className="demo-selection-intro">
          <span className="demo-pill"><Sparkles size={15}/>{tr("عرض توضيحي · بيانات تجريبية", "Demo · Simulated data")}</span>
          <h1>{tr("اختر منظورك في منظومة رفيق", "Choose your view of Rafeeq")}</h1>
          <p>{tr("ثلاث تجارب مترابطة تعرض المنظومة نفسها من منظور الحاج، والطاقم الطبي، وغرفة العمليات.", "Three connected experiences show the same system from the pilgrim, medical team and operations perspectives.")}</p>
        </div>
        <div className="role-cards demo-role-cards">
          <RoleCard href="/app" icon={Smartphone} title="تجربة الحاج" text="تابع صحتك ورحلتك، اسأل رفيق، وجرّب طلب المساعدة." color="mint" />
          <RoleCard href="/medical" icon={BriefcaseMedical} title="الطاقم الطبي" text="راجع الحالات حسب الأولوية وتعامل معها من درج جانبي سريع." color="gold" />
          <RoleCard href="/operations" icon={LayoutDashboard} title="غرفة العمليات" text="راقب القطاعات والمخاطر المجمعة واتخذ إجراءً تشغيليًا." color="cream" />
        </div>
        <p className="demo-context-note"><ShieldCheck size={16}/>{tr("جميع المواقع والقراءات والحالات المعروضة محاكاة لأغراض العرض فقط.", "All locations, readings and cases are simulated for demonstration only.")}</p>
      </main>
    </div>
  );
}

function FlowCard({ icon: Icon, number, title, detail }: { icon: typeof Watch; number: string; title: string; detail: string }) {
  return <article><span className="flow-number">{number}</span><span className="flow-icon"><Icon/></span><b>{title}</b><small>{detail}</small></article>;
}

function RoleCard({ href, icon: Icon, title, text, color }: { href: string; icon: typeof Smartphone; title: string; text: string; color: string }) {
  return <Link href={href} className={`role-card ${color}`}><span className="role-icon"><Icon/></span><h3>{title}</h3><p>{text}</p><span className="role-enter">دخول التجربة <ArrowLeft/></span></Link>;
}
