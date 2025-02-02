import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import "@/styles/react-quill.css";
// import QuillStyles from "./lesson-plans/quill-styles";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Teacher Dashboard",
  description: "A web-based dashboard for teachers to manage their tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          {/* <QuillStyles /> */}
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
