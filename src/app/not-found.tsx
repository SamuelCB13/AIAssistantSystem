'use client';

import { HomeIcon, MoveLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex items-center justify-center px-6 min-h-[92vh]">
            <div className="max-w-md w-full text-center border border-primary/20 rounded-xl bg-linear-to-br from-primary/5 to-primary/20 p-10 shadow-2xl space-y-5">
                <h1 className="text-8xl font-extrabold text-[#ff3b6f] leading-none">
                    404
                </h1>

                <h2 className="text-2xl font-semibold text-white">
                    Página no encontrada
                </h2>

                <p className="text-sm text-gray-400">
                    La página que estás buscando no existe o fue movida.
                    <br />
                    Revisa la URL, vuelve a la página anterior o al inicio.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 bg-primary text-white hover:bg-primary/40 transition duration-200 px-5 py-2 rounded-lg font-semibold text-sm xl:text-base w-full md:w-auto justify-center cursor-pointer"
                    >
                        <HomeIcon className="size-4 md:size-5" />
                        Ir al inicio
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-white bg-black hover:bg-neutral-800 transition duration-200 px-5 py-2 rounded-lg font-semibold text-xs xl:text-sm justify-center border border-neutral-800 cursor-pointer"
                    >
                        <MoveLeftIcon className="" />
                        Volver atrás
                    </button>
                </div>

            </div>
        </main>
    );
}
