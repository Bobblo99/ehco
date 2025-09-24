"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Snowflake,
  MessageCircle,
  Check,
  X,
  Clock,
} from "lucide-react";
import {
  getAppointments,
  deleteAppointment,
  updateAppointment,
  getServiceById,
  type Appointment,
} from "@/lib/db/database";
import { Card } from "../ui/card";

interface AppointmentListProps {
  filter: "all" | "today" | "upcoming" | "pending";
}

export function AppointmentList({ filter }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAppointments();
  }, [filter]);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await getAppointments(filter);
      setAppointments(data);
    } catch (error) {
      console.error("Fehler beim Laden der Termine:", error);
      toast({
        title: "Fehler",
        description: "Termine konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Sind Sie sicher, dass Sie diesen Termin löschen möchten?")) {
      try {
        await deleteAppointment(id);
        await loadAppointments();
        toast({
          title: "Termin gelöscht",
          description: "Der Termin wurde erfolgreich gelöscht.",
        });
      } catch (error) {
        console.error("Fehler beim Löschen:", error);
        toast({
          title: "Fehler",
          description: "Termin konnte nicht gelöscht werden.",
          variant: "destructive",
        });
      }
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "confirmed" | "cancelled" | "completed"
  ) => {
    try {
      // 1. DB-Update
      await updateAppointment(id, { status: newStatus });
      await loadAppointments();

      // 2. Wenn bestätigt → Mail senden
      if (newStatus === "confirmed") {
        const appointment = appointments.find((a) => a.id === id);
        if (appointment) {
          await fetch("/api/appointment-confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              patientName: appointment.patient_name,
              patientEmail: appointment.patient_email,
              serviceName: appointment.service_name,
              date: appointment.date,
              timeSlot: appointment.time_slot,
            }),
          });
        }
      }

      const statusMessages = {
        confirmed: "Termin wurde bestätigt (Kunde informiert)",
        cancelled: "Termin wurde abgesagt",
        completed: "Termin wurde als abgeschlossen markiert",
      };

      toast({
        title: "Status geändert",
        description: statusMessages[newStatus],
      });
    } catch (error) {
      console.error("Fehler beim Ändern des Status:", error);
      toast({
        title: "Fehler",
        description: "Status konnte nicht geändert werden.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: {
        label: "Bestätigt",
        variant: "default" as const,
        color: "text-green-600",
      },
      pending: { label: "Ausstehend", variant: "secondary" as const },
      cancelled: { label: "Abgesagt", variant: "destructive" as const },
      completed: {
        label: "Abgeschlossen",
        variant: "outline" as const,
        color: "text-blue-600",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getServiceIcon = (serviceId: string) => {
    const service = getServiceById(serviceId);
    if (service?.category === "consultation") {
      return <MessageCircle className="h-4 w-4 text-blue-500" />;
    }
    return <Snowflake className="h-4 w-4 text-blue-500" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Keine Termine gefunden.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">
                    {appointment.patient_name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {appointment.patient_email}
                  </div>
                </div>
                {getStatusBadge(appointment.status)}
              </div>

              <div className="flex items-center gap-2 text-sm">
                {getServiceIcon(appointment.service_id)}
                <span className="font-medium">{appointment.service_name}</span>
                <span className="text-muted-foreground">
                  ({appointment.duration} Min)
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-medium">
                    {format(new Date(appointment.date), "dd.MM.yyyy", {
                      locale: de,
                    })}
                  </div>
                  <div className="text-muted-foreground">
                    {appointment.time_slot}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Status-Aktionen */}
                  {appointment.status === "pending" && (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 p-1"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Termin bestätigen
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Möchten Sie den Termin von{" "}
                              {appointment.patient_name} bestätigen?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleStatusChange(appointment.id, "confirmed")
                              }
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Bestätigen
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Termin absagen</AlertDialogTitle>
                            <AlertDialogDescription>
                              Möchten Sie den Termin von{" "}
                              {appointment.patient_name} absagen?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleStatusChange(appointment.id, "cancelled")
                              }
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Absagen
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}

                  {appointment.status === "confirmed" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 p-1"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Termin abschließen
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Möchten Sie den Termin von{" "}
                            {appointment.patient_name} als abgeschlossen
                            markieren?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleStatusChange(appointment.id, "completed")
                            }
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Abschließen
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Termindetails</DialogTitle>
                        <DialogDescription>
                          Vollständige Informationen zum Termin
                        </DialogDescription>
                      </DialogHeader>
                      {selectedAppointment && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Patient</h4>
                            <p>{selectedAppointment.patient_name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {selectedAppointment.patient_email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {selectedAppointment.patient_phone}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">Behandlung</h4>
                            <div className="flex items-center gap-2 mb-1">
                              {getServiceIcon(selectedAppointment.service_id)}
                              <span>{selectedAppointment.service_name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {selectedAppointment.duration} Minuten
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium">Termin</h4>
                            <p>
                              {format(
                                new Date(selectedAppointment.date),
                                "dd.MM.yyyy",
                                { locale: de }
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedAppointment.time_slot}
                            </p>
                          </div>
                          {selectedAppointment.notes && (
                            <div>
                              <h4 className="font-medium">Notizen</h4>
                              <p className="text-sm">
                                {selectedAppointment.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(appointment.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum & Zeit</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Behandlung</TableHead>
              <TableHead>Dauer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {format(new Date(appointment.date), "dd.MM.yyyy", {
                        locale: de,
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.time_slot}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {appointment.patient_name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.patient_email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getServiceIcon(appointment.service_id)}
                    <div>
                      <div className="font-medium">
                        {appointment.service_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getServiceById(appointment.service_id)?.category ===
                        "consultation"
                          ? "Beratung"
                          : "Kälteanwendung"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    {appointment.duration} Min
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* Status-Aktionen */}
                    {appointment.status === "pending" && (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Termin bestätigen
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Möchten Sie den Termin von{" "}
                                {appointment.patient_name} bestätigen?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleStatusChange(
                                    appointment.id,
                                    "confirmed"
                                  )
                                }
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Bestätigen
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Termin absagen
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Möchten Sie den Termin von{" "}
                                {appointment.patient_name} absagen?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleStatusChange(
                                    appointment.id,
                                    "cancelled"
                                  )
                                }
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Absagen
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}

                    {appointment.status === "confirmed" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Termin abschließen
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Möchten Sie den Termin von{" "}
                              {appointment.patient_name} als abgeschlossen
                              markieren?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleStatusChange(appointment.id, "completed")
                              }
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Abschließen
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Termindetails</DialogTitle>
                          <DialogDescription>
                            Vollständige Informationen zum Termin
                          </DialogDescription>
                        </DialogHeader>
                        {selectedAppointment && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">Patient</h4>
                              <p>{selectedAppointment.patient_name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {selectedAppointment.patient_email}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {selectedAppointment.patient_phone}
                                </span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">Behandlung</h4>
                              <div className="flex items-center gap-2 mb-1">
                                {getServiceIcon(selectedAppointment.service_id)}
                                <span>{selectedAppointment.service_name}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {selectedAppointment.duration} Minuten
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium">Termin</h4>
                              <p>
                                {format(
                                  new Date(selectedAppointment.date),
                                  "dd.MM.yyyy",
                                  { locale: de }
                                )}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {selectedAppointment.time_slot}
                              </p>
                            </div>
                            {selectedAppointment.notes && (
                              <div>
                                <h4 className="font-medium">Notizen</h4>
                                <p className="text-sm">
                                  {selectedAppointment.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(appointment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
