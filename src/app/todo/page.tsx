"use client";

import TodoItem from "@/components/todoItem";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { log } from "node:console";
import React, { useEffect, useRef, useState } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const todoTextRef = useRef(null);

  const loadTodo = async (ft) => {
    try {
      let url = "http://localhost:3000/todo";
      if (ft !== "all") {
        url += `?isDone=${ft === "completed"}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setTodoList(json);
      setFilterType(ft);
    } catch (error) {}
  };

  const addTodo = async (event) => {
    try {
      event.preventDefault();
      const todoText = todoTextRef.current;
      const todoTextValue = todoText.value;

      const res = await fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({
          todoText: todoTextValue,
          isDone: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();

      setTodoList((val) => {
        return [...val, json];
      });
      todoText.value = "";
    } catch (error) {}
  };

  const deleteTodo = async (todoItem) => {
    try {
      await fetch(`http://localhost:3000/todo/${todoItem.id}`, {
        method: "DELETE",
      });
      const index = todoList.findIndex((item) => item.id === todoItem.id);
      setTodoList((val) => [...val.slice(0, index), ...val.slice(index + 1)]);
    } catch (error) {}
  };

  const updateTodo = async (todoItem) => {
    try {
      const res = await fetch(`http://localhost:3000/todo/${todoItem.id}`, {
        method: "PUT",
        body: JSON.stringify(todoItem),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      const index = todoList.findIndex((item) => item.id === todoItem.id);

      setTodoList((val) => [
        ...val.slice(0, index),
        json,
        ...val.slice(index + 1),
      ]);
    } catch (error) {}
  };

  useEffect(() => {
    loadTodo("all");
  }, []);

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
        {todoList.map((todoItem) => {
          return (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })}
      </div>
      <div className="flex w-full">
        <Button
          variant={filterType === "all" ? "default" : "secondary"}
          className="flex-1 rounded-none"
          onClick={() => loadTodo("all")}
        >
          All
        </Button>
        <Button
          variant={filterType === "pending" ? "default" : "secondary"}
          className="flex-1 rounded-none"
          onClick={() => loadTodo("pending")}
        >
          Pending
        </Button>
        <Button
          variant={filterType === "completed" ? "default" : "secondary"}
          className="flex-1 rounded-none"
          onClick={() => loadTodo("completed")}
        >
          Completed
        </Button>
      </div>
    </main>
  );
};

export default Todo;
