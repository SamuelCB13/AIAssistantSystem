export default function AssistantCardSkeleton() {
    return (
        <section className="border border-neutral-700 rounded-xl p-5 space-y-6 animate-pulse">
            <header className="flex items-center gap-2 md:gap-3">
                <div className="p-2 bg-neutral-700 rounded-full">
                    <div className="size-4 md:size-5 bg-neutral-700 rounded-full" />
                </div>
                <div className="h-5 md:h-6 bg-neutral-700 rounded w-full" />
            </header>

            <article className="space-y-2">
                <div className="h-4 bg-neutral-700 rounded w-full" />
                <div className="h-4 bg-neutral-700 rounded w-full" />
                <div className="h-4 bg-neutral-700 rounded w-full" />
            </article>

            <article className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-4 bg-neutral-700 rounded-full" />
                    <div className="h-4 bg-neutral-700 rounded w-32" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="size-4 bg-neutral-700 rounded-full" />
                    <div className="h-4 bg-neutral-700 rounded w-40" />
                </div>
            </article>

            <hr className="text-neutral-800 rounded-full" />

            <footer className="flex items-center gap-4 md:gap-5">
                <div className="bg-neutral-700 rounded h-6 w-full" />
                <div className="bg-neutral-700 rounded h-6 w-full" />
            </footer>
        </section>
    )
}
