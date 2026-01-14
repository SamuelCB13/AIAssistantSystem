import AssistantCardSkeleton from "./AssistantCardSkeleton";

export function AssistantListSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <AssistantCardSkeleton />
            <AssistantCardSkeleton />
            <AssistantCardSkeleton />
        </div>
    );
}
