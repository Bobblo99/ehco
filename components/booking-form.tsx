"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  CalendarIcon,
  Clock,
  CheckCircle,
  Snowflake,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  getServiceById,
  getAvailableTimeSlots,
  createAppointment,
} from "@/lib/db/database";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name muss mindestens 2 Zeichen haben." }),
  email: z
    .string()
    .email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  phone: z
    .string()
    .min(10, { message: "Bitte geben Sie eine gültige Telefonnummer ein." }),
  serviceType: z.string({
    required_error: "Bitte wählen Sie eine Behandlungsart aus.",
  }),
  date: z.date({ required_error: "Bitte wählen Sie ein Datum aus." }),
  timeSlot: z.string({ required_error: "Bitte wählen Sie eine Uhrzeit aus." }),
  message: z.string().optional(),
  insuranceProvider: z.string().optional(),
  firstVisit: z.enum(["yes", "no"], {
    required_error: "Bitte geben Sie an, ob dies Ihr erster Besuch ist.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );
  const [availableSlots, setAvailableSlots] = useState<
    Array<{ time: string; available: boolean }>
  >([]);
  const { toast } = useToast();

  const { consultations, coolingTreatments } = getServicesByCategory();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      insuranceProvider: "",
      firstVisit: "no",
    },
  });

  const onServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    form.setValue("serviceType", serviceId);

    // Wenn ein Datum bereits ausgewählt ist, Zeitslots neu laden
    if (selectedDate) {
      loadAvailableSlots(selectedDate);
    }
  };

  const onDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      loadAvailableSlots(date);
      form.setValue("date", date);
      // Zeitslot zurücksetzen wenn Datum geändert wird
      form.setValue("timeSlot", "");
    }
  };

  const loadAvailableSlots = async (date: Date) => {
    try {
      console.log(
        "🔍 Lade verfügbare Zeitslots für:",
        format(date, "yyyy-MM-dd")
      );
      const slots = await getAvailableTimeSlots(date);
      console.log("📅 Erhaltene Slots:", slots);
      console.log(
        "✅ Verfügbare Slots:",
        slots.filter((s) => s.available).map((s) => s.time)
      );
      console.log(
        "❌ Blockierte Slots:",
        slots.filter((s) => !s.available).map((s) => s.time)
      );
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

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      console.log("🚀 Starte Terminbuchung mit Daten:", values);

      const service = getServiceById(values.serviceType);
      if (!service) {
        throw new Error("Service nicht gefunden");
      }

      console.log("📋 Service gefunden:", service);

      const appointmentData = {
        patient_name: values.name,
        patient_email: values.email,
        patient_phone: values.phone,
        service_id: values.serviceType,
        service_name: service.name,
        duration: service.duration,
        price: service.price,
        date: format(values.date, "yyyy-MM-dd"),
        time_slot: values.timeSlot,
        status: "pending" as const,
        notes: values.message || null,
        emergency_contact: null,
        emergency_phone: null,
        insurance_provider: values.insuranceProvider || null,
        first_visit: values.firstVisit === "yes",
      };

      console.log("💾 Speichere Termin:", appointmentData);

      const result = await createAppointment(appointmentData);

      console.log("✅ Termin erfolgreich erstellt:", result);

      toast({
        title: "Termin erfolgreich gebucht! 📧",
        description: `Ihr ${service?.name} Termin wurde für den ${format(
          values.date,
          "dd.MM.yyyy",
          { locale: de }
        )} um ${
          values.timeSlot
        } gebucht. Sie erhalten eine Bestätigungs-E-Mail.`,
      });

      form.reset();
      setSelectedDate(undefined);
      setSelectedService(undefined);
      setAvailableSlots([]);
    } catch (error) {
      console.error("❌ Buchungsfehler:", error);
      console.error("Buchungsfehler:", error);
      toast({
        title: "Fehler beim Buchen",
        description:
          error instanceof Error
            ? error.message
            : "Termin konnte nicht gebucht werden.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* === SERVICE-AUSWAHL === */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Wählen Sie Ihre Anwendung
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Erstberatung */}
            {consultations.map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedService === service.id
                    ? "ring-2 ring-yellow-500 bg-yellow-50"
                    : ""
                }`}
                onClick={() => onServiceChange(service.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center pt-0">
                  <span className="text-green-600 font-semibold">
                    Kostenlos
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {service.duration} Min
                  </span>
                </CardContent>
              </Card>
            ))}

            {/* Kälteanwendungen */}
            {coolingTreatments.map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedService === service.id
                    ? "ring-2 ring-yellow-500 bg-yellow-50"
                    : ""
                }`}
                onClick={() => onServiceChange(service.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center pt-0">
                  <span className="text-yellow-600 font-semibold">
                    €{service.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {service.duration} Min
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* === BUCHUNGSFORMULAR === */}
      {selectedService && (
        <Card className="p-6 ring-2 ring-yellow-500 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Termindetails</CardTitle>
            <CardDescription>
              Füllen Sie das Formular aus, um Ihren Termin zu buchen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name & E-Mail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vollständiger Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Max Mustermann" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
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

                {/* Telefon & Krankenkasse */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
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
                    name="insuranceProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Krankenkasse (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ihre Krankenkasse" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Datumsauswahl */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Termin-Datum</FormLabel>
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
                                format(field.value, "dd.MM.yyyy", {
                                  locale: de,
                                })
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
                      <FormDescription>
                        Montag bis Samstag verfügbar.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Uhrzeit-Auswahl */}
                {selectedDate && selectedService && (
                  <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verfügbare Uhrzeiten</FormLabel>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                          {availableSlots.map((slot) => (
                            <Button
                              key={slot.time}
                              type="button"
                              variant={
                                field.value === slot.time
                                  ? "default"
                                  : "outline"
                              }
                              className={cn(
                                "h-10 text-sm",
                                !slot.available &&
                                  "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200",
                                field.value === slot.time &&
                                  "bg-yellow-500 text-black hover:bg-yellow-600"
                              )}
                              disabled={!slot.available}
                              onClick={() => field.onChange(slot.time)}
                            >
                              {slot.available ? slot.time : `${slot.time} ✗`}
                              {field.value === slot.time && (
                                <CheckCircle className="ml-1 h-3 w-3" />
                              )}
                            </Button>
                          ))}
                        </div>
                        <FormDescription>
                          {availableSlots.filter((s) => s.available).length > 0
                            ? `${
                                availableSlots.filter((s) => s.available).length
                              } verfügbare Zeitslots`
                            : "Keine verfügbaren Zeitslots für dieses Datum"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Erstbesuch Auswahl */}
                <FormField
                  control={form.control}
                  name="firstVisit"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Ist dies Ihr erster Besuch?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Ja</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">Nein</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Zusatzinfo */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zusätzliche Informationen</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Bitte geben Sie Details zu Ihrem Zustand oder spezielle Anforderungen an."
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Termin wird gebucht...
                    </>
                  ) : (
                    "Termin buchen"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
