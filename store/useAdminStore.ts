import { create } from "zustand";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  accessLevel: "Super Admin" | "Senior Partner" | "Listing Director";
  initials: string;
  avatarBg: string;
}

interface AdminState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  unreadNotifications: number;
  login: (email: string, role?: string, name?: string) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  markNotificationsAsRead: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: true,
  user: {
    id: "usr-1",
    name: "Alexander Vance",
    email: "a.vance@auraestates.com",
    role: "Managing Principal",
    accessLevel: "Super Admin",
    initials: "AV",
    avatarBg: "bg-brand-gold text-brand-charcoal",
  },
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  unreadNotifications: 3,

  login: (email: string, role = "Managing Principal", name = "Alexander Vance") => {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    set({
      isAuthenticated: true,
      user: {
        id: `usr-${Date.now()}`,
        name,
        email,
        role,
        accessLevel: "Super Admin",
        initials,
        avatarBg: "bg-brand-gold text-brand-charcoal",
      },
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  setMobileSidebarOpen: (open: boolean) => {
    set({ mobileSidebarOpen: open });
  },

  markNotificationsAsRead: () => {
    set({ unreadNotifications: 0 });
  },
}));

