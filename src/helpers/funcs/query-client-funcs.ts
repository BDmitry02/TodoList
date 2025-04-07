import { endpoints } from "@/helpers/constants/endpoints";
import { fetchDelete, fetchGet, fetchPost } from "@/helpers/fetch-funcs/axios";
import { Todo } from "@/helpers/types/todo";
import { combineEndpoints } from "@/helpers/funcs/combine-endpoints";

export async function getTodos() {
    const res = await fetchGet(endpoints.get);
    return res;
}

export async function addTodo(todo: Todo) {
    const res = await fetchPost(endpoints.post, todo);
    return res;
}

export async function removeTodo(id: number) {
    const endpoint = combineEndpoints(endpoints.delete, id);

    const res = await fetchDelete(endpoint);

    return res;
}
