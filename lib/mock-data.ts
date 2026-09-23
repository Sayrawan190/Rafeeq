export type RiskLevel = "critical" | "high" | "medium" | "normal";

export const pilgrim = {
  id: "RFQ-20481",
  name: "عبدالله محمد الحربي",
  firstName: "عبدالله",
  age: 67,
  nationality: "المملكة العربية السعودية",
  bloodType: "O+",
  group: "حملة النور · المجموعة 12",
  chronicConditions: ["ارتفاع ضغط الدم", "السكري من النوع الثاني"],
  allergies: ["البنسلين"],
  medications: ["ميتفورمين 500mg", "أملوديبين 5mg"],
  emergencyContact: "محمد الحربي · 050 000 1947",
  currentLocation: "عرفات · القطاع B-12",
};

export const currentVitals = [
  { key: "heart", label: "معدل النبض", value: "78", unit: "نبضة/د", status: "مستقر", color: "green" },
  { key: "oxygen", label: "تشبع الأكسجين", value: "98", unit: "%", status: "طبيعي", color: "teal" },
  { key: "temp", label: "درجة الحرارة", value: "36.7", unit: "°م", status: "طبيعي", color: "gold" },
  { key: "activity", label: "النشاط اليومي", value: "4,820", unit: "خطوة", status: "جيد", color: "blue" },
];

export const vitalSeries = {
  heart: [72, 75, 73, 77, 82, 80, 78, 79, 76, 78, 77, 78],
  oxygen: [98, 98, 97, 98, 98, 97, 98, 99, 98, 98, 98, 98],
  temp: [36.5, 36.5, 36.6, 36.7, 36.9, 37.1, 36.9, 36.8, 36.7, 36.7, 36.6, 36.7],
  activity: [180, 240, 310, 520, 690, 880, 1220, 1810, 2460, 3180, 3990, 4820],
};

export const healthAlerts = [
  { id: 1, title: "ارتفاع حراري بسيط", detail: "تم تجاوزه بعد الراحة وشرب الماء", time: "اليوم · 11:20 ص", level: "medium" as RiskLevel },
  { id: 2, title: "انخفاض مؤقت في النشاط", detail: "استمرت القراءة 8 دقائق فقط", time: "أمس · 4:10 م", level: "normal" as RiskLevel },
  { id: 3, title: "تذكير بالدواء", detail: "تم تأكيد تناول الجرعة", time: "أمس · 8:00 ص", level: "normal" as RiskLevel },
];

export const journeyStages = [
  { id: "haram", title: "الحرم", subtitle: "تمت المرحلة", time: "8 ذو الحجة · 9:00 ص", state: "done", note: "بداية الرحلة والاستعداد للمناسك" },
  { id: "arafah", title: "عرفة", subtitle: "مرحلتك الحالية", time: "9 ذو الحجة · الآن", state: "current", note: "الوقوف بعرفة والإكثار من الدعاء" },
  { id: "muzdalifah", title: "مزدلفة", subtitle: "الوجهة التالية", time: "بعد المغرب · 7:15 م", state: "next", note: "المبيت وجمع الحصى" },
  { id: "mina", title: "منى", subtitle: "مرحلة قادمة", time: "10 ذو الحجة · 5:30 ص", state: "upcoming", note: "الاستقرار في المخيم والاستعداد للرمي" },
  { id: "jamarat", title: "الجمرات", subtitle: "مرحلة قادمة", time: "10 ذو الحجة · 8:00 ص", state: "upcoming", note: "رمي جمرة العقبة وفق تنظيم المجموعة" },
];

export const bracelet = {
  connected: true,
  battery: 82,
  bluetooth: "متصل",
  lastSync: "منذ دقيقة واحدة",
  nfc: "جاهز لملف الطوارئ",
  sensors: [
    { name: "مستشعر النبض", state: "يعمل" },
    { name: "مستشعر الحرارة", state: "يعمل" },
    { name: "مستشعر SpO₂", state: "يعمل" },
    { name: "مستشعر الحركة", state: "يعمل" },
  ],
};

export const medicalCases = [
  { id: "RFQ-9812", name: "سعد علي الغامدي", age: 70, location: "عرفات · A-14", heart: 142, temp: 39.2, spo2: 91, score: 0.92, level: "critical" as RiskLevel, reason: "مؤشرات إجهاد حراري حاد", status: "جديدة", alertTime: "منذ دقيقتين", alertMinutes: 2 },
  { id: "RFQ-7740", name: "محمد سالم أحمد", age: 65, location: "منى · C-08", heart: 126, temp: 38.4, spo2: 93, score: 0.78, level: "high" as RiskLevel, reason: "ارتفاع تدريجي في الخطر", status: "تم التعيين", alertTime: "منذ 5 دقائق", alertMinutes: 5 },
  { id: "RFQ-6621", name: "أمينة يوسف خان", age: 61, location: "مزدلفة · M-03", heart: 118, temp: 38.1, spo2: 95, score: 0.64, level: "medium" as RiskLevel, reason: "إجهاد وحرارة مرتفعة", status: "الفريق في الطريق", alertTime: "منذ 9 دقائق", alertMinutes: 9 },
  { id: "RFQ-5109", name: "إبراهيم حسن عمر", age: 55, location: "الحرم · H-22", heart: 102, temp: 37.6, spo2: 97, score: 0.41, level: "medium" as RiskLevel, reason: "تسارع نبض مؤقت", status: "قيد المتابعة", alertTime: "منذ 14 دقيقة", alertMinutes: 14 },
  { id: "RFQ-4302", name: "فاطمة نور الدين", age: 49, location: "عرفات · B-12", heart: 82, temp: 36.8, spo2: 98, score: 0.18, level: "normal" as RiskLevel, reason: "مراقبة روتينية", status: "مستقرة", alertTime: "منذ 22 دقيقة", alertMinutes: 22 },
  { id: "RFQ-3190", name: "عائشة محمود علي", age: 58, location: "منى · C-11", heart: 88, temp: 36.9, spo2: 97, score: 0.21, level: "normal" as RiskLevel, reason: "إجهاد بسيط تمت معالجته", status: "مغلقة", alertTime: "منذ 38 دقيقة", alertMinutes: 38 },
];

export const regions = [
  { id: "arafah", name: "عرفات", sector: "A-14", crowd: "مرتفع", population: "420 ألف", active: 34, critical: 3, alerts: 18, score: 0.78, level: "high" as RiskLevel, trend: "+12%", note: "ارتفاع ملحوظ في مؤشرات الإجهاد الحراري خلال آخر 30 دقيقة" },
  { id: "mina", name: "منى", sector: "C-08", crowd: "متوسط", population: "310 آلاف", active: 19, critical: 1, alerts: 9, score: 0.56, level: "medium" as RiskLevel, trend: "+6%", note: "ارتفاع تدريجي مع كثافة حركة قرب المسار الشرقي" },
  { id: "muzdalifah", name: "مزدلفة", sector: "M-03", crowd: "منخفض", population: "86 ألف", active: 7, critical: 0, alerts: 4, score: 0.31, level: "normal" as RiskLevel, trend: "-3%", note: "الوضع الصحي مستقر والاستعدادات للمرحلة التالية قائمة" },
  { id: "haram", name: "الحرم", sector: "H-22", crowd: "مرتفع", population: "520 ألف", active: 23, critical: 2, alerts: 12, score: 0.61, level: "medium" as RiskLevel, trend: "+4%", note: "ازدحام مرتفع مع بقاء المؤشرات الصحية ضمن نطاق المراقبة" },
];

export const operationalActions = [
  "زيادة نقاط توزيع المياه",
  "توفير مناطق تبريد وتظليل",
  "إرسال فرق طبية",
  "زيادة عدد المسعفين",
  "تغيير مسار الحشود",
  "إرسال تنبيه للموجودين",
];

export const trustedReligiousCards = [
  { title: "أذكار الصباح", detail: "مجموعة مختصرة من الأذكار الموثوقة" },
  { title: "دعاء دخول المسجد", detail: "النص المعتمد مع إمكانية الاستماع" },
  { title: "أدعية يوم عرفة", detail: "أدعية عامة صحيحة لهذه المرحلة" },
];

export const suggestedPrompts = [
  "وش الخطوة التالية؟",
  "كيف حالتي الصحية؟",
  "متى أتحرك؟",
  "أعطني دعاء هذه المرحلة",
];
