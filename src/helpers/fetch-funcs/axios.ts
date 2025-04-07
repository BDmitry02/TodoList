import axios from "axios";
import { Todo } from "@/helpers/types/todo";

export async function fetchGet(url: string) {
    const res = await axios.get(url);
    return res.data;
}

export async function fetchDelete(url: string) {
    const res = await axios.delete(url);
    return res.data;
}

export async function fetchPost(url: string, payload: Todo) {
    const res = await axios.post(url, payload);
    return res.data;
}
