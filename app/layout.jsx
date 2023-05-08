"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "./components/header";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head className="dark" />
            <body className="h-screen relative dark:bg-dark-blue-main dark:text-white">
                <SessionProvider>
                    <Header></Header>
                    <main className="max-w-[1440px] mx-auto px-[1rem] w-full h-full overflow-hidden">
                        {children}
                    </main>
                </SessionProvider>

                <div id="terminal"></div>
            </body>
        </html>
    );
}
