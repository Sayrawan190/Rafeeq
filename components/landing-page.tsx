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
        <nav><a href="#ecosystem">{tr("المنظومة", "Ecosystem")}</a><a href="#experiences">{tr("تجربة المنصة", "Platform demo")}</a><a href="#principles">{tr("الموثوقية", "Trust")}</a></nav>
        <button className="language-button" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}><Languages size={18}/>{language === "ar" ? "English" : "العربية"}</button>
      </header>

      <main>
        <section className="landing-hero">
          <div className="hero-pattern" />
          <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
          <div className="hero-content">
            <span className="hero-kicker"><Sparkles size={16}/>{tr("منظومة ذكاء صحي لخدمة ضيوف الرحمن", "Health intelligence for the Guests of Allah")}</span>
            <h1>{tr("رفيقك الصحي في رحلة", "Your health companion through")}<br/><em>{tr("ضيوف الرحمن", "the pilgrimage journey")}</em></h1>
            <p>{tr("منظومة ذكية تربط السوار الصحي والتطبيق والذكاء الاصطناعي والطواقم الطبية، لتحويل القراءات الصغيرة إلى استجابة مبكرة وقرار تشغيلي أوضح.", "A connected health ecosystem bringing together the smart bracelet, pilgrim app, AI-assisted risk signals, medical teams and operations.")}</p>
            <div className="hero-actions"><a className="primary-cta" href="#experiences">{tr("ابدأ التجربة", "Start the demo")}<ArrowLeft size={19}/></a><Link className="secondary-cta" href="/app">{tr("دخول مباشر كتجربة حاج", "Enter pilgrim demo")}</Link></div>
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

        <section className="experiences-section" id="experiences">
          <div className="section-intro light"><span>LIVE MVP</span><h2>{tr("اختر تجربة العرض", "Choose a demo experience")}</h2><p>{tr("كل تجربة مستقلة بصلاحيات ومعلومات تناسب دور المستخدم.", "Each experience reflects its role, context and access level.")}</p></div>
          <div className="role-cards">
            <RoleCard href="/app" icon={Smartphone} title="تجربة الحاج" text="تابع صحتك ورحلتك، اسأل رفيق، وجرّب طلب المساعدة." color="mint" />
            <RoleCard href="/medical" icon={BriefcaseMedical} title="الطاقم الطبي" text="راجع الحالات بالأولوية وافتح سجلًا طبيًا متكاملًا." color="gold" />
            <RoleCard href="/operations" icon={LayoutDashboard} title="غرفة العمليات" text="راقب المناطق والمخاطر الصحية واتخذ إجراءً تشغيليًا." color="cream" />
          </div>
        </section>

        <section className="principles-section" id="principles">
          <div><span className="eyebrow">مسؤولية واضحة</span><h2>ذكاء مساعد، لا تشخيص طبي</h2><p>يعرض النموذج قراءات ومحاكاة توضح تجربة النظام المقترحة. مؤشرات الخطر تجريبية وغير معتمدة سريريًا، والمحتوى الديني من مصادر موثوقة مع إحالة المسائل الشرعية المتخصصة.</p></div>
          <div className="principle-grid"><span><ShieldCheck/><b>خصوصية حسب الدور</b><small>لا تظهر بيانات الأفراد في واجهة العمليات.</small></span><span><MapPin/><b>الموقع من الهاتف</b><small>السوار لا يحتوي على GPS.</small></span><span><Bot/><b>مساعد سياقي</b><small>يتعامل مع رحلة الحاج وحالته بأمان.</small></span></div>
        </section>
      </main>
      <footer className="landing-footer"><Logo light/><p>رفيق · نموذج أولي لعرض المنظومة الصحية الذكية</p><span>1447 هـ</span></footer>
    </div>
  );
}

function FlowCard({ icon: Icon, number, title, detail }: { icon: typeof Watch; number: string; title: string; detail: string }) {
  return <article><span className="flow-number">{number}</span><span className="flow-icon"><Icon/></span><b>{title}</b><small>{detail}</small></article>;
}

function RoleCard({ href, icon: Icon, title, text, color }: { href: string; icon: typeof Smartphone; title: string; text: string; color: string }) {
  return <Link href={href} className={`role-card ${color}`}><span className="role-icon"><Icon/></span><h3>{title}</h3><p>{text}</p><span className="role-enter">دخول التجربة <ArrowLeft/></span></Link>;
}
