'use client'
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Header from '@/components/layout/Header'
import LandingHeader from "@/components/layout/LandingHeader";
import { ThemeProvider } from "next-themes"
import { loadStripe } from '@stripe/stripe-js';
import Sidebar from '@/components/layout/Sidebar';
import { usePathname } from 'next/navigation'

const fustat = localFont({
  src: "./fonts/Fustat.woff2",
  variable: "--font-fustat",
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const isRootPage = pathname === '/'

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fustat.variable} font-fustat bg-gray-100 dark:bg-gray-900`}>


          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {isRootPage ? <LandingHeader /> : <Header />}
            <SignedIn>
              <div className="flex">
                {!isRootPage && <Sidebar />}
                {children}
              </div>
            </SignedIn>
            <SignedOut>
              {children}
            </SignedOut>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
