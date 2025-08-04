
CREATE TABLE IF NOT EXISTS weekly_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start_date date NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  time_slot text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(week_start_date, day_of_week, time_slot)
);

CREATE INDEX IF NOT EXISTS idx_weekly_availability_week_day ON weekly_availability(week_start_date, day_of_week);
CREATE INDEX IF NOT EXISTS idx_weekly_availability_week ON weekly_availability(week_start_date);

-- Row Level Security aktivieren
ALTER TABLE weekly_availability ENABLE ROW LEVEL SECURITY;

-- Policies für wochenspezifische Verfügbarkeit
CREATE POLICY "Jeder kann wochenspezifische Verfügbarkeit lesen"
  ON weekly_availability
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Nur authentifizierte Benutzer können Verfügbarkeit verwalten
CREATE POLICY "Authentifizierte Benutzer können wochenspezifische Verfügbarkeit verwalten"
  ON weekly_availability
  FOR ALL
  TO authenticated
  USING (true);