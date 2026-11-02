import type { Metadata } from "next";
import { Space_Grotesk, Oswald, Bebas_Neue, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { NavigationLoadingBar } from "@/components/navigation/NavigationLoadingBar";
import { PublicPortalsFloatingDock } from "@/components/navigation/PublicPortalsFloatingDock";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Estates | Luxury Real Estate & Design System",
  description: "High-end property showcase and reusable design architecture",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${oswald.variable} ${bebasNeue.variable} ${orbitron.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('real-estate-theme');
                let theme = 'light';
                if (stored) {
                  const parsed = JSON.parse(stored);
                  if (parsed && parsed.state && parsed.state.theme) {
                    theme = parsed.state.theme;
                  }
                }
                const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          <NavigationLoadingBar />
          {children}
          <PublicPortalsFloatingDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
