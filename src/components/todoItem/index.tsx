import React, { memo } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const TodoItem = ({ todoItem, deleteTodo }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <Checkbox id="is-done" />
        <Label htmlFor="is-done" className="sr-only">
          Simple checkbox
        </Label>
      </div>
      <p className="flex-1">{todoItem.todoText}</p>
      <Button onClick={() => deleteTodo(todoItem)}>Delete</Button>
    </div>
  );
};

export default memo(TodoItem);
