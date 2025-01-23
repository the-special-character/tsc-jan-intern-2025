import React, { memo } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const TodoItem = ({ todoItem, deleteTodo, updateTodo }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <Checkbox
          id="is-done"
          checked={todoItem.isDone}
          onCheckedChange={(val) => updateTodo({ ...todoItem, isDone: val })}
        />
        <Label htmlFor="is-done" className="sr-only">
          Simple checkbox
        </Label>
      </div>
      <p
        className={cn("flex-1", {
          "line-through": todoItem.isDone,
        })}
      >
        {todoItem.todoText}
      </p>
      <Button onClick={() => deleteTodo(todoItem)}>Delete</Button>
    </div>
  );
};

export default memo(TodoItem);
