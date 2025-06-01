import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ReduxProvider from "@/redux/provider";



export const metadata: Metadata = {
  title: "Mobile Recharge",
  description: "Recharge your mobile easily and quickly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased bg-gray-100"
      >
        <ReduxProvider>
          <Header />
          <main className="bg-gray-100">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
