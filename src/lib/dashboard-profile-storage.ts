export const DASHBOARD_PROFILE_STORAGE_KEY = "aldar-dashboard-profile";

export type StoredDashboardProfile = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatarDataUrl: string | null;
};

export const defaultDashboardProfile: StoredDashboardProfile = {
  fullName: "Prof. Mahmoud Abdel Azeem",
  email: "mahmoud@aldar.example.com",
  phone: "+966 50 000 0000",
  role: "Director",
  department: "Executive Leadership",
  avatarDataUrl: null,
};

export function readStoredDashboardProfile(): StoredDashboardProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DASHBOARD_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredDashboardProfile;
  } catch {
    return null;
  }
}

export function initialsFromName(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "—"
  );
}

export const PROFILE_UPDATED_EVENT = "aldar-dashboard-profile-updated";
