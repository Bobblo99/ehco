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
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
                Admin Dashboard
              </h1>
              <p className="text-sm md:text-base text-gray-600 hidden sm:block">
                Alpha Cooling Professional - Terminverwaltung
              </p>
              <p className="text-xs text-gray-600 sm:hidden">
                ACP Terminverwaltung
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-1 md:gap-2 text-sm md:text-base px-2 md:px-4"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Abmelden</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger
              value="overview"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Übersicht</span>
              <span className="sm:hidden">Start</span>
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm"
            >
              <Users className="h-4 w-4" />
              Termine
            </TabsTrigger>
            <TabsTrigger
              value="availability"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Verfügbarkeit</span>
              <span className="sm:hidden">Zeit</span>
            </TabsTrigger>
            <TabsTrigger
              value="new-appointment"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Neuer Termin</span>
              <span className="sm:hidden">Neu</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <AdminStats />

            {/* Ausstehende Termine */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Ausstehende Termine
                </CardTitle>
                <CardDescription className="text-sm">
                  Termine, die noch bestätigt werden müssen
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <AppointmentList filter="pending" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Heutige Termine
                </CardTitle>
                <CardDescription className="text-sm">
                  Übersicht über alle Termine für heute
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <AppointmentList filter="today" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Alle Termine
                </CardTitle>
                <CardDescription className="text-sm">
                  Verwalten Sie alle gebuchten Termine
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <AppointmentList filter="all" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Verfügbarkeit verwalten
                </CardTitle>
                <CardDescription className="text-sm">
                  Legen Sie verfügbare Zeiten fest
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <AvailabilityManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="new-appointment"
            className="space-y-4 md:space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Neuen Termin erstellen
                </CardTitle>
                <CardDescription className="text-sm">
                  Erstellen Sie einen neuen Termin für einen Kunden
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <AppointmentForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
