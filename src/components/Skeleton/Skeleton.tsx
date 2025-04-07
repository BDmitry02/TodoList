export function Skeleton() {
    return (
        <div className="bg-card flex rounded-md h-16 p-4 justify-between items-center animate-pulse-fast">
            <div className="h-4 w-3/4 bg-muted rounded"></div>
            <div className="h-8 w-8 bg-muted rounded-md"></div>
        </div>
    );
}
