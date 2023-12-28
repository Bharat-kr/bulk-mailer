import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bulk Mailer",
  description: "Send Bulk Mails at once",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}