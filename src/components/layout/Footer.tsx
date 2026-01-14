"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <section>
            <footer className="bg-[#040609] text-white border-t border-neutral-800">
                <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-5">
                    {/* Logo y nombre */}
                    <Link href="/" className=" flex-1 flex items-center justify-center">
                        <Image
                            src="/logo.svg"
                            alt="Logo de la aplicación"
                            width={100}
                            height={100}
                            quality={75}
                        />
                    </Link>

                    {/* Menú de navegación */}
                    <div
                        className=" flex-1 hidden items-center justify-center w-full lg:flex md:w-auto md:order-1 z-40"
                        id="navbar-menu"
                    >
                        <ul className="flex flex-col font-bold py-2 md:p-0 mt-6 border border-neutral-800 rounded-xl bg-[#040609] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent text-xl">
                            <p>— AI Assistent System —</p>
                        </ul>
                    </div>
                </div>
                <div className="max-w-5xl flex items-center justify-center mx-auto p-5 border-t border-neutral-800">
                    <p className="text-sm text-neutral-500 text-center">
                        © {new Date().getFullYear()} AI Assistent System | Desarrollado por →{" "} <Link href={"https://samuel-c.vercel.app"} className="text-orange-500 hover:text-white transition-colors" target="_blank">Samuel C.</Link>
                    </p>
                </div>
            </footer>
        </section>
    );
}
