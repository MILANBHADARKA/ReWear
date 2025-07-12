import { Inter } from "next/font/google";
import "./globals.css";

import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { MetaMaskProvider } from "@/context/MetaMaskProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReWear - Community Clothing Exchange",
  description: "Sustainable fashion through community clothing exchange",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <UserProvider>
            <MetaMaskProvider>
            {children}
            </MetaMaskProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
