import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Bulk Mailer",
  description: "Send Bulk Mails at once",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="flex min-h-screen flex-col items-center p-24 h-full">
            <p className="text-3xl font-bold font-open-sans mb-8">Bulk ~ Mailer</p>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
