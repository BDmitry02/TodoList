"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { getQueryClient } from "@/helpers/query-client/query-client";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const queryClient = getQueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider autoHideDuration={800}>
                    {children}
                </SnackbarProvider>
            </QueryClientProvider>
        </>
    );
}
