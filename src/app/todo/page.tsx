import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import "./style.css";

type Props = {};

const Todo = (props: Props) => {
  return (
    <div className="wrapper">
      <div className="inner-wrapper">
        <div className="img"></div>
        <div className="content"></div>
      </div>
    </div>
  );
};

export default Todo;
