"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Component, memo, PureComponent, useState } from "react";
import "./style.css";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { count, log } from "console";
import shallowCompare from "react-addons-shallow-compare"; // ES6

type Props = {};

// let count = 0;

// Mouting
//  -> Constuctor
//  -> getDerivedStateFromProps
//  -> render
//  -> componentDidMount
// Updating
//  -> getDerivedStateFromProps
// UnMounting
// Error

class Child1 extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }
  // mouseMove = () => {
  //   console.log("mousemove");
  // };

  // componentDidMount() {
  //   document.addEventListener("mousemove", this.mouseMove);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("mousemove", this.mouseMove);
  // }

  render(): React.ReactNode {
    console.log("Child 1");
    if (this.props.count !== 0) {
      throw new Error("something went wrong");
    }
    return (
      <div>
        <h1>Child 1</h1>
        <p>{this.props.count}</p>
      </div>
    );
  }
}

const Child2 = () => {
  console.log("Child 2");

  return <h1>Child 2</h1>;
};

const MemoChild2 = memo(Child2);

class Todo extends Component {
  constructor(props: pageProps) {
    super(props);
    console.log("constructor");
    this.state = {
      count: 0,
      test: "hello world",
      // name: `Mr. ${props.name}`,
    };
    console.log(document.getElementById("title"));
  }

  componentDidMount() {
    console.log(document.getElementById("title"));
  }

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(errorInfo.componentStack);
  }

  render() {
    console.log("render");
    const { count, error } = this.state;
    console.log(document.getElementById("title"));
    if (error) {
      return <h1>{error.message}</h1>;
    }

    return (
      <div>
        <p id="title" className="text-5xl font-semibold">
          {this.state.name}
        </p>
        <Child1 count={count} />
        <MemoChild2 />

        <p className="text-5xl font-semibold">{this.state.test}</p>

        <Button
          onClick={() => {
            this.setState({ test: "How are you" });
          }}
        >
          Change test
        </Button>
        <div className="flex items-center">
          <Button
            onClick={() => {
              this.setState({
                count: 55,
                name: "rohit",
              });
            }}
          >
            +
          </Button>
          <p className="text-5xl font-semibold">{this.state.count}</p>
          <Button
            onClick={() => {
              // count -= 1;
            }}
          >
            -
          </Button>
        </div>
      </div>
    );
  }
}

Todo.getDerivedStateFromProps = (props, state) => {
  console.log("getDerivedStateFromProps");
  console.log(document.getElementById("title"));
  return {
    name: `Mr. ${props.name}`,
  };
};

const App = () => {
  const [name, setName] = useState("yagnesh");

  return (
    <div>
      <Todo name={name} />
      {/* new Todo({ name }) */}
      <p>{name}</p>
      <Button onClick={() => setName("virat")}>Change Name</Button>
    </div>
  );
};

export default App;
