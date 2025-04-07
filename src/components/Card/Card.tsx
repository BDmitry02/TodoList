import { DeleteIcon } from "@/helpers/icons/DeleteIcon";
import { VoidFunc } from "@/helpers/types/getter-setter-functions";
import { Todo } from "@/helpers/types/todo";

interface CardProps {
    todo: Todo;
    onDelete: VoidFunc<number>;
}

export function Card({ todo, onDelete }: CardProps) {
    return (
        <div className="bg-card flex rounded-md h-16 p-4 justify-between items-center ">
            <p className="text-foreground">{todo.title}</p>
            <button
                className="p-2 rounded-md cursor-pointer transition-colors duration-300"
                onClick={() => onDelete(todo.id)}
            >
                <DeleteIcon />
            </button>
        </div>
    );
}
