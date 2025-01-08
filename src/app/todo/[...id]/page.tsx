import React from "react";

type Props = {};

const TodoItem = async ({ params }: Props) => {
  const abc = (await params).id;

  console.log(abc);

  return <div>{`TodoItem `}</div>;
};

export default TodoItem;
