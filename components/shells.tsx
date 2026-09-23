"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Bell,
  Bot,
  BriefcaseMedical,
  ChevronDown,
  CircleUserRound,
  Gauge,
  HeartPulse,
  Home,
  Languages,
  LayoutDashboard,
  Map,
  MapPin,
  Menu,
  Route,
  Settings,
  ShieldCheck,
  Siren,
  UsersRound,
  Watch,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo, StatusDot } from "@/components/ui";
import { useRafeeq } from "@/components/app-provider";

const pilgrimNav = [
  { href: "/app", ar: "الرئيسية", en: "Home", icon: Home },
  { href: "/app/health", ar: "صحتي", en: "My health", icon: HeartPulse },
  { href: "/app/journey", ar: "رحلتي", en: "Journey", icon: Route },
  { href: "/app/location", ar: "موقعي", en: "Location", icon: MapPin },
  { href: "/app/assistant", ar: "اسأل رفيق", en: "Ask Rafeeq", icon: Bot },
  { href: "/app/bracelet", ar: "السوار", en: "Band", icon: Watch },
];

export function PilgrimShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, senior, setSenior, tr, notify } = useRafeeq();
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const goRole = (path: string) => {
    setRoleOpen(false);
    router.push(path);
  };

  return (
    <div className={`pilgrim-app ${senior ? "senior-active" : ""}`}>
      <aside className={`pilgrim-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-head"><Logo /><button className="icon-btn sidebar-close" onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة"><X /></button></div>
        <div className="pilgrim-card-mini">
          <span className="pilgrim-avatar">ع</span><div><b>عبدالله الحربي</b><small>RFQ-20481</small></div><StatusDot>متصل</StatusDot>
        </div>
        <nav className="side-nav" aria-label="التنقل الرئيسي">
          {pilgrimNav.map(({ href, ar, en, icon: Icon }) => {
            const active = href === "/app" ? pathname === href : pathname.startsWith(href);
            return <Link key={href} className={active ? "active" : ""} href={href} onClick={() => setMenuOpen(false)}><Icon size={20} /><span>{tr(ar, en)}</span></Link>;
          })}
          <div className="nav-divider" />
          <Link className={pathname === "/app/profile" ? "active" : ""} href="/app/profile"><CircleUserRound size={20}/><span>{tr("الملف الطبي", "Medical profile")}</span></Link>
        </nav>
        <button className={`senior-toggle ${senior ? "on" : ""}`} onClick={() => { setSenior(!senior); notify(!senior ? "تم تفعيل وضع كبار السن" : "تم إيقاف وضع كبار السن"); }}>
          <span><AccessibilityMark /><b>{tr("وضع كبار السن", "Senior mode")}</b><small>{tr("واجهة أكبر وأكثر بساطة", "Larger, simpler interface")}</small></span>
          <i><em /></i>
        </button>
        <div className="sidebar-foot"><ShieldCheck size={16}/><span>بيانات العرض محمية وتجريبية</span></div>
      </aside>

      <div className="pilgrim-main">
        <header className="app-topbar">
          <button className="icon-btn menu-button" onClick={() => setMenuOpen(true)} aria-label="فتح القائمة"><Menu /></button>
          <div className="topbar-title"><small>{tr("رحلة حج 1448 هـ", "Hajj journey 1448")}</small><b>{tr("أهلاً بك يا عبدالله", "Welcome, Abdullah")}</b></div>
          <div className="topbar-actions">
            <button className="language-button" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}><Languages size={18}/><span>{language === "ar" ? "English" : "العربية"}</span></button>
            <button className="icon-btn notification-button" onClick={() => notify(tr("لديك تنبيه واحد: موعد التحرك 7:15 م", "One alert: departure at 7:15 PM"))} aria-label="التنبيهات"><Bell size={20}/><i>1</i></button>
            <div className="role-menu-wrap">
              <button className="role-button" onClick={() => setRoleOpen(!roleOpen)}><span>تجربة الحاج</span><ChevronDown size={16}/></button>
              {roleOpen && <div className="role-menu"><button onClick={() => goRole("/medical")}><BriefcaseMedical size={17}/>الطاقم الطبي</button><button onClick={() => goRole("/operations")}><LayoutDashboard size={17}/>غرفة العمليات</button></div>}
            </div>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>

      <nav className="mobile-bottom-nav" aria-label="التنقل على الجوال">
        {pilgrimNav.map(({ href, ar, en, icon: Icon }) => {
          const active = href === "/app" ? pathname === href : pathname.startsWith(href);
          return <Link key={href} className={active ? "active" : ""} href={href}><Icon/><span>{tr(ar, en)}</span></Link>;
        })}
      </nav>
    </div>
  );
}

function AccessibilityMark() {
  return <span className="accessibility-mark">ك</span>;
}

const dashboardNav = {
  medical: [
    { href: "/medical", label: "نظرة عامة", icon: Gauge },
    { href: "/medical/cases", label: "الحالات الطبية", icon: BriefcaseMedical },
  ],
  operations: [
    { href: "/operations", label: "مركز العمليات", icon: LayoutDashboard },
    { href: "/operations/regions", label: "المناطق", icon: Map },
  ],
};

export function DashboardShell({ type, children }: { type: "medical" | "operations"; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { notify } = useRafeeq();
  const [open, setOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const title = type === "medical" ? "لوحة الطاقم الطبي" : "مركز العمليات";
  const subtitle = type === "medical" ? "استجابة الحالات الصحية" : "الذكاء الصحي التشغيلي";

  return (
    <div className={`dashboard-app dashboard-${type}`}>
      <aside className={`dashboard-sidebar ${open ? "open" : ""}`}>
        <div className="dash-logo"><Logo light /><button className="icon-btn sidebar-close" onClick={() => setOpen(false)}><X/></button></div>
        <div className="dash-product"><span>{type === "medical" ? <BriefcaseMedical/> : <LayoutDashboard/>}</span><div><b>{title}</b><small>{subtitle}</small></div></div>
        <nav className="dash-nav">
          {dashboardNav[type].map(({ href, label, icon: Icon }) => {
            const active = href === `/${type}` ? pathname === href : pathname.startsWith(href);
            return <Link key={href} className={active ? "active" : ""} href={href}><Icon size={20}/><span>{label}</span></Link>;
          })}
          <div className="dash-divider" />
          <button onClick={() => notify("التنبيهات محدثة، لا توجد عناصر غير مقروءة")}><Bell size={20}/><span>التنبيهات</span><em>{type === "medical" ? 5 : 12}</em></button>
          <button onClick={() => notify("إعدادات العرض جاهزة للاستخدام في النسخة التجريبية")}><Settings size={20}/><span>الإعدادات</span></button>
        </nav>
        <div className="live-panel"><span><i/>LIVE</span><b>النظام متصل</b><small>آخر تحديث الآن</small></div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="icon-btn menu-button" onClick={() => setOpen(true)}><Menu/></button>
          <div><small>رفيق · منظومة الذكاء الصحي</small><b>{title}</b></div>
          <div className="dashboard-actions">
            <span className="last-update"><i/>تحديث مباشر · الآن</span>
            <button className="icon-btn" onClick={() => notify("كل التنبيهات مقروءة")}><Bell size={19}/></button>
            <div className="role-menu-wrap">
              <button className="operator-button" onClick={() => setRoleOpen(!roleOpen)}><span className="avatar">{type === "medical" ? "د" : "م"}</span><span><b>{type === "medical" ? "د. نورة العتيبي" : "م. خالد الزهراني"}</b><small>{type === "medical" ? "طبيب طوارئ" : "مشرف عمليات"}</small></span><ChevronDown size={16}/></button>
              {roleOpen && <div className="role-menu dashboard-role-menu"><button onClick={() => router.push("/app")}><UsersRound size={17}/>تجربة الحاج</button><button onClick={() => router.push(type === "medical" ? "/operations" : "/medical")}><Activity size={17}/>{type === "medical" ? "غرفة العمليات" : "الطاقم الطبي"}</button></div>}
            </div>
          </div>
        </header>
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

export function SOSFloatingButton({ onClick }: { onClick: () => void }) {
  return <button className="sos-floating" onClick={onClick}><Siren size={25}/><span>SOS</span></button>;
}
