"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { Card } from "@/components/Card/Card";
import { Todo } from "@/helpers/types/todo";
import {
    addTodo,
    removeTodo,
    getTodos,
} from "@/helpers/funcs/query-client-funcs";
import { deleteTodo, postTodo } from "@/components/TodoList/TodoList.funcs";
import { queryClientKeys } from "@/helpers/constants/query-client-keys";

export function TodoList() {
    const [todos, setTodos] = useState<Todo[]>();
    const [inputValue, setInputValue] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const { data } = useQuery<Todo[]>({
        queryKey: [queryClientKeys.todos],
        queryFn: getTodos,
    });

    const postMutation = useMutation({
        mutationFn: (newTodo: Todo) => {
            return addTodo(newTodo);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => {
            return removeTodo(id);
        },
    });

    useEffect(() => {
        setTodos(data);
    }, [data]);

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!todos || !inputValue.trim()) return;

        postTodo(
            todos,
            inputValue,
            setTodos,
            setInputValue,
            postMutation,
            enqueueSnackbar
        );
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    const onDeleteTodo = useCallback(
        (id: number) => {
            if (!todos) return;
            deleteTodo(id, todos, setTodos, deleteMutation, enqueueSnackbar);
        },
        [todos, deleteMutation, enqueueSnackbar]
    );

    return (
        <div className="flex flex-col p-4 size-full items-center justify-center">
            <div className="flex flex-col gap-4 p-4 w-full">
                {todos
                    ? todos.map((todo) => (
                          <Fragment key={todo.id}>
                              <Card todo={todo} onDelete={onDeleteTodo} />
                          </Fragment>
                      ))
                    : Array.from({ length: 10 }).map((_, index) => (
                          <Skeleton key={index} />
                      ))}
            </div>
            <form
                className="flex gap-4 p-4 items-center justify-center w-full"
                onSubmit={onFormSubmit}
            >
                <input
                    value={inputValue}
                    onChange={onInputChange}
                    type="text"
                    name="title"
                    placeholder="Add a new todo"
                    className="border-2 border-card rounded-md p-2 w-full placeholder:text-card focus:bg-transparent bg-transparent"
                />
                <button
                    type="submit"
                    disabled={postMutation.isPending}
                    className="bg-transparent border-card border-2 rounded-md w-24 p-2 hover:bg-foreground/50 cursor-pointer transition-colors duration-300"
                >
                    {postMutation.isPending ? "Adding..." : "Add"}
                </button>
            </form>
        </div>
    );
}
