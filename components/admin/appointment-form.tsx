"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon, Snowflake, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  getServicesByCategory,
  getAvailableTimeSlots,
  createAppointment,
} from "@/lib/db/database";

const appointmentSchema = z.object({
  patientName: z
    .string()
    .min(2, { message: "Name muss mindestens 2 Zeichen haben." }),
  patientEmail: z
    .string()
    .email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  patientPhone: z
    .string()
    .min(10, { message: "Bitte geben Sie eine gültige Telefonnummer ein." }),
  serviceId: z.string({
    required_error: "Bitte wählen Sie eine Behandlung aus.",
  }),
  date: z.date({ required_error: "Bitte wählen Sie ein Datum aus." }),
  timeSlot: z.string({ required_error: "Bitte wählen Sie eine Uhrzeit aus." }),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<
    Array<{ time: string; available: boolean }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { consultations, coolingTreatments } = getServicesByCategory();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      notes: "",
    },
  });

  const onDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      loadAvailableSlots(date);
      form.setValue("date", date);
      form.setValue("timeSlot", "");
    }
  };

  const loadAvailableSlots = async (date: Date) => {
    try {
      const slots = await getAvailableTimeSlots(date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Fehler beim Laden der Zeitslots:", error);
      toast({
        title: "Fehler",
        description: "Verfügbare Zeiten konnten nicht geladen werden.",
        variant: "destructive",
      });
    }
  };
  async function onSubmit(values: AppointmentFormValues) {
    setIsSubmitting(true);

    try {
      const service = getServicesByCategory()
        .consultations.concat(getServicesByCategory().coolingTreatments)
        .find((s) => s.id === values.serviceId);
      if (!service) {
        throw new Error("Service nicht gefunden");
      }

      await createAppointment({
        patient_name: values.patientName,
        patient_email: values.patientEmail,
        patient_phone: values.patientPhone,
        service_id: values.serviceId,
        service_name: service.name,
        duration: service.duration,
        price: service.price,
        date: format(values.date, "yyyy-MM-dd"),
        time_slot: values.timeSlot,
        status: "confirmed",
        notes: values.notes || null,
        emergency_contact: null,
        emergency_phone: null,
        insurance_provider: null,
        first_visit: false,
      });

      toast({
        title: "Termin erstellt 📧",
        description:
          "Der Termin wurde erfolgreich erstellt und E-Mail-Benachrichtigungen wurden versendet.",
      });

      form.reset();
      setSelectedDate(undefined);
      setAvailableSlots([]);
    } catch (error) {
      console.error("Fehler beim Erstellen des Termins:", error);
      toast({
        title: "Fehler",
        description:
          error instanceof Error
            ? error.message
            : "Termin konnte nicht erstellt werden.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="patientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patientenname</FormLabel>
                <FormControl>
                  <Input placeholder="Max Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="patientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="max@beispiel.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="patientPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input placeholder="+49 123 456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Behandlungsart</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Behandlung auswählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
                    Beratungen
                  </div>
                  {consultations.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        {service.name} ({service.duration} Min) - €
                        {service.price}
                      </div>
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1 text-sm font-medium text-muted-foreground mt-2">
                    Kälteanwendungen
                  </div>
                  {coolingTreatments.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex items-center gap-2">
                        <Snowflake className="h-4 w-4" />
                        {service.name} ({service.duration} Min) - €
                        {service.price}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Datum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd.MM.yyyy", { locale: de })
                        ) : (
                          <span>Datum auswählen</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={onDateChange}
                      disabled={(date) =>
                        date < new Date() || date.getDay() === 0
                      }
                      initialFocus
                      locale={de}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedDate && (
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uhrzeit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Uhrzeit auswählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableSlots.map((slot) => (
                        <SelectItem
                          key={slot.time}
                          value={slot.time}
                          disabled={!slot.available}
                        >
                          {slot.time} {!slot.available && "(Belegt)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notizen (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Zusätzliche Informationen zum Termin..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Termin wird erstellt..." : "Termin erstellen"}
        </Button>
      </form>
    </Form>
  );
}
