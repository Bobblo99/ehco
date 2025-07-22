import { supabase } from "./db/supabase";

export interface AdminUser {
  id: string;
  email: string;
  role: "admin";
}

// Admin-Anmeldung
export async function signInAdmin(
  email: string,
  password: string
): Promise<AdminUser | null> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Anmeldung fehlgeschlagen:", error.message);
      return null;
    }

    if (data.user) {
      return {
        id: data.user.id,
        email: data.user.email!,
        role: "admin",
      };
    }

    return null;
  } catch (error) {
    console.error("Anmeldung fehlgeschlagen:", error);
    return null;
  }
}

// Admin-Abmeldung
export async function signOutAdmin(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Abmeldung fehlgeschlagen:", error);
  }
}

// Aktuellen Admin-Benutzer abrufen
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return {
        id: user.id,
        email: user.email!,
        role: "admin",
      };
    }

    return null;
  } catch (error) {
    console.error("Fehler beim Abrufen des Benutzers:", error);
    return null;
  }
}

// Prüfen ob Benutzer angemeldet ist
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentAdmin();
  return user !== null;
}
