import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          service_id: string;
          service_name: string;
          duration: number;
          price: number;
          date: string;
          time_slot: string;
          status: "pending" | "confirmed" | "cancelled" | "completed";
          notes: string | null;
          emergency_contact: string | null;
          emergency_phone: string | null;
          insurance_provider: string | null;
          first_visit: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          service_id: string;
          service_name: string;
          duration: number;
          price: number;
          date: string;
          time_slot: string;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          notes?: string | null;
          emergency_contact?: string | null;
          emergency_phone?: string | null;
          insurance_provider?: string | null;
          first_visit?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_name?: string;
          patient_email?: string;
          patient_phone?: string;
          service_id?: string;
          service_name?: string;
          duration?: number;
          price?: number;
          date?: string;
          time_slot?: string;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          notes?: string | null;
          emergency_contact?: string | null;
          emergency_phone?: string | null;
          insurance_provider?: string | null;
          first_visit?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      availability: {
        Row: {
          id: string;
          day_of_week: number;
          time_slot: string;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          day_of_week: number;
          time_slot: string;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          day_of_week?: number;
          time_slot?: string;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
