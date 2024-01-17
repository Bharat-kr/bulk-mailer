import "./globals.css";
import { Providers } from "./Providers";
import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "../../public/BungeeSpice-Regular.ttf" });

export const metadata = {
  title: "Mail Bomber",
  description: "A mail scheduler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC] dark:from-[#03071e] dark:to-[#000814]">
        <Providers>
          <main className="flex min-h-screen flex-col items-center px-12 md:px-24 py-8 h-full">
            <h1
              className={`text-5xl text-blue-600 mb-8 dark:text-white ${myFont.className}`}
            >
              Mail Bomber
            </h1>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
