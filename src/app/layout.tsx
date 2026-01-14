import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@pheralb/toast";
import { XIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "AI Assistent System | Crea, lista, edita, elimina y entrena tus propios asistentes de IA",
    keywords: ["ai", "ia", "assistant", "system", "asistente", "inteligencia artificial", "chatbot", "modelo de lenguaje", "custom ai assistant"],
    description: "AI Assistent System es una plataforma que te permite crear, listar, editar, eliminar y entrenar tus propios asistentes de inteligencia artificial personalizados para diversas aplicaciones.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                {/* Contenido principal */}
                <div className="flex flex-col flex-1 h-dvh">
                    <Navbar />
                    <main className="flex-1 overflow-y-scroll bg-dark">
                        {children}
                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                                animationOnClose: "swipe",
                                defaultCloseContent: <XIcon />,
                                classNames: {
                                    toast: "toast-dark",
                                }
                            }}
                        />
                        <Footer />
                    </main>
                </div>
            </body>
        </html>
    );
}
