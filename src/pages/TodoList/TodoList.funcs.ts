import { UseMutationResult } from "@tanstack/react-query";
import { EnqueueSnackbar } from "notistack";
import { errorMessages, successMessages } from "@/helpers/constants/messages";
import { snackbarVariants } from "@/helpers/constants/snackbar-variants";
import { SetStateFunc } from "@/helpers/types/getter-setter-functions";
import { Todo } from "@/helpers/types/todo";

export function postTodo(
    todos: Todo[],
    inputValue: string,
    setTodos: SetStateFunc<Todo[] | undefined>,
    setInputValue: SetStateFunc<string>,
    postMutation: UseMutationResult<unknown, Error, Todo, unknown>,
    enqueueSnackbar: EnqueueSnackbar
) {
    const newTodo: Todo = {
        userId: 1,
        id: todos[todos.length - 1]?.id + 1 || 1,
        title: inputValue,
        completed: false,
    };

    const prevTodos = [...todos];

    setTodos((prev) => [...(prev || []), newTodo]);
    setInputValue("");

    postMutation.mutateAsync(newTodo, {
        onError: (e) => {
            setTodos(prevTodos);

            const error =
                e instanceof Error
                    ? e
                    : { message: errorMessages.uncaughtError };

            enqueueSnackbar(error.message, {
                variant: snackbarVariants.error,
            });
        },
        onSuccess: () => {
            enqueueSnackbar(successMessages.todoAdded, {
                variant: snackbarVariants.success,
            });
        },
    });
}

export function deleteTodo(
    id: number,
    todos: Todo[],
    setTodos: SetStateFunc<Todo[] | undefined>,
    deleteMutation: UseMutationResult<unknown, Error, number, unknown>,
    enqueueSnackbar: EnqueueSnackbar
) {
    const prevTodos = [...todos];

    setTodos((prev) => prev?.filter((todo) => todo.id !== id));

    deleteMutation.mutateAsync(id, {
        onError: (e) => {
            setTodos(prevTodos);

            const error =
                e instanceof Error
                    ? e
                    : { message: errorMessages.uncaughtError };

            enqueueSnackbar(error.message, {
                variant: snackbarVariants.error,
            });
        },
        onSuccess: () => {
            enqueueSnackbar(successMessages.todoDeleted, {
                variant: snackbarVariants.success,
            });
        },
    });
}
