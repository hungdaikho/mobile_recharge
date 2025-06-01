import React from 'react';
import type { Metadata } from 'next';
import "../globals.css";
import ReduxProvider from "@/redux/provider";

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin management interface',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-100">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
} 