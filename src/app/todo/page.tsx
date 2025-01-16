"use client";

import TodoItem from "@/components/todoItem";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { log } from "node:console";
import React, { useRef, useState } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const todoTextRef = useRef(null);

  const addTodo = (event) => {
    event.preventDefault();
    const todoText = todoTextRef.current;
    const todoTextValue = todoText.value;
    setTodoList((val) => {
      return [...val, { id: new Date().valueOf(), todoText: todoTextValue }];
    });
    todoText.value = "";
  };

  const deleteTodo = (todoItem) => {
    const index = todoList.findIndex((item) => item.id === todoItem.id);
    setTodoList((val) => [...val.slice(0, index), ...val.slice(index + 1)]);
  };

  return (
    <main className="flex flex-col items-center gap-4 mt-4 h-screen">
      <h1 className="text-3xl font-semibold">Todo App</h1>
      <form className="w-full max-w-screen-sm" onSubmit={addTodo}>
        <div className="space-y-2">
          <Label htmlFor="todo-text" className="sr-only">
            Input with end button
          </Label>
          <div className="flex rounded-lg shadow-sm shadow-black/5">
            <Input
              ref={todoTextRef}
              id="todo-text"
              className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
              placeholder="Enter your todo here..."
            />
            <Button className="rounded-l-none">Add Todo</Button>
          </div>
        </div>
      </form>
      <div className="w-full p-4 flex flex-col flex-1 gap-4">
        {todoList.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
      <div className="flex w-full">
        <Button variant="default" className="flex-1 rounded-none">
          All
        </Button>
        <Button variant="secondary" className="flex-1 rounded-none">
          Pending
        </Button>
        <Button variant="secondary" className="flex-1 rounded-none">
          Completed
        </Button>
      </div>
    </main>
  );
};

export default Todo;
