export interface EmailData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceName: string;
  duration: number;
  price: number;
  date: string;
  timeSlot: string;
  notes?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceProvider?: string;
  firstVisit?: boolean;
}
