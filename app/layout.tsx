import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/shadcn/cn";
import { poppins, shiliguri } from "@/lib/shadcn/fonts";
import { Constants } from "@/utils/constants";

export const metadata: Metadata = {
  title: `${Constants.META_NAME} - ${Constants.META_TITLE}`,
  description: Constants.META_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${shiliguri.variable}`}
      suppressHydrationWarning
    >
      <body
        className={cn("flex min-h-screen flex-col bg-background antialiased")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
