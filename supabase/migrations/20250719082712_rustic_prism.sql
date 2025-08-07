/*
  # Initiales Schema für EHCO 

  1. Neue Tabellen
    - `appointments`
      - `id` (uuid, primary key)
      - `patient_name` (text)
      - `patient_email` (text)
      - `patient_phone` (text)
      - `service_id` (text)
      - `service_name` (text)
      - `duration` (integer)
      - `price` (integer)
      - `date` (date)
      - `time_slot` (text)
      - `status` (text)
      - `notes` (text, nullable)
      - `emergency_contact` (text, nullable)
      - `emergency_phone` (text, nullable)
      - `insurance_provider` (text, nullable)
      - `first_visit` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `availability`
      - `id` (uuid, primary key)
      - `day_of_week` (integer)
      - `time_slot` (text)
      - `is_available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sicherheit
    - Enable RLS auf beiden Tabellen
    - Policies für öffentlichen Zugriff auf Termine (nur Lesen/Erstellen)
    - Policies für Admin-Zugriff auf alle Operationen
*/

-- Termine Tabelle
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  service_id text NOT NULL,
  service_name text NOT NULL,
  duration integer NOT NULL,
  price integer NOT NULL,
  date date NOT NULL,
  time_slot text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  emergency_contact text,
  emergency_phone text,
  insurance_provider text,
  first_visit boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Verfügbarkeit Tabelle
CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  time_slot text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date_time ON appointments(date, time_slot);
CREATE INDEX IF NOT EXISTS idx_availability_day_time ON availability(day_of_week, time_slot);

-- Row Level Security aktivieren
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Policies für Termine
-- Jeder kann Termine erstellen (für Buchungen)
CREATE POLICY "Jeder kann Termine erstellen"
  ON appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Jeder kann Termine lesen (für Verfügbarkeitsprüfung)
CREATE POLICY "Jeder kann Termine lesen"
  ON appointments
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Nur authentifizierte Benutzer können Termine aktualisieren/löschen
CREATE POLICY "Authentifizierte Benutzer können Termine verwalten"
  ON appointments
  FOR ALL
  TO authenticated
  USING (true);

-- Policies für Verfügbarkeit
-- Jeder kann Verfügbarkeit lesen
CREATE POLICY "Jeder kann Verfügbarkeit lesen"
  ON availability
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Nur authentifizierte Benutzer können Verfügbarkeit verwalten
CREATE POLICY "Authentifizierte Benutzer können Verfügbarkeit verwalten"
  ON availability
  FOR ALL
  TO authenticated
  USING (true);

-- Standard-Verfügbarkeiten einfügen (Montag bis Freitag, 9:00-17:00)
INSERT INTO availability (day_of_week, time_slot, is_available) VALUES
-- Montag (1)
(1, '09:00', true), (1, '09:30', true), (1, '10:00', true), (1, '10:30', true),
(1, '11:00', true), (1, '11:30', true), (1, '12:00', true), (1, '14:00', true),
(1, '14:30', true), (1, '15:00', true), (1, '15:30', true), (1, '16:00', true),
(1, '16:30', true), (1, '17:00', true),
-- Dienstag (2)
(2, '09:00', true), (2, '09:30', true), (2, '10:00', true), (2, '10:30', true),
(2, '11:00', true), (2, '11:30', true), (2, '12:00', true), (2, '14:00', true),
(2, '14:30', true), (2, '15:00', true), (2, '15:30', true), (2, '16:00', true),
(2, '16:30', true), (2, '17:00', true),
-- Mittwoch (3)
(3, '09:00', true), (3, '09:30', true), (3, '10:00', true), (3, '10:30', true),
(3, '11:00', true), (3, '11:30', true), (3, '12:00', true), (3, '14:00', true),
(3, '14:30', true), (3, '15:00', true), (3, '15:30', true), (3, '16:00', true),
(3, '16:30', true), (3, '17:00', true),
-- Donnerstag (4)
(4, '09:00', true), (4, '09:30', true), (4, '10:00', true), (4, '10:30', true),
(4, '11:00', true), (4, '11:30', true), (4, '12:00', true), (4, '14:00', true),
(4, '14:30', true), (4, '15:00', true), (4, '15:30', true), (4, '16:00', true),
(4, '16:30', true), (4, '17:00', true),
-- Freitag (5)
(5, '09:00', true), (5, '09:30', true), (5, '10:00', true), (5, '10:30', true),
(5, '11:00', true), (5, '11:30', true), (5, '12:00', true), (5, '14:00', true),
(5, '14:30', true), (5, '15:00', true), (5, '15:30', true), (5, '16:00', true),
(5, '16:30', true), (5, '17:00', true)
ON CONFLICT DO NOTHING;