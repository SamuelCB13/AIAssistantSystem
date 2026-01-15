"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className="bg-[#040609] border-b border-neutral-800 h-16 flex justify-between items-center px-4 sm:px-6 lg:px-10">
            <nav className="w-full text-white max-w-7xl flex flex-wrap items-center justify-between mx-auto relative">
                {/* Logo y nombre */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.svg"
                        alt="Logo de la aplicación"
                        width={100}
                        height={100}
                        quality={75}
                    />
                </Link>

                {/* Sección de redes sociales y menú móvil */}
                <section className="flex items-center justify-center space-x-3 sm:space-x-5">
                    {/* Redes sociales - ocultas en móvil muy pequeño */}
                    <div className="hidden sm:flex items-center space-x-10">
                        <Link
                            href="/"
                            className="text-white hover:text-primary transition-colors duration-200 font-medium"
                        >
                            Asistentes
                        </Link>
                    </div>

                    {/* Botón hamburguesa para móvil */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors duration-200"
                        aria-controls="navbar-menu"
                        aria-expanded={isMenuOpen}
                        aria-label="Abrir menú de navegación"
                    >
                        <span className="sr-only">Abrir menú principal</span>
                        <MenuIcon className="size-7" />
                    </button>
                </section>

                {/* Menú móvil desplegable */}
                <div
                    className={`${isMenuOpen ? "block" : "hidden"
                        } absolute top-16 left-0 w-full bg-[#040609] border border-neutral-800 rounded-lg lg:hidden z-50 animate-fadeOut`}
                    id="navbar-menu"
                >
                    <nav className="flex flex-col p-4 space-y-4">
                        <Link
                            href="/"
                            className="text-neutral-600 focus:text-white transition-colors duration-200 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Asistentes
                        </Link>
                    </nav>
                </div>
            </nav>
        </section>
    );
}
