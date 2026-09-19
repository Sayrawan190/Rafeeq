-- Rafeeq MVP: schema and demo seed data
-- Safe to run more than once.

BEGIN;

CREATE TABLE IF NOT EXISTS pilgrims (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  age SMALLINT NOT NULL CHECK (age > 0),
  nationality TEXT NOT NULL,
  blood_type TEXT,
  group_name TEXT,
  current_location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medical_profiles (
  pilgrim_id TEXT PRIMARY KEY REFERENCES pilgrims(id) ON DELETE CASCADE,
  chronic_conditions TEXT[] NOT NULL DEFAULT '{}',
  allergies TEXT[] NOT NULL DEFAULT '{}',
  medications TEXT[] NOT NULL DEFAULT '{}',
  emergency_contact TEXT,
  emergency_notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bracelet_devices (
  id TEXT PRIMARY KEY,
  pilgrim_id TEXT NOT NULL UNIQUE REFERENCES pilgrims(id) ON DELETE CASCADE,
  connected BOOLEAN NOT NULL DEFAULT FALSE,
  battery_percent SMALLINT NOT NULL CHECK (battery_percent BETWEEN 0 AND 100),
  bluetooth_status TEXT NOT NULL,
  nfc_status TEXT NOT NULL,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vital_readings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pilgrim_id TEXT NOT NULL REFERENCES pilgrims(id) ON DELETE CASCADE,
  recorded_at TIMESTAMPTZ NOT NULL,
  heart_rate SMALLINT CHECK (heart_rate > 0),
  spo2 NUMERIC(4,1) CHECK (spo2 BETWEEN 0 AND 100),
  body_temperature NUMERIC(4,1),
  activity_steps INTEGER CHECK (activity_steps >= 0),
  source TEXT NOT NULL DEFAULT 'bracelet',
  UNIQUE (pilgrim_id, recorded_at)
);

CREATE INDEX IF NOT EXISTS vital_readings_pilgrim_recorded_idx
  ON vital_readings (pilgrim_id, recorded_at DESC);

CREATE TABLE IF NOT EXISTS health_alerts (
  id TEXT PRIMARY KEY,
  pilgrim_id TEXT NOT NULL REFERENCES pilgrims(id) ON DELETE CASCADE,
  level TEXT NOT NULL CHECK (level IN ('normal', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  detail TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'resolved' CHECK (status IN ('active', 'resolved')),
  occurred_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journey_stages (
  id TEXT PRIMARY KEY,
  sort_order SMALLINT NOT NULL UNIQUE,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('done', 'current', 'next')),
  scheduled_at TIMESTAMPTZ,
  guidance_ar TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medical_cases (
  id TEXT PRIMARY KEY,
  pilgrim_id TEXT REFERENCES pilgrims(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  age SMALLINT NOT NULL,
  location TEXT NOT NULL,
  heart_rate SMALLINT,
  body_temperature NUMERIC(4,1),
  spo2 NUMERIC(4,1),
  risk_score NUMERIC(3,2) NOT NULL CHECK (risk_score BETWEEN 0 AND 1),
  level TEXT NOT NULL CHECK (level IN ('normal', 'medium', 'high', 'critical')),
  alert_reason TEXT NOT NULL,
  response_status TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS regions (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  sector TEXT NOT NULL,
  crowd_status TEXT NOT NULL,
  observed_population INTEGER NOT NULL CHECK (observed_population >= 0),
  active_cases SMALLINT NOT NULL DEFAULT 0,
  critical_cases SMALLINT NOT NULL DEFAULT 0,
  active_alerts SMALLINT NOT NULL DEFAULT 0,
  population_risk_score NUMERIC(3,2) NOT NULL CHECK (population_risk_score BETWEEN 0 AND 1),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('normal', 'medium', 'high', 'critical')),
  trend_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  intelligence_note TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS operational_actions (
  id TEXT PRIMARY KEY,
  region_id TEXT REFERENCES regions(id) ON DELETE SET NULL,
  action_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'suggested' CHECK (status IN ('suggested', 'approved', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO pilgrims (id, full_name, age, nationality, blood_type, group_name, current_location)
VALUES ('RFQ-20481', 'عبدالله محمد الحربي', 67, 'المملكة العربية السعودية', 'O+', 'حملة النور · المجموعة 12', 'عرفات · القطاع B-12')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  age = EXCLUDED.age,
  nationality = EXCLUDED.nationality,
  blood_type = EXCLUDED.blood_type,
  group_name = EXCLUDED.group_name,
  current_location = EXCLUDED.current_location,
  updated_at = NOW();

INSERT INTO medical_profiles (pilgrim_id, chronic_conditions, allergies, medications, emergency_contact)
VALUES ('RFQ-20481', ARRAY['ارتفاع ضغط الدم', 'السكري من النوع الثاني'], ARRAY['البنسلين'], ARRAY['ميتفورمين 500mg', 'أملوديبين 5mg'], 'محمد الحربي · 050 000 1947')
ON CONFLICT (pilgrim_id) DO UPDATE SET
  chronic_conditions = EXCLUDED.chronic_conditions,
  allergies = EXCLUDED.allergies,
  medications = EXCLUDED.medications,
  emergency_contact = EXCLUDED.emergency_contact,
  updated_at = NOW();

INSERT INTO bracelet_devices (id, pilgrim_id, connected, battery_percent, bluetooth_status, nfc_status, last_synced_at)
VALUES ('BAND-01', 'RFQ-20481', TRUE, 82, 'connected', 'ready', '2026-05-26T15:20:00+03:00')
ON CONFLICT (id) DO UPDATE SET
  connected = EXCLUDED.connected,
  battery_percent = EXCLUDED.battery_percent,
  bluetooth_status = EXCLUDED.bluetooth_status,
  nfc_status = EXCLUDED.nfc_status,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = NOW();

INSERT INTO vital_readings (pilgrim_id, recorded_at, heart_rate, spo2, body_temperature, activity_steps)
VALUES
  ('RFQ-20481', '2026-05-26T13:30:00+03:00', 72, 98, 36.5, 3520),
  ('RFQ-20481', '2026-05-26T13:45:00+03:00', 75, 98, 36.5, 3660),
  ('RFQ-20481', '2026-05-26T14:00:00+03:00', 73, 97, 36.6, 3810),
  ('RFQ-20481', '2026-05-26T14:15:00+03:00', 77, 98, 36.7, 3970),
  ('RFQ-20481', '2026-05-26T14:30:00+03:00', 82, 98, 36.9, 4100),
  ('RFQ-20481', '2026-05-26T14:45:00+03:00', 80, 97, 37.1, 4260),
  ('RFQ-20481', '2026-05-26T15:00:00+03:00', 78, 98, 36.7, 4820)
ON CONFLICT (pilgrim_id, recorded_at) DO UPDATE SET
  heart_rate = EXCLUDED.heart_rate,
  spo2 = EXCLUDED.spo2,
  body_temperature = EXCLUDED.body_temperature,
  activity_steps = EXCLUDED.activity_steps;

INSERT INTO health_alerts (id, pilgrim_id, level, title, detail, status, occurred_at)
VALUES
  ('ALR-001', 'RFQ-20481', 'medium', 'ارتفاع حراري بسيط', 'تم تجاوزه بعد الراحة وشرب الماء', 'resolved', '2026-05-26T11:20:00+03:00'),
  ('ALR-002', 'RFQ-20481', 'normal', 'انخفاض مؤقت في النشاط', 'استمرت القراءة 8 دقائق فقط', 'resolved', '2026-05-25T16:10:00+03:00')
ON CONFLICT (id) DO UPDATE SET
  level = EXCLUDED.level,
  title = EXCLUDED.title,
  detail = EXCLUDED.detail,
  status = EXCLUDED.status,
  occurred_at = EXCLUDED.occurred_at;

INSERT INTO journey_stages (id, sort_order, title_ar, title_en, state, scheduled_at, guidance_ar)
VALUES
  ('ihram', 1, 'الإحرام', 'Ihram', 'done', '2026-05-25T09:00:00+03:00', 'نية النسك والتلبية'),
  ('arafah', 2, 'عرفة', 'Arafah', 'current', '2026-05-26T12:00:00+03:00', 'الوقوف بعرفة والإكثار من الدعاء'),
  ('muzdalifah', 3, 'مزدلفة', 'Muzdalifah', 'next', '2026-05-26T19:15:00+03:00', 'المبيت وجمع الحصى'),
  ('mina', 4, 'منى', 'Mina', 'next', '2026-05-27T05:30:00+03:00', 'رمي جمرة العقبة والذبح')
ON CONFLICT (id) DO UPDATE SET
  sort_order = EXCLUDED.sort_order,
  title_ar = EXCLUDED.title_ar,
  title_en = EXCLUDED.title_en,
  state = EXCLUDED.state,
  scheduled_at = EXCLUDED.scheduled_at,
  guidance_ar = EXCLUDED.guidance_ar;

INSERT INTO medical_cases (id, patient_name, age, location, heart_rate, body_temperature, spo2, risk_score, level, alert_reason, response_status)
VALUES
  ('RFQ-9812', 'سعد علي الغامدي', 70, 'عرفات · A-14', 142, 39.2, 91, 0.92, 'critical', 'مؤشرات إجهاد حراري حاد', 'جديدة'),
  ('RFQ-7740', 'محمد سالم أحمد', 65, 'منى · C-08', 126, 38.4, 93, 0.78, 'high', 'ارتفاع تدريجي في الخطر', 'تم التعيين'),
  ('RFQ-6621', 'أمينة يوسف خان', 61, 'مزدلفة · M-03', 118, 38.1, 95, 0.64, 'medium', 'إجهاد وحرارة مرتفعة', 'الفريق في الطريق'),
  ('RFQ-5109', 'إبراهيم حسن عمر', 55, 'الحرم · H-22', 102, 37.6, 97, 0.41, 'medium', 'تسارع نبض مؤقت', 'قيد المتابعة'),
  ('RFQ-4302', 'فاطمة نور الدين', 49, 'عرفات · B-12', 82, 36.8, 98, 0.18, 'normal', 'مراقبة روتينية', 'مستقرة')
ON CONFLICT (id) DO UPDATE SET
  patient_name = EXCLUDED.patient_name,
  age = EXCLUDED.age,
  location = EXCLUDED.location,
  heart_rate = EXCLUDED.heart_rate,
  body_temperature = EXCLUDED.body_temperature,
  spo2 = EXCLUDED.spo2,
  risk_score = EXCLUDED.risk_score,
  level = EXCLUDED.level,
  alert_reason = EXCLUDED.alert_reason,
  response_status = EXCLUDED.response_status,
  updated_at = NOW();

INSERT INTO regions (id, name_ar, sector, crowd_status, observed_population, active_cases, critical_cases, active_alerts, population_risk_score, risk_level, trend_percent, intelligence_note)
VALUES
  ('arafah', 'عرفات', 'A-14', 'مرتفع', 420000, 34, 3, 18, 0.78, 'high', 12, 'ارتفاع ملحوظ في مؤشرات الإجهاد الحراري خلال آخر 30 دقيقة'),
  ('mina', 'منى', 'C-08', 'متوسط', 310000, 19, 1, 9, 0.56, 'medium', 6, 'ارتفاع تدريجي مع كثافة حركة قرب المسار الشرقي'),
  ('muzdalifah', 'مزدلفة', 'M-03', 'منخفض', 86000, 7, 0, 4, 0.31, 'normal', -3, 'الوضع الصحي مستقر والاستعدادات للمرحلة التالية قائمة'),
  ('haram', 'الحرم', 'H-22', 'مرتفع', 520000, 23, 2, 12, 0.61, 'medium', 4, 'ازدحام مرتفع مع بقاء المؤشرات الصحية ضمن نطاق المراقبة')
ON CONFLICT (id) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  sector = EXCLUDED.sector,
  crowd_status = EXCLUDED.crowd_status,
  observed_population = EXCLUDED.observed_population,
  active_cases = EXCLUDED.active_cases,
  critical_cases = EXCLUDED.critical_cases,
  active_alerts = EXCLUDED.active_alerts,
  population_risk_score = EXCLUDED.population_risk_score,
  risk_level = EXCLUDED.risk_level,
  trend_percent = EXCLUDED.trend_percent,
  intelligence_note = EXCLUDED.intelligence_note,
  updated_at = NOW();

INSERT INTO operational_actions (id, region_id, action_name, status)
VALUES
  ('ACT-001', 'arafah', 'زيادة نقاط توزيع المياه', 'suggested'),
  ('ACT-002', 'arafah', 'توفير مناطق تبريد وتظليل', 'suggested'),
  ('ACT-003', 'mina', 'إرسال فرق طبية', 'approved')
ON CONFLICT (id) DO UPDATE SET
  region_id = EXCLUDED.region_id,
  action_name = EXCLUDED.action_name,
  status = EXCLUDED.status,
  updated_at = NOW();

COMMIT;
