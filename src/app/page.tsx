import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTodos } from "@/helpers/funcs/query-client-funcs";
import { getQueryClient } from "@/helpers/query-client/query-client";
import { TodoList } from "@/pages/TodoList/TodoList";
import { queryClientKeys } from "@/helpers/constants/query-client-keys";

export default async function Home() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: [queryClientKeys.todos],
        queryFn: getTodos,
    });

    return (
        <main className="flex-1">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TodoList />
            </HydrationBoundary>
        </main>
    );
}
