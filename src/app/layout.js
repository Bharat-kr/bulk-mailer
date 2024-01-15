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
          <main className="flex min-h-screen flex-col items-center px-24 py-8 h-full">
            <p className="text-5xl text-blue-600 font-rubik-burned mb-8 font-bold dark:text-white">
              Mail Bomber
            </p>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
