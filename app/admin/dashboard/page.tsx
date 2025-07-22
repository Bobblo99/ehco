"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentList } from "@/components/admin/appointment-list";
import { AppointmentForm } from "@/components/admin/appointment-form";
import { AvailabilityManager } from "@/components/admin/availability-manager";
import { AdminStats } from "@/components/admin/admin-stats";
import { LogOut, Calendar, Clock, Users, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isAuthenticated, signOutAdmin } from "@/lib/auth";

export default function AdminDashboard() {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, [router]);

  const checkAuth = async () => {
    try {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/admin/login");
      } else {
        setIsAuthenticatedState(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutAdmin();
      toast({
        title: "Abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet.",
      });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!isAuthenticatedState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Alpha Cooling Professional - Terminverwaltung
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Übersicht
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Termine
            </TabsTrigger>
            <TabsTrigger
              value="availability"
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Verfügbarkeit
            </TabsTrigger>
            <TabsTrigger
              value="new-appointment"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Neuer Termin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats />

            {/* Ausstehende Termine */}
            <Card>
              <CardHeader>
                <CardTitle>Ausstehende Termine</CardTitle>
                <CardDescription>
                  Termine, die noch bestätigt werden müssen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentList filter="pending" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Heutige Termine</CardTitle>
                <CardDescription>
                  Übersicht über alle Termine für heute
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentList filter="today" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alle Termine</CardTitle>
                <CardDescription>
                  Verwalten Sie alle gebuchten Termine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentList filter="all" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verfügbarkeit verwalten</CardTitle>
                <CardDescription>
                  Legen Sie verfügbare Zeiten fest
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AvailabilityManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new-appointment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Neuen Termin erstellen</CardTitle>
                <CardDescription>
                  Erstellen Sie einen neuen Termin für einen Kunden
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
